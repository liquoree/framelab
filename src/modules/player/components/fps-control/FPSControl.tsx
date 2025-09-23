import { useState } from 'react'
import FpsArrow from '../../../../assets/fps-arrow.svg'
import './FPSControl.scss'

interface FPSControlProps {
  min?: number
  max?: number
  initial?: number
  onChange?: (fps: number) => void
  isPlaying?: boolean
}

export const FPSControl = ({
  min = 1,
  max = 60,
  initial = 10,
  onChange,
  isPlaying,
}: FPSControlProps) => {
  const [fps, setFps] = useState<number | ''>(initial)

  const updateFps = (newValue: number) => {
    const clamped = Math.max(min, Math.min(max, newValue))
    setFps(clamped)
    onChange?.(clamped)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '') {
      setFps('')
      return
    }
    const parsed = parseInt(value, 10)
    if (!isNaN(parsed)) {
      setFps(parsed)
    }
  }

  const confirmValue = () => {
    if (fps === '') {
      setFps(initial)
      onChange?.(initial)
      return
    }
    const clamped = Math.max(min, Math.min(max, fps as number))
    setFps(clamped)
    onChange?.(clamped)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      confirmValue()
      ;(e.target as HTMLInputElement).blur() // убираем фокус, чтобы имитировать submit
    }
  }

  return (
    <div className={`fps-control ${isPlaying ? 'fps-control--disabled' : ''}`}>
      <div className="fps-control__arrows">
        <img
          src={FpsArrow}
          alt="increase fps"
          className="fps-control__arrow fps-control__arrow--up"
          onClick={() => updateFps((fps === '' ? initial : fps) + 1)}
        />
        <img
          src={FpsArrow}
          alt="decrease fps"
          className="fps-control__arrow fps-control__arrow--down"
          onClick={() => updateFps((fps === '' ? initial : fps) - 1)}
        />
      </div>

      <input
        type="number"
        className="fps-control__input"
        value={fps}
        onChange={handleInputChange}
        onBlur={confirmValue}
        onKeyDown={handleKeyDown}
        min={min}
        max={max}
        style={{ width: `${String(fps).length + 3}ch` }}
      />

      <span className="fps-control__desc">к/с</span>
    </div>
  )
}
