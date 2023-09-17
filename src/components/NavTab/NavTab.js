import Container from '../Container/Container.js';
import OutLink from '../OutLink/OutLink.js';

export default function NavTab() {
  return (
    <section className='navtab'>
      <Container sectionClass="navtab__container">
        <nav className="navtab__menu">
          <OutLink address="#about-project"
            sectionClass="navtab__link">
            О проекте
          </OutLink>
          <OutLink address="#techs"
            sectionClass="navtab__link">
            Технологии
          </OutLink>
          <OutLink address="#about-me"
            sectionClass="navtab__link">
            Студент
          </OutLink>
        </nav>
      </Container>
    </section>
  );
}