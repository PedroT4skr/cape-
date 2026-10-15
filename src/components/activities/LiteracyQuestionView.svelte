<script lang="ts">
  import type { ActivityQuestion } from '../../types/activity.types'

  interface Props {
    question: ActivityQuestion
  }

  const { question }: Props = $props()
</script>

<div class="literacy-question-view">
  {#if question.type === 'initial_letter' && question.targetItem}
    <!-- Nível 1: Letra Inicial com Destaque Fonológico -->
    <div class="literacy-stage letter-stage">
      <div class="picture-card">
        <span class="giant-emoji">{question.targetItem.emoji}</span>
      </div>

      <div class="word-slot-card">
        <div class="slot-letter-missing">?</div>
        {#if question.targetItem.displayWord}
          <span class="slot-rest-of-word">
            {question.targetItem.displayWord.replace(/^_/, '').trim()}
          </span>
        {/if}
      </div>
    </div>

  {:else if question.type === 'syllables' && question.targetItem}
    <!-- Nível 2: Sílaba Inicial (Segmentação Silábica Concreta) -->
    <div class="literacy-stage syllable-stage">
      <div class="picture-card">
        <span class="giant-emoji">{question.targetItem.emoji}</span>
      </div>

      <div class="syllables-chain">
        <div class="syllable-slot missing-slot">
          <span class="missing-mark">?</span>
        </div>
        <div class="syllable-hyphen">―</div>
        <div class="syllable-slot present-slot">
          <span>{question.targetItem.word.slice(2)}</span>
        </div>
      </div>
    </div>

  {:else if question.type === 'word_match' && question.targetItem}
    <!-- Nível 3: Pareamento Imagem-Palavra TEACCH / PECS -->
    <div class="literacy-stage word-stage">
      <div class="picture-card enlarged">
        <span class="giant-emoji">{question.targetItem.emoji}</span>
      </div>
      <div class="match-hint-badge">
        <span>ESCOLHA A PALAVRA CORRETA ABAIXO</span>
      </div>
    </div>
  {/if}
</div>

<style>
  .literacy-question-view {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
  }

  .literacy-stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: clamp(14px, 2.5vw, 24px);
    width: 100%;
    max-width: 960px;
    max-height: 50vh;
    box-sizing: border-box;
  }

  /* Card da Imagem / Pictograma */
  .picture-card {
    background: #FFFFFF;
    border: 4px solid #86EFAC;
    border-radius: 32px;
    padding: clamp(16px, 2.5vw, 32px) clamp(28px, 4.5vw, 54px);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 0 #22C55E, 0 14px 28px rgba(34, 197, 94, 0.15);
    transition: transform 0.2s ease;
  }

  .picture-card.enlarged {
    border-color: #FDBA74;
    box-shadow: 0 10px 0 #EA580C, 0 14px 28px rgba(234, 88, 12, 0.15);
    padding: clamp(20px, 3.2vw, 38px) clamp(36px, 5.5vw, 68px);
  }

  .giant-emoji {
    font-size: clamp(5.2rem, 11vw, 8.5rem);
    line-height: 1;
    filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.16));
    display: inline-block;
  }

  /* Bloco de Letra Faltante (Nível 1) */
  .word-slot-card {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #F0FDF4;
    border: 3.5px solid #4ADE80;
    border-radius: 24px;
    padding: 10px 28px;
    box-shadow: 0 6px 18px rgba(34, 197, 94, 0.12);
  }

  .slot-letter-missing {
    width: clamp(52px, 7vw, 70px);
    height: clamp(52px, 7vw, 70px);
    background: #FEF08A;
    border: 3.5px solid #EAB308;
    color: #854D0E;
    border-radius: 18px;
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 950;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 0 #CA8A04;
    animation: pulseSlot 1.5s infinite ease-in-out;
  }

  @keyframes pulseSlot {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.06); }
  }

  .slot-rest-of-word {
    font-size: clamp(2.2rem, 4.6vw, 3.4rem);
    font-weight: 950;
    color: #14532D;
    letter-spacing: clamp(6px, 1.2vw, 12px);
    text-transform: uppercase;
  }

  /* Bloco de Sílabas (Nível 2) */
  .syllables-chain {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .syllable-slot {
    min-width: clamp(80px, 12vw, 120px);
    height: clamp(64px, 9vw, 86px);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 950;
    font-size: clamp(2rem, 4.2vw, 3rem);
    text-transform: uppercase;
    box-sizing: border-box;
    padding: 6px 16px;
  }

  .syllable-slot.missing-slot {
    background: #FEF08A;
    border: 4px solid #EAB308;
    color: #854D0E;
    box-shadow: 0 6px 0 #CA8A04, 0 10px 20px rgba(234, 179, 8, 0.25);
    animation: pulseSlot 1.5s infinite ease-in-out;
  }

  .syllable-slot.present-slot {
    background: #EFF6FF;
    border: 4px solid #3B82F6;
    color: #1E40AF;
    box-shadow: 0 6px 0 #2563EB, 0 10px 20px rgba(37, 99, 235, 0.15);
  }

  .syllable-hyphen {
    font-size: 2rem;
    font-weight: 900;
    color: #94A3B8;
  }

  /* Badge de Orientação (Nível 3) */
  .match-hint-badge {
    background: #FFF7ED;
    border: 3px solid #F97316;
    color: #C2410C;
    font-size: clamp(0.95rem, 1.8vw, 1.2rem);
    font-weight: 950;
    padding: 8px 22px;
    border-radius: 20px;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.12);
  }

  @media (max-width: 640px) {
    .picture-card {
      padding: 12px 20px;
      border-radius: 20px;
      border-width: 3px;
    }

    .picture-card.enlarged {
      padding: 14px 24px;
    }

    .giant-emoji {
      font-size: clamp(3.2rem, 11vw, 4.6rem);
    }

    .word-slot-card {
      padding: 8px 16px;
      border-radius: 16px;
      gap: 8px;
    }

    .slot-letter-missing {
      width: 44px;
      height: 44px;
      font-size: 1.8rem;
      border-radius: 12px;
    }

    .slot-rest-of-word {
      font-size: 1.8rem;
      letter-spacing: 4px;
    }

    .syllables-chain {
      gap: 8px;
    }

    .syllable-slot {
      min-width: 58px;
      height: 50px;
      font-size: 1.5rem;
      border-radius: 14px;
      border-width: 2.5px;
      padding: 4px 10px;
    }

    .syllable-hyphen {
      font-size: 1.4rem;
    }

    .match-hint-badge {
      font-size: 0.74rem;
      padding: 5px 12px;
      border-radius: 12px;
    }
  }
</style>
