import { useAutoScroll } from '../hooks/useAutoScroll'
import Delete from '../../../assets/delete.svg'
import './FramesBox.scss'
import { useFrames } from '../context/FramesContext'

export const FramesBox = () => {
  const { frames, selectedFrame, setSelectedFrame, addFrame, deleteFrame } =
    useFrames()

  const containerRef = useAutoScroll<HTMLDivElement>(frames)

  return (
    <div className="frames-box" ref={containerRef}>
      {frames.map((frame) => (
        <div
          key={frame.id}
          id={String(frame.index)}
          className={`frame ${selectedFrame === frame.index ? 'selected' : ''}`}
          onClick={() => setSelectedFrame(frame.index)}
        >
          <img
            src={Delete}
            alt="delete-frame"
            className="frame__delete-frame"
            onClick={(e) => {
              e.stopPropagation()
              deleteFrame(frame.index)
            }}
          />
          <img
            src={frame.image}
            alt={`frame-${frame.index}`}
            className="frame__preview"
          />
        </div>
      ))}
      <div className="frame add-frame" onClick={addFrame}>
        +
      </div>
    </div>
  )
}
