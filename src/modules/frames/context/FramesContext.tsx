import { createContext, useContext, useState } from 'react'
import type { Frame } from '../types'

function createBlankDataUrl(width: number, height: number): string {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)
  }
  return canvas.toDataURL('image/png')
}

function createFrame(index: number, width = 500, height = 500): Frame {
  return {
    id: crypto.randomUUID(),
    index,
    image: createBlankDataUrl(width, height),
  }
}

interface FramesContextType {
  frames: Frame[]
  selectedFrame: number
  setSelectedFrame: (index: number) => void
  addFrame: () => void
  deleteFrame: (index: number) => void
  updateFrameImage: (index: number, image: string) => void
}

const FramesContext = createContext<FramesContextType | null>(null)

export const FramesProvider = ({ children }: { children: React.ReactNode }) => {
  const initialFrames = Array.from({ length: 3 }, (_, i) => createFrame(i + 1))

  const [frames, setFrames] = useState<Frame[]>(initialFrames)
  const [selectedFrame, setSelectedFrame] = useState<number>(1)

  const addFrame = () => {
    const newIndex = frames.length + 1
    const newFrame = createFrame(newIndex)
    setFrames([...frames, newFrame])
    setSelectedFrame(newIndex)
  }

  const deleteFrame = (index: number) => {
    if (frames.length > 1) {
      let newSelected = selectedFrame

      if (selectedFrame === index) {
        if (index === frames.length) {
          newSelected = index - 1
        } else {
          newSelected = index
        }
      } else if (selectedFrame > index) {
        newSelected = selectedFrame - 1
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

  return (
    <FramesContext.Provider
      value={{
        frames,
        selectedFrame,
        setSelectedFrame,
        addFrame,
        deleteFrame,
        updateFrameImage,
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
