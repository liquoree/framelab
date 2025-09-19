import './CanvasBoard.scss'
import ClearIcon from '../../../assets/clear-frame.svg'

export const CanvasBoard = () => {
  return (
    <div className="canvas">
      <img
        src={ClearIcon}
        alt="clear-frame"
        className="canvas__clear-frame-btn"
      />
    </div>
  )
}
