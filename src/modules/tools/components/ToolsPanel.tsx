import { useTools } from "../context/ToolsContext"
import { BrushSize } from "./BrushSize"
import { ColorPicker } from "./ColorPicker"
import { ToolButton } from "./ToolButtons"
import "./Tools.scss"

export const ToolsPanel = () => {
  const { tools, setTool, setColor, setSize } = useTools()

  return (
    <div className="tools-panel">
      <div className="tools-panel__element">
        <div className="tools-panel__element__title">инструмент</div>
        <ToolButton
          tool={tools.tool}
          onBrushClick={() => setTool("brush")}
          onRubberClick={() => setTool("rubber")}
        />
      </div>

      <div className="tools-panel__element">
        <div className="tools-panel__element__title">цвет</div>
        <ColorPicker value={tools.color} onChange={setColor} />
      </div>

      <div className="tools-panel__element">
        <div className="tools-panel__element__title">размер</div>
        <BrushSize value={tools.size} onChange={setSize} />
      </div>
    </div>
  )
}
