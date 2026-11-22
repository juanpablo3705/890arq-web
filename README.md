### 890 ARQ — Sitio Web Corporativo (v2.0)

Repositorio de la segunda versión (v2.0) del portal corporativo y portafolio de proyectos de 890 ARQ; oficina de arquitectura, construcción y gestión normativa municipal en la Región de Valparaíso, Chile.

Este proyecto corresponde a una propuesta de reconstrucción integral desde cero de la plataforma web original actualmente en producción (<a href="http://www.890arq.cl" target="_blank" rel="noopener noreferrer">www<span>.</span>890arq<span>.</span>cl <img src="public/images/external-link.svg" width="12" height="12" alt="" /></a>). Dicha primera versión opera sobre un CMS monolítico tradicional apoyado en WordPress y PHP, dependiendo en gran medida del constructor visual Elementor y de una colección de plugins de terceros para resolver componentes de interfaz, menús y formularios.

Para superar las limitaciones de rendimiento, seguridad y mantenibilidad de dicho stack heredado, esta nueva iteración v2.0 abandona esa infraestructura en favor de una arquitectura moderna orientada al rendimiento, tipado estático estricto y una interfaz concebida como un **lienzo espacial interactivo en cruz**. Desde el nodo central de inicio, la cámara se desplaza de forma fluida hacia los cuatro brazos cardinales sin recargas de página, articulando una **sección unificada de Oficina y Servicios** (historia corporativa, equipo, visión, mapa conceptual y los cinco pilares de especialidad), un **catálogo filtrable de proyectos con transiciones por difuminación** hacia páginas individuales de diagramación libre, un módulo de contacto con respaldo en **Supabase** y despacho transaccional mediante **Resend**, y despliegue continuo en **Vercel**.

---

### Enlace de Producción:

<a href="https://890arq-web.vercel.app/" target="_blank" rel="noopener noreferrer">https<span>://</span>890arq-web<span>.</span>vercel<span>.</span>app/ <img src="public/images/external-link.svg" width="12" height="12" alt="" /></a>

---

### Arquitectura Funcional (v2.0):

* **Lienzo Espacial Interactivo en Cruz:** Sistema de navegación bidimensional gobernado por estado global que desplaza el viewport mediante transformaciones aceleradas por hardware entre el nodo central (`Home`) y los cuatro ejes cardinales: Norte (`Proyectos`), Oeste (`Contacto`), Este (`Oficina`) y Sur (`Cotizaciones`), manteniendo fijo el marco de identidad corporativa y accesos directos.
* **Sección Unificada de Oficina y Servicios:** Integración editorial en flujo vertical continuo que consolida la reseña institucional (`890 ARQ Ltda.` y `890 ARQ SpA`), cuadrícula de equipo, declaración de visión, mapa conceptual de especialidades y el desglose técnico de los cinco pilares de servicios.
* **Catálogo Filtrable de Proyectos por Difuminación:** Grilla editorial monocromática con rotulación técnica vertical, filtrado reactivo por categorías y transiciones suaves por difuminación (*fade*) entre el índice general y las páginas individuales de diseño libre para cada obra.
* **Integración Backend con Supabase y Resend:** Procesamiento de formularios mediante Server Actions de Next.js con validación estricta en servidor (Zod), persistencia de respaldo tolerante a fallos en PostgreSQL (`Supabase`), soporte de activos en `Supabase Storage` y despacho de notificaciones HTML mediante `Resend`.

---

### Stack Tecnológico:

* **Framework Web:** Next.js (App Router, Server Components & Server Actions)
* **Librería de Interfaz:** React 19
* **Lenguaje:** TypeScript (modo estricto)
* **Estilos y Maquetación:** Tailwind CSS v4
* **Base de Datos y Almacenamiento Multimedia:** Supabase (PostgreSQL + Supabase Storage)
* **Validación de Esquemas:** Zod
* **Servicio de Correo Transaccional:** Resend
* **Infraestructura y Despliegue:** Vercel

---

### Créditos y Autoría:

* **Diseño UI:** Gabriela Zett (`zett.webdesign@gmail.com`)
* **Desarrollo Web:** Juan Pablo Oyanedel (<a href="https://github.com/juanpablo3705" target="_blank" rel="noopener noreferrer">github<span>.</span>com/juanpablo3705 <img src="public/images/external-link.svg" width="12" height="12" alt="" /></a>)
