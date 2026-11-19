import { CategoryId, CategoryTheme, ProjectItem } from '@/types/domain';

// categorias oficiales de proyectos segun tipologias
export const CATEGORIES: CategoryId[] = [
  'Arquitectura',
  'Regularización',
  'Construcción',
  'Especialidades técnicas',
  'Viviendas modulares',
];

// paleta por categoria para franja vertical, caja de id y highlight del menu
export const CATEGORY_THEMES: Record<CategoryId, CategoryTheme> = {
  Arquitectura: {
    highlightBg: '#000000',
    highlightText: '#FFFFFF',
    boxBorder: '#000000',
    boxText: '#000000',
    hoverAccent: '#000000',
  },
  Regularización: {
    highlightBg: '#E60000',
    highlightText: '#FFFFFF',
    boxBorder: '#E60000',
    boxText: '#E60000',
    hoverAccent: '#E60000',
  },
  Construcción: {
    highlightBg: '#FFD932',
    highlightText: '#000000',
    boxBorder: '#B08800',
    boxText: '#8A6900',
    hoverAccent: '#D4A700',
  },
  'Especialidades técnicas': {
    highlightBg: '#004D80',
    highlightText: '#FFFFFF',
    boxBorder: '#004D80',
    boxText: '#004D80',
    hoverAccent: '#004D80',
  },
  'Viviendas modulares': {
    highlightBg: '#737373',
    highlightText: '#FFFFFF',
    boxBorder: '#737373',
    boxText: '#737373',
    hoverAccent: '#737373',
  },
};

// listado base de 5 proyectos de ejemplo (un ejemplo por categoria)
export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proyecto-1',
    slug: 'proyecto-1',
    code: '01',
    prefix: 'PROYECTO',
    name: 'EJEMPLO 01',
    title: 'Proyecto Ejemplo 01',
    location: 'Región de Valparaíso.',
    area: '240 m²',
    category: 'Arquitectura',
    thumbnail: '/images/Casa-Camino-del-agua1.jpeg',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam.',
  },
  {
    id: 'proyecto-2',
    slug: 'proyecto-2',
    code: '02',
    prefix: 'PROYECTO',
    name: 'EJEMPLO 02',
    title: 'Proyecto Ejemplo 02',
    location: 'Colliguay, V Región.',
    area: '146 m²',
    category: 'Regularización',
    thumbnail: '/images/CASA-MODULO-F351.jpeg',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 'proyecto-3',
    slug: 'proyecto-3',
    code: '03',
    prefix: 'PROYECTO',
    name: 'EJEMPLO 03',
    title: 'Proyecto Ejemplo 03',
    location: 'Hijuelas, V Región.',
    area: '185 m²',
    category: 'Construcción',
    thumbnail: '/images/Cabanas-Ocoa1.jpeg',
    excerpt:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
  },
  {
    id: 'proyecto-4',
    slug: 'proyecto-4',
    code: '04',
    prefix: 'PROYECTO',
    name: 'EJEMPLO 04',
    title: 'Proyecto Ejemplo 04',
    location: 'Caburgua, IX Región.',
    area: '310 m²',
    category: 'Especialidades técnicas',
    thumbnail: '/images/Casa-Ojos-del-Caburga1.jpeg',
    excerpt:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error.',
  },
  {
    id: 'proyecto-5',
    slug: 'proyecto-5',
    code: '05',
    prefix: 'PROYECTO',
    name: 'EJEMPLO 05',
    title: 'Proyecto Ejemplo 05',
    location: 'Viña del Mar, V Región.',
    area: '861 m²',
    category: 'Viviendas modulares',
    thumbnail: '/images/Proyecto-Codequir1.jpeg',
    excerpt:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
  },
];
