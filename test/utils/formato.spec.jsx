import { formatearFecha } from '../../src/utils/formato';

describe('formatearFecha', () => {
  it('convierte una fecha AAAA-MM-DD a texto en español', () => {
    expect(formatearFecha('2026-10-15')).toBe('15 de octubre de 2026');
  });

  it('devuelve el texto original si la fecha no es válida', () => {
    expect(formatearFecha('fecha-mala')).toBe('fecha-mala');
  });
});