import { Card } from 'react-bootstrap';
import { formatearFecha } from '../utils/formato';

/**
 * Muestra una noticia individual.
 * @param {object} props
 * @param {string} props.titulo - Título de la noticia.
 * @param {string} props.fecha - Fecha en formato AAAA-MM-DD.
 * @param {string} props.contenido - Resumen breve.
 */
function NewsItem({ titulo, fecha, contenido }) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title as="h4" className="h5">{titulo}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <time dateTime={fecha}>{formatearFecha(fecha)}</time>
        </Card.Subtitle>
        <Card.Text>{contenido}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default NewsItem;