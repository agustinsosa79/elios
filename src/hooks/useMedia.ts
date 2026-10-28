import { useEffect, useState } from 'react'

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/**
 * Único lugar donde se decide el modo de movimiento de toda la app.
 * No se lee `prefers-reduced-motion`: Windows lo activa con solo apagar "Efectos de animación",
 * y eso dejaba el sitio sin Lenis ni animaciones. Para volver a respetarlo:
 * `useMediaQuery('(prefers-reduced-motion: reduce)')`.
 */
export const useReducedMotion = () => false
