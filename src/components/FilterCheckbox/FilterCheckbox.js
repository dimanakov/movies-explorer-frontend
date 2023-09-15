export default function FilterCheckbox({sectionClass}) {

  return (
    <label className={`filter-checkbox ${sectionClass}`}>
      <input type='checkbox'
        className="filter-checkbox__input"
        name="filter-checkbox"/>
      <span className="filter-checkbox__box"></span>
      Короткометражки
    </label>
  )
}