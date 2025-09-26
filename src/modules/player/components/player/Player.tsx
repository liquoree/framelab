import PlayerClose from '../../../../assets/close-player.svg'
import './Player.scss'
import { FPSControl } from '../fps-control/FPSControl'
import { useFrames } from '../../../frames'
import { useState, useRef, useEffect } from 'react'
import { usePlayer } from '../../hooks/usePlayer'
import { useExporter } from '../../../exporter'

type PlayerProps = {
  onClose: () => void
}

export const Player = ({ onClose }: PlayerProps) => {
  const { frames } = useFrames()
  const [fps, setFps] = useState(10)
  const [formatsAreShown, setFormatsAreShown] = useState(false)
  const exportRef = useRef<HTMLDivElement>(null)

  const { handleExportGif, loading } = useExporter(frames, fps)

  const { currentFrame, isPlaying, playBtnIsShown, play, stop } =
    usePlayer(frames)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        formatsAreShown &&
        exportRef.current &&
        !exportRef.current.contains(e.target as Node)
      ) {
        setFormatsAreShown(false)
      }
    }

    if (formatsAreShown) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [formatsAreShown])

  return (
    <div className="player__wrapper" onClick={onClose}>
      <div className="player" onClick={(e) => e.stopPropagation()}>
        <div className="player__header">
          <div className="player__settings">
            <FPSControl
              initial={10}
              min={1}
              max={60}
              onChange={setFps}
              isPlaying={isPlaying}
            />
            <div ref={exportRef} className="player__settings__export">
              <button
                className="player__settings__export__btn"
                onClick={(e) => {
                  e.stopPropagation()
                  handleExportGif()
                }}
                disabled={loading}
              >
                <span>{loading ? 'загрузка...' : 'экспорт gif'}</span>
              </button>
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
            <div className="player__body__play" onClick={() => play(fps)} />
          )}
          {isPlaying && <div className="player__body__stop" onClick={stop} />}
        </div>
      </div>
    </div>
  )
}
