import Container from '../Container/Container.js';
import OutLink from '../OutLink/OutLink.js';

export default function Footer() {
  return (
    <footer className="footer">
      <Container sectionClass="footer__container">
        <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__block">
          <span className="footer__year">©2023</span>
          <div className="footer__links">
            <OutLink address="https://practicum.yandex.ru/"
              sectionClass="footer__link"
              _blank>
              Яндекс.Практикум
            </OutLink>
            <OutLink address="https://github.com/"
              sectionClass="footer__link"
              _blank>
              Github
            </OutLink>
          </div>
        </div>
      </Container>
    </footer>
  );
}