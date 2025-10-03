// FramesContext.tsx (логика работы с кадрами):
import { createContext, useContext, useRef, useState } from 'react'
import type { Frame } from '../types'

function createBlankDataUrl(width: number, height: number): string {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas.toDataURL('image/png')
}

function createFrame(
  index: number,
  background: string | null,
  width = 500,
  height = 500
): Frame {
  return {
    id: crypto.randomUUID(),
    index,
    image: background || createBlankDataUrl(width, height),
  }
}

interface FramesContextType {
  frames: Frame[]
  selectedFrame: number | 'base'
  setSelectedFrame: (index: number | 'base') => void
  addFrame: () => void
  deleteFrame: (index: number) => void
  updateFrameImage: (index: number, image: string) => void
  clearFrames: () => void
  baseBackground: string
  setBaseBackground: (img: string) => void
  uploadFrames: (newFrames: Frame[]) => void
  registerCanvasClear: (fn: (() => void) | null) => void
  forceReload: number
}

const FramesContext = createContext<FramesContextType | null>(null)

export const FramesProvider = ({ children }: { children: React.ReactNode }) => {
  const [baseBackground, setBaseBackground] = useState<string>(
    createBlankDataUrl(500, 500)
  )

  const startInitialFrames = Array.from({ length: 1 }, (_, i) =>
    createFrame(i + 1, baseBackground)
  )
  const [initialFrames, setInitialFrames] = useState(startInitialFrames)

  const [frames, setFrames] = useState<Frame[]>(initialFrames)
  const [selectedFrame, setSelectedFrame] = useState<number | 'base'>(1)
  const [forceReload, setForceReload] = useState(0)

  const uploadFrames = (newFrames: Frame[]) => {
    clearCanvasRef.current?.()

    setFrames([...newFrames])

    const wasFirst = selectedFrame === 1

    setSelectedFrame(1)

    if (wasFirst) {
      setForceReload((prev) => prev + 1)
    }

    setBaseBackground(createBlankDataUrl(500, 500))
  }

  const addFrame = () => {
    const newIndex = frames.length + 1
    const newFrame = createFrame(newIndex, baseBackground)
    setFrames([...frames, newFrame])
    setSelectedFrame(newIndex)
  }

  const deleteFrame = (index: number) => {
    if (frames.length > 1) {
      let newSelected = selectedFrame
      if (typeof selectedFrame == 'number') {
        if (selectedFrame === index) {
          if (index === frames.length) {
            newSelected = index - 1
          } else {
            newSelected = index
          }
        } else if (selectedFrame > index) {
          newSelected = selectedFrame - 1
        }
      }

      const updated = frames.filter((f) => f.index !== index)
      const reindexed = updated.map((f, i) => ({ ...f, index: i + 1 }))

      setFrames(reindexed)
      setSelectedFrame(newSelected)
    }
  }

  const updateFrameImage = (index: number, image: string) => {
    setFrames((prev) =>
      prev.map((f) => (f.index === index ? { ...f, image } : f))
    )
  }

  const clearCanvasRef = useRef<(() => void) | null>(null)

  const registerCanvasClear = (fn: (() => void) | null) => {
    clearCanvasRef.current = fn
  }

  const clearFrames = () => {
    setBaseBackground(createBlankDataUrl(500, 500))
    setInitialFrames(startInitialFrames)

    setFrames(initialFrames)
    setSelectedFrame(1)
    clearCanvasRef.current?.()
  }

  return (
    <FramesContext.Provider
      value={{
        frames,
        selectedFrame,
        setSelectedFrame,
        addFrame,
        deleteFrame,
        updateFrameImage,
        clearFrames,
        baseBackground,
        setBaseBackground,
        uploadFrames,
        registerCanvasClear,
        forceReload,
      }}
    >
      {children}
    </FramesContext.Provider>
  )
}

export const useFrames = () => {
  const ctx = useContext(FramesContext)
  if (!ctx) throw new Error('useFrames must be used inside FramesProvider')
  return ctx
}
