import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Tool } from '../types'

interface ToolsState {
  tool: Tool
  color: string
  size: number
}

interface ToolsContextType {
  tools: ToolsState
  setTool: (tool: Tool) => void
  setColor: (color: string) => void
  setSize: (size: number) => void
}

const ToolsContext = createContext<ToolsContextType | undefined>(undefined)

export const ToolsProvider = ({ children }: { children: ReactNode }) => {
  const [tools, setTools] = useState<ToolsState>({
    tool: 'brush',
    color: '#000000',
    size: 5,
  })

  const setColor = (color: string) =>
    setTools((prev) => (prev.color === color ? prev : { ...prev, color }))

  const setSize = (size: number) =>
    setTools((prev) => (prev.size === size ? prev : { ...prev, size }))

  const setTool = (tool: Tool) =>
    setTools((prev) => (prev.tool === tool ? prev : { ...prev, tool }))

  return (
    <ToolsContext.Provider value={{ tools, setTool, setColor, setSize }}>
      {children}
    </ToolsContext.Provider>
  )
}

export const useTools = () => {
  const ctx = useContext(ToolsContext)
  if (!ctx) throw new Error('useTools must be used within a ToolsProvider')
  return ctx
}
