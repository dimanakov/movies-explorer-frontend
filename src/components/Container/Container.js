export default function Container({ sectionClass, children}) {
  return (
    <div className={`container ${sectionClass}`}>
      {children}
    </div>
  );
}