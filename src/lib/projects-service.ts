import { Project, ProjectCategory } from '@/types/domain';
import { MOCK_PROJECTS } from '@/lib/mock-data';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

interface ProjectRow {
  id: string;
  slug: string;
  title: string;
  category: string;
  division: string;
  location: string;
  year: number;
  area_m2: number | null;
  short_description: string;
  full_description: string;
  cover_image_url: string;
  gallery_urls: string[] | null;
  featured: boolean | null;
  created_at?: string;
}

const VALID_CATEGORIES: readonly ProjectCategory[] = [
  'Arquitectura',
  'Construcción',
  'Industrial',
  'Regularización',
  'Comercial',
];

function normalizeCategory(category: string): ProjectCategory {
  if (VALID_CATEGORIES.includes(category as ProjectCategory)) {
    return category as ProjectCategory;
  }
  return 'Arquitectura';
}

function normalizeDivision(division: string): Project['division'] {
  if (division === '890 ARQ SpA') {
    return '890 ARQ SpA';
  }
  return '890 ARQ Ltda.';
}

/**
 * Transforma una fila de PostgreSQL (`public.projects` en snake_case)
 * al contrato estricto `Project` (en camelCase) definido en `src/types/domain.ts`.
 */
function mapProjectRowToDomain(row: ProjectRow): Project {
  const mapped: Project = {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: normalizeCategory(row.category),
    division: normalizeDivision(row.division),
    location: row.location,
    year: Number(row.year),
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    coverImageUrl: row.cover_image_url,
    galleryUrls: Array.isArray(row.gallery_urls) ? row.gallery_urls : [],
    featured: Boolean(row.featured),
  };

  if (typeof row.area_m2 === 'number' && !Number.isNaN(row.area_m2)) {
    mapped.areaM2 = row.area_m2;
  }

  return mapped;
}

/**
 * Obtiene el catálogo completo de proyectos ordenados cronológicamente.
 * Si Supabase no está configurado o la consulta falla, retorna silenciosamente `MOCK_PROJECTS`.
 */
export async function getAllProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured || !supabase) {
    return MOCK_PROJECTS;
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('year', { ascending: false })
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return MOCK_PROJECTS;
    }

    return (data as ProjectRow[]).map(mapProjectRowToDomain);
  } catch {
    return MOCK_PROJECTS;
  }
}

/**
 * Obtiene únicamente los proyectos marcados como destacados (`featured = true`).
 * Si Supabase no está configurado o la consulta falla, retorna los proyectos destacados de `MOCK_PROJECTS`.
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const fallbackFeatured = MOCK_PROJECTS.filter((project) => project.featured);

  if (!isSupabaseConfigured || !supabase) {
    return fallbackFeatured;
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('year', { ascending: false })
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackFeatured;
    }

    return (data as ProjectRow[]).map(mapProjectRowToDomain);
  } catch {
    return fallbackFeatured;
  }
}

/**
 * Busca un proyecto específico por su `slug`.
 * Si Supabase no está configurado, la consulta falla o el registro aún no existe en la nube,
 * busca silenciosamente en `MOCK_PROJECTS`.
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const normalizedSlug = slug.trim();
  if (!normalizedSlug) {
    return null;
  }

  const fallbackProject =
    MOCK_PROJECTS.find((project) => project.slug === normalizedSlug) ?? null;

  if (!isSupabaseConfigured || !supabase) {
    return fallbackProject;
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', normalizedSlug)
      .maybeSingle();

    if (error || !data) {
      return fallbackProject;
    }

    return mapProjectRowToDomain(data as ProjectRow);
  } catch {
    return fallbackProject;
  }
}
