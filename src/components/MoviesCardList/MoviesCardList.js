import { useState, useContext } from "react";
import Container from "../Container/Container.js";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import ShowMore from '../ShowMore/ShowMore.js';
import Preloader from '../Preloader/Preloader.js';
import { AppContext } from "../../Context/AppContext.js";
// import { MoviesContext } from '../../Context/MoviesContext.js';

export default function MoviesCardList({ movies, saveMovie, removeMovie, isFavorit, searchMessage }) {

  const { isLoading } = useContext(AppContext);
  // const { searchMessage } = useContext(MoviesContext);

  // под вопросом
  // const { initMoviesCount } = presetMovies();
  const [moviesLeft, setMoviesLeft] = useState();

  return (
    <section className="movies-card-list">
      <Container sectionClass="movies-card-list__container">
        {isLoading && <Preloader />}
        {/* место для карточек фильмов */}
        {movies.length === 0
          ? <p className={`movies-card-list__error 
              ${isLoading && "movies-card-list__error_hidden"}`}>
              {searchMessage} </p>
          : <ul className="movies-card-list__gallery">
            {movies.map((movie) => {
              return (
                <MoviesCard
                  saveMovie={saveMovie}
                  removeMovie={removeMovie}
                  isFavorit={isFavorit}
                  key={movie.id || movie.movieId}
                  movie={movie} />
              )
            })}
          </ul>}
        {moviesLeft && <ShowMore />}
      </Container>
    </section>
  )
}