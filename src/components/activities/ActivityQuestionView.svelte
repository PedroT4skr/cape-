<script lang="ts">
  import type { ActivityQuestion } from '../../types/activity.types'
  import LiteracyQuestionView from './LiteracyQuestionView.svelte'
  import VisualPerceptionQuestionView from './VisualPerceptionQuestionView.svelte'

  interface Props {
    question: ActivityQuestion
  }

  const { question }: Props = $props()
</script>

<div class="question-view">
  {#if question.type === 'count' && question.items}
    <!-- Nível 1: Subitização & Contagem Concreta 1-a-1 -->
    <div class="concrete-container">
      <div class="items-grid">
        {#each Array(question.items.count) as _, i}
          <div class="item-token" style="animation-delay: {i * 80}ms;">
            <span class="token-emoji">{question.items.emoji}</span>
            <div class="token-dot-wrap">
              <span class="token-dot"></span>
              <span class="dot-number">{i + 1}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>

  {:else if question.type === 'addition' && question.groupA && question.groupB}
    <!-- Nível 2: Adição Pictórica Concreta (Agrupamento CPA) -->
    <div class="addition-container">
      <div class="concrete-group group-left">
        <span class="group-badge badge-left">{question.groupA.label}</span>
        <div class="items-grid">
          {#each Array(question.groupA.count) as _}
            <span class="token-emoji">{question.groupA.emoji}</span>
          {/each}
        </div>
      </div>

      <div class="operator-badge">➕</div>

      <div class="concrete-group group-right">
        <span class="group-badge badge-right">{question.groupB.label}</span>
        <div class="items-grid">
          {#each Array(question.groupB.count) as _}
            <span class="token-emoji">{question.groupB.emoji}</span>
          {/each}
        </div>
      </div>
    </div>

  {:else if question.type === 'comparison' && question.optionLeft && question.optionRight}
    <!-- Nível 3: Discriminação de Magnitude Espacial -->
    <div class="comparison-container">
      <div class="comparison-dish dish-left">
        <span class="dish-badge badge-left">{question.optionLeft.label}</span>
        <div class="items-grid">
          {#each Array(question.optionLeft.count) as _}
            <span class="token-emoji">{question.optionLeft.emoji}</span>
          {/each}
        </div>
      </div>

      <div class="vs-divider">VS</div>

      <div class="comparison-dish dish-right">
        <span class="dish-badge badge-right">{question.optionRight.label}</span>
        <div class="items-grid">
          {#each Array(question.optionRight.count) as _}
            <span class="token-emoji">{question.optionRight.emoji}</span>
          {/each}
        </div>
      </div>
    </div>

  {:else if question.type === 'initial_letter' || question.type === 'syllables' || question.type === 'word_match'}
    <!-- Categoria: Alfabetização & Consciência Fonológica -->
    <LiteracyQuestionView {question} />
  {:else if question.type === 'color_match' || question.type === 'shape_match' || question.type === 'routine_sequence'}
    <!-- Categoria: Percepção Visual & Pareamento -->
    <VisualPerceptionQuestionView {question} />
  {/if}
</div>

<style>
  .question-view {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
  }

  /* Contêiner de Contagem (Nível 1) */
  .concrete-container {
    background: #F0FDF4;
    border: 4px solid #4ADE80;
    border-radius: 32px;
    padding: clamp(20px, 3.5vw, 40px);
    box-shadow: 0 12px 30px rgba(34, 197, 94, 0.12);
    width: 100%;
    max-width: 1180px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    max-height: 48vh;
  }

  .items-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: clamp(18px, 3.2vw, 36px);
    width: 100%;
  }

  .item-token {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background: #FFFFFF;
    border: 3.5px solid #86EFAC;
    border-radius: 26px;
    padding: clamp(14px, 2vw, 24px) clamp(18px, 2.8vw, 32px);
    box-shadow: 0 6px 0 #22C55E, 0 10px 20px rgba(0, 0, 0, 0.05);
    min-width: clamp(120px, 16vw, 170px);
    transition: transform 0.2s ease;
  }

  .token-emoji {
    font-size: clamp(4.8rem, 10vw, 8rem);
    line-height: 1;
    filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.15));
    display: inline-block;
  }

  .token-dot-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #16A34A;
    padding: 4px 14px;
    border-radius: 20px;
    box-shadow: 0 2px 6px rgba(22, 163, 74, 0.3);
  }

  .token-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #FFFFFF;
  }

  .dot-number {
    font-size: 1.25rem;
    font-weight: 950;
    color: #FFFFFF;
  }

  /* Contêiner de Adição (Nível 2) */
  .addition-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(16px, 2.5vw, 28px);
    width: 100%;
    max-width: 1200px;
    box-sizing: border-box;
    max-height: 48vh;
  }

  .concrete-group {
    flex: 1;
    border-radius: 28px;
    padding: clamp(16px, 2.5vw, 28px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    max-height: 46vh;
    justify-content: center;
    box-sizing: border-box;
  }

  .concrete-group.group-left {
    background: #EFF6FF;
    border: 4px solid #3B82F6;
    box-shadow: 0 10px 26px rgba(37, 99, 235, 0.12);
  }

  .concrete-group.group-right {
    background: #FFF7ED;
    border: 4px solid #F97316;
    box-shadow: 0 10px 26px rgba(249, 115, 22, 0.12);
  }

  .group-badge {
    font-size: clamp(1rem, 2vw, 1.25rem);
    font-weight: 950;
    color: #FFFFFF;
    padding: 6px 18px;
    border-radius: 20px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .badge-left {
    background: #2563EB;
    box-shadow: 0 3px 8px rgba(37, 99, 235, 0.3);
  }

  .badge-right {
    background: #EA580C;
    box-shadow: 0 3px 8px rgba(234, 88, 12, 0.3);
  }

  .operator-badge {
    font-size: clamp(2.4rem, 4.8vw, 3.8rem);
    background: #FEF08A;
    border: 4px solid #EAB308;
    border-radius: 50%;
    width: clamp(64px, 8.5vw, 88px);
    height: clamp(64px, 8.5vw, 88px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 8px 20px rgba(234, 179, 8, 0.35);
  }

  /* Contêiner de Comparação (Nível 3) */
  .comparison-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(16px, 2.5vw, 32px);
    width: 100%;
    max-width: 1240px;
    max-height: 50vh;
    box-sizing: border-box;
  }

  .comparison-dish {
    flex: 1;
    border-radius: 30px;
    padding: clamp(16px, 2.8vw, 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    max-height: 48vh;
    justify-content: center;
    box-sizing: border-box;
  }

  .comparison-dish.dish-left {
    background: #EFF6FF;
    border: 4px solid #3B82F6;
    box-shadow: 0 12px 28px rgba(37, 99, 235, 0.12);
  }

  .comparison-dish.dish-right {
    background: #FFF7ED;
    border: 4px solid #F97316;
    box-shadow: 0 12px 28px rgba(249, 115, 22, 0.12);
  }

  .dish-badge {
    font-size: clamp(1.05rem, 2.2vw, 1.35rem);
    font-weight: 950;
    color: #FFFFFF;
    padding: 8px 24px;
    border-radius: 22px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .comparison-dish .token-emoji,
  .concrete-group .token-emoji {
    font-size: clamp(4.4rem, 8.5vw, 7.2rem);
    filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.15));
  }

  .vs-divider {
    font-size: clamp(1.3rem, 2.5vw, 2rem);
    font-weight: 950;
    color: #854D0E;
    background: #FEF08A;
    border: 4px solid #EAB308;
    border-radius: 50%;
    width: clamp(58px, 7.5vw, 80px);
    height: clamp(58px, 7.5vw, 80px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 8px 20px rgba(234, 179, 8, 0.3);
  }

  @media (max-width: 640px) {
    .concrete-container {
      padding: 12px 14px;
      border-radius: 20px;
      border-width: 3px;
    }

    .items-grid {
      gap: 10px;
    }

    .item-token {
      min-width: 78px;
      padding: 8px 12px;
      border-radius: 16px;
      border-width: 2.5px;
      gap: 6px;
    }

    .token-emoji {
      font-size: clamp(2.4rem, 8vw, 3.8rem);
    }

    .token-dot-wrap {
      padding: 2px 8px;
      gap: 5px;
    }

    .dot-number {
      font-size: 0.92rem;
    }

    .addition-container {
      gap: 6px;
    }

    .concrete-group {
      padding: 8px 10px;
      border-radius: 16px;
      border-width: 2.5px;
      gap: 8px;
    }

    .group-badge {
      font-size: 0.74rem;
      padding: 3px 8px;
    }

    .operator-badge {
      font-size: 1.3rem;
    }

    .comparison-container {
      gap: 6px;
    }

    .comparison-dish {
      padding: 8px 10px;
      border-radius: 16px;
      border-width: 2.5px;
      gap: 8px;
    }

    .dish-badge {
      font-size: 0.74rem;
      padding: 3px 8px;
    }

    .comparison-dish .token-emoji,
    .concrete-group .token-emoji {
      font-size: 2.2rem;
    }

    .vs-divider {
      width: 40px;
      height: 40px;
      font-size: 0.82rem;
      border-width: 2.5px;
    }
  }
</style>
