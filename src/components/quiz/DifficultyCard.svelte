<script lang="ts">
  import type { Difficulty } from '../../types/quiz.types'
  import { DIFFICULTIES } from '../../config/quiz.config'
  import { Clock, Award } from '@lucide/svelte'

  interface Props {
    difficulty: Difficulty
    selected: boolean
    onselect: (diff: Difficulty) => void
  }

  let { difficulty, selected, onselect }: Props = $props()
  let config = $derived(DIFFICULTIES[difficulty])

  const themeColors = {
    beginner: {
      accent: '#059669',
      borderActive: '#10B981',
      bgActive: '#ECFDF5',
      pillBg: '#D1FAE5',
      pillText: '#065F46'
    },
    intermediate: {
      accent: '#D97706',
      borderActive: '#F59E0B',
      bgActive: '#FFFBEB',
      pillBg: '#FEF3C7',
      pillText: '#92400E'
    },
    advanced: {
      accent: '#7C3AED',
      borderActive: '#8B5CF6',
      bgActive: '#F5F3FF',
      pillBg: '#EDE9FE',
      pillText: '#5B21B6'
    }
  }

  let theme = $derived(themeColors[difficulty])
</script>

<button
  type="button"
  class="diff-card {difficulty} {selected ? 'is-selected' : ''}"
  onclick={() => onselect(difficulty)}
  aria-pressed={selected}
  style="--theme-accent: {theme.accent}; --theme-border: {theme.borderActive}; --theme-bg: {theme.bgActive}; --pill-bg: {theme.pillBg}; --pill-text: {theme.pillText};"
>
  <div class="diff-card-top">
    <div class="emoji-box">
      <span class="diff-emoji">{config.emoji}</span>
    </div>
    <div class="title-group">
      <h3 class="diff-label">{config.label}</h3>
      <span class="diff-subtitle">{config.description}</span>
    </div>
  </div>

  <div class="diff-pills-row">
    <div class="pill meta-time">
      <Clock size={12} strokeWidth={2.5} />
      <span>{Math.round(config.timeLimitMs / 1000)}s</span>
    </div>
    <div class="pill meta-points">
      <Award size={12} strokeWidth={2.5} />
      <span>{config.basePoints} pts</span>
    </div>
  </div>
</button>

<style>
  .diff-card {
    position: relative;
    background: #FFFFFF;
    border: 2px solid #E2E8F0;
    border-radius: 16px;
    padding: 1.1rem 1rem;
    text-align: left;
    cursor: pointer;
    transition: all 0.15s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.9rem;
    color: #0F172A;
    width: 100%;
    box-sizing: border-box;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  }

  .diff-card:hover {
    border-color: #CBD5E1;
    background: #F8FAFC;
    transform: translateY(-2px);
  }

  .diff-card.is-selected {
    border-color: var(--theme-border);
    background: var(--theme-bg);
    box-shadow: 0 0 0 1px var(--theme-border), 0 4px 14px rgba(0, 0, 0, 0.08);
  }

  .diff-card-top {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .emoji-box {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: #F1F5F9;
    border: 1px solid #E2E8F0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .diff-card.is-selected .emoji-box {
    background: #FFFFFF;
    border-color: var(--theme-border);
  }

  .diff-emoji {
    font-size: 1.45rem;
  }

  .title-group {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    flex: 1;
    min-width: 0;
  }

  .diff-label {
    font-size: 1.1rem;
    font-weight: 850;
    color: #0F172A;
    margin: 0;
    letter-spacing: -0.01em;
  }

  .diff-card.is-selected .diff-label {
    color: var(--theme-accent);
  }

  .diff-subtitle {
    font-size: 0.8rem;
    color: #64748B;
    line-height: 1.3;
    font-weight: 500;
  }

  .diff-pills-row {
    display: flex;
    align-items: center;
    gap: 0.45rem;
  }

  .pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.74rem;
    font-weight: 800;
    padding: 3px 8px;
    border-radius: 8px;
    background: #F1F5F9;
    color: #475569;
    border: 1px solid #E2E8F0;
  }

  .diff-card.is-selected .pill {
    background: var(--pill-bg);
    color: var(--pill-text);
    border-color: transparent;
  }

  /* Otimização Responsiva Mobile: Compacto, sem scroll excessivo */
  @media (max-width: 640px) {
    .diff-card {
      padding: 0.75rem 0.85rem;
      gap: 0.5rem;
      border-radius: 14px;
    }

    .diff-card-top {
      align-items: center;
      gap: 0.6rem;
    }

    .emoji-box {
      width: 34px;
      height: 34px;
      border-radius: 10px;
    }

    .diff-emoji {
      font-size: 1.2rem;
    }

    .diff-label {
      font-size: 0.98rem;
    }

    .diff-subtitle {
      font-size: 0.74rem;
      line-height: 1.2;
    }

    .pill {
      font-size: 0.7rem;
      padding: 2px 6px;
    }
  }
</style>
