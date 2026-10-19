// Importa todos los archivos de src (excepto main.jsx) para que el informe
// de cobertura los incluya aunque todavía no tengan pruebas.
// Así el porcentaje refleja el proyecto completo y no solo lo que se probó.
const archivos = require.context('../src', true, /^(?!.*main\.jsx$).*\.jsx?$/);
archivos.keys().forEach(archivos);