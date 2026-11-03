<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import TimerBar from './TimerBar.svelte'
  import QuestionCard from './QuestionCard.svelte'
  import OptionButton from './OptionButton.svelte'
  import NextButton from './NextButton.svelte'
  import {
    currentIndex,
    quizQuestions,
    currentQuestion,
    currentAnswer,
    currentDifficulty,
    selectOption,
    nextQuestion,
    previousQuestion
  } from '../../stores/quiz.store'
  import { DIFFICULTIES } from '../../config/quiz.config'

  let config = $derived(DIFFICULTIES[$currentDifficulty])
  let total = $derived($quizQuestions.length)
  let qNum = $derived($currentIndex + 1)
  let isLast = $derived($currentIndex === total - 1)
  let hasSelection = $derived($currentAnswer?.selectedIndex !== null)

  function handleKeydown(e: KeyboardEvent) {
    if (['1', '2', '3', '4'].includes(e.key)) {
      selectOption(parseInt(e.key, 10) - 1)
    } else if (['a', 'b', 'c', 'd'].includes(e.key.toLowerCase())) {
      const map: Record<string, number> = { a: 0, b: 1, c: 2, d: 3 }
      selectOption(map[e.key.toLowerCase()])
    } else if (e.key === 'Enter' && hasSelection) {
      nextQuestion()
    } else if (e.key === 'ArrowLeft' && $currentIndex > 0) {
      previousQuestion()
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onDestroy(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
</script>

<div class="play-container">
  {#if $currentQuestion}
    <header class="play-header">
      <div class="progress-pill">
        QUESTÃO <strong class="q-highlight">{qNum}</strong> DE <strong>{total}</strong>
      </div>
      <span class="diff-tag">{config.label.toUpperCase()}</span>
    </header>

    <TimerBar
      elapsedMs={$currentAnswer?.elapsedMs ?? 0}
      timeLimitMs={config.timeLimitMs}
    />

    <main class="play-main">
      <QuestionCard question={$currentQuestion} />

      <div class="options-grid">
        {#each $currentQuestion.options as option, idx}
          <OptionButton
            {option}
            index={idx}
            selected={$currentAnswer?.selectedIndex === idx}
            onselect={selectOption}
          />
        {/each}
      </div>
    </main>

    <footer class="play-actions">
      <button
        type="button"
        class="prev-btn"
        disabled={$currentIndex === 0}
        onclick={previousQuestion}
      >
        ← Anterior
      </button>

      <NextButton
        enabled={hasSelection}
        {isLast}
        onclick={nextQuestion}
      />
    </footer>
  {/if}
</div>

<style>
  .play-container {
    max-width: 820px;
    margin: 0 auto;
    padding: 1rem 1rem 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    animation: fadeIn 0.25s ease-out;
  }

  .play-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .progress-pill {
    background: #1e293b;
    border: 1px solid #334155;
    padding: 0.4rem 0.9rem;
    border-radius: 9999px;
    font-size: 0.85rem;
    font-weight: 700;
    color: #94a3b8;
  }

  .q-highlight {
    color: #10b981;
    font-size: 1.05rem;
  }

  .diff-tag {
    background: rgba(16, 185, 129, 0.15);
    border: 1px solid #10b981;
    color: #10b981;
    padding: 0.25rem 0.65rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.05em;
  }

  .play-main {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .options-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.85rem;
  }

  @media (max-width: 600px) {
    .options-grid {
      grid-template-columns: 1fr;
    }
  }

  .play-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .prev-btn {
    background: #1e293b;
    border: 1px solid #334155;
    color: #94a3b8;
    padding: 0.9rem 1.2rem;
    border-radius: 14px;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .prev-btn:hover:not(:disabled) {
    background: #334155;
    color: #f8fafc;
  }

  .prev-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
</style>
