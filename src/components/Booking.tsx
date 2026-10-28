import { useRef } from 'react'
import { steps } from '../data/content'
import { whatsappUrl } from '../data/site'
import { gsap, useGSAP } from '../lib/gsap'
import { Cta, Title } from './ui'
import './Booking.css'

export function Booking({ reduced }: { reduced: boolean }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (reduced) return
      // La línea de cada paso se dibuja de izquierda a derecha antes de que aparezca el texto.
      gsap.utils.toArray<HTMLElement>('.step', root.current).forEach((el) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
        tl.from(el, { '--line': 0, duration: 1.4, ease: 'expo.inOut' })
        tl.from(el.children, { autoAlpha: 0, y: 30, duration: 1.1, ease: 'expo.out', stagger: 0.08 }, 0.35)
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section ref={root} id="reservar" className="section booking" aria-labelledby="booking-title">
      <div className="wrap grid booking__head">
        <Title id="booking-title" className="booking__title t-xl">
          Cómo reservar tu tour en Iquitos
        </Title>
        <div className="booking__side" data-reveal>
          <p className="dim">Sin formularios: la reserva se hace por WhatsApp, directo con el guía.</p>
          <Cta variant="btn" href={whatsappUrl()}>
            Escribir por WhatsApp
          </Cta>
        </div>
      </div>

      <ol className="wrap booking__steps">
        {steps.map((s) => (
          <li key={s.title} className="step grid">
            <h3 className="step__title serif t-l">{s.title}</h3>
            <p className="step__text dim">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
