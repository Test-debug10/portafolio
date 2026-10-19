import { render, screen } from '@testing-library/react';
import NewsItem from '../../src/components/NewsItem';

describe('NewsItem', () => {
  const noticia = {
    titulo: 'Nueva versión de React',
    fecha: '2026-10-15',
    contenido: 'React lanzó una nueva versión.',
  };

  it('muestra el título como encabezado', () => {
    render(<NewsItem {...noticia} />);
    expect(screen.getByRole('heading', { level: 4, name: 'Nueva versión de React' })).toBeTruthy();
  });

  it('muestra la fecha formateada dentro de una etiqueta time', () => {
    render(<NewsItem {...noticia} />);
    const fecha = screen.getByText('15 de octubre de 2026');
    expect(fecha.tagName).toBe('TIME');
    expect(fecha.getAttribute('datetime')).toBe('2026-10-15');
  });

  it('muestra el contenido', () => {
    render(<NewsItem {...noticia} />);
    expect(screen.getByText('React lanzó una nueva versión.')).toBeTruthy();
  });
});