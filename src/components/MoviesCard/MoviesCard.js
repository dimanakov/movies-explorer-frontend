import { useContext } from "react";
import { useLocation } from "react-router-dom";
import Button from "../Button/Button";
import { AppContext } from "../../Context/AppContext.js";
import { baseUrl } from "../../utils/constants";

export default function MoviesCard({ movie }) {

  const { isFavorit, saveMovie, removeMovie } = useContext(AppContext);

  // определяем страницу на которой находимся
  const location = useLocation();
  // собираем полный путь до изображений
  const url = location.pathname === '/movies' ? baseUrl + movie.image.url : movie.image;
  // длительность фильма в часах и минутах
  const hours = Math.floor(movie.duration / 60);
  const minuts = movie.duration % 60;

  // Определяем, сохранён ли фильм и записываем в переменную
  const isSavedMovie = isFavorit(movie);
  // Создаём переменную, которую зададим в `className` для кнопки лайка
  const saveMovieButtonClassName =
    `${isSavedMovie && 'movies-card__save-button_active'}`;

  // проверяем наличие флага у фильма и запускаем функцию на странице /movies
  function handleFavoritClick() {
    isSavedMovie ? removeMovie(movie) : saveMovie(movie);
  }

  // удалить фильм из избранных на странице /saved-movies
  function handleRemoveClick() {
    removeMovie(movie);
  }

  return (
    <li className="movies-card">
      <a href={movie.trailerLink}
        className="movies-card__link"
        rel="noopener noreferrer"
        target="_blank">
        <img className="movies-card__image"
          src={url}
          alt={movie.nameRU} />
        <div className="movies-card__footer">
          <div className="movies-card__group">
            <h2 className="movies-card__heading">{movie.nameRU}</h2>
          </div>
          <p className="movies-card__duration">{`${hours}ч${minuts}м`}</p>
        </div>
      </a>
      {location.pathname === "/movies" &&
        <Button sectionClass={`movies-card__save-button
              ${saveMovieButtonClassName}`}
          type="button"
          aria-label="сохранить"
          onClick={handleFavoritClick}
        ></Button>}
      {location.pathname === "/saved-movies" &&
        <Button sectionClass="movies-card__remove-button"
          type="button"
          aria-label="удалить"
          onClick={handleRemoveClick}
        ></Button>}
    </li>
  )
}