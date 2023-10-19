import Button from "../Button/Button";
import Container from "../Container/Container";

export default function ShowMore({ onClick }) {
  return (
    <section className="show-more">
      <Container>
        <Button sectionClass="show-more__button"
          buttonType="button"
          label='показать ещё'
          onClick={onClick}>Ещё</Button>
      </Container>
    </section>
  )
}