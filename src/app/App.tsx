// App.tsx
import { CanvasBoard } from '../modules/canvas'
import { FramesBox } from '../modules/frames'
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
