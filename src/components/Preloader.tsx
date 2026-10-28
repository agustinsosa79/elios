import { useRef, useState } from 'react'
import { photoSrc } from '../data/images'
import { gsap, useGSAP } from '../lib/gsap'
import './Preloader.css'

// La última foto es la del hero: al abrirse la ventana queda exactamente debajo y el corte no se nota.
const sequence = [
  { image: 'nanay', place: 'Río Nanay' },
  { image: 'belen', place: 'Belén, Iquitos' },
  { image: 'ucayali', place: 'Río Ucayali' },
  { image: 'proa', place: 'Río Marañón' },
  { image: 'espejos', place: 'Selva de los Espejos' },
  { image: 'niebla', place: 'Pacaya Samiria' },
]

const STEP = 0.42
const MAX_WAIT_MS = 6000

function whenPageReady() {
  const hero = new Promise<void>((resolve) => {
    const img = document.querySelector<HTMLImageElement>('.hero__media img')
    if (!img || img.complete) return resolve()
    img.addEventListener('load', () => resolve(), { once: true })
    img.addEventListener('error', () => resolve(), { once: true })
  })
  const timeout = new Promise<void>((resolve) => setTimeout(resolve, MAX_WAIT_MS))
  return Promise.race([Promise.all([document.fonts.ready, hero]), timeout])
}

// Ventana centrada, en proporción 4:5, expresada como recorte de una capa a pantalla completa.
function windowBox() {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const w = Math.min(vw < 700 ? vw * 0.56 : vw * 0.22, 380)
  const h = Math.min(w * 1.25, vh * 0.56)
  const x = (vw - w) / 2
  const y = (vh - h) / 2
  return { x, y, w, h, clip: `inset(${y}px ${x}px ${y}px ${x}px)` }
}

type Props = {
  reduced: boolean
  /** La ventana empieza a abrirse: el hero puede animar su texto. */
  onReveal: () => void
  /** Terminó: se libera el scroll. */
  onDone: () => void
}

export function Preloader({ reduced, onReveal, onDone }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const [gone, setGone] = useState(false)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const win = q('.pl__window')[0]
      const layers = q('.pl__layer')
      const places = q('.pl__place')
      const count = q('.pl__count')[0]
      const box = windowBox()
      const ready = whenPageReady()
      const counter = { v: 0 }
      const paint = () => (count.textContent = String(Math.round(counter.v)))

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      if (reduced) {
        // Misma secuencia y duración, solo con fundidos.
        gsap.set(win, { clipPath: box.clip })
        gsap.set(layers.slice(1), { autoAlpha: 0 })
        gsap.set(places.slice(1), { autoAlpha: 0 })
        tl.from(q('.pl__ui'), { autoAlpha: 0, duration: 0.6 })
        layers.slice(1).forEach((layer, i) => {
          const at = 0.4 + i * STEP
          tl.to(layer, { autoAlpha: 1, duration: 0.45, ease: 'none' }, at)
          tl.to(places[i], { autoAlpha: 0, duration: 0.2, ease: 'none' }, at)
          tl.to(places[i + 1], { autoAlpha: 1, duration: 0.3, ease: 'none' }, at + 0.15)
        })
      } else {
        // Siempre fromTo con los cuatro valores: el navegador acorta `inset()` al leerlo y GSAP mezclaría números.
        const closed = `inset(${box.y + box.h / 2}px ${box.x}px ${box.y + box.h / 2}px ${box.x}px)`
        const below = `inset(${box.y + box.h}px 0px 0px 0px)`
        gsap.set(win, { clipPath: closed })
        gsap.set(layers.slice(1), { clipPath: below })
        gsap.set(places.slice(1), { yPercent: 110 })

        tl.fromTo(win, { clipPath: closed }, { clipPath: box.clip, duration: 1.1, ease: 'expo.inOut' })
        tl.from(q('.pl__ui-line'), { yPercent: 110, duration: 1, stagger: 0.06 }, 0.35)
        tl.from(layers[0].querySelector('img'), { scale: 1.3, duration: 1.6 }, 0)

        layers.slice(1).forEach((layer, i) => {
          const at = 1 + i * STEP
          tl.fromTo(layer, { clipPath: below }, { clipPath: `inset(${box.y}px 0px 0px 0px)`, duration: 0.7, ease: 'expo.inOut' }, at)
          tl.from(layer.querySelector('img'), { scale: 1.35, duration: 1.1 }, at)
          tl.to(places[i], { yPercent: -110, duration: 0.6, ease: 'expo.inOut' }, at)
          tl.to(places[i + 1], { yPercent: 0, duration: 0.6, ease: 'expo.inOut' }, at + 0.08)
        })
      }

      const seqEnd = tl.duration()
      tl.fromTo(counter, { v: 0 }, { v: 90, duration: seqEnd, ease: 'power1.inOut', onUpdate: paint }, 0)

      // Si la página todavía no cargó, la línea de tiempo espera acá.
      tl.add(() => {
        tl.pause()
        ready.then(() => tl.resume())
      })
      tl.to(counter, { v: 100, duration: 0.35, ease: 'power2.out', onUpdate: paint })

      if (reduced) {
        tl.add(onReveal)
        tl.to(root.current, { autoAlpha: 0, duration: 0.8, ease: 'none' })
      } else {
        tl.to(q('.pl__ui-line'), { yPercent: -110, duration: 0.7, ease: 'expo.in', stagger: 0.03 }, '+=0.15')
        tl.set(layers.at(-1)!, { clipPath: 'inset(0px 0px 0px 0px)' })
        tl.fromTo(win, { clipPath: box.clip }, { clipPath: 'inset(0px 0px 0px 0px)', duration: 1.3, ease: 'expo.inOut' }, '-=0.35')
        tl.add(onReveal, '-=0.75')
        tl.to(root.current, { autoAlpha: 0, duration: 0.4, ease: 'none' })
      }

      tl.add(() => {
        onDone()
        setGone(true)
      })
    },
    { scope: root },
  )

  if (gone) return null

  return (
    <div ref={root} className="pl" role="status" aria-label="Cargando">
      <div className="pl__window">
        {sequence.map((s) => {
          const p = photoSrc(s.image)
          return (
            <div className="pl__layer" key={s.image}>
              <img src={p.src} srcSet={p.srcSet} sizes="100vw" alt="" decoding="async" />
            </div>
          )
        })}
      </div>

      <div className="pl__ui" aria-hidden="true">
        <span className="pl__mask pl__brand serif">
          <span className="pl__ui-line">Elios</span>
        </span>
        <span className="pl__mask pl__tag small">
          <span className="pl__ui-line">Expediciones en la Amazonía peruana</span>
        </span>
        <span className="pl__mask pl__places serif">
          <span className="pl__ui-line">
            {sequence.map((s) => (
              <span className="pl__place" key={s.place}>
                {s.place}
              </span>
            ))}
          </span>
        </span>
        <span className="pl__mask pl__counter serif">
          <span className="pl__ui-line">
            <span className="pl__count">0</span>
          </span>
        </span>
      </div>
    </div>
  )
}
