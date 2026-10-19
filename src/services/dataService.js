/**
 * Lee un archivo JSON desde la carpeta public y devuelve su contenido.
 * @param {string} ruta - Ruta relativa del archivo, por ejemplo "data/perfil.json".
 * @returns {Promise<any>} Los datos del archivo.
 */
export async function cargarJSON(ruta) {
  const respuesta = await fetch(ruta);
  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar ${ruta}`);
  }
  return respuesta.json();
}

export const obtenerPerfil = () => cargarJSON('data/perfil.json');
export const obtenerProyectos = () => cargarJSON('data/proyectos.json');
export const obtenerNoticias = () => cargarJSON('data/noticias.json');