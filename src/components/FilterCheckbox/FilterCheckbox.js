// import { useContext } from "react";
// import { MoviesContext } from '../../Context/MoviesContext.js';
import searchEngine from '../../utils/SearchEngine.js';

export default function FilterCheckbox({ sectionClass, lsNameisShort }) {

  const { checkIsShort } = searchEngine({});

  function handleChange(e) {
    checkIsShort(e, lsNameisShort);
  }
  
  const short = JSON.parse(localStorage.getItem(lsNameisShort)) || false;

  return (
    <label className={`filter-checkbox ${sectionClass}`}>
      <input type='checkbox'
        onChange={handleChange}
        checked={short}
        className="filter-checkbox__input"
        name="filter-checkbox" />
      <span className="filter-checkbox__box"></span>
      Короткометражки
    </label>
  )
}