import { useContext } from "react";
import { MoviesContext } from '../../Context/MoviesContext.js';

export default function FilterCheckbox({ sectionClass, onChange, checked }) {

  const { isShort, checkIsShort } = useContext(MoviesContext);
  const short = JSON.parse(localStorage.getItem('isShort'));


  return (
    <label className={`filter-checkbox ${sectionClass}`}>
      <input type='checkbox'
        onChange={checkIsShort}
        checked={short}
        className="filter-checkbox__input"
        name="filter-checkbox" />
      <span className="filter-checkbox__box"></span>
      Короткометражки
    </label>
  )
}