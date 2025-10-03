// App.tsx
import { CanvasBoard } from '../modules/canvas'
import { FramesBox, type Frame } from '../modules/frames'
import { ToolsPanel } from '../modules/tools'
import { Header } from '../shared'
import { AppProvider } from './context/AppProvider'
import { Player } from '../modules/player'
import './styles/App.scss'
import { useState } from 'react'
import { useFrames } from '../modules/frames'

const InnerApp = () => {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)
  const { clearFrames } = useFrames()

  const handleExportProjectClick = (frames: Frame[]) => {
    const json = JSON.stringify({ frames }, null, 2)

    const blob = new Blob([json], { type: 'application/json' })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'framelab-project.json'
    link.click()

    URL.revokeObjectURL(url)
  }

  const handleImportProjectClick = async (
    onImport: (frames: Frame[]) => void
  ) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json'

    input.onchange = async (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      try {
        const text = await file.text()
        const data = JSON.parse(text)

        if (Array.isArray(data.frames)) {
          onImport(data.frames)
        } else {
          alert('неверный формат проекта')
        }
      } catch (err) {
        console.error('ошибка при импорте проекта', err)
        alert('ошибка при импорте')
      }
    }

    document.body.appendChild(input)
    input.click()
    document.body.removeChild(input)
  }

  const handlePreviewClick = () => {
    setIsPlayerOpen(true)
  }

  const handleRestartClick = () => {
    clearFrames()
    setIsPlayerOpen(false)
  }

  const handleClosePlayer = () => {
    setIsPlayerOpen(false)
  }

  return (
    <>
      <div className="app">
        <Header
          onPreviewClick={handlePreviewClick}
          onRestartClick={handleRestartClick}
          onExportProjectClick={handleExportProjectClick}
          onImportProjectClick={handleImportProjectClick}
        />
        <div className="app__box">
          <div className="app__workspace">
            <CanvasBoard />
            <FramesBox />
          </div>
          <div className="app__tools-box">
            <ToolsPanel />
          </div>
        </div>
      </div>
      {isPlayerOpen && <Player onClose={handleClosePlayer} />}
    </>
  )
}

export const App = () => {
  return (
    <AppProvider>
      <InnerApp />
    </AppProvider>
  )
}
