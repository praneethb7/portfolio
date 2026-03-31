'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus:outline-none',
          variant === 'default' && 'bg-[#4F8EF7] text-[#080808] hover:bg-[#7aaff8] px-5 py-2.5',
          variant === 'outline' && 'border border-white/20 bg-transparent text-white/80 hover:border-[#4F8EF7]/50 hover:text-[#4F8EF7] px-5 py-2.5',
          variant === 'ghost' && 'bg-transparent text-white/70 hover:bg-white/5 px-5 py-2.5',
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
