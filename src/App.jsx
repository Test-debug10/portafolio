import { useState, useEffect } from 'react';
import { Spinner, Alert, Container } from 'react-bootstrap';
import BarraNavegacion from './components/BarraNavegacion';
import Intro from './components/Intro';
import Proyectos from './components/Proyectos';
import Noticias from './components/Noticias';
import { obtenerPerfil, obtenerProyectos, obtenerNoticias } from './services/dataService';
import ContactForm from './components/ContactForm';
import PiePagina from './components/PiePagina';


const ENLACES = [
  { texto: 'Introducción', href: '#introduccion' },
  { texto: 'Proyectos', href: '#proyectos' },
  { texto: 'Noticias', href: '#noticias' },
  { texto: 'Contacto', href: '#contacto' },
];

function App() {
  const [perfil, setPerfil] = useState(null);
  const [proyectos, setProyectos] = useState([]);
  const [noticias, setNoticias] = useState({ tecnologia: [], personales: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([obtenerPerfil(), obtenerProyectos(), obtenerNoticias()])
      .then(([datosPerfil, datosProyectos, datosNoticias]) => {
        setPerfil(datosPerfil);
        setProyectos(datosProyectos);
        setNoticias(datosNoticias);
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
        <Noticias noticias={noticias} />
        <ContactForm />
      </main>
      <PiePagina nombre={perfil.nombre} github={perfil.github} linkedin={perfil.linkedin} />
    </>
  );
}

export default App;