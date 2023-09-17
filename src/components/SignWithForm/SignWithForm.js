import Logo from '../Logo/Logo.js';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { SignContext } from '../../Context/SignContext.js';

export default function SignWithForm({ formName, title, children, buttonText }) {

  const { isValid } = useContext(SignContext);
  const location = useLocation();

  return (
    <section className="sign-with-form">
      <Logo sectionClass="sign-with-form__logo" />
      <h1 className="sign-with-form__title">{title}</h1>
      <form className="form"
        name={formName}>
        {children}
        <button type="submit"
          className={`button button_focus sign-with-form__submit 
          ${isValid ? '' : 'sign-with-form__submit_inactive'}`}
          disabled={isValid}>
          {buttonText}
        </button>
      </form>
      {location.pathname === '/signin' && <span className="sign-with-form__question">
        Ещё не зарегистрированы?
        <Link to="/signup" className="sign-with-form__link">Регистрация</Link>
      </span>}
      {location.pathname === '/signup' && <span className="sign-with-form__question">
        Уже зарегистрированы?
        <Link to="/signin" className="sign-with-form__link">Войти</Link>
      </span>}
    </section>
  )
}