export default function OutLink({ address, sectionClass, children, _blank }) {
  return (
    <a href={address}
      className={`out-link ${sectionClass}`}
      rel="noopener noreferrer"
      target={_blank ? "_blank" : "_self"}
      >
      {children}
    </a>
  );
}