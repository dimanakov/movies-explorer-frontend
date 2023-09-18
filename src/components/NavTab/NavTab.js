import Container from '../Container/Container.js';
import OutLink from '../OutLink/OutLink.js';

export default function NavTab() {
  return (
    <section className='navtab'>
      <Container sectionClass="navtab__container">
        <nav>
          <ul className="navtab__list">
            <li className="navtab__item">
              <OutLink address="#about-project"
                sectionClass="navtab__link">
                О проекте
              </OutLink>
            </li>
            <li className="navtab__item">
              <OutLink address="#techs"
                sectionClass="navtab__link">
                Технологии
              </OutLink>
            </li>
            <li className="navtab__item">
              <OutLink address="#about-me"
                sectionClass="navtab__link">
                Студент
              </OutLink>
            </li>
          </ul>
        </nav>
      </Container>
    </section>
  );
}