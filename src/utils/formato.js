/**
 * Convierte una fecha "AAAA-MM-DD" a texto en español.
 * Ejemplo: "2026-10-15" -> "15 de octubre de 2026".
 * @param {string} fechaISO - Fecha en formato AAAA-MM-DD.
 * @returns {string} Fecha legible, o el texto original si no es válida.
 */
export function formatearFecha(fechaISO) {
  const partes = fechaISO.split('-').map(Number);
  if (partes.length !== 3 || partes.some(isNaN)) {
    return fechaISO;
  }
  const [anio, mes, dia] = partes;
  const fecha = new Date(anio, mes - 1, dia);
  return fecha.toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Ordena noticias de la más reciente a la más antigua.
 * @param {{fecha: string}[]} noticias
 * @returns {object[]} Una copia ordenada (no modifica la original).
 */
export function ordenarPorFecha(noticias) {
  return [...noticias].sort((a, b) => b.fecha.localeCompare(a.fecha));
}