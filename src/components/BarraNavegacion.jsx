import { Navbar, Nav, Container } from 'react-bootstrap';

/**
 * Barra de navegación superior del portafolio.
 * @param {object} props
 * @param {string} props.marca - Texto que aparece a la izquierda.
 * @param {{texto: string, href: string}[]} props.enlaces - Lista de enlaces del menú.
 */
function BarraNavegacion({ marca, enlaces }) {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#introduccion">{marca}</Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" aria-label="Abrir menú" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto">
            {enlaces.map((enlace) => (
              <Nav.Link key={enlace.href} href={enlace.href}>
                {enlace.texto}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BarraNavegacion;