export default function presetMoviesList() {

// определяем ширину экрана
  const viewport = document.documentElement.clientWidth;
  // начальное количество карточек фильмов при монтировании
  let initMoviesCount;
  // добавить количество карточек фильмов
  let addMoviesCount;

  if (viewport <= 725) {
    initMoviesCount = 5;
    addMoviesCount = 1;
    return { initMoviesCount, addMoviesCount }
  }
  if (viewport <= 1220) {
    initMoviesCount = 8;
    addMoviesCount = 2;
    return { initMoviesCount, addMoviesCount }
  }
  initMoviesCount = 16;
  addMoviesCount = 4;
  return { initMoviesCount, addMoviesCount }
}
