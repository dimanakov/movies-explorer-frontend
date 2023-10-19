import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/AppContext.js';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import { resultMessage } from '../../utils/constants.js';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import searchEngine from '../../utils/SearchEngine.js';

export default function SavedMovies() {

  const { userMovies } = useContext(AppContext);
  const { handleFilterShorts, findMovies } = searchEngine({});
  // значение инпута поисковой строки
  const [searchString, setSearchString] = useState('');
  // фильмы найденные по поисковому запросу
  const [filteredMovies, setFilteredMovies] = useState(userMovies || []);
  // состояние чекбокса
  const [isShort, setIsShort] = useState(false);
  // сообщение об ошибке "ничего не найдено" или "ошибка сервера"
  const [searchMessage, setSearchMessage] = useState('');
  // сообщение об ошибке при пустой поисковой строке
  const [emptySearchError, setEmptySearchError] = useState('');

  // контроль поисковой строки
  function handleSearchString(e) {
    const stringValue = e.target.value.toLowerCase();
    setSearchString(stringValue);
  }

  // проверка состояния чекбокса
  function handleCheckbox(e) {
    const checkValue = e.target.checked;
    setIsShort(checkValue);
  }

  // обработка текста ошибки поискового запроса
  function handleErrorMessage(length) {
    setSearchMessage(length === 0 ? resultMessage.findNothing : '');
  }

  function handleSearchSubmit() {
    // пустой запрос
    if (!searchString) {
      // показать ошибку
      setEmptySearchError(resultMessage.emptySearch);
      return;
    }
    // убираем тексты ошибок
    setEmptySearchError('');
    setSearchMessage('');
    const searchResult = findMovies(userMovies, searchString);
    // предустанавливаем текст ошибки, если "ничего не найдено"
    handleErrorMessage(searchResult.length);
    setFilteredMovies(searchResult);
  }

  useEffect(()=>{
    setFilteredMovies(findMovies(userMovies, searchString));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMovies]);

  return (
    <div className="saved-movies">
      <Header sectionClass="saved-movies__header" />
      <main>
        <SearchForm
          isShort={isShort}
          checkIsShort={handleCheckbox}
          searchValue={searchString}
          handleSearchSubmit={handleSearchSubmit}
          handleSearchString={handleSearchString}
          emptySearchError={emptySearchError}
        />
        <MoviesCardList
          movies={handleFilterShorts(filteredMovies, isShort)}
          searchMessage={searchMessage}
        />
      </main>
      <Footer />
    </div>
  )
}