// tipos base del dominio
export type SectionId =
  | "home"
  | "proyectos"
  | "oficina"
  | "contacto"
  | "cotizaciones";

export type CategoryId =
  | "Arquitectura"
  | "Regularización"
  | "Construcción"
  | "Especialidades técnicas"
  | "Viviendas modulares";

export interface CategoryTheme {
  highlightBg: string;
  highlightText: string;
  boxBorder: string;
  boxText: string;
  hoverAccent: string;
}

export type ProjectLayoutVariant =
  | "panoramic-essay"
  | "asymmetric-dossier"
  | "atelier-diptych"
  | "split-monograph"
  | "cinematic-walkthrough"
  | "blueprint-atlas"
  | "minimal-plate"
  | "technical-blueprint"
  | "modular-triptych";

export interface ProjectMediaItem {
  path: string;
  url: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  isDrawing?: boolean;
}

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  code: string;
  prefix: string;
  name: string;
  title: string;
  location: string;
  cardLocation: string;
  area: string;
  category: CategoryId;
  thumbnail: string;
  caseDescription: string;
  architectureRationale?: string;
  specs: ProjectSpec[];
  layout: ProjectLayoutVariant;
  gallery: ProjectMediaItem[];
}

export interface ContactFormPayload {
  nombre: string;
  correo: string;
  asunto: string;
  telefono: string;
  comuna: string;
  mensaje: string;
}

export interface ContactSubmissionPayload extends ContactFormPayload {
  website?: string;
  startedAt?: number;
}
