"use client"

import React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

// Simple helper instead of cn
function mergeClasses(...classes) {
  return classes.filter(Boolean).join(" ")
}

// Core components
export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogPortal = DialogPrimitive.Portal
export const DialogClose = DialogPrimitive.Close

// Overlay (background)
export const DialogOverlay = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <DialogPrimitive.Overlay
        ref={ref}
        className={mergeClasses(
          "fixed inset-0 z-50 bg-black/80",
          className
        )}
        {...props}
      />
    )
  }
)

// Main dialog content
export const DialogContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          ref={ref}
          className={mergeClasses(
            "fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2",
            "bg-white border shadow-lg p-6 rounded-lg",
            className
          )}
          {...props}
        >
          {children}

          {/* Close button */}
          <DialogPrimitive.Close className="absolute top-4 right-4 opacity-70 hover:opacity-100">
            <X className="w-4 h-4" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    )
  }
)

// Header
export const DialogHeader = ({ className, ...props }) => {
  return (
    <div
      className={mergeClasses(
        "flex flex-col space-y-2 text-center sm:text-left",
        className
      )}
      {...props}
    />
  )
}

// Footer
export const DialogFooter = ({ className, ...props }) => {
  return (
    <div
      className={mergeClasses(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2",
        className
      )}
      {...props}
    />
  )
}

// Title
export const DialogTitle = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <DialogPrimitive.Title
        ref={ref}
        className={mergeClasses(
          "text-lg font-semibold",
          className
        )}
        {...props}
      />
    )
  }
)

// Description
export const DialogDescription = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <DialogPrimitive.Description
        ref={ref}
        className={mergeClasses(
          "text-sm text-gray-500",
          className
        )}
        {...props}
      />
    )
  }
)
