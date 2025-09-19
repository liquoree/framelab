import { useEffect, useRef, useState } from 'react'
import type { Frame } from '../types'
import './FramesBox.scss'
import Delete from '../../../assets/delete.svg'

export const FramesBox = () => {
  const [selectedFrame, setSelectedFrame] = useState(1)
  const [frames, setFrames] = useState<Frame[]>([
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ])
  const containerRef = useRef<HTMLDivElement>(null)

  const addFrame = () => {
    const newFrame: Frame = {
      id: String(frames.length + 1),
    }
    setFrames([...frames, newFrame])
    setSelectedFrame(frames.length + 1)
  }

  const deleteFrame = (id: number) => {
    setFrames(frames.filter((frame) => frame.id != String(id)))
  }

  // автопрокрутка вправо при добавлении кадра
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollWidth,
        behavior: 'smooth',
      })
    }
  }, [frames.length])

  return (
    <div className="frames-box" ref={containerRef}>
      {frames.map((frame, id) => (
        <div
          id={String(id + 1)}
          className={`frame ${selectedFrame == id + 1 ? 'selected' : ''}`}
          onClick={() => setSelectedFrame(id + 1)}
        >
          <img
            src={Delete}
            alt="delete-frame"
            className="frame__delete-frame"
            onClick={() => deleteFrame(id + 1)}
          />
          Frame {frame.id}
        </div>
      ))}
      <div className="frame add-frame" onClick={addFrame}>
        +
      </div>
    </div>
  )
}
