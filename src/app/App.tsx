import { CanvasBoard } from '../modules/canvas'
import { FramesBox } from '../modules/frames'
import { ToolsPanel } from '../modules/tools'
import { Header } from '../shared/header/Header'
import './styles/App.scss'

export const App = () => {
  return (
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
  )
}
