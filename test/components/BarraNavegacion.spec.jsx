import { render, screen } from '@testing-library/react';
import BarraNavegacion from '../../src/components/BarraNavegacion';

const enlaces = [
  { texto: 'Inicio', href: '#inicio' },
  { texto: 'Proyectos', href: '#proyectos' },
  { texto: 'Contacto', href: '#contacto' },
];

describe('BarraNavegacion', () => {
  it('muestra la marca recibida por props', () => {
    render(<BarraNavegacion marca="Mi Sitio" enlaces={enlaces} />);
    expect(screen.getByText('Mi Sitio')).toBeTruthy();
  });

  it('crea un enlace por cada elemento de la lista', () => {
    render(<BarraNavegacion marca="Mi Sitio" enlaces={enlaces} />);
    const proyectos = screen.getByRole('link', { name: 'Proyectos' });
    expect(proyectos.getAttribute('href')).toBe('#proyectos');
    expect(screen.getAllByRole('link').length).toBe(4); // 3 enlaces + la marca
  });

  it('tiene un botón accesible para abrir el menú en celulares', () => {
    render(<BarraNavegacion marca="Mi Sitio" enlaces={enlaces} />);
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toBeTruthy();
  });
});