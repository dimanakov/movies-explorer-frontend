import { useState } from 'react';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import presetMoviesList from '../../utils/presetMoviesCount.js';
import searchEngine from '../../utils/SearchEngine.js';
import moviesApi from '../../utils/MoviesApi.js';
import {
  resultMessage, XL_ROW_INIT_CARDS, LG_ROW_INIT_CARDS, MD_ROW_INIT_CARDS,
  SM_ROW_INIT_CARDS, XL_ADD_CARD, LG_ADD_CARD, MD_ADD_CARD, SM_ADD_CARD
} from '../../utils/constants.js';
import ShowMore from '../ShowMore/ShowMore.js';
import useResize from '../../hooks/useResize.js';

export default function Movies() {

  // подключаем поисковый движок
  const { handleFilterShorts, findMovies } = searchEngine({});
  // список всех фильмов полученных от сервера
  const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('films')) || []);
  // значение инпута поисковой строки
  const [searchString, setSearchString] = useState(localStorage.getItem('searchString') || '');
  // фильмы найденные по поисковому запросу
  const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('searchedMovies')) || []);
  // контроль состояния чекбокса
  const [isShort, setIsShort] = useState(JSON.parse(localStorage.getItem('isShort')) || false);
  // загрузка фильмов с сервера
  const [isLoadingFilms, setIsLoadingFilms] = useState(false);
  // сообщение об ошибке "ничего не найдено" или "ошибка сервера"
  const [searchMessage, setSearchMessage] = useState('');
  // сообщение об ошибке при пустой поисковой строке
  const [emptySearchError, setEmptySearchError] = useState('');
  // хук для контроля ширины экрана
  const { isScreenSM, isScreenMD, isScreenLG, isScreenXL } = useResize({});
  // начальное количество показываемых карточек
  const [initialCardsCount, setInitialCardsCount] = useState(countInitialCard());

  // задаём количество показываемых карточек
  function countInitialCard() {
    if (isScreenXL) { return XL_ROW_INIT_CARDS }
    else if (isScreenLG) { return LG_ROW_INIT_CARDS }
    else if (isScreenMD) { return MD_ROW_INIT_CARDS }
    else if (isScreenSM) { return SM_ROW_INIT_CARDS }
  }

  // добавляем показываемые карточки
  function addCardCount() {
    if (isScreenXL) { return setInitialCardsCount(initialCardsCount + XL_ADD_CARD) }
    else if (isScreenLG) { return setInitialCardsCount(initialCardsCount + LG_ADD_CARD) }
    else if (isScreenMD) { return setInitialCardsCount(initialCardsCount + MD_ADD_CARD) }
    else if (isScreenSM) { return setInitialCardsCount(initialCardsCount + SM_ADD_CARD) }
  }

  // контроль поисковой строки
  function handleSearchString(e) {
    const stringValue = e.target.value.toLowerCase();
    setSearchString(stringValue);
  }

  // проверка состояния чекбокса
  function handleCheckbox(e) {
    const checkValue = e.target.checked;
    setIsShort(checkValue);
    localStorage.setItem('isShort', checkValue);
  }

  // обработка текста ошибки поискового запроса
  function handleErrorMessage(length) {
    setSearchMessage(length === 0 ? resultMessage.findNothing : '');
  }

  // получение фильмов с сервера
  function getFilms() {
    setIsLoadingFilms(true);
    moviesApi.getMovies()
      .then((dataMovies) => {
        setAllMovies(dataMovies);
        localStorage.setItem('films', JSON.stringify(dataMovies));
        const searchResult = findMovies(dataMovies, searchString);
        handleErrorMessage(searchResult.length);
        setFilteredMovies(searchResult);
        localStorage.setItem('searchedMovies', JSON.stringify(searchResult));
      })
      .catch((err) => {
        console.error(err);
        setSearchMessage(resultMessage.error);
      })
      .finally(() => {
        setIsLoadingFilms(false);
      })
  }

  function handleSearchSubmit() {
    if (!searchString) {
      setEmptySearchError(resultMessage.emptySearch);
      return
    }
    // убираем тексты ошибок
    setEmptySearchError('');
    setSearchMessage('');
    // записываем в localStorage поисковый запрос
    localStorage.setItem('searchString', searchString);
    // проверяем начальный список фильмов в стейте
    if (allMovies.length === 0) {
      //отправляем запрос на сервер
      getFilms();
      return;
    }
    const searchResult = findMovies(allMovies, searchString);
    handleErrorMessage(searchResult.length);
    setFilteredMovies(searchResult);
    localStorage.setItem('searchedMovies', JSON.stringify(searchResult));
  }

  return (
    <div className="movies">
      <Header sectionClass="movies__header" />
      <main>
        <SearchForm
          isShort={isShort}
          checkIsShort={handleCheckbox}
          searchString={searchString}
          handleSearchString={handleSearchString}
          handleSearchSubmit={handleSearchSubmit}
          searchMessage={searchMessage}
          emptySearchError={emptySearchError} />
        {/* при первом запросе после авторизации появляется Preloader */}
        {/* если ничего не найдено по запросу, то выводится текст "«Ничего не найдено" */}
        {/* список фильмов и кнока ShowMore появятся после поискового запроса */}
        <MoviesCardList presetMovies={presetMoviesList}
          isLoadingFilms={isLoadingFilms}
          searchMessage={searchMessage}
          initialCardsCount={initialCardsCount}
          movies={handleFilterShorts(filteredMovies, isShort)} />
        {(initialCardsCount <= handleFilterShorts(filteredMovies, isShort).length)
          && <ShowMore onClick={addCardCount} />}
      </main>
      <Footer />
    </div>
  )
}
