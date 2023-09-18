import Container from "../Container/Container.js";
import OutLink from "../OutLink/OutLink.js";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <Container sectionClass="portfolio__container">
        <h4 className="portfolio__title">Портфолио</h4>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <OutLink address="https://github.com/dimanakov/how-to-learn"
              sectionClass="portfolio__link portfolio__link_type_text"
              _blank>
              Статичный сайт
            </OutLink>
            <OutLink address="https://github.com/dimanakov/how-to-learn"
              sectionClass="portfolio__link portfolio__link_type_follow"
              _blank>
              &#8599;
            </OutLink>
          </li>
          <li className="portfolio__item">
            <OutLink address="https://github.com/dimanakov/russian-travel"
              sectionClass="portfolio__link portfolio__link_type_text"
              _blank>
              Адаптивный сайт
            </OutLink>
            <OutLink address="https://github.com/dimanakov/russian-travel"
              sectionClass="portfolio__link portfolio__link_type_follow"
              _blank>
              &#8599;
            </OutLink>
          </li>
          <li className="portfolio__item">
            <OutLink address="https://get-mesto.nomoreparties.co"
              sectionClass="portfolio__link portfolio__link_type_text"
              _blank>
              Одностраничное приложение
            </OutLink>
            <OutLink address="https://get-mesto.nomoreparties.co"
              sectionClass="portfolio__link portfolio__link_type_follow"
              _blank>
              &#8599;
            </OutLink>
          </li>
        </ul>
      </Container>
    </section>
  );
}