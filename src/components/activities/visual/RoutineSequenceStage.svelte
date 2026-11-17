<script lang="ts">
  import { ArrowRight, HelpCircle } from '@lucide/svelte'

  interface SequenceStep {
    emoji: string
    label: string
  }

  interface Props {
    sequenceSteps: SequenceStep[]
  }

  const { sequenceSteps }: Props = $props()

  let totalCards = $derived(sequenceSteps.length + 1)
</script>

<div class="sequence-stage">
  <div class="routine-chain {totalCards >= 4 ? 'allow-wrap' : ''}">
    {#each sequenceSteps as step, idx}
      <div class="routine-step-card">
        <span class="step-num">PASSO {idx + 1}</span>
        <div class="step-emoji-frame">
          <span class="step-emoji">{step.emoji}</span>
        </div>
        <span class="step-label">{step.label}</span>
      </div>

      <div class="chain-arrow" aria-hidden="true">
        <ArrowRight class="arrow-svg" strokeWidth={3.5} color="#9333EA" />
      </div>
    {/each}

    <!-- Slot do Passo Faltante [ ? ] -->
    <div class="missing-step-card">
      <span class="missing-badge">O QUE VEM DEPOIS?</span>
      <div class="missing-pulse-box">
        <HelpCircle class="help-svg" strokeWidth={2.5} color="#D97706" />
        <span class="missing-qmark">?</span>
      </div>
      <span class="missing-label">ESCOLHA ABAIXO</span>
    </div>
  </div>
</div>

<style>
  .sequence-stage {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1120px;
    box-sizing: border-box;
  }

  .routine-chain {
    display: flex;
    align-items: stretch;
    justify-content: center;
    gap: clamp(6px, 1.5vw, 16px);
    flex-wrap: nowrap;
    width: 100%;
    padding: 4px 2px 8px;
    box-sizing: border-box;
  }

  .routine-chain.allow-wrap {
    flex-wrap: wrap;
  }

  .routine-step-card,
  .missing-step-card {
    flex: 1 1 0;
    min-width: 0;
    max-width: 230px;
    border-radius: 22px;
    padding: clamp(10px, min(1.8vw, 2dvh), 18px) clamp(8px, 1.8vw, 20px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: clamp(4px, 0.8dvh, 8px);
    box-sizing: border-box;
    overflow: hidden;
    margin-bottom: 6px;
  }

  .routine-step-card {
    background: #FFFFFF;
    border: 3.5px solid #CBD5E1;
    box-shadow: 0 7px 0 #94A3B8, 0 10px 18px rgba(0, 0, 0, 0.08);
  }

  .missing-step-card {
    background: #FFFBEB;
    border: 3.5px dashed #F59E0B;
    box-shadow: 0 7px 0 #D97706, 0 10px 20px rgba(245, 158, 11, 0.2);
    animation: slotGlow 2s infinite alternate;
  }

  .routine-chain.allow-wrap .routine-step-card,
  .routine-chain.allow-wrap .missing-step-card {
    flex: 0 1 clamp(120px, 28vw, 200px);
  }

  .step-num,
  .missing-badge {
    font-size: clamp(0.6rem, 1.2vw, 0.74rem);
    font-weight: 900;
    letter-spacing: 0.4px;
    padding: 3px 9px;
    border-radius: 12px;
    text-align: center;
    max-width: 100%;
    line-height: 1.15;
    box-sizing: border-box;
  }

  .step-num {
    background: #F1F5F9;
    color: #475569;
    white-space: nowrap;
  }

  .missing-badge {
    background: #D97706;
    color: #FFFFFF;
    white-space: normal;
  }

  .step-emoji-frame,
  .missing-pulse-box {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: clamp(2.4rem, min(7vw, 8dvh), 4.6rem);
    overflow: hidden;
  }

  .step-emoji {
    font-size: clamp(2.1rem, min(6vw, 7.5dvh), 4.4rem);
    line-height: 1;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
    user-select: none;
  }

  .step-label,
  .missing-label {
    font-size: clamp(0.7rem, min(1.4vw, 1.9dvh), 1.05rem);
    font-weight: 900;
    text-align: center;
    line-height: 1.15;
    word-break: break-word;
  }

  .step-label {
    color: #1E293B;
  }

  .missing-label {
    color: #B45309;
  }

  .chain-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    animation: bounceRight 1.5s infinite ease-in-out;
  }

  :global(.chain-arrow .arrow-svg) {
    width: clamp(18px, 3vw, 30px);
    height: clamp(18px, 3vw, 30px);
  }

  :global(.missing-pulse-box .help-svg) {
    width: clamp(24px, 4vw, 40px);
    height: clamp(24px, 4vw, 40px);
  }

  .missing-pulse-box {
    gap: 4px;
  }

  .missing-qmark {
    font-size: clamp(1.8rem, min(4.8vw, 6.2dvh), 3.6rem);
    font-weight: 950;
    color: #D97706;
    line-height: 1;
  }

  @keyframes bounceRight {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(4px); }
  }

  @keyframes slotGlow {
    from {
      border-color: #F59E0B;
      box-shadow: 0 7px 0 #D97706, 0 0 10px rgba(245, 158, 11, 0.2);
    }
    to {
      border-color: #EA580C;
      box-shadow: 0 7px 0 #C2410C, 0 0 18px rgba(234, 88, 12, 0.35);
    }
  }

  @media (max-width: 640px) {
    .routine-chain {
      gap: 4px;
    }

    .routine-step-card,
    .missing-step-card {
      padding: 7px 4px;
      border-radius: 14px;
      border-width: 2.5px;
      gap: 4px;
      box-shadow: 0 4px 0 #94A3B8, 0 6px 12px rgba(0, 0, 0, 0.08);
      margin-bottom: 4px;
    }

    .missing-step-card {
      box-shadow: 0 4px 0 #D97706, 0 6px 12px rgba(245, 158, 11, 0.2);
    }

    .step-num,
    .missing-badge {
      font-size: 0.56rem;
      padding: 2px 5px;
    }

    .step-emoji-frame,
    .missing-pulse-box {
      min-height: 2.2rem;
    }

    .step-emoji {
      font-size: clamp(1.65rem, 6.5vw, 2.4rem);
    }

    .step-label,
    .missing-label {
      font-size: 0.65rem;
    }

    .missing-qmark {
      font-size: 1.5rem;
    }

    :global(.chain-arrow .arrow-svg) {
      width: 15px;
      height: 15px;
    }

    :global(.missing-pulse-box .help-svg) {
      width: 20px;
      height: 20px;
    }
  }
</style>
