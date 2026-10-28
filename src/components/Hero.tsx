import { useRef } from 'react'
import { whatsappUrl } from '../data/site'
import { gsap, SplitText, useGSAP } from '../lib/gsap'
import { Cta, Photo } from './ui'
import './Hero.css'

export function Hero({ revealed, reduced }: { revealed: boolean; reduced: boolean }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!revealed) return
      const q = gsap.utils.selector(root)

      if (reduced) {
        gsap.from(q('.hero__title, .hero__side'), { autoAlpha: 0, duration: 1, stagger: 0.15 })
        return
      }

      SplitText.create(q('.hero__title'), {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit: (self) => gsap.from(self.lines, { yPercent: 110, duration: 1.5, ease: 'expo.out', stagger: 0.1 }),
      })
      gsap.from(q('.hero__side > *'), { autoAlpha: 0, y: 24, duration: 1.2, ease: 'expo.out', stagger: 0.1, delay: 0.45 })

      // Al salir, la foto baja más lento que el texto.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      tl.to(q('.hero__media img'), { yPercent: 18, scale: 1.08, ease: 'none' }, 0)
      tl.to(q('.hero__content'), { yPercent: -18, autoAlpha: 0.2, ease: 'none' }, 0)
    },
    { scope: root, dependencies: [revealed, reduced] },
  )

  return (
    <section ref={root} id="inicio" className={`hero on-dark${revealed ? ' is-in' : ''}`} aria-labelledby="hero-title">
      <div className="hero__media">
        <Photo name="niebla" priority sizes="100vw" />
      </div>
      <div className="hero__shade" aria-hidden="true" />

      <div className="hero__content wrap grid">
        <h1 id="hero-title" className="hero__title serif t-xxl">
          Expediciones en la selva amazónica desde Iquitos
        </h1>

        <div className="hero__side">
          <p className="hero__lead">
            Tours de 1 a 5 días por el río Amazonas, el río Nanay y la Reserva Nacional Pacaya Samiria, con guía local.
          </p>
          <div className="hero__ctas">
            <Cta href="#expediciones">Ver expediciones</Cta>
            <Cta href={whatsappUrl()}>Consultar por WhatsApp</Cta>
          </div>
        </div>
      </div>
    </section>
  )
}
