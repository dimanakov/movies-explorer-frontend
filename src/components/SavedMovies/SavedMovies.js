import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import presetMoviesList from '../../utils/presetMoviesCount.js';
import movies from "../../utils/movies.js";

export default function SavedMovies(){

  function handleSubmitSearchMovies() {

  }

  return(
    <main className="saved-movies">
      <Header sectionClass="saved-movies__header"/>
      <SearchForm onSubmit={handleSubmitSearchMovies} />
      <MoviesCardList movies={movies} presetMovies={presetMoviesList} />
      <Footer />
    </main>
  )
}