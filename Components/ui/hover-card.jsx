"use client"

import React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

// Simple class helper
function mergeClasses(...classes) {
  return classes.filter(Boolean).join(" ")
}

// Root components
export const HoverCard = HoverCardPrimitive.Root
export const HoverCardTrigger = HoverCardPrimitive.Trigger

// Content
export const HoverCardContent = React.forwardRef(
  (
    {
      className,
      align = "center",
      sideOffset = 4,
      ...props
    },
    ref
  ) => {
    return (
      <HoverCardPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={mergeClasses(
          "z-50 w-64 rounded-md border bg-white p-4 shadow-md outline-none",
          className
        )}
        {...props}
      />
    )
  }
)
