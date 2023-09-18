import { useEffect } from 'react';
import useFormAndValidation from '../../hooks/useFormAndValidations.js';
import InputLine from '../InputLine/InputLine.js';
import SignWithForm from '../SignWithForm/SignWithForm.js';
import { SignContext } from '../../Context/SignContext.js';

export default function Register() {

  const { values, handleChange, errors, isValid, setValues, setErrors, setIsValid, resetForm } = useFormAndValidation({});

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    setIsValid(false);
    resetForm();
  }, [setIsValid, resetForm])

  return (
    <SignContext.Provider value={{ values, handleChange, errors, isValid, setValues, setErrors }}>
      <main className='register'>
        <SignWithForm formName="register"
        sectionClass="register__error"
          title="Добро пожаловать!"
          onSubmit={handleSubmit}
          buttonText="Зарегистрироваться">
          <InputLine name="name"
            type="text"
            placeholder="Имя"
            minLength="2"
            maxLength="30">
            Имя
          </InputLine>
          <InputLine name="email"
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