import { useState, useContext } from "react";
import Container from "../Container/Container.js";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import ShowMore from '../ShowMore/ShowMore.js';
import Preloader from '../Preloader/Preloader.js';
import { AppContext } from "../../Context/AppContext.js";
import { MoviesContext } from '../../Context/MoviesContext.js';

export default function MoviesCardList({ presetMovies }) {

  const { isCorrectSearch, filteredMovies, searchMessage, isError, filterCheckbox } = useContext(MoviesContext);
  const { isLoading } = useContext(AppContext);

// под вопросом
  const { initMoviesCount } = presetMovies();
  const [moviesLeft, setMoviesLeft] = useState();

  return (
    <section className="movies-card-list">
      <Container sectionClass="movies-card-list__container">
        {isLoading && <Preloader />}
        {!isCorrectSearch && <p className={`movies-card-list__error movies-card-list__error_active`}>{searchMessage}</p>}
        {/* место для карточек фильмов */}
        {isCorrectSearch && <ul className="movies-card-list__gallery">
          {filteredMovies.slice(0, initMoviesCount).map((movie) => {
            // setIsSaved(false);
            return (
              <MoviesCard
                key={movie.id}
                movie={movie} />
            )
          })}
        </ul>}
        {moviesLeft && <ShowMore />}
      </Container>
    </section>
  )
}