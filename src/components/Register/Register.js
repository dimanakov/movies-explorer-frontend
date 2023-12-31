import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useFormAndValidation from '../../hooks/useFormAndValidations.js';
import InputLine from '../InputLine/InputLine.js';
import SignWithForm from '../SignWithForm/SignWithForm.js';
import { SignContext } from '../../Context/SignContext.js';
import { AppContext } from '../../Context/AppContext.js';
import Auth from '../../utils/Auth.js';
import { regexpEmail, regexpName, resultMessage } from '../../utils/constants.js';

export default function Register() {

  const navigate = useNavigate();
  const location = useLocation();
  const {
    setIsLoading, isLoading, isLoggedIn,
    setLoggedIn } = useContext(AppContext);
  const { values, handleChange, errors, isValid, setValues,
    setErrors, setIsValid, resetForm } = useFormAndValidation({});
  const { register, login } = Auth({});
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmitRegister() {
    // заменить текст кнопки на время ответа сервера
    setIsLoading(true); 
    // отправить запрос на регистрацию: почта, пароль
    register(values.name, values.email, values.password) 
      .then((res) => {
        login(values.email, values.password)
          .then((res) => {
            localStorage.setItem('jwt', res.token);
            setLoggedIn(true);
            navigate('/movies', { replace: true });
          })
          .catch((err) => {
            console.error(err);
            if (err.status === 409) {
              return setErrorMessage(resultMessage.usedEmail);
            }
            setErrorMessage(resultMessage.failLogin);
          })
      })
      .catch((err) => {
        console.error(err);
        if (err.status === 409) {
          return setErrorMessage(resultMessage.usedEmail);
        }
        setErrorMessage(resultMessage.failRegister);
      })
      .finally((res) => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (isLoggedIn && location.pathname === '/signin') {
      navigate('/', { replace: true });
    }
    setIsValid(false);
    resetForm();
    setErrorMessage('');
  }, [setIsValid, resetForm, setErrorMessage, location, isLoggedIn, navigate])

  return (
    <SignContext.Provider value={{ values, handleChange, errors, isValid, setValues, setErrors }}>
      <main className='register'>
        <SignWithForm formName="register"
          sectionClass="register__error"
          title="Добро пожаловать!"
          onSubmit={handleSubmitRegister}
          buttonText="Зарегистрироваться"
          buttonTextAction='Регистрация...'
          errorMessage={errorMessage}
          isLoading={isLoading}>
          <InputLine name="name"
            type="text"
            placeholder="Имя"
            pattern={regexpName.source}
            minLength="2"
            maxLength="30">
            Имя
          </InputLine>
          <InputLine name="email"
            pattern={regexpEmail.source}
            type="email"
            placeholder="email" >
            E-mail
          </InputLine>
          <InputLine name="password"
            placeholder="Пароль"
            type="password">
            Пароль
          </InputLine>
        </SignWithForm>
      </main>
    </SignContext.Provider>
  )
}