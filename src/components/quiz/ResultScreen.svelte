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
      <span class="score-subtext">pontos com bônus e penalidades pedagógicas</span>
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
        <span class="stat-label">Pós-Tempo</span>
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
        <span class="stat-sub">dedicação</span>
      </div>
    </div>
  </section>

  {#if summary && summary.overtimeCount > 0}
    <aside class="overtime-alert">
      <span class="alert-icon">⏱️</span>
      <div class="alert-text">
        <strong>Persistência Reconhecida:</strong> Você continuou respondendo após o tempo zerar em {summary.overtimeCount} {summary.overtimeCount === 1 ? 'questão' : 'questões'}! Acertos receberam a penalidade pedagógica de 40% a 50%.
      </div>
    </aside>
  {/if}

  <section class="results-review">
    <h2 class="review-title">Revisão das Questões</h2>
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
      🏆 Ver Ranking
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
    gap: 0.4rem;
  }

  .results-badge {
    background: #ECFDF5;
    border: 1px solid #A7F3D0;
    color: #065F46;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.8rem;
    font-weight: 800;
  }

  .results-title {
    font-size: clamp(1.8rem, 4vw, 2.3rem);
    font-weight: 900;
    color: #0F172A;
    margin: 0;
  }

  .results-student {
    font-size: 1rem;
    color: #64748B;
    margin: 0;
  }

  .results-score-card {
    background: #FFFFFF;
    border: 2px solid #E2E8F0;
    border-radius: 20px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  }

  .score-main {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #E2E8F0;
    padding-bottom: 1.25rem;
  }

  .score-label {
    font-size: 0.8rem;
    font-weight: 850;
    color: #64748B;
    letter-spacing: 0.08em;
  }

  .score-value {
    font-size: clamp(3rem, 8vw, 4.2rem);
    font-weight: 950;
    color: #059669;
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
  }

  .score-subtext {
    font-size: 0.82rem;
    color: #94A3B8;
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
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
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
    font-weight: 800;
    color: #64748B;
    text-transform: uppercase;
  }

  .stat-val {
    font-size: 1.35rem;
    font-weight: 900;
    font-variant-numeric: tabular-nums;
  }

  .text-correct { color: #059669; }
  .text-warning { color: #D97706; }
  .text-info { color: #0284C7; }

  .stat-sub {
    font-size: 0.75rem;
    color: #94A3B8;
  }

  .overtime-alert {
    background: #FFFBEB;
    border: 1px solid #FDE68A;
    border-radius: 12px;
    padding: 1rem 1.25rem;
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    color: #92400E;
    font-size: 0.88rem;
    line-height: 1.45;
  }

  .alert-icon {
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  .results-review {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .review-title {
    font-size: 1.15rem;
    font-weight: 850;
    color: #0F172A;
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
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 0.9rem 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .review-card.is-correct { border-left: 4px solid #059669; }
  .review-card.is-wrong { border-left: 4px solid #E11D48; }

  .review-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .review-q-num {
    font-size: 0.78rem;
    font-weight: 850;
    color: #475569;
    background: #F1F5F9;
    padding: 0.15rem 0.45rem;
    border-radius: 4px;
  }

  .review-prompt {
    font-size: 1rem;
    font-weight: 800;
    color: #0F172A;
    flex: 1;
    min-width: 140px;
  }

  .review-prompt code {
    background: #F1F5F9;
    padding: 0.1rem 0.4rem;
    border-radius: 4px;
    color: #059669;
  }

  .review-status {
    font-size: 0.82rem;
    font-weight: 700;
  }

  .review-details {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    font-size: 0.85rem;
    color: #475569;
    flex-wrap: wrap;
  }

  .review-points {
    font-weight: 800;
    color: #059669;
    margin-left: auto;
  }

  .review-explanation {
    font-size: 0.82rem;
    color: #64748B;
    margin: 0.25rem 0 0;
  }

  .results-actions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }

  @media (max-width: 640px) {
    .results-container {
      padding: 0.75rem 0.75rem 2rem;
      gap: 1rem;
    }

    .results-score-card {
      padding: 1rem;
      gap: 1rem;
      border-radius: 16px;
    }

    .score-value {
      font-size: clamp(2.4rem, 7vw, 3.2rem);
    }

    .review-card-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.35rem;
    }

    .review-status {
      align-self: flex-start;
    }

    .results-actions {
      grid-template-columns: 1fr;
    }
  }

  .action-btn {
    padding: 0.9rem 1.2rem;
    border-radius: 12px;
    font-size: 0.92rem;
    font-weight: 850;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.15s ease;
    min-height: 48px;
  }

  .action-btn:active { transform: scale(0.98); }

  .action-btn.play-again {
    background: #059669;
    color: #FFFFFF;
  }

  .action-btn.play-again:hover { background: #047857; }

  .action-btn.switch-level {
    background: #F1F5F9;
    color: #334155;
    border-color: #CBD5E1;
  }

  .action-btn.switch-level:hover { background: #E2E8F0; }

  .action-btn.teacher-rank {
    background: #FFFFFF;
    color: #475569;
    border: 1px solid #CBD5E1;
  }

  .action-btn.teacher-rank:hover {
    background: #F8FAFC;
    color: #0F172A;
  }
</style>
