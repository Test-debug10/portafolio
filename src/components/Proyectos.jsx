import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ProjectCard from './ProjectCard';

/**
 * Sección que lista los proyectos y permite filtrarlos por tecnología.
 * @param {object} props
 * @param {object[]} props.proyectos - Lista de proyectos cargada desde el JSON.
 */
function Proyectos({ proyectos }) {
  // Estado: la tecnología seleccionada en el filtro
  const [filtro, setFiltro] = useState('Todas');

  // Lista de tecnologías sin repetir, para crear los botones del filtro
  const tecnologias = ['Todas', ...new Set(proyectos.flatMap((p) => p.tecnologias))];

  // Proyectos que coinciden con el filtro
  const proyectosFiltrados =
    filtro === 'Todas'
      ? proyectos
      : proyectos.filter((p) => p.tecnologias.includes(filtro));

  return (
    <section id="proyectos" className="py-5">
      <Container>
        <h2 className="text-center mb-4">Proyectos</h2>

        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
          {tecnologias.map((tec) => (
            <Button
              key={tec}
              size="sm"
              variant={filtro === tec ? 'primary' : 'outline-primary'}
              aria-pressed={filtro === tec}
              onClick={() => setFiltro(tec)}
            >
              {tec}
            </Button>
          ))}
        </div>

        <Row xs={1} md={2} lg={3} className="g-4">
          {proyectosFiltrados.map((proyecto) => (
            <Col key={proyecto.id}>
              <ProjectCard {...proyecto} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Proyectos;