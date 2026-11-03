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
        Tempo restante: <strong>{secondsLeft}s</strong>
      </span>
    {:else}
      <span class="overtime-text">
        ⚠️ Tempo zerado! Continue respondendo (penalidade pedagógica de 40% a 50%)
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
    background: #E2E8F0;
    border-radius: 9999px;
    overflow: hidden;
    border: 1px solid #CBD5E1;
  }

  .timer-fill {
    height: 100%;
    background: #059669;
    border-radius: 9999px;
    transition: width 0.25s linear;
  }

  .timer-fill.overtime {
    width: 100% !important;
    background: #D97706;
    animation: overtimePulse 1.5s ease-in-out infinite;
  }

  @keyframes overtimePulse {
    0%, 100% { opacity: 0.9; }
    50% { opacity: 0.4; }
  }

  .timer-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.82rem;
    font-weight: 750;
  }

  .timer-text {
    color: #64748B;
  }

  .timer-text strong {
    color: #0F172A;
    font-variant-numeric: tabular-nums;
  }

  .overtime-text {
    color: #B45309;
    font-weight: 850;
  }
</style>
