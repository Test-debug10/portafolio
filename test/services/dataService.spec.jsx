import { cargarJSON, obtenerPerfil, obtenerProyectos, obtenerNoticias } from '../../src/services/dataService';

// Crea una respuesta falsa, como si viniera de un servidor
const respuesta = (datos, status = 200) =>
  Promise.resolve(new Response(JSON.stringify(datos), { status }));

describe('dataService', () => {
  it('cargarJSON devuelve los datos del archivo', async () => {
    spyOn(window, 'fetch').and.returnValue(respuesta({ nombre: 'Ana' }));

    const datos = await cargarJSON('data/perfil.json');

    expect(datos).toEqual({ nombre: 'Ana' });
    expect(window.fetch).toHaveBeenCalledWith('data/perfil.json');
  });

  it('cargarJSON lanza un error si el archivo no existe', async () => {
    spyOn(window, 'fetch').and.returnValue(respuesta({}, 404));

    await expectAsync(cargarJSON('data/no-existe.json'))
      .toBeRejectedWithError(Error, 'No se pudo cargar data/no-existe.json');
  });

  it('cada función pide su archivo correspondiente', async () => {
    spyOn(window, 'fetch').and.callFake(() => respuesta([]));

    await obtenerPerfil();
    await obtenerProyectos();
    await obtenerNoticias();

    expect(window.fetch.calls.allArgs()).toEqual([
      ['data/perfil.json'],
      ['data/proyectos.json'],
      ['data/noticias.json'],
    ]);
  });
});