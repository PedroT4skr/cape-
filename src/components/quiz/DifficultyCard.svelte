<script lang="ts">
  import type { Difficulty } from '../../types/quiz.types'
  import { DIFFICULTIES } from '../../config/quiz.config'

  interface Props {
    difficulty: Difficulty
    selected: boolean
    onselect: (diff: Difficulty) => void
  }

  let { difficulty, selected, onselect }: Props = $props()
  let config = $derived(DIFFICULTIES[difficulty])
</script>

<button
  type="button"
  class="diff-card {selected ? 'is-selected' : ''}"
  onclick={() => onselect(difficulty)}
  aria-pressed={selected}
>
  <div class="diff-card-header">
    <span class="diff-emoji">{config.emoji}</span>
    <span class="diff-label">{config.label}</span>
  </div>
  <p class="diff-desc">{config.description}</p>
  <div class="diff-meta">
    <span>⏱️ {Math.round(config.timeLimitMs / 1000)}s por questão</span>
    <span>⭐ {config.basePoints} pts base</span>
  </div>
</button>

<style>
  .diff-card {
    background: #1e293b;
    border: 2px solid #334155;
    border-radius: 14px;
    padding: 1rem;
    text-align: left;
    cursor: pointer;
    transition: all 0.15s ease;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: #f8fafc;
    width: 100%;
    box-sizing: border-box;
  }

  .diff-card:hover {
    border-color: #64748b;
    background: #242f44;
  }

  .diff-card.is-selected {
    border-color: #10b981;
    background: rgba(16, 185, 129, 0.1);
    box-shadow: 0 0 12px rgba(16, 185, 129, 0.25);
  }

  .diff-card-header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .diff-emoji {
    font-size: 1.5rem;
  }

  .diff-label {
    font-size: 1.1rem;
    font-weight: 800;
  }

  .diff-desc {
    font-size: 0.85rem;
    color: #94a3b8;
    margin: 0;
    line-height: 1.35;
  }

  .diff-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    font-weight: 700;
    color: #cbd5e1;
    margin-top: auto;
    padding-top: 0.5rem;
    border-top: 1px solid #334155;
  }
</style>
