'use client'

import { ThemeProvider } from 'next-themes'
import { TorchProvider } from './TorchMode'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <TorchProvider>
        {children}
      </TorchProvider>
    </ThemeProvider>
  )
}
