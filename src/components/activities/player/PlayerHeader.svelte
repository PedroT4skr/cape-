<script lang="ts">
  import { Volume2, X } from '@lucide/svelte'

  interface Props {
    currentIndex: number
    total: number
    onExit: () => void
    onRepeatPrompt: () => void
  }

  const { currentIndex, total, onExit, onRepeatPrompt }: Props = $props()

  let progressPercent = $derived(
    total > 0 ? ((currentIndex + 1) / total) * 100 : 0
  )
</script>

<header class="player-header">
  <button class="exit-btn" onclick={onExit} aria-label="Sair da atividade">
    <X size={20} strokeWidth={2.4} />
    <span>SAIR</span>
  </button>

  <div class="progress-info">
    <span class="progress-text">
      DESAFIO {currentIndex + 1} DE {total}
    </span>
    <div class="progress-track">
      <div class="progress-fill" style="width: {progressPercent}%;"></div>
    </div>
  </div>

  <button class="audio-btn" onclick={onRepeatPrompt} aria-label="Repetir instrução em voz alta">
    <Volume2 size={22} strokeWidth={2.4} />
    <span>OUVIR</span>
  </button>
</header>

<style>
  .player-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    min-height: 46px;
    flex-shrink: 0;
  }

  .exit-btn {
    background: #F1F5F9;
    border: 2.5px solid #CBD5E1;
    border-radius: 14px;
    padding: 7px 16px;
    font-size: 0.92rem;
    font-weight: 950;
    color: #475569;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    box-shadow: 0 3px 0 #CBD5E1;
    transition: transform 0.1s ease, background 0.15s ease;
    white-space: nowrap;
  }

  .exit-btn:active {
    transform: translateY(2px);
    box-shadow: 0 1px 0 #CBD5E1;
  }

  .progress-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .progress-text {
    font-size: 0.88rem;
    font-weight: 950;
    color: #1E293B;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  .progress-track {
    width: 100%;
    max-width: 340px;
    height: 11px;
    background: #E2E8F0;
    border-radius: 10px;
    overflow: hidden;
    border: 1.5px solid #CBD5E1;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #3B82F6, #10B981);
    border-radius: 8px;
    transition: width 0.3s ease;
  }

  .audio-btn {
    background: #2563EB;
    border: none;
    color: #FFFFFF;
    border-radius: 14px;
    padding: 8px 18px;
    font-size: 0.92rem;
    font-weight: 950;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    box-shadow: 0 4px 0 #1D4ED8, 0 6px 14px rgba(37, 99, 235, 0.25);
    transition: transform 0.1s ease;
    white-space: nowrap;
  }

  .audio-btn:active {
    transform: translateY(2px);
    box-shadow: 0 2px 0 #1D4ED8;
  }

  @media (max-width: 640px) {
    .player-header {
      min-height: 40px;
      gap: 8px;
    }

    .exit-btn {
      padding: 5px 10px;
      font-size: 0.78rem;
      gap: 4px;
      border-radius: 10px;
      box-shadow: 0 2px 0 #CBD5E1;
    }

    .progress-text {
      font-size: 0.72rem;
    }

    .progress-track {
      max-width: 140px;
      height: 8px;
    }

    .audio-btn {
      padding: 5px 10px;
      font-size: 0.78rem;
      gap: 4px;
      border-radius: 10px;
      box-shadow: 0 3px 0 #1D4ED8;
    }
  }

  @media (max-height: 500px) and (orientation: landscape) {
    .player-header {
      min-height: 36px;
    }
  }
</style>
