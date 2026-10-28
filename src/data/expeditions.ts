// Rutas, itinerarios y precios: borrador a confirmar con el cliente (ver CONTENIDO_PENDIENTE.md).

export type Expedition = {
  slug: string
  name: string
  duration: string
  days: number
  zone: string
  level: 'Fácil' | 'Moderado' | 'Exigente'
  summary: string
  image: string
  itinerary: { day: string; text: string }[]
  includes: string[]
  price?: string
}

export const expeditions: Expedition[] = [
  {
    slug: 'full-day-rio-amazonas',
    name: 'Full day río Amazonas y Nanay',
    duration: '1 día',
    days: 1,
    zone: 'Ríos Nanay y Amazonas',
    level: 'Fácil',
    summary:
      'Tour de un día desde Iquitos en bote: encuentro de los ríos Nanay y Amazonas, avistamiento de delfines rosados, pesca de pirañas y visita a una comunidad ribereña.',
    image: 'nanay',
    itinerary: [
      { day: 'Mañana', text: 'Recojo en tu hotel de Iquitos y salida en bote desde el puerto de Bellavista Nanay.' },
      { day: 'Mediodía', text: 'Encuentro de ríos, avistamiento de delfines rosados y grises. Almuerzo regional.' },
      { day: 'Tarde', text: 'Pesca de pirañas y visita a una comunidad ribereña. Regreso a Iquitos al atardecer.' },
    ],
    includes: ['Traslado hotel–puerto', 'Bote con chaleco salvavidas', 'Guía local', 'Almuerzo', 'Agua'],
  },
  {
    slug: 'selva-3-dias-2-noches',
    name: 'Selva amazónica 3 días y 2 noches',
    duration: '3 días / 2 noches',
    days: 3,
    zone: 'Río Amazonas',
    level: 'Fácil',
    summary:
      'Estadía en la selva con base en un albergue sobre el río Amazonas. Caminatas de día y de noche, canotaje por quebradas y observación de fauna.',
    image: 'proa',
    itinerary: [
      { day: 'Día 1', text: 'Navegación por el Amazonas hasta el albergue. Caminata de reconocimiento y salida nocturna en bote para ver caimanes.' },
      { day: 'Día 2', text: 'Caminata por bosque primario, plantas medicinales y árboles gigantes. Canotaje por quebradas y pesca.' },
      { day: 'Día 3', text: 'Observación de aves al amanecer, delfines rosados y regreso a Iquitos.' },
    ],
    includes: ['Transporte fluvial', 'Alojamiento en albergue', 'Pensión completa', 'Guía local', 'Botas y poncho'],
  },
  {
    slug: 'supervivencia-4-dias',
    name: 'Expedición de supervivencia 4 días',
    duration: '4 días / 3 noches',
    days: 4,
    zone: 'Selva primaria',
    level: 'Exigente',
    summary:
      'Expedición con campamento en selva primaria. Aprendes a construir un refugio, conseguir agua, orientarte y reconocer plantas útiles con un guía que creció en la selva.',
    image: 'campamento',
    itinerary: [
      { day: 'Día 1', text: 'Navegación y caminata hasta la zona de campamento. Armado del refugio con materiales del bosque.' },
      { day: 'Día 2', text: 'Técnicas de supervivencia: agua, fuego, trampas y orientación sin GPS. Caminata nocturna.' },
      { day: 'Día 3', text: 'Ruta larga por bosque primario. Pesca para la cena y noche en hamaca.' },
      { day: 'Día 4', text: 'Desarme del campamento sin dejar rastro y regreso a Iquitos.' },
    ],
    includes: ['Transporte fluvial', 'Equipo de campamento', 'Alimentación', 'Guía local', 'Botiquín de primeros auxilios'],
  },
  {
    slug: 'pacaya-samiria-5-dias',
    name: 'Reserva Nacional Pacaya Samiria 5 días',
    duration: '5 días / 4 noches',
    days: 5,
    zone: 'Pacaya Samiria',
    level: 'Moderado',
    summary:
      'Expedición a la Reserva Nacional Pacaya Samiria, el bosque inundable entre los ríos Marañón y Ucayali. Salida por carretera a Nauta y navegación al interior de la reserva.',
    image: 'espejos',
    itinerary: [
      { day: 'Día 1', text: 'Traslado por carretera de Iquitos a Nauta. Navegación por el Marañón hasta el ingreso a la reserva.' },
      { day: 'Día 2', text: 'Recorrido en canoa por cochas y caños. Observación de monos, guacamayos y delfines.' },
      { day: 'Día 3', text: 'Caminata por bosque inundable, pesca y visita a una comunidad dentro de la reserva.' },
      { day: 'Día 4', text: 'Navegación al amanecer por la zona conocida como Selva de los Espejos. Salida nocturna.' },
      { day: 'Día 5', text: 'Regreso a Nauta y traslado por carretera a Iquitos.' },
    ],
    includes: ['Traslado Iquitos–Nauta', 'Ingreso a la reserva', 'Transporte fluvial', 'Alojamiento y alimentación', 'Guía local'],
  },
]
