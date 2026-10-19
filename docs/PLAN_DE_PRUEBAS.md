# Plan de Pruebas – Portafolio Personal

**Asignatura:** DSY1104 – Desarrollo Fullstack II
**Proyecto:** Portafolio personal en React + Bootstrap
**Herramientas:** Jasmine, Karma, Testing Library, karma-coverage (Istanbul)
**Fecha:** 19-10-2026

---

## 1. Objetivo

Verificar que los componentes del portafolio se rendericen correctamente, respondan a los eventos del usuario, gestionen su estado de forma correcta y carguen los datos desde archivos JSON, incluyendo los casos de error.

## 2. Alcance

**Incluido:**

| Módulo | Archivo |
|---|---|
| Funciones de formato de fechas | `src/utils/formato.js` |
| Validación del formulario | `src/utils/validacion.js` |
| Carga de datos JSON | `src/services/dataService.js` |
| Componentes de presentación | `Intro`, `BarraNavegacion`, `ProjectCard`, `NewsItem`, `PiePagina` |
| Componentes con estado y eventos | `Proyectos`, `NewsSection`, `ContactForm` |
| Integración de la aplicación | `App` |

**Excluido de las pruebas automatizadas:**

- `src/main.jsx`: solo monta la aplicación en el HTML; no contiene lógica.
- Estilos CSS y apariencia visual: se verifican con pruebas manuales (sección 8).
- Envío real de correos: el formulario no tiene servidor; el envío se simula con un mock.

## 3. Estrategia

| Tipo de prueba | Qué verifica | Ejemplo |
|---|---|---|
| Unitaria de funciones | Lógica pura, sin interfaz | `formatearFecha('2026-10-15')` devuelve "15 de octubre de 2026" |
| Renderizado | Que el componente muestre los datos recibidos por props | `Intro` muestra el nombre en un `h1` |
| Interacción con el DOM | Atributos, clases y estructura del HTML generado | La imagen tiene `alt` y `loading="lazy"` |
| Eventos y estado | Que un clic o escritura cambie el estado y la vista | Filtrar proyectos por tecnología |
| Con mocks | Aislar el componente de dependencias externas | `fetch` simulado; `onEnviar` como espía |
| Integración | Que todos los componentes funcionen juntos | `App` completa con datos simulados |

## 4. Mocks utilizados

| Mock | Herramienta | Motivo |
|---|---|---|
| `window.fetch` | `spyOn(window, 'fetch')` | Evitar depender de los archivos JSON reales y poder simular respuestas exitosas, errores 404 y cargas que nunca terminan |
| `onEnviar` del formulario | `jasmine.createSpy('onEnviar')` | Comprobar si el formulario entrega los datos, cuántas veces y con qué valores, sin enviar correos reales |
| Imágenes | Imagen de 1×1 píxel en formato `data:` | Evitar errores 404 por imágenes inexistentes durante las pruebas |
| Datos de prueba | Objetos inventados (por ejemplo, "Ana Pérez") | Que las pruebas no cambien de resultado cuando se editan los JSON reales |

## 5. Entorno y ejecución

| Elemento | Valor |
|---|---|
| Ejecutor de pruebas | Karma 6.4 |
| Framework de pruebas | Jasmine |
| Navegadores | Microsoft Edge (Chromium, modo headless) y Mozilla Firefox (modo headless) |
| Cobertura | karma-coverage con babel-plugin-istanbul |

| Comando | Acción |
|---|---|
| `npm test` | Ejecuta todas las pruebas una vez en Chrome/Edge |
| `npm run test:navegadores` | Ejecuta las pruebas en Chrome/Edge y Firefox |
| `npm run test:watch` | Repite las pruebas al guardar cambios |

El informe de cobertura se genera en `coverage/html/index.html`.

## 6. Criterios de aceptación

- El 100 % de los casos de prueba debe pasar en todos los navegadores configurados.
- La cobertura de sentencias, ramas, funciones y líneas debe ser de al menos 80 %.

## 7. Casos de prueba automatizados

Estado: **A** = Aprobado.

### 7.1 `formatearFecha` – `test/utils/formato.spec.jsx`

| ID | Caso | Entrada | Resultado esperado | Estado |
|---|---|---|---|---|
| CP-01 | Convierte fecha a texto | `'2026-10-15'` | `'15 de octubre de 2026'` | A |
| CP-02 | No cambia de día por zona horaria | `'2026-01-01'` | `'1 de enero de 2026'` (no 31 de diciembre) | A |
| CP-03 | Fecha inválida | `'fecha-mala'` | Devuelve el mismo texto | A |

### 7.2 `ordenarPorFecha` – `test/utils/formato.spec.jsx`

| ID | Caso | Entrada | Resultado esperado | Estado |
|---|---|---|---|---|
| CP-04 | Ordena por fecha | Noticias de enero, marzo y febrero | Orden: marzo, febrero, enero | A |
| CP-05 | No modifica la original | Lista original | La lista original conserva su orden | A |

### 7.3 `validarContacto` – `test/utils/validacion.spec.jsx`

| ID | Caso | Entrada | Resultado esperado | Estado |
|---|---|---|---|---|
| CP-06 | Datos válidos | Nombre, correo y mensaje correctos | `{}` (sin errores) | A |
| CP-07 | Todo vacío | Tres campos vacíos | 3 errores | A |
| CP-08 | Nombre con solo espacios | `'   '` | "El nombre es obligatorio." | A |
| CP-09 | Correo inválido | `'ana@'` | "Ingresa un correo válido." | A |
| CP-10 | Mensaje corto | `'Hola'` | "El mensaje debe tener al menos 10 caracteres." | A |

### 7.4 `dataService` – `test/services/dataService.spec.jsx`

| ID | Caso | Simulación | Resultado esperado | Estado |
|---|---|---|---|---|
| CP-11 | Carga un JSON | `fetch` responde 200 con datos | Devuelve los datos y llama a `fetch` con la ruta | A |
| CP-12 | Archivo inexistente | `fetch` responde 404 | Lanza el error "No se pudo cargar ..." | A |
| CP-13 | Rutas de cada archivo | `fetch` responde 200 | Se piden `perfil.json`, `proyectos.json` y `noticias.json` | A |

### 7.5 `Intro` – `test/components/Intro.spec.jsx`

| ID | Caso | Resultado esperado | Estado |
|---|---|---|---|
| CP-14 | Nombre como título | El nombre aparece en un `h1` | A |
| CP-15 | Subtítulo y biografía | Ambos textos se muestran | A |
| CP-16 | Foto accesible | La imagen tiene `alt` "Foto de perfil de ..." | A |
| CP-17 | Enlaces sociales | GitHub y LinkedIn con `href` correcto y `target="_blank"` | A |

### 7.6 `BarraNavegacion` – `test/components/BarraNavegacion.spec.jsx`

| ID | Caso | Resultado esperado | Estado |
|---|---|---|---|
| CP-18 | Marca | Muestra el texto recibido por props | A |
| CP-19 | Enlaces | Un enlace por elemento, con su `href` | A |
| CP-20 | Botón de menú accesible | Botón con nombre "Abrir menú" | A |

### 7.7 `ProjectCard` – `test/components/ProjectCard.spec.jsx`

| ID | Caso | Resultado esperado | Estado |
|---|---|---|---|
| CP-21 | Título y descripción | Ambos se muestran | A |
| CP-22 | Badges de tecnologías | Un badge por tecnología | A |
| CP-23 | Imagen | Tiene `alt` y `loading="lazy"` | A |
| CP-24 | Enlace | "Ver proyecto" apunta al repositorio | A |

### 7.8 `NewsItem` – `test/components/NewsItem.spec.jsx`

| ID | Caso | Resultado esperado | Estado |
|---|---|---|---|
| CP-25 | Título | Se muestra como `h4` | A |
| CP-26 | Fecha | Formateada dentro de `<time datetime="...">` | A |
| CP-27 | Contenido | Se muestra el texto | A |

### 7.9 `PiePagina` – `test/components/PiePagina.spec.jsx`

| ID | Caso | Resultado esperado | Estado |
|---|---|---|---|
| CP-28 | Año y nombre | Muestra "© año actual + nombre" | A |
| CP-29 | Redes sociales | Enlaces con `href` correcto | A |

### 7.10 `Proyectos` – `test/components/Proyectos.spec.jsx`

| ID | Caso | Acción | Resultado esperado | Estado |
|---|---|---|---|---|
| CP-30 | Estado inicial | Ninguna | Se muestran las 3 tarjetas | A |
| CP-31 | Botones de filtro | Ninguna | Un botón por tecnología, sin repetir | A |
| CP-32 | Filtro inicial | Ninguna | "Todas" con `aria-pressed="true"` | A |
| CP-33 | Filtrar | Clic en "Bootstrap" | Solo 2 tarjetas; desaparece "API Java" | A |
| CP-34 | Botón activo | Clic en "Java" | "Java" activo y con clase `btn-primary`; "Todas" inactivo | A |
| CP-35 | Quitar filtro | Clic en "Java" y luego "Todas" | Vuelven las 3 tarjetas | A |

### 7.11 `NewsSection` – `test/components/NewsSection.spec.jsx`

| ID | Caso | Acción | Resultado esperado | Estado |
|---|---|---|---|---|
| CP-36 | Título de sección | Ninguna | Título en `h3` | A |
| CP-37 | Estado inicial | Ninguna | 2 noticias, la más reciente primero | A |
| CP-38 | Ver más | Clic en "Ver más (1)" | 3 noticias; botón cambia a "Ver menos" y `aria-expanded="true"` | A |
| CP-39 | Ver menos | Dos clics | Vuelven a ser 2 noticias | A |
| CP-40 | Límite por props | `limite={1}` | 1 noticia y botón "Ver más (2)" | A |
| CP-41 | Sin noticias extra | 2 noticias | No aparece el botón | A |
| CP-42 | Lista vacía | `noticias={[]}` | "No hay noticias por ahora." | A |

### 7.12 `ContactForm` – `test/components/ContactForm.spec.jsx`

| ID | Caso | Acción | Resultado esperado | Estado |
|---|---|---|---|---|
| CP-43 | Campos con etiqueta | Ninguna | Los 3 campos se encuentran por su etiqueta | A |
| CP-44 | Escribir | Escribir "Ana" | El campo contiene "Ana" | A |
| CP-45 | Enviar vacío | Clic en "Enviar" | Campos con clase `is-invalid` y 3 mensajes de error | A |
| CP-46 | Datos inválidos | Correo malo + Enviar | El espía `onEnviar` **no** se llama | A |
| CP-47 | Datos válidos | Llenar + Enviar | `onEnviar` se llama **una vez** con los datos exactos | A |
| CP-48 | Éxito y limpieza | Llenar + Enviar | Mensaje de éxito y campos vacíos | A |
| CP-49 | Ocultar éxito | Enviar y volver a escribir | Desaparece el mensaje de éxito | A |
| CP-50 | Sin `onEnviar` | Llenar + Enviar sin la prop | Funciona y muestra el mensaje de éxito | A |

### 7.13 `App` (integración) – `test/App.spec.jsx`

| ID | Caso | Simulación de `fetch` | Resultado esperado | Estado |
|---|---|---|---|---|
| CP-51 | Cargando | Nunca responde | Se muestra "Cargando..." | A |
| CP-52 | Carga correcta | Responde los 3 JSON | Se ven perfil, proyectos, ambas noticias y el formulario | A |
| CP-53 | Error de carga | `perfil.json` responde 404 | Alerta "No se pudo cargar data/perfil.json" | A |

## 8. Pruebas manuales

| ID | Caso | Pasos | Resultado esperado | Estado |
|---|---|---|---|---|
| PM-01 | Responsividad en celular | F12 → modo dispositivo → iPhone / Galaxy | Menú hamburguesa; tarjetas y noticias en una columna | A |
| PM-02 | Responsividad en tablet | Modo dispositivo → iPad | 2 tarjetas por fila | A |
| PM-03 | Navegación por teclado | Recorrer la página con Tab y Enter | Todos los enlaces, botones y campos son alcanzables y el foco es visible | A |
| PM-04 | Navegación del menú | Clic en cada enlace del menú | Desplazamiento suave hasta cada sección, sin quedar tapada por la barra | A |
| PM-05 | Sitio publicado | Abrir la URL de GitHub Pages | Carga imágenes y datos JSON correctamente | Pendiente |

## 9. Resultados

| Indicador | Resultado |
|---|---|
| Casos automatizados | 53 |
| Aprobados | 53 (100 %) |
| Navegadores | Edge y Firefox |
| Cobertura | Ver `INFORME_COBERTURA.md` |
