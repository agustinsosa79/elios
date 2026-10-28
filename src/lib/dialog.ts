// Cierre animado de <dialog>. Donde el navegador no puede transicionar `display`/`overlay`
// (Firefox, Safari) se marca data-closing, se espera la animación y recién ahí se cierra.

let supportsDisplayTransition: boolean | undefined

function canTransitionDisplay() {
  if (supportsDisplayTransition !== undefined) return supportsDisplayTransition
  if (!window.CSS?.supports?.('transition-behavior', 'allow-discrete')) return (supportsDisplayTransition = false)
  const probe = document.createElement('div')
  probe.style.cssText = 'transition: display 1s allow-discrete !important; display: block;'
  document.body.appendChild(probe)
  getComputedStyle(probe).display
  probe.style.display = 'none'
  supportsDisplayTransition = getComputedStyle(probe).display === 'block'
  probe.remove()
  return supportsDisplayTransition
}

export async function closeDialog(dialog: HTMLDialogElement) {
  const nativeExit = window.CSS?.supports?.('overlay', 'auto') && canTransitionDisplay()
  if (!nativeExit) {
    dialog.setAttribute('data-closing', '')
    const animations = dialog.getAnimations({ subtree: true })
    if (animations.length > 0) {
      await Promise.race([
        Promise.allSettled(animations.map((a) => a.finished)),
        new Promise((r) => setTimeout(r, 1200)),
      ])
    }
    dialog.removeAttribute('data-closing')
  }
  dialog.close()
}
