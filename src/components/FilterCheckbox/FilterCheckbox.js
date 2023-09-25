export default function FilterCheckbox({ sectionClass, checkIsShort, isShort }) {

  function handleChange(e) {
    checkIsShort(e);
  }

  return (
    <label className={`filter-checkbox ${sectionClass}`}>
      <input type='checkbox'
        onChange={handleChange}
        checked={isShort}
        className="filter-checkbox__input"
        name="filter-checkbox" />
      <span className="filter-checkbox__box"></span>
      Короткометражки
    </label>
  )
}