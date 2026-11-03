import type { QuizController } from '../../hooks/useQuiz'
import { useQuizKeyboard } from '../../hooks/useQuizKeyboard'
import { NextButton } from './NextButton'
import { OptionButton } from './OptionButton'
import { QuestionCard } from './QuestionCard'
import { QuizProgress } from './QuizProgress'
import { TimerBar } from './TimerBar'
import './quiz.css'

export function QuizScreen({ quiz }: { quiz: QuizController }) {
  const { state, config, question, answer, remainingMs, isOvertime, select, next, previous } = quiz
  const hasSelection = answer?.selectedIndex != null
  const isLast = state.currentIndex === state.questions.length - 1

  useQuizKeyboard({ optionCount: question?.options.length ?? 0, onSelect: select, onNext: next, onPrevious: previous })

  if (!question || !answer) return null

  return (
    <main className="screen quiz">
      <QuizProgress current={state.currentIndex} answers={state.answers} accent={config.accent} />
      <TimerBar remainingMs={remainingMs} limitMs={config.timeLimitMs} isOvertime={isOvertime} />

      <QuestionCard key={question.id} question={question} index={state.currentIndex} />

      <div className="options-grid" role="radiogroup" aria-label="Alternativas">
        {question.options.map((opt, i) => (
          <OptionButton
            key={`${question.id}-${i}`}
            label={opt}
            index={i}
            selected={answer.selectedIndex === i}
            onSelect={select}
          />
        ))}
      </div>

      <nav className="quiz-actions">
        <button type="button" className="btn btn-ghost" onClick={previous} disabled={state.currentIndex === 0}>
          ◀ Voltar
        </button>
        <NextButton enabled={hasSelection} isLast={isLast} onClick={next} />
      </nav>
    </main>
  )
}
