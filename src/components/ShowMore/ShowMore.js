import Button from "../Button/Button";
import Container from "../Container/Container";

export default function ShowMore(){
  return (
    <section className="show-more">
      <Container>
        <Button sectionClass="show-more__button">Ещё</Button>
      </Container>
    </section>
  )
}