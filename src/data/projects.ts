import { CategoryId, ProjectItem } from '@/types/domain';

// categorias y listado base de proyectos
export const CATEGORIES: CategoryId[] = [
  'Categoria 1',
  'Categoria 2',
  'Categoria 3',
  'Categoria 4',
  'Categoria 5',
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proyecto-1',
    slug: 'proyecto-1',
    code: '01',
    title: 'Proyecto 1',
    category: 'Categoria 1',
    verticalLabel: 'Categoria 1 / Region de Valparaiso',
    thumbnail: '/images/Casa-Camino-del-agua1.jpeg',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam.',
  },
  {
    id: 'proyecto-2',
    slug: 'proyecto-2',
    code: '02',
    title: 'Proyecto 2',
    category: 'Categoria 2',
    verticalLabel: 'Categoria 2 / Region de Valparaiso',
    thumbnail: '/images/CASA-MODULO-F351.jpeg',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 'proyecto-3',
    slug: 'proyecto-3',
    code: '03',
    title: 'Proyecto 3',
    category: 'Categoria 3',
    verticalLabel: 'Categoria 3 / Hijuelas, Ocoa',
    thumbnail: '/images/Cabanas-Ocoa1.jpeg',
    excerpt:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
  },
  {
    id: 'proyecto-4',
    slug: 'proyecto-4',
    code: '04',
    title: 'Proyecto 4',
    category: 'Categoria 4',
    verticalLabel: 'Categoria 4 / Sur de Chile',
    thumbnail: '/images/Casa-Ojos-del-Caburga1.jpeg',
    excerpt:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error.',
  },
  {
    id: 'proyecto-5',
    slug: 'proyecto-5',
    code: '05',
    title: 'Proyecto 5',
    category: 'Categoria 5',
    verticalLabel: 'Categoria 5 / Vina del Mar',
    thumbnail: '/images/Proyecto-Codequir1.jpeg',
    excerpt:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
  },
];
