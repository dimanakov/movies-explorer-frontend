// import Navigation from '../Navigation/Navigation.js';
import logo from '../../images/logo.svg';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function Header({ isLoggedIn }) {
  // const location = useLocation();
  // const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header__container">
        <a className="header__logo" href="http://localhost:3000/">
          <img
            src={logo}
            className="logo"
            alt="logo" />
        </a>
        <ul className="header__menu">
          {/* {!isLoggedIn &&  */}
          <li>
            <Link to='/sign-up' className="header__link">Регистрация</Link>
          </li>
          <li>
            <Link to='/sign-in'>
              <button type='button'
                className="header__login-button header__link">
                Войти
              </button>
            </Link>
          </li>
          {/* } */}
          {/* {isLoggedIn && <li><Navigation/></li>} */}
        </ul>
      </div>
    </header>
  );
}