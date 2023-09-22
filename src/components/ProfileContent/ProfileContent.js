import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext.js';
import Button from '../Button/Button.js';
import useFormAndValidation from '../../hooks/useFormAndValidations.js';
import { regexpEmail, regexpName } from '../../utils/constants.js';

export default function ProfileContent() {

  const navigate = useNavigate();
  const currentUser = 'Дмитрий';
  const [isEdit, setIsEdit] = useState(false);
  const { isValid, values, handleChange, errors } = useFormAndValidation({});
  const { setLoggedIn } = useContext(AppContext);

  function handleEditButton() {
    setIsEdit(true);
  }

  function handleSubmitButton(e) {
    e.preventDefault();
    setIsEdit(false);
  }

  function handleExitButton(e) {
    e.preventDefault();
    setLoggedIn(false);
    localStorage.clear();
    navigate('/signin', { replace: true });
  }

  return (
    <section className="profile-content">
      <h1 className="profile-content__title">Привет, {currentUser}!</h1>
      <form className="profile-content__profile">
        <label className="profile-content__label">
          Имя
          <input className="text profile-content__input"
            name="name"
            value={values.name || ''}
            onChange={handleChange}
            type="text"
            pattern={regexpName.source}
            placeholder="Имя"
            aria-label="Имя"
            minLength="2"
            maxLength="30"
            required />
        </label>
        <span className={`text profile-content__error ${errors.name ? "profile-content__error_active" : ""}`}>{errors.name}</span>
        <label className="profile-content__label">
          E-mail
          <input className="text profile-content__input"
            name="email"
            value={values.email || ''}
            onChange={handleChange}
            id="email-input"
            type="email"
            pattern={regexpEmail.source}
            aria-label="email"
            placeholder="Email"
            autoComplete="on"
            minLength="2"
            maxLength="56"
            required />
        </label>
        <span className={`text profile-content__error ${errors.email ? "profile-content__error_active" : ""}`}>{errors.email}</span>
        {isEdit &&
          <div className="profile-content__group profile-content__group_type_save">
            <span className={`text profile-content__error
            ${errors.name || errors.email ? "profile-content__error_active" : ""}`}>
              Здесь будут ошибки после отправки запроса
            </span>
            <button type="submit"
              className={`button button_focus profile-content__button 
              profile-content__button_type_submit
          ${isValid ? '' : 'sign-with-form__submit_inactive'}`}
              disabled={!isValid}>
              Сохранить
            </button>
          </div>
        }
        {!isEdit &&
          <div className="profile-content__group profile-content__group_type_edit">
            <Button buttonType="button"
              sectionClass="profile-content__button profile-content__button_type_edit"
              onClick={handleEditButton}>Редактировать</Button>
            <Button buttonType="button"
              sectionClass="profile-content__button profile-content__button_type_exit"
              onClick={handleExitButton}>Выйти из аккаунта</Button>
          </div>
        }
      </form>
    </section>
  )
}