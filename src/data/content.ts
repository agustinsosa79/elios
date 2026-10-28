// Cada zona tiene un punto en el mapa [lat, lon] y el encuadre de cámara que usa al activarse.
export type Zone = {
  name: string
  distance: string
  text: string
  image: string
  point: [number, number]
  label: string
  /** Lado del punto donde va la etiqueta del mapa. */
  side?: 'left' | 'right' | 'top' | 'bottom'
  camera: { lat: number; lon: number; span: number }
}

export const zones: Zone[] = [
  {
    name: 'Iquitos y Belén',
    distance: 'Punto de partida',
    text: 'La ciudad más grande del mundo sin acceso por carretera. Se llega solo en avión o por río. Desde aquí salen todas las expediciones.',
    image: 'belen',
    point: [-3.75, -73.25],
    label: 'Iquitos',
    side: 'bottom',
    camera: { lat: -3.78, lon: -73.3, span: 0.62 },
  },
  {
    name: 'Río Nanay',
    distance: 'A 20 minutos de Iquitos',
    text: 'Río de aguas negras con playas de arena blanca en época de vaciante. Ideal para tours de un día.',
    image: 'nanay',
    point: [-3.785, -73.37],
    label: 'Santa Clara',
    side: 'left',
    camera: { lat: -3.66, lon: -73.6, span: 1.1 },
  },
  {
    name: 'Río Amazonas',
    distance: 'Desde el puerto de Iquitos',
    text: 'Nace de la unión del Marañón y el Ucayali, cerca de Nauta. Comunidades ribereñas, albergues y delfines rosados.',
    image: 'proa',
    point: [-3.5, -73.04],
    label: 'Indiana',
    side: 'top',
    camera: { lat: -3.95, lon: -73.3, span: 1.6 },
  },
  {
    name: 'Reserva Nacional Pacaya Samiria',
    distance: 'A 2 horas por carretera hasta Nauta',
    text: 'Más de dos millones de hectáreas de bosque inundable. La zona con mayor diversidad de fauna de nuestras rutas.',
    image: 'espejos',
    point: [-5.15, -74.85],
    label: 'Pacaya Samiria',
    camera: { lat: -4.6, lon: -74.15, span: 3.5 },
  },
]

export const activities = [
  { name: 'Delfines rosados', text: 'Avistamiento en los ríos Amazonas y Marañón.', image: 'pacaya' },
  { name: 'Caminata nocturna', text: 'Ranas, insectos, tarántulas y caimanes con linterna.', image: 'nocturna' },
  { name: 'Canotaje', text: 'Recorridos en canoa por quebradas y cochas.', image: 'canoa' },
  { name: 'Observación de aves', text: 'Loros, guacamayos y tucanes al amanecer.', image: 'loro' },
  { name: 'Campamento en la selva', text: 'Noche en hamaca o refugio construido en el bosque.', image: 'campamento' },
  { name: 'Pesca de pirañas', text: 'Con caña tradicional, en lagunas y brazos del río.', image: 'ucayali' },
]

export const steps = [
  { title: 'Escríbenos por WhatsApp', text: 'Indica fechas, número de personas y la expedición que te interesa.' },
  { title: 'Recibe tu itinerario', text: 'Te enviamos el itinerario día por día y el precio final por persona.' },
  { title: 'Confirma la reserva', text: 'Reservas tu fecha con un adelanto. El resto lo pagas en Iquitos.' },
  { title: 'Te recogemos en Iquitos', text: 'Pasamos por tu hotel o por el aeropuerto el día de salida.' },
]

export const faq = [
  {
    q: '¿Cómo se llega a Iquitos?',
    a: 'Iquitos no tiene conexión por carretera con el resto del Perú. Se llega en avión desde Lima (1 h 45 min aprox.) o en barco por el río Amazonas desde Yurimaguas o Pucallpa.',
  },
  {
    q: '¿Cuál es la mejor época para ir a la selva?',
    a: 'Se puede viajar todo el año. De diciembre a mayo es época de creciente: los ríos suben y se navega dentro del bosque inundado. De junio a noviembre es vaciante: hay más senderos, playas y pesca.',
  },
  {
    q: '¿Qué vacunas necesito para la selva peruana?',
    a: 'Se recomienda la vacuna contra la fiebre amarilla al menos 10 días antes del viaje. Consulta con tu médico sobre la prevención de malaria y dengue.',
  },
  {
    q: '¿Qué llevar a una expedición en la selva?',
    a: 'Ropa ligera de manga larga, pantalón largo, repelente, protector solar, linterna frontal, poncho de lluvia, bolsa seca para el celular y documentos. Las botas de jebe las ponemos nosotros.',
  },
  {
    q: '¿Las expediciones son seguras?',
    a: 'Todos los traslados en bote se hacen con chaleco salvavidas y botiquín de primeros auxilios. El guía conoce las rutas y adapta el recorrido al nivel del río y del grupo.',
  },
  {
    q: '¿Puedo hacer una ruta privada o a medida?',
    a: 'Sí. Las rutas se pueden hacer en privado y ajustar en días, zona y actividades. Escríbenos con tus fechas y te armamos la propuesta.',
  },
]
