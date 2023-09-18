// import { useContext } from 'react';
// import { LoggedInContext } from '../../Context/LoggedInContext.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import SearchForm from '../SearchForm/SearchForm.js';
// import Preloader from '../Preloader/Preloader.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
// import moviesApi from '../../utils/MoviesApi.js';
// import { useEffect, useState } from 'react';
import presetMoviesList from '../../utils/presetMoviesCount.js';
import ShowMore from '../ShowMore/ShowMore.js';

// удалить на 4 этапе
import movies from '../../utils/movies.js';

export default function Movies() {

  // const { isLoggedIn } = useContext(LoggedInContext);

  // const [movies, setMovies] = useState([]);

  // function getMovies() {
  //   moviesApi.getMovies()
  //     .then((movies) => {
  //       setMovies(movies);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  function handleSubmitSearchMovies() {

  }

  // useEffect(() => {
  //   getMovies()
  // },
  //   [isLoggedIn])

  return (
    <main>
      <Header sectionClass='header' />
      <SearchForm onSubmit={handleSubmitSearchMovies} />
      {/* <Preloader /> */}
      <MoviesCardList movies={movies} presetMovies={presetMoviesList} />
      <ShowMore />
      <Footer />
    </main>
  )
}
