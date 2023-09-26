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
// брейкпоинт для карточек фильмов
const screen = { sm: 320, md: 768, lg: 1137, xl: 1280 };

// начальное количестьво карточек
const XL_ROW_INIT_CARDS = 16;
const LG_ROW_INIT_CARDS = 12;
const MD_ROW_INIT_CARDS = 8;
const SM_ROW_INIT_CARDS = 5;

// количестьво добавляемых карточек
const XL_ADD_CARD = 4;
const LG_ADD_CARD = 3;
const MD_ADD_CARD = 2;
const SM_ADD_CARD = 2;

module.exports = { regexpURL, regexpName, regexpEmail, resultMessage, baseUrl, 
  screen, XL_ROW_INIT_CARDS, LG_ROW_INIT_CARDS, MD_ROW_INIT_CARDS, SM_ROW_INIT_CARDS,
  XL_ADD_CARD, LG_ADD_CARD, MD_ADD_CARD, SM_ADD_CARD };

