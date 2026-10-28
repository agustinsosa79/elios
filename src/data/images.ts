// Fotos de Wikimedia Commons (licencias CC) y una foto del sitio original del cliente.
// Cada clave tiene /img/<clave>-960.webp y, si existe, /img/<clave>-1920.webp.

type Photo = { alt: string; w: number; h: number; large: boolean; credit?: { author: string; license: string; url: string } }

export const photos: Record<string, Photo> = {
  niebla: {
    alt: 'Niebla al amanecer sobre un río de la Reserva Nacional Pacaya Samiria',
    w: 4886, h: 3212, large: true,
    credit: { author: 'Sucram Yef', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Selva_de_Parinari,_Pacaya_Samiria.jpg' },
  },
  proa: {
    alt: 'Proa de un bote navegando por el río Marañón rodeado de selva',
    w: 2048, h: 1152, large: true,
    credit: { author: 'Verlic Redclaw', license: 'CC BY 3.0', url: 'https://commons.wikimedia.org/wiki/File:Pacaya_Samiria_Mara%C3%B1on_River_(66217327).jpeg' },
  },
  espejos: {
    alt: 'Árboles reflejados en el agua en la Selva de los Espejos, Pacaya Samiria',
    w: 3968, h: 2976, large: true,
    credit: { author: 'Yndira Hildaura Tornero Cruzatt', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Reserva_Pacaya_Samiria-%22La_Selva_de_los_Espejos%22.jpg' },
  },
  pacaya: {
    alt: 'Río de aguas tranquilas entre bosque tropical en Pacaya Samiria',
    w: 5760, h: 3840, large: true,
    credit: { author: 'Techylm', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Paisaje_en_Pacaya_Samiria.jpg' },
  },
  ucayali: {
    alt: 'Nubes reflejadas en el río Ucayali al atardecer',
    w: 5513, h: 3675, large: true,
    credit: { author: 'Techylm', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Reflejos_en_R%C3%ADo_Ucayali.jpg' },
  },
  canoa: {
    alt: 'Canoa de madera tallada a orillas de un río amazónico',
    w: 2736, h: 3648, large: false,
    credit: { author: 'Jason Hollinger', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Dugout_canoe_-_Flickr_-_pellaea.jpg' },
  },
  loro: {
    alt: 'Loro harinoso en la Isla Santa Rosa, región Loreto',
    w: 3168, h: 4752, large: false,
    credit: { author: 'Eli Duke', license: 'CC BY-SA 2.0', url: 'https://commons.wikimedia.org/wiki/File:Amazona_farinosa_-Isla_Santa_Rosa,_Loreto_Region,_Peru-8a.jpg' },
  },
  nanay: {
    alt: 'Botes en la orilla del río Nanay, en Santa Clara, cerca de Iquitos',
    w: 5152, h: 3864, large: true,
    credit: { author: 'GabrieldeLoreto', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Puerto_de_Santa_Clara_en_el_r%C3%ADo_Nanay.jpg' },
  },
  belen: {
    alt: 'Mercado de Belén en Iquitos con mototaxis',
    w: 4496, h: 3000, large: true,
    credit: { author: 'M M from Switzerland', license: 'CC BY-SA 2.0', url: 'https://commons.wikimedia.org/wiki/File:Belen,_Iquitos_(11473478223).jpg' },
  },
  rios: {
    alt: 'Vista satelital de los meandros del río Ucayali en Loreto',
    w: 3875, h: 2180, large: true,
    credit: { author: 'INPE', license: 'CC BY-SA 2.0', url: 'https://commons.wikimedia.org/wiki/File:Ucayali_River_lowlands_in_Loreto,_Per%C3%BA.jpg' },
  },
  campamento: {
    alt: 'Grupo descansando en un refugio de madera durante una expedición en Parinari',
    w: 5184, h: 3888, large: true,
    credit: { author: 'Sucram Yef', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Parinari,_localidad.jpg' },
  },
  nocturna: {
    alt: 'Viajero con linterna frontal durante una caminata nocturna en la selva',
    w: 960, h: 640, large: false,
  },
}

export function photoSrc(key: string) {
  const p = photos[key]
  const small = `/img/${key}-960.webp`
  return {
    src: p.large ? `/img/${key}-1920.webp` : small,
    srcSet: p.large ? `${small} 960w, /img/${key}-1920.webp 1920w` : undefined,
    alt: p.alt,
    width: p.w,
    height: p.h,
  }
}
