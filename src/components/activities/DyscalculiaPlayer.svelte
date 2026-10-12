<script lang="ts">
  import {
    activitySession,
    submitAnswer,
    repeatPrompt,
    exitActivity
  } from '../../stores/activity.store'
  import ActivityQuestionView from './ActivityQuestionView.svelte'
  import ActivityCelebration from './ActivityCelebration.svelte'
  import { Volume2, X } from '@lucide/svelte'

  let currentQ = $derived(
    $activitySession.questions[$activitySession.currentQuestionIndex]
  )
</script>

{#if $activitySession.isActive}
  <div class="activity-player-overlay">
    {#if $activitySession.isCompleted}
      <ActivityCelebration
        score={$activitySession.score}
        total={$activitySession.questions.length}
      />
    {:else if currentQ}
      <div class="player-container">
        <!-- Barra de Topo -->
        <header class="player-header">
          <button class="exit-btn" onclick={exitActivity} aria-label="Sair da atividade">
            <X size={22} strokeWidth={2.4} />
            <span>SAIR</span>
          </button>

          <div class="progress-info">
            <span class="progress-text">
              DESAFIO {$activitySession.currentQuestionIndex + 1} DE {$activitySession.questions.length}
            </span>
            <div class="progress-track">
              <div
                class="progress-fill"
                style="width: {(($activitySession.currentQuestionIndex + 1) / $activitySession.questions.length) * 100}%;"
              ></div>
            </div>
          </div>

          <button class="audio-btn" onclick={repeatPrompt} aria-label="Repetir instrução em voz alta">
            <Volume2 size={24} strokeWidth={2.4} />
            <span>OUVIR</span>
          </button>
        </header>

        <!-- Pergunta em Destaque Lúdico -->
        <div class="prompt-banner">
          <h1 class="prompt-text">{currentQ.prompt}</h1>
        </div>

        <!-- Feedback Dinâmico Gamificado -->
        {#if $activitySession.encouragementMessage}
          <div
            class="feedback-banner {$activitySession.lastAnswerCorrect ? 'correct' : 'retry'}"
            role="status"
          >
            {$activitySession.encouragementMessage}
          </div>
        {/if}

        <!-- Área Concreta / Pictórica Central (Preenche a Viewport) -->
        <div class="stage-area">
          <ActivityQuestionView question={currentQ} />
        </div>

        <!-- Opções Táteis de Resposta Amplas e Coloridas (Acessibilidade W3C COGA) -->
        <footer class="options-container options-{currentQ.options.length}">
          {#each currentQ.options as option, idx}
            <button
              class="option-btn color-scheme-{idx % 3} {option.label.length <= 2 ? 'is-number' : 'is-text'}"
              disabled={$activitySession.isProcessing}
              onclick={() => submitAnswer(option)}
            >
              <span class="option-label">
                {option.label}
              </span>
              {#if option.emojiVisual}
                <span class="option-hint">{option.emojiVisual}</span>
              {/if}
            </button>
          {/each}
        </footer>
      </div>
    {/if}
  </div>
{/if}

<style>
  .activity-player-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: #F8FAFC;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100vh;
    height: 100dvh;
    max-height: 100dvh;
    padding-top: env(safe-area-inset-top, 0);
    padding-bottom: env(safe-area-inset-bottom, 0);
    box-sizing: border-box;
  }

  .player-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    max-width: 1380px;
    margin: 0 auto;
    padding: 10px 24px;
    box-sizing: border-box;
    justify-content: space-between;
    overflow: hidden;
  }

  .player-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    height: 52px;
    flex-shrink: 0;
  }

  .exit-btn {
    background: #F1F5F9;
    border: 2.5px solid #CBD5E1;
    border-radius: 14px;
    padding: 8px 18px;
    font-size: 0.95rem;
    font-weight: 950;
    color: #475569;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    box-shadow: 0 3px 0 #CBD5E1;
    transition: transform 0.1s ease, background 0.15s ease;
  }

  .exit-btn:active {
    transform: translateY(2px);
    box-shadow: 0 1px 0 #CBD5E1;
  }

  .progress-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .progress-text {
    font-size: 0.92rem;
    font-weight: 950;
    color: #1E293B;
    letter-spacing: 0.5px;
  }

  .progress-track {
    width: 100%;
    max-width: 360px;
    height: 12px;
    background: #E2E8F0;
    border-radius: 10px;
    overflow: hidden;
    border: 1.5px solid #CBD5E1;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #3B82F6, #10B981);
    border-radius: 8px;
    transition: width 0.3s ease;
  }

  .audio-btn {
    background: #2563EB;
    border: none;
    color: #FFFFFF;
    border-radius: 14px;
    padding: 9px 20px;
    font-size: 0.95rem;
    font-weight: 950;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    box-shadow: 0 4px 0 #1D4ED8, 0 6px 14px rgba(37, 99, 235, 0.25);
    transition: transform 0.1s ease;
  }

  .audio-btn:active {
    transform: translateY(2px);
    box-shadow: 0 2px 0 #1D4ED8;
  }

  .prompt-banner {
    background: #FFFFFF;
    border: 4px solid #3B82F6;
    border-radius: 22px;
    padding: 10px 24px;
    text-align: center;
    box-shadow: 0 6px 18px rgba(59, 130, 246, 0.12);
    margin: 4px 0;
    flex-shrink: 0;
  }

  .prompt-text {
    font-size: clamp(1.3rem, 3.2vw, 2.1rem);
    font-weight: 950;
    color: #1E3A8A;
    margin: 0;
    letter-spacing: 0.5px;
  }

  .feedback-banner {
    padding: 8px 18px;
    border-radius: 14px;
    font-size: 1.2rem;
    font-weight: 950;
    text-align: center;
    animation: fadeIn 0.2s ease-in-out;
    flex-shrink: 0;
  }

  .feedback-banner.correct {
    background: #DCFCE7;
    color: #15803D;
    border: 3px solid #4ADE80;
    box-shadow: 0 4px 12px rgba(74, 222, 128, 0.25);
  }

  .feedback-banner.retry {
    background: #FEF9C3;
    color: #A16207;
    border: 3px solid #FACC15;
    box-shadow: 0 4px 12px rgba(250, 204, 21, 0.25);
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .stage-area {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 0;
    width: 100%;
    margin: 4px 0;
    overflow: hidden;
  }

  /* Opções Táteis e Lúdicas Amplas */
  .options-container {
    display: flex;
    gap: clamp(16px, 2.8vw, 32px);
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    justify-content: center;
    padding-bottom: 8px;
    flex-shrink: 0;
  }

  .options-container.options-2 .option-btn {
    flex: 1;
    max-width: 580px;
    min-height: clamp(105px, 16vh, 155px);
  }

  .options-container.options-3 .option-btn {
    flex: 1;
    max-width: 390px;
    min-height: clamp(95px, 14.5vh, 145px);
  }

  .option-btn {
    border-radius: 26px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    cursor: pointer;
    transition: transform 0.1s ease, box-shadow 0.1s ease, filter 0.15s ease;
    padding: 12px 24px;
    box-sizing: border-box;
    user-select: none;
  }

  .option-btn:disabled {
    cursor: default;
    opacity: 0.88;
    transform: none !important;
  }

  /* Esquema 0: Azul Royal Vibrante Gamificado (Duolingo/Kids 3D) */
  .option-btn.color-scheme-0 {
    background: #2563EB;
    border: 4px solid #60A5FA;
    box-shadow: 0 8px 0 #1D4ED8, 0 14px 24px rgba(37, 99, 235, 0.3);
    color: #FFFFFF;
  }

  .option-btn.color-scheme-0:hover {
    filter: brightness(1.06);
  }

  .option-btn.color-scheme-0:active {
    transform: translateY(6px);
    box-shadow: 0 2px 0 #1D4ED8, 0 6px 12px rgba(37, 99, 235, 0.2);
  }

  /* Esquema 1: Laranja/Coral Quente Vibrante Gamificado */
  .option-btn.color-scheme-1 {
    background: #EA580C;
    border: 4px solid #FDBA74;
    box-shadow: 0 8px 0 #C2410C, 0 14px 24px rgba(234, 88, 12, 0.3);
    color: #FFFFFF;
  }

  .option-btn.color-scheme-1:hover {
    filter: brightness(1.06);
  }

  .option-btn.color-scheme-1:active {
    transform: translateY(6px);
    box-shadow: 0 2px 0 #C2410C, 0 6px 12px rgba(234, 88, 12, 0.2);
  }

  /* Esquema 2: Verde Esmeralda Vibrante Gamificado */
  .option-btn.color-scheme-2 {
    background: #059669;
    border: 4px solid #6EE7B7;
    box-shadow: 0 8px 0 #047857, 0 14px 24px rgba(5, 150, 105, 0.3);
    color: #FFFFFF;
  }

  .option-btn.color-scheme-2:hover {
    filter: brightness(1.06);
  }

  .option-btn.color-scheme-2:active {
    transform: translateY(6px);
    box-shadow: 0 2px 0 #047857, 0 6px 12px rgba(5, 150, 105, 0.2);
  }

  .option-label {
    font-weight: 950;
    line-height: 1.05;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    letter-spacing: 0.5px;
  }

  .option-btn.is-number .option-label {
    font-size: clamp(3rem, 6.5vw, 4.8rem);
  }

  .option-btn.is-text .option-label {
    font-size: clamp(1.4rem, 2.9vw, 2.2rem);
    text-transform: uppercase;
  }

  .option-hint {
    font-size: clamp(1.4rem, 2.8vw, 2.1rem);
    letter-spacing: 1px;
    line-height: 1;
    color: #FFFFFF;
    font-weight: 900;
    background: rgba(0, 0, 0, 0.18);
    padding: 4px 14px;
    border-radius: 16px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 640px) {
    .player-container {
      padding: 6px 10px;
    }

    .player-header {
      height: 42px;
      gap: 8px;
    }

    .exit-btn {
      padding: 5px 10px;
      font-size: 0.78rem;
      gap: 4px;
      border-radius: 10px;
      box-shadow: 0 2px 0 #CBD5E1;
    }

    .progress-text {
      font-size: 0.74rem;
    }

    .progress-track {
      max-width: 140px;
      height: 8px;
    }

    .audio-btn {
      padding: 5px 10px;
      font-size: 0.78rem;
      gap: 4px;
      border-radius: 10px;
      box-shadow: 0 3px 0 #1D4ED8;
    }

    .prompt-banner {
      padding: 6px 12px;
      border-radius: 14px;
      border-width: 2.5px;
      margin: 2px 0;
    }

    .prompt-text {
      font-size: clamp(0.95rem, 4.4vw, 1.35rem);
    }

    .feedback-banner {
      padding: 5px 10px;
      font-size: 0.95rem;
      border-radius: 10px;
    }

    .options-container {
      gap: 8px;
      padding-bottom: 4px;
    }

    .options-container.options-2 .option-btn,
    .options-container.options-3 .option-btn {
      min-height: 64px;
      border-radius: 16px;
      padding: 6px 10px;
    }

    .option-btn.color-scheme-0,
    .option-btn.color-scheme-1,
    .option-btn.color-scheme-2 {
      border-width: 2.5px;
      box-shadow: 0 4px 0 rgba(0, 0, 0, 0.25);
    }

    .option-btn.is-number .option-label {
      font-size: clamp(2rem, 9vw, 3rem);
    }

    .option-btn.is-text .option-label {
      font-size: clamp(0.85rem, 3.6vw, 1.2rem);
    }

    .option-hint {
      font-size: 0.95rem;
      padding: 2px 8px;
      border-radius: 10px;
    }
  }

  @media (max-height: 500px) and (orientation: landscape) {
    .player-container {
      padding: 4px 12px;
    }

    .player-header {
      height: 38px;
    }

    .prompt-banner {
      padding: 4px 10px;
    }

    .prompt-text {
      font-size: 0.95rem;
    }

    .options-container.options-2 .option-btn,
    .options-container.options-3 .option-btn {
      min-height: 48px;
      padding: 4px 8px;
    }

    .option-btn.is-number .option-label {
      font-size: 1.8rem;
    }

    .option-btn.is-text .option-label {
      font-size: 0.85rem;
    }
  }
</style>
