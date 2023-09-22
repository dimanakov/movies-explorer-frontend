export default function searchMovieEngine(moviesList, key) {
  const movies = moviesList.filter((movie) => {
    const search = movie.nameRU.includes(key) || movie.nameEN.includes(key);
    return search;
  })
  return movies;
}