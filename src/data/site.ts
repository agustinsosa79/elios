export const site = {
  brand: 'Elios',
  legalName: 'Elios Amazon Adventure Tour',
  descriptor: 'Expediciones amazónicas',
  city: 'Iquitos, Perú',
  guide: 'Elio Navarro Acho',
  phone: '+51 988 956 197',
  phoneRaw: '51988956197',
  email: 'elio_1963@hotmail.com',
  address: 'Pasaje Lagunas Mz. B Lote 10, Punchana, Iquitos',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Pasaje+Lagunas+Punchana+Iquitos+Peru',
  yearsActive: 30,
}

export function whatsappUrl(message = 'Hola, quiero consultar por una expedición en la selva desde Iquitos.') {
  return `https://wa.me/${site.phoneRaw}?text=${encodeURIComponent(message)}`
}

export const nav = [
  { href: '#expediciones', label: 'Expediciones' },
  { href: '#zonas', label: 'Zonas' },
  { href: '#actividades', label: 'Actividades' },
  { href: '#reservar', label: 'Reservar' },
  { href: '#preguntas', label: 'Preguntas' },
]
