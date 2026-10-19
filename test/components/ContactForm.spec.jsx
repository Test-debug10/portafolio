import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '../../src/components/ContactForm';

// Escribe en los tres campos del formulario
function llenarFormulario({ nombre, email, mensaje }) {
  fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: nombre } });
  fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: email } });
  fireEvent.change(screen.getByLabelText('Mensaje'), { target: { value: mensaje } });
}

const enviar = () => fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));

const datosValidos = {
  nombre: 'Ana Pérez',
  email: 'ana@correo.cl',
  mensaje: 'Hola, me gustaría conversar contigo.',
};

describe('ContactForm', () => {
  it('muestra los tres campos con su etiqueta', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText('Nombre')).toBeTruthy();
    expect(screen.getByLabelText('Correo electrónico')).toBeTruthy();
    expect(screen.getByLabelText('Mensaje')).toBeTruthy();
  });

  it('actualiza el valor del campo al escribir', () => {
    render(<ContactForm />);
    const nombre = screen.getByLabelText('Nombre');

    fireEvent.change(nombre, { target: { value: 'Ana' } });

    expect(nombre.value).toBe('Ana');
  });

  it('marca los campos en rojo y muestra errores si se envía vacío', () => {
    render(<ContactForm />);

    enviar();

    expect(screen.getByLabelText('Nombre').classList.contains('is-invalid')).toBeTrue();
    expect(screen.getByText('El nombre es obligatorio.')).toBeTruthy();
    expect(screen.getByText('El correo es obligatorio.')).toBeTruthy();
    expect(screen.getByText('El mensaje debe tener al menos 10 caracteres.')).toBeTruthy();
  });

  it('no llama a onEnviar si hay errores', () => {
    const onEnviar = jasmine.createSpy('onEnviar');
    render(<ContactForm onEnviar={onEnviar} />);

    llenarFormulario({ ...datosValidos, email: 'correo-malo' });
    enviar();

    expect(onEnviar).not.toHaveBeenCalled();
    expect(screen.getByText('Ingresa un correo válido.')).toBeTruthy();
  });

  it('llama a onEnviar con los datos cuando el formulario es válido', () => {
    const onEnviar = jasmine.createSpy('onEnviar');
    render(<ContactForm onEnviar={onEnviar} />);

    llenarFormulario(datosValidos);
    enviar();

    expect(onEnviar).toHaveBeenCalledOnceWith(datosValidos);
  });

  it('muestra el mensaje de éxito y limpia el formulario tras enviar', () => {
    render(<ContactForm onEnviar={jasmine.createSpy('onEnviar')} />);

    llenarFormulario(datosValidos);
    enviar();

    expect(screen.getByRole('status').textContent).toContain('Tu mensaje fue enviado');
    expect(screen.getByLabelText('Nombre').value).toBe('');
    expect(screen.getByLabelText('Mensaje').value).toBe('');
  });

  it('oculta el mensaje de éxito cuando el usuario vuelve a escribir', () => {
    render(<ContactForm onEnviar={jasmine.createSpy('onEnviar')} />);

    llenarFormulario(datosValidos);
    enviar();
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'B' } });

    expect(screen.queryByRole('status')).toBeNull();
  });

  it('funciona aunque no reciba la función onEnviar', () => {
    render(<ContactForm />);

    llenarFormulario(datosValidos);
    enviar();

    expect(screen.getByRole('status')).toBeTruthy();
  });
});