// tipos base del dominio
export type SectionId = 'home' | 'proyectos' | 'oficina' | 'contacto' | 'cotizaciones';

export type CategoryId =
  | 'Arquitectura'
  | 'Regularización'
  | 'Construcción'
  | 'Especialidades técnicas'
  | 'Viviendas modulares';

export interface CategoryTheme {
  highlightBg: string;
  highlightText: string;
  boxBorder: string;
  boxText: string;
  hoverAccent: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  code: string;
  prefix: string;
  name: string;
  title: string;
  location: string;
  area: string;
  category: CategoryId;
  thumbnail: string;
  excerpt: string;
}

export interface ContactFormPayload {
  nombre: string;
  correo: string;
  asunto: string;
  telefono: string;
  comuna: string;
  mensaje: string;
}
