import { CanvasBoard } from '../modules/canvas'
import { FramesBox } from '../modules/frames/components/FramesBox'
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
      </div>
    </div>
  )
}
