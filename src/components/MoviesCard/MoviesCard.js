import { useState } from "react";
import Button from "../Button/Button";

export default function MoviesCard({ movie }) {

  const baseUrl = 'https://api.nomoreparties.co/';
  const hours = Math.floor(movie.duration / 60);
  const minuts = movie.duration % 60;

  // Определяем, сохранён ли фильм в избранных у текущего пользователя
  const [isLiked, setIsLiked] = useState(false);

  function handleSaveClick() {
    setIsLiked(!isLiked);
  }

  return (
    <li className="movies-card">
      <img className="movies-card__image"
        src={baseUrl + movie.image.url}
        alt={movie.nameRU} />
      <div className="movies-card__footer">
        <div className="movies-card__group">
          <h2 className="movies-card__heading">{movie.nameRU}</h2>
          <Button sectionClass={`movies-card__save-button ${isLiked ? 'movies-card__save-button_active' : 'movies-card__save-button_off'}`}
            type="button"
            aria-label="сохранить"
            handleClick={handleSaveClick}
          ></Button>
        </div>
        <p className="movies-card__duration">{`${hours}ч${minuts}м`}</p>
      </div>
    </li>
  )
}