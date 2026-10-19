import { render, screen } from '@testing-library/react';
import Intro from '../../src/components/Intro';

const IMAGEN_FALSA = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const props = {
  nombre: 'Ana Pérez',
  titulo: 'Estudiante de Informática',
  foto: IMAGEN_FALSA,
  biografia: 'Me gusta programar.',
  github: 'https://github.com/ana',
  linkedin: 'https://linkedin.com/in/ana',
};

describe('Intro', () => {
  it('muestra el nombre como título principal', () => {
    render(<Intro {...props} />);
    expect(screen.getByRole('heading', { level: 1, name: 'Ana Pérez' })).toBeTruthy();
  });

  it('muestra el subtítulo y la biografía', () => {
    render(<Intro {...props} />);
    expect(screen.getByText('Estudiante de Informática')).toBeTruthy();
    expect(screen.getByText('Me gusta programar.')).toBeTruthy();
  });

  it('muestra la foto con un texto alternativo accesible', () => {
    render(<Intro {...props} />);
    const foto = screen.getByAltText('Foto de perfil de Ana Pérez');
    expect(foto.getAttribute('src')).toBe(IMAGEN_FALSA);
  });

  it('enlaza a GitHub y LinkedIn en una pestaña nueva', () => {
    render(<Intro {...props} />);
    const github = screen.getByText('GitHub').closest('a');
    const linkedin = screen.getByText('LinkedIn').closest('a');

    expect(github.getAttribute('href')).toBe('https://github.com/ana');
    expect(linkedin.getAttribute('href')).toBe('https://linkedin.com/in/ana');
    expect(github.getAttribute('target')).toBe('_blank');
  });
});