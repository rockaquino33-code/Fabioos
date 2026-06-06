import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useWindowManager } from '../contexts/WindowManagerContext'

export const Taskbar: React.FC = () => {
  const [time, setTime] = React.useState(new Date())
  const { openWindow } = useWindowManager()

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const taskbarItems = [
    { id: 'menu', label: 'Menu', icon: '🪟' },
    { id: 'search', label: 'Pesquisa', icon: '🔍' },
    { id: 'browser', label: 'Navegador', icon: '🌐' },
    { id: 'files', label: 'Arquivos', icon: '📁' },
    { id: 'music', label: 'Música', icon: '🎵' },
    { id: 'videos', label: 'Vídeos', icon: '🎬' },
    { id: 'ai', label: 'IA ELISA', icon: '🤖' },
    { id: 'settings', label: 'Configurações', icon: '⚙️' },
  ]

  const handleTaskbarClick = (itemId: string) => {
    openWindow({
      title: itemId,
      component: <div className="p-6">Conteúdo de {itemId}</div>,
      width: 900,
      height: 700,
      x: 50,
      y: 50,
      isMinimized: false,
      isMaximized: false,
    })
  }

  return (
    <motion.div
      className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl px-6 py-3 flex items-center gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Taskbar Items */}
      {taskbarItems.map((item) => (
        <motion.button
          key={item.id}
          className="text-2xl hover:scale-125 transition-transform"
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleTaskbarClick(item.id)}
          title={item.label}
        >
          {item.icon}
        </motion.button>
      ))}

      {/* Divider */}
      <div className="w-px h-8 bg-gray-300"></div>

      {/* System Tray */}
      <div className="flex items-center gap-3">
        <motion.div
          className="text-sm font-semibold text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        </motion.div>
        <span className="text-lg">🔊</span>
        <span className="text-lg">🔋</span>
        <span className="text-lg">📡</span>
      </div>
    </motion.div>
  )
}
