-- WedConnect Initial Seed Data
-- Categories and Event Types

INSERT INTO public.categories (name, slug, description, icon, display_order)
VALUES 
('Venues & Banquet Halls', 'venues', 'Grand ballrooms, luxury resorts, beachside lawns, and intimate estates', 'Building2', 1),
('Photography & Cinema', 'photography', 'Master wedding photographers, cinematic 4K videography, drone coverage', 'Camera', 2),
('Bridal Makeup & Hair', 'bridal-makeup', 'Celebrity makeup artists, hair styling, bridal couture prep', 'Sparkles', 3),
('Catering & Bar', 'catering', 'Multi-cuisine fine dining, customized menus, mixology bars', 'Utensils', 4),
('Decoration & Floral', 'decoration', 'Mandap design, fairy lights, floral arches, thematic concepts', 'Flower2', 5),
('Music, DJ & Entertainment', 'entertainment', 'Live bands, celebrity DJs, sound, lighting, choreography', 'Music', 6),
('Wedding Planners', 'planners', 'Turnkey wedding coordination, logistics, day-of management', 'CalendarCheck', 7),
('Invitations & Favors', 'invitations', 'Handcrafted physical stationery, digital e-invites, bespoke luxury gifts', 'Mail', 8)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.event_types (name, slug, description, icon, display_order)
VALUES 
('Wedding Ceremony', 'wedding', 'Traditional & modern matrimonial rites', 'Heart', 1),
('Grand Reception', 'reception', 'Evening dinner, celebrations, toasts & dancing', 'GlassWater', 2),
('Engagement / Rings', 'engagement', 'Ring exchange and pre-wedding soiree', 'Gem', 3),
('Sangeet & Mehendi', 'sangeet', 'Festive musical night, henna application, dance', 'Music4', 4),
('Anniversary', 'anniversary', 'Milestone celebrations of union', 'PartyPopper', 5),
('Corporate Gala', 'corporate', 'Executive gatherings, award ceremonies', 'Briefcase', 6)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.platform_settings (key, value, description)
VALUES 
('site_config', '{"site_name": "WedConnect", "support_email": "support@wedconnect.app", "commission_rate_percent": 5, "currency": "USD"}'::jsonb, 'Global site configuration'),
('feature_flags', '{"enable_instant_chat": true, "enable_ai_matching": true, "enable_quotation_comparison": true}'::jsonb, 'Feature enablement switches')
ON CONFLICT (key) DO NOTHING;

