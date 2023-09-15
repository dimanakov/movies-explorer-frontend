import { Routes, Route } from 'react-router-dom';
import Landing from '../Landing/Landing.js';
import Movies from '../Movies/Movies.js';
import PageNotFound from '../PageNotFound/PageNotFound.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';

export default function App() {
  return (
    <div className="page">
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/movies' element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
