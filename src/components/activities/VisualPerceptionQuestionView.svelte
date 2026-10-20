<script lang="ts">
  import type { ActivityQuestion } from '../../types/activity.types'
  import { ArrowRight, HelpCircle } from '@lucide/svelte'

  interface Props {
    question: ActivityQuestion
  }

  const { question }: Props = $props()
</script>

<div class="visual-question-view">
  {#if (question.type === 'color_match' || question.type === 'shape_match') && question.visualTarget}
    <!-- Níveis 1 e 2: Cartão Modelo em Alto Destaque (Cores e Formas) -->
    <div class="model-stage">
      <div
        class="model-card {question.type === 'color_match' ? 'is-color-type' : 'is-shape-type'}"
        style={question.visualTarget.modelColor ? `--model-color: ${question.visualTarget.modelColor}` : ''}
      >
        <div class="model-badge">
          <span>MODELO DE REFERÊNCIA</span>
        </div>
        <span class="giant-emoji">{question.visualTarget.modelEmoji}</span>
        <span class="model-label">{question.visualTarget.modelLabel}</span>
      </div>

      <div class="guidance-banner">
        <span>ENCONTRE A OPÇÃO IGUAL AO MODELO ABAIXO</span>
      </div>
    </div>

  {:else if question.type === 'routine_sequence' && question.visualTarget}
    <!-- Nível 3: Sequência de Rotina Diária PECS -->
    <div class="sequence-stage">
      <div class="routine-chain">
        {#if question.visualTarget.sequenceSteps}
          {#each question.visualTarget.sequenceSteps as step, idx}
            <div class="routine-step-card">
              <span class="step-num">PASSO {idx + 1}</span>
              <span class="step-emoji">{step.emoji}</span>
              <span class="step-label">{step.label}</span>
            </div>

            <div class="chain-arrow">
              <ArrowRight size={32} strokeWidth={3.5} color="#9333EA" />
            </div>
          {/each}
        {/if}

        <!-- Slot do Passo Faltante [ ? ] -->
        <div class="missing-step-card">
          <span class="missing-badge">O QUE VEM DEPOIS?</span>
          <div class="missing-pulse-box">
            <HelpCircle size={44} strokeWidth={2.5} color="#D97706" />
            <span class="missing-qmark">?</span>
          </div>
          <span class="missing-label">ESCOLHA ABAIXO</span>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .visual-question-view {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
  }

  /* Palco de Cores e Formas */
  .model-stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: clamp(12px, 2.2vw, 20px);
    width: 100%;
    max-width: 900px;
    max-height: 48vh;
    box-sizing: border-box;
  }

  .model-card {
    position: relative;
    background: #FFFFFF;
    border: 4px solid var(--model-color, #9333EA);
    border-radius: 30px;
    padding: clamp(16px, 2.5vw, 26px) clamp(32px, 5vw, 64px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 10px 0 var(--model-color, #7E22CE), 0 14px 26px rgba(147, 51, 234, 0.16);
    transition: transform 0.2s ease;
  }

  .model-card.is-shape-type {
    border-color: #3B82F6;
    box-shadow: 0 10px 0 #1D4ED8, 0 14px 26px rgba(37, 99, 235, 0.16);
  }

  .model-badge {
    position: absolute;
    top: -15px;
    background: #0F172A;
    color: #FFFFFF;
    font-size: clamp(0.72rem, 1.3vw, 0.85rem);
    font-weight: 900;
    letter-spacing: 0.8px;
    padding: 4px 16px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .giant-emoji {
    font-size: clamp(4.8rem, 11vw, 7.8rem);
    line-height: 1;
    filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.1));
    user-select: none;
  }

  .model-label {
    font-size: clamp(1.2rem, 2.4vw, 1.7rem);
    font-weight: 950;
    color: #1E293B;
    letter-spacing: 1px;
    margin-top: 4px;
  }

  .guidance-banner {
    background: #F3E8FF;
    border: 2px dashed #C084FC;
    color: #7E22CE;
    padding: 8px 20px;
    border-radius: 14px;
    font-size: clamp(0.85rem, 1.5vw, 1rem);
    font-weight: 900;
    letter-spacing: 0.5px;
  }

  /* Palco de Sequência de Rotina */
  .sequence-stage {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1100px;
    max-height: 48vh;
    box-sizing: border-box;
  }

  .routine-chain {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(8px, 1.8vw, 18px);
    flex-wrap: nowrap;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding: 6px 4px;
    box-sizing: border-box;
  }

  .routine-step-card {
    background: #FFFFFF;
    border: 3.5px solid #CBD5E1;
    border-radius: 22px;
    padding: clamp(12px, 2vw, 20px) clamp(16px, 2.5vw, 28px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    box-shadow: 0 8px 0 #94A3B8, 0 10px 20px rgba(0, 0, 0, 0.08);
    min-width: clamp(100px, 18vw, 190px);
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .step-num {
    background: #F1F5F9;
    color: #475569;
    font-size: 0.74rem;
    font-weight: 900;
    letter-spacing: 0.5px;
    padding: 3px 10px;
    border-radius: 12px;
  }

  .step-emoji {
    font-size: clamp(3.2rem, 6.5vw, 4.8rem);
    line-height: 1;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  }

  .step-label {
    font-size: clamp(0.88rem, 1.5vw, 1.1rem);
    font-weight: 900;
    color: #1E293B;
    text-align: center;
  }

  .chain-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    animation: bounceRight 1.5s infinite ease-in-out;
  }

  @keyframes bounceRight {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(5px); }
  }

  /* Card Faltante [ ? ] */
  .missing-step-card {
    background: #FFFBEB;
    border: 3.5px dashed #F59E0B;
    border-radius: 22px;
    padding: clamp(12px, 2vw, 20px) clamp(16px, 2.5vw, 28px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    box-shadow: 0 8px 0 #D97706, 0 10px 22px rgba(245, 158, 11, 0.2);
    min-width: clamp(140px, 19vw, 205px);
    animation: slotGlow 2s infinite alternate;
    box-sizing: border-box;
  }

  @keyframes slotGlow {
    from {
      border-color: #F59E0B;
      box-shadow: 0 8px 0 #D97706, 0 0 12px rgba(245, 158, 11, 0.2);
    }
    to {
      border-color: #EA580C;
      box-shadow: 0 8px 0 #C2410C, 0 0 22px rgba(234, 88, 12, 0.35);
    }
  }

  .missing-badge {
    background: #D97706;
    color: #FFFFFF;
    font-size: 0.74rem;
    font-weight: 900;
    letter-spacing: 0.5px;
    padding: 3px 10px;
    border-radius: 12px;
  }

  .missing-pulse-box {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    height: clamp(3.2rem, 6.5vw, 4.8rem);
  }

  .missing-qmark {
    font-size: clamp(2.8rem, 5.5vw, 4rem);
    font-weight: 950;
    color: #D97706;
  }

  .missing-label {
    font-size: clamp(0.85rem, 1.4vw, 1.05rem);
    font-weight: 900;
    color: #B45309;
    text-align: center;
  }

  @media (max-width: 640px) {
    .model-card {
      padding: 10px 16px;
      border-radius: 18px;
    }

    .model-card .giant-emoji {
      font-size: clamp(3rem, 10vw, 4.2rem);
    }

    .model-card .model-label {
      font-size: 1.05rem;
    }

    .guidance-banner {
      padding: 5px 12px;
      font-size: 0.76rem;
    }

    .routine-step-card {
      min-width: 90px;
      padding: 8px 8px;
      border-radius: 14px;
      border-width: 2.5px;
    }

    .step-emoji {
      font-size: 2.2rem;
    }

    .step-label {
      font-size: 0.72rem;
    }

    .step-num {
      font-size: 0.62rem;
      padding: 2px 6px;
    }

    .missing-step-card {
      min-width: 90px;
      padding: 8px 8px;
      border-radius: 14px;
      border-width: 2.5px;
    }

    .missing-badge {
      font-size: 0.62rem;
      padding: 2px 6px;
    }

    .missing-label {
      font-size: 0.72rem;
    }
  }
</style>
