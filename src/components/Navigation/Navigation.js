import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import profile from '../../images/profile.svg';
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
        handleClick={handleMenuButton}>
      </Button>
      <nav className={`navigation__navbar ${menu ? 'navigation__navbar_active' : ''}`}>
        <ul className="navigation__menu">
          <li className="navigation__item">
            <NavLink to='/'
              className="navigation__link"
              onClick={handleMenuButton}>
              Главная
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink to='/movies'
              className="navigation__link"
              onClick={handleMenuButton}>
              Фильмы
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink to='/saved-movies'
              className="navigation__link"
              onClick={handleMenuButton}>
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <NavLink to='/profile'
          className='navigation__account'
          onClick={handleMenuButton}>
          <img src={profile} className="navigation__profile" alt="профиль" />
        </NavLink>
        <Button sectionClass='navigation__close-button'
          label='закрыть меню'
          handleClick={handleMenuButton}>
        </Button>
      </nav>
    </div>
  )
}
