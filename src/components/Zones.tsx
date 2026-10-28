import { useEffect, useRef, useState } from 'react'
import { zones, type Zone } from '../data/content'
import { reserve, rivers, towns } from '../data/rivers'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { Photo, Title } from './ui'
import './Zones.css'

type Pt = [number, number]

// Proyección equirectangular simple: 1° = 100 unidades del SVG.
const project = ([lat, lon]: Pt): Pt => [(lon + 75.9) * 100, (-2.9 - lat) * 100]

const f = (n: number) => n.toFixed(1)

// Catmull-Rom a curvas Bézier para que los ríos no se vean como polilíneas.
function smoothPath(points: Pt[], closed = false) {
  const p = points.map(project)
  const at = (i: number) => (closed ? p[(i + p.length) % p.length] : p[Math.max(0, Math.min(p.length - 1, i))])
  let d = `M${f(p[0][0])},${f(p[0][1])}`
  const segments = closed ? p.length : p.length - 1
  for (let i = 0; i < segments; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${f(c1[0])},${f(c1[1])} ${f(c2[0])},${f(c2[1])} ${f(p2[0])},${f(p2[1])}`
  }
  return closed ? `${d}Z` : d
}

function cameraBox(c: Zone['camera']) {
  const [x, y] = project([c.lat, c.lon])
  const s = c.span * 100
  return { x: x - s / 2, y: y - s / 2, s }
}

const labelPos = {
  right: { x: 16, y: 5, textAnchor: 'start' },
  left: { x: -16, y: 5, textAnchor: 'end' },
  top: { x: 0, y: -18, textAnchor: 'middle' },
  bottom: { x: 0, y: 28, textAnchor: 'middle' },
} as const

const graticule = {
  lats: [-3.5, -4, -4.5, -5, -5.5, -6],
  lons: [-75.5, -75, -74.5, -74, -73.5, -73, -72.5],
}

function RiverMap({ active, reduced }: { active: number; reduced: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const cam = useRef(cameraBox(zones[0].camera))

  // Aplica el encuadre y compensa la escala para que trazos, puntos y textos mantengan su tamaño en pantalla.
  const apply = () => {
    const svg = svgRef.current
    if (!svg) return
    const { x, y, s } = cam.current
    svg.setAttribute('viewBox', `${f(x)} ${f(y)} ${f(s)} ${f(s)}`)
    const r = svg.getBoundingClientRect()
    // Con `slice` el lado mayor del recuadro muestra exactamente `s` unidades.
    const k = s / Math.max(1, r.width, r.height)
    svg.style.setProperty('--k', String(k))
    svg.querySelectorAll('.zmap__scale').forEach((g) => g.setAttribute('transform', `scale(${k})`))
  }

  useGSAP(
    () => {
      apply()
      const ro = new ResizeObserver(apply)
      ro.observe(svgRef.current!)
      if (!reduced) {
        gsap.from(svgRef.current!.querySelectorAll('.zmap__river'), {
          strokeDashoffset: 1,
          duration: 2.4,
          ease: 'power2.inOut',
          stagger: 0.15,
          scrollTrigger: { trigger: svgRef.current, start: 'top 75%', once: true },
        })
      }
      return () => ro.disconnect()
    },
    { dependencies: [reduced] },
  )

  useEffect(() => {
    gsap.to(cam.current, {
      ...cameraBox(zones[active].camera),
      duration: reduced ? 0 : 1.8,
      ease: 'expo.inOut',
      overwrite: true,
      onUpdate: apply,
    })
  }, [active, reduced])

  return (
    <svg ref={svgRef} className="zmap" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Mapa de los ríos y zonas que recorren las expediciones desde Iquitos">
      <defs>
        <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" className="zmap__hatch" />
        </pattern>
      </defs>

      <g className="zmap__grid">
        {graticule.lats.map((lat) => {
          const y = project([lat, 0])[1]
          return <line key={lat} x1={-200} x2={600} y1={y} y2={y} />
        })}
        {graticule.lons.map((lon) => {
          const x = project([0, lon])[0]
          return <line key={lon} y1={-200} y2={600} x1={x} x2={x} />
        })}
      </g>

      <path className={`zmap__reserve${active === 3 ? ' is-active' : ''}`} d={smoothPath(reserve, true)} />

      {rivers.map((r) => (
        <path
          key={r.name}
          className={`zmap__river${r.main ? ' zmap__river--main' : ''}`}
          d={smoothPath(r.points)}
          pathLength={1}
        />
      ))}

      {rivers
        .filter((r) => r.label)
        .map((r) => {
          const [x, y] = project(r.label!.at)
          return (
            <g key={r.name} transform={`translate(${f(x)} ${f(y)})`}>
              <g className="zmap__scale">
                <text className="zmap__river-label" transform={`rotate(${r.label!.angle})`} textAnchor="middle">
                  Río {r.name}
                </text>
              </g>
            </g>
          )
        })}

      {towns.map((t) => {
        const [x, y] = project(t.at)
        return (
          <g key={t.name} className="zmap__town" transform={`translate(${f(x)} ${f(y)})`}>
            <g className="zmap__scale">
              <circle r="2.5" />
              <text x="7" y="4">
                {t.name}
              </text>
            </g>
          </g>
        )
      })}

      {zones.map((z, i) => {
        const [x, y] = project(z.point)
        return (
          <g key={z.name} className={`zmap__pt${i === active ? ' is-active' : ''}`} transform={`translate(${f(x)} ${f(y)})`}>
            <g className="zmap__scale">
              <circle className="zmap__ring" r="11" />
              <circle className="zmap__dot" r="4.5" />
              <text {...labelPos[z.side ?? 'right']}>{z.label}</text>
            </g>
          </g>
        )
      })}
    </svg>
  )
}

export function Zones({ reduced }: { reduced: boolean }) {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.zone', root.current).forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 62%',
          end: 'bottom 62%',
          onToggle: (self) => self.isActive && setActive(i),
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="zonas" className="section zones" aria-labelledby="zones-title">
      <div className="wrap grid zones__head">
        <Title id="zones-title" className="zones__title t-xl">
          Zonas de la Amazonía peruana que recorremos
        </Title>
        <p className="zones__intro dim" data-reveal>
          Todas las rutas salen de Iquitos por río. La distancia define cuántos días necesitas.
        </p>
      </div>

      <div className="wrap grid zones__body">
        <div className="zones__map">
          <RiverMap active={active} reduced={reduced} />
          <p className="zones__map-note small" aria-hidden="true">
            {zones[active].name}
          </p>
        </div>

        <ol className="zones__list">
          {zones.map((z, i) => (
            <li key={z.name} className={`zone${i === active ? ' is-active' : ''}`}>
              <div className="zone__photo frame">
                <Photo name={z.image} sizes="(min-width: 900px) 30vw, 90vw" />
              </div>
              <p className="zone__distance dim small">{z.distance}</p>
              <h3 className="serif t-l">{z.name}</h3>
              <p className="zone__text dim">{z.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
