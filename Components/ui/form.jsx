"use client"

import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Controller, FormProvider, useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"

// Simple class helper
function mergeClasses(...classes) {
  return classes.filter(Boolean).join(" ")
}

// Main Form wrapper
export const Form = FormProvider

// Contexts
const FormFieldContext = React.createContext(null)
const FormItemContext = React.createContext(null)

// FormField (connects react-hook-form Controller)
export const FormField = ({ name, ...props }) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller name={name} {...props} />
    </FormFieldContext.Provider>
  )
}

// Hook to access field state
export function useFormField() {
  const field = React.useContext(FormFieldContext)
  const item = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!field) {
    throw new Error("useFormField must be used inside <FormField>")
  }

  const state = getFieldState(field.name, formState)

  return {
    name: field.name,
    id: item?.id,
    formItemId: `${item?.id}-input`,
    formDescriptionId: `${item?.id}-description`,
    formMessageId: `${item?.id}-error`,
    ...state,
  }
}

// Wrapper for each form item
export const FormItem = React.forwardRef(
  ({ className, ...props }, ref) => {
    const id = React.useId()

    return (
      <FormItemContext.Provider value={{ id }}>
        <div
          ref={ref}
          className={mergeClasses("space-y-2", className)}
          {...props}
        />
      </FormItemContext.Provider>
    )
  }
)

// Label
export const FormLabel = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField()

    return (
      <Label
        ref={ref}
        htmlFor={formItemId}
        className={mergeClasses(
          error && "text-red-500",
          className
        )}
        {...props}
      />
    )
  }
)

// Input / control wrapper
export const FormControl = React.forwardRef(
  (props, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-invalid={!!error}
        aria-describedby={
          error
            ? `${formDescriptionId} ${formMessageId}`
            : formDescriptionId
        }
        {...props}
      />
    )
  }
)

// Description text
export const FormDescription = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField()

    return (
      <p
        ref={ref}
        id={formDescriptionId}
        className={mergeClasses(
          "text-sm text-gray-500",
          className
        )}
        {...props}
      />
    )
  }
)

// Error / message text
export const FormMessage = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField()

    const message = error?.message || children
    if (!message) return null

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={mergeClasses(
          "text-sm font-medium text-red-500",
          className
        )}
        {...props}
      >
        {message}
      </p>
    )
  }
)
