import { useState, useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import moviesApi from './MoviesApi.js';

export default function SearchEngine() {

  const { setIsLoading, handleErrorPage, setErrorMessage, userMovies, setUserMovies } = useContext(AppContext);

  // сервер с изображениями фильмов
  const baseUrl = 'https://api.nomoreparties.co/';
  // заготовки сообщений
  const resultMessage = {
    error: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
    emptySearch: 'Нужно ввести ключевое слово',
    findNothing: 'Ничего не найдено',
  }

  // список всех фильмов полученных от сервера
  const [allMovies, setAllMovies] = useState([]);
  // const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('films')) || []);

  // значение инпута поисковой строки
  const [searchValue, setSearchValue] = useState('');
  // const [searchValue, setSearchValue] = useState(localStorage.getItem('searchString') || '');

  // список фильмов подходящих по поисковому запросу
  const [filteredMovies, setFilteredMovies] = useState([]);
  // const localStorageFilteredMovies = JSON.parse(localStorage.getItem('searchedFilms'));
  // const [filteredMovies, setFilteredMovies] = useState(localStorageFilteredMovies || []);

  // ошибка ответа сервера
  // const [isError, setIsError] = useState(false);

  // показывать сообщение или фильмы
  // const [isCorrectSearch, setIsCorrectSearch] = useState(true);

  // контроль состояния чекбокса
  const [isShort, setIsShort] = useState(false);
  // const [isShort, setIsShort] = useState(JSON.parse(localStorage.getItem('isShort')) || false);

  // сообщение об ошибке "ничего не найдено" или "ошибка сервера"
  const [searchMessage, setSearchMessage] = useState('');
  // сообщение об ошибке при пустой поисковой строке
  const [emptySearchError, setEmptySearchError] = useState('');

  // контроль поисковой строки
  function handleSearchString(e) {
    const stringValue = e.target.value.toLowerCase();
    setSearchValue(stringValue);
  }

  // проверка состояния чекбокса
  function checkIsShort(e, component) {
    const checkValue = e.target.checked;
    setIsShort(checkValue);
    localStorage.setItem(component, checkValue);
  }

  // обработка текста ошибки поискового запроса
  function handleErrorMessage() {
    setSearchMessage(filteredMovies.length === 0 ? resultMessage.findNothing : '');
  }

  // фильтрация фильмов по поисковому запросу
  function findMovies(rawMovies) {
    return rawMovies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(searchValue) || movie.nameEN.toLowerCase().includes(searchValue)
    })
  }

  // получение фильмов с сервера
  function getFilms() {
    setIsLoading(true);
    moviesApi.getMovies()
      .then((dataMovies) => {
        setAllMovies(dataMovies);
        localStorage.setItem('films', JSON.stringify(dataMovies));
        // setIsError(false);
        const filteredMoviesList = findMovies(dataMovies);
        setFilteredMovies(filteredMoviesList);
        localStorage.setItem('searchedFilms', JSON.stringify(filteredMoviesList));
        handleErrorMessage();
      })
      .catch((err) => {
        console.error(err);
        setSearchMessage(resultMessage.error);
        // setIsError(true);
        // setIsCorrectSearch(false);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  // фильтр короткометражек
  function handleFilterShorts(movies) {
    if (isShort) {
      return movies.filter((movie) => {
        return movie.duration <= 40
      })
    }
    return movies;
  }

  function handleSearchSubmit() {
    // пустой запрос
    if (!searchValue) {
      // показать ошибку 
      setEmptySearchError(resultMessage.emptySearch);
      return;
    }
    // записываем в localStorage поисковый запрос
    localStorage.setItem('searchString', searchValue);
    // не показывать ошибку
    setEmptySearchError('');
    // проверяем начальный список фильмов в стейте
    if (allMovies.length === 0) {
      //отправляем запрос на сервер
      getFilms();
      return;
    }
    // предустанавливаем текст ошибки, если "ничего не найдено"
    handleErrorMessage();

    const filteredMoviesList = findMovies(allMovies);
    setFilteredMovies(filteredMoviesList);
    localStorage.setItem('searchedFilms', JSON.stringify(filteredMoviesList));
  }

  return {
    baseUrl, searchValue, setSearchValue, searchMessage, setSearchMessage, emptySearchError,
    handleFilterShorts, handleSearchString, checkIsShort, resultMessage,
    handleErrorMessage, filteredMovies, setFilteredMovies, findMovies
  };
}
