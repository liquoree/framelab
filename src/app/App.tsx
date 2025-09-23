import { CanvasBoard } from '../modules/canvas'
import { FramesBox } from '../modules/frames'
import { ToolsPanel, ToolsProvider } from '../modules/tools'
import { Header } from '../shared'
import { AppProvider } from './context/AppProvider'
import { Player } from '../modules/player'
import './styles/App.scss'
import { useState } from 'react'

export const App = () => {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)

  const handlePreviewClick = () => {
    setIsPlayerOpen(true)
  }

  const handleRestartClick = () => {
    console.log('Application restarted')
  }

  const handleClosePlayer = () => {
    setIsPlayerOpen(false)
  }

  return (
    <AppProvider>
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
    </AppProvider>
  )
}
