import { useState, useEffect } from 'react';
import { Spinner, Alert, Container } from 'react-bootstrap';
import BarraNavegacion from './components/BarraNavegacion';
import Intro from './components/Intro';
import Proyectos from './components/Proyectos';
import { obtenerPerfil, obtenerProyectos } from './services/dataService';

const ENLACES = [
  { texto: 'Introducción', href: '#introduccion' },
  { texto: 'Proyectos', href: '#proyectos' },
  { texto: 'Noticias', href: '#noticias' },
  { texto: 'Contacto', href: '#contacto' },
];

function App() {
  const [perfil, setPerfil] = useState(null);
  const [proyectos, setProyectos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Promise.all espera a que ambos JSON terminen de cargar
    Promise.all([obtenerPerfil(), obtenerProyectos()])
      .then(([datosPerfil, datosProyectos]) => {
        setPerfil(datosPerfil);
        setProyectos(datosProyectos);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!perfil) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <BarraNavegacion marca="Mi Portafolio" enlaces={ENLACES} />
      <main>
        <Intro {...perfil} />
        <Proyectos proyectos={proyectos} />
      </main>
    </>
  );
}

export default App;