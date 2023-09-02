import Container from '../Container/Container.js';

export default function NavTab() {
  return (
    <section className='navtab'>
      <Container sectionClass="navtab__container">
        <nav className="navtab__menu">
          <a href="#about-project" className="navtab__link">О проекте</a>
          <a href="#techs" className="navtab__link">Технологии</a>
          <a href="#about-me" className="navtab__link">Студент</a>
        </nav>
      </Container>
    </section>
  );
}