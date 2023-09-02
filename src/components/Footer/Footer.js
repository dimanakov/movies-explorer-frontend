import Container from '../Container/Container.js';

export default function Footer() {
  return (
    <footer className="footer">
      <Container sectionClass="footer__container">
        <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__block">
          <span className="footer__year">©2023</span>
          <div className="footer__links">
            <a href="https://practicum.yandex.ru/"
              className="footer__link"
              rel="noopener noreferrer"
              target="_blank">
              Яндекс.Практикум
            </a>
            <a href="https://github.com/"
              className="footer__link"
              rel="noopener noreferrer"
              target="_blank">
              Github
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}