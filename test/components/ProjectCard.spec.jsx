import { render, screen } from '@testing-library/react';
import ProjectCard from '../../src/components/ProjectCard';

const proyecto = {
  titulo: 'Tienda Online',
  descripcion: 'Una tienda hecha con React.',
  imagen: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  tecnologias: ['React', 'Bootstrap', 'Node'],
  enlace: 'https://github.com/ana/tienda',
};

describe('ProjectCard', () => {
  it('muestra el título y la descripción', () => {
    render(<ProjectCard {...proyecto} />);
    expect(screen.getByText('Tienda Online')).toBeTruthy();
    expect(screen.getByText('Una tienda hecha con React.')).toBeTruthy();
  });

  it('muestra un badge por cada tecnología', () => {
    const { container } = render(<ProjectCard {...proyecto} />);
    const badges = container.querySelectorAll('.badge');
    expect(badges.length).toBe(3);
    expect(badges[0].textContent).toBe('React');
  });

  it('muestra la imagen con texto alternativo y carga diferida', () => {
    render(<ProjectCard {...proyecto} />);
    const imagen = screen.getByAltText('Captura del proyecto Tienda Online');
    expect(imagen.getAttribute('loading')).toBe('lazy');
  });

  it('enlaza al repositorio del proyecto', () => {
    render(<ProjectCard {...proyecto} />);
    const enlace = screen.getByText('Ver proyecto').closest('a');
    expect(enlace.getAttribute('href')).toBe('https://github.com/ana/tienda');
  });
});