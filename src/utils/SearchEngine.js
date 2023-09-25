// поисковый движок
export default function SearchEngine() {

  // фильтрация фильмов по поисковому запросу
  function findMovies(rawMovies, str) {
    return rawMovies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(str)
        || movie.nameEN.toLowerCase().includes(str)
    })
  }

  // фильтр короткометражек
  function handleFilterShorts(movies, isShort) {
    if (isShort) {
      return movies.filter((movie) => {
        return movie.duration <= 40
      })
    }
    return movies;
  }

  return { handleFilterShorts, findMovies };
}
