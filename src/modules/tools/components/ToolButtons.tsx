import Brush from '../../../assets/brush.svg'
import Rubber from '../../../assets/rubber.svg'
import type { Tool } from '../types'
import './Tools.scss'

type ToolButtonProps = {
  tool: Tool
  onBrushClick: () => void
  onRubberClick: () => void
}

export const ToolButton = ({
  tool,
  onBrushClick,
  onRubberClick,
}: ToolButtonProps) => {
  return (
    <div className="tool-buttons">
      <div
        className={`tool-buttons__image ${tool === 'brush' ? 'active' : ''}`}
        onClick={onBrushClick}
      >
        <img src={Brush} alt="brush" />
      </div>
      <div
        className={`tool-buttons__image ${tool === 'rubber' ? 'active' : ''}`}
        onClick={onRubberClick}
      >
        <img src={Rubber} alt="rubber" />
      </div>
    </div>
  )
}
