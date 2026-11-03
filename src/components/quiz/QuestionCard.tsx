import type { Question } from '../../types/quiz.types'

/** Foco visual: um único ponto de atenção com tipografia grande e alto contraste. */
export function QuestionCard({ question, index }: { question: Question; index: number }) {
  return (
    <section className="question-card" aria-live="polite">
      <span className="question-number">Questão {index + 1}</span>
      <h2 className="question-prompt">{question.prompt}</h2>
      {question.expression && <p className="question-expression">{question.expression}</p>}
    </section>
  )
}
