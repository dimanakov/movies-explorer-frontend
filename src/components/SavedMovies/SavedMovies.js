import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/AppContext.js';
import { SavedMoviesContext } from '../../Context/SavedMoviesContext.js';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import searchEngine from '../../utils/SearchEngine.js';
// подключаем MainApi
import api from '../../utils/MainApi.js';

export default function SavedMovies() {

  const { userMovies, setUserMovies } = useContext(AppContext);
  // const [savedMovies, setSavedMovies] = useState(userMovies);

  const {
    searchValue, setSearchValue, searchMessage, setSearchMessage, emptySearchError,
    handleFilterShorts, handleSearchString, checkIsShort, resultMessage,
    handleErrorMessage, filteredMovies, setFilteredMovies, findMovies } = searchEngine({});

  // setFilteredMovies(JSON.parse(localStorage.getItem('films')) || userMovies);
  const searchValueSM = 'searchValueSM';

  function handleSearchSubmit() {
    // пустой запрос
    if (!searchValue) {
      // показать ошибку
      // setSearchMessage(resultMessage.emptySearch);
      setSearchMessage(resultMessage.emptySearch);
      return;
    }
    // записываем в localStorage поисковый запрос
    localStorage.setItem(searchValueSM, searchValue);
    // не показывать ошибку
    // setSearchMessage('');
    // предустанавливаем текст ошибки, если "ничего не найдено"
    handleErrorMessage();

    const filteredMoviesList = findMovies(userMovies);
    setFilteredMovies(filteredMoviesList);
    // setFilteredMovies(filteredMoviesList);
    localStorage.setItem('searchedFilmsSM', JSON.stringify(filteredMoviesList));
  }

  // function handleSearchSubmit() {
  //   // записываем в localStorage поисковый запрос
  //   localStorage.setItem('searchString', searchValue);
  //   // не показывать ошибку
  //   setSearchMessage('');
  //   // проверяем начальный список фильмов в стейте
  //   if (allMovies.length === 0) {
  //     //отправляем запрос на сервер
  //     getFilms();
  //     return;
  //   }
  //   // предустанавливаем текст ошибки, если "ничего не найдено"
  //   handleErrorMessage();

  //   const filteredMoviesList = findMovies(allMovies);
  //   setFilteredMovies(filteredMoviesList);
  //   localStorage.setItem('searchedFilms', JSON.stringify(filteredMoviesList));
  // }




  // удаление фильма из избранных
  function removeMovie(movie) {
    console.log(movie);
    const id = movie.movieId;
    // Отправляем запрос в API и получаем обновлённые данные списка избранных
    api.removeMovies(id)
      .then((movies) => {
        setUserMovies(movies);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  useEffect(()=>{
    setSearchValue(localStorage.getItem(searchValueSM) || '');
  }, [])

  return (
    <div className="saved-movies">
      <Header sectionClass="saved-movies__header" />
      <main>
        <SearchForm
          lsNameSearchValue={searchValueSM}
          lsNameisShort="isShortSM"
          checkIsShort={checkIsShort}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearchSubmit={handleSearchSubmit}
          handleSearchString={handleSearchString}
          emptySearchError={emptySearchError}
        />
        <MoviesCardList
          movies={handleFilterShorts(filteredMovies)}
          // movies={handleFilterShorts(userMovies)}
          removeMovie={removeMovie} />
      </main>
      <Footer />
    </div>
  )
}