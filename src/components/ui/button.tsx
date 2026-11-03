"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow-soft-sm hover:bg-primary/90 hover:shadow-glow-primary",
        secondary:
          "bg-secondary text-white shadow-soft-sm hover:bg-secondary/90 hover:shadow-glow-secondary",
        gradient:
          "gradient-brand text-white shadow-soft-md hover:opacity-95 hover:shadow-glow-primary",
        gold:
          "gradient-gold text-white shadow-soft-md hover:opacity-95",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 shadow-soft-sm",
        outline:
          "border border-input bg-background/60 backdrop-blur-md hover:bg-accent/10 hover:text-accent-foreground",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground",
        glass:
          "glass-panel text-foreground hover:bg-white/80 dark:hover:bg-slate-800/80 shadow-soft-sm",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-xl px-3.5 text-xs",
        lg: "h-13 rounded-2xl px-8 text-base",
        icon: "h-11 w-11 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

