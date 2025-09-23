import './CanvasBoard.scss'
import ClearIcon from '../../../../assets/clear-frame.svg'
import { useCanvasBoard } from '../../hooks/useCanvasBoard'

export const CanvasBoard = () => {
  const {
    containerRef,
    canvasRef,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
  } = useCanvasBoard()

  return (
    <div className="canvas" ref={containerRef}>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
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
