import './CanvasBoard.scss'
import ClearIcon from '../../../assets/clear-frame.svg'
import { useEffect, useRef, useState } from 'react'
import { useTools } from '../../tools'
import { useFrames } from '../../frames'

export const CanvasBoard = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const { tools } = useTools()
  const { frames, selectedFrame, updateFrameImage } = useFrames()

    // загрузка выбранного кадра
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const frame = frames.find(f => f.index === selectedFrame)
    if (frame?.image) {
      const img = new Image()
      img.src = frame.image
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
    }
  }, [selectedFrame])


  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    canvas.width = container.clientWidth
    canvas.height = container.clientHeight

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctxRef.current = ctx
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctxRef.current) return
    ctxRef.current.beginPath()
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    setIsDrawing(true)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctxRef.current) return

    ctxRef.current.strokeStyle = tools.tool === "rubber" ? "#ffffff" : tools.color
    ctxRef.current.lineWidth = tools.size
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    ctxRef.current.stroke()
  }


  const stopDrawing = () => {
    if (!ctxRef.current) return
    ctxRef.current.closePath()
    setIsDrawing(false)

    if (!canvasRef.current) return
    const dataUrl = canvasRef.current.toDataURL("image/png")
    updateFrameImage(selectedFrame, dataUrl)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    updateFrameImage(selectedFrame, canvas.toDataURL("image/png"))
  }


  return (
    <div className="canvas"  ref={containerRef}>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onMouseEnter={(e: React.MouseEvent<HTMLCanvasElement>) => {if (e.buttons === 1) startDrawing(e)}}
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
