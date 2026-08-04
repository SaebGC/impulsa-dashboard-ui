# ⚡ IMPULSA — Plataforma Educativa Gamificada

> **IMPULSA** es una plataforma educativa gamificada diseñada para instituciones escolares. Fomenta el aprendizaje, la colaboración y la sana competencia por salones mediante la resolución de misiones, acumulación de **Puntos de Temporada** (periodo académico) y **Puntos de Liga** (acumulados del año lectivo).

---

## 🌟 Características Principales

### 🔐 1. Pantalla de Inicio de Sesión (Login) Animada
- **Diseño Aesthetic & Gamificado**: Fondo con gradiente profundo, auras lumínicas ambientales y efectos de resplandor (*glow*).
- **Animaciones de Partículas y Estrellas ✨**: Destellos, estrellas parpadeantes y bordes animados alrededor de la tarjeta de inicio de sesión.
- **Vista Previa de Roles (Demo)**: Permite probar el ingreso como **Estudiante**, **Director de Grupo**, **Docente** o **Administrador**.

### 👥 2. Paneles Específicos por Rol (Dashboards)
Cada usuario cuenta con un panel personalizado según sus permisos:
- 🎓 **Panel Estudiantil (`/dashboard/estudiante`)**: Seguimiento de clase actual, puntos personales, misiones activas y estado de entregas.
- 📋 **Panel Director de Grupo (`/dashboard/director`)**: Gestión de misiones de clase, creación de retos y revisión de evidencias presentadas por estudiantes.
- 👨‍🏫 **Panel Docente (`/dashboard/docente`)**: Publicación de asignaciones académicas y validación/aprobación de evidencias enviadas.
- ⚙️ **Consola de Administración (`/dashboard/admin`)**: Métricas globales de usuarios, gestión de grupos activos, control de temporadas y estado de servicios.

### 📊 3. Sección General de Estadísticas y Liga (`/dashboard/general`)
Sección compartida accesible desde el encabezado superior que ofrece una vista panorámica de la competencia:
- **Tarjetas KPI**:
  - **Puntos de Temporada**: Barra de progreso con desglose entre misiones de aula e institucionales.
  - **Puntos de Liga**: Total acumulado del año lectivo con indicador de tendencia semanal.
  - **Posición en Ranking**: Badge con el puesto del salón (`#2 de 18 salones`) y diferencia de puntos con el 1.er puesto.
- **Filtro y Buscador de Misiones**:
  - Filtrado por categorías: *Ambiental*, *Deportiva*, *Académica*, *Cultural* y *Convivencia*.
  - Búsqueda en tiempo real por título o palabras clave.
  - Tarjetas clasificadas por rareza: *Común*, *Especial*, *Épica*, *Legendaria* y *⚡ Relámpago*.
- **Proyecto X**: Banner del evento especial de temporada para la postulación de iniciativas de alto impacto con bonificación histórica de puntos.
- **Modal de Subida de Evidencias**: Formulario interactivo para adjuntar archivos (fotografías, documentos, videos) con notificaciones Toast.
- **Control Dinámico de Permisos**:
  - Estudiantes: Lectura de tablas y envío de evidencias.
  - Docentes / Directores / Admins: Habilitación de acciones de **"Validar Evidencia"**, **"Crear Misión"** y control de temporada.

### 🔄 4. Navegación Inteligente (Header)
- Pestañas dinámicas para conmutar fácilmente entre **Mi Panel** (vista del rol activo) y **Estadísticas y Liga**.
- Botón para **Cerrar Sesión** con redirección segura a la pantalla de login.

---

## 🛠️ Tecnologías Utilizadas

- **Core**: React 19, TypeScript 5, Vite
- **Enrutamiento**: TanStack Router / TanStack Start (Enrutamiento basado en archivos)
- **Estilos & UI**: Tailwind CSS v4, Lucide Icons, Shadcn UI primitives, Sonner (Toasts)
- **Herramientas de Desarrollo**: ESLint, Prettier, TypeScript Compiler

---

## 📁 Estructura del Proyecto

```plaintext
impulsa-dashboard-ui/
├── public/                      # Recursos estáticos y prototipo HTML
├── src/
│   ├── components/
│   │   └── ui/                  # Componentes reutilizables (Header, Buttons, Inputs, Cards, etc.)
│   ├── hooks/                   # Hooks personalizados de React
│   ├── lib/                     # Utilidades y configuración de errores
│   ├── pages/
│   │   └── dashboards/          # Vistas principales de Dashboards
│   │       ├── AdminDashboard.tsx
│   │       ├── DirectorDashboard.tsx
│   │       ├── DocenteDashboard.tsx
│   │       ├── EstudianteDashboard.tsx
│   │       └── GeneralDashboard.tsx
│   ├── routes/                  # Rutas basadas en archivos de TanStack Router
│   │   ├── __root.tsx           # Layout raíz y proveedores de contexto
│   │   ├── index.tsx            # Redirección automática a /login
│   │   ├── login.tsx            # Pantalla de Login animada
│   │   └── dashboard/           # Rutas para cada panel
│   │       ├── admin.tsx
│   │       ├── director.tsx
│   │       ├── docente.tsx
│   │       ├── estudiante.tsx
│   │       └── general.tsx
│   ├── routeTree.gen.ts         # Árbol de rutas generado automáticamente
│   ├── styles.css               # Estilos globales de Tailwind CSS
│   └── types/                   # Definiciones de tipos de TypeScript
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Instalación y Ejecución Local

### Prerrequisitos
Tener instalado **Node.js** (versión 18 o superior) y **npm** o **bun**.

### Pasos

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/SaebGC/impulsa-dashboard-ui.git
   cd impulsa-dashboard-ui
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. Abrir en el navegador:
   ```text
   http://localhost:3000/
   ```

---

## 📦 Construcción para Producción

Para generar el bundle optimizado para producción:

```bash
npm run build
```

Para previsualizar la compilación localmente:

```bash
npm run preview
```

---

## 📝 Licencia y Créditos

Proyecto desarrollado para la plataforma educativa **IMPULSA**.  
Repositorio oficial: [SaebGC/impulsa-dashboard-ui](https://github.com/SaebGC/impulsa-dashboard-ui)
