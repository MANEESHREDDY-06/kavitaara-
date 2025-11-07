"use client"

import * as React from "react"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode
  className?: string
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <label ref={ref} className={className} {...props}>
        {children}
      </label>
    )
  }
)

Label.displayName = "Label"

export default Label
