import React from 'react'
import { WindowManagerProvider } from './contexts/WindowManagerContext'
import { Desktop } from './components/Desktop'
import { WindowManager } from './components/WindowManager'
import { Taskbar } from './components/Taskbar'

function App() {
  return (
    <WindowManagerProvider>
      <div className="w-screen h-screen overflow-hidden">
        <Desktop />
        <WindowManager />
        <Taskbar />
      </div>
    </WindowManagerProvider>
  )
}

export default App
