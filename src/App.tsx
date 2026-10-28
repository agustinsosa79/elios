import { useCallback, useEffect, useState } from 'react'
import { Preloader } from './components/Preloader'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Intro } from './components/Intro'
import { Expeditions } from './components/Expeditions'
import { Zones } from './components/Zones'
import { Activities } from './components/Activities'
import { Booking } from './components/Booking'
import { Guide } from './components/Guide'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { whatsappUrl } from './data/site'
import { LenisContext, useLenis } from './hooks/useLenis'
import { useReducedMotion } from './hooks/useMedia'
import { gsap, ScrollTrigger, useGSAP } from './lib/gsap'

export default function App() {
  const reduced = useReducedMotion()
  const [revealed, setRevealed] = useState(false)
  const [ready, setReady] = useState(false)
  const [waVisible, setWaVisible] = useState(false)
  const lenisRef = useLenis({ enabled: !reduced, running: ready })

  const onReveal = useCallback(() => setRevealed(true), [])
  const onDone = useCallback(() => setReady(true), [])

  useEffect(() => {
    document.documentElement.classList.toggle('motion-reduced', reduced)
  }, [reduced])

  // Con el preloader fuera, las medidas de la página ya son las definitivas.
  useEffect(() => {
    if (ready) ScrollTrigger.refresh()
  }, [ready])

  useGSAP(
    () => {
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 90%',
        once: true,
        onEnter: (els) =>
          gsap.to(els, {
            autoAlpha: 1,
            y: 0,
            duration: reduced ? 0.8 : 1.2,
            ease: 'expo.out',
            stagger: 0.08,
            overwrite: true,
          }),
      })

      if (!reduced) {
        gsap.utils.toArray<HTMLElement>('.frame > img').forEach((img) => {
          gsap.fromTo(
            img,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: 'none',
              scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })
      }

      ScrollTrigger.create({
        trigger: '#inicio',
        start: 'bottom center',
        endTrigger: '#contacto',
        end: 'top bottom',
        onToggle: (self) => setWaVisible(self.isActive),
      })
    },
    { dependencies: [reduced] },
  )

  return (
    <LenisContext value={lenisRef}>
      <Preloader reduced={reduced} onReveal={onReveal} onDone={onDone} />
      <Header />
      <main>
        <Hero revealed={revealed} reduced={reduced} />
        <Intro reduced={reduced} />
        <Expeditions reduced={reduced} />
        <Zones reduced={reduced} />
        <Activities reduced={reduced} />
        <Booking reduced={reduced} />
        <Guide reduced={reduced} />
        <Faq />
      </main>
      <Footer reduced={reduced} />
      <a
        className={`wa-float${waVisible ? ' is-visible' : ''}`}
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.7-1.2 2.2 2.2 0 0 0 .2-1.2c0-.1-.2-.2-.5-.3Z"
          />
        </svg>
      </a>
    </LenisContext>
  )
}
