"use client"

import React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

// Simple class helper (replaces cn)
function mergeClasses(...classes) {
  return classes.filter(Boolean).join(" ")
}

// Root component
export const Drawer = ({ shouldScaleBackground = true, ...props }) => {
  return (
    <DrawerPrimitive.Root
      shouldScaleBackground={shouldScaleBackground}
      {...props}
    />
  )
}

// Core parts
export const DrawerTrigger = DrawerPrimitive.Trigger
export const DrawerPortal = DrawerPrimitive.Portal
export const DrawerClose = DrawerPrimitive.Close

// Overlay (background dim)
export const DrawerOverlay = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <DrawerPrimitive.Overlay
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

// Drawer content (bottom sheet)
export const DrawerContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <DrawerPortal>
        <DrawerOverlay />
        <DrawerPrimitive.Content
          ref={ref}
          className={mergeClasses(
            "fixed bottom-0 left-0 right-0 z-50 flex flex-col",
            "mt-24 rounded-t-lg border bg-white",
            className
          )}
          {...props}
        >
          {/* Drag handle */}
          <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-gray-300" />

          {children}
        </DrawerPrimitive.Content>
      </DrawerPortal>
    )
  }
)

// Header
export const DrawerHeader = ({ className, ...props }) => {
  return (
    <div
      className={mergeClasses(
        "p-4 text-center sm:text-left",
        className
      )}
      {...props}
    />
  )
}

// Footer
export const DrawerFooter = ({ className, ...props }) => {
  return (
    <div
      className={mergeClasses(
        "mt-auto flex flex-col gap-2 p-4",
        className
      )}
      {...props}
    />
  )
}

// Title
export const DrawerTitle = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <DrawerPrimitive.Title
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
export const DrawerDescription = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <DrawerPrimitive.Description
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
