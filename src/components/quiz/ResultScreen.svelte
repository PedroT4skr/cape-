<script lang="ts">
  import {
    playerName,
    currentDifficulty,
    quizQuestions,
    quizAnswers,
    currentSummary,
    startQuiz,
    resetQuiz,
    isTeacherGateOpen
  } from '../../stores/quiz.store'
  import { DIFFICULTIES } from '../../config/quiz.config'

  let config = $derived(DIFFICULTIES[$currentDifficulty])
  let total = $derived($quizQuestions.length)
  let summary = $derived($currentSummary)
  let accuracyPercent = $derived(
    summary && total > 0 ? Math.round((summary.correctCount / total) * 100) : 0
  )
  let totalDurationSec = $derived(
    Math.round($quizAnswers.reduce((acc, a) => acc + (a.elapsedMs || 0), 0) / 1000)
  )

  function handlePlayAgain() {
    startQuiz($playerName, $currentDifficulty)
  }
</script>

<div class="results-container">
  <header class="results-header">
    <span class="results-badge">{config.label.toUpperCase()}</span>
    <h1 class="results-title">Quiz Concluído! 🎉</h1>
    <p class="results-student">Parabéns pelo esforço, <strong>{$playerName}</strong>!</p>
  </header>

  <section class="results-score-card">
    <div class="score-main">
      <span class="score-label">PONTUAÇÃO FINAL</span>
      <span class="score-value">{summary?.totalScore ?? 0}</span>
      <span class="score-subtext">pontos calculados com bônus e penalidades pedagógicas</span>
    </div>

    <div class="score-stats-grid">
      <div class="stat-box">
        <span class="stat-label">Acertos</span>
        <span class="stat-val text-correct">
          {summary?.correctCount ?? 0} / {total}
        </span>
        <span class="stat-sub">{accuracyPercent}% de precisão</span>
      </div>

      <div class="stat-box">
        <span class="stat-label">Com Penalidade</span>
        <span class="stat-val text-warning">
          {summary?.overtimeCount ?? 0}
        </span>
        <span class="stat-sub">respondidas após o tempo</span>
      </div>

      <div class="stat-box">
        <span class="stat-label">Tempo Total</span>
        <span class="stat-val text-info">
          {totalDurationSec}s
        </span>
        <span class="stat-sub">dedicação e foco</span>
      </div>
    </div>
  </section>

  {#if summary && summary.overtimeCount > 0}
    <aside class="overtime-alert">
      <span class="alert-icon">⏱️</span>
      <div class="alert-text">
        <strong>Mecânica TDAH Ativa:</strong> Você continuou respondendo após o tempo zerar em {summary.overtimeCount} {summary.overtimeCount === 1 ? 'questão' : 'questões'}! Acertos receberam penalidade pedagógica de 40% a 50%, valorizando a persistência sem bloqueios cognitivos.
      </div>
    </aside>
  {/if}

  <section class="results-review">
    <h2 class="review-title">Revisão Rápida das Questões</h2>
    <div class="review-list">
      {#each $quizQuestions as q, idx}
        {@const ans = $quizAnswers[idx]}
        {@const breakdown = summary?.breakdowns[idx]}
        {@const isCorrect = breakdown?.isCorrect ?? false}
        {@const isOvertime = breakdown?.isOvertime ?? false}
        {@const selectedIdx = ans?.selectedIndex}

        <div class="review-card {isCorrect ? 'is-correct' : 'is-wrong'}">
          <div class="review-card-header">
            <span class="review-q-num">Q{idx + 1}</span>
            <span class="review-prompt">
              {q.prompt} {#if q.expression}<code>{q.expression}</code>{/if}
            </span>
            <span class="review-status">
              {isCorrect ? (isOvertime ? '⚠️ Acertou c/ Penalidade' : '✅ Acertou') : '❌ Errou'}
            </span>
          </div>
          <div class="review-details">
            <span>
              Sua resposta: <strong>{selectedIdx !== null && selectedIdx !== undefined ? q.options[selectedIdx] : 'Não respondida'}</strong>
            </span>
            {#if !isCorrect}
              <span>
                Resposta certa: <strong class="text-correct">{q.options[q.correctIndex]}</strong>
              </span>
            {/if}
            <span class="review-points">+{breakdown?.finalPoints ?? 0} pts</span>
          </div>
          {#if q.explanation}
            <p class="review-explanation">💡 <em>{q.explanation}</em></p>
          {/if}
        </div>
      {/each}
    </div>
  </section>

  <footer class="results-actions">
    <button type="button" class="action-btn play-again" onclick={handlePlayAgain}>
      🔄 Jogar Novamente
    </button>
    <button type="button" class="action-btn switch-level" onclick={resetQuiz}>
      🏠 Início / Mudar Nível
    </button>
    <button
      type="button"
      class="action-btn teacher-rank"
      onclick={() => isTeacherGateOpen.set(true)}
    >
      🏆 Ver Ranking (Professor)
    </button>
  </footer>
</div>

<style>
  .results-container {
    max-width: 820px;
    margin: 0 auto;
    padding: 1.5rem 1rem 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    animation: fadeIn 0.3s ease-out;
  }

  .results-header {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .results-badge {
    background: #1e293b;
    border: 1px solid #10b981;
    color: #10b981;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.8rem;
    font-weight: 700;
  }

  .results-title {
    font-size: clamp(1.8rem, 4vw, 2.4rem);
    font-weight: 800;
    color: #f8fafc;
    margin: 0;
  }

  .results-student {
    font-size: 1.1rem;
    color: #94a3b8;
    margin: 0;
  }

  .results-score-card {
    background: #1e293b;
    border: 2px solid #334155;
    border-radius: 16px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  }

  .score-main {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #334155;
    padding-bottom: 1.25rem;
  }

  .score-label {
    font-size: 0.85rem;
    font-weight: 700;
    color: #94a3b8;
    letter-spacing: 0.08em;
  }

  .score-value {
    font-size: clamp(3rem, 8vw, 4.5rem);
    font-weight: 900;
    color: #10b981;
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
    text-shadow: 0 0 24px rgba(16, 185, 129, 0.35);
  }

  .score-subtext {
    font-size: 0.85rem;
    color: #64748b;
  }

  .score-stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  @media (max-width: 580px) {
    .score-stats-grid {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }
  }

  .stat-box {
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 12px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.25rem;
  }

  .stat-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
  }

  .stat-val {
    font-size: 1.4rem;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }

  .text-correct { color: #10b981; }
  .text-warning { color: #f59e0b; }
  .text-info { color: #38bdf8; }

  .stat-sub {
    font-size: 0.75rem;
    color: #64748b;
  }

  .overtime-alert {
    background: rgba(245, 158, 11, 0.12);
    border: 1px solid #f59e0b;
    border-radius: 12px;
    padding: 1rem 1.25rem;
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    color: #fef3c7;
    font-size: 0.9rem;
    line-height: 1.45;
  }

  .alert-icon {
    font-size: 1.3rem;
    flex-shrink: 0;
  }

  .results-review {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .review-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: #f8fafc;
    margin: 0;
  }

  .review-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-height: 380px;
    overflow-y: auto;
    padding-right: 0.25rem;
  }

  .review-card {
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 10px;
    padding: 0.9rem 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .review-card.is-correct { border-left: 4px solid #10b981; }
  .review-card.is-wrong { border-left: 4px solid #ef4444; }

  .review-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .review-q-num {
    font-size: 0.8rem;
    font-weight: 700;
    color: #94a3b8;
    background: #0f172a;
    padding: 0.15rem 0.45rem;
    border-radius: 4px;
  }

  .review-prompt {
    font-size: 1.05rem;
    font-weight: 700;
    color: #f8fafc;
    flex: 1;
    min-width: 140px;
  }

  .review-prompt code {
    background: #0f172a;
    padding: 0.1rem 0.4rem;
    border-radius: 4px;
    color: #10b981;
  }

  .review-status {
    font-size: 0.85rem;
    font-weight: 600;
  }

  .review-details {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    font-size: 0.85rem;
    color: #cbd5e1;
    flex-wrap: wrap;
  }

  .review-points {
    font-weight: 700;
    color: #10b981;
    margin-left: auto;
  }

  .review-explanation {
    font-size: 0.85rem;
    color: #94a3b8;
    margin: 0.25rem 0 0;
  }

  .results-actions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }

  @media (max-width: 640px) {
    .results-actions {
      grid-template-columns: 1fr;
    }
  }

  .action-btn {
    padding: 0.9rem 1.2rem;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    border: 1px solid transparent;
    transition: transform 0.15s ease, filter 0.15s ease;
    min-height: 52px;
  }

  .action-btn:active { transform: scale(0.98); }

  .action-btn.play-again {
    background: #10b981;
    color: #022c22;
    border-color: #059669;
  }

  .action-btn.play-again:hover { filter: brightness(1.1); }

  .action-btn.switch-level {
    background: #334155;
    color: #f8fafc;
    border-color: #475569;
  }

  .action-btn.switch-level:hover { background: #475569; }

  .action-btn.teacher-rank {
    background: #0f172a;
    color: #cbd5e1;
    border: 1px solid #475569;
  }

  .action-btn.teacher-rank:hover {
    background: #1e293b;
    color: #f8fafc;
  }
</style>
