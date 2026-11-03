<script lang="ts">
  import type { Difficulty } from '../../types/quiz.types'
  import { DIFFICULTIES } from '../../config/quiz.config'
  import { Check, Clock, Award } from '@lucide/svelte'

  interface Props {
    difficulty: Difficulty
    selected: boolean
    onselect: (diff: Difficulty) => void
  }

  let { difficulty, selected, onselect }: Props = $props()
  let config = $derived(DIFFICULTIES[difficulty])

  const themeColors = {
    beginner: {
      accent: '#10b981',
      bgGlow: 'rgba(16, 185, 129, 0.12)',
      borderActive: '#34d399',
      badgeBg: 'rgba(16, 185, 129, 0.18)',
      badgeText: '#34d399'
    },
    intermediate: {
      accent: '#f59e0b',
      bgGlow: 'rgba(245, 158, 11, 0.12)',
      borderActive: '#fbbf24',
      badgeBg: 'rgba(245, 158, 11, 0.18)',
      badgeText: '#fbbf24'
    },
    advanced: {
      accent: '#8b5cf6',
      bgGlow: 'rgba(139, 92, 246, 0.12)',
      borderActive: '#a78bfa',
      badgeBg: 'rgba(139, 92, 246, 0.18)',
      badgeText: '#c4b5fd'
    }
  }

  let theme = $derived(themeColors[difficulty])
</script>

<button
  type="button"
  class="diff-card {difficulty} {selected ? 'is-selected' : ''}"
  onclick={() => onselect(difficulty)}
  aria-pressed={selected}
  style="--theme-accent: {theme.accent}; --theme-glow: {theme.bgGlow}; --theme-border: {theme.borderActive}; --badge-bg: {theme.badgeBg}; --badge-text: {theme.badgeText};"
>
  {#if selected}
    <div class="selected-badge">
      <Check size={13} strokeWidth={3} />
      <span>ATIVO</span>
    </div>
  {/if}

  <div class="diff-card-top">
    <div class="emoji-capsule">
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
      <span>{Math.round(config.timeLimitMs / 1000)}s / questão</span>
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
    background: #1e293b;
    border: 2px solid #334155;
    border-radius: 18px;
    padding: 1.25rem 1.1rem;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    color: #f8fafc;
    width: 100%;
    box-sizing: border-box;
    min-height: 148px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    overflow: hidden;
  }

  .diff-card:hover {
    transform: translateY(-2px);
    border-color: #475569;
    background: #232f42;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
  }

  .diff-card.is-selected {
    border-color: var(--theme-border);
    background: linear-gradient(145deg, #1e293b, #172338);
    box-shadow: 0 0 0 1px var(--theme-border), 0 8px 24px var(--theme-glow);
  }

  .selected-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: var(--theme-accent);
    color: #0f172a;
    font-size: 0.65rem;
    font-weight: 900;
    letter-spacing: 0.05em;
    padding: 3px 8px;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    gap: 4px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    animation: popIn 0.2s ease-out;
  }

  .diff-card-top {
    display: flex;
    align-items: flex-start;
    gap: 0.85rem;
  }

  .emoji-capsule {
    width: 46px;
    height: 46px;
    border-radius: 12px;
    background: #0f172a;
    border: 1px solid #334155;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }

  .diff-card.is-selected .emoji-capsule {
    background: var(--badge-bg);
    border-color: var(--theme-accent);
    transform: scale(1.05);
  }

  .diff-emoji {
    font-size: 1.55rem;
  }

  .title-group {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    flex: 1;
    min-width: 0;
  }

  .diff-label {
    font-size: 1.15rem;
    font-weight: 850;
    color: #f8fafc;
    margin: 0;
    letter-spacing: -0.01em;
  }

  .diff-card.is-selected .diff-label {
    color: var(--theme-border);
  }

  .diff-subtitle {
    font-size: 0.82rem;
    color: #94a3b8;
    line-height: 1.35;
    font-weight: 500;
  }

  .diff-pills-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: auto;
  }

  .pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.74rem;
    font-weight: 750;
    padding: 4px 9px;
    border-radius: 8px;
    background: #0f172a;
    color: #cbd5e1;
    border: 1px solid #334155;
    white-space: nowrap;
  }

  .diff-card.is-selected .pill {
    background: rgba(15, 23, 42, 0.7);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .diff-card.is-selected .meta-points {
    color: var(--badge-text);
  }

  @keyframes popIn {
    from { transform: scale(0.7); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
</style>
