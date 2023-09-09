import { Link } from 'react-router-dom';
import profile from '../../images/profile.svg';

export default function Navigation() {

  return (
    <div className="navigation">
      <div className="navigation__container">
        <ul className="navigation__menu">
          <li className="navigation__item"><Link to='/' className="navigation__link">Главная</Link></li>
          <li className="navigation__item"><Link to='/movies' className="navigation__link">Фильмы</Link></li>
          <li className="navigation__item"><Link to='/saved-movies' className="navigation__link">Сохранённые фильмы</Link></li>
        </ul>
        <Link to='/profile' className='navigation__account'>
          <img src={profile} className="navigation__profile" alt="профиль" />
        </Link>
        <button
          type="button"
          className="button button_focus navigation__close_button"
          aria-label='закрыть'
        // onClick={closeAllPopups}
        >
        </button>
      </div>
    </div>
  )
}