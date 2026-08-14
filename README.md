# ⚡ IMPULSA — Plataforma Educativa Gamificada

> **IMPULSA** es una plataforma educativa gamificada diseñada para instituciones escolares. Fomenta el aprendizaje, la colaboración y la sana competencia entre salones mediante la resolución de misiones, acumulación de **Puntos de Temporada** (periodo académico) y **Puntos de Liga** (acumulados del año lectivo).

---

## 🌟 Novedades y Funcionalidades Destacadas

### 🔄 1. Sincronización en Tiempo Real entre Dashboards
- **Sincronización LocalStorage & Custom Events**: Las entregas de evidencias realizadas por los estudiantes se reflejan automáticamente en tiempo real en el panel del Director de Grupo sin necesidad de recargar la página (`student_evidence_submitted`, `mission_created`, `global_system_updated`).
- **Persistencia de Datos**: Los datos de misiones y evidencias se mantienen guardados y sincronizados en el almacenamiento local del navegador.

### 📋 2. Panel del Director de Grupo (`/dashboard/director`)
- **Gestión por Pestañas**:
  - 📊 **Métricas**: Indicadores KPI clave del salón (estudiantes activos, tasa de cumplimiento, puntos totales otorgados).
  - 🎯 **Misiones de Aula**: Listado de misiones activas e inactivas con opción de creación rápida.
  - 📥 **Revisiones Pendientes**: Cola interactiva de evidencias enviadas por los alumnos. Permite **aprobar** o **rechazar** entregas, asignar puntos y enviar retroalimentación (*feedback*).
  - 👥 **Listado de Estudiantes**: Estado individual de cada alumno (`Maria Riveros`, `Valeria Gómez`, `Yaritza Tirado`, `Sofia Torres`), puntos acumulados y entregas pendientes.
- **Previsualización de Evidencias**: Modal especial para inspeccionar imágenes, enlaces a documentos o textos descriptivos entregados por los estudiantes antes de su aprobación.

### 🎓 3. Panel Estudiantil (`/dashboard/estudiante`)
- **Envío de Evidencias**: Modal interactivo para subir archivos/fotografías (con vista previa instantánea), redactar textos de reflexión o compartir enlaces a trabajos.
- **Seguimiento de Progreso**: Visualización de misiones activas, nivel actual, puntos acumulados y estado de aprobación de sus entregas.

### 🔐 4. Pantalla de Inicio de Sesión (Login) Animada
- **Diseño Aesthetic & Gamificado**: Fondo con gradiente profundo, auras lumínicas ambientales y efectos de resplandor (*glow*).
- **Animaciones de Partículas y Estrellas ✨**: Destellos, estrellas parpadeantes y bordes animados.
- **Demostración por Roles**: Permite probar el ingreso con un clic como **Estudiante**, **Director de Grupo**, **Docente** o **Administrador**.

### ⚙️ 5. Consola de Administración (`/dashboard/admin`) y Vista General (`/dashboard/general`)
- **Vista Panorámica**: Ranking global de salones, métricas institucionales y banner especial **Proyecto X**.
- **Filtros Avanzados**: Búsqueda en tiempo real de misiones clasificadas por rareza (*Común*, *Especial*, *Épica*, *Legendaria*, *⚡ Relámpago*) y categorías (*Académica*, *Ambiental*, *Cultural*, *Deportiva*, *Convivencia*).

---

## 🛠️ Tecnologías Utilizadas

- **Core**: React 19, TypeScript 5, Vite
- **Enrutamiento**: TanStack Router (Enrutamiento basado en archivos)
- **Estilos & UI**: Tailwind CSS v4, Lucide Icons, Shadcn UI primitives, Sonner (Notificaciones Toast)
- **Herramientas de Desarrollo**: ESLint, Prettier, TypeScript Compiler (`tsc`)

---

## 📁 Estructura del Proyecto

```plaintext
impulsa-dashboard-ui/
├── public/                      # Recursos estáticos
├── src/
│   ├── components/
│   │   ├── director/            # Componentes específicos del Director (Header, Modales, etc.)
│   │   ├── tabs/                # Pestañas del panel (MetricsTab, MissionsTab, PendingReviewsTab, StudentsTab)
│   │   └── ui/                  # Primitivas UI reutilizables (Botones, Tarjetas, Modales, Inputs)
│   ├── data/
│   │   └── directorMockData.ts  # Datos de prueba iniciales (Estudiantes, Misiones, Evidencias)
│   ├── hooks/                   # Hooks personalizados de React
│   ├── pages/
│   │   └── dashboards/          # Vistas principales de cada rol
│   │       ├── AdminDashboard.tsx
│   │       ├── DirectorDashboard.tsx
│   │       ├── DocenteDashboard.tsx
│   │       ├── EstudianteDashboard.tsx
│   │       └── GeneralDashboard.tsx
│   ├── routes/                  # Rutas basadas en archivos (TanStack Router)
│   │   ├── __root.tsx           # Layout principal y proveedores
│   │   ├── index.tsx            # Redirección inicial
│   │   ├── login.tsx            # Vista de Login
│   │   └── dashboard/           # Subrutas de dashboards por rol
│   ├── styles.css               # Estilos globales y utilidades Tailwind
│   └── types/                   # Definiciones de interfaces TypeScript (Director, Auth, Evidencias)
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Guía de Descarga e Instalación Paso a Paso

### 📋 Prerrequisitos
Antes de comenzar, asegúrate de tener instalado en tu computadora:
- **Node.js**: Versión 18.0.0 o superior ([Descargar Node.js](https://nodejs.org/))
- **Git**: (Opcional, para clonar el repositorio) ([Descargar Git](https://git-scm.com/))
- Un gestor de paquetes como **npm** (viene junto con Node.js) o **pnpm** / **yarn** / **bun**.

---

### Paso 1: Obtener el Código Fuente

#### Opción A: Mediante Git (Recomendado)
Abre tu terminal (PowerShell, Command Prompt o Git Bash) y ejecuta:
```bash
git clone https://github.com/SaebGC/impulsa-dashboard-ui.git
cd impulsa-dashboard-ui
```

#### Opción B: Descarga Directa en ZIP
1. Ve al repositorio en GitHub: [SaebGC/impulsa-dashboard-ui](https://github.com/SaebGC/impulsa-dashboard-ui)
2. Haz clic en el botón verde **`<Code>`** y selecciona **Download ZIP**.
3. Extrae el archivo `.zip` en la carpeta de tu preferencia.
4. Abre la terminal en esa carpeta.

---

### Paso 2: Instalar Dependencias

En la carpeta raíz del proyecto, ejecuta el siguiente comando para instalar todos los paquetes necesarios:

```bash
npm install
```

---

### Paso 3: Iniciar el Servidor de Desarrollo

Una vez completada la instalación de dependencias, inicia el entorno local de desarrollo:

```bash
npm run dev
```

La terminal mostrará la dirección local donde está corriendo la aplicación (usualmente `http://localhost:3000` o `http://localhost:5173`).

Abre esa URL en tu navegador web.

---

### Paso 4: Probar la Aplicación en Modo Demo

Al ingresar a la pantalla principal (`/login`):
1. Verás el formulario con botones demo para acceder instantáneamente a cualquier rol:
   - 🎓 **Probar como Estudiante**
   - 📋 **Probar como Director**
   - 👨‍🏫 **Probar como Docente**
   - ⚙️ **Probar como Administrador**
2. Haz clic en cualquiera de ellos para navegar al dashboard correspondiente sin necesidad de ingresar credenciales.

---

## 📦 Compilación para Producción

Para generar los archivos optimizados listos para desplegar en un servidor web:

```bash
npm run build
```

Para probar la versión compilada localmente antes de subir a producción:

```bash
npm run preview
```

---

## 📝 Licencia y Créditos

Desarrollado para la plataforma educativa **IMPULSA**.  
Repositorio oficial: [SaebGC/impulsa-dashboard-ui](https://github.com/SaebGC/impulsa-dashboard-ui)
