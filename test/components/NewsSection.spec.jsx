import { render, screen, fireEvent } from '@testing-library/react';
import NewsSection from '../../src/components/NewsSection';

const noticias = [
  { id: 1, titulo: 'Noticia antigua', fecha: '2026-01-01', contenido: 'A' },
  { id: 2, titulo: 'Noticia reciente', fecha: '2026-03-01', contenido: 'B' },
  { id: 3, titulo: 'Noticia intermedia', fecha: '2026-02-01', contenido: 'C' },
];

// Devuelve los títulos de las noticias visibles, en orden
const titulosVisibles = () =>
  screen.getAllByRole('heading', { level: 4 }).map((h) => h.textContent);

describe('NewsSection', () => {
  it('muestra el título de la sección', () => {
    render(<NewsSection titulo="Tecnología" noticias={noticias} />);
    expect(screen.getByRole('heading', { level: 3, name: 'Tecnología' })).toBeTruthy();
  });

  it('muestra solo 2 noticias al inicio, de la más reciente a la más antigua', () => {
    render(<NewsSection titulo="Tecnología" noticias={noticias} />);
    expect(titulosVisibles()).toEqual(['Noticia reciente', 'Noticia intermedia']);
  });

  it('al hacer clic en "Ver más" muestra todas las noticias', () => {
    render(<NewsSection titulo="Tecnología" noticias={noticias} />);
    const boton = screen.getByRole('button', { name: 'Ver más (1)' });

    fireEvent.click(boton);

    expect(titulosVisibles().length).toBe(3);
    expect(boton.textContent).toBe('Ver menos');
    expect(boton.getAttribute('aria-expanded')).toBe('true');
  });

  it('al hacer clic en "Ver menos" vuelve a mostrar solo 2', () => {
    render(<NewsSection titulo="Tecnología" noticias={noticias} />);
    const boton = screen.getByRole('button', { name: 'Ver más (1)' });

    fireEvent.click(boton);
    fireEvent.click(boton);

    expect(titulosVisibles().length).toBe(2);
  });

  it('respeta un límite distinto recibido por props', () => {
    render(<NewsSection titulo="Tecnología" noticias={noticias} limite={1} />);
    expect(titulosVisibles().length).toBe(1);
    expect(screen.getByRole('button', { name: 'Ver más (2)' })).toBeTruthy();
  });

  it('no muestra el botón si no hay más noticias que el límite', () => {
    render(<NewsSection titulo="Tecnología" noticias={noticias.slice(0, 2)} />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('muestra un mensaje cuando la lista está vacía', () => {
    render(<NewsSection titulo="Tecnología" noticias={[]} />);
    expect(screen.getByText('No hay noticias por ahora.')).toBeTruthy();
  });
});