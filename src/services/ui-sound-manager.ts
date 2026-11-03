import { soundEffects } from './sound-effects.service'

let isInitialized = false
let lastTapTimestamp = 0
const TAP_THROTTLE_MS = 60

/**
 * Seletor abrangente para identificar qualquer elemento interativo clicável
 */
const INTERACTIVE_SELECTOR = [
  'button',
  'a',
  'input[type="button"]',
  'input[type="submit"]',
  'input[type="checkbox"]',
  'input[type="radio"]',
  '[role="button"]',
  '[role="tab"]',
  '[role="checkbox"]',
  '.btn',
  '.diff-card',
  '.option-btn',
  '.hub-card',
  '.keypad-btn',
  '.board-cell',
  '.action-btn',
  '.next-btn',
  '.start-action-btn',
  '.filter-tab'
].join(', ')

function handleGlobalInteraction(event: Event): void {
  const target = event.target as HTMLElement | null
  if (!target) return

  // Verifica se o elemento clicado ou algum de seus pais é interativo
  const interactiveEl = target.closest(INTERACTIVE_SELECTOR)
  if (!interactiveEl) return

  // Se o botão estiver explicitamente desabilitado, não toca som
  if (
    interactiveEl.hasAttribute('disabled') ||
    interactiveEl.getAttribute('aria-disabled') === 'true'
  ) {
    return
  }

  const now = performance.now()
  if (now - lastTapTimestamp < TAP_THROTTLE_MS) {
    return
  }
  lastTapTimestamp = now

  // Emite o clique tátil
  soundEffects.playTapSound()
}

/**
 * Registra o interceptador de som de clique e toque em nível global
 */
export function initGlobalClickSound(): () => void {
  if (typeof window === 'undefined' || isInitialized) {
    return () => {}
  }

  isInitialized = true

  // 'pointerdown' garante resposta imediata ao primeiro milissegundo do toque físico
  window.addEventListener('pointerdown', handleGlobalInteraction, { capture: true, passive: true })

  return () => {
    window.removeEventListener('pointerdown', handleGlobalInteraction, { capture: true })
    isInitialized = false
  }
}
