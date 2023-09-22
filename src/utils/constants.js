// eslint-disable-next-line no-useless-escape
const regexpURL = /http[s]?:\/\/[www.]?[a-zA-Z0-9-._~:/?#\[\]@!$&'()*+,;=]+\.[a-zA-Z0-9]{2,3}[a-zA-Z0-9-._~:/?#\[\]@!$&'()*+,;=]*[\#]?/
// eslint-disable-next-line no-useless-escape
const regexpName = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/;
// eslint-disable-next-line no-useless-escape
const regexpEmail = /^[\-\w.]+@([A-z0-9][\-A-z0-9]+\.)+[A-z]{2,4}$/;
module.exports = { regexpURL, regexpName, regexpEmail };

