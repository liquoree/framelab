import type { ToolsState } from '../types'
import { useState } from 'react'

export const useTools = () => {
  const [tools, setTools] = useState<ToolsState>({
    tool: 'brush',
    color: '#000000',
    size: 5,
  })

  const setColor = (color: string) => {
    setTools((prev) => ({ ...prev, color }))
  }
  const setSize = (size: number) => {
    setTools((prev) => ({ ...prev, size }))
  }
  const setTool = (tool: ToolsState['tool']) => {
    setTools((prev) => ({ ...prev, tool }))
  }

  return { tools, setColor, setSize, setTool }
}
