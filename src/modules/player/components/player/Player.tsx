import PlayerClose from '../../../../assets/close-player.svg'
import './Player.scss'
import { FPSControl } from '../fps-control/FPSControl'

type PlayerProps = {
    onClose: () => void
}

export const Player = ({ onClose }: PlayerProps) => {
  return (
    <div className="player__wrapper">
        <div className="player">
            <div className="player__header">
                <div className="player__settings">
                    <FPSControl />
                    <div className="player__settings__export">
                        <span>экспорт</span>
                    </div>
                </div>
                <div className="player__close" onClick={onClose}>
                    <img src={PlayerClose} alt="close-player" />
                </div>
            </div>
            <div className="player__body">
                {/* frames display */}
            </div>
        </div>
    </div>
  )
}
