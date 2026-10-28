import { useRef } from 'react'
import { activities } from '../data/content'
import { gsap, useGSAP } from '../lib/gsap'
import { Photo, Title } from './ui'
import './Activities.css'

export function Activities({ reduced }: { reduced: boolean }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (reduced) return
      // Las columnas derechas suben un poco más rápido que las izquierdas.
      gsap.utils.toArray<HTMLElement>('.act:nth-child(even)', root.current).forEach((el) => {
        gsap.fromTo(
          el,
          { y: 80 },
          { y: -80, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section ref={root} id="actividades" className="section acts on-dark" aria-labelledby="acts-title">
      <div className="wrap grid acts__head">
        <Title id="acts-title" className="acts__title t-xl">
          Qué haces en la expedición
        </Title>
        <p className="acts__intro dim" data-reveal>
          Las actividades cambian según la ruta, la época del año y el nivel del río.
        </p>
      </div>

      <ul className="wrap grid acts__grid">
        {activities.map((a) => (
          <li key={a.name} className="act">
            <div className="act__photo frame">
              <Photo name={a.image} sizes="(min-width: 900px) 40vw, 90vw" />
            </div>
            <div className="act__text" data-reveal>
              <h3 className="serif t-m">{a.name}</h3>
              <p className="dim">{a.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
