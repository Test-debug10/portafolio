import { render, screen } from '@testing-library/react';
import Intro from '../../src/components/Intro';

// Imagen de 1x1 píxel para no depender de un archivo real
const IMAGEN_FALSA = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

describe('Intro', () => {
  it('muestra el nombre recibido por props', () => {
    render(
      <Intro
        nombre="Ana Pérez"
        titulo="Estudiante"
        foto={IMAGEN_FALSA}
        biografia="Me gusta programar."
        github="https://github.com/ana"
        linkedin="https://linkedin.com/in/ana"
      />
    );

    const titulo = screen.getByRole('heading', { name: 'Ana Pérez' });
    expect(titulo).toBeTruthy();
  });
});