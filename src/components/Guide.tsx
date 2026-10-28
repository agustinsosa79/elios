import { useRef } from 'react'
import { site, whatsappUrl } from '../data/site'
import { gsap, useGSAP } from '../lib/gsap'
import { Cta, Photo, Title } from './ui'
import './Guide.css'

export function Guide({ reduced }: { reduced: boolean }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (reduced) return
      // La foto se abre desde una ventana chica hasta ocupar su marco.
      gsap.fromTo(
        root.current!.querySelector('.guide__photo'),
        { clipPath: 'inset(18% 22% 18% 22%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'center 55%', scrub: true },
        },
      )
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section ref={root} id="guia" className="section guide on-dark" aria-labelledby="guide-title">
      <div className="wrap grid guide__grid">
        <div className="guide__text">
          <Title id="guide-title" className="t-xl">
            Elio Navarro Acho, tu guía en Iquitos
          </Title>
          <div className="guide__copy" data-reveal>
            <p className="lead">
              Fundador de Elios. Organiza viajes por la selva desde Iquitos hace más de {site.yearsActive} años.
            </p>
            <p className="dim">
              Arma cada expedición según tus fechas, el nivel del río y la experiencia del grupo, y te acompaña durante
              todo el recorrido. Hablas directo con él, sin intermediarios.
            </p>
            <Cta href={whatsappUrl('Hola Elio, quiero consultar por una expedición.')}>Hablar con Elio</Cta>
          </div>
        </div>

        <div className="guide__photo frame">
          <Photo name="rios" sizes="(min-width: 900px) 40vw, 100vw" />
        </div>
      </div>
    </section>
  )
}
