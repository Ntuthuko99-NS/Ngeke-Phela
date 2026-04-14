import React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

// Simple helper instead of cn
function mergeClasses(...classes) {
  return classes.filter(Boolean).join(" ")
}

// Core components
export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuGroup = DropdownMenuPrimitive.Group
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal
export const DropdownMenuSub = DropdownMenuPrimitive.Sub
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

// Sub menu trigger
export const DropdownMenuSubTrigger = React.forwardRef(
  ({ className, inset, children, ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.SubTrigger
        ref={ref}
        className={mergeClasses(
          "flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm cursor-default outline-none",
          "focus:bg-gray-100",
          inset && "pl-8",
          className
        )}
        {...props}
      >
        {children}
        <ChevronRight className="ml-auto w-4 h-4" />
      </DropdownMenuPrimitive.SubTrigger>
    )
  }
)

// Sub menu content
export const DropdownMenuSubContent = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.SubContent
        ref={ref}
        className={mergeClasses(
          "min-w-[8rem] rounded-md border bg-white p-1 shadow-lg",
          className
        )}
        {...props}
      />
    )
  }
)

// Main dropdown content
export const DropdownMenuContent = React.forwardRef(
  ({ className, sideOffset = 4, ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          className={mergeClasses(
            "min-w-[8rem] rounded-md border bg-white p-1 shadow-md",
            className
          )}
          {...props}
        />
      </DropdownMenuPrimitive.Portal>
    )
  }
)

// Regular item
export const DropdownMenuItem = React.forwardRef(
  ({ className, inset, ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.Item
        ref={ref}
        className={mergeClasses(
          "flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm cursor-default outline-none",
          "focus:bg-gray-100",
          inset && "pl-8",
          className
        )}
        {...props}
      />
    )
  }
)

// Checkbox item
export const DropdownMenuCheckboxItem = React.forwardRef(
  ({ className, children, checked, ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.CheckboxItem
        ref={ref}
        checked={checked}
        className={mergeClasses(
          "flex items-center py-1.5 pl-8 pr-2 text-sm rounded-sm cursor-default outline-none",
          "focus:bg-gray-100",
          className
        )}
        {...props}
      >
        <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
          <DropdownMenuPrimitive.ItemIndicator>
            <Check className="w-4 h-4" />
          </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
      </DropdownMenuPrimitive.CheckboxItem>
    )
  }
)

// Radio item
export const DropdownMenuRadioItem = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.RadioItem
        ref={ref}
        className={mergeClasses(
          "flex items-center py-1.5 pl-8 pr-2 text-sm rounded-sm cursor-default outline-none",
          "focus:bg-gray-100",
          className
        )}
        {...props}
      >
        <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
          <DropdownMenuPrimitive.ItemIndicator>
            <Circle className="w-2 h-2 fill-current" />
          </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
      </DropdownMenuPrimitive.RadioItem>
    )
  }
)

// Label
export const DropdownMenuLabel = React.forwardRef(
  ({ className, inset, ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.Label
        ref={ref}
        className={mergeClasses(
          "px-2 py-1.5 text-sm font-semibold",
          inset && "pl-8",
          className
        )}
        {...props}
      />
    )
  }
)

// Separator
export const DropdownMenuSeparator = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.Separator
        ref={ref}
        className={mergeClasses("my-1 h-px bg-gray-200", className)}
        {...props}
      />
    )
  }
)

// Shortcut (e.g. Ctrl + K)
export const DropdownMenuShortcut = ({ className, ...props }) => {
  return (
    <span
      className={mergeClasses(
        "ml-auto text-xs opacity-60",
        className
      )}
      {...props}
    />
  )
}
