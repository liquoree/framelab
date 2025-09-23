import PlayerClose from "../../../../assets/close-player.svg"
import "./Player.scss"
import { FPSControl } from "../fps-control/FPSControl"
import { useFrames } from "../../../frames"
import { useState } from "react"
import { usePlayer } from '../../hooks/usePlayer'

type PlayerProps = {
  onClose: () => void
}

export const Player = ({ onClose }: PlayerProps) => {
  const { frames } = useFrames()
  const [fps, setFps] = useState(10)

  const { currentFrame, isPlaying, playBtnIsShown, play, stop } = usePlayer(frames)

  return (
    <div className="player__wrapper">
      <div className="player">
        <div className="player__header">
          <div className="player__settings">
            <FPSControl
              initial={10}
              min={1}
              max={60}
              onChange={setFps}
              isPlaying={isPlaying}
            />
            <div className="player__settings__export">
              <span>экспорт</span>
            </div>
          </div>
          <div className="player__close" onClick={onClose}>
            <img src={PlayerClose} alt="close-player" />
          </div>
        </div>

        <div className="player__body">
          <div
            className="player__body__inner"
            style={{ backgroundImage: `url('${frames[currentFrame].image}')` }}
          />
          {playBtnIsShown && (
            <div className="player__body__play" onClick={() => play(fps)}>
              PLAY
            </div>
          )}
          {isPlaying && (
            <div className="player__body__stop" onClick={stop}>
              STOP
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
