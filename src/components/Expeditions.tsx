import { useEffect, useRef, useState } from 'react'
import { expeditions, type Expedition } from '../data/expeditions'
import { whatsappUrl } from '../data/site'
import { useLenisRef } from '../hooks/useLenis'
import { closeDialog } from '../lib/dialog'
import { gsap, useGSAP } from '../lib/gsap'
import { Arrow, Cta, Photo, Title } from './ui'
import './Expeditions.css'

function ExpeditionDialog({ exp, onClosed }: { exp: Expedition | null; onClosed: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const lenisRef = useLenisRef()

  useEffect(() => {
    if (exp && ref.current && !ref.current.open) {
      ref.current.showModal()
      lenisRef.current?.stop()
    }
  }, [exp, lenisRef])

  if (!exp) return null

  const close = () => ref.current && closeDialog(ref.current)

  return (
    <dialog
      ref={ref}
      className="xp-dialog"
      aria-labelledby="xp-dialog-title"
      data-lenis-prevent
      onCancel={(e) => {
        e.preventDefault()
        close()
      }}
      onClose={() => {
        lenisRef.current?.start()
        onClosed()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <div className="xp-dialog__bar">
        <span className="dim">Itinerario</span>
        <button className="xp-dialog__close" onClick={close}>
          Cerrar
        </button>
      </div>

      <div className="xp-dialog__media">
        <Photo name={exp.image} sizes="(min-width: 900px) 640px, 100vw" />
      </div>

      <div className="xp-dialog__body">
        <h3 id="xp-dialog-title" className="serif t-l">
          {exp.name}
        </h3>

        <dl className="xp-dialog__meta">
          <div>
            <dt className="dim small">Duración</dt>
            <dd>{exp.duration}</dd>
          </div>
          <div>
            <dt className="dim small">Zona</dt>
            <dd>{exp.zone}</dd>
          </div>
          <div>
            <dt className="dim small">Nivel</dt>
            <dd>{exp.level}</dd>
          </div>
          <div>
            <dt className="dim small">Precio</dt>
            <dd>{exp.price ?? 'A consultar'}</dd>
          </div>
        </dl>

        <p>{exp.summary}</p>

        <h4 className="serif t-m xp-dialog__h">Día por día</h4>
        <ol className="xp-dialog__days">
          {exp.itinerary.map((d) => (
            <li key={d.day}>
              <span className="xp-dialog__day">{d.day}</span>
              <p>{d.text}</p>
            </li>
          ))}
        </ol>

        <h4 className="serif t-m xp-dialog__h">Incluye</h4>
        <ul className="xp-dialog__includes">
          {exp.includes.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>

        <div className="xp-dialog__cta">
          <Cta variant="btn" href={whatsappUrl(`Hola, quiero consultar por la expedición "${exp.name}".`)}>
            Consultar fechas y precio
          </Cta>
        </div>
      </div>
    </dialog>
  )
}

export function Expeditions({ reduced }: { reduced: boolean }) {
  const root = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<Expedition | null>(null)

  useGSAP(
    () => {
      if (reduced) return
      const cards = gsap.utils.toArray<HTMLElement>('.xp-card', root.current)

      cards.forEach((card, i) => {
        // La foto se acomoda mientras la tarjeta sube.
        gsap.fromTo(
          card.querySelector('.xp-card__media img'),
          { yPercent: -10, scale: 1.12 },
          {
            yPercent: 0,
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'top top', scrub: true },
          },
        )
        gsap.from(card.querySelectorAll('.xp-card__body > *'), {
          autoAlpha: 0,
          y: 40,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.07,
          scrollTrigger: { trigger: card, start: 'top 45%', once: true },
        })

        // Cuando la siguiente tarjeta la tapa, esta se achica y se oscurece.
        const next = cards[i + 1]
        if (!next) return
        gsap.to(card.querySelector('.xp-card__inner'), {
          scale: 0.9,
          '--shade': 0.75,
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true },
        })
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section ref={root} id="expediciones" className="xp on-dark" aria-labelledby="xp-title">
      <div className="xp__head section wrap grid">
        <Title id="xp-title" className="xp__title t-xl">
          Expediciones desde Iquitos
        </Title>
        <p className="xp__intro dim" data-reveal>
          Cuatro rutas de 1 a 5 días. Todas incluyen guía local, transporte fluvial y alimentación.
        </p>
      </div>

      <div className="xp__stack">
        {expeditions.map((exp) => (
          <article key={exp.slug} className="xp-card" aria-labelledby={`xp-${exp.slug}`}>
            <div className="xp-card__inner">
              <div className="xp-card__media">
                <Photo name={exp.image} sizes="100vw" />
              </div>
              <div className="xp-card__shade" aria-hidden="true" />

              <div className="xp-card__body wrap grid">
                <p className="xp-card__meta">
                  {exp.duration} · {exp.zone} · Nivel {exp.level.toLowerCase()}
                </p>
                <h3 id={`xp-${exp.slug}`} className="xp-card__name serif t-xl">
                  {exp.name}
                </h3>
                <p className="xp-card__summary">{exp.summary}</p>
                <button className="btn btn--light xp-card__btn" onClick={() => setOpen(exp)} aria-haspopup="dialog">
                  <span>Ver itinerario día por día</span>
                  <Arrow dir="right" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <ExpeditionDialog exp={open} onClosed={() => setOpen(null)} />
    </section>
  )
}
