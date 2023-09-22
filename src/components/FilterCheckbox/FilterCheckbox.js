export default function FilterCheckbox({ sectionClass, check }) {

  return (
    <label className={`filter-checkbox ${sectionClass}`}>
      <input type='checkbox'
        onChange={check}
        className="filter-checkbox__input"
        name="filter-checkbox"/>
      <span className="filter-checkbox__box"></span>
      Короткометражки
    </label>
  )
}