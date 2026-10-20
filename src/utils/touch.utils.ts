import { APP_CONFIG } from '../constants/config.constants'

/**
 * Cria um manipulador de toque protegido contra múltiplos disparos rápidos (motor spasms / accidental double tap),
 * em estrita conformidade com as diretrizes de acessibilidade W3C COGA para motricidade reduzida.
 */
export function createTouchThrottler(delayMs: number = APP_CONFIG.TOUCH_DEBOUNCE_MS) {
  let lastExecutionTime = 0

  return (callback: () => void) => {
    const now = Date.now()
    if (now - lastExecutionTime >= delayMs) {
      lastExecutionTime = now
      callback()
    }
  }
}
