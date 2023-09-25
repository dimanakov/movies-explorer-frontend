import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Landing from '../Landing/Landing.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import PageNotFound from '../PageNotFound/PageNotFound.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import { AppContext } from '../../Context/AppContext.js';
import Auth from '../../utils/Auth.js';
// import useFormAndValidation from '../../hooks/useFormAndValidations.js';
import api from '../../utils/MainApi.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';

export default function App() {

  const location = useLocation();
  const navigate = useNavigate();
  // проверка токена
  const { getUserAuth } = Auth({});
  const token = localStorage.getItem('jwt') || '';
  // стейты состояний
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // стейты данных о пользователе
  const [currentUser, setCurrentUser] = useState({});
  const [userMovies, setUserMovies] = useState([]);
  // обработчик ошибок регистрации/авторизации
  function handleErrorPage(obj, errorPage) {
    const { errorCodePage, errorPageMessage } = errorPage;
    const { statusCode, message } = obj;
    setErrorMessage((statusCode === errorCodePage ? message : errorPageMessage));
  }

  // получаем данные пользователя
  function getUserData() {
    Promise.all([
      api.getUserInfo(),
      api.getSavedMovies()
    ])
      .then(([userData, userMovies]) => {
        setCurrentUser(userData);
        setUserMovies(userMovies);
      })
      .catch((err) => { //попадаем сюда если один из промисов завершится ошибкой 
        console.error(err);
      });
  }

  //проверка токена
  function checkToken() {
    if (token) {
      getUserAuth(token)
        .then((res) => {
          setLoggedIn(true);
          navigate(location.pathname);
        })
        .catch((err) => { //попадаем сюда если один из промисов завершится ошибкой 
          setLoggedIn(false);
          navigate('/', { replace: true });
          console.error(err);
        })
    }
  }

  ///////////////////////////////////////////////////////
  // обработка взаимодействия пользователя с фильмами

  // проверка наличия фильма в избранных
  function isFavorit(movie) {
    return userMovies.some((m) => {
      return m.movieId === movie.id;
    })
  };

  // сохранение фильма в избранных
  function saveMovie(movie) {
    api.saveMovies(movie)
      .then((movie) => {
        setUserMovies([...userMovies, movie]);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  // удаление фильма из избранных
  function removeMovie(movie) {
    const id = movie.id || movie.movieId;
    // Отправляем запрос в API и получаем обновлённые данные списка избранных
    api.removeMovies(id)
      .then((movies) => {
        setUserMovies(movies);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  // проверка токена пользователя
  useEffect(() => {
    checkToken();
    if (token) {
      getUserData();
    }
    // eslint-disable-next-line
  }, [token]);

  return (
    <AppContext.Provider value={{
      isLoggedIn, setLoggedIn,
      isLoading, setIsLoading,
      currentUser, setCurrentUser,
      userMovies, setUserMovies,
      errorMessage, setErrorMessage,
      handleErrorPage, isFavorit,
      saveMovie, removeMovie
    }}>
      <div className="page">
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/movies' element={<ProtectedRoute element={Movies} />} />
          <Route path='/saved-movies' element={<ProtectedRoute element={SavedMovies} />} />
          <Route path='/profile' element={<ProtectedRoute element={Profile} />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}
