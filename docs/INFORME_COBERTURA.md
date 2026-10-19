# Informe de Cobertura de Código – Portafolio Personal

**Asignatura:** DSY1104 – Desarrollo Fullstack II
**Fecha:** 19-10-2026
**Herramientas:** Karma + Jasmine, karma-coverage, babel-plugin-istanbul

---

## 1. ¿Qué es la cobertura de código?

La cobertura mide qué porcentaje del código fuente se ejecutó durante las pruebas. Istanbul marca cada línea del código y, al terminar las pruebas, cuenta cuáles se ejecutaron. Se mide en cuatro dimensiones:

| Métrica | Qué mide |
|---|---|
| **Statements** (sentencias) | Instrucciones ejecutadas |
| **Branches** (ramas) | Caminos de cada decisión (`if`/`else`, `? :`, `&&`) que se recorrieron |
| **Functions** (funciones) | Funciones que fueron llamadas al menos una vez |
| **Lines** (líneas) | Líneas de código ejecutadas |

## 2. Cómo se generó

```
npm test
```

El comando ejecuta las pruebas con Karma y genera:

- Un **resumen** en la terminal.
- Un **informe HTML** en `coverage/html/index.html`, que muestra cada archivo con las líneas cubiertas en verde y las no cubiertas en rojo.

Para que el porcentaje sea **representativo**, el archivo `test/cobertura.spec.jsx` importa todos los archivos de `src/`. Sin él, Istanbul solo contaría los archivos que alguna prueba importa, y el resultado sería artificialmente alto. Esto se comprobó durante el desarrollo: con solo 2 archivos probados, el informe mostraba 77,77 %, pero al incluir todos los archivos el valor real era 14,28 %.

## 3. Resultados

| Métrica | Cubiertos / Total | Porcentaje |
|---|---|---|
| Statements | 87 / 87 | **100 %** |
| Branches | 36 / 36 | **100 %** |
| Functions | 33 / 33 | **100 %** |
| Lines | 82 / 82 | **100 %** |

**Criterio de aceptación:** al menos 80 % en cada métrica → **Cumplido.**

![Resumen de cobertura](img/cobertura.png)

## 4. Evolución de la cobertura

| Etapa | Pruebas | Statements | Branches | Functions | Lines |
|---|---|---|---|---|---|
| Configuración inicial (solo archivos probados) | 3 | 77,77 % | 100 % | 50 % | 87,5 % |
| Medición real de todo `src/` | 3 | 14,28 % | 9,09 % | 5,88 % | 15,05 % |
| Funciones y componentes de presentación | 26 | 36,78 % | 33,33 % | 33,33 % | 37,80 % |
| Estado, eventos, mocks e integración | 52 | 100 % | 100 % | 96,96 % | 100 % |
| Prueba de `ContactForm` sin `onEnviar` | 53 | 100 % | 100 % | 100 % | 100 % |

La mayor subida se produjo al probar los componentes con estado (`Proyectos`, `NewsSection`, `ContactForm`) y la carga de datos (`dataService`, `App`), porque concentran la mayoría de las decisiones (`if`, filtros, validaciones) del proyecto.

## 5. Análisis

### 5.1 Fortalezas

- **Todas las ramas están cubiertas:** se probaron tanto los casos correctos como los de error (correo inválido, lista vacía, archivo JSON no encontrado, carga pendiente).
- **Uso de mocks:** `fetch` se simuló para probar respuestas exitosas, errores 404 y cargas sin respuesta, casos difíciles de provocar con archivos reales.
- **Pruebas en dos navegadores** (Edge y Firefox), lo que confirma que el comportamiento no depende de un navegador específico.

### 5.2 Errores encontrados gracias a las pruebas

| Problema | Cómo se detectó | Corrección |
|---|---|---|
| El botón del menú en celulares se anunciaba como "Toggle navigation" (inglés) en vez de "Abrir menú" | La prueba CP-20 no encontró el botón por su nombre accesible | Se usó la prop `label` de React-Bootstrap en lugar de `aria-label` |
| El archivo `Validacion.js` tenía mayúscula, pero se importaba como `validacion` | Advertencia de Webpack al incluir todos los archivos en la cobertura | Se renombró a `validacion.js` para evitar fallos en sistemas Linux |
| La prueba de filtros contaba también los botones "Ver proyecto" | La prueba CP-31 esperaba 5 botones y encontró 8 | Se agrupó el filtro con `role="group"` y se limitó la búsqueda con `within` (además mejora la accesibilidad) |

### 5.3 Limitaciones

Una cobertura del 100 % indica que **todo el código se ejecutó** durante las pruebas, pero **no garantiza que no existan errores**. En particular:

- **No se mide el CSS ni la apariencia visual.** La responsividad y el diseño se verificaron con las pruebas manuales PM-01 a PM-04 del plan de pruebas.
- **`main.jsx` está excluido**, porque solo monta la aplicación en el HTML y no contiene lógica.
- **La red es simulada.** Las pruebas no comprueban que los JSON se publiquen correctamente en GitHub Pages; eso se verifica con la prueba manual PM-05.
- **Los datos de prueba son controlados.** Casos extremos, como textos muy largos o caracteres especiales, no se probaron.

## 6. Conclusión

Se alcanzó un **100 % de cobertura** en las cuatro métricas con **53 pruebas aprobadas** en dos navegadores, superando el criterio de aceptación del 80 %. Las pruebas no solo midieron el código, sino que permitieron **detectar y corregir dos problemas reales** del portafolio (accesibilidad del menú y nombre de archivo). Las áreas que la cobertura no puede medir, como el diseño visual y la publicación, se complementaron con pruebas manuales.
