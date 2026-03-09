# 🗓️ Roadmap de Desarrollo Frontend — Guardería (Next.js)

**Duración total:** 21 de octubre → 10 de noviembre de 2025
**Objetivo final:** Tener listo todo el **frontend funcional** (Next.js + Tailwind + TypeScript) del sitio web para la guardería, con las páginas: Inicio, Acerca de, Programas, Galería y Contacto.

---

## 📅 Semana 1 — Preparación y Fundamentos

**(21 → 27 de octubre)**

### 🧩 Lunes 21 — Organización inicial del proyecto

**Objetivo principal:** Preparar el entorno de trabajo y las herramientas.

* Instalar Node.js y verificar versiones (`node -v`, `npm -v`).
* Instalar VS Code y extensiones: Prettier, ESLint, Tailwind CSS IntelliSense.
* Crear cuenta en GitHub y configurar Git local (`git config --global user.name`, etc.).
* Aprender qué es Git y cómo usar commits, push y pull.
* Crear el repositorio: `guarderia-frontend`.
* Crear estructura inicial: `README.md`, `.gitignore`, y subir el primer commit.

**Aprender hoy:** conceptos básicos de Git, GitHub, CLI, instalación de Node y npm.

---

### 🧩 Martes 22 — Creación del proyecto Next.js

**Objetivo principal:** Inicializar Next.js y entender su estructura.

* Ejecutar: `npx create-next-app@latest .` dentro del repo.
* Eliminar boilerplate innecesario (ejemplo, archivos demo).
* Entender las carpetas: `/app`, `/public`, `/components`.
* Ejecutar `npm run dev` y verificar que el servidor funciona.

**Aprender hoy:** qué es Next.js, cómo se organiza un proyecto moderno y cómo funciona el App Router.

---

### 🧩 Miércoles 23 — Configuración de Tailwind CSS y tipografía

**Objetivo principal:** Establecer la base visual del proyecto.

* Instalar Tailwind CSS (`npm install -D tailwindcss postcss autoprefixer`).
* Configurar `tailwind.config.js` y `globals.css`.
* Probar clases de Tailwind en `page.tsx`.
* Añadir fuentes del diseño (Google Fonts o locales).
* Crear variables de color según la paleta del logo.

**Aprender hoy:** cómo funciona Tailwind y cómo usar utilidades para crear interfaces limpias y responsive.

---

### 🧩 Jueves 24 — Componentes base y layout global

**Objetivo principal:** Crear el diseño estructural del sitio.

* Crear el layout global: `<Header />`, `<Footer />`, `<Main />`.
* Implementar una **navbar responsive** con menú hamburguesa.
* Crear componente `Button` reutilizable.

**Aprender hoy:** cómo crear y reutilizar componentes en React/Next.

---

### 🧩 Viernes 25 — Revisión de diseño recibido

**Objetivo principal:** Analizar el diseño y definir el plan visual.

* Recibir el diseño (Figma o imagen del cliente).
* Identificar secciones, tipografías, colores y componentes.
* Crear un documento `design-system.md` con la guía visual.
* Planificar qué componentes serán reutilizables.

**Aprender hoy:** cómo leer un diseño y traducirlo en estructura de componentes.

---

### 🧩 Sábado 26 — Setup final del entorno de trabajo

**Objetivo principal:** Dejar todo preparado para empezar a construir.

* Crear carpetas `/components`, `/sections`, `/data`, `/styles`.
* Configurar ESLint, Prettier y Husky para commits limpios.
* Configurar alias en `tsconfig.json` (por ej. `@/components`).

**Aprender hoy:** buenas prácticas de configuración y estructura de proyectos grandes.

---

### 🧩 Domingo 27 — Descanso / Revisión

* Revisar estructura del proyecto y limpiar lo innecesario.
* Confirmar que todo corre correctamente.
* Preparar plan para maquetado de la Landing Page.

---

## 📅 Semana 2 — Maquetado de la Landing Page

**(28 de octubre → 3 de noviembre)**

### 🧩 Lunes 28 — Hero Section

**Objetivo principal:** Implementar la cabecera visual principal del sitio.

* Maquetar Hero (imagen + texto + CTA).
* Probar en móvil, tablet y escritorio.
* Agregar animaciones simples con Framer Motion.

**Aprender hoy:** responsive design con Tailwind y animaciones básicas.

---

### 🧩 Martes 29 — Sección “Acerca de nosotros”

**Objetivo principal:** Mostrar historia, misión y valores.

* Crear componente `AboutSection`.
* Dividir en columnas, incluir foto del equipo.
* Usar CSS grid o flex.

**Aprender hoy:** cómo organizar contenido con layout flexible.

---

### 🧩 Miércoles 30 — Sección “Programas para niños”

**Objetivo principal:** Listado de programas o servicios.

* Crear `ProgramCard` reusable (imagen, descripción, edad, horario).
* Añadir hover effects y responsive grid.
* Datos temporales en `/data/programs.ts`.

**Aprender hoy:** props en componentes y render dinámico de listas.

---

### 🧩 Jueves 31 — Sección “Testimonios y galería”

**Objetivo principal:** Crear confianza visual.

* Slider de testimonios (Swiper o manual con useState).
* Galería con lightbox (React Image Gallery o custom modal).

**Aprender hoy:** manejo de estados y modales en React.

---

### 🧩 Viernes 1 — Sección “Contacto”

**Objetivo principal:** Formulario funcional y mapa.

* Crear formulario con React Hook Form.
* Validaciones básicas.
* Añadir mapa con Google Maps iframe.

**Aprender hoy:** formularios controlados y validación.

---

### 🧩 Sábado 2 — Footer y SEO básico

**Objetivo principal:** Completar estructura general.

* Implementar Footer con datos de contacto y redes.
* Añadir metadata con `metadata` en Next.js.

**Aprender hoy:** cómo mejorar SEO y estructura HTML semántica.

---

### 🧩 Domingo 3 — Revisión completa

* Testear responsive y accesibilidad.
* Revisar tamaños, espaciados y tipografía.

---

## 📅 Semana 3 — Refinamiento y Deploy

**(4 → 10 de noviembre)**

### 🧩 Lunes 4 — Optimización de rendimiento

* Optimizar imágenes (`next/image`).
* Revisar Lighthouse (Core Web Vitals).

### 🧩 Martes 5 — Accesibilidad y UX

* Revisar tabulación, contraste y roles ARIA.

### 🧩 Miércoles 6 — Conexión del formulario (dummy API route)

* Crear `app/api/contact/route.ts` para simular envío.

### 🧩 Jueves 7 — Testing y QA

* Instalar Jest + React Testing Library.
* Testear componentes críticos (navbar, formulario).

### 🧩 Viernes 8 — Preparar deploy

* Conectar repo a Vercel.
* Revisar `vercel.json` y variables de entorno.

### 🧩 Sábado 9 — Documentación

* Escribir `docs/HANDOVER.md` con instrucciones para el cliente.

### 🧩 Domingo 10 — Revisión final

* Probar todo el sitio, revisar en móviles y desktop.
* Confirmar que el deploy está 100% funcional.

---

✅ **Resultado final (10 de noviembre):**

* Sitio completo en producción (Vercel) ✅
* Código limpio, modular y documentado ✅
* Diseño fiel al entregado ✅
