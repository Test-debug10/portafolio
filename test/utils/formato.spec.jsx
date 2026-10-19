import { formatearFecha, ordenarPorFecha } from '../../src/utils/formato';

describe('formatearFecha', () => {
  it('convierte una fecha AAAA-MM-DD a texto en español', () => {
    expect(formatearFecha('2026-10-15')).toBe('15 de octubre de 2026');
  });

  it('no cambia de día por la zona horaria', () => {
    expect(formatearFecha('2026-01-01')).toBe('1 de enero de 2026');
  });

  it('devuelve el texto original si la fecha no es válida', () => {
    expect(formatearFecha('fecha-mala')).toBe('fecha-mala');
  });
});

describe('ordenarPorFecha', () => {
  const noticias = [
    { id: 1, fecha: '2026-01-10' },
    { id: 2, fecha: '2026-03-05' },
    { id: 3, fecha: '2026-02-20' },
  ];

  it('ordena de la más reciente a la más antigua', () => {
    const ids = ordenarPorFecha(noticias).map((n) => n.id);
    expect(ids).toEqual([2, 3, 1]);
  });

  it('no modifica la lista original', () => {
    ordenarPorFecha(noticias);
    expect(noticias[0].id).toBe(1);
  });
});