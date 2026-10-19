const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Valida los datos del formulario de contacto.
 * @param {{nombre: string, email: string, mensaje: string}} datos
 * @returns {object} Un objeto con los errores encontrados. Si está vacío, los datos son válidos.
 */
export function validarContacto({ nombre, email, mensaje }) {
  const errores = {};

  if (!nombre.trim()) {
    errores.nombre = 'El nombre es obligatorio.';
  }

  if (!email.trim()) {
    errores.email = 'El correo es obligatorio.';
  } else if (!REGEX_EMAIL.test(email)) {
    errores.email = 'Ingresa un correo válido.';
  }

  if (mensaje.trim().length < 10) {
    errores.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
  }

  return errores;
}