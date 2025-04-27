"use client"

import { createContext, useContext } from 'react'
import { useTheme } from '@/hooks/useTheme'

type ThemeContextType = ReturnType<typeof useTheme>

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useTheme()

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useThemeContext must be used within ThemeProvider')
  return context
}