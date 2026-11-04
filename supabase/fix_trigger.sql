-- Fix handle_new_user trigger in Supabase
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER 
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  v_role public.user_role := 'customer'::public.user_role;
  v_full_name TEXT;
BEGIN
  -- Determine role safely
  IF NEW.raw_user_meta_data->>'role' = 'vendor' THEN
    v_role := 'vendor'::public.user_role;
  ELSIF NEW.raw_user_meta_data->>'role' = 'admin' THEN
    v_role := 'admin'::public.user_role;
  ELSIF NEW.raw_user_meta_data->>'role' = 'super_admin' THEN
    v_role := 'super_admin'::public.user_role;
  ELSE
    v_role := 'customer'::public.user_role;
  END IF;

  -- Determine full name safely
  v_full_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'name',
    split_part(COALESCE(NEW.email, 'user'), '@', 1),
    'User'
  );

  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    v_full_name,
    v_role
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name;

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'handle_new_user failed: %', SQLERRM;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();