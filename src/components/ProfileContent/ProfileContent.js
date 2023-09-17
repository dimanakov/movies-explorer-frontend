import { useState } from 'react';
import Button from '../Button/Button.js';
import useFormAndValidation from '../../hooks/useFormAndValidations.js';

export default function ProfileContent({ setIsLoggedIn }) {

  const currentUser = 'Дмитрий';
  const [isEdit, setIsEdit] = useState(false);
  const { values, handleChange, errors, isValid, setValues, setErrors } = useFormAndValidation({});

  function handleEditButton() {
    setIsEdit(true);
  }

  function handleSubmitButton(e) {
    e.preventDefault();
    setIsEdit(false);
  }

  function handleExitButton(e) {
    e.preventDefault();
    setIsLoggedIn(false);
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
            value={values.email || ''}
            onChange={handleChange}
            id="email-input"
            type="email"
            name="email"
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
            ${errors.email ? "profile-content__error_active" : ""}`}>
              Здесь будут ошибки после отправки запроса
            </span>
            <Button buttonType="submit"
              sectionClass="profile-content__button profile-content__button_type_submit"
              handleClick={handleSubmitButton}>Сохранить</Button>
          </div>
        }
        {!isEdit &&
          <div className="profile-content__group profile-content__group_type_edit">
            <Button buttonType="button"
              sectionClass="profile-content__button profile-content__button_type_edit"
              handleClick={handleEditButton}>Редактировать</Button>
            <Button buttonType="button"
              sectionClass="profile-content__button profile-content__button_type_exit"
              handleClick={handleExitButton}>Выйти из аккаунта</Button>
          </div>
        }
      </form>
    </section>
  )
}