import Lenis from 'lenis'
import { createContext, useContext, useRef, type RefObject } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'

type Options = {
  /** false con movimiento reducido: queda el scroll nativo. */
  enabled: boolean
  /** false mientras corre el preloader: scroll bloqueado. */
  running: boolean
}

/** Lenis movido por gsap.ticker (sin requestAnimationFrame propio) y sincronizado con ScrollTrigger. */
export function useLenis({ enabled, running }: Options) {
  const lenisRef = useRef<Lenis | null>(null)

  useGSAP(
    () => {
      if (!enabled) return
      // respectReducedMotion: false — Lenis por defecto anula el suavizado si el sistema pide
      // movimiento reducido (Windows con "Efectos de animación" apagados). Eso ya lo decide la
      // app en un solo lugar: si el modo es reducido, Lenis ni se crea (enabled = false).
      const lenis = new Lenis({
        autoRaf: false,
        anchors: true,
        lerp: 0.06,
        smoothWheel: true,
        wheelMultiplier: 1,
        syncTouch: true,
        respectReducedMotion: false,
      })
      lenisRef.current = lenis
      lenis.on('scroll', ScrollTrigger.update)

      const update = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(update)
      gsap.ticker.lagSmoothing(0)

      return () => {
        gsap.ticker.remove(update)
        gsap.ticker.lagSmoothing(500, 33)
        lenis.destroy()
        lenisRef.current = null
      }
    },
    { dependencies: [enabled] },
  )

  useGSAP(
    () => {
      // Sin Lenis (modo reducido) el bloqueo durante el preloader lo hace el overflow del documento.
      document.documentElement.classList.toggle('is-locked', !running)
      const lenis = lenisRef.current
      if (!lenis) return
      if (running) {
        lenis.start()
      } else {
        lenis.scrollTo(0, { immediate: true, force: true })
        lenis.stop()
      }
    },
    { dependencies: [enabled, running] },
  )

  return lenisRef
}

/** Instancia de Lenis para scrollTo/stop/start desde los componentes. Leer `.current` en el evento, no en el render. */
export const LenisContext = createContext<RefObject<Lenis | null>>({ current: null })

export const useLenisRef = () => useContext(LenisContext)
