import { render, screen } from '@testing-library/react';
import PiePagina from '../../src/components/PiePagina';

describe('PiePagina', () => {
  const props = {
    nombre: 'Ana Pérez',
    github: 'https://github.com/ana',
    linkedin: 'https://linkedin.com/in/ana',
  };

  it('muestra el año actual y el nombre', () => {
    render(<PiePagina {...props} />);
    const anio = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${anio} Ana Pérez`))).toBeTruthy();
  });

  it('enlaza a las redes sociales', () => {
    render(<PiePagina {...props} />);
    expect(screen.getByRole('link', { name: 'GitHub' }).getAttribute('href')).toBe('https://github.com/ana');
    expect(screen.getByRole('link', { name: 'LinkedIn' }).getAttribute('href')).toBe('https://linkedin.com/in/ana');
  });
});