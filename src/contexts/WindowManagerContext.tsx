import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

export interface Window {
  id: string
  title: string
  component: ReactNode
  width: number
  height: number
  x: number
  y: number
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
}

interface WindowManagerContextType {
  windows: Window[]
  openWindow: (window: Omit<Window, 'id' | 'zIndex'>) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  restoreWindow: (id: string) => void
  focusWindow: (id: string) => void
  updateWindowPosition: (id: string, x: number, y: number) => void
  updateWindowSize: (id: string, width: number, height: number) => void
}

export const WindowManagerContext = React.createContext<WindowManagerContextType | undefined>(undefined)

export const useWindowManager = () => {
  const context = React.useContext(WindowManagerContext)
  if (!context) {
    throw new Error('useWindowManager must be used within WindowManagerProvider')
  }
  return context
}

interface WindowManagerProviderProps {
  children: ReactNode
}

export const WindowManagerProvider: React.FC<WindowManagerProviderProps> = ({ children }) => {
  const [windows, setWindows] = React.useState<Window[]>([])
  const [maxZIndex, setMaxZIndex] = React.useState(0)

  const openWindow = (window: Omit<Window, 'id' | 'zIndex'>) => {
    const newWindow: Window = {
      ...window,
      id: `window-${Date.now()}`,
      zIndex: maxZIndex + 1,
    }
    setWindows((prev) => [...prev, newWindow])
    setMaxZIndex((prev) => prev + 1)
  }

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
  }

  const minimizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    )
  }

  const maximizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, isMaximized: true, width: window.innerWidth - 40, height: window.innerHeight - 100 }
          : w
      )
    )
  }

  const restoreWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, isMinimized: false, isMaximized: false, width: 800, height: 600 }
          : w
      )
    )
  }

  const focusWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w
      )
    )
    setMaxZIndex((prev) => prev + 1)
  }

  const updateWindowPosition = (id: string, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, x, y } : w))
    )
  }

  const updateWindowSize = (id: string, width: number, height: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, width, height } : w))
    )
  }

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        restoreWindow,
        focusWindow,
        updateWindowPosition,
        updateWindowSize,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  )
}
