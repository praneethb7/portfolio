import * as React from 'react'
import { cn } from '@/lib/utils'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'flex w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors placeholder:text-white/25 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
          'bg-white/5 border-white/10 text-white focus:border-[#4F8EF7]/50',
          className
        )}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
