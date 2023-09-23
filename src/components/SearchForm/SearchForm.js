import { useContext } from 'react';
import Container from "../Container/Container"
import icon from '../../images/search-icon.svg';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { MoviesContext } from '../../Context/MoviesContext.js';

export default function SearchForm() {

  const {
    searchValue, checkIsShort, findMovies, handleSearchSubmit, handleSearchString, isShort, emptySearchError
  } = useContext(MoviesContext);

  function handleChange(e) {
    handleSearchString(e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSearchSubmit();
    // findMovies();
  }

  return (
    <section className="search-form">
      <Container sectionClass="search-form__container">
        <div className="search-form__search-box">
          <form className="search-form__form"
            onSubmit={handleSubmit}>
            <img src={icon}
              className="search-form__icon"
              alt="icon" />
            <input className="search-form__input"
              name="search"
              value={searchValue}
              onChange={handleChange}
              type="text"
              aria-label="search-form"
              placeholder="Фильм"
              autoComplete="on" />
            <button type="submit"
              className="button button_focus search-form__submit"
              aria-label="submit"></button>
          </form>
          <div className="search-form__border"></div>
          <FilterCheckbox sectionClass="search-form__checkbox"
            onChange={checkIsShort}
            checked={isShort} />
        </div>
        <span className="search-form__error">{emptySearchError}</span>
      </Container>
    </section>
  )
}
