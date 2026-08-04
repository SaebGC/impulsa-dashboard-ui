# Impulsa Dashboard UI

Actúa como un Desarrollador Web Frontend Senior y Diseñador UI/UX experto.

Necesito que crees el prototipo visual funcional (interfaz de usuario) en HTML5 y CSS3 puro (sin librerías ni frameworks externos) para el Dashboard principal de la plataforma educativa gamificada "IMPULSA".

La competencia se realiza a nivel de Salón y maneja dos métricas clave: Puntos de Temporada (periodo académico) y Puntos de Liga (acumulados del año).

📁 1. Estructura de Archivos y Carpetas

Organiza la entrega indicando explícitamente la estructura de carpetas en la que debo guardar los archivos:

Plaintext

impulsa-dashboard/
├── index.html
└── css/
    └── styles.css


🎨 2. Componentes y Secciones Visuales Requeridas

Diseña una interfaz moderna, atractiva para un entorno escolar, intuitiva y responsive, que contenga los siguientes elementos principales:

Barra de Navegación / Header:

Logo de IMPULSA.

Nombre e información del Salón activo (Ejemplo: Grado 10°A - Director: Prof. García).

Selector/Indicador de Temporada Actual (Ejemplo: Temporada 1 / Periodo 1).

Panel de Tarjetas Métricas (KPIs):

Puntos de Temporada: Muestra los puntos del periodo actual (máximo 20,000 pts: 12,000 de misiones y 8,000 institucionales) con una barra de progreso.

Puntos de Liga: Muestra el total acumulado en el año lectivo.

Posición en Ranking: Un badge o indicador destacando el puesto actual del salón.

Sección Central - Tablero de Misiones Activas:

Tarjetas (Cards) para misiones con etiquetas de rareza diferenciadas por color:

Común / Especial: Borde/Badges sencillos.

Épica / Legendaria: Badges destacados e indicador si otorga Puntos de Liga.

Relámpago: Etiqueta especial de corta duración.

Cada tarjeta debe incluir: Título, Categoría (ej: Ambiental, Deportiva), tiempo restante, recompensa de puntos y botón de acción (Ver / Subir Evidencias).

Sección Lateral - Tabla de Ranking Doble (Tabs o Dos Columnas):

Ranking de Temporada: Ordenado por Puntos de Temporada.

Ranking de Liga: Ordenado por Puntos de Liga acumulados.

La tabla debe mostrar: Posición, Salón, Puntos y Variación/Diferencia con el 1º puesto.

Módulo Destacado - "Proyecto X":

Una tarjeta visual interactiva para la propuesta del evento especial de la Temporada.

🛠️ 3. Especificaciones Técnicas y Estilo

Paleta de Colores: Utiliza tonos vibrantes e institucionales (Azul Índigo, Púrpura/Gamificación, Dorado para Legendarias y Verde/Gris para estados de validación).

Layout Flexbox / CSS Grid: Estructura limpia de dos o tres columnas para escritorio.

Código Completo: Proporciona los archivos index.html y css/styles.css 100% completos y funcionales sin omitir código

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b0b0b987-b2ee-44bc-823d-674cd8f294e8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
