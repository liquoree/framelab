import { useState } from 'react'
import type { Frame } from '../types'

function createFrame(index: number): Frame {
  return { id: crypto.randomUUID(), index }
}

export function useFrames(initialCount = 3) {
  const initialFrames = Array.from({ length: initialCount }, (_, i) =>
    createFrame(i + 1)
  )

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

  return { frames, selectedFrame, setSelectedFrame, addFrame, deleteFrame }
}
