import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/AppContext.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import moviesApi from '../../utils/MoviesApi.js';
import presetMoviesList from '../../utils/presetMoviesCount.js';
// подключаем MainApi
import api from '../../utils/MainApi.js';
// import searchMovieEngine from '../../utils/searchMovieEngine.js';

export default function Movies() {
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
  const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('films')) || []);
  // значение инпута поисковой строки
  const [searchValue, setSearchValue] = useState(localStorage.getItem('searchString') || '');
  const searchValueM = 'searchValue';
  // список фильмов подходящих по поисковому запросу
  const localStorageFilteredMovies = JSON.parse(localStorage.getItem('searchedFilms'));
  const [filteredMovies, setFilteredMovies] = useState(localStorageFilteredMovies || []);
  // ошибка ответа сервера
  const [isError, setIsError] = useState(false);
  // показывать сообщение или фильмы
  const [isCorrectSearch, setIsCorrectSearch] = useState(true);
  // контроль состояния чекбокса
  const [isShort, setIsShort] = useState(JSON.parse(localStorage.getItem('isShort')) || false);
  // сообщение об ошибке
  const [searchMessage, setSearchMessage] = useState('');
  // сообщение об ошибке при пустой поисковой строке
  const [emptySearchError, setEmptySearchError] = useState('');

  // контроль поисковой строки
  function handleSearchString(e) {
    const stringValue = e.target.value.toLowerCase();
    setSearchValue(stringValue);
  }

  // проверка состояния чекбокса
  function checkIsShort(e) {
    const checkValue = e.target.checked;
    setIsShort(checkValue);
    localStorage.setItem('isShort', checkValue);
  }

  // получение фильмов с сервера
  function getFilms() {
    setIsLoading(true);
    moviesApi.getMovies()
      .then((dataMovies) => {
        setAllMovies(dataMovies);
        localStorage.setItem('films', JSON.stringify(dataMovies));
        setIsError(false);
        const filteredMoviesList = findMovies(dataMovies);
        setFilteredMovies(filteredMoviesList);
        localStorage.setItem('searchedFilms', JSON.stringify(filteredMoviesList));
        handleErrorMessage();
      })
      .catch((err) => {
        console.error(err);
        setSearchMessage(resultMessage.error);
        setIsError(true);
        setIsCorrectSearch(false);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  // фильтрация фильмов по поисковому запросу
  function findMovies(rawMovies) {
    return rawMovies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(searchValue) || movie.nameEN.toLowerCase().includes(searchValue)
    })
  }

  function handleSearchSubmit() {
    // пустой запрос
    if (!searchValue) {
      // показать ошибку
      // setSearchMessage(resultMessage.emptySearch);
      setEmptySearchError(resultMessage.emptySearch);
      return;
    }
    // записываем в localStorage поисковый запрос
    localStorage.setItem(searchValueM, searchValue);
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

  // фильтр короткометражек
  function handleFilterShorts(movies) {
    if (isShort) {
      return movies.filter((movie) => {
        return movie.duration <= 40
      })
    }
    return movies;
  }

  // обработка текста ошибки поискового запроса
  function handleErrorMessage() {
    setSearchMessage(filteredMovies.length === 0 ? resultMessage.findNothing : '');
  }

  // // фильтрация фильмов по поисковому запросу
  // function searchMoviesEngine(rawMovies) {
  //   localStorage.setItem('searchString', searchValue);
  //   // setIsShort(localStorage.getItem('isShort'));
  //   // setSearchValue(localStorage.getItem('searchString'));
  //   // поисковый фильтр
  //   const filteredMoviesList = rawMovies.filter((movie) => {
  //     const search = (movie.nameRU.toLowerCase().includes(searchValue)
  //       || movie.nameEN.toLowerCase().includes(searchValue));
  //     return search;
  //     // const search = isShort
  //     //   ? ((movie.nameRU.toLowerCase().includes(searchValue) && (movie.duration <= 40))
  //     //     || (movie.nameEN.toLowerCase().includes(searchValue) && (movie.duration <= 40)))
  //     //   : (movie.nameRU.toLowerCase().includes(searchValue)
  //     //     || movie.nameEN.toLowerCase().includes(searchValue));
  //     // return search;
  //   })
  //   // если ничего не найдено по запросу
  //   if (filteredMoviesList.length === 0) {
  //     // показываем ошибку
  //     setIsCorrectSearch(false);
  //   }
  //   // записываем найденные фильмы в стейт и в локальное хранилище
  //   setFilteredMovies(filteredMoviesList);
  //   localStorage.setItem('searchedFilms', JSON.stringify(filteredMoviesList));
  // }

  // // submit формы поиска
  // function findMovies() {
  //   // пустой запрос
  //   if (!searchValue) {
  //     // показать ошибку 
  //     setEmptySearchError(resultMessage.emptySearch);
  //     return;
  //   }
  //   // не показывать ошибку
  //   setEmptySearchError('');
  //   setIsCorrectSearch(true);
  //   // проверяем начальный список фильмов в стейте
  //   if (allMovies.length === 0) {
  //     //отправляем запрос на сервер
  //     getFilms();
  //     return;
  //   }
  //   // предустанавливаем текст ошибки "ничего не найдено"
  //   handleErrorMessage();
  //   // есть изначальный список фильмов, запускаем поиск
  //   searchMoviesEngine(allMovies, isShort);
  // }

  ///////////////////////////////////////////////////////
  // обработка взаимодействия пользователя с фильмами

  // сохранение фильма в избранном
  function saveMovie(movie) {
    api.saveMovies(movie)
      .then((movie) => {
        setUserMovies([...userMovies, movie]);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  // удаление фильма из избранных
  function removeMovie(movie) {
    const id = movie.id;
    // Отправляем запрос в API и получаем обновлённые данные списка избранных
    api.removeMovies(id)
      .then((movies) => {
        setUserMovies(movies);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  useEffect(() => {
    setSearchValue(localStorage.getItem(searchValueM) || '');
  }, [])

  return (
    <div className="movies">
      <Header sectionClass="movies__header" />
      <main>
        <SearchForm onSubmit={findMovies}
          lsNameSearchValue={searchValueM}
          lsNameisShort="isShort"
          searchValue={searchValue}
          handleSearchSubmit={handleSearchSubmit}
          handleSearchString={handleSearchString}
          emptySearchError={emptySearchError}
        />
        {/* при первом запросе после авторизации появляется Preloader */}
        {/* если ничего не найдено по запросу, то выводится текст "«Ничего не найдено" */}
        {/* список фильмов и кнока ShowMore появятся после поискового запроса */}
        <MoviesCardList presetMovies={presetMoviesList}
          movies={handleFilterShorts(filteredMovies)}
          saveMovie={saveMovie}
          removeMovie={removeMovie}
        />
      </main>
      <Footer />
    </div>
  )
}
