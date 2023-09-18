import Container from "../Container/Container"
import Button from "../Button/Button";
import icon from '../../images/search-icon.svg';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm({ onSubmit }) {

  function handleSubmit(e) {
    e.prevenDefault();
    onSubmit();
  }

  return (
    <section className="search-form">
      <Container sectionClass="search-form__container">
        <form className="search-form__form"
          onSubmit={handleSubmit}>
          <img src={icon}
            className="search-form__icon"
            alt='icon' />
          <input className="search-form__input"
            type="text"
            aria-label="search-form"
            placeholder="Фильм"
            autoComplete="on"
            required />
          <Button buttonType="submit"
            sectionClass='search-form__submit'
            lable='submit'
            disabled='false'></Button>
        </form>
        <div className="search-form__border"></div>
        <FilterCheckbox sectionClass="search-form__box" />
      </Container>
    </section>
  )
}
