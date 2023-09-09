import { Link } from 'react-router-dom';
import Container from '../Container/Container.js';

export default function PageNotFound() {

  return (
    <div className="page-not-found">
      <Container sectionClass="page-not-found__container">
        <h2>404</h2>
        <p>Страница не найдена</p>
        <Link to="/">Назад</Link>
      </Container>
      <div className="page-not-found__container">
      </div>
    </div>
  );
}