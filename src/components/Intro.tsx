import { useRef } from 'react'
import { site } from '../data/site'
import { gsap, SplitText, useGSAP } from '../lib/gsap'
import { Cta, Photo } from './ui'
import './Intro.css'

function Inline({ name }: { name: string }) {
  return (
    <span className="intro__img" aria-hidden="true">
      <Photo name={name} sizes="240px" />
    </span>
  )
}

export function Intro({ reduced }: { reduced: boolean }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (reduced) return
      const q = gsap.utils.selector(root)
      const trigger = { trigger: q('.intro__statement')[0], start: 'top 85%', end: 'bottom 55%', scrub: true }

      // Las fotos se abren dentro de la frase y las palabras se encienden a medida que se lee.
      gsap.from(q('.intro__img'), { width: 0, ease: 'none', stagger: 0.15, scrollTrigger: trigger })
      SplitText.create(q('.intro__words'), {
        type: 'words',
        autoSplit: true,
        onSplit: (self) => gsap.from(self.words, { opacity: 0.18, ease: 'none', stagger: 0.05, scrollTrigger: trigger }),
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section ref={root} className="section intro" aria-labelledby="intro-title">
      <div className="wrap grid">
        <h2 id="intro-title" className="intro__h small" data-reveal>
          Tours en la Amazonía peruana con guía local
        </h2>

        <p className="intro__statement serif t-l">
          <span className="intro__words">{site.guide} organiza expediciones desde Iquitos hace {site.yearsActive} años</span>{' '}
          <Inline name="nanay" /> <span className="intro__words">por los ríos Amazonas, Nanay y Marañón</span>{' '}
          <Inline name="canoa" /> <span className="intro__words">y la Reserva Nacional Pacaya Samiria</span>{' '}
          <Inline name="espejos" /> <span className="intro__words">con rutas que se ajustan a tus fechas.</span>
        </p>

        <div className="intro__foot" data-reveal>
          <p className="dim">
            Hablas directo con el guía que te acompaña en el viaje. Él define el recorrido según el nivel del río, la
            época del año y la experiencia del grupo.
          </p>
          <Cta href="#guia">Conocer a Elio</Cta>
        </div>
      </div>
    </section>
  )
}
