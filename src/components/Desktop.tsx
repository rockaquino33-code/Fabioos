import React from 'react'
import { motion } from 'framer-motion'
import { useWindowManager } from '../contexts/WindowManagerContext'

export const Desktop: React.FC = () => {
  const { openWindow } = useWindowManager()

  const desktopIcons = [
    { id: 'files', label: 'Arquivos', icon: '📁' },
    { id: 'browser', label: 'Navegador', icon: '🌐' },
    { id: 'music', label: 'Música', icon: '🎵' },
    { id: 'settings', label: 'Configurações', icon: '⚙️' },
  ]

  const handleIconClick = (iconId: string) => {
    openWindow({
      title: `App - ${iconId}`,
      component: <div className="p-6">Conteúdo de {iconId}</div>,
      width: 800,
      height: 600,
      x: Math.random() * 200 + 100,
      y: Math.random() * 200 + 100,
      isMinimized: false,
      isMaximized: false,
    })
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Desktop Grid */}
      <div className="absolute inset-0 grid grid-cols-6 gap-8 p-8">
        {desktopIcons.map((icon) => (
          <motion.div
            key={icon.id}
            className="flex flex-col items-center gap-2 cursor-pointer group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleIconClick(icon.id)}
          >
            <div className="text-5xl bg-white/20 backdrop-blur-xl rounded-2xl p-4 group-hover:bg-white/40 transition">
              {icon.icon}
            </div>
            <span className="text-xs text-gray-700 text-center font-medium">{icon.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  )
}
