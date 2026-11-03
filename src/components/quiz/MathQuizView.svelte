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
      <span class="badge-sub">Quiz TDAH</span>
    </div>

    <button type="button" class="exit-btn" onclick={closeMathQuiz} aria-label="Voltar para a Prancha de Comunicação CAA">
      ← Voltar à Prancha
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
    background: #F8FAFC;
    color: #0F172A;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    z-index: 100;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }

  .quiz-top-nav {
    height: 54px;
    background: #FFFFFF;
    border-bottom: 2px solid #E2E8F0;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .brand-group {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .badge-cape {
    background: #059669;
    color: #FFFFFF;
    font-weight: 900;
    font-size: 0.82rem;
    padding: 0.25rem 0.65rem;
    border-radius: 6px;
    letter-spacing: 0.04em;
  }

  .badge-sub {
    font-size: 0.85rem;
    color: #64748B;
    font-weight: 700;
  }

  .exit-btn {
    background: #F1F5F9;
    border: 1px solid #CBD5E1;
    color: #334155;
    font-weight: 800;
    font-size: 0.82rem;
    padding: 0.4rem 0.85rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .exit-btn:hover {
    background: #E2E8F0;
    color: #0F172A;
  }

  .quiz-viewport {
    flex: 1;
    width: 100%;
    overflow-y: auto;
    padding: 1rem 0;
    box-sizing: border-box;
  }
</style>
