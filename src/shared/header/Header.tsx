import { useState } from 'react'
import Logo from '../../assets/logo.svg'
import Menu from '../../assets/mobile-menu.svg'
import './Header.scss'
import { useFrames, type Frame } from '../../modules/frames'

type HeaderProps = {
  onPreviewClick: () => void
  onRestartClick: () => void
  onExportProjectClick: (frames: Frame[]) => void
  onImportProjectClick: (onImport: (frames: Frame[]) => void) => Promise<void>
}

export const Header = ({
  onPreviewClick,
  onRestartClick,
  onExportProjectClick,
  onImportProjectClick,
}: HeaderProps) => {
  const [menuIsActive, setMenuIsActive] = useState(false)

  const { frames, uploadFrames } = useFrames()

  return (
    <header className="header__wrapper">
      <div className="header">
        <img src={Logo} alt="logo" className="header__logo" />
        <div className="header__buttons-box--desktop">
          <button
            className="header__button"
            onClick={() => onImportProjectClick(uploadFrames)}
          >
            <span>imp</span>
          </button>
          <button
            className="header__button"
            onClick={() => onExportProjectClick(frames)}
          >
            <span>exp</span>
          </button>
          <button className="header__button" onClick={onRestartClick}>
            <span>начать заново</span>
          </button>
          <button className="header__button" onClick={onPreviewClick}>
            <span>просмотр</span>
          </button>
        </div>
        <div
          className={`header__buttons-box--mobile  ${menuIsActive ? 'active' : ''}`}
        >
          <img
            src={Menu}
            alt="menu-icon"
            className={`header__buttons-box--mobile__menu-icon`}
            onClick={() => setMenuIsActive((r) => !r)}
          />
          <div className="header__buttons-box--mobile__buttons">
            <button
              className="header__button"
              onClick={() => onImportProjectClick(uploadFrames)}
            >
              <span>imp</span>
            </button>
            <button
              className="header__button"
              onClick={() => onExportProjectClick(frames)}
            >
              <span>exp</span>
            </button>
            <button className="header__button" onClick={onRestartClick}>
              <span>начать заново</span>
            </button>
            <button className="header__button" onClick={onPreviewClick}>
              <span>просмотр</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
