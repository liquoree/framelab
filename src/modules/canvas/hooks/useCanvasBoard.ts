// useCanvasBoard.ts (логика канваса):
import { useEffect, useRef, useState } from 'react'
import { useTools } from '../../tools'
import { useFrames } from '../../frames'

export function useCanvasBoard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const { tools } = useTools()
  const {
    frames,
    selectedFrame,
    updateFrameImage,
    baseBackground,
    setBaseBackground,
    registerCanvasClear,
    forceReload,
  } = useFrames()

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
    ctx.globalCompositeOperation = 'source-over'
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
    ctx.globalCompositeOperation = 'source-over'

    const drawFromSrc = (src: string) => {
      if (!src) return
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
      img.onerror = () => {
        // можно залогировать, но это не обязательно
      }
      img.src = src
      // если картинка уже готова (dataURL/кэш), onload может не прийти
      if (img.complete) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
    }

    if (selectedFrame !== 'base') {
      const frame = frames.find((f) => f.index === selectedFrame)
      if (frame?.image) drawFromSrc(frame.image)
    } else {
      if (baseBackground) drawFromSrc(baseBackground)
    }
  }, [selectedFrame, forceReload]) // зависимости оставляем как были, чтобы не мигало при рисовании

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.pointerType === 'touch' || !ctxRef.current) return
    ctxRef.current.beginPath()
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    setIsDrawing(true)
  }

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.pointerType === 'touch' || !isDrawing || !ctxRef.current) return

    if (tools.tool === 'rubber') {
      ctxRef.current.globalCompositeOperation = 'destination-out'
      ctxRef.current.strokeStyle = '#000000'
    } else {
      ctxRef.current.globalCompositeOperation = 'source-over'
      ctxRef.current.strokeStyle = tools.color
    }

    ctxRef.current.lineWidth = tools.size
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    ctxRef.current.stroke()
  }

  const stopDrawing = () => {
    if (!ctxRef.current || !canvasRef.current) return
    ctxRef.current.closePath()
    setIsDrawing(false)

    const dataUrl = canvasRef.current.toDataURL('image/png')
    if (selectedFrame === 'base') {
      setBaseBackground(dataUrl)
    } else {
      updateFrameImage(selectedFrame, dataUrl)
    }
  }

  // безопасная очистка: только визуально, без записи в стейт
  const wipeCanvasOnly = () => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return
    ctx.globalCompositeOperation = 'source-over'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  // боевая очистка для кнопки "clear" — коммитит пустой кадр
  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return

    ctx.globalCompositeOperation = 'source-over'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (selectedFrame != 'base')
      updateFrameImage(selectedFrame, canvas.toDataURL('image/png'))
  }

  // регистрируем в контекст именно безопасную очистку
  useEffect(() => {
    registerCanvasClear(wipeCanvasOnly)
    return () => registerCanvasClear(null)
  }, [registerCanvasClear])

  const dupePrevFrame = () => {
    if (selectedFrame === 'base') return
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return

    const prevFrame = frames.find((f) => f.index === selectedFrame - 1)
    if (!prevFrame) return
    ctx.globalCompositeOperation = 'source-over'
    const img = new Image()
    img.src = prevFrame.image
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
  }

  return {
    containerRef,
    canvasRef,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    dupePrevFrame,
  }
}
