import { useState } from 'react'
import Logo from '../../assets/logo.svg'
import Menu from '../../assets/mobile-menu.svg'
import './Header.scss'

export const Header = () => {
  const [menuIsActive, setMenuIsActive] = useState(false)

  return (
    <header className="header__wrapper">
      <div className="header">
        <img src={Logo} alt="logo" className="header__logo" />
        <div className="header__buttons-box--desktop">
          <button className="header__button">
            <span>начать заново</span>
          </button>
          <button className="header__button">
            <span>просмотр</span>
          </button>
          <button className="header__button">
            <span>экспорт</span>
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
            <button className="header__button">
              <span>начать заново</span>
            </button>
            <button className="header__button">
              <span>просмотр</span>
            </button>
            <button className="header__button">
              <span>экспорт</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
