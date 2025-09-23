import { HsvColorPicker, type HsvColor } from 'react-colorful'
import { hsvToHex, hexToHsv } from '../utils/colorUtils'
import { useState } from 'react'
import './Tools.scss'

interface ColorPickerProps {
  value: string
  onChange: (hex: string) => void
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  // инициализируем локальное состояние по value один раз
  const [hsv, setHsv] = useState<HsvColor>(hexToHsv(value))

  const handleChange = (newColor: HsvColor) => {
    setHsv(newColor) // двигаем ползунок плавно
    const hex = hsvToHex(newColor.h, newColor.s, newColor.v)
    if (hex !== value) {
      onChange(hex) // наружу отправляем только реальное изменение
    }
  }

  return (
    <div className="color-picker">
      <HsvColorPicker color={hsv} onChange={handleChange} />
    </div>
  )
}
