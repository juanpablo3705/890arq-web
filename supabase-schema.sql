-- =============================================================================
-- 890 ARQ - INFRAESTRUCTURA DE BASE DE DATOS Y STORAGE (SUPABASE / POSTGRESQL)
-- =============================================================================
-- Instrucciones de uso:
-- 1. Ingresa a tu proyecto en https://supabase.com
-- 2. Ve al menú lateral izquierdo -> "SQL Editor" -> "New Query"
-- 3. Copia y pega íntegramente este script y presiona "Run" (Ctrl + Enter).
-- =============================================================================

-- Habilitar extensión pgcrypto para generación de UUIDs (si no está activa)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- 1. TABLA PRINCIPAL DE PROYECTOS (public.projects)
-- Mapeo exacto 1:1 en snake_case hacia la interfaz TypeScript `Project`
-- definida en `src/types/domain.ts`.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (
    category IN ('Arquitectura', 'Construcción', 'Industrial', 'Regularización', 'Comercial')
  ),
  division TEXT NOT NULL CHECK (
    division IN ('890 ARQ Ltda.', '890 ARQ SpA')
  ),
  location TEXT NOT NULL,
  year INTEGER NOT NULL CHECK (year >= 1990 AND year <= 2100),
  area_m2 INTEGER CHECK (area_m2 IS NULL OR area_m2 >= 0),
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  cover_image_url TEXT NOT NULL,
  gallery_urls TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Índices para optimizar consultas por slug, destacados y orden cronológico
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects (slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects (featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects (category);
CREATE INDEX IF NOT EXISTS idx_projects_year_desc ON public.projects (year DESC, created_at DESC);

-- =============================================================================
-- 2. SEGURIDAD A NIVEL DE FILAS (ROW LEVEL SECURITY - RLS)
-- Permite lectura pública (SELECT) tanto para visitantes anónimos (`anon`)
-- como para usuarios autenticados (`authenticated`).
-- Operaciones de escritura (INSERT/UPDATE/DELETE) quedan restringidas al
-- Dashboard de Supabase o rol `service_role`.
-- =============================================================================

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir lectura pública de proyectos" ON public.projects;

CREATE POLICY "Permitir lectura pública de proyectos"
  ON public.projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- =============================================================================
-- 3. SUPABASE STORAGE: BUCKET PÚBLICO `portfolio-media`
-- Instrucciones para gestionar las fotografías reales del portafolio:
-- - Este bloque crea automáticamente el bucket público `portfolio-media`.
-- - Para subir imágenes: Ve a "Storage" -> "portfolio-media" -> "Upload files".
-- - Una vez subida una imagen, haz clic en "Get URL" y pega el enlace público
--   en `cover_image_url` o dentro del arreglo `gallery_urls` en "Table Editor".
-- =============================================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-media',
  'portfolio-media',
  true,
  10485760, -- Límite de 10 MB por archivo
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE
SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Política RLS en storage.objects para lectura pública de imágenes del bucket
DROP POLICY IF EXISTS "Permitir lectura pública en portfolio-media" ON storage.objects;

CREATE POLICY "Permitir lectura pública en portfolio-media"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'portfolio-media');

-- =============================================================================
-- 4. DATOS SEMILLA INICIALES (PROYECTOS EMBLEMÁTICOS DE 890 ARQ)
-- Incluye cláusula ON CONFLICT (slug) DO UPDATE para permitir re-ejecución
-- segura del script sin duplicar registros.
-- =============================================================================

INSERT INTO public.projects (
  slug,
  title,
  category,
  division,
  location,
  year,
  area_m2,
  short_description,
  full_description,
  cover_image_url,
  gallery_urls,
  featured
)
VALUES
  (
    'cabanas-ocoa',
    'Cabañas Ocoa',
    'Arquitectura',
    '890 ARQ Ltda.',
    'Hijuelas, Región de Valparaíso.',
    2024,
    60,
    'Emplazamiento de dos cabañas modulares para uso habitacional con estudio forestal previo y trazado de mínimo impacto en el Valle de Ocoa.',
    'El proyecto consiste en emplazar en el terreno dos cabañas para uso habitacional, dentro de su programa se contempla un área para quincho como también la habilitación de un área de huella para camino peatonal y vehicula. Previamente a la definición del emplazamiento final se realizó un estudio forestal para el caso, el cual entregaba como resultado un Informe Técnico cuya evaluación permitió reconocer las áreas de menos riesgo considerando las particularidades del terreno y su emplazamiento. La inspección técnica además contempló el levantamiento de la vegetación existente y el planteo de la obra civil considerando el mínimo de intervención, removiéndose especies que no se encuentran actualmente protegidas por la legislación forestal, intervención que no requiere de un plan de manejo ante la Corporación Nacional Forestal, nativos o de formaciones xerofíticas.',
    '/images/original/ocoa-principal.jpeg',
    ARRAY[
      '/images/original/ocoa-exteriores.jpeg',
      '/images/original/ocoa-interiores.jpeg',
      '/images/original/ocoa-elevaciones.jpeg',
      '/images/original/ocoa-plantas.png'
    ],
    true
  ),
  (
    'edificio-codequir',
    'Edificio Codequir',
    'Construcción',
    '890 ARQ SpA',
    'Quilpué, Región de Valparaíso.',
    2024,
    1450,
    'Edificación y equipamiento de escala intermedia con coordinación integral de especialidades y ejecución de obra civil.',
    'Desarrollo arquitectónico, constructivo y gerenciamiento técnico integral para el Proyecto Codequir. La obra contempla una estructura sismorresistente diseñada para albergar equipamiento y unidades habitacionales/corporativas. El alcance de 890 ARQ abarcó el levantamiento, diseño planimétrico de plantas y elevaciones, planificación de obra, coordinación de especialidades y tramitación municipal ante la Dirección de Obras Municipales.',
    '/images/original/codequir-1.jpeg',
    ARRAY[
      '/images/original/codequir-3.jpeg',
      '/images/original/codequir-4.jpeg',
      '/images/original/codequir-2.jpeg',
      '/images/original/codequir-1.jpeg'
    ],
    true
  ),
  (
    'naves-industriales-la-polvora',
    'Naves Industriales La Pólvora',
    'Industrial',
    '890 ARQ SpA',
    'Valparaíso (Ruta La Pólvora), Región de Valparaíso.',
    2023,
    3200,
    'Complejo de galpones logísticos de gran luz en estructura metálica reticulada, losas industriales de alta resistencia y patios de maniobra.',
    'Proyecto de infraestructura industrial emplazado en el eje logístico estratégico de Ruta La Pólvora, acceso directo al Puerto de Valparaíso. Contempla el diseño estructural y ejecución de naves industriales de gran altura libre, fundaciones aisladas de hormigón armado, radieres industriales endurecidos superficialmente para tráfico pesado, envolvente termoacústica y redes húmedas/secas contra incendios conforme a normativa OGUC y D.S. N° 594.',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85',
    ARRAY[
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=85'
    ],
    true
  ),
  (
    'regularizacion-comercial-vina-del-mar',
    'Regularización Comercial Viña del Mar',
    'Regularización',
    '890 ARQ Ltda.',
    'Viña del Mar, Región de Valparaíso.',
    2024,
    480,
    'Levantamiento planimétrico, cambio de destino, expediente de carga de ocupación y obtención de Recepción Definitiva y Patente Comercial.',
    'Gestión normativa integral ante la Dirección de Obras Municipales (DOM) de Viña del Mar y SEREMI de Salud para inmueble comercial de tres niveles. El encargo incluyó el levantamiento arquitectónico de precisión, verificación de estabilidad estructural, adecuación a normas de accesibilidad universal (Ley 20.422), estudio de carga de combustible y vías de evacuación para obtención de Recepción Definitiva.',
    '/images/original/card-890-red.png',
    ARRAY[
      '/images/original/card-890-red.png',
      '/images/original/card-zett-red.png',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85'
    ],
    true
  ),
  (
    'vivienda-unifamiliar-quilpue',
    'Vivienda Unifamiliar Quilpué',
    'Arquitectura',
    '890 ARQ Ltda.',
    'Quilpué, Región de Valparaíso.',
    2023,
    245,
    'Arquitectura residencial contemporánea en volúmenes puros de hormigón, acero y madera, optimizando ganancia solar pasiva.',
    'Proyecto de arquitectura y ejecución para vivienda unifamiliar aislada en sector residencial de Quilpué. La propuesta se ordena mediante dos volúmenes ortogonales superpuestos que separan el programa público en planta baja del área privada en el nivel superior, privilegiando materiales nobles de bajo mantenimiento, iluminación natural controlada y vinculación fluida con el terreno.',
    '/images/original/card-camino-agua.png',
    ARRAY[
      '/images/original/card-camino-agua.png',
      '/images/original/card-residencial.png',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
    ],
    true
  ),
  (
    'oficinas-890-arq',
    'Oficinas 890 ARQ & Proyectos Híbridos',
    'Comercial',
    '890 ARQ SpA',
    'Viña del Mar / Valparaíso, Región de Valparaíso.',
    2024,
    320,
    'Habilitación constructiva, remodelación integral de espacios corporativos y supervisión técnica para oficinas profesionales.',
    'Diseño espacial, remodelación interior y ejecución de obra menor para oficinas profesionales y espacios de trabajo colaborativo. El proyecto contempló la reconfiguración de plantas libres, iluminación técnica, mobiliario de obra y tramitación municipal integral.',
    '/images/original/card-zett-red.png',
    ARRAY[
      '/images/original/card-zett-red.png',
      '/images/original/nosotros-oficina.jpeg',
      '/images/original/card-890-red.png'
    ],
    true
  )
ON CONFLICT (slug) DO UPDATE
SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  division = EXCLUDED.division,
  location = EXCLUDED.location,
  year = EXCLUDED.year,
  area_m2 = EXCLUDED.area_m2,
  short_description = EXCLUDED.short_description,
  full_description = EXCLUDED.full_description,
  cover_image_url = EXCLUDED.cover_image_url,
  gallery_urls = EXCLUDED.gallery_urls,
  featured = EXCLUDED.featured;
