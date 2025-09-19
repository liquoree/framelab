import { HsvColorPicker, type HsvColor } from 'react-colorful'
import { hsvToHex, hexToHsv } from '../utils/colorUtils'
import './Tools.scss'

interface ColorPickerProps {
  value: string
  onChange: (hex: string) => void
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const hsv = hexToHsv(value)

  const handleChange = (newColor: HsvColor) => {
    onChange(hsvToHex(newColor.h, newColor.s, newColor.v))
  }

  return (
    <div className="color-picker">
      <HsvColorPicker color={hsv} onChange={handleChange} />
    </div>
  )
}
