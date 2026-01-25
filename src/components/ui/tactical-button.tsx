import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tacticalButtonVariants = cva(
  "relative inline-flex items-center justify-center font-display uppercase tracking-widest transition-all duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-foreground border-2 border-primary",
          "hover:bg-primary/90",
          "shadow-[0_0_20px_hsl(var(--primary)/0.3)]",
          "after:absolute after:inset-[-4px] after:border after:border-primary/30",
        ].join(" "),
        secondary: [
          "bg-secondary text-secondary-foreground border border-secondary",
          "hover:bg-secondary/90",
          "shadow-[0_0_15px_hsl(var(--secondary)/0.3)]",
        ].join(" "),
        ghost: [
          "bg-transparent text-foreground border border-primary/30",
          "hover:bg-primary/10 hover:border-primary",
        ].join(" "),
        initiate: [
          "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-2 border-primary",
          "hover:from-primary/90 hover:to-primary/70",
          "pulse-glow",
          "before:absolute before:inset-[-2px] before:border before:border-secondary/40",
          "after:absolute after:inset-[-6px] after:border after:border-primary/20",
        ].join(" "),
      },
      size: {
        default: "h-12 px-8 text-sm",
        sm: "h-9 px-4 text-xs",
        lg: "h-16 px-12 text-lg",
        xl: "h-20 px-16 text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface TacticalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tacticalButtonVariants> {
  asChild?: boolean;
}

const TacticalButton = React.forwardRef<HTMLButtonElement, TacticalButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(tacticalButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
TacticalButton.displayName = "TacticalButton";

export { TacticalButton, tacticalButtonVariants };
