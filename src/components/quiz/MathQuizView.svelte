<script lang="ts">
  import {
    isTeacherGateOpen,
    isLeaderboardOpen,
    quizPhase,
    resetQuiz,
    closeMathQuiz
  } from '../../stores/quiz.store'
  import { navigateTo } from '../../stores/navigation.store'
  import { ArrowLeft, LayoutGrid, MessageSquare } from '@lucide/svelte'
  import StartScreen from './StartScreen.svelte'
  import QuizPlayView from './QuizPlayView.svelte'
  import ResultScreen from './ResultScreen.svelte'
  import TeacherGate from './TeacherGate.svelte'
  import LeaderboardView from './LeaderboardView.svelte'

  let backLabel = $derived(
    $isLeaderboardOpen
      ? 'Voltar ao Quiz'
      : $quizPhase === 'playing' || $quizPhase === 'finished'
        ? 'Voltar aos Níveis'
        : 'Voltar'
  )

  function handleContextualBack() {
    if ($isLeaderboardOpen) {
      isLeaderboardOpen.set(false)
    } else if ($quizPhase === 'playing' || $quizPhase === 'finished') {
      resetQuiz()
    } else {
      closeMathQuiz()
    }
  }

  function handleGoHub() {
    resetQuiz()
    navigateTo('hub')
  }

  function handleGoBoard() {
    resetQuiz()
    navigateTo('board')
  }
</script>

<div class="math-quiz-wrapper">
  <header class="quiz-top-nav">
    <div class="left-group">
      <button
        type="button"
        class="back-nav-btn"
        onclick={handleContextualBack}
        aria-label={backLabel}
      >
        <ArrowLeft size={20} strokeWidth={2.8} />
        <span>{backLabel}</span>
      </button>

      <div class="brand-group">
        <span class="badge-cape">CAPE MATH</span>
        <span class="badge-sub">Quiz TDAH</span>
      </div>
    </div>

    <div class="right-group">
      <button
        type="button"
        class="nav-shortcut-btn hub-shortcut"
        onclick={handleGoHub}
        aria-label="Ir para o Menu Principal da Suíte CAPE"
      >
        <LayoutGrid size={18} />
        <span class="shortcut-label">Suíte CAPE</span>
      </button>

      <button
        type="button"
        class="nav-shortcut-btn board-shortcut"
        onclick={handleGoBoard}
        aria-label="Ir para a Prancha de Comunicação CAA"
      >
        <MessageSquare size={18} />
        <span class="shortcut-label">Prancha CAA</span>
      </button>
    </div>
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
    height: 62px;
    background: #0F172A;
    color: #FFFFFF;
    border-bottom: 2px solid #1E293B;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    flex-shrink: 0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  }

  .left-group {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    min-width: 0;
  }

  .back-nav-btn {
    background: #059669;
    border: 2px solid #34D399;
    color: #FFFFFF;
    font-weight: 900;
    font-size: 0.98rem;
    padding: 0.45rem 1rem;
    border-radius: 10px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    white-space: nowrap;
    transition: all 0.15s ease;
    box-shadow: 0 2px 8px rgba(5, 150, 105, 0.35);
  }

  .back-nav-btn:hover {
    background: #047857;
    border-color: #6EE7B7;
  }

  .back-nav-btn:active {
    transform: scale(0.96);
  }

  .brand-group {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .badge-cape {
    background: #7C3AED;
    color: #FFFFFF;
    font-weight: 900;
    font-size: 0.9rem;
    padding: 0.3rem 0.7rem;
    border-radius: 8px;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }

  .badge-sub {
    font-size: 1rem;
    color: #E2E8F0;
    font-weight: 800;
    white-space: nowrap;
  }

  .right-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .nav-shortcut-btn {
    background: #1E293B;
    border: 2px solid #475569;
    color: #F8FAFC;
    font-weight: 850;
    font-size: 0.92rem;
    padding: 0.45rem 0.85rem;
    border-radius: 10px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    white-space: nowrap;
    transition: all 0.15s ease;
  }

  .nav-shortcut-btn:hover {
    background: #334155;
    border-color: #94A3B8;
  }

  .hub-shortcut {
    background: #2563EB;
    border-color: #60A5FA;
  }

  .hub-shortcut:hover {
    background: #1D4ED8;
  }

  .quiz-viewport {
    flex: 1;
    width: 100%;
    overflow-y: auto;
    padding: 1.25rem 0;
    box-sizing: border-box;
  }

  @media (max-width: 720px) {
    .brand-group {
      display: none;
    }
  }

  @media (max-width: 520px) {
    .quiz-top-nav {
      height: 54px;
      padding: 0 0.6rem;
    }

    .back-nav-btn {
      font-size: 0.88rem;
      padding: 0.4rem 0.75rem;
    }

    .shortcut-label {
      display: none;
    }

    .nav-shortcut-btn {
      padding: 0.45rem 0.65rem;
    }
  }
</style>
