import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormAndValidation from '../../hooks/useFormAndValidations.js';
import InputLine from '../InputLine/InputLine.js';
import SignWithForm from '../SignWithForm/SignWithForm.js';
import { SignContext } from '../../Context/SignContext.js';
import { AppContext } from '../../Context/AppContext.js';
import Auth from '../../utils/Auth.js';
import { regexpEmail, regexpName } from '../../utils/constants.js';

export default function Register() {

  const navigate = useNavigate();
  const { setIsLoading, setLoggedIn, handleErrorPage, setErrorMessage } = useContext(AppContext);
  const { values, handleChange, errors, isValid, setValues, setErrors, setIsValid, resetForm } = useFormAndValidation({});
  const { register, login } = Auth({});
  const errorsRegisterPage = { errorPageMessage: 'При регистрации пользователя произошла ошибка.', errorCodePage: 409 }

  async function handleSubmitRegister() {
    setIsLoading(true); // заменить текст кнопки на время ответа сервера
    register(values.name, values.email, values.password) // отправить запрос на регистрацию: почта, пароль
      .then((res) => {
        login(values.email, values.password)
          .then((res) => {
            localStorage.setItem('jwt', res.token);
            setLoggedIn(true);
            navigate('/movies', { replace: true });
          })
          .catch((err) => {
            console.error(err);
          })
      })
      .catch((err) => { //попадаем сюда если один из промисов завершится ошибкой 
        // обрабатываем асинхронный промис с ошибкой
        err.then((res) => {
          handleErrorPage(res, errorsRegisterPage);
        });
      })
      .finally((res) => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setIsValid(false);
    resetForm();
    setErrorMessage('');
  }, [setIsValid, resetForm, setErrorMessage])

  return (
    <SignContext.Provider value={{ values, handleChange, errors, isValid, setValues, setErrors }}>
      <main className='register'>
        <SignWithForm formName="register"
          sectionClass="register__error"
          title="Добро пожаловать!"
          onSubmit={handleSubmitRegister}
          buttonText="Зарегистрироваться"
          buttonTextAction='Регистрация...'>
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