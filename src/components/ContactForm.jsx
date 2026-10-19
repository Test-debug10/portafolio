import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { validarContacto } from '../utils/validacion';

const DATOS_INICIALES = { nombre: '', email: '', mensaje: '' };

/**
 * Sección de contacto con formulario validado.
 * @param {object} props
 * @param {function} [props.onEnviar] - Función que se llama con los datos cuando el formulario es válido.
 */
function ContactForm({ onEnviar = () => {} }) {
  const [datos, setDatos] = useState(DATOS_INICIALES);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  // Se ejecuta cada vez que el usuario escribe en un campo
  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatos({ ...datos, [name]: value });
    setEnviado(false);
  };

  // Se ejecuta al presionar "Enviar"
  const manejarEnvio = (evento) => {
    evento.preventDefault(); // evita que la página se recargue
    const erroresEncontrados = validarContacto(datos);
    setErrores(erroresEncontrados);

    if (Object.keys(erroresEncontrados).length === 0) {
      onEnviar(datos);
      setEnviado(true);
      setDatos(DATOS_INICIALES);
    }
  };

  return (
    <section id="contacto" className="py-5">
      <Container>
        <h2 className="text-center mb-4">Contacto</h2>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            {enviado && (
              <Alert variant="success" role="status">
                ¡Gracias! Tu mensaje fue enviado.
              </Alert>
            )}

            <Form noValidate onSubmit={manejarEnvio}>
              <Form.Group className="mb-3" controlId="contacto-nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={datos.nombre}
                  onChange={manejarCambio}
                  isInvalid={!!errores.nombre}
                />
                <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="contacto-email">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={datos.email}
                  onChange={manejarCambio}
                  isInvalid={!!errores.email}
                />
                <Form.Control.Feedback type="invalid">{errores.email}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="contacto-mensaje">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="mensaje"
                  value={datos.mensaje}
                  onChange={manejarCambio}
                  isInvalid={!!errores.mensaje}
                />
                <Form.Control.Feedback type="invalid">{errores.mensaje}</Form.Control.Feedback>
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100">
                Enviar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ContactForm;