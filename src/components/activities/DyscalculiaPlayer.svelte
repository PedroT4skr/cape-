<script lang="ts">
  import {
    activitySession,
    submitAnswer,
    repeatPrompt,
    exitActivity
  } from '../../stores/activity.store'
  import PlayerHeader from './player/PlayerHeader.svelte'
  import PlayerOptions from './player/PlayerOptions.svelte'
  import ActivityQuestionView from './ActivityQuestionView.svelte'
  import ActivityCelebration from './ActivityCelebration.svelte'

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
        <PlayerHeader
          currentIndex={$activitySession.currentQuestionIndex}
          total={$activitySession.questions.length}
          onExit={exitActivity}
          onRepeatPrompt={repeatPrompt}
        />

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

        <!-- Área Concreta / Pictórica Central (Com rolagem segura caso viewport seja muito baixa) -->
        <div class="stage-area">
          <ActivityQuestionView question={currentQ} />
        </div>

        <!-- Opções Táteis de Resposta -->
        <PlayerOptions
          options={currentQ.options}
          isProcessing={$activitySession.isProcessing}
          onSelect={submitAnswer}
        />
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
    padding: clamp(8px, 1.4dvh, 14px) clamp(10px, 2.2vw, 24px);
    box-sizing: border-box;
    gap: clamp(4px, 1dvh, 10px);
    overflow: hidden;
  }

  .prompt-banner {
    background: #FFFFFF;
    border: 3.5px solid #3B82F6;
    border-radius: 20px;
    padding: clamp(6px, 1.2dvh, 12px) clamp(14px, 3vw, 24px);
    text-align: center;
    box-shadow: 0 5px 14px rgba(59, 130, 246, 0.12);
    flex-shrink: 0;
  }

  .prompt-text {
    font-size: clamp(1rem, min(3vw, 3.2dvh), 2rem);
    font-weight: 950;
    color: #1E3A8A;
    margin: 0;
    letter-spacing: 0.4px;
    line-height: 1.2;
  }

  .feedback-banner {
    padding: clamp(5px, 1dvh, 8px) 16px;
    border-radius: 14px;
    font-size: clamp(0.95rem, min(2vw, 2.4dvh), 1.15rem);
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

  /* Flex column + overflow-y: auto com margin: auto no filho evita recorte superior ao transbordar */
  .stage-area {
    flex: 1 1 0%;
    min-height: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    padding: 2px 0;
    box-sizing: border-box;
  }

  @media (max-width: 640px) {
    .player-container {
      padding: 6px 10px;
      gap: 6px;
    }

    .prompt-banner {
      padding: 6px 12px;
      border-radius: 14px;
      border-width: 2.5px;
    }

    .prompt-text {
      font-size: clamp(0.92rem, 4.2vw, 1.3rem);
    }

    .feedback-banner {
      padding: 5px 10px;
      font-size: 0.92rem;
      border-radius: 10px;
    }
  }

  @media (max-height: 500px) and (orientation: landscape) {
    .player-container {
      padding: 4px 12px;
      gap: 4px;
    }

    .prompt-banner {
      padding: 4px 10px;
    }

    .prompt-text {
      font-size: 0.92rem;
    }
  }
</style>
