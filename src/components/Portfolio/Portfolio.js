import Container from "../Container/Container.js";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <Container sectionClass="portfolio__container">
        <h4 className="portfolio__title">Портфолио</h4>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <a href="#y4ycb-y4uTbc9" className="portfolio__link portfolio__link_type_text">Статичный сайт</a>
            <a href="#y4ycb-y4uTbc9" className="portfolio__link portfolio__link_type_follow">↗</a>
          </li>
          <li className="portfolio__item">
            <a href="#po-rossii" className="portfolio__link portfolio__link_type_text">Адаптивный сайт</a>
            <a href="#po-rossii" className="portfolio__link portfolio__link_type_follow">↗</a>
          </li>
          <li className="portfolio__item">
            <a href="https://get-mesto.nomoreparties.co" className="portfolio__link portfolio__link_type_text">Одностраничное приложение</a>
            <a href="https://get-mesto.nomoreparties.co" className="portfolio__link portfolio__link_type_follow">↗</a>
          </li>
        </ul>
      </Container>
    </section>
  );
}