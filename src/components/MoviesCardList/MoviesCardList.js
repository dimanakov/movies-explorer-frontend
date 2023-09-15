import Container from "../Container/Container.js";
import MoviesCard from "../MoviesCard/MoviesCard.js";

export default function MoviesCardList({ movies }) {

  return (
    <section className="movies">
      <Container sectionClass="movies__container">
        <ul className="movies__gallery">
          {/* место для карточек фильмов */}
          {movies.map((movie) => {
            return (
              <MoviesCard 
              key={movie.id}
              movie={movie}/>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}