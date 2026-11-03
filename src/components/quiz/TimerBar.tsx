import { SCORING } from '../../config/quiz.config'

interface Props {
  remainingMs: number
  limitMs: number
  isOvertime: boolean
}

/** Barra de tempo calma: sem sons de alarme, muda de cor gradualmente. */
export function TimerBar({ remainingMs, limitMs, isOvertime }: Props) {
  const ratio = remainingMs / limitMs
  const seconds = Math.ceil(remainingMs / 1000)
  const level = isOvertime ? 'over' : ratio < 0.25 ? 'low' : ratio < 0.5 ? 'mid' : 'ok'
  const penalty = `${SCORING.minOvertimePenalty * 100}–${SCORING.maxOvertimePenalty * 100}%`

  return (
    <div className={`timer timer-${level}`} role="timer" aria-live="off">
      <div className="timer-track">
        <div className="timer-fill" style={{ width: `${Math.max(0, ratio) * 100}%` }} />
      </div>
      <span className="timer-label">
        {isOvertime ? `⏰ Tempo esgotado — ainda vale ponto (−${penalty})` : `⏱ ${seconds}s`}
      </span>
    </div>
  )
}
