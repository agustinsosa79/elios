import { useRef, type ElementType, type ReactNode } from 'react'
import { photoSrc } from '../data/images'
import { useReducedMotion } from '../hooks/useMedia'
import { gsap, SplitText, useGSAP } from '../lib/gsap'

type TitleProps = {
  as?: ElementType
  id?: string
  className?: string
  delay?: number
  children: ReactNode
}

// Título que entra línea por línea desde una máscara. Las líneas se recalculan solas al cambiar el ancho.
export function Title({ as: Tag = 'h2', id, className = '', delay = 0, children }: TitleProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const el = ref.current!
      const trigger = { trigger: el, start: 'top 88%', once: true }
      if (reduced) {
        gsap.from(el, { autoAlpha: 0, duration: 1, delay, scrollTrigger: trigger })
        return
      }
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.3,
            ease: 'expo.out',
            stagger: 0.09,
            delay,
            scrollTrigger: trigger,
          }),
      })
    },
    { scope: ref, dependencies: [reduced] },
  )

  return (
    <Tag ref={ref} id={id} className={`serif ${className}`}>
      {children}
    </Tag>
  )
}

export function Arrow({ dir = 'up-right' }: { dir?: 'up-right' | 'down' | 'right' }) {
  const d = {
    'up-right': 'M3 11 11 3M4.5 3H11v6.5',
    down: 'M7 1v12M2 8l5 5 5-5',
    right: 'M1 7h12M8 2l5 5-5 5',
  }[dir]
  return (
    <svg className={`link__arrow${dir === 'down' ? ' link__arrow--down' : ''}`} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

type CtaProps = {
  href: string
  children: string
  variant?: 'link' | 'btn'
  arrow?: 'up-right' | 'down' | 'right'
  className?: string
}

// Los enlaces internos (#seccion) los resuelve Lenis con `anchors: true`.
export function Cta({ href, children, variant = 'link', arrow, className = '' }: CtaProps) {
  const external = /^https?:/.test(href)
  return (
    <a
      href={href}
      className={`${variant} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span>{children}</span>
      <Arrow dir={arrow ?? (external ? 'up-right' : 'down')} />
    </a>
  )
}

type PhotoProps = {
  name: string
  sizes?: string
  priority?: boolean
  className?: string
}

export function Photo({ name, sizes = '100vw', priority = false, className }: PhotoProps) {
  const p = photoSrc(name)
  return (
    <img
      className={className}
      src={p.src}
      srcSet={p.srcSet}
      sizes={p.srcSet ? sizes : undefined}
      alt={p.alt}
      width={p.width}
      height={p.height}
      decoding="async"
      {...(priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
    />
  )
}
