import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../Button/Button.js';


export default function Navigation() {

  const [menu, setMenu] = useState(false);

  function handleMenuButton() {
    setMenu(!menu);
  }

  return (

    <div className="navigation">
      <Button sectionClass='navigation__burger-button'
        label='открыть меню'
        onClick={handleMenuButton}>
      </Button>
      <nav className={`navigation__navbar ${menu ? 'navigation__navbar_active' : ''}`}>
        <ul className="navigation__menu">
          <li className="navigation__item">
            <NavLink to='/'
              className={({ isActive }) => `navigation__link ${isActive ? "navigation__link_active" : ""}`}
              onClick={handleMenuButton}>
              Главная
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink to='/movies'
              className={({ isActive }) => `navigation__link ${isActive ? "navigation__link_active" : ""}`}
              onClick={handleMenuButton}>
              Фильмы
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink to='/saved-movies'
              className={({ isActive }) => `navigation__link ${isActive ? "navigation__link_active" : ""}`}
              onClick={handleMenuButton}>
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <NavLink to='/profile'
          className='navigation__account navigation__link'
          onClick={handleMenuButton}
          aria-label="аккаунт">
        </NavLink>
        <Button sectionClass='navigation__close-button'
          label='закрыть меню'
          onClick={handleMenuButton}>
        </Button>
      </nav>
    </div>
  )
}
