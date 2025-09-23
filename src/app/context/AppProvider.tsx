import { type ReactNode } from 'react'
import { ToolsProvider } from '../../modules/tools'
import { FramesProvider } from '../../modules/frames'

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ToolsProvider>
      <FramesProvider>{children}</FramesProvider>
    </ToolsProvider>
  )
}
