import Container from "../Container/Container.js";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import Preloader from '../Preloader/Preloader.js';

export default function MoviesCardList({ movies, searchMessage, isLoadingFilms }) {

  return (
    <section className="movies-card-list">
      <Container sectionClass="movies-card-list__container">
        {isLoadingFilms && <Preloader />}
        {/* место для карточек фильмов */}
        {movies.length === 0
          ? <p className="movies-card-list__error">
            {searchMessage} </p>
          : <ul className="movies-card-list__gallery">
            {movies.map((movie) => {
              return (
                <MoviesCard
                  key={movie.id || movie.movieId}
                  movie={movie} />
              )
            })}
          </ul>}
      </Container>
    </section>
  )
}