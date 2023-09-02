import Container from "../Container/Container.js";
import SectionTitle from "../SectionTitle/SectionTitle.js";
import photo from '../../images/about-me__photo.jpg';

export default function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <Container sectionClass="about-me__container">
        <SectionTitle sectionClass="about-me__title">Студент</SectionTitle>
        <div className="about-me__resume">
          <img
            src={photo}
            className="about-me__photo"
            alt="фотография разработчика" />
          <div className="about-me__brief">
            <p className="about-me__subtitle">Дмитрий</p>
            <p className="about-me__prof">Фронтенд-разработчик, 37 лет</p>
            <p className="about-me__text">
              Я родился и живу в Саратове, закончил факультет экономики СГУ.
              У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
              Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
              После того, как прошёл курс по веб-разработке, начал заниматься
              фриланс-заказами и ушёл с постоянной работы.
            </p>
            <a className="about-me__link" href="https://github.com/dimanakov/dimanakov">
              Github
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}