<script lang="ts">
  interface Props {
    elapsedMs: number
    timeLimitMs: number
  }

  let { elapsedMs, timeLimitMs }: Props = $props()

  let isOvertime = $derived(elapsedMs > timeLimitMs)
  let remainingMs = $derived(Math.max(0, timeLimitMs - elapsedMs))
  let progressRatio = $derived(Math.min(1, remainingMs / timeLimitMs))
  let secondsLeft = $derived(Math.ceil(remainingMs / 1000))
</script>

<div class="timer-container">
  <div class="timer-track" role="progressbar" aria-valuenow={secondsLeft} aria-valuemin={0}>
    <div
      class="timer-fill {isOvertime ? 'overtime' : ''}"
      style="width: {progressRatio * 100}%"
    ></div>
  </div>

  <div class="timer-meta">
    {#if !isOvertime}
      <span class="timer-text">
        ⏱️ Tempo restante: <strong>{secondsLeft}s</strong>
      </span>
    {:else}
      <span class="overtime-text">
        ⚠️ Tempo zerado! Continue respondendo (acertos com penalidade de 40% a 50%)
      </span>
    {/if}
  </div>
</div>

<style>
  .timer-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .timer-track {
    width: 100%;
    height: 10px;
    background: #1e293b;
    border-radius: 9999px;
    overflow: hidden;
    border: 1px solid #334155;
  }

  .timer-fill {
    height: 100%;
    background: #10b981;
    border-radius: 9999px;
    transition: width 0.25s linear;
  }

  .timer-fill.overtime {
    width: 100% !important;
    background: #f59e0b;
    animation: overtimePulse 1.5s ease-in-out infinite;
  }

  @keyframes overtimePulse {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 0.35; }
  }

  .timer-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    font-weight: 700;
  }

  .timer-text {
    color: #94a3b8;
  }

  .timer-text strong {
    color: #f8fafc;
    font-variant-numeric: tabular-nums;
  }

  .overtime-text {
    color: #f59e0b;
    font-weight: 800;
  }
</style>
