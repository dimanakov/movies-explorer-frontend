import { Link } from 'react-router-dom';

export default function PageNotFound() {

  return (
    <div className="page-not-found">
      <h2 className="page-not-found__title">404</h2>
      <p className="page-not-found__subtitle">Страница не найдена</p>
      <Link to="/" className="page-not-found__link">Назад</Link>
    </div>
  );
}