// tipos base del dominio
export type SectionId = 'home' | 'proyectos' | 'nosotros' | 'contacto' | 'cotizaciones';

export type CategoryId = 'Categoria 1' | 'Categoria 2' | 'Categoria 3' | 'Categoria 4' | 'Categoria 5';

export interface ProjectItem {
  id: string;
  slug: string;
  code: string;
  title: string;
  category: CategoryId;
  verticalLabel: string;
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
