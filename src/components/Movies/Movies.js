import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import SearchForm from '../SearchForm/SearchForm.js';
// import Preloader from '../Preloader/Preloader.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import moviesApi from '../../utils/MoviesApi.js';
import { useEffect, useState } from 'react';

export default function Movies() {

  const [movies, setMovies] = useState([]);

  function getMovies() {
    moviesApi.getMovies()
      .then((movies) => {
        setMovies(movies);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleSubmitSearchMovies() {

  }

  useEffect(() => {
    getMovies()
  },
    [])

  return (
    <main>
      <Header sectionClass='movies__header' />
      <SearchForm onSubmit={handleSubmitSearchMovies} />
      <MoviesCardList movies={movies} />
      <Footer />
      {/* <Preloader /> */}
    </main>
  )
}
