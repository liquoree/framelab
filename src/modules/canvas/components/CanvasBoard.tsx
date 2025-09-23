import './CanvasBoard.scss'
import ClearIcon from '../../../assets/clear-frame.svg'
import { useCanvasBoard } from '../hooks/useCanvasBoard'
import { useOnionSkin } from '../hooks/useOnionSkin'

export const CanvasBoard = () => {
  const {
    containerRef,
    canvasRef,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
  } = useCanvasBoard()
  const { onionRef } = useOnionSkin(containerRef)

  return (
    <div className="canvas" ref={containerRef}>
      <canvas ref={onionRef} className="canvas__onion-skin" />
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onMouseEnter={(e: React.MouseEvent<HTMLCanvasElement>) => {
          if (e.buttons === 1) startDrawing(e)
        }}
        className="canvas__board"
      />
      <img
        src={ClearIcon}
        alt="clear-frame"
        className="canvas__clear-frame-btn"
        onClick={clearCanvas}
      />
    </div>
  )
}
