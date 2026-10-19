import { validarContacto } from '../../src/utils/validacion';

describe('validarContacto', () => {
  const datosValidos = {
    nombre: 'Ana',
    email: 'ana@correo.cl',
    mensaje: 'Hola, me interesa tu trabajo.',
  };

  it('no devuelve errores cuando los datos son válidos', () => {
    expect(validarContacto(datosValidos)).toEqual({});
  });

  it('devuelve los tres errores cuando todo está vacío', () => {
    const errores = validarContacto({ nombre: '', email: '', mensaje: '' });
    expect(Object.keys(errores).length).toBe(3);
    expect(errores.nombre).toBe('El nombre es obligatorio.');
    expect(errores.email).toBe('El correo es obligatorio.');
  });

  it('rechaza un nombre que solo tiene espacios', () => {
    const errores = validarContacto({ ...datosValidos, nombre: '   ' });
    expect(errores.nombre).toBe('El nombre es obligatorio.');
  });

  it('rechaza un correo sin formato válido', () => {
    const errores = validarContacto({ ...datosValidos, email: 'ana@' });
    expect(errores.email).toBe('Ingresa un correo válido.');
  });

  it('rechaza un mensaje de menos de 10 caracteres', () => {
    const errores = validarContacto({ ...datosValidos, mensaje: 'Hola' });
    expect(errores.mensaje).toBe('El mensaje debe tener al menos 10 caracteres.');
  });
});