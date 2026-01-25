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
          "bg-transparent border-2 border-primary text-primary",
          "hover:bg-primary hover:text-primary-foreground",
          "before:absolute before:inset-0 before:bg-primary/10",
          "after:absolute after:inset-[-4px] after:border after:border-primary/30",
          "pulse-glow",
        ].join(" "),
        secondary: [
          "bg-transparent border border-secondary text-secondary",
          "hover:bg-secondary/20",
          "shadow-[0_0_10px_hsl(var(--secondary)/0.3)]",
        ].join(" "),
        ghost: [
          "bg-transparent text-muted-foreground",
          "hover:text-primary hover:bg-primary/10",
        ].join(" "),
        initiate: [
          "bg-gradient-to-r from-primary/20 to-primary/5 border-2 border-primary text-primary",
          "hover:from-primary/30 hover:to-primary/10",
          "pulse-glow",
          "before:absolute before:inset-[-2px] before:border before:border-primary/20",
          "after:absolute after:inset-[-6px] after:border after:border-primary/10",
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
