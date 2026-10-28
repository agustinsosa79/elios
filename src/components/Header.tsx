import { useRef, useState } from 'react'
import { nav, site, whatsappUrl } from '../data/site'
import { useLenisRef } from '../hooks/useLenis'
import { ScrollTrigger, useGSAP } from '../lib/gsap'
import { closeDialog } from '../lib/dialog'
import { Arrow } from './ui'
import './Header.css'

export function Header() {
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const menuRef = useRef<HTMLDialogElement>(null)
  const lenisRef = useLenisRef()

  useGSAP(() => {
    // Sobre la foto del hero el header es transparente; después toma el fondo del papel.
    ScrollTrigger.create({
      trigger: '#inicio',
      start: 'bottom top+=80',
      onEnter: () => setSolid(true),
      onLeaveBack: () => setSolid(false),
    })
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => setHidden(self.direction === 1 && self.scroll() > 600),
    })
  })

  const openMenu = () => {
    menuRef.current?.showModal()
    lenisRef.current?.stop()
  }

  const closeMenu = () => menuRef.current && closeDialog(menuRef.current)

  const go = (href: string) => {
    menuRef.current?.close()
    lenisRef.current?.start()
    lenisRef.current?.scrollTo(href, { duration: 1.6 })
  }

  return (
    <>
      <header className={`header${hidden ? ' is-hidden' : ''}${solid ? ' is-solid' : ''}`}>
        <div className="header__inner wrap">
          <a href="#inicio" className="header__logo serif" aria-label={`${site.legalName}, inicio`}>
            {site.brand}
          </a>

          <nav className="header__nav" aria-label="Principal">
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <a className="header__link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a className="header__cta link" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            <span>Reservar por WhatsApp</span>
            <Arrow />
          </a>

          <button className="header__menu" onClick={openMenu} aria-haspopup="dialog">
            Menú
          </button>
        </div>
      </header>

      <dialog
        ref={menuRef}
        className="menu on-dark"
        aria-label="Menú"
        data-lenis-prevent
        onCancel={(e) => {
          e.preventDefault()
          closeMenu()
        }}
        onClose={() => lenisRef.current?.start()}
      >
        <div className="menu__top wrap">
          <span className="header__logo serif">{site.brand}</span>
          <button className="header__menu" onClick={closeMenu}>
            Cerrar
          </button>
        </div>
        <nav className="menu__nav wrap" aria-label="Menú móvil">
          <ul>
            {nav.map((item, i) => (
              <li key={item.href} style={{ transitionDelay: `${0.1 + i * 0.05}s` }}>
                <a
                  href={item.href}
                  className="serif"
                  onClick={(e) => {
                    e.preventDefault()
                    go(item.href)
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu__foot wrap">
          <a className="btn btn--light" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            <span>Reservar por WhatsApp</span>
            <Arrow />
          </a>
          <a className="dim" href={`tel:+${site.phoneRaw}`}>
            {site.phone}
          </a>
        </div>
      </dialog>
    </>
  )
}
