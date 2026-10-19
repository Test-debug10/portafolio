import { useState } from 'react';
import { Button } from 'react-bootstrap';
import NewsItem from './NewsItem';
import { ordenarPorFecha } from '../utils/formato';

/**
 * Sección de noticias reutilizable con opción "Ver más".
 * @param {object} props
 * @param {string} props.titulo - Título de la sección.
 * @param {object[]} props.noticias - Lista de noticias {id, titulo, fecha, contenido}.
 * @param {number} [props.limite=2] - Cuántas noticias mostrar antes de "Ver más".
 */
function NewsSection({ titulo, noticias, limite = 2 }) {
  // Estado: si se están mostrando todas las noticias o solo algunas
  const [mostrarTodas, setMostrarTodas] = useState(false);

  const ordenadas = ordenarPorFecha(noticias);
  const visibles = mostrarTodas ? ordenadas : ordenadas.slice(0, limite);
  const hayMas = noticias.length > limite;

  return (
    <div>
      <h3 className="mb-3">{titulo}</h3>

      {noticias.length === 0 ? (
        <p className="text-muted">No hay noticias por ahora.</p>
      ) : (
        visibles.map((noticia) => <NewsItem key={noticia.id} {...noticia} />)
      )}

      {hayMas && (
        <Button
          variant="link"
          className="p-0"
          aria-expanded={mostrarTodas}
          onClick={() => setMostrarTodas(!mostrarTodas)}
        >
          {mostrarTodas ? 'Ver menos' : `Ver más (${noticias.length - limite})`}
        </Button>
      )}
    </div>
  );
}

export default NewsSection;