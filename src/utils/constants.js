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
}
module.exports = { regexpURL, regexpName, regexpEmail, resultMessage, baseUrl };

