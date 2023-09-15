import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

export default function PageNotFound() {

  const path = useNavigate();

  function goBack() {
    path(-1);
  }

  return (
    <div className="page-not-found">
      <h2 className="page-not-found__title">404</h2>
      <p className="page-not-found__subtitle">Страница не найдена</p>
      <Button buttonType="button"
        sectionClass="page-not-found__link"
        handleClick={goBack}>Назад</Button>
    </div>
  );
}