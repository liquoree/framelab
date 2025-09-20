import { CanvasBoard } from '../modules/canvas'
import { FramesBox } from '../modules/frames'
import { ToolsPanel, ToolsProvider } from '../modules/tools'
import { Header } from '../shared'
import { AppProvider } from './context/AppProvider'
import './styles/App.scss'

export const App = () => {
  return (
    <AppProvider>
      <div className="app">
        <Header />
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
    </AppProvider>
  )
}
