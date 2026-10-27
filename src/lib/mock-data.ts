import { Project } from '@/types/domain';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-01',
    slug: 'cabanas-ocoa',
    title: 'Cabañas Ocoa',
    category: 'Arquitectura',
    division: '890 ARQ Ltda.',
    location: 'Hijuelas, Región de Valparaíso.',
    year: 2024,
    areaM2: 60,
    shortDescription:
      'Emplazamiento de dos cabañas modulares para uso habitacional con estudio forestal previo y trazado de mínimo impacto en el Valle de Ocoa.',
    fullDescription:
      'El proyecto consiste en emplazar en el terreno dos cabañas para uso habitacional, dentro de su programa se contempla un área para quincho como también la habilitación de un área de huella para camino peatonal y vehicula. Previamente a la definición del emplazamiento final se realizó un estudio forestal para el caso, el cual entregaba como resultado un Informe Técnico cuya evaluación permitió reconocer las áreas de menos riesgo considerando las particularidades del terreno y su emplazamiento. La inspección técnica además contempló el levantamiento de la vegetación existente y el planteo de la obra civil considerando el mínimo de intervención, removiéndose especies que no se encuentran actualmente protegidas por la legislación forestal, intervención que no requiere de un plan de manejo ante la Corporación Nacional Forestal, nativos o de formaciones xerofíticas.',
    coverImageUrl: '/images/original/ocoa-principal.jpeg',
    galleryUrls: [
      '/images/original/ocoa-exteriores.jpeg',
      '/images/original/ocoa-interiores.jpeg',
      '/images/original/ocoa-elevaciones.jpeg',
      '/images/original/ocoa-plantas.png',
    ],
    featured: true,
  },
  {
    id: 'proj-02',
    slug: 'edificio-codequir',
    title: 'Edificio Codequir',
    category: 'Construcción',
    division: '890 ARQ SpA',
    location: 'Quilpué, Región de Valparaíso.',
    year: 2024,
    areaM2: 1450,
    shortDescription:
      'Edificación y equipamiento de escala intermedia con coordinación integral de especialidades y ejecución de obra civil.',
    fullDescription:
      'Desarrollo arquitectónico, constructivo y gerenciamiento técnico integral para el Proyecto Codequir. La obra contempla una estructura sismorresistente diseñada para albergar equipamiento y unidades habitacionales/corporativas. El alcance de 890 ARQ abarcó el levantamiento, diseño planimétrico de plantas y elevaciones, planificación de obra, coordinación de especialidades y tramitación municipal ante la Dirección de Obras Municipales.',
    coverImageUrl: '/images/original/codequir-1.jpeg',
    galleryUrls: [
      '/images/original/codequir-3.jpeg',
      '/images/original/codequir-4.jpeg',
      '/images/original/codequir-2.jpeg',
      '/images/original/codequir-1.jpeg',
    ],
    featured: true,
  },
  {
    id: 'proj-03',
    slug: 'naves-industriales-la-polvora',
    title: 'Naves Industriales La Pólvora',
    category: 'Industrial',
    division: '890 ARQ SpA',
    location: 'Valparaíso (Ruta La Pólvora), Región de Valparaíso.',
    year: 2023,
    areaM2: 3200,
    shortDescription:
      'Complejo de galpones logísticos de gran luz en estructura metálica reticulada, losas industriales de alta resistencia y patios de maniobra.',
    fullDescription:
      'Proyecto de infraestructura industrial emplazado en el eje logístico estratégico de Ruta La Pólvora, acceso directo al Puerto de Valparaíso. Contempla el diseño estructural y ejecución de naves industriales de gran altura libre, fundaciones aisladas de hormigón armado, radieres industriales endurecidos superficialmente para tráfico pesado, envolvente termoacústica y redes húmedas/secas contra incendios conforme a normativa OGUC y D.S. N° 594.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85',
    galleryUrls: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=85',
    ],
    featured: true,
  },
  {
    id: 'proj-04',
    slug: 'regularizacion-comercial-vina-del-mar',
    title: 'Regularización Comercial Viña del Mar',
    category: 'Regularización',
    division: '890 ARQ Ltda.',
    location: 'Viña del Mar, Región de Valparaíso.',
    year: 2024,
    areaM2: 480,
    shortDescription:
      'Levantamiento planimétrico, cambio de destino, expediente de carga de ocupación y obtención de Recepción Definitiva y Patente Comercial.',
    fullDescription:
      'Gestión normativa integral ante la Dirección de Obras Municipales (DOM) de Viña del Mar y SEREMI de Salud para inmueble comercial de tres niveles. El encargo incluyó el levantamiento arquitectónico de precisión, verificación de estabilidad estructural, adecuación a normas de accesibilidad universal (Ley 20.422), estudio de carga de combustible y vías de evacuación para obtención de Recepción Definitiva.',
    coverImageUrl: '/images/original/card-890-red.png',
    galleryUrls: [
      '/images/original/card-890-red.png',
      '/images/original/card-zett-red.png',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85',
    ],
    featured: true,
  },
  {
    id: 'proj-05',
    slug: 'vivienda-unifamiliar-quilpue',
    title: 'Vivienda Unifamiliar Quilpué',
    category: 'Arquitectura',
    division: '890 ARQ Ltda.',
    location: 'Quilpué, Región de Valparaíso.',
    year: 2023,
    areaM2: 245,
    shortDescription:
      'Arquitectura residencial contemporánea en volúmenes puros de hormigón, acero y madera, optimizando ganancia solar pasiva.',
    fullDescription:
      'Proyecto de arquitectura y ejecución para vivienda unifamiliar aislada en sector residencial de Quilpué. La propuesta se ordena mediante dos volúmenes ortogonales superpuestos que separan el programa público en planta baja del área privada en el nivel superior, privilegiando materiales nobles de bajo mantenimiento, iluminación natural controlada y vinculación fluida con el terreno.',
    coverImageUrl: '/images/original/card-camino-agua.png',
    galleryUrls: [
      '/images/original/card-camino-agua.png',
      '/images/original/card-residencial.png',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    ],
    featured: true,
  },
  {
    id: 'proj-06',
    slug: 'oficinas-890-arq',
    title: 'Oficinas 890 ARQ & Proyectos Híbridos',
    category: 'Comercial',
    division: '890 ARQ SpA',
    location: 'Viña del Mar / Valparaíso, Región de Valparaíso.',
    year: 2024,
    areaM2: 320,
    shortDescription:
      'Habilitación constructiva, remodelación integral de espacios corporativos y supervisión técnica para oficinas profesionales.',
    fullDescription:
      'Diseño espacial, remodelación interior y ejecución de obra menor para oficinas profesionales y espacios de trabajo colaborativo. El proyecto contempló la reconfiguración de plantas libres, iluminación técnica, mobiliario de obra y tramitación municipal integral.',
    coverImageUrl: '/images/original/card-zett-red.png',
    galleryUrls: [
      '/images/original/card-zett-red.png',
      '/images/original/nosotros-oficina.jpeg',
      '/images/original/card-890-red.png',
    ],
    featured: true,
  },
];
