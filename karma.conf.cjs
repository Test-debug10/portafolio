const fs = require('fs');
const path = require('path');

// Si Chrome no está instalado, usa Microsoft Edge (mismo motor que Chrome).
const RUTAS_NAVEGADOR = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];

if (!process.env.CHROME_BIN) {
  const encontrado = RUTAS_NAVEGADOR.find((ruta) => fs.existsSync(ruta));
  if (encontrado) {
    process.env.CHROME_BIN = encontrado;
  }
}

// Configuración de Karma: ejecuta las pruebas de Jasmine en navegadores reales.
module.exports = function (config) {
  config.set({
    // Jasmine para escribir pruebas y Webpack para traducir el código React
    frameworks: ['jasmine', 'webpack'],

    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-coverage',
      'karma-spec-reporter',
    ],

    // Archivos de prueba: todos los que terminen en .spec.jsx dentro de /test
    files: [{ pattern: 'test/**/*.spec.jsx', watched: false }],

    // Antes de ejecutarlos, se pasan por Webpack
    preprocessors: {
      'test/**/*.spec.jsx': ['webpack'],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: { extensions: ['.js', '.jsx'] },
      module: {
        rules: [
          {
            // Traduce JS/JSX con Babel e instrumenta el código para medir cobertura
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
                plugins: [['istanbul', { include: ['src/**'] }]],
              },
            },
          },
          {
            // Permite que los componentes importen archivos .css
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
    },

    // "spec" muestra cada prueba por nombre; "coverage" genera el informe
    reporters: ['spec', 'coverage'],

    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' },
      ],
    },

    // Navegador por defecto (sin ventana visible)
    browsers: ['ChromeHeadless'],
  });
};