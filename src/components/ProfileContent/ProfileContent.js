import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext.js';
import Button from '../Button/Button.js';
import useFormAndValidation from '../../hooks/useFormAndValidations.js';
import { regexpEmail, regexpName } from '../../utils/constants.js';

export default function ProfileContent({ handleProfileSubmit, isSuccess, isLoading, errorMessage, isEdit, setIsEdit }) {

  const navigate = useNavigate();
  const { setLoggedIn, currentUser } = useContext(AppContext);

  const { isValid, values, setValues, handleChange, errors, setErrors } = useFormAndValidation({});

  // включить редактирование данных пользователя
  function onEditButton() {
    setIsEdit(true);
  }

  // проверяем наличие изменений в данных профиля
  function checkData() {
    if (values.name === currentUser.name && values.email === currentUser.email) {
      return true
    }
    return false
  }

  // контроль инпутов
  function handleInput(e) {
    handleChange(e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleProfileSubmit({
      name: values.name,
      email: values.email,
    });
  }

  // выйти из аккаунта
  function onSignOut(e) {
    e.preventDefault();
    setLoggedIn(false);
    localStorage.clear();
    navigate('/', { replace: true });
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email })
    setErrors({ name: '', email: '' })
  }, [currentUser, setValues, setErrors]);

  return (
    <section className="profile-content">
      <h1 className="profile-content__title">Привет, {currentUser.name}!</h1>
      <form className="profile-content__profile"
        onSubmit={handleSubmit}>
        <label className="profile-content__label">
          Имя
          <input className="text profile-content__input"
            name="name"
            value={values.name || ''}
            onChange={handleInput}
            type="text"
            pattern={regexpName.source}
            placeholder="Имя"
            aria-label="Имя"
            minLength="2"
            maxLength="30"
            disabled={!isEdit || isLoading}
            required />
        </label>
        <span className={`text profile-content__error ${errors.name
          ? "profile-content__error_active"
          : ""}`}>
          {errors.name}</span>
        <label className="profile-content__label">
          E-mail
          <input className="text profile-content__input"
            name="email"
            value={values.email || ''}
            onChange={handleInput}
            id="email"
            type="email"
            pattern={regexpEmail.source}
            aria-label="email"
            placeholder="Email"
            autoComplete="on"
            minLength="2"
            maxLength="56"
            disabled={!isEdit || isLoading}
            required />
        </label>
        <span className={`text profile-content__error ${errors.email
          ? "profile-content__error_active"
          : ""}`}>{errors.email}</span>
        {isEdit &&
          <div className="profile-content__group profile-content__group_type_save">
            <span className={`text profile-content__error
            ${!isSuccess ? "profile-content__message_active" : ""}`}>
              {errorMessage}
            </span>
            <button type="submit"
              className={`button button_focus profile-content__button 
              profile-content__button_type_submit
          ${(isValid && !checkData()) ? '' : 'sign-with-form__submit_inactive'}`}
              disabled={(isValid && checkData())}>
              Сохранить
            </button>
          </div>
        }
        {!isEdit &&
          <div className="profile-content__group profile-content__group_type_edit">
            <span className={`profile-content__success
            ${isSuccess ? "profile-content__message_active" : ""}`}>
              Поздравляем! Данные&nbsp;пользователя успешно изменены
            </span>
            <Button buttonType="button"
              sectionClass="profile-content__button profile-content__button_type_edit"
              onClick={onEditButton}>Редактировать</Button>
            <Button buttonType="button"
              sectionClass="profile-content__button profile-content__button_type_exit"
              onClick={onSignOut}>Выйти из аккаунта</Button>
          </div>
        }
      </form>
    </section>
  )
}