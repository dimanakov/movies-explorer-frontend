import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation.js';
import Auth from '../Auth/Auth.js';

export default function Header() {
  const isLoggedIn = true;

  return (
    <header className="header">
      <div className="header__container">
        <Link to='/' className="header__logo">
          <img src={logo}
            className="logo"
            alt="logo" />
        </Link>
        {!isLoggedIn && <Auth />}
        {isLoggedIn && <Navigation />}
      </div>
    </header>
  );
}