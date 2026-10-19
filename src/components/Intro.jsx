import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import './Intro.css';

/**
 * Sección de presentación del portafolio.
 * @param {object} props
 * @param {string} props.nombre - Nombre del estudiante.
 * @param {string} props.titulo - Carrera o subtítulo.
 * @param {string} props.foto - Ruta de la foto de perfil.
 * @param {string} props.biografia - Breve descripción personal.
 * @param {string} props.github - Enlace al perfil de GitHub.
 * @param {string} props.linkedin - Enlace al perfil de LinkedIn.
 */
function Intro({ nombre, titulo, foto, biografia, github, linkedin }) {
  return (
    <section id="introduccion" className="intro text-white text-center">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Image
              src={foto}
              alt={`Foto de perfil de ${nombre}`}
              roundedCircle
              className="intro-foto mb-3"
            />
            <h1>{nombre}</h1>
            <p className="lead">{titulo}</p>
            <p>{biografia}</p>
            <div className="d-flex justify-content-center gap-2">
              <Button variant="outline-light" href={github} target="_blank" rel="noopener noreferrer">
                GitHub
              </Button>
              <Button variant="outline-light" href={linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Intro;