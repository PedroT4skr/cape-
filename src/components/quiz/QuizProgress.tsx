import type { AnswerRecord } from '../../types/quiz.types'

interface Props {
  current: number
  answers: AnswerRecord[]
  accent: string
}

/** Progresso em "pontos": dá noção concreta de quanto falta (reduz ansiedade). */
export function QuizProgress({ current, answers, accent }: Props) {
  return (
    <div className="progress" style={{ '--accent': accent } as React.CSSProperties}>
      <span className="progress-text">
        {current + 1} / {answers.length}
      </span>
      <ol className="progress-dots" aria-hidden>
        {answers.map((a, i) => (
          <li
            key={i}
            className={`dot ${i === current ? 'is-current' : ''} ${a.selectedIndex != null ? 'is-done' : ''}`}
          />
        ))}
      </ol>
    </div>
  )
}
