export type ProjectCategory = 'Arquitectura' | 'Construcción' | 'Industrial' | 'Regularización' | 'Comercial';

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  division: '890 ARQ Ltda.' | '890 ARQ SpA';
  location: string;
  year: number;
  areaM2?: number;
  shortDescription: string;
  fullDescription: string;
  coverImageUrl: string;
  galleryUrls: string[];
  featured: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  division: '890 ARQ Ltda.' | '890 ARQ SpA' | 'Ambas';
  description: string;
  deliverables: string[];
  iconName: string;
}

export interface ContactPayload {
  fullName: string;
  email: string;
  phone: string;
  serviceType: ProjectCategory | 'Otro';
  locationComuna: string;
  message: string;
}

export interface ActionResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}
