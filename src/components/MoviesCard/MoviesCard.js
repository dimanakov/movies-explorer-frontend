import { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../Button/Button";

export default function MoviesCard({ movie }) {

  const baseUrl = 'https://api.nomoreparties.co/';
  const hours = Math.floor(movie.duration / 60);
  const minuts = movie.duration % 60;
  // определяем страницу на которой находимся
  const location = useLocation();
  // Определяем, сохранён ли фильм в избранных у текущего пользователя
  const [isSaved, setIsSaved] = useState(false);

  function handleSaveClick() {
    setIsSaved(!isSaved);
  }

  return (
    <li className="movies-card">
      <img className="movies-card__image"
        src={baseUrl + movie.image.url}
        alt={movie.nameRU} />
      <div className="movies-card__footer">
        <div className="movies-card__group">
          <h2 className="movies-card__heading">{movie.nameRU}</h2>
          {location.pathname === "/movies" &&
          <Button sectionClass={`movies-card__save-button ${isSaved ? 'movies-card__save-button_active' : 'movies-card__save-button_off'}`}
            type="button"
            aria-label="сохранить"
            handleClick={handleSaveClick}
          ></Button>}
          {location.pathname === "/saved-movies" &&
            <Button sectionClass="movies-card__remove-button"
              type="button"
              aria-label="удалить"
              handleClick={handleSaveClick}
            ></Button>}
        </div>
        <p className="movies-card__duration">{`${hours}ч${minuts}м`}</p>
      </div>
    </li>
  )
}