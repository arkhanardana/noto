"use client"

import { useEffect, useState } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Get saved theme from localStorage or use system preference
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    setTheme(
      savedTheme === 'dark' || (!savedTheme && systemPrefersDark) 
        ? 'dark' 
        : 'light'
    )
  }, [])

  useEffect(() => {
    if (!isMounted) return
    
    // Apply theme class to HTML element
    document.documentElement.classList.toggle('dark', theme === 'dark')
    // Save to localStorage
    localStorage.setItem('theme', theme)
  }, [theme, isMounted])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return { theme, toggleTheme, isMounted }
}