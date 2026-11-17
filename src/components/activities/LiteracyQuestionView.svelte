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
          <span>
            {question.targetItem.highlight &&
            question.targetItem.word.toUpperCase().startsWith(question.targetItem.highlight.toUpperCase())
              ? question.targetItem.word.slice(question.targetItem.highlight.length)
              : question.targetItem.word.slice(2)}
          </span>
        </div>
      </div>
    </div>

  {:else if question.type === 'word_match' && question.targetItem}
    <!-- Nível 3: Pareamento Imagem-Palavra / Emoções / Vocabulário -->
    <div class="literacy-stage word-stage">
      <div class="picture-card enlarged">
        <span class="giant-emoji">{question.targetItem.emoji}</span>
      </div>
      <div class="match-hint-badge">
        <span>{question.targetItem.hintBadge || 'ESCOLHA A PALAVRA CORRETA ABAIXO'}</span>
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
    padding: 4px 8px;
    box-sizing: border-box;
  }

  .literacy-stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: clamp(10px, min(2.2vw, 2.4dvh), 22px);
    width: 100%;
    max-width: 960px;
    box-sizing: border-box;
  }

  /* Card da Imagem / Pictograma */
  .picture-card {
    background: #FFFFFF;
    border: 4px solid #86EFAC;
    border-radius: 28px;
    padding: clamp(12px, min(2.2vw, 2.4dvh), 28px) clamp(22px, 4vw, 48px);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 0 #22C55E, 0 12px 24px rgba(34, 197, 94, 0.15);
    transition: transform 0.2s ease;
    overflow: hidden;
    margin-bottom: 8px;
    box-sizing: border-box;
  }

  .picture-card.enlarged {
    border-color: #FDBA74;
    box-shadow: 0 8px 0 #EA580C, 0 12px 24px rgba(234, 88, 12, 0.15);
    padding: clamp(14px, min(2.8vw, 3dvh), 34px) clamp(28px, 5vw, 58px);
  }

  .giant-emoji {
    font-size: clamp(3rem, min(10vw, 13.5dvh), 7.5rem);
    line-height: 1;
    filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.16));
    display: inline-block;
    user-select: none;
  }

  /* Bloco de Letra Faltante (Nível 1) */
  .word-slot-card {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    background: #F0FDF4;
    border: 3.5px solid #4ADE80;
    border-radius: 22px;
    padding: clamp(6px, 1.2dvh, 10px) clamp(14px, 3vw, 26px);
    box-shadow: 0 6px 16px rgba(34, 197, 94, 0.12);
    max-width: 100%;
    box-sizing: border-box;
  }

  .slot-letter-missing {
    width: clamp(42px, min(6.5vw, 7.5dvh), 64px);
    height: clamp(42px, min(6.5vw, 7.5dvh), 64px);
    background: #FEF08A;
    border: 3.5px solid #EAB308;
    color: #854D0E;
    border-radius: 16px;
    font-size: clamp(1.6rem, min(3.6vw, 4.4dvh), 2.5rem);
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
    font-size: clamp(1.6rem, min(4.2vw, 5.2dvh), 3rem);
    font-weight: 950;
    color: #14532D;
    letter-spacing: clamp(4px, 1vw, 10px);
    text-transform: uppercase;
  }

  /* Bloco de Sílabas (Nível 2) */
  .syllables-chain {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: clamp(8px, 1.8vw, 14px);
    max-width: 100%;
  }

  .syllable-slot {
    min-width: clamp(64px, 11vw, 110px);
    height: clamp(50px, min(8vw, 9.5dvh), 78px);
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 950;
    font-size: clamp(1.5rem, min(3.8vw, 4.8dvh), 2.8rem);
    text-transform: uppercase;
    box-sizing: border-box;
    padding: 4px 14px;
    margin-bottom: 5px;
  }

  .syllable-slot.missing-slot {
    background: #FEF08A;
    border: 3.5px solid #EAB308;
    color: #854D0E;
    box-shadow: 0 5px 0 #CA8A04, 0 8px 18px rgba(234, 179, 8, 0.25);
    animation: pulseSlot 1.5s infinite ease-in-out;
  }

  .syllable-slot.present-slot {
    background: #EFF6FF;
    border: 3.5px solid #3B82F6;
    color: #1E40AF;
    box-shadow: 0 5px 0 #2563EB, 0 8px 18px rgba(37, 99, 235, 0.15);
  }

  .syllable-hyphen {
    font-size: clamp(1.4rem, 2.5vw, 2rem);
    font-weight: 900;
    color: #94A3B8;
  }

  /* Badge de Orientação (Nível 3) */
  .match-hint-badge {
    background: #FFF7ED;
    border: 3px solid #F97316;
    color: #C2410C;
    font-size: clamp(0.76rem, 1.6vw, 1.15rem);
    font-weight: 950;
    padding: clamp(5px, 1dvh, 8px) clamp(12px, 2.2vw, 22px);
    border-radius: 18px;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.12);
    text-align: center;
    max-width: 100%;
    box-sizing: border-box;
  }

  @media (max-width: 640px) {
    .picture-card {
      padding: 12px 20px;
      border-radius: 20px;
      border-width: 3px;
      box-shadow: 0 6px 0 #22C55E, 0 8px 16px rgba(34, 197, 94, 0.14);
      margin-bottom: 6px;
    }

    .picture-card.enlarged {
      padding: 14px 24px;
      box-shadow: 0 6px 0 #EA580C, 0 8px 16px rgba(234, 88, 12, 0.14);
    }

    .giant-emoji {
      font-size: clamp(2.8rem, 12vw, 4.4rem);
    }

    .word-slot-card {
      padding: 7px 14px;
      border-radius: 16px;
      gap: 8px;
    }

    .slot-letter-missing {
      width: 40px;
      height: 40px;
      font-size: 1.6rem;
      border-radius: 12px;
    }

    .slot-rest-of-word {
      font-size: 1.6rem;
      letter-spacing: 4px;
    }

    .syllables-chain {
      gap: 8px;
    }

    .syllable-slot {
      min-width: 54px;
      height: 46px;
      font-size: 1.4rem;
      border-radius: 14px;
      border-width: 2.5px;
      padding: 4px 10px;
    }

    .syllable-hyphen {
      font-size: 1.3rem;
    }

    .match-hint-badge {
      font-size: 0.74rem;
      padding: 5px 12px;
      border-radius: 12px;
    }
  }
</style>
