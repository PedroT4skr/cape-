import { DIFFICULTIES } from '../../config/quiz.config'
import type { Difficulty } from '../../types/quiz.types'

interface Props {
  id: Difficulty
  selected: boolean
  onSelect: (id: Difficulty) => void
}

export function DifficultyCard({ id, selected, onSelect }: Props) {
  const cfg = DIFFICULTIES[id]
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className={`difficulty-card ${selected ? 'is-selected' : ''}`}
      style={{ '--accent': cfg.accent } as React.CSSProperties}
      onClick={() => onSelect(id)}
    >
      <span className="difficulty-emoji" aria-hidden>{cfg.emoji}</span>
      <strong>{cfg.label}</strong>
      <span className="difficulty-desc">{cfg.description}</span>
      <span className="difficulty-meta">
        {cfg.questionCount} questões · {cfg.timeLimitMs / 1000}s cada
      </span>
    </button>
  )
}
