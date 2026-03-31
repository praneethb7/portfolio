import * as React from 'react'
import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors placeholder:text-white/25 disabled:cursor-not-allowed disabled:opacity-50',
          'bg-white/5 border-white/10 text-white focus:border-[#4F8EF7]/50',
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
