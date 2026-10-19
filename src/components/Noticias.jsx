import { Container, Row, Col } from 'react-bootstrap';
import NewsSection from './NewsSection';

/**
 * Sección de noticias con dos columnas: tecnología y novedades personales.
 * @param {object} props
 * @param {{tecnologia: object[], personales: object[]}} props.noticias - Datos del JSON.
 */
function Noticias({ noticias }) {
  return (
    <section id="noticias" className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-4">Noticias</h2>
        <Row className="g-4">
          <Col xs={12} md={6}>
            <NewsSection titulo="Tecnología" noticias={noticias.tecnologia} />
          </Col>
          <Col xs={12} md={6}>
            <NewsSection titulo="Mis novedades" noticias={noticias.personales} />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Noticias;