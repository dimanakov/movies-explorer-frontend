import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/AppContext.js';
import { MoviesContext } from '../../Context/MoviesContext.js';
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
  const { setIsLoading, setLoggedIn, setCurrentUser, handleErrorPage, setErrorMessage, isLoggedIn, userMovies, setUserMovies } = useContext(AppContext);

  // сервер с изображениями фильмов
  const baseUrl = 'https://api.nomoreparties.co/';
  // список всех фильмов полученных от сервера
  const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('films')) || []);
  // значение инпута поисковой строки
  const [searchValue, setSearchValue] = useState(localStorage.getItem('searchString') || '');
  // список фильмов подходящих по поисковому запросу
  const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('searchedFilms')) || []);
  // ошибка ответа сервера
  const [isError, setIsError] = useState(false);
  // показывать сообщение или фильмы
  const [isCorrectSearch, setIsCorrectSearch] = useState(false);
  // контроль состояния чекбокса
  const [isShort, setIsShort] = useState(JSON.parse(localStorage.getItem('isShort')) || false);
  // сообщение об ошибке
  const [searchMessage, setSearchMessage] = useState('');

  // получение фильмов с сервера
  function getFilms() {
    setIsLoading(true);
    moviesApi.getMovies()
      .then((dataMovies) => {
        setAllMovies(dataMovies);
        localStorage.setItem('films', JSON.stringify(dataMovies));
        setIsError(false);
        searchMoviesEngine(dataMovies);
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

  // контроль поисковой строки
  function handleSearchString(e) {
    const stringValue = e.target.value.toLowerCase();
    setSearchValue(stringValue);
    // localStorage.setItem('searchString', stringValue);
  }

  // проверка состояния чекбокса
  function checkIsShort(e) {
    const checkValue = e.target.checked;
    setIsShort(checkValue);
    // localStorage.setItem('isShort', checkValue);
  }

  const resultMessage = {
    error: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
    emptySearch: 'Нужно ввести ключевое слово',
    findNothing: 'Ничего не найдено',
  }

  // обработка текста ошибки поискового запроса
  function handleErrorMessage() {
    setSearchMessage(searchValue ? resultMessage.findNothing : resultMessage.emptySearch);
  }

  // фильтрация фильмов по поисковому запросу
  function searchMoviesEngine(rawMovies) {
    localStorage.setItem('isShort', isShort);
    localStorage.setItem('searchString', searchValue);
    // поисковый фильтр
    const filteredMoviesList = rawMovies.filter((movie) => {
      const search = isShort
        ? ((movie.nameRU.toLowerCase().includes(searchValue) && (movie.duration <= 40))
          || (movie.nameEN.toLowerCase().includes(searchValue) && (movie.duration <= 40)))
        : (movie.nameRU.toLowerCase().includes(searchValue)
          || movie.nameEN.toLowerCase().includes(searchValue));
      return search;
    })
    // если ничего не найдено по запросу
    if (filteredMoviesList.length === 0) {
      // показываем ошибку
      setIsCorrectSearch(false);
    }
    // записываем найденные фильмы в стейт и в локальное хранилище
    setFilteredMovies(filteredMoviesList);
    localStorage.setItem('searchedFilms', JSON.stringify(filteredMoviesList));
  }

  // submit формы поиска
  function findMovies() {
    // пустой запрос
    if (!searchValue) {
      // текст ошибки "пустой запрос"
      handleErrorMessage();
      // показать ошибку 
      setIsCorrectSearch(false);
      return;
    }
    // не показывать ошибку
    setIsCorrectSearch(true);
    // проверяем начальный список фильмов в стейте
    if (allMovies.length === 0) {
      //отправляем запрос на сервер
      getFilms();
      return;
    }
    // предустанавливаем текст ошибки "ничего не найдено"
    handleErrorMessage();
    // есть изначальный список фильмов, запускаем поиск
    searchMoviesEngine(allMovies);
  }

  function filterCheckbox(){
    return filteredMovies.filter((movie) => {
      return isShort ? movie.duration <= 40 : movie
    })
  }

/////////////////////////////////////////////////////////
  // обработка взаимодействия пользователя с фильмами

  // проверяем наличие фильма в сохранённых
  function isFavorit(movie) {
    return userMovies.some((m) => {
      return m.movieId === movie.id;
    })
  };

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
    // Отправляем запрос в API и получаем обновлённые данные списка избранных
    api.removeMovies(movie)
      .then((movies) => {
        setUserMovies(movies);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  // function handleCardLike(card) {
  //   // Снова проверяем, есть ли уже лайк на этой карточке
  //   const isLiked = card.likes.some(i => i._id === currentUser._id);
  //   // Отправляем запрос в API и получаем обновлённые данные карточки
  //   api.changeLikeCardStatus(card, !isLiked)
  //     .then((newCard) => {
  //       setCardsData((cards) => cards.map((c) => c._id === card._id ? newCard : c));
  //     })
  //     .catch((err) => {             //попадаем сюда если промис завершится ошибкой 
  //       console.error(err);
  //     });
  // }

  // useEffect(() => {
  //   filteredMovies()
  // }, [isShort])

  return (
    <MoviesContext.Provider value={{
      searchValue, setSearchValue,
      // checkbox
      checkIsShort,
      // submit search
      findMovies,
      // текст ошибки при поиске
      searchMessage,
      isCorrectSearch, setIsCorrectSearch,
      allMovies, setAllMovies,
      filteredMovies, setFilteredMovies,
      isError, setIsError,
      handleSearchString,
      baseUrl, 
      isFavorit,
      saveMovie, removeMovie
    }}>
      <div className="movies">
        <Header sectionClass="movies__header" />
        <main>
          <SearchForm onSubmit={findMovies} />

          {/* при первом запросе после авторизации появляется Preloader */}

          {/* если ничего не найдено по запросу, то выводится текст "«Ничего не найдено" */}

          {/* список фильмов и кнока ShowMore появятся после поискового запроса */}

          <MoviesCardList presetMovies={presetMoviesList} />
        </main>
        <Footer />
      </div>
    </MoviesContext.Provider>
  )
}
