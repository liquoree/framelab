import { useEffect, useRef, useState } from 'react'
import { useTools } from '../../tools'
import { useFrames } from '../../frames'

export function useCanvasBoard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const { tools } = useTools()
  const { frames, selectedFrame, updateFrameImage } = useFrames()

  // инициализация канваса
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    canvas.width = container.clientWidth
    canvas.height = container.clientHeight

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.globalCompositeOperation = 'source-over';
    // ctx.fillStyle = '#ffffff'
    // ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctxRef.current = ctx
  }, [])

  // загрузка выбранного кадра
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.globalCompositeOperation = 'source-over';

    const frame = frames.find((f) => f.index === selectedFrame)
    if (frame?.image) {
      const img = new Image()
      img.src = frame.image
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
    }
  }, [selectedFrame])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctxRef.current) return
    ctxRef.current.beginPath()
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    setIsDrawing(true)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctxRef.current) return;

    if (tools.tool === 'rubber') {
      ctxRef.current.globalCompositeOperation = 'destination-out';
      ctxRef.current.strokeStyle = '#000000'; // Opaque black (color doesn't matter, but must be fully opaque for erasure to work)
    } else {
      ctxRef.current.globalCompositeOperation = 'source-over';
      ctxRef.current.strokeStyle = tools.color;
    }

    ctxRef.current.lineWidth = tools.size;
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!ctxRef.current || !canvasRef.current) return
    ctxRef.current.closePath()
    setIsDrawing(false)

    const dataUrl = canvasRef.current.toDataURL('image/png')
    updateFrameImage(selectedFrame, dataUrl)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return
    // ctx.fillStyle = '#ffffff'
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateFrameImage(selectedFrame, canvas.toDataURL('image/png'))
  }

  return {
    containerRef,
    canvasRef,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
  }
}
