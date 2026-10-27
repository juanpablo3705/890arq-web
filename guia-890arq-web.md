# Guía Maestra y Pedagógica de Desarrollo Web Moderno con IA (Caso Real: 890 ARQ)

**Autoría y Propósito:** Manual de ingeniería web full-stack y orquestación multiagente en **Google Antigravity**, diseñado específicamente para un estudiante de 1.er año de **Analista Programador** (con base en Python de consola, Java con JavaFX y WordPress tradicional) operando sobre **Linux Mint**.
**Directorio Base de Proyectos:** `/home/juanpablo/Escritorio/proyectos`
**Directorio de este Proyecto:** `/home/juanpablo/Escritorio/proyectos/890arq-web`

---

## MÓDULO 1: Fundamentos Pedagógicos (De Python, JavaFX y WordPress a la Web Moderna)

### 1.1. El cambio de paradigma: Del Monolito a la Arquitectura Desacoplada
En tu experiencia previa con **WordPress en hosting gratuito**, trabajabas bajo una **arquitectura monolítica acoplada**: un solo servidor ejecutaba código PHP, consultaba una base de datos MySQL local, guardaba las fotos en la carpeta `wp-content/uploads/` y armaba el HTML cada vez que entraba un visitante. Si el servidor era lento, toda la web era lenta; si un plugin fallaba, el sitio entero caía.

En el desarrollo profesional moderno (el estándar de la industria en 2026), aplicamos el principio de **Separación de Responsabilidades (SoC)** que estás aprendiendo en programación orientada a objetos: dividimos el sitio en capas especializadas que se comunican mediante **APIs** intercambiando datos en formato **JSON** (que es exactamente igual a una lista de diccionarios de Python).

| Concepto / Capa | Tu equivalente en 1.er Año (Java / Python / WP) | Equivalente en el Stack Web Moderno | Qué hace exactamente en el proyecto 890 ARQ |
| :--- | :--- | :--- | :--- |
| **Entorno de Ejecución** | Intérprete de Python (`python3`) o JVM (`java`) | **Node.js** + Gestor **npm** | Permite que tu Linux Mint ejecute JavaScript/TypeScript fuera del navegador y descargue librerías (como `pip` en Python). |
| **Lenguaje Base** | **Java** (tipado estático) / **Python** (dinámico) | **TypeScript** (`.ts` / `.tsx`) | Es JavaScript con **tipado estático estricto**. Te obliga a definir interfaces (`interface Project`), evitando errores antes de compilar. |
| **Interfaz Gráfica (UI)** | Archivos `.fxml` y controles de **JavaFX** | **React** (dentro de **Next.js**) | Divide la pantalla en **Componentes** reutilizables (`<Navbar />`, `<ProjectCard />`) que reciben datos llamados *Props*. |
| **Estilos Visuales** | Propiedades CSS de JavaFX (`-fx-background-color`) | **Tailwind CSS** | Sistema de clases utilitarias (`bg-zinc-900 text-white p-6`) que se escriben directamente dentro de la etiqueta del componente. |
| **Enrutamiento y Lógica** | Controladores de JavaFX (`Controller.java`) | **Next.js (App Router)** | Crea páginas automáticamente según las carpetas que crees en `src/app/` y ejecuta funciones seguras en el servidor (*Server Actions*). |
| **Base de Datos y CMS** | Diccionarios en memoria / Panel `wp-admin` | **Supabase (PostgreSQL)** | Base de datos relacional en la nube con panel visual tipo Excel para agregar o editar proyectos sin tocar el código. |
| **Almacenamiento Multimedia** | Carpeta local o `wp-content/uploads` | **Supabase Storage** | "Disco duro" en la nube (Bucket) que aloja las fotografías pesadas de arquitectura y las entrega mediante URLs públicas optimizadas. |
| **Envío de Correos** | Plugin *Contact Form 7* (vía PHP `mail()`) | **Resend** | Servicio transaccional que recibe los datos validados del formulario y entrega el correo en la bandeja de entrada sin caer en Spam. |
| **Control de Versiones** | Guardar copias en carpetas (`proyecto_final_v2.zip`) | **Git** + **GitHub** | Registra cada cambio en el código con una línea de tiempo y lo respalda en un repositorio privado en la nube. |
| **Servidor y Publicación** | Subir archivos por FTP a un cPanel | **Vercel** (o **Cloudflare Pages**) | Detecta cada vez que subes código a GitHub (`git push`), lo compila en la nube y actualiza `890arq.cl` en menos de 60 segundos. |

---

### 1.2. Explicación profunda de las 3 tecnologías clave para principiantes

#### A. ¿Qué es Node.js y por qué se instala en tu Linux Mint si el sitio es para internet?
Originalmente, JavaScript solo podía ejecutarse dentro del motor de un navegador como Firefox. **Node.js** tomó ese motor y lo transformó en un programa instalable en Linux, Windows o Mac.
* **Para qué lo usas tú:** Tu código de **TypeScript** y **Tailwind CSS** no es entendido directamente por los navegadores web. Node.js actúa como tu "fábrica local": lee tus archivos `.tsx`, revisa que no haya errores de tipos, traduce todo a HTML, CSS y JavaScript puro, y levanta un servidor de prueba en tu computador (`http://localhost:3000`) para que veas los cambios en vivo mientras programas.
* **Qué es `npm`:** Cuando instalas Node.js, se instala automáticamente `npm` (*Node Package Manager*). Cuando un agente en Antigravity ejecuta `npm install resend zod`, está descargando código ya escrito por otros ingenieros y guardándolo en la carpeta `node_modules/` dentro de `/home/juanpablo/Escritorio/proyectos/890arq-web`.

#### B. ¿Qué es React y qué le agrega Next.js por encima?
* **React (La librería de interfaz):** En JavaFX, tú creas un botón (`Button btn = new Button()`) y lo agregas a un contenedor (`VBox`). En React haces lo mismo, pero usando una sintaxis llamada **JSX/TSX**, que te permite escribir etiquetas similares a HTML mezcladas con lógica de programación:

```tsx
// Ejemplo pedagógico: Un componente React con TypeScript
// 1. Definimos el "Contrato" (como una clase o interfaz en Java)
interface TarjetaProps {
  titulo: string;
  metrosCuadrados: number;
}

// 2. Creamos el Componente (como una función en Python que retorna interfaz)
export function TarjetaProyecto({ titulo, metrosCuadrados }: TarjetaProps) {
  return (
    <div className="border border-neutral-200 p-4 bg-white">
      <h3 className="text-xl font-bold text-neutral-900">{titulo}</h3>
      <p className="text-sm text-neutral-500">Superficie: {metrosCuadrados} m²</p>
    </div>
  );
}
```

* **Next.js (El Framework completo):** React por sí solo únicamente sabe dibujar botones y cajas; no sabe cómo manejar múltiples páginas ni cómo conectarse de forma segura a una base de datos. **Next.js** envuelve a React y le agrega dos superpoderes:
  1. **App Router (Rutas por carpetas):** Todo lo que pongas dentro de `src/app/` se convierte en una dirección web real:
     * `src/app/page.tsx` $\rightarrow$ `www.890arq.cl` (Inicio)
     * `src/app/servicios/page.tsx` $\rightarrow$ `www.890arq.cl/servicios`
     * `src/app/proyectos/page.tsx` $\rightarrow$ `www.890arq.cl/proyectos`
     * `src/app/proyectos/[slug]/page.tsx` $\rightarrow$ Ruta comodín dinámica (sirve para `/proyectos/cabanas-ocoa`, `/proyectos/edificio-codequir`, etc.).
  2. **Server Components vs. Client Components (El concepto más importante de Next.js):**
     * Por defecto, todos los componentes en Next.js son **Server Components**: se ejecutan en el servidor, consultan la base de datos en secreto y envían el HTML listo al navegador (ultrarrápido y excelente para aparecer en Google).
     * Si un componente necesita interactividad en el navegador del usuario (como hacer clic para agrandar una foto en una galería o escribir en un formulario), se le escribe `'use client'` en la primera línea del archivo. Eso lo convierte en un **Client Component** (equivalente a agregar un *EventListener* en JavaFX).

---

## MÓDULO 2: Radiografía del Proyecto 890 ARQ y Presupuesto Real

### 2.1. Levantamiento de Contenido y Estructura de Negocio (`890arq.cl`)
Para que nuestros agentes construyan un sitio real y no una plantilla genérica vacía, toda la arquitectura de datos contemplará la estructura real de **890 ARQ**:

1. **Identidad Corporativa Dual:**
   * **890 ARQ Ltda.:** División enfocada en Diseño Arquitectónico, Planificación, Urbanismo, Regularizaciones y Tramitación Municipal.
   * **890 ARQ SpA:** División enfocada en Ejecución de Obras Civiles, Construcción Industrial (galpones, bodegas), Remodelaciones y Habilitación.
2. **Las 5 Líneas de Servicios:**
   * **Diseño y Arquitectura:** Anteproyectos, proyectos de arquitectura completos, modelado 3D/BIM y especialidades.
   * **Construcción y Obras:** Ejecución habitacional, comercial e industrial llave en mano.
   * **Regularizaciones y Permisos Municipales (DOM):** Ley del Mono, permisos de edificación, recepciones finales, cambios de destino y fusiones/subdivisiones prediales.
   * **Asesoría Técnica e Inspección (ITO):** Evaluación de terrenos (factibilidad normativa), presupuestos de obra y supervisión técnica.
   * **Proyectos Industriales y Comerciales:** Bodegas, galpones industriales, estudios de carga de combustible y resoluciones sanitarias.
3. **Portafolio de Proyectos Emblemáticos:**
   * *Cabañas Ocoa* (Arquitectura habitacional / turística).
   * *Edificio Codequir* (Arquitectura corporativa / institucional).
   * *Galpones y Naves Industriales* (Infraestructura logística / industrial).
   * *Viviendas Unifamiliares y Remodelaciones* (Residencial en la Región de Valparaíso).
4. **Checklist Interactivo de Documentación Municipal:**
   * Sección informativa clave donde el cliente revisa qué documentos necesita reunir antes de iniciar un trámite (Certificado de Informaciones Previas - CIP, Certificado de Dominio Vigente, Certificado de Avalúo Fiscal Detallado, Planos o Permisos anteriores).

---

### 2.2. Desglose Financiero Real: ¿Qué se paga, a quién y cuándo?

| Servicio | Rol en el proyecto | Costo Plan Gratuito | Cuándo te obligan a pagar | Costo Plan Pagado |
| :--- | :--- | :--- | :--- | :--- |
| **NIC Chile (`nic.cl`)** | Dueño del nombre `890arq.cl` | No existe | Desde el día 1 (renovación anual) | **~$10.900 CLP / año** |
| **GitHub** | Repositorio de código en la nube | **$0 / mes** | Nunca (repositorios privados ilimitados gratis) | $0 |
| **Supabase** | Base de datos PostgreSQL + Galería de fotos | **$0 / mes** (Incluye 500 MB de BD y **1 GB** de fotos) | Solo si subes más de 1 GB en fotos sin comprimir o si no hay actividad por 7 días seguidos (en el plan gratis se pausa y se reactiva con 1 clic) | **$25 USD / mes** |
| **Resend** | Envío de correos del formulario de contacto | **$0 / mes** (Hasta **3.000 emails/mes**; máx. 100/día) | Solo si 890 ARQ recibe más de 100 formularios de clientes en un solo día | **$20 USD / mes** |
| **Vercel** | Hosting Serverless y despliegue automático | **$0 / mes** (Plan *Hobby*: uso personal / no comercial) | Legalmente, sus términos exigen el Plan *Pro* para sitios de empresas con fines comerciales | **$20 USD / mes** |
| **Cloudflare Pages** *(Alternativa a Vercel)* | Hosting Serverless global comercial | **$0 / mes** (Permite **uso comercial legal** gratuito) | Casi nunca para un sitio corporativo (ancho de banda ilimitado) | $0 |

> **Consejo Estratégico:** Desarrolla y prueba todo gratis en **Vercel (Plan Hobby)** durante la etapa de construcción y aprendizaje. Cuando el sitio sea definitivo para la empresa, puedes decidir entre pagar los **$20 USD/mes** de Vercel Pro por su comodidad absoluta, o desplegar el mismo repositorio de GitHub en **Cloudflare Pages** por **$0/mes** de forma 100% legal para uso comercial.

---

## MÓDULO 3: Trabajo Manual Previo en Linux Mint (Lo que TÚ debes hacer antes de usar los Agentes)

Los agentes de **Antigravity** pueden escribir código y ejecutar comandos dentro de tu proyecto, pero **no pueden** poner tu contraseña de administrador `sudo` para configurar tu sistema base, ni sacar capturas con tus ojos en Firefox, ni resolver los *captchas* de registro en servicios en la nube. Realiza estos 3 pasos en orden cronológico:

### Paso 3.1: Preparar tu entorno de desarrollo en Linux Mint
Abre tu terminal en Linux Mint (`Ctrl + Alt + T`) y ejecuta estos comandos paso a paso.

> **⚠️ Por qué NO usamos `sudo apt install nodejs`:** Los repositorios base de Ubuntu/Linux Mint traen versiones antiguas de Node.js y generan problemas de permisos al instalar herramientas globales. Usaremos **NVM (Node Version Manager)** y fijaremos el alias por defecto para que las terminales internas de Antigravity y VS Code siempre reconozcan `node` y `npm`.

```bash
# 1. Asegurar que tienes curl y git instalados en Linux Mint
sudo apt update && sudo apt install -y curl git build-essential

# 2. Instalar NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# 3. Recargar la configuración de tu terminal para que reconozca el comando nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
source ~/.bashrc

# 4. Instalar la última versión LTS (Long Term Support) de Node.js y fijarla por defecto
nvm install --lts
nvm use --lts
nvm alias default 'lts/*'

# 5. Verificar que Node y npm quedaron bien instalados (debe mostrar v22.x o superior)
node -v
npm -v

# 6. Configurar tu identidad en Git (usa el mismo correo de tu cuenta de GitHub)
git config --global user.name "Juan Pablo Oyanedel"
git config --global user.email "tu_correo@ejemplo.com"
```

Ahora, crea la estructura de carpetas para este proyecto dentro de tu ruta habitual de trabajo (`/home/juanpablo/Escritorio/proyectos`):

```bash
mkdir -p /home/juanpablo/Escritorio/proyectos/890arq-web/referencias-visuales
mkdir -p /home/juanpablo/Escritorio/proyectos/890arq-web/activos-originales
cd /home/juanpablo/Escritorio/proyectos/890arq-web
```

---

### Paso 3.2: Extraer el "ADN Visual" del sitio actual (`www.890arq.cl`) en Firefox
Para que el Agente de Diseño (Agente 1) no invente un sitio genérico y respete la identidad gráfica de **890 ARQ**, extrae la información visual real desde tu navegador Firefox:

1. **Capturas de Pantalla Completa (Para la visión multimodal del agente):**
   * Abre `www.890arq.cl` en Firefox.
   * Presiona `Ctrl + Shift + S` (herramienta nativa de captura de Firefox) y haz clic en **"Guardar página completa"** arriba a la derecha.
   * Guarda la imagen directamente en `/home/juanpablo/Escritorio/proyectos/890arq-web/referencias-visuales/` con el nombre `01-home-original.png`.
   * Repite el proceso entrando a la sección de Servicios (`02-servicios-original.png`), a un Proyecto (`03-proyecto-detalle.png`) y a Contacto (`04-contacto-original.png`).
2. **Rescate de Logos y Fotografías Originales:**
   * En el sitio actual, haz clic derecho sobre el **Logo de 890 ARQ** y selecciona *"Guardar imagen como..."*. Guárdalo en `/home/juanpablo/Escritorio/proyectos/890arq-web/activos-originales/logo-890arq.png` (o `.svg`).
   * Si tienes acceso a las carpetas originales de fotos de los proyectos (*Cabañas Ocoa*, *Edificio Codequir*, etc.), déjalas a mano en tu computador para subirlas luego a Supabase.
3. **Inspección de Colores Exactos (`#HEX`) y Fuentes (`F12`):**
   * Con `www.890arq.cl` abierto en Firefox, presiona la tecla **`F12`** para abrir las Herramientas de Desarrollador.
   * En la barra superior del panel que se abre, haz clic en el ícono del **Cuentagotas (gotero)**.
   * Pasa el cursor sobre el color corporativo principal del logo o de los botones del sitio y haz clic: el código hexadecimal (por ejemplo, `#D90429` o `#1A1A1A`) se copiará a tu portapapeles. Anótalo.
   * Haz clic derecho sobre el título principal de la portada $\rightarrow$ **Inspeccionar**. En el panel derecho, busca la pestaña **"Tipografías" (Fonts)**: ahí verás el nombre exacto de la fuente que usa el sitio hoy (por ejemplo, *Montserrat*, *Oswald*, *Roboto* o *Raleway*). Anótalo.

---

### Paso 3.3: Crear las 4 Cuentas en la Nube y obtener las Llaves (API Keys)
Ve a tu navegador y regístrate gratis en estos 4 servicios (puedes iniciar sesión en Supabase, Vercel y Resend usando un solo clic con tu cuenta de GitHub):

1. **GitHub (`github.com`):**
   * Crea una cuenta o inicia sesión.
   * Haz clic en el botón **New Repository**, ponle de nombre `890arq-web`, márcalo como **Private** (Privado), **NO** marques "Add a README file", y dale a **Create repository**. Deja esa pestaña abierta.
2. **Supabase (`supabase.com`):**
   * Inicia sesión con GitHub y crea un **New Project** llamado `890arq-db`.
   * Elige la región **South America (São Paulo)** (es la más cercana a Chile para que las fotos carguen rápido) y guarda bien la contraseña de base de datos que te pide inventar.
   * Una vez creado (tarda ~1 minuto), ve en el menú izquierdo a **Project Settings (ícono de engranaje) $\rightarrow$ API**.
   * Copia dos datos que te pedirá tu archivo `.env.local`:
     * `Project URL` (ej. `https://xyzcompany.supabase.co`)
     * `anon` / `public` Key (una cadena larga que empieza con `eyJ...`).
3. **Resend (`resend.com`):**
   * Inicia sesión con GitHub.
   * En el menú izquierdo ve a **API Keys $\rightarrow$ Create API Key**, llámala `Web890ARQ` y copia el código que empieza con `re_...`.
   * **⚠️ Regla de Oro del Modo Sandbox de Resend:** Mientras no conectes el dominio `890arq.cl` en la pestaña *Domains* de Resend, el servicio funciona en modo de prueba gratuito: **el remitente debe ser obligatoriamente `onboarding@resend.dev` y el destinatario debe ser exactamente tu propio correo con el que te registraste en Resend**. Así podrás probar que el formulario envía correos reales desde tu Linux Mint sin gastar un peso ni tocar el dominio real todavía.
4. **Vercel (`vercel.com`):**
   * Inicia sesión con tu cuenta de GitHub. No necesitas copiar ninguna llave de aquí por ahora; lo usaremos en el último paso para publicar el sitio.

---

## MÓDULO 4: Orquestación Multiagente en Antigravity (Los 5 Prompts Maestros)

### Reglas de Oro para Orquestar Agentes sin Colisiones
El secreto para trabajar con múltiples agentes en **Google Antigravity** es **dividir el proyecto por carpetas exclusivas** y establecer un **Contrato de Tipos (`src/types/domain.ts`)** inmutable:
* **Orden de ejecución:** Abre Antigravity directamente sobre la carpeta `/home/juanpablo/Escritorio/proyectos/890arq-web`. Ejecuta primero al **Agente 0** y espera a que termine. Una vez que el Agente 0 creó la estructura y el contrato `domain.ts`, puedes ejecutar a los **Agentes 1, 2 y 3** (en paralelo o en secuencia, ya que ninguno toca los archivos del otro). Finalmente, ejecuta al **Agente 4** para unir los cables y compilar.

---

### AGENTE 0: El Arquitecto Inicializador (Cimientos y Contrato de Datos)
**Cuándo ejecutarlo:** Primero, en solitario.

> **COPIAR Y PEGAR EN EL AGENTE 0:**
> ```text
> Actúa como un Principal Software Architect. Estamos trabajando en un entorno Linux Mint exactamente dentro del directorio `/home/juanpablo/Escritorio/proyectos/890arq-web` para reconstruir desde cero el sitio web corporativo y portafolio de arquitectura y construcción de "890 ARQ" (www.890arq.cl).
>
> REGLA CRÍTICA PREVIA: En `/home/juanpablo/Escritorio/proyectos/890arq-web` ya existen dos carpetas llamadas `./referencias-visuales/` y `./activos-originales/`. NO las borres ni las sobrescribas bajo ninguna circunstancia.
>
> 1. STACK TECNOLÓGICO OBLIGATORIO:
> - Framework: Next.js (última versión estable, App Router, carpeta `src/`).
> - Lenguaje: TypeScript en modo estricto (`strict: true`).
> - Estilos: Tailwind CSS + `lucide-react` (para iconografía técnica).
> - Base de Datos & Storage: Supabase (`@supabase/supabase-js`).
> - Validación de Formularios: `zod`.
> - Servicio de Emails: `resend` (vía Next.js Server Actions).
>
> 2. TAREAS DE EJECUCIÓN INMEDIATA:
> - Ubícate en `/home/juanpablo/Escritorio/proyectos/890arq-web`. Inicializa Next.js sin borrar las carpetas existentes (mueve temporalmente `./referencias-visuales` y `./activos-originales` a `/tmp/`, ejecuta `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes` y luego devuelve ambas carpetas a `/home/juanpablo/Escritorio/proyectos/890arq-web/`, copiando además el contenido de `./activos-originales/` hacia `./public/images/`).
> - Instala todas las dependencias de una sola vez para que los demás agentes no tengan que modificar `package.json`:
>   `npm install @supabase/supabase-js resend zod lucide-react clsx tailwind-merge`
> - Crea la siguiente estructura de directorios dentro de `src/`:
>   - `src/types/`
>   - `src/components/layout/`
>   - `src/components/ui/`
>   - `src/components/sections/`
>   - `src/lib/`
>   - `src/actions/`
> - Crea el archivo `.env.example` y `.env.local` en la raíz `/home/juanpablo/Escritorio/proyectos/890arq-web/` con las siguientes llaves vacías listas para completar:
>   `NEXT_PUBLIC_SUPABASE_URL=`
>   `NEXT_PUBLIC_SUPABASE_ANON_KEY=`
>   `RESEND_API_KEY=`
>   `CONTACT_RECEIVER_EMAIL=`
> - Verifica que `.gitignore` incluya `.env*.local` y `/referencias-visuales` para no subir capturas pesadas ni llaves secretas a GitHub.
> - Crea el Contrato Maestro de Datos en `src/types/domain.ts` con el siguiente código exacto:
>
> export type ProjectCategory = 'Arquitectura' | 'Construcción' | 'Industrial' | 'Regularización' | 'Comercial';
>
> export interface Project {
>   id: string;
>   slug: string;
>   title: string;
>   category: ProjectCategory;
>   division: '890 ARQ Ltda.' | '890 ARQ SpA';
>   location: string;
>   year: number;
>   areaM2?: number;
>   shortDescription: string;
>   fullDescription: string;
>   coverImageUrl: string;
>   galleryUrls: string[];
>   featured: boolean;
> }
>
> export interface ServiceItem {
>   id: string;
>   title: string;
>   division: '890 ARQ Ltda.' | '890 ARQ SpA' | 'Ambas';
>   description: string;
>   deliverables: string[];
>   iconName: string;
> }
>
> export interface ContactPayload {
>   fullName: string;
>   email: string;
>   phone: string;
>   serviceType: ProjectCategory | 'Otro';
>   locationComuna: string;
>   message: string;
> }
>
> export interface ActionResponse {
>   success: boolean;
>   message: string;
>   errors?: Record<string, string[]>;
> }
>
> - Verifica que `npx tsc --noEmit` pase sin ningún error. No construyas aún las vistas finales; deja el terreno listo para los Agentes 1, 2 y 3.
> ```

---

### AGENTE 1: Especialista en Sistema de Diseño Multimodal y Frontend (UI/UX)
**Cuándo ejecutarlo:** Después de que termine el Agente 0. (Recuerda reemplazar `#C8102E` si extrajiste otro código hexadecimal con el cuentagotas de Firefox).

> **COPIAR Y PEGAR EN EL AGENTE 1:**
> ```text
> Actúa como un Senior UI/UX Designer y Frontend Architect especialista en Next.js App Router y Tailwind CSS. Estamos trabajando en `/home/juanpablo/Escritorio/proyectos/890arq-web`.
>
> 1. LECTURA DE CONTRATOS Y REFERENCIAS MULTIMODALES:
> - Lee el contrato de datos en `/home/juanpablo/Escritorio/proyectos/890arq-web/src/types/domain.ts`.
> - Inspecciona visualmente las capturas de pantalla del sitio original ubicadas en `/home/juanpablo/Escritorio/proyectos/890arq-web/referencias-visuales/` y los logos en `/home/juanpablo/Escritorio/proyectos/890arq-web/public/images/`. Tu misión es modernizar el sitio de "890 ARQ" preservando su identidad visual, estructura corporativa y sobriedad arquitectónica.
>
> 2. SISTEMA DE DISEÑO (DESIGN TOKENS):
> - Configura en `src/app/layout.tsx` las fuentes de Google Fonts: `Montserrat` (variable `--font-heading`, pesos 400, 600, 700) para títulos arquitectónicos e `Inter` (variable `--font-sans`, pesos 300, 400, 500) para textos técnicos.
> - Configura los colores y variables en `src/app/globals.css` (compatible con `@theme` de Tailwind v4 o `tailwind.config.ts` si existe):
>   - Fondo principal: `#FAFAFA` (Blanco papel técnico)
>   - Fondo oscuro corporativo: `#121212` (Gris carbón / hormigón oscuro)
>   - Texto principal: `#111111`
>   - Texto técnico secundario: `#52525B`
>   - Color de acento de marca (`brand-accent`): `#C8102E` [O reemplaza por el código #HEX exacto extraído del logo]
> - Reglas estéticas obligatorias:
>   - Geometría de precisión: Prohibido usar `rounded-xl` o `rounded-2xl`. Usa bordes rectos (`rounded-none` o `rounded-xs`), grillas ortogonales visibles con bordes finos (`border-zinc-200`) e indicadores técnicos (m², ubicación, año) con tipografía monoespaciada o `tracking-widest uppercase text-xs`.
>
> 3. DATOS SEMILLA REALES (`src/lib/mock-data.ts`):
> - Crea `src/lib/mock-data.ts` exportando:
>   - `MOCK_PROJECTS: Project[]` con al menos 6 proyectos realistas de 890 ARQ (incluyendo obligatoriamente "Cabañas Ocoa", "Edificio Codequir", "Naves Industriales La Pólvora", "Regularización Comercial Viña del Mar" y "Vivienda Unifamiliar Quilpué"), usando imágenes arquitectónicas de Unsplash de alta resolución como placeholder temporal.
>   - `SERVICES_LIST: ServiceItem[]` con las 5 áreas reales (Diseño y Arquitectura, Construcción y Obras Civiles, Regularizaciones y Permisos DOM, Inspección Técnica ITO, y Proyectos Industriales).
>   - `MUNICIPAL_CHECKLIST` con la lista de documentos previos requeridos para trámites DOM (Certificado de Informaciones Previas CIP, Certificado de Dominio Vigente, Avalúo Fiscal Detallado, Planos Anteriores).
>
> 4. CONSTRUCCIÓN DE COMPONENTES Y PÁGINAS:
> - En `src/components/layout/`: Crea `Navbar.tsx` (fijo arriba, logo real de 890 ARQ desde `/images/`, navegación limpia y botón CTA "Cotizar Proyecto") y `Footer.tsx` (datos de contacto en Región de Valparaíso, distinción entre 890 ARQ Ltda. y 890 ARQ SpA).
> - En `src/components/ui/`:
>   - `ProjectCard.tsx`: Tarjeta arquitectónica con imagen `aspect-[4/3]`, zoom suave en hover, etiqueta de división (Ltda. / SpA), ubicación y metraje.
>   - `ProjectGallery.tsx`: Componente `'use client'` que muestra la grilla de fotos de un proyecto y abre un visor modal (Lightbox) a pantalla completa con navegación por teclado (flechas y Escape).
>   - `CategoryFilter.tsx`: Filtro interactivo por categoría de proyecto.
> - En `src/app/`:
>   - `src/app/page.tsx`: Portada impactante (Hero arquitectónico), sección comparativa de la estructura dual ("890 ARQ Ltda. - Diseño y Gestión" vs "890 ARQ SpA - Construcción y Obras"), grilla de Proyectos Destacados, las 5 líneas de Servicios, el Checklist de Documentación Municipal y sección final de Contacto.
>   - `src/app/proyectos/page.tsx`: Catálogo completo filtrable de proyectos.
>   - `src/app/proyectos/[slug]/page.tsx`: Vista de detalle técnico del proyecto con ficha de especificaciones (División, Ubicación, Año, Superficie m²) y el componente `<ProjectGallery/>`.
>   - `src/app/servicios/page.tsx`: Desglose profundo de las 5 líneas de servicios y el checklist documental.
>
> 5. REGLA CRÍTICA DE NEXT.JS 15/16 Y LÍMITES DE TERRITORIO:
> - En `src/app/proyectos/[slug]/page.tsx`, recuerda que en Next.js 15+ la propiedad `params` es una Promesa asíncrona: tipa siempre como `{ params }: { params: Promise<{ slug: string }> }` y haz `const { slug } = await params;` dentro del componente asíncrono.
> - NO edites ni crees archivos en `src/actions/`, `src/lib/supabase.ts` ni `src/components/ui/ContactForm.tsx` (deja un contenedor o placeholder limpio donde irá el formulario de contacto).
> ```

---

### AGENTE 2: Especialista en Base de Datos PostgreSQL y Storage (Supabase)
**Cuándo ejecutarlo:** En paralelo o inmediatamente después del Agente 1.

> **COPIAR Y PEGAR EN EL AGENTE 2:**
> ```text
> Actúa como un Senior Backend & Database Engineer especialista en Supabase, PostgreSQL y TypeScript. Estamos trabajando en `/home/juanpablo/Escritorio/proyectos/890arq-web`.
>
> 1. LECTURA DE CONTRATO:
> - Lee estrictamente `/home/juanpablo/Escritorio/proyectos/890arq-web/src/types/domain.ts`.
>
> 2. SCRIPT SQL DE INFRAESTRUCTURA (`supabase-schema.sql`):
> - Crea en `/home/juanpablo/Escritorio/proyectos/890arq-web/supabase-schema.sql` un script SQL listo para copiar y pegar en el SQL Editor de Supabase. Debe incluir:
>   - Creación de la tabla `public.projects` con columnas en `snake_case` mapeadas exactamente a la interfaz `Project` (`id` UUID primary key default `gen_random_uuid()`, `slug` text unique not null, `title` text not null, `category` text not null, `division` text not null, `location` text not null, `year` integer not null, `area_m2` integer, `short_description` text not null, `full_description` text not null, `cover_image_url` text not null, `gallery_urls` text[] default '{}', `featured` boolean default false, `created_at` timestamptz default now()).
>   - Habilitación de Row Level Security (`ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;`) y creación de una política de lectura pública (`SELECT` permitido para `anon` y `authenticated`).
>   - Instrucciones SQL comentadas y script para insertar el bucket público `portfolio-media` en `storage.buckets` con política RLS de lectura pública de imágenes.
>   - Un bloque `INSERT INTO public.projects ...` con los 5 proyectos iniciales de 890 ARQ para poblar la base de datos de inmediato.
>
> 3. CLIENTE Y CAPA DE SERVICIO CON FALLBACK INTELIGENTE:
> - Crea `src/lib/supabase.ts`: Inicializa el cliente de Supabase de forma segura. Si `NEXT_PUBLIC_SUPABASE_URL` o `NEXT_PUBLIC_SUPABASE_ANON_KEY` están vacías o no definidas en `.env.local`, no lances una excepción fatal; exporta un cliente `null` y una bandera booleana `isSupabaseConfigured`.
> - Crea `src/lib/projects-service.ts`:
>   - Programa una función mapeadora interna que transforme las filas de PostgreSQL (`snake_case`, ej. `cover_image_url`) al contrato exacto de TypeScript (`camelCase`, ej. `coverImageUrl`) definido en `src/types/domain.ts`.
>   - Exporta `getAllProjects(): Promise<Project[]>`, `getFeaturedProjects(): Promise<Project[]>` y `getProjectBySlug(slug: string): Promise<Project null |>`.
>   - LÓGICA DE RESILIENCIA (FALLBACK): Si `isSupabaseConfigured` es `false` o si la consulta falla porque aún no se han cargado las credenciales, las funciones deben retornar silenciosamente los datos de `src/lib/mock-data.ts` filtrados según corresponda. Así el sitio jamás se rompe en desarrollo local ni en el primer build.
>
> RESTRICCIÓN DE TERRITORIO: No modifiques ningún archivo dentro de `src/components/` ni `src/app/`.
> ```

---

### AGENTE 3: Especialista en Lógica de Contacto, Validación Zod y Resend
**Cuándo ejecutarlo:** En paralelo o inmediatamente después del Agente 2.

> **COPIAR Y PEGAR EN EL AGENTE 3:**
> ```text
> Actúa como un Especialista en Seguridad Backend, Next.js Server Actions y Formularios Interactivos. Estamos trabajando en `/home/juanpablo/Escritorio/proyectos/890arq-web`.
>
> 1. LECTURA DE CONTRATO:
> - Lee las interfaces `ContactPayload` y `ActionResponse` en `/home/juanpablo/Escritorio/proyectos/890arq-web/src/types/domain.ts`.
>
> 2. ESQUEMA DE VALIDACIÓN ESTRICTA (`src/lib/validators.ts`):
> - Crea `src/lib/validators.ts` usando `zod`.
> - Valida `fullName` (mínimo 3 caracteres), `email` (formato email válido), `phone` (formato telefónico chileno flexible, ej. `+569...` o `9...`, mínimo 8 dígitos), `serviceType` (uno de los valores válidos o 'Otro'), `locationComuna` (ej. Quilpué, Viña del Mar, Valparaíso, Concón, etc., mínimo 2 caracteres) y `message` (mínimo 15 caracteres, máximo 2000).
>
> 3. SERVER ACTION CON RESEND (`src/actions/send-contact.ts`):
> - Crea el archivo `src/actions/send-contact.ts` iniciando con `'use server';`.
> - Recibe los datos del formulario, valídalos con el esquema de Zod. Si hay errores, retorna `{ success: false, message: 'Por favor revisa los campos del formulario.', errors: parsed.error.flatten().fieldErrors }`.
> - Si `process.env.RESEND_API_KEY` no está configurada aún en `.env.local`, simula un envío exitoso en consola (`console.log`) esperando 800ms y retorna `{ success: true, message: 'Mensaje recibido correctamente (Modo Simulación Local).' }` para permitir pruebas sin credenciales.
> - Si `RESEND_API_KEY` existe, usa el SDK de `resend` para enviar un correo HTML limpio y con formato de ficha técnica arquitectónica a `process.env.CONTACT_RECEIVER_EMAIL`, usando `onboarding@resend.dev` como remitente por defecto (para compatibilidad con el modo Sandbox gratuito de Resend).
>
> 4. COMPONENTE VISUAL DEL FORMULARIO (`src/components/ui/ContactForm.tsx`):
> - Crea `src/components/ui/ContactForm.tsx` con la directiva `'use client';`.
> - Diseña un formulario sobrio y arquitectónico (bordes rectos, inputs con foco en negro/acento, selector desplegable para Tipo de Servicio y campo para Comuna del proyecto).
> - Conéctalo al Server Action `sendContactAction`, mostrando estados claros: botón deshabilitado con spinner durante el envío ("Enviando consulta..."), mensajes de error debajo de cada campo si falla la validación, y un banner verde/sobrio de confirmación cuando `success === true`.
>
> RESTRICCIÓN DE TERRITORIO: Trabaja únicamente en `src/lib/validators.ts`, `src/actions/send-contact.ts` y `src/components/ui/ContactForm.tsx`.
> ```

---

### AGENTE 4: Especialista en Integración Final, SEO, QA y Compilación
**Cuándo ejecutarlo:** ÚNICAMENTE cuando los Agentes 1, 2 y 3 hayan terminado sus tareas.

> **COPIAR Y PEGAR EN EL AGENTE 4:**
> ```text
> Actúa como un Lead DevOps & QA Engineer en Next.js y TypeScript. Estamos en `/home/juanpablo/Escritorio/proyectos/890arq-web`. Los Agentes 1 (UI), 2 (Supabase) y 3 (Contacto) ya construyeron sus módulos aislados. Tu misión es ensamblar todo el sistema y dejarlo compilando con 0 errores para producción.
>
> 1. INTEGRACIÓN DE MÓDULOS:
> - Conecta `src/app/page.tsx`, `src/app/proyectos/page.tsx` y `src/app/proyectos/[slug]/page.tsx` para que obtengan los proyectos llamando a las funciones asíncronas de `src/lib/projects-service.ts` (`getFeaturedProjects`, `getAllProjects`, `getProjectBySlug`) en lugar de importar directamente `mock-data.ts`.
> - Inserta y conecta el componente `<ContactForm/>` (`src/components/ui/ContactForm.tsx`) en la sección de contacto de `src/app/page.tsx` y crea también una ruta dedicada `src/app/contacto/page.tsx`.
>
> 2. CONFIGURACIÓN DE IMÁGENES Y SEO (`next.config.ts`):
> - Configura `next.config.ts` utilizando `images.remotePatterns` (NO uses el obsoleto `images.domains`) para autorizar imágenes provenientes de `https://**.supabase.co` y `[https://images.unsplash.com](https://images.unsplash.com)`.
> - Implementa `generateMetadata` dinámico en `src/app/proyectos/[slug]/page.tsx` (recordando que `params` es una Promesa `Promise<{ slug: string }>` en Next.js 15+) y metadatos base optimizados para motores de búsqueda en `src/app/layout.tsx` ("890 ARQ | Arquitectura, Construcción y Gestión Municipal en Región de Valparaíso").
>
> 3. AUDITORÍA DE CALIDAD, SEGURIDAD Y BUILD DE PRODUCCIÓN:
> - Verifica que `.gitignore` esté bloqueando correctamente `.env.local` y `node_modules/`.
> - Ejecuta en la terminal `npx tsc --noEmit` y luego `npm run build`.
> - Si aparece cualquier error de tipos de TypeScript, importaciones faltantes o advertencias bloqueantes de ESLint, corrígelos directamente en los archivos correspondientes y vuelve a ejecutar `npm run build` hasta obtener una compilación de producción 100% exitosa (Exit code 0).
> ```

---

## MÓDULO 5: Esculpiendo el Diseño, Conexión Cloud y Diccionario Tailwind

### 5.1. Cómo pulir el diseño visual en vivo (Pantalla Dividida en Linux Mint)
Una vez que el Agente 4 te confirme que `npm run build` pasó sin errores, levanta tu servidor de desarrollo local ejecutando en la terminal:

```bash
cd /home/juanpablo/Escritorio/proyectos/890arq-web
npm run dev
```

1. Abre **Firefox** y colócalo ocupando la mitad derecha de tu pantalla en la dirección `http://localhost:3000`.
2. En la mitad izquierda abre el sitio antiguo (`www.890arq.cl`) o tu editor **VS Code**.
3. **Técnica de "Recorte Comparativo" en Antigravity:** Si una sección (por ejemplo, el tamaño del logo o la separación de las tarjetas de servicios) no te convence visualmente, usa la herramienta de recorte de Linux Mint (`Shift + PrtScn`), saca un recorte del sitio original y otro de tu `localhost:3000`, pégalos en el chat de Antigravity y escribe:
   > *"Compara estas dos capturas. Ajusta el componente en `src/components/` para que la proporción de la foto, el grosor de la fuente y los márgenes sean idénticos a la primera captura."*

---

### 5.2. Mini-Diccionario Pedagógico de Tailwind CSS (Para editar tú mismo sin IA)
Si quieres modificar tamaños o colores por tu cuenta abriendo cualquier archivo `.tsx` en VS Code, solo debes cambiar estas palabras dentro de `className="..."` y presionar `Ctrl + S` (verás el cambio en menos de un segundo en Firefox):

| Qué quieres cambiar | Clase actual en el código | Por qué cambiarla y qué hace |
| :--- | :--- | :--- |
| **Tamaño de letra** | `text-sm` / `text-base` / `text-xl` | `text-xs` (muy chica), `text-lg` (mediana), `text-3xl` (título), `text-5xl` (portada gigante). |
| **Grosor de letra** | `font-normal` | `font-light` (fina/elegante), `font-medium`, `font-semibold`, `font-bold` (negrita fuerte). |
| **Espacio entre letras** | `tracking-normal` | `tracking-tight` (juntas) o `tracking-widest` (muy separadas, clásico estilo de plano arquitectónico). |
| **Espacio interno (Padding)** | `p-4` / `py-12` / `px-6` | `p-` es relleno en los 4 lados; `py-` es arriba y abajo; `px-` es izquierda y derecha. Sube de `py-12` a `py-24` para dar más aire entre secciones. |
| **Columnas de una grilla** | `grid-cols-1 md:grid-cols-3` | En celular (`grid-cols-1`) muestra 1 foto por fila; en pantallas medianas o PC (`md:grid-cols-3`) muestra 3 fotos por fila. |
| **Separación entre cajas** | `gap-4` | Cámbialo a `gap-8` o `gap-12` para separar más las tarjetas de proyectos entre sí. |
| **Proporción de las fotos** | `aspect-square` | `aspect-[4/3]` (formato clásico horizontal), `aspect-video` (16:9 panorámico), `aspect-[3/4]` (vertical). |
| **Color de fondo y texto** | `bg-white text-zinc-900` | `bg-zinc-950 text-white` invierte la sección a fondo negro arquitectónico con letras blancas. |

---

### 5.3. Conectar tus llaves reales (`.env.local`) y poblar Supabase
1. Abre el archivo `/home/juanpablo/Escritorio/proyectos/890arq-web/.env.local` en VS Code y pega las llaves que obtuviste en el Paso 3.3:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=[https://tu-proyecto.supabase.co](https://tu-proyecto.supabase.co)
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR...
   RESEND_API_KEY=re_123456789...
   CONTACT_RECEIVER_EMAIL=tu_propio_correo_de_registro@gmail.com
   ```
2. Entra a tu proyecto en **Supabase.com**, ve al menú lateral izquierdo y haz clic en **SQL Editor $\rightarrow$ New Query**.
3. Abre el archivo `/home/juanpablo/Escritorio/proyectos/890arq-web/supabase-schema.sql` que creó el Agente 2, copia todo su contenido, pégalo en el SQL Editor de Supabase y presiona **Run**.
4. **¡Listo!** Si ahora vas al menú **Table Editor** en Supabase, verás la tabla `projects` creada con todas sus columnas y los proyectos iniciales cargados como en una planilla de Excel.
5. **Cómo subir fotos reales de 890 ARQ:**
   * En Supabase, ve al menú **Storage** $\rightarrow$ entra al bucket `portfolio-media` $\rightarrow$ arrastra ahí las fotos reales de *Cabañas Ocoa* o *Edificio Codequir*.
   * Haz clic en la foto subida $\rightarrow$ botón **Get URL**.
   * Ve al **Table Editor** $\rightarrow$ tabla `projects` $\rightarrow$ pega ese enlace en la columna `cover_image_url`. Al recargar tu navegador, verás la foto real servida desde la nube.

---

### 5.4. Publicación en Internet (GitHub $\rightarrow$ Vercel $\rightarrow$ NIC Chile)

#### 1. Subir tu código desde Linux Mint a GitHub
En la terminal dentro de `/home/juanpablo/Escritorio/proyectos/890arq-web`, ejecuta:

```bash
git add .
git commit -m "feat: lanzamiento inicial sitio web 890 ARQ con Next.js y Supabase"
git branch -M main
git remote add origin [https://github.com/TU_USUARIO/890arq-web.git](https://github.com/TU_USUARIO/890arq-web.git)
git push -u origin main
```

#### 2. Desplegar en Vercel
1. Entra a `vercel.com/new` e importa el repositorio `890arq-web` que acabas de subir.
2. En la sección desplegable **Environment Variables**, copia y pega las mismas 4 variables de tu archivo `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `RESEND_API_KEY`, `CONTACT_RECEIVER_EMAIL`).
3. Haz clic en **Deploy**. En unos 45 segundos, Vercel te dará una URL pública real (ej. `https://890arq-web.vercel.app`) funcionando en internet.

#### 3. Conectar el dominio definitivo (`890arq.cl`)
Cuando decidas reemplazar el WordPress antiguo por esta nueva versión:
1. En el panel de tu proyecto en Vercel, ve a **Settings $\rightarrow$ Domains**, escribe `890arq.cl` y haz clic en **Add**.
2. Vercel te mostrará los servidores de nombres (Nameservers) o registros DNS que debes configurar.
3. Entra a tu cuenta de **NIC Chile (`nic.cl`)**, selecciona el dominio `890arq.cl`, cambia los servidores DNS antiguos del hosting de WordPress por los que te indique Vercel (o Cloudflare) y guarda los cambios. En pocas horas, `www.890arq.cl` estará corriendo sobre tu nueva arquitectura moderna con certificado SSL automático.

---

## MÓDULO 6: Manual de Supervivencia y Resolución de Problemas Comunes en Linux Mint

Cuando trabajas con agentes en Antigravity y servidores locales en Linux, hay 4 situaciones clásicas que te van a ocurrir tarde o temprano. Aquí tienes cómo resolverlas en segundos desde tu terminal:

### 1. Error: `Port 3000 is already in use` (Puerto 3000 ocupado)
* **Por qué pasa:** Uno de los agentes levantó `npm run dev` en segundo plano para probar algo y dejó el proceso vivo, o cerraste la ventana de la terminal sin detener el servidor con `Ctrl + C`.
* **Cómo solucionarlo en Linux Mint:** Mata cualquier proceso que esté ocupando el puerto 3000 con este comando:
  ```bash
  npx kill-port 3000
  # O usando la herramienta nativa de Linux:
  fuser -k 3000/tcp
  ```

### 2. La página muestra un error extraño de caché o no refleja los cambios nuevos
* **Por qué pasa:** Cuando varios agentes editan archivos rápidamente, la carpeta oculta `.next/` (donde Next.js guarda archivos pre-compilados temporales) puede corromperse.
* **Cómo solucionarlo:** Borra la carpeta `.next/` y vuelve a levantar el servidor (se regenera sola y limpia en 3 segundos):
  ```bash
  cd /home/juanpablo/Escritorio/proyectos/890arq-web
  rm -rf .next
  npm run dev
  ```

### 3. Cambiaste algo en `.env.local` pero el sitio no toma la llave nueva
* **Por qué pasa:** A diferencia de los archivos visuales `.tsx` que se recargan en vivo (*Hot Reload*), las variables de entorno `.env.local` **solo se leen en el momento en que inicias el servidor**.
* **Cómo solucionarlo:** Ve a la terminal donde está corriendo `npm run dev`, presiona `Ctrl + C` para detenerlo y vuelve a ejecutar `npm run dev`.

### 4. El ciclo del día a día: Cómo subir mejoras después de que el sitio ya está publicado
Una vez que el sitio ya esté en internet, cada vez que quieras hacer un cambio (tú mismo o con un agente en `/home/juanpablo/Escritorio/proyectos/890arq-web`), el flujo de actualización es de solo 3 líneas en tu terminal:

```bash
cd /home/juanpablo/Escritorio/proyectos/890arq-web
git add .
git commit -m "fix: ajuste de diseño en galería de proyectos"
git push
```
Apenas termina el `git push`, Vercel lo detecta automáticamente, compila la nueva versión y actualiza el sitio en vivo sin que tengas que entrar al panel de Vercel.