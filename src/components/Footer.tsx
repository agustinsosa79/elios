import { useRef } from 'react'
import { photos } from '../data/images'
import { nav, site, whatsappUrl } from '../data/site'
import { gsap, useGSAP } from '../lib/gsap'
import { Arrow, Title } from './ui'
import './Footer.css'

export function Footer({ reduced }: { reduced: boolean }) {
  const root = useRef<HTMLElement>(null)
  const credits = Object.values(photos).filter((p) => p.credit)

  useGSAP(
    () => {
      if (reduced) return
      // La marca sube letra por letra mientras el footer entra en pantalla.
      gsap.from(root.current!.querySelectorAll('.footer__word span'), {
        yPercent: 100,
        ease: 'none',
        stagger: 0.08,
        scrollTrigger: { trigger: '.footer__word', start: 'top bottom', end: 'bottom bottom', scrub: true },
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <footer ref={root} id="contacto" className="footer on-dark" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="footer__cta grid">
          <Title id="contact-title" className="footer__title t-xl">
            Reserva tu expedición en la selva
          </Title>
          <div className="footer__side" data-reveal>
            <p className="dim">Te responde Elio, con itinerario y precio para tus fechas.</p>
            <a className="footer__wa serif" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <span>WhatsApp {site.phone}</span>
              <Arrow />
            </a>
          </div>
        </div>

        <div className="footer__cols grid">
          <address className="footer__col">
            <h3 className="dim small">Contacto</h3>
            <a className="link" href={`tel:+${site.phoneRaw}`}>
              {site.phone}
            </a>
            <a className="link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </address>

          <div className="footer__col">
            <h3 className="dim small">Oficina</h3>
            <a className="link" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
              {site.address}
            </a>
          </div>

          <nav className="footer__col" aria-label="Secciones">
            <h3 className="dim small">Secciones</h3>
            {nav.map((n) => (
              <a key={n.href} className="link" href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
        </div>

        <p className="footer__word serif" aria-hidden="true">
          {site.brand.split('').map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </p>

        <div className="footer__legal">
          <p className="dim small">
            © {new Date().getFullYear()} {site.legalName}. Iquitos, Loreto, Perú.
          </p>
          <details className="footer__credits">
            <summary className="dim small">Créditos fotográficos</summary>
            <ul>
              {credits.map((p) => (
                <li key={p.credit!.url} className="small">
                  <a href={p.credit!.url} target="_blank" rel="noopener noreferrer">
                    {p.credit!.author}
                  </a>{' '}
                  <span className="dim">· {p.credit!.license} · Wikimedia Commons</span>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </footer>
  )
}
