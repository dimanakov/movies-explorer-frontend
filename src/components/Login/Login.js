import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormAndValidation from '../../hooks/useFormAndValidations.js';
import InputLine from '../InputLine/InputLine.js';
import SignWithForm from '../SignWithForm/SignWithForm.js';
import { SignContext } from '../../Context/SignContext.js';
import { AppContext } from '../../Context/AppContext.js';
import Auth from '../../utils/Auth.js';
import { regexpEmail } from '../../utils/constants.js';

export default function Login() {

  const navigate = useNavigate();
  const { setIsLoading, setLoggedIn, setCurrentUser, handleErrorPage, setErrorMessage } = useContext(AppContext);
  const { values, handleChange, errors, isValid, setValues, setErrors, setIsValid, resetForm } = useFormAndValidation({});
  const { login } = Auth({});
  const errorsLoginPage = { errorPageMessage: 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.', errorCodePage: 401 }

  function handleSubmitLogin(e) {
    setIsLoading(true);
    login(values.email, values.password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        err.then((res) => {
          handleErrorPage(res, errorsLoginPage);
        });
      })
      .finally(() => {
        setIsLoading(false)
      });
  }

  useEffect(() => {
    setIsValid(false);
    resetForm();
    setErrorMessage('');
  }, [setIsValid, resetForm, setErrorMessage])

  return (
    <SignContext.Provider value={{ values, handleChange, errors, isValid, setValues, setErrors }}>
      <main className='login'>
        <SignWithForm formName="login"
          sectionClass="login__error"
          title="Рады видеть!"
          onSubmit={handleSubmitLogin}
          buttonText="Войти">
          <InputLine name="email"
            type="email"
            pattern={regexpEmail.source}
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