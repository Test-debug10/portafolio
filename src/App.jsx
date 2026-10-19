import { useState, useEffect } from 'react';
import { Spinner, Alert, Container } from 'react-bootstrap';
import Intro from './components/Intro';
import { obtenerPerfil } from './services/dataService';

function App() {
  // Estado: al inicio el perfil está vacío (null)
  const [perfil, setPerfil] = useState(null);
  const [error, setError] = useState(null);

  // useEffect se ejecuta una vez, cuando la página se carga
  useEffect(() => {
    obtenerPerfil()
      .then((datos) => setPerfil(datos))   // guarda el JSON en el estado
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
    <main>
      <Intro {...perfil} />
    </main>
  );
}

export default App;