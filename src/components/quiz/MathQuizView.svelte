<script lang="ts">
  import {
    isMathQuizOpen,
    isTeacherGateOpen,
    isLeaderboardOpen,
    quizPhase,
    closeMathQuiz
  } from '../../stores/quiz.store'
  import StartScreen from './StartScreen.svelte'
  import QuizPlayView from './QuizPlayView.svelte'
  import ResultScreen from './ResultScreen.svelte'
  import TeacherGate from './TeacherGate.svelte'
  import LeaderboardView from './LeaderboardView.svelte'
</script>

<div class="math-quiz-wrapper">
  <header class="quiz-top-nav">
    <div class="brand-group">
      <span class="badge-cape">CAPE MATH</span>
      <span class="badge-sub">Módulo TDAH</span>
    </div>

    <button type="button" class="exit-btn" onclick={closeMathQuiz} aria-label="Voltar para a Prancha de Comunicação CAA">
      ← Voltar à Prancha CAA
    </button>
  </header>

  <main class="quiz-viewport">
    {#if $isLeaderboardOpen}
      <LeaderboardView />
    {:else if $quizPhase === 'playing'}
      <QuizPlayView />
    {:else if $quizPhase === 'finished'}
      <ResultScreen />
    {:else}
      <StartScreen />
    {/if}
  </main>

  {#if $isTeacherGateOpen}
    <TeacherGate />
  {/if}
</div>

<style>
  .math-quiz-wrapper {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    background: #0f172a;
    color: #f8fafc;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    z-index: 100;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }

  .quiz-top-nav {
    height: 56px;
    background: #1e293b;
    border-bottom: 1px solid #334155;
    padding: 0 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }

  .brand-group {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .badge-cape {
    background: #10b981;
    color: #022c22;
    font-weight: 900;
    font-size: 0.85rem;
    padding: 0.25rem 0.65rem;
    border-radius: 6px;
    letter-spacing: 0.05em;
  }

  .badge-sub {
    font-size: 0.85rem;
    color: #94a3b8;
    font-weight: 700;
  }

  .exit-btn {
    background: #0f172a;
    border: 1px solid #475569;
    color: #cbd5e1;
    font-weight: 700;
    font-size: 0.85rem;
    padding: 0.45rem 0.9rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .exit-btn:hover {
    background: #334155;
    color: #f8fafc;
    border-color: #64748b;
  }

  .quiz-viewport {
    flex: 1;
    width: 100%;
    overflow-y: auto;
    padding: 1rem 0;
    box-sizing: border-box;
  }
</style>
