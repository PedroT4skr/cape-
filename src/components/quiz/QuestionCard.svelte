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
    background: #1e293b;
    border: 2px solid #334155;
    border-radius: 18px;
    padding: 1.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  }

  .question-prompt {
    font-size: clamp(1.4rem, 4vw, 2.2rem);
    font-weight: 800;
    color: #f8fafc;
    margin: 0;
    line-height: 1.3;
  }

  .question-expression {
    font-size: clamp(2.4rem, 8vw, 4.2rem);
    font-weight: 900;
    color: #10b981;
    letter-spacing: 0.04em;
    font-variant-numeric: tabular-nums;
    text-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
  }
</style>
