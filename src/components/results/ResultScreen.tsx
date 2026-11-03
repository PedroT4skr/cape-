import type { FC } from 'react'
import type { QuizController } from '../../hooks/useQuiz'
import { DIFFICULTIES } from '../../config/quiz.config'
import './results.css'

interface ResultScreenProps {
  quiz: QuizController
  onOpenLeaderboard: () => void
}

export const ResultScreen: FC<ResultScreenProps> = ({ quiz, onOpenLeaderboard }) => {
  const { state, summary, start, reset } = quiz
  const diffConfig = DIFFICULTIES[state.difficulty]

  const totalQuestions = state.questions.length
  const accuracyPercent = summary && totalQuestions > 0
    ? Math.round((summary.correctCount / totalQuestions) * 100)
    : 0

  const handlePlayAgain = () => {
    start(state.playerName, state.difficulty)
  }

  const totalDurationMs = state.answers.reduce((acc, a) => acc + (a.elapsedMs || 0), 0)

  return (
    <div className="results-container">
      <header className="results-header">
        <span className="results-badge">{diffConfig.label.toUpperCase()}</span>
        <h1 className="results-title">Quiz Concluído! 🎉</h1>
        <p className="results-student">Parabéns pelo esforço, <strong>{state.playerName || 'Aluno'}</strong>!</p>
      </header>

      <section className="results-score-card">
        <div className="score-main">
          <span className="score-label">PONTUAÇÃO FINAL</span>
          <span className="score-value">{summary?.totalScore ?? 0}</span>
          <span className="score-subtext">pontos calculados com bônus e penalidades</span>
        </div>

        <div className="score-stats-grid">
          <div className="stat-box">
            <span className="stat-label">Acertos</span>
            <span className="stat-val text-correct">
              {summary?.correctCount ?? 0} / {totalQuestions}
            </span>
            <span className="stat-sub">{accuracyPercent}% de precisão</span>
          </div>

          <div className="stat-box">
            <span className="stat-label">Com Penalidade</span>
            <span className="stat-val text-warning">
              {summary?.overtimeCount ?? 0}
            </span>
            <span className="stat-sub">respondidas após o tempo</span>
          </div>

          <div className="stat-box">
            <span className="stat-label">Tempo Total</span>
            <span className="stat-val text-info">
              {Math.round(totalDurationMs / 1000)}s
            </span>
            <span className="stat-sub">dedicação e foco</span>
          </div>
        </div>
      </section>

      {summary && summary.overtimeCount > 0 && (
        <aside className="overtime-alert">
          <span className="alert-icon">⏱️</span>
          <div className="alert-text">
            <strong>Mecânica TDAH Ativa:</strong> Você continuou respondendo após o tempo zerar em {summary.overtimeCount} {summary.overtimeCount === 1 ? 'questão' : 'questões'}! Acertos receberam penalidade pedagógica de 40% a 50%, garantindo persistência sem bloqueios cognitivos.
          </div>
        </aside>
      )}

      <section className="results-review">
        <h2 className="review-title">Revisão Rápida das Questões</h2>
        <div className="review-list">
          {state.questions.map((q, idx) => {
            const ans = state.answers[idx]
            const breakdown = summary?.breakdowns[idx]
            const isCorrect = breakdown?.isCorrect ?? false
            const isOvertime = breakdown?.isOvertime ?? false
            const selectedIdx = ans?.selectedIndex

            return (
              <div
                key={q.id}
                className={`review-card ${isCorrect ? 'is-correct' : 'is-wrong'}`}
              >
                <div className="review-card-header">
                  <span className="review-q-num">Q{idx + 1}</span>
                  <span className="review-prompt">
                    {q.prompt} {q.expression ? <code>{q.expression}</code> : ''}
                  </span>
                  <span className="review-status">
                    {isCorrect ? (isOvertime ? '⚠️ Acertou c/ Penalidade' : '✅ Acertou') : '❌ Errou'}
                  </span>
                </div>
                <div className="review-details">
                  <span>
                    Sua resposta:{' '}
                    <strong>{selectedIdx != null && q.options[selectedIdx] != null ? q.options[selectedIdx] : 'Não respondida'}</strong>
                  </span>
                  {!isCorrect && (
                    <span>
                      Resposta certa: <strong className="text-correct">{q.options[q.correctIndex]}</strong>
                    </span>
                  )}
                  <span className="review-points">+{breakdown?.finalPoints ?? 0} pts</span>
                </div>
                {q.explanation && (
                  <p className="review-explanation">💡 <em>{q.explanation}</em></p>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <footer className="results-actions">
        <button type="button" className="action-btn play-again" onClick={handlePlayAgain}>
          🔄 Jogar Novamente
        </button>
        <button type="button" className="action-btn switch-level" onClick={reset}>
          🏠 Início / Mudar Nível
        </button>
        <button type="button" className="action-btn teacher-rank" onClick={onOpenLeaderboard}>
          🏆 Ver Ranking (Professor)
        </button>
      </footer>
    </div>
  )
}
