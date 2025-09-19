import './Tools.scss'

interface BrushSizeProps {
  value: number
  onChange: (size: number) => void
}

export const BrushSize = ({ value, onChange }: BrushSizeProps) => {
  return (
    <div className="brush-size">
      <input
        type="range"
        min={1}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="brush-size__slider"
      />
    </div>
  )
}
