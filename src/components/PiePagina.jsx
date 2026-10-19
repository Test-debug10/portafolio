import { Container } from 'react-bootstrap';

/**
 * Pie de página del portafolio.
 * @param {object} props
 * @param {string} props.nombre - Nombre del autor.
 * @param {string} props.github - Enlace a GitHub.
 * @param {string} props.linkedin - Enlace a LinkedIn.
 */
function PiePagina({ nombre, github, linkedin }) {
  const anio = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-4">
      <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
        <p className="mb-0">© {anio} {nombre}. Todos los derechos reservados.</p>
        <nav aria-label="Redes sociales" className="d-flex gap-3">
          <a href={github} target="_blank" rel="noopener noreferrer" className="link-light">GitHub</a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="link-light">LinkedIn</a>
        </nav>
      </Container>
    </footer>
  );
}

export default PiePagina;