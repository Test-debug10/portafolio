import { Card, Badge, Button } from 'react-bootstrap';
import './ProjectCard.css';

/**
 * Tarjeta que muestra la información de un proyecto.
 * @param {object} props
 * @param {string} props.titulo - Nombre del proyecto.
 * @param {string} props.descripcion - Descripción breve.
 * @param {string} props.imagen - Ruta de la imagen.
 * @param {string[]} props.tecnologias - Tecnologías utilizadas.
 * @param {string} props.enlace - URL de la demo o del repositorio.
 */
function ProjectCard({ titulo, descripcion, imagen, tecnologias, enlace }) {
  return (
    <Card className="project-card h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={imagen}
        alt={`Captura del proyecto ${titulo}`}
        loading="lazy"
        className="project-card-img"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>{descripcion}</Card.Text>
        <div className="mb-3">
          {tecnologias.map((tec) => (
            <Badge key={tec} bg="primary" className="me-1">
              {tec}
            </Badge>
          ))}
        </div>
        <Button
          variant="outline-primary"
          href={enlace}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto"
        >
          Ver proyecto
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;