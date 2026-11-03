<script lang="ts">
  import type { Question } from '../../types/quiz.types'

  interface Props {
    question: Question
  }

  let { question }: Props = $props()
</script>

<div class="question-card">
  <h2 class="question-prompt">{question.prompt}</h2>
  {#if question.expression}
    <div class="question-expression">{question.expression}</div>
  {/if}
</div>

<style>
  .question-card {
    background: #FFFFFF;
    border: 2px solid #E2E8F0;
    border-radius: 20px;
    padding: 1.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  }

  .question-prompt {
    font-size: clamp(1.4rem, 4vw, 2.1rem);
    font-weight: 850;
    color: #0F172A;
    margin: 0;
    line-height: 1.3;
  }

  .question-expression {
    font-size: clamp(2.4rem, 8vw, 4.2rem);
    font-weight: 950;
    color: #059669;
    letter-spacing: 0.03em;
    font-variant-numeric: tabular-nums;
  }

  @media (max-width: 640px) {
    .question-card {
      padding: 0.85rem 1rem;
      gap: 0.4rem;
      border-radius: 14px;
    }

    .question-prompt {
      font-size: clamp(1.1rem, 4.5vw, 1.45rem);
      line-height: 1.25;
    }

    .question-expression {
      font-size: clamp(1.7rem, 7.5vw, 2.5rem);
      word-break: break-word;
    }
  }
</style>
