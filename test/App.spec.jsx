import { render, screen } from '@testing-library/react';
import App from '../src/App';

const IMAGEN_FALSA = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

// Datos falsos que "devolverá el servidor"
const DATOS = {
  'data/perfil.json': {
    nombre: 'Ana Pérez', titulo: 'Estudiante', foto: IMAGEN_FALSA,
    biografia: 'Bio', github: 'https://github.com/ana', linkedin: 'https://linkedin.com/in/ana',
  },
  'data/proyectos.json': [
    { id: 1, titulo: 'Proyecto Uno', descripcion: 'A', imagen: IMAGEN_FALSA, tecnologias: ['React'], enlace: '#' },
  ],
  'data/noticias.json': {
    tecnologia: [{ id: 1, titulo: 'Noticia Tec', fecha: '2026-10-01', contenido: 'X' }],
    personales: [{ id: 1, titulo: 'Noticia Personal', fecha: '2026-10-02', contenido: 'Y' }],
  },
};

const respuesta = (datos, status = 200) =>
  Promise.resolve(new Response(JSON.stringify(datos), { status }));

describe('App', () => {
  it('muestra un indicador de carga mientras llegan los datos', () => {
    spyOn(window, 'fetch').and.returnValue(new Promise(() => {})); // nunca responde
    render(<App />);
    expect(screen.getByText('Cargando...')).toBeTruthy();
  });

  it('muestra todas las secciones cuando los JSON cargan bien', async () => {
    spyOn(window, 'fetch').and.callFake((url) => respuesta(DATOS[url]));

    render(<App />);

    expect(await screen.findByRole('heading', { level: 1, name: 'Ana Pérez' })).toBeTruthy();
    expect(screen.getByText('Proyecto Uno')).toBeTruthy();
    expect(screen.getByText('Noticia Tec')).toBeTruthy();
    expect(screen.getByText('Noticia Personal')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeTruthy();
    expect(screen.queryByText('Cargando...')).toBeNull();
  });

  it('muestra un mensaje de error si un JSON no se puede cargar', async () => {
    spyOn(window, 'fetch').and.callFake((url) =>
      url === 'data/perfil.json' ? respuesta({}, 404) : respuesta(DATOS[url])
    );

    render(<App />);

    const alerta = await screen.findByRole('alert');
    expect(alerta.textContent).toBe('No se pudo cargar data/perfil.json');
  });
});