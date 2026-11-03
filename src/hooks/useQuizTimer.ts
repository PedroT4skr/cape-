import { useEffect, useRef } from 'react'
import { TIMER_TICK_MS } from '../config/quiz.config'

/**
 * Relógio baseado em delta real (performance.now), imune a atrasos do setInterval
 * e pausado automaticamente quando a aba fica oculta (evita punir distrações externas).
 */
export function useQuizTimer(active: boolean, onTick: (deltaMs: number) => void) {
  const tickRef = useRef(onTick)
  tickRef.current = onTick

  useEffect(() => {
    if (!active) return
    let last = performance.now()

    const id = window.setInterval(() => {
      const now = performance.now()
      const delta = now - last
      last = now
      if (document.visibilityState === 'visible') tickRef.current(delta)
    }, TIMER_TICK_MS)

    const onVisibility = () => {
      last = performance.now()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [active])
}
