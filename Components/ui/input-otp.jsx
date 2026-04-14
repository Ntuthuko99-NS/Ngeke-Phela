import React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Minus } from "lucide-react"

// Simple class helper
function mergeClasses(...classes) {
  return classes.filter(Boolean).join(" ")
}

// Main OTP input
export const InputOTP = React.forwardRef(
  ({ className, containerClassName, ...props }, ref) => {
    return (
      <OTPInput
        ref={ref}
        containerClassName={mergeClasses(
          "flex items-center gap-2",
          containerClassName
        )}
        className={mergeClasses(
          "disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    )
  }
)

// Group wrapper (for grouping slots)
export const InputOTPGroup = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={mergeClasses("flex items-center", className)}
        {...props}
      />
    )
  }
)

// Individual OTP slot (each box)
export const InputOTPSlot = React.forwardRef(
  ({ index, className, ...props }, ref) => {
    const context = React.useContext(OTPInputContext)
    const slot = context.slots[index]

    return (
      <div
        ref={ref}
        className={mergeClasses(
          "relative flex items-center justify-center",
          "h-9 w-9 text-sm border shadow-sm",
          "first:rounded-l-md last:rounded-r-md",
          slot.isActive && "ring-1 ring-black",
          className
        )}
        {...props}
      >
        {slot.char}

        {/* Fake blinking caret */}
        {slot.hasFakeCaret && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-px h-4 bg-black animate-pulse" />
          </div>
        )}
      </div>
    )
  }
)

// Separator (e.g. dash between groups)
export const InputOTPSeparator = React.forwardRef(
  (props, ref) => {
    return (
      <div ref={ref} role="separator" {...props}>
        <Minus />
      </div>
    )
  }
)
