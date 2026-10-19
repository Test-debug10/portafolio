import { render, screen, fireEvent, within } from '@testing-library/react'; 
import Proyectos from '../../src/components/Proyectos';

const IMAGEN_FALSA = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const proyectos = [
  { id: 1, titulo: 'App React', descripcion: 'A', imagen: IMAGEN_FALSA, tecnologias: ['React', 'Bootstrap'], enlace: '#' },
  { id: 2, titulo: 'Sitio Web', descripcion: 'B', imagen: IMAGEN_FALSA, tecnologias: ['HTML', 'Bootstrap'], enlace: '#' },
  { id: 3, titulo: 'API Java', descripcion: 'C', imagen: IMAGEN_FALSA, tecnologias: ['Java'], enlace: '#' },
];

describe('Proyectos', () => {
  it('muestra todos los proyectos al inicio', () => {
    const { container } = render(<Proyectos proyectos={proyectos} />);
    expect(container.querySelectorAll('.card').length).toBe(3);
  });

  it('crea un botón de filtro por cada tecnología, sin repetir', () => {
    render(<Proyectos proyectos={proyectos} />);
    const filtros = screen.getByRole('group', { name: 'Filtrar por tecnología' });
    const botones = within(filtros).getAllByRole('button').map((b) => b.textContent);

    // "Bootstrap" aparece en dos proyectos, pero debe haber un solo botón
    expect(botones).toEqual(['Todas', 'React', 'Bootstrap', 'HTML', 'Java']);
  });

  it('el filtro "Todas" está activo al inicio', () => {
    render(<Proyectos proyectos={proyectos} />);
    const todas = screen.getByRole('button', { name: 'Todas' });
    expect(todas.getAttribute('aria-pressed')).toBe('true');
  });

  it('al hacer clic en una tecnología, muestra solo los proyectos que la usan', () => {
    const { container } = render(<Proyectos proyectos={proyectos} />);

    fireEvent.click(screen.getByRole('button', { name: 'Bootstrap' }));

    expect(container.querySelectorAll('.card').length).toBe(2);
    expect(screen.getByText('App React')).toBeTruthy();
    expect(screen.queryByText('API Java')).toBeNull();
  });

  it('marca como activo el botón seleccionado y desmarca el anterior', () => {
    render(<Proyectos proyectos={proyectos} />);
    const java = screen.getByRole('button', { name: 'Java' });

    fireEvent.click(java);

    expect(java.getAttribute('aria-pressed')).toBe('true');
    expect(java.classList.contains('btn-primary')).toBeTrue();
    expect(screen.getByRole('button', { name: 'Todas' }).getAttribute('aria-pressed')).toBe('false');
  });

  it('vuelve a mostrar todo al hacer clic en "Todas"', () => {
    const { container } = render(<Proyectos proyectos={proyectos} />);

    fireEvent.click(screen.getByRole('button', { name: 'Java' }));
    fireEvent.click(screen.getByRole('button', { name: 'Todas' }));

    expect(container.querySelectorAll('.card').length).toBe(3);
  });
});