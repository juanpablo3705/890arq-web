import { getStorageUrl } from "@/lib/supabase";
import {
  CategoryId,
  CategoryTheme,
  ProjectItem,
  ProjectMediaItem,
} from "@/types/domain";

// categorias oficiales de proyectos segun tipologias
export const CATEGORIES: CategoryId[] = [
  "Arquitectura",
  "Regularización",
  "Construcción",
  "Especialidades técnicas",
  "Viviendas modulares",
];

// paleta por categoria para franja vertical, caja de id y highlight del menu
export const CATEGORY_THEMES: Record<CategoryId, CategoryTheme> = {
  Arquitectura: {
    highlightBg: "#000000",
    highlightText: "#FFFFFF",
    boxBorder: "#000000",
    boxText: "#000000",
    hoverAccent: "#000000",
  },
  Regularización: {
    highlightBg: "#E60000",
    highlightText: "#FFFFFF",
    boxBorder: "#E60000",
    boxText: "#E60000",
    hoverAccent: "#E60000",
  },
  Construcción: {
    highlightBg: "#FFD932",
    highlightText: "#000000",
    boxBorder: "#B08800",
    boxText: "#8A6900",
    hoverAccent: "#D4A700",
  },
  "Especialidades técnicas": {
    highlightBg: "#004D80",
    highlightText: "#FFFFFF",
    boxBorder: "#004D80",
    boxText: "#004D80",
    hoverAccent: "#004D80",
  },
  "Viviendas modulares": {
    highlightBg: "#737373",
    highlightText: "#FFFFFF",
    boxBorder: "#737373",
    boxText: "#737373",
    hoverAccent: "#737373",
  },
};

function media(
  path: string,
  alt: string,
  width: number,
  height: number,
  options?: { caption?: string; isDrawing?: boolean }
): ProjectMediaItem {
  return {
    path,
    url: getStorageUrl(path),
    alt,
    caption: options?.caption,
    width,
    height,
    isDrawing: options?.isDrawing,
  };
}

// catalogo oficial de 30 proyectos articulado desde texto final proyectos.pdf
export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "proyecto-01",
    slug: "proyecto-01",
    code: "01",
    prefix: "CASA",
    name: "BARRIO CAMPESTRE",
    title: "Casa Barrio Campestre",
    location: "La Cruz, Región de Valparaíso, Chile",
    cardLocation: "La Cruz, V Región",
    area: "138 m²",
    category: "Arquitectura",
    thumbnail: getStorageUrl("portadas/01.webp"),
    caseDescription:
      "Proyecto de vivienda unifamiliar emplazado en un entorno rural arbolado, donde cobra especial relevancia la relación de la edificación con el espacio exterior inmediato. La ejecución contempló la tramitación municipal integral, abarcando la solicitud de permisos ante la SEREMI para terrenos de carácter rural, la obtención del Permiso de Obra y su posterior Recepción Definitiva, cumpliendo rigurosamente con los estándares de la Ordenanza General de Urbanismo y Construcciones (OGUC).",
    architectureRationale:
      "El partido general se compone de dos volúmenes principales articulados por un eje de circulación que envuelve un patio central en su punto de intersección. El primer volumen alberga las zonas sociales —cocina, estar, áreas de servicio y logia—, mientras que el segundo contiene el programa privado de dormitorios. La volumetría orienta sus visuales de manera preferente hacia el exterior y el entorno natural del cerro La Campana.",
    specs: [
      { label: "Ubicación", value: "La Cruz, Región de Valparaíso" },
      { label: "Superficie", value: "138 m²" },
      {
        label: "Estructura",
        value: "Sistema mixto (Hormigón armado, paneles SIP y Metalcon)",
      },
    ],
    layout: "panoramic-essay",
    gallery: [
      media(
        "proyecto-01/01.webp",
        "Maqueta volumétrica Casa Barrio Campestre",
        1800,
        1125,
        { caption: "Maqueta volumétrica de conjunto" }
      ),
      media(
        "proyecto-01/02.webp",
        "Planta de arquitectura Casa Barrio Campestre",
        1024,
        1280,
        { caption: "Planta general y patio central", isDrawing: true }
      ),
      media(
        "proyecto-01/03.webp",
        "Vistas exteriores y croquis interiores Casa Barrio Campestre",
        2100,
        875,
        { caption: "Imaginario exterior y croquis espaciales" }
      ),
      media(
        "proyecto-01/04.webp",
        "Elevaciones exteriores Casa Barrio Campestre",
        1024,
        1280,
        { caption: "Elevaciones exteriores", isDrawing: true }
      ),
    ],
  },
  {
    id: "proyecto-02",
    slug: "proyecto-02",
    code: "02",
    prefix: "CASA",
    name: "OJOS DEL CABURGA",
    title: "Casa Ojos del Caburga",
    location: "Pucón, Región de la Araucanía, Chile",
    cardLocation: "Pucón, IX Región",
    area: "80 m²",
    category: "Arquitectura",
    thumbnail: getStorageUrl("portadas/02.webp"),
    caseDescription:
      "Proyecto de vivienda unifamiliar desarrollado en una sola planta estructurada en hormigón armado. El programa se divide en dos volúmenes: el primero contiene los espacios comunes (cocina, despensa, servicios y un estar orientado hacia el volcán), mientras que el segundo, situado a un nivel inferior y conectado mediante un pasillo translúcido, acoge el área privada. Los recintos establecen una conexión visual directa con el paisaje circundante a través de vanos de doble altura.",
    architectureRationale:
      "La partición volumétrica en dos cuerpos separados por un recorrido translúcido busca enmarcar los bosques nativos mediante proporciones verticales continuas. Este recurso genera un diálogo constante entre el interior doméstico y el exterior natural, materializado a través de la transición espacial que provee el corredor de conexión.",
    specs: [
      { label: "Ubicación", value: "Pucón, Región de la Araucanía" },
      { label: "Superficie", value: "80 m²" },
      { label: "Estructura", value: "Hormigón armado" },
    ],
    layout: "asymmetric-dossier",
    gallery: [
      media(
        "proyecto-02/01.webp",
        "Vista general Casa Ojos del Caburga en bosque nativo",
        1800,
        1125,
        { caption: "Emplazamiento en bosque nativo" }
      ),
      media(
        "proyecto-02/02.webp",
        "Elevaciones longitudinales Casa Ojos del Caburga",
        1800,
        1125,
        { caption: "Elevaciones longitudinales", isDrawing: true }
      ),
      media(
        "proyecto-02/03.webp",
        "Planta de arquitectura Casa Ojos del Caburga",
        1800,
        1125,
        { caption: "Planta en dos volúmenes", isDrawing: true }
      ),
      media(
        "proyecto-02/04.webp",
        "Axonometrías volumétricas Casa Ojos del Caburga",
        1800,
        1125,
        { caption: "Axonometrías volumétricas", isDrawing: true }
      ),
      media(
        "proyecto-02/05.webp",
        "Despiece axonométrico Casa Ojos del Caburga",
        1080,
        1350,
        { caption: "Despiece estructural", isDrawing: true }
      ),
    ],
  },
  {
    id: "proyecto-03",
    slug: "proyecto-03",
    code: "03",
    prefix: "CASA",
    name: "CAMINO DEL AGUA",
    title: "Casa Camino del Agua",
    location: "Curauma, Región de Valparaíso, Chile",
    cardLocation: "Curauma, V Región",
    area: "450 m²",
    category: "Arquitectura",
    thumbnail: getStorageUrl("portadas/03.webp"),
    caseDescription:
      "Edificación residencial desarrollada en tres niveles que aprovecha la topografía en pendiente del lote para integrarse de manera natural al bosque y a la quebrada. El programa arquitectónico comprende un nivel subterráneo destinado a estacionamientos en hormigón armado, un segundo nivel para las áreas sociales y un tercer nivel enfocado en el programa habitacional privado.",
    architectureRationale:
      "La cimentación mixta combina losas continuas de hormigón con machones y pilares de soporte a compresión, garantizando la estabilidad de los volúmenes superiores. Un sistema de terrazas escalonadas acopla la edificación a la topografía del terreno, facilitando las circulaciones verticales y otorgando continuidad a la totalidad de la obra.",
    specs: [
      { label: "Ubicación", value: "Curauma, Región de Valparaíso" },
      { label: "Superficie", value: "450 m²" },
      { label: "Estructura", value: "Hormigón armado y acero" },
    ],
    layout: "panoramic-essay",
    gallery: [
      media(
        "proyecto-03/03.webp",
        "Vista exterior atardecer Casa Camino del Agua",
        1365,
        768,
        { caption: "Volumetría escalonada en pendiente" }
      ),
      media(
        "proyecto-03/01.webp",
        "Secuencia de recintos interiores Casa Camino del Agua",
        1365,
        768,
        { caption: "Recintos sociales y vistas a la quebrada" }
      ),
      media(
        "proyecto-03/02.webp",
        "Terrazas exteriores Casa Camino del Agua",
        1365,
        768,
        { caption: "Sistema de terrazas escalonadas" }
      ),
      media(
        "proyecto-03/04.webp",
        "Plantas de arquitectura Casa Camino del Agua",
        1920,
        1080,
        { caption: "Plantas por nivel", isDrawing: true }
      ),
      media(
        "proyecto-03/05.webp",
        "Cortes topográficos Casa Camino del Agua",
        1920,
        1080,
        { caption: "Cortes y relación con pendiente", isDrawing: true }
      ),
      media(
        "proyecto-03/06.webp",
        "Elevaciones Casa Camino del Agua",
        1920,
        1080,
        { caption: "Elevaciones principales", isDrawing: true }
      ),
    ],
  },
  {
    id: "proyecto-04",
    slug: "proyecto-04",
    code: "04",
    prefix: "REMODELACIÓN",
    name: "RESTAURANTE SALVATORE",
    title: "Remodelación Restaurante Salvatore",
    location: "Quilpué, Región de Valparaíso, Chile",
    cardLocation: "Quilpué, V Región",
    area: "82 m²",
    category: "Arquitectura",
    thumbnail: getStorageUrl("portadas/04.webp"),
    caseDescription:
      "Remodelación y habilitación del área exterior para un restaurante emplazado en un sector residencial. La intervención consistió en el retiro de la cubierta existente, conservando la estructura de pilares de ladrillo original. Se diseñó una nueva techumbre mixta con marcos y vigas metálicas, complementada con una estructura secundaria de madera y un coronamiento de marcos horizontales en perfilería metálica con malla Medestuk para instalación de iluminación y paisajismo interior.",
    architectureRationale:
      "Se proyectó una techumbre modular y estructuralmente ligera, dimensionada de acuerdo con los intercolumnios de los pilares de ladrillo existentes. El montaje optimizó los tiempos de obra mediante el uso de placas metálicas y planchas de policarbonato, permitiendo el ingreso controlado de luz natural hacia el patio central.",
    specs: [
      { label: "Ubicación", value: "Quilpué, Región de Valparaíso" },
      { label: "Superficie", value: "82 m²" },
      { label: "Estructura", value: "Acero y madera" },
    ],
    layout: "atelier-diptych",
    gallery: [
      media(
        "proyecto-04/01.webp",
        "Patio cubierto Restaurante Salvatore",
        1800,
        1125,
        { caption: "Habilitación patio central cubierto" }
      ),
      media(
        "proyecto-04/02.webp",
        "Despiece de techumbre y estructura mixta Restaurante Salvatore",
        1800,
        1125,
        { caption: "Sistema de cubierta mixta acero-madera" }
      ),
      media(
        "proyecto-04/03.webp",
        "Detalles constructivos Restaurante Salvatore",
        1800,
        1125,
        { caption: "Detalles constructivos y uniones", isDrawing: true }
      ),
      media(
        "proyecto-04/04.webp",
        "Registro de montaje estructural en obra Restaurante Salvatore",
        1080,
        1350,
        { caption: "Montaje de marcos metálicos en obra" }
      ),
    ],
  },
  {
    id: "proyecto-05",
    slug: "proyecto-05",
    code: "05",
    prefix: "CABAÑAS",
    name: "OCOA",
    title: "Cabañas Ocoa",
    location: "Hijuelas, Región de Valparaíso, Chile",
    cardLocation: "Hijuelas, V Región",
    area: "68 m²",
    category: "Arquitectura",
    thumbnail: getStorageUrl("portadas/05.webp"),
    caseDescription:
      "Proyecto de arquitectura habitacional que contempla la construcción de dos cabañas y un área de quincho, incluyendo el trazado de huellas para accesos peatonales y vehiculares. Previo al emplazamiento, se ejecutó un estudio forestal e informe técnico para determinar las zonas de menor riesgo, minimizando la intervención sobre la vegetación nativa y removiendo exclusivamente especies no protegidas.",
    architectureRationale:
      "La volumetría orienta sus aperturas principales hacia el cerro La Campana, respondiendo a la riqueza paisajística del entorno. Formalmente, las unidades responden a una tipología de diseño modular de fácil montaje para los marcos estructurales de muros y techumbre.",
    specs: [
      { label: "Ubicación", value: "Hijuelas, Región de Valparaíso" },
      { label: "Superficie", value: "68 m²" },
      { label: "Estructura", value: "Acero y madera" },
    ],
    layout: "atelier-diptych",
    gallery: [
      media(
        "proyecto-05/02.webp",
        "Vistas exteriores conjunto Cabañas Ocoa",
        1700,
        956,
        { caption: "Implantación en el entorno natural" }
      ),
      media(
        "proyecto-05/03.webp",
        "Interiores y aperturas Cabañas Ocoa",
        1700,
        956,
        { caption: "Espacio interior y vistas al cerro La Campana" }
      ),
      media(
        "proyecto-05/01.webp",
        "Planimetría general Cabañas Ocoa",
        1920,
        1080,
        { caption: "Plantas y elevaciones", isDrawing: true }
      ),
    ],
  },
  {
    id: "proyecto-06",
    slug: "proyecto-06",
    code: "06",
    prefix: "PROYECTO",
    name: "VALIRIS",
    title: "Proyecto Valiris",
    location: "Gómez Carreño, Viña del Mar, Región de Valparaíso, Chile",
    cardLocation: "Viña del Mar, V Región",
    area: "139,4 m²",
    category: "Arquitectura",
    thumbnail: getStorageUrl("portadas/06.webp"),
    caseDescription:
      "Remodelación completa de una propiedad con fines de inversión inmobiliaria, ubicada en un sector consolidado y con buena conectividad, cercano a servicios y comercio. El proyecto busca renovar una vivienda social existente, aprovechando mejor sus espacios y mejorando sus condiciones de habitabilidad, con el objetivo de aumentar su atractivo y rentabilidad comercial.",
    architectureRationale:
      "La propiedad original constaba de dos volúmenes de 25 m² separados por un patio central. La condición de emplazamiento en esquina, sumada a las normativas urbanísticas vigentes, definió una nueva volumetría que reinterpreta y contextualiza el lenguaje de la fachada en consonancia con el vecindario.",
    specs: [
      { label: "Ubicación", value: "Gómez Carreño, Viña del Mar" },
      { label: "Superficie", value: "139,4 m²" },
      { label: "Estructura", value: "Metalcon" },
    ],
    layout: "split-monograph",
    gallery: [
      media(
        "proyecto-06/02.webp",
        "Fachada esquina y celosías Proyecto Valiris",
        1080,
        1350,
        { caption: "Fachada esquina y relectura material" }
      ),
      media(
        "proyecto-06/01.webp",
        "Recorrido interior y patio central Proyecto Valiris",
        2100,
        875,
        { caption: "Espacios interiores y doble altura" }
      ),
      media(
        "proyecto-06/03.webp",
        "Plantas de arquitectura Proyecto Valiris",
        1080,
        1350,
        { caption: "Plantas primer y segundo nivel", isDrawing: true }
      ),
      media(
        "proyecto-06/04.webp",
        "Cortes y axonometrías Proyecto Valiris",
        1800,
        1125,
        { caption: "Axonometrías seccionadas y elevaciones", isDrawing: true }
      ),
    ],
  },
  {
    id: "proyecto-07",
    slug: "proyecto-07",
    code: "07",
    prefix: "CASA",
    name: "QUEBRADA PLACILLA",
    title: "Casa Quebrada Placilla",
    location: "Placilla, Región de Valparaíso, Chile",
    cardLocation: "Placilla, V Región",
    area: "140 m²",
    category: "Arquitectura",
    thumbnail: getStorageUrl("portadas/07.webp"),
    caseDescription:
      "Vivienda unifamiliar de dos volúmenes articulados que organiza su programa en dos niveles: una primera planta de carácter social con estar, comedor y cocina integrada, y un segundo nivel que alberga las habitaciones y un estar familiar vinculado a una doble altura.",
    architectureRationale:
      "El proyecto se organiza en torno a un patio de luz central que articula espacial, lumínica y estructuralmente los recintos comunes. Este vacío es abrazado por una escalera principal que conecta de manera fluida el acceso en medio nivel, descendiendo hacia el estar o ascendiendo hacia el área privada.",
    specs: [
      { label: "Ubicación", value: "Placilla, Región de Valparaíso" },
      { label: "Superficie", value: "140 m²" },
      { label: "Estructura", value: "Acero y Metalcon" },
    ],
    layout: "cinematic-walkthrough",
    gallery: [
      media(
        "proyecto-07/01.webp",
        "Fachada principal Casa Quebrada Placilla",
        1700,
        561,
        { caption: "Fachada principal y acceso cubierto" }
      ),
      media(
        "proyecto-07/02.webp",
        "Hall de acceso Casa Quebrada Placilla",
        1700,
        829
      ),
      media(
        "proyecto-07/03.webp",
        "Estar principal en doble altura Casa Quebrada Placilla",
        1700,
        743
      ),
      media(
        "proyecto-07/04.webp",
        "Comedor y cocina integrada Casa Quebrada Placilla",
        1700,
        829
      ),
      media(
        "proyecto-07/05.webp",
        "Relación cocina comedor Casa Quebrada Placilla",
        1700,
        829
      ),
      media(
        "proyecto-07/06.webp",
        "Escalera y patio de luz central Casa Quebrada Placilla",
        1700,
        827
      ),
      media(
        "proyecto-07/07.webp",
        "Estar familiar segundo nivel Casa Quebrada Placilla",
        1700,
        823
      ),
      media(
        "proyecto-07/08.webp",
        "Dormitorio principal Casa Quebrada Placilla",
        1700,
        832
      ),
      media(
        "proyecto-07/09.webp",
        "Baño principal Casa Quebrada Placilla",
        1700,
        826
      ),
      media(
        "proyecto-07/10.webp",
        "Baño secundario Casa Quebrada Placilla",
        1700,
        834
      ),
    ],
  },
  {
    id: "proyecto-08",
    slug: "proyecto-08",
    code: "08",
    prefix: "EDIFICIO",
    name: "CODEQUIR",
    title: "Edificio Codequir",
    location: "El Almendral, Región de Valparaíso, Chile",
    cardLocation: "El Almendral, Valparaíso",
    area: "3.012 m²",
    category: "Arquitectura",
    thumbnail: getStorageUrl("portadas/08.webp"),
    caseDescription:
      "Edificio de uso mixto que contempla un programa comercial de supermercado y oficinas administrativas en su primera planta, complementado por dos niveles superiores destinados a unidades habitacionales orientadas a la venta o renta.",
    architectureRationale:
      "El diseño responde a la morfología del barrio histórico, caracterizado por zócalos comerciales activos que consolidan la identidad urbana del sector. La volumetría se ajusta a la altura predominante del contexto inmediato, estableciendo un paramento continuo de tres niveles.",
    specs: [
      { label: "Ubicación", value: "El Almendral, Valparaíso" },
      { label: "Superficie", value: "3.012 m²" },
      { label: "Estructura", value: "Hormigón armado y acero" },
    ],
    layout: "asymmetric-dossier",
    gallery: [
      media(
        "proyecto-08/01.webp",
        "Atrio y pasarelas interiores Edificio Codequir",
        1536,
        1024,
        { caption: "Atrio interior y circulaciones elevadas" }
      ),
      media(
        "proyecto-08/02.webp",
        "Recorrido de áreas comunes Edificio Codequir",
        1365,
        768,
        { caption: "Zócalo comercial y unidades superiores" }
      ),
      media(
        "proyecto-08/03.webp",
        "Axonometría por niveles Edificio Codequir",
        1920,
        1080,
        { caption: "Axonometría programática", isDrawing: true }
      ),
      media(
        "proyecto-08/04.webp",
        "Esquema de distribución por planta Edificio Codequir",
        1920,
        1080,
        { caption: "Distribución por niveles", isDrawing: true }
      ),
    ],
  },
  {
    id: "proyecto-09",
    slug: "proyecto-09",
    code: "09",
    prefix: "DE LA VIVIENDA",
    name: "AL AULA",
    title: "De la Vivienda al Aula: Unidades Domésticas para la Ciudad",
    location: "Villa Perú, La Florida, Santiago, Chile",
    cardLocation: "La Florida, Santiago",
    area: "Tesis proyectual",
    category: "Arquitectura",
    thumbnail: getStorageUrl("portadas/09.webp"),
    caseDescription:
      "Propuesta de investigación y proyecto arquitectónico que analiza la interacción entre la vivienda colectiva y el espacio educativo como piezas fundamentales de la infraestructura urbana. La iniciativa examina cómo la integración programática de la educación pública puede aportar beneficios sociales, espaciales y recreativos al entorno residencial.",
    architectureRationale:
      "Se concibe la arquitectura escolar no como un recinto aislado, sino como una extensión de la vida doméstica y un recurso estratégico del espacio público. El proyecto cuestiona la clausura de la planta física educacional, proponiendo un sistema modular que articula el hábitat residencial con el espacio pedagógico.",
    specs: [
      { label: "Ubicación", value: "Villa Perú, La Florida, Santiago" },
      { label: "Alcance", value: "Proyecto de investigación / Tesis proyectual" },
      { label: "Estructura", value: "Sistema modular integrado" },
    ],
    layout: "blueprint-atlas",
    gallery: [
      media(
        "proyecto-09/01.webp",
        "Axonometría urbana Conjunto Villa Perú",
        1920,
        1080,
        { caption: "Axonometría urbana de conjunto", isDrawing: true }
      ),
      media(
        "proyecto-09/02.webp",
        "Corte longitudinal e integración urbana",
        1920,
        1080,
        { caption: "Sección longitudinal y espacio público", isDrawing: true }
      ),
      media(
        "proyecto-09/03.webp",
        "Planta programática vivienda y aula",
        1920,
        1080,
        { caption: "Articulación residencial y pedagógica", isDrawing: true }
      ),
    ],
  },
  {
    id: "proyecto-10",
    slug: "proyecto-10",
    code: "10",
    prefix: "VIVIENDA",
    name: "EL RETIRO",
    title: "Vivienda El Retiro",
    location: "Olmué, Región de Valparaíso, Chile",
    cardLocation: "Olmué, V Región",
    area: "257 m²",
    category: "Arquitectura",
    thumbnail: getStorageUrl("portadas/10.webp"),
    caseDescription:
      "Ampliación y reconversión de una vivienda de uso recreativo temporal hacia un régimen de residencia permanente. El proyecto reutiliza el núcleo original como zona de servicios y cocina, adosando un nuevo cuerpo que contempla estar y comedor en el primer piso, junto a cuatro dormitorios, baños y una suite principal con baño privado y walk-in closet en el segundo nivel.",
    architectureRationale:
      "El primer piso presenta un desnivel programático entre el estar y el comedor que otorga mayor espacialidad, manteniendo a la vista pilares y vigas de hormigón. La circulación vertical se resuelve mediante una escalera exenta que atraviesa un vacío a doble altura, conectando con una sala de estar superior que distribuye hacia las habitaciones.",
    specs: [
      { label: "Ubicación", value: "Olmué, Región de Valparaíso" },
      { label: "Superficie", value: "257 m²" },
      { label: "Estructura", value: "Hormigón armado y paneles SIP" },
    ],
    layout: "split-monograph",
    gallery: [
      media(
        "proyecto-10/01.webp",
        "Vacío a doble altura y atrio interior Vivienda El Retiro",
        1700,
        845,
        { caption: "Vacío a doble altura y circulación vertical" }
      ),
      media(
        "proyecto-10/02.webp",
        "Vista exterior de la vivienda ampliada El Retiro",
        1800,
        1125,
        { caption: "Volumetría exterior en pendiente" }
      ),
      media(
        "proyecto-10/03.webp",
        "Plantas primer y segundo nivel Vivienda El Retiro",
        1800,
        1125,
        { caption: "Plantas primer y segundo nivel", isDrawing: true }
      ),
      media(
        "proyecto-10/04.webp",
        "Elevaciones y cortes longitudinales Vivienda El Retiro",
        2100,
        875,
        { caption: "Elevaciones y cortes", isDrawing: true }
      ),
    ],
  },
  {
    id: "proyecto-11",
    slug: "proyecto-11",
    code: "11",
    prefix: "GALPONES",
    name: "TRANSPORTES LAGOS",
    title: "Galpones Empresa de Transportes Lagos",
    location: "Placilla de Peñuelas, Región de Valparaíso, Chile",
    cardLocation: "Placilla de Peñuelas",
    area: "2.000 m²",
    category: "Regularización",
    thumbnail: getStorageUrl("portadas/11.webp"),
    caseDescription:
      "Proyecto de diseño, proyección y regularización de dos galpones industriales de 1.000 m² cada uno, emplazados en el sector de la Carretera La Pólvora. El desarrollo contempló la resolución integral de las exigencias técnicas, normativas y urbanísticas propias de instalaciones de carácter industrial y logístico.",
    specs: [
      { label: "Ubicación", value: "Placilla de Peñuelas, Valparaíso" },
      { label: "Superficie", value: "2.000 m² (2 galpones de 1.000 m²)" },
      { label: "Alcance", value: "Diseño, proyección y regularización" },
    ],
    layout: "blueprint-atlas",
    gallery: [
      media(
        "proyecto-11/01.webp",
        "Lámina 1 emplazamiento y cuadro de superficies",
        2000,
        1413,
        { caption: "L1 — Emplazamiento, ubicación y cuadro de superficies", isDrawing: true }
      ),
      media(
        "proyecto-11/02.webp",
        "Lámina 2 planta de arquitectura galpones",
        2000,
        1413,
        { caption: "L2 — Planta de arquitectura", isDrawing: true }
      ),
      media(
        "proyecto-11/03.webp",
        "Lámina 4 planta estructura de techumbre",
        2000,
        1413,
        { caption: "L4 — Planta estructura de techumbre", isDrawing: true }
      ),
      media(
        "proyecto-11/04.webp",
        "Lámina 7 elevaciones galpón 2",
        2000,
        1413,
        { caption: "L7 — Elevaciones", isDrawing: true }
      ),
      media(
        "proyecto-11/05.webp",
        "Lámina 8 cortes generales",
        2000,
        1413,
        { caption: "L8 — Cortes estructurales", isDrawing: true }
      ),
    ],
  },
  {
    id: "proyecto-12",
    slug: "proyecto-12",
    code: "12",
    prefix: "FUSIÓN",
    name: "PARCELAS RUTA F-98",
    title: "Fusión Parcelas Ruta F-98",
    location: "Placilla de Peñuelas, Región de Valparaíso, Chile",
    cardLocation: "Placilla de Peñuelas",
    area: "20.000 m²",
    category: "Regularización",
    thumbnail: getStorageUrl("portadas/12.webp"),
    caseDescription:
      "Proyecto de fusión inmobiliaria para cuatro parcelas de 5.000 m² cada una, ubicadas en un área de expansión urbana. Se ejecutaron estudios normativos de cabida y factibilidad, considerando las variables espaciales, legales y urbanísticas del sector.",
    specs: [
      { label: "Ubicación", value: "Placilla de Peñuelas, Valparaíso" },
      { label: "Superficie", value: "20.000 m² (4 parcelas de 5.000 m²)" },
      { label: "Alcance", value: "Fusión predial y estudio de cabida" },
    ],
    layout: "minimal-plate",
    gallery: [
      media(
        "proyecto-12/01.webp",
        "Plano situación existente parcelas Ruta F-98",
        2000,
        1409,
        { caption: "Lámina 01 — Situación predial existente", isDrawing: true }
      ),
      media(
        "proyecto-12/02.webp",
        "Plano fusión propuesta parcelas Ruta F-98",
        2000,
        1414,
        { caption: "Lámina 02 — Fusión predial propuesta", isDrawing: true }
      ),
    ],
  },
  {
    id: "proyecto-13",
    slug: "proyecto-13",
    code: "13",
    prefix: "SUBDIVISIÓN",
    name: "BOCO",
    title: "Subdivisión Boco",
    location: "Boco, Quillota, Región de Valparaíso, Chile",
    cardLocation: "Boco, Quillota",
    area: "Subdivisión predial",
    category: "Regularización",
    thumbnail: getStorageUrl("portadas/13.webp"),
    caseDescription:
      "Proyecto de subdivisión de predio rústico particular. Se gestionaron todas las etapas técnicas y administrativas requeridas para la aprobación sectorial ante el SAG, SEREMI de Vivienda y Urbanismo, SEREMI de Agricultura, Dirección de Obras Municipales (DOM), Conservador de Bienes Raíces, y su inscripción final en el Servicio de Impuestos Internos (SII).",
    specs: [
      { label: "Ubicación", value: "Boco, Quillota, Región de Valparaíso" },
      { label: "Gestión", value: "SAG · SEREMI · DOM · CBR · SII" },
    ],
    layout: "minimal-plate",
    gallery: [
      media(
        "proyecto-13/01.webp",
        "Plano de subdivisión predial Boco Quillota",
        2000,
        1414,
        { caption: "Plano de subdivisión predial aprobado", isDrawing: true }
      ),
    ],
  },
  {
    id: "proyecto-14",
    slug: "proyecto-14",
    code: "14",
    prefix: "VIVIENDA",
    name: "VALLE DEL ESTERO",
    title: "Vivienda Unifamiliar Valle del Estero",
    location: "Zapallar, Región de Valparaíso, Chile",
    cardLocation: "Zapallar, V Región",
    area: "Regularización integral",
    category: "Regularización",
    thumbnail: getStorageUrl("portadas/14.webp"),
    caseDescription:
      "Regularización y diseño integral de vivienda unifamiliar. El encargo incluyó el desarrollo del proyecto de arquitectura, especialidad hidrosanitaria y estructural, gestionando de manera exitosa la aprobación ante la SEREMI y la Dirección de Obras de la Municipalidad de Zapallar.",
    specs: [
      { label: "Ubicación", value: "Zapallar, Región de Valparaíso" },
      { label: "Especialidades", value: "Arquitectura, estructura e hidrosanitaria" },
      { label: "Aprobación", value: "SEREMI y DOM Municipalidad de Zapallar" },
    ],
    layout: "blueprint-atlas",
    gallery: [
      media(
        "proyecto-14/01.webp",
        "Emplazamiento y situación general Valle del Estero",
        2000,
        1246,
        { caption: "Emplazamiento y normativa", isDrawing: true }
      ),
      media(
        "proyecto-14/02.webp",
        "Planta de arquitectura Vivienda Valle del Estero",
        2000,
        1261,
        { caption: "Planta de arquitectura", isDrawing: true }
      ),
      media(
        "proyecto-14/03.webp",
        "Elevaciones y fachadas Valle del Estero",
        2000,
        1266,
        { caption: "Elevaciones", isDrawing: true }
      ),
      media(
        "proyecto-14/04.webp",
        "Cortes constructivos Valle del Estero",
        2000,
        1252,
        { caption: "Cortes longitudinales y transversales", isDrawing: true }
      ),
      media(
        "proyecto-14/05.webp",
        "Axonometría estructural Valle del Estero",
        1726,
        1840,
        { caption: "Axonometría de estructura", isDrawing: true }
      ),
    ],
  },
  {
    id: "proyecto-15",
    slug: "proyecto-15",
    code: "15",
    prefix: "REGULARIZACIÓN",
    name: "LEY 20.898",
    title: "Proyectos de Regularización Ley 20.898",
    location: "Región de Valparaíso, Chile",
    cardLocation: "Región de Valparaíso",
    area: "Ley 20.898",
    category: "Regularización",
    thumbnail: getStorageUrl("portadas/15.webp"),
    caseDescription:
      'Gestión y tramitación de proyectos de regularización de construcciones habitacionales acogidas a la normativa chilena Ley 20.898 (conocida como "Ley del Mono"), ofreciendo un procedimiento simplificado para edificaciones ejecutadas antes de 2016.',
    specs: [
      { label: "Ubicación", value: "Región de Valparaíso, Chile" },
      { label: "Normativa", value: "Ley 20.898 — Regularización simplificada" },
    ],
    layout: "blueprint-atlas",
    gallery: [
      media(
        "proyecto-15/01.webp",
        "Lámina 1 regularización Ley 20.898",
        2000,
        1413,
        { caption: "L1 — Emplazamiento y cuadro de superficies", isDrawing: true }
      ),
      media(
        "proyecto-15/02.webp",
        "Lámina 2 plantas y elevaciones Ley 20.898",
        2000,
        1413,
        { caption: "L2 — Plantas, cortes y elevaciones", isDrawing: true }
      ),
      media(
        "proyecto-15/03.webp",
        "Lámina 3 levantamiento arquitectónico",
        2000,
        1413,
        { caption: "L3 — Levantamiento existente", isDrawing: true }
      ),
    ],
  },
  {
    id: "proyecto-16",
    slug: "proyecto-16",
    code: "16",
    prefix: "CENTRO MÉDICO",
    name: "CAIF",
    title: "Centro Médico CAIF",
    location: "Quilpué, Región de Valparaíso, Chile",
    cardLocation: "Quilpué, V Región",
    area: "Remodelación integral",
    category: "Construcción",
    thumbnail: getStorageUrl("portadas/16.webp"),
    caseDescription:
      "Diseño y ejecución de remodelación integral para la habilitación de un centro médico a partir de un inmueble originalmente concebido con destino habitacional. La propuesta plantea una estructura mixta capaz de responder eficientemente a las complejas normativas sanitarias, de accesibilidad universal y a las restricciones espaciales del edificio preexistente.",
    specs: [
      { label: "Ubicación", value: "Quilpué, Región de Valparaíso" },
      { label: "Alcance", value: "Diseño, habilitación y ejecución integral" },
      { label: "Normativa", value: "Sanitaria y accesibilidad universal" },
    ],
    layout: "minimal-plate",
    gallery: [
      media(
        "proyecto-16/01.webp",
        "Axonometría general Centro Médico CAIF",
        1920,
        1080,
        { caption: "Axonometría volumétrica de habilitación", isDrawing: true }
      ),
      media(
        "proyecto-16/02.webp",
        "Planta primer nivel Centro Médico CAIF",
        1920,
        1080,
        { caption: "Planta de distribución y accesibilidad", isDrawing: true }
      ),
      media(
        "proyecto-16/03.webp",
        "Cortes y detalles Centro Médico CAIF",
        1920,
        1080,
        { caption: "Secciones y recintos clínicos", isDrawing: true }
      ),
    ],
  },
  {
    id: "proyecto-17",
    slug: "proyecto-17",
    code: "17",
    prefix: "OFICINAS",
    name: "890.ARQ",
    title: "Oficinas 890.ARQ",
    location: "Barrio Financiero, Valparaíso, Región de Valparaíso, Chile",
    cardLocation: "Valparaíso, V Región",
    area: "35 m²",
    category: "Construcción",
    thumbnail: getStorageUrl("portadas/17.webp"),
    caseDescription:
      "Habilitación de oficinas en el sexto piso de un edificio patrimonial ubicado en el corazón financiero porteño. La planta libre y los grandes ventanales existentes se optimizaron mediante la creación de un perímetro equipado en madera de pino, el cual integra almacenamiento inferior, estanterías superiores y superficies de trabajo. Se incorporó un núcleo vertical de servicios y tabiquería de acceso, además de mobiliario modular flexible.",
    specs: [
      { label: "Ubicación", value: "Barrio Financiero, Valparaíso" },
      { label: "Superficie", value: "35 m²" },
      { label: "Estructura", value: "Madera de pino cepillada" },
    ],
    layout: "atelier-diptych",
    gallery: [
      media(
        "proyecto-17/01.webp",
        "Estantería perimetral en madera de pino Oficinas 890.ARQ",
        1428,
        948,
        { caption: "Perímetro equipado en pino cepillado" }
      ),
      media(
        "proyecto-17/02.webp",
        "Planta libre y luz natural Oficinas 890.ARQ",
        1424,
        946,
        { caption: "Planta libre y mesas modulares" }
      ),
      media(
        "proyecto-17/03.webp",
        "Espacio de trabajo colaborativo Oficinas 890.ARQ",
        1420,
        944,
        { caption: "Estudio en funcionamiento" }
      ),
    ],
  },
  {
    id: "proyecto-18",
    slug: "proyecto-18",
    code: "18",
    prefix: "OFICINAS",
    name: "ZETT Y CÍA. ASOCIADOS",
    title: "Oficinas Zett y Cía. Asociados",
    location: "Quillota, Región de Valparaíso, Chile",
    cardLocation: "Quillota, V Región",
    area: "Diseño y construcción",
    category: "Construcción",
    thumbnail: getStorageUrl("portadas/18.webp"),
    caseDescription:
      "Proyecto integral de diseño y construcción en Calle Chacabuco, gestionado íntegramente por la oficina desde el anteproyecto arquitectónico hasta la ejecución material en obra. Los trabajos incluyeron la administración de mano de obra especializada, control de costos, logística, inspección técnica de obras (ITO), resolución de detalles constructivos y la ejecución del paisajismo exterior.",
    specs: [
      { label: "Ubicación", value: "Calle Chacabuco, Quillota" },
      { label: "Alcance", value: "Anteproyecto, ejecución, ITO y paisajismo" },
    ],
    layout: "split-monograph",
    gallery: [
      media(
        "proyecto-18/01.webp",
        "Acceso peatonal y paisajismo Oficinas Zett y Cía.",
        1700,
        1848,
        { caption: "Circulación exterior y paisajismo" }
      ),
      media(
        "proyecto-18/02.webp",
        "Fachada lateral ejecutada Oficinas Zett y Cía.",
        1700,
        2068,
        { caption: "Fachada de acceso y terminaciones" }
      ),
      media(
        "proyecto-18/03.webp",
        "Planta arquitectónica Oficinas Zett y Cía.",
        1920,
        1080,
        { caption: "Planta general del proyecto", isDrawing: true }
      ),
    ],
  },
  {
    id: "proyecto-19",
    slug: "proyecto-19",
    code: "19",
    prefix: "COWORK",
    name: "OFICIO PONIENTE",
    title: "Cowork Oficio Poniente",
    location: "Viña del Mar, Región de Valparaíso, Chile",
    cardLocation: "Viña del Mar, V Región",
    area: "Habilitación cowork",
    category: "Construcción",
    thumbnail: getStorageUrl("portadas/19.webp"),
    caseDescription:
      "Remodelación, diseño y construcción de un espacio de trabajo colaborativo (cowork). La intervención consideró la renovación de pavimentos y la implementación de un sistema de tabiquería transparente en madera y policarbonato, logrando una zonificación fluida y flexible de los espacios de trabajo.",
    specs: [
      { label: "Ubicación", value: "Viña del Mar, Región de Valparaíso" },
      { label: "Materialidad", value: "Madera y policarbonato alveolar" },
    ],
    layout: "asymmetric-dossier",
    gallery: [
      media(
        "proyecto-19/01.webp",
        "Sala principal con tabiquería de madera y policarbonato",
        1412,
        727,
        { caption: "Zonificación en madera y policarbonato" }
      ),
      media(
        "proyecto-19/02.webp",
        "Detalle de partición en madera Cowork Oficio Poniente",
        1448,
        1086,
        { caption: "Partición permeable y luz natural" }
      ),
      media(
        "proyecto-19/03.webp",
        "Área de reuniones Cowork Oficio Poniente",
        1340,
        592,
        { caption: "Sala de reuniones y puestos colaborativos" }
      ),
      media(
        "proyecto-19/04.webp",
        "Vista isométrica Cowork Oficio Poniente",
        1548,
        688,
        { caption: "Isometría de distribución interior", isDrawing: true }
      ),
      media(
        "proyecto-19/05.webp",
        "Detalles de tabiquería Cowork Oficio Poniente",
        2000,
        1544,
        { caption: "Detalle constructivo de tabiquería", isDrawing: true }
      ),
      media(
        "proyecto-19/06.webp",
        "Plantas de habilitación Cowork Oficio Poniente",
        2000,
        1567,
        { caption: "Plantas de arquitectura", isDrawing: true }
      ),
    ],
  },
  {
    id: "proyecto-20",
    slug: "proyecto-20",
    code: "20",
    prefix: "OFICINAS",
    name: "SE",
    title: "Oficinas SE",
    location: "Villa Alemana, Región de Valparaíso, Chile",
    cardLocation: "Villa Alemana, V Región",
    area: "Rehabilitación interior",
    category: "Construcción",
    thumbnail: getStorageUrl("portadas/20.webp"),
    caseDescription:
      "Rehabilitación y habilitación de un antiguo departamento emplazado en la última planta de un edificio patrimonial. El proyecto se estructuró mediante la instalación de tabiquería a la vista y un sistema de mobiliario modular integrado que vincula visual y funcionalmente la totalidad del espacio interior.",
    specs: [
      { label: "Ubicación", value: "Villa Alemana, Región de Valparaíso" },
      { label: "Alcance", value: "Rehabilitación y mobiliario modular" },
    ],
    layout: "atelier-diptych",
    gallery: [
      media(
        "proyecto-20/02.webp",
        "Planta de trabajo principal Oficinas SE",
        1672,
        941,
        { caption: "Área operativa y tabiquería transparente" }
      ),
      media(
        "proyecto-20/01.webp",
        "Oficina privada con mobiliario integrado Oficinas SE",
        1376,
        768,
        { caption: "Mobiliario modular y luz perimetral" }
      ),
      media(
        "proyecto-20/03.webp",
        "Sala de reuniones Oficinas SE",
        1672,
        941,
        { caption: "Espacio de reuniones y atención" }
      ),
    ],
  },
  {
    id: "proyecto-21",
    slug: "proyecto-21",
    code: "21",
    prefix: "RED HIDROSANITARIA",
    name: "EDIFICIO LA ARAUCANA",
    title: "Adaptación de Red Hidrosanitaria - Edificio La Araucana",
    location: "San Antonio, Región de Valparaíso, Chile",
    cardLocation: "San Antonio, V Región",
    area: "Red hidrosanitaria",
    category: "Especialidades técnicas",
    thumbnail: getStorageUrl("portadas/21.webp"),
    caseDescription:
      "Proyecto y ejecución de ingeniería para la adaptación, rediseño y normalización de la nueva red hidrosanitaria en altura, cumpliendo con las normativas sanitarias y de servicios vigentes.",
    specs: [
      { label: "Ubicación", value: "San Antonio, Región de Valparaíso" },
      { label: "Especialidad", value: "Red hidrosanitaria en altura" },
    ],
    layout: "technical-blueprint",
    gallery: [
      media(
        "proyecto-21/01.webp",
        "Isométrica general de red hidrosanitaria Edificio La Araucana",
        1456,
        720,
        { caption: "Esquema isométrico de red en altura" }
      ),
      media(
        "proyecto-21/02.webp",
        "Lámina técnica de proyecto hidrosanitario Edificio La Araucana",
        2000,
        1440,
        { caption: "Lámina técnica de instalaciones", isDrawing: true }
      ),
    ],
  },
  {
    id: "proyecto-22",
    slug: "proyecto-22",
    code: "22",
    prefix: "HIDROSANITARIO",
    name: "CABAÑAS OCOA",
    title: "Proyecto Hidrosanitario - Cabañas Ocoa",
    location: "Hijuelas, Región de Valparaíso, Chile",
    cardLocation: "Hijuelas, V Región",
    area: "Proyecto hidrosanitario",
    category: "Especialidades técnicas",
    thumbnail: getStorageUrl("portadas/22.webp"),
    caseDescription:
      "Diseño de instalaciones de agua potable, alcantarillado y evacuación de aguas lluvias para el conjunto de cabañas, asegurando la autonomía y correcta operación de los servicios en contexto rural.",
    specs: [
      { label: "Ubicación", value: "Hijuelas, Región de Valparaíso" },
      {
        label: "Especialidad",
        value: "Agua potable, alcantarillado y aguas lluvias",
      },
    ],
    layout: "technical-blueprint",
    gallery: [
      media(
        "proyecto-22/01.webp",
        "Esquema de redes y cortes Cabañas Ocoa",
        1200,
        896,
        { caption: "Esquema general de redes en pendiente" }
      ),
      media(
        "proyecto-22/02.webp",
        "Lámina red de agua potable Cabañas Ocoa",
        2000,
        1394,
        { caption: "Red de agua potable", isDrawing: true }
      ),
      media(
        "proyecto-22/03.webp",
        "Lámina alcantarillado particular Cabañas Ocoa",
        2000,
        1389,
        { caption: "Sistema particular de alcantarillado", isDrawing: true }
      ),
      media(
        "proyecto-22/04.webp",
        "Isométrica de descargas y fosa séptica",
        2000,
        984,
        { caption: "Isométrica de trazado sanitario", isDrawing: true }
      ),
      media(
        "proyecto-22/05.webp",
        "Detalles constructivos drenes y cámaras",
        2000,
        1328,
        { caption: "Detalles de cámaras e infiltración", isDrawing: true }
      ),
    ],
  },
  {
    id: "proyecto-23",
    slug: "proyecto-23",
    code: "23",
    prefix: "AGUA POTABLE Y",
    name: "CONEXIÓN ESVAL",
    title: "Proyecto de Dotación de Agua Potable y Conexión ESVAL",
    location: "Gómez Carreño, Viña del Mar, Región de Valparaíso, Chile",
    cardLocation: "Viña del Mar, V Región",
    area: "Conexión ESVAL",
    category: "Especialidades técnicas",
    thumbnail: getStorageUrl("portadas/23.webp"),
    caseDescription:
      "Desarrollo de ingeniería de detalle, proyecto hidrosanitario y tramitación técnica ante la sanitaria ESVAL para la obtención del certificado de dotación de servicios y empalme domiciliario en propiedad particular.",
    specs: [
      { label: "Ubicación", value: "Gómez Carreño, Viña del Mar" },
      { label: "Tramitación", value: "Dotación y empalme domiciliario ESVAL" },
    ],
    layout: "technical-blueprint",
    gallery: [
      media(
        "proyecto-23/01.webp",
        "Isométrica de alcantarillado y dotación ESVAL",
        1200,
        896,
        { caption: "Isométrica de red sanitaria" }
      ),
      media(
        "proyecto-23/02.webp",
        "Lámina de proyecto agua potable ESVAL",
        2000,
        1398,
        { caption: "Lámina de trazado y empalme", isDrawing: true }
      ),
      media(
        "proyecto-23/03.webp",
        "Lámina de alcantarillado y cuadro de piezas",
        2000,
        1397,
        { caption: "Alcantarillado y especificaciones técnicas", isDrawing: true }
      ),
    ],
  },
  {
    id: "proyecto-24",
    slug: "proyecto-24",
    code: "24",
    prefix: "HIDROSANITARIO",
    name: "GALPÓN BARRIO CAMPESTRE",
    title: "Proyecto Hidrosanitario - Galpón Barrio Campestre",
    location: "La Cruz, Región de Valparaíso, Chile",
    cardLocation: "La Cruz, V Región",
    area: "Proyecto hidrosanitario",
    category: "Especialidades técnicas",
    thumbnail: getStorageUrl("portadas/24.webp"),
    caseDescription:
      "Proyección y cálculo de instalaciones hidrosanitarias adaptadas a los requerimientos normativos de edificaciones emplazadas en loteos rurales con sistemas particulares de tratamiento de aguas.",
    specs: [
      { label: "Ubicación", value: "La Cruz, Región de Valparaíso" },
      { label: "Sistema", value: "Tratamiento particular de aguas en loteo rural" },
    ],
    layout: "technical-blueprint",
    gallery: [
      media(
        "proyecto-24/01.webp",
        "Axonometría de red Galpón Barrio Campestre",
        1200,
        896,
        { caption: "Axonometría general de instalaciones" }
      ),
      media(
        "proyecto-24/02.webp",
        "Lámina cálculo red agua potable y alcantarillado",
        2000,
        1403,
        { caption: "Planta de instalaciones sanitarias", isDrawing: true }
      ),
      media(
        "proyecto-24/03.webp",
        "Lámina detalles sistema de tratamiento rural",
        2000,
        1383,
        { caption: "Detalles técnicos de tratamiento", isDrawing: true }
      ),
    ],
  },
  {
    id: "proyecto-25",
    slug: "proyecto-25",
    code: "25",
    prefix: "INFORME FAVORABLE",
    name: "IFC — SAG",
    title: "Obtención de Informe Favorable para la Construcción (IFC) - SAG",
    location: "Hijuelas, Región de Valparaíso, Chile",
    cardLocation: "Hijuelas, V Región",
    area: "Gestión IFC · SAG",
    category: "Especialidades técnicas",
    thumbnail: getStorageUrl("portadas/25.webp"),
    caseDescription:
      "Elaboración de expediente técnico y gestión ante el Servicio Agrícola y Ganadero (SAG) para la obtención del Informe Favorable de Construcción (IFC), habilitando el desarrollo de obras habitacionales en áreas rurales.",
    specs: [
      { label: "Ubicación", value: "Hijuelas, Región de Valparaíso" },
      { label: "Organismo", value: "Servicio Agrícola y Ganadero (SAG)" },
    ],
    layout: "technical-blueprint",
    gallery: [
      media(
        "proyecto-25/01.webp",
        "Topografía y emplazamiento rural IFC SAG",
        1200,
        896,
        { caption: "Levantamiento topográfico y curvas de nivel" }
      ),
      media(
        "proyecto-25/02.webp",
        "Lámina de ubicación y emplazamiento expediente IFC",
        2000,
        1419,
        { caption: "Emplazamiento predial rural", isDrawing: true }
      ),
      media(
        "proyecto-25/03.webp",
        "Lámina arquitectura y cuadro normativo IFC",
        2000,
        1411,
        { caption: "Antecedentes técnicos para aprobación SAG", isDrawing: true }
      ),
    ],
  },
  {
    id: "proyecto-26",
    slug: "proyecto-26",
    code: "26",
    prefix: "CASA",
    name: "MÓDULO F35",
    title: "Casa Módulo F35",
    location: "Apta para diversas regiones (Modelo estandarizado)",
    cardLocation: "Modelo multi-región",
    area: "60 m²",
    category: "Viviendas modulares",
    thumbnail: getStorageUrl("portadas/26.webp"),
    caseDescription:
      "Sistema de vivienda modular adaptable basado en una retícula de módulos de 5×3 metros (15 m² por módulo), con combinaciones configurables desde los 30 m² hasta los 120 m². El modelo base presentado contempla 60 m² distribuidos en estar, cocina, un baño, dos dormitorios y terraza.",
    architectureRationale:
      "El proyecto utiliza el módulo estructural como unidad de medida y articulación espacial, empleando un pasillo central ordenador que agrupa las cápsulas habitacionales. Esta disposición genera un patio interior protegido que otorga privacidad e independencia respecto al contexto territorial en el que se emplace.",
    specs: [
      { label: "Superficie", value: "60 m² (Configurable de 30 a 120 m²)" },
      { label: "Módulos", value: "4 unidades base de 15 m² (5×3 m)" },
      { label: "Emplazamiento", value: "Modelo estandarizado multi-región" },
    ],
    layout: "panoramic-essay",
    gallery: [
      media(
        "proyecto-26/01.webp",
        "Vista exterior Casa Módulo F35 junto al lago",
        1672,
        941,
        { caption: "Configuración base de 4 módulos (60 m²)" }
      ),
      media(
        "proyecto-26/02.webp",
        "Variaciones de emplazamiento Casa Módulo F35",
        1672,
        941,
        { caption: "Adaptabilidad territorial y terraza" }
      ),
      media(
        "proyecto-26/03.webp",
        "Vistas interiores Casa Módulo F35",
        1672,
        941,
        { caption: "Recintos interiores y patio protegido" }
      ),
      media(
        "proyecto-26/04.webp",
        "Despiece axonométrico Casa Módulo F35",
        1920,
        1080,
        { caption: "Despiece estructural y elevaciones", isDrawing: true }
      ),
      media(
        "proyecto-26/05.webp",
        "Esquema de combinaciones modulares F35",
        1920,
        1080,
        { caption: "Modulación y crecimiento progresivo", isDrawing: true }
      ),
    ],
  },
  {
    id: "proyecto-27",
    slug: "proyecto-27",
    code: "27",
    prefix: "CABAÑAS",
    name: "OCOA MODULAR",
    title: "Cabañas Ocoa (Modelo Modular)",
    location: "Hijuelas, Región de Valparaíso, Chile",
    cardLocation: "Hijuelas, V Región",
    area: "68 m²",
    category: "Viviendas modulares",
    thumbnail: getStorageUrl("portadas/27.webp"),
    caseDescription:
      "Emplazamiento de dos cabañas habitacionales y áreas de quincho concebidas bajo un esquema de prefabricación modular. Previo a la instalación, se ejecutó un estudio forestal e informe técnico para determinar las zonas de menor riesgo y asegurar el respeto por la vegetación nativa existente.",
    architectureRationale:
      'La volumetría orienta sus aperturas principales hacia el cerro La Campana, respondiendo a las condiciones geográficas y paisajísticas del lugar. El diseño tipológico en "A" optimiza el sistema constructivo modular tanto para los paramentos verticales como para los planos inclinados de techumbre.',
    specs: [
      { label: "Ubicación", value: "Hijuelas, Región de Valparaíso" },
      { label: "Superficie", value: "68 m²" },
      { label: "Estructura", value: "Acero y madera — tipología en A" },
    ],
    layout: "modular-triptych",
    gallery: [
      media(
        "proyecto-27/02.webp",
        "Estudio exterior cabaña modular A-frame",
        1536,
        1024,
        { caption: "Volumetría exterior en tipología A-frame" }
      ),
      media(
        "proyecto-27/01.webp",
        "Interiores y altillo cabaña modular A-frame",
        1672,
        941,
        { caption: "Espacios interiores y aprovechamiento bajo cubierta" }
      ),
    ],
  },
  {
    id: "proyecto-28",
    slug: "proyecto-28",
    code: "28",
    prefix: "DEPARTAMENTO",
    name: "SAN JUAN DE DIOS",
    title: "Remodelación Departamento San Juan de Dios",
    location: "San Juan de Dios, Región de Valparaíso, Chile",
    cardLocation: "Valparaíso, V Región",
    area: "56 m²",
    category: "Viviendas modulares",
    thumbnail: getStorageUrl("portadas/28.webp"),
    caseDescription:
      "Remodelación parcial de departamento de 56 m² que incluyó la ampliación de la cocina, modificación de tabiquería, renovación parcial de pavimentos y diseño de mobiliario integrado.",
    architectureRationale:
      "Para resolver la desconexión lumínica y espacial entre la cocina y el área social, se eliminó el tabique divisorio, integrando el espacio y permitiendo el paso de la luz natural. Se instaló un sistema modular de muebles ensamblados que funciona como envolvente habitable, adaptado a los requerimientos acústicos y tecnológicos de un usuario dedicado a la producción musical.",
    specs: [
      { label: "Ubicación", value: "San Juan de Dios, Región de Valparaíso" },
      { label: "Superficie", value: "56 m²" },
      { label: "Estructura", value: "Madera y acero" },
    ],
    layout: "modular-triptych",
    gallery: [
      media(
        "proyecto-28/01.webp",
        "Isométrica general Departamento San Juan de Dios",
        1536,
        1024,
        { caption: "Isométrica general de la intervención" }
      ),
      media(
        "proyecto-28/02.webp",
        "Lámina módulo de TV y estudio acústico",
        1501,
        1047,
        { caption: "Módulo de estar y equipamiento" }
      ),
      media(
        "proyecto-28/03.webp",
        "Lámina módulo de cocina integrada",
        1536,
        1024,
        { caption: "Módulo de cocina ensamblada" }
      ),
    ],
  },
  {
    id: "proyecto-29",
    slug: "proyecto-29",
    code: "29",
    prefix: "CASA",
    name: "6346",
    title: "Casa 6346",
    location: "Colliguay, Quilpué, Región de Valparaíso, Chile",
    cardLocation: "Colliguay, Quilpué",
    area: "178 m²",
    category: "Viviendas modulares",
    thumbnail: getStorageUrl("portadas/29.webp"),
    caseDescription:
      "Sistema de vivienda modular en base a containers 6346, desarrollado en el valle de Colliguay para resolver el programa habitacional completo mediante módulos prefabricados de rápido montaje.",
    architectureRationale:
      "La unidad estructural básica se compone de cuatro contenedores high cube, emplazados con el fin de minimizar circulaciones y articular un patio interior el cual conecta la totalidad de programas de la vivienda unifamiliar.",
    specs: [
      { label: "Ubicación", value: "Colliguay, Quilpué" },
      { label: "Superficie", value: "178 m²" },
      { label: "Estructura", value: "Acero (4 contenedores high cube) y madera" },
    ],
    layout: "asymmetric-dossier",
    gallery: [
      media(
        "proyecto-29/01.webp",
        "Montaje de cuatro contenedores en obra Casa 6346",
        1800,
        1125,
        { caption: "Proceso constructivo y emplazamiento de contenedores" }
      ),
      media(
        "proyecto-29/02.webp",
        "Isométrica estructural de cuatro contenedores Casa 6346",
        1700,
        1350,
        { caption: "Estructura combinada de cuatro contenedores", isDrawing: true }
      ),
      media(
        "proyecto-29/03.webp",
        "Despiece de cortes por contenedor Casa 6346",
        2000,
        1031,
        { caption: "Estructura de corte por módulo", isDrawing: true }
      ),
      media(
        "proyecto-29/04.webp",
        "Planta de distribución y obra terminada Casa 6346",
        1080,
        1350,
        { caption: "Planta general y terminación exterior", isDrawing: true }
      ),
      media(
        "proyecto-29/05.webp",
        "Fundaciones aisladas en valle de Colliguay",
        1600,
        881,
        { caption: "Fundaciones aisladas sobre el terreno" }
      ),
    ],
  },
  {
    id: "proyecto-30",
    slug: "proyecto-30",
    code: "30",
    prefix: "CASA",
    name: "8 AL CUBO",
    title: "Casa 8 al Cubo",
    location: "Entornos urbanos (Modelo escalable para conjuntos habitacionales)",
    cardLocation: "Contextos urbanos",
    area: "64 m²",
    category: "Viviendas modulares",
    thumbnail: getStorageUrl("portadas/30.webp"),
    caseDescription:
      "Modelo de vivienda modular de rápida ejecución diseñado para su inserción en contextos urbanos y replicabilidad en conjuntos habitacionales. Cuenta con un programa base de dos dormitorios y dos baños, y una variante extendida con un módulo adicional que incorpora tres dormitorios y tres baños.",
    architectureRationale:
      "El diseño aborda la escala arquitectónica desde el detalle constructivo hasta la relación volumétrica colectiva y urbana. La propuesta articula de manera simultánea los espacios interiores y exteriores como una unidad vivencial integral, evitando que uno sea mero resultado del otro.",
    specs: [
      { label: "Superficie", value: "64 m² (2D/2B o variante extendida 3D/3B)" },
      { label: "Estructura", value: "Hormigón y Metalcon" },
      { label: "Contexto", value: "Modelo escalable para conjuntos urbanos" },
    ],
    layout: "split-monograph",
    gallery: [
      media(
        "proyecto-30/04.webp",
        "Fachada urbana Casa 8 al Cubo",
        1700,
        948,
        { caption: "Inserción urbana a escala peatonal" }
      ),
      media(
        "proyecto-30/03.webp",
        "Vista aérea conjunto habitacional Casa 8 al Cubo",
        1700,
        947,
        { caption: "Replicabilidad en conjunto habitacional" }
      ),
      media(
        "proyecto-30/01.webp",
        "Isométrica explotada Casa 8 al Cubo",
        1920,
        1080,
        { caption: "Despiece volumétrico", isDrawing: true }
      ),
      media(
        "proyecto-30/02.webp",
        "Variante modular base y extendida Casa 8 al Cubo",
        1920,
        1080,
        { caption: "Variante base y ampliación", isDrawing: true }
      ),
      media(
        "proyecto-30/05.webp",
        "Conjunto en altura media Casa 8 al Cubo",
        1700,
        950,
        { caption: "Continuidad de fachadas y patios" }
      ),
      media(
        "proyecto-30/06.webp",
        "Acceso residencial Casa 8 al Cubo",
        1700,
        950,
        { caption: "Relación interior-exterior hacia la calle" }
      ),
    ],
  },
];
