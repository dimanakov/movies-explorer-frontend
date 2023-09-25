// eslint-disable-next-line no-useless-escape
const regexpURL = /http[s]?:\/\/[www.]?[a-zA-Z0-9-._~:/?#\[\]@!$&'()*+,;=]+\.[a-zA-Z0-9]{2,3}[a-zA-Z0-9-._~:/?#\[\]@!$&'()*+,;=]*[\#]?/
// eslint-disable-next-line no-useless-escape
const regexpName = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/;
// eslint-disable-next-line no-useless-escape
const regexpEmail = /^[\-\w.]+@([A-z0-9][\-A-z0-9]+\.)+[A-z]{2,4}$/;
// сервер с изображениями фильмов
const baseUrl = 'https://api.nomoreparties.co/';
// заготовки сообщений
const resultMessage = {
  error: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
  emptySearch: 'Нужно ввести ключевое слово',
  findNothing: 'Ничего не найдено',
  usedEmail: 'Пользователь с таким email уже существует.',
  failRegister: 'При регистрации пользователя произошла ошибка.', 
  failUserUpdate: 'При обновлении профиля произошла ошибка.',
  wrongEmailPass: 'Вы ввели неправильный логин или пароль.',
  failLogin: 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.',
  failToken: 'При авторизации произошла ошибка. Переданный токен некорректен.',
  serverError: 'На сервере произошла ошибка.',
}

module.exports = { regexpURL, regexpName, regexpEmail, resultMessage, baseUrl };

