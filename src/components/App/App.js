import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Landing from '../Landing/Landing.js';
import Movies from '../Movies/Movies.js';
import PageNotFound from '../PageNotFound/PageNotFound.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import { AppContext } from '../../Context/AppContext.js';
import Auth from '../../utils/Auth.js';
import api from '../../utils/MainApi.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';

export default function App() {

  const location = useLocation();
  const navigate = useNavigate();

  const { getUserAuth } = Auth({});
  const token = localStorage.getItem('jwt') || '';
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [userMovies, setUserMovies] = useState([]);

  function handleErrorPage(obj, errorPage) {
    const { errorCodePage, errorPageMessage } = errorPage;
    const { statusCode, message } = obj;
    setErrorMessage((statusCode === errorCodePage ? message : errorPageMessage));
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

  // получаем данные пользователя
  function getUserData() {
    Promise.all([
      api.getUserInfo(),
      api.getSavedMovies()
    ])
      .then(([userData, userMovies]) => {
        setCurrentUser(userData);
        // console.log(userData);
        setUserMovies(userMovies);
        // console.log(userMovies);
      })
      .catch((err) => { //попадаем сюда если один из промисов завершится ошибкой 
        console.error(err);
      });
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
      errorMessage, setErrorMessage,
      handleErrorPage,
      userMovies, setUserMovies
    }}>
      <div className="page">
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/movies' element={<ProtectedRoute element={Movies} />} />
          <Route path='/saved-movies' element={<ProtectedRoute element={Movies} />} />
          <Route path='/profile' element={<ProtectedRoute element={Profile} />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}
