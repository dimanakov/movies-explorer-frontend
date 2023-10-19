import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

export default function PageNotFound() {

  const path = useNavigate();

  function goBack() {
    path(-3);
  }

  return (
    <main className="page-not-found">
      <h1 className="page-not-found__title">404</h1>
      <p className="page-not-found__subtitle">Страница не найдена</p>
      <Button buttonType="button"
        sectionClass="page-not-found__link"
        onClick={goBack}>Назад</Button>
    </main>
  );
}