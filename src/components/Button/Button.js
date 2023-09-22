export default function Button({ sectionClass, label, onClick, children, buttonType }) {

  return (
    <button type={buttonType}
      aria-label={label}
      className={`button button_focus ${sectionClass}`}
      onClick={onClick}>
      {children}
    </button>
  )
}