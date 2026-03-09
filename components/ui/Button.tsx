import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-navy-900 shadow-lg hover:shadow-xl hover:scale-105",
        secondary: "bg-surface text-navy-900 border-2 border-navy-900/10 hover:border-accent hover:bg-accent/5 backdrop-blur-sm",
        ghost: "hover:bg-slate-100 text-slate-900",
        link: "text-navy-900 underline-offset-4 hover:underline",
      },
      size: {
        default: "px-8 py-4 text-lg",
        sm: "px-4 py-2 text-sm",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
