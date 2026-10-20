<script lang="ts">
  import { Volume2, Delete, Trash2 } from '@lucide/svelte'
  import {
    sentenceItems,
    isSpeaking,
    speakSentence,
    removeLastWord,
    clearSentence
  } from '../../stores/sentence.store'
  import { initRootBoard, boardHistory } from '../../stores/board.store'
  import { createTouchThrottler } from '../../utils/touch.utils'

  const throttle = createTouchThrottler(250)

  let hasWords = $derived($sentenceItems.length > 0)
  let isInSubBoard = $derived($boardHistory.length > 1)

  function handleSpeak() {
    throttle(() => speakSentence())
  }

  function handleDelete() {
    throttle(() => removeLastWord())
  }

  function handleClear() {
    throttle(() => {
      clearSentence()
      if (isInSubBoard) {
        initRootBoard()
      }
    })
  }
</script>

<div class="sentence-controls">
  <!-- Botão Falar Frase Completa -->
  <button
    class="ctrl-btn speak-btn"
    disabled={!hasWords || $isSpeaking}
    onclick={handleSpeak}
    aria-label="Falar frase completa"
    title="Falar Frase"
  >
    <Volume2 size={32} strokeWidth={2.6} />
    <span class="btn-text">FALAR</span>
  </button>

  <!-- Botão Apagar Última Palavra -->
  <button
    class="ctrl-btn delete-btn"
    disabled={!hasWords || $isSpeaking}
    onclick={handleDelete}
    aria-label="Apagar última palavra"
    title="Apagar Última Palavra"
  >
    <Delete size={26} strokeWidth={2.4} />
    <span class="btn-text">APAGAR</span>
  </button>

  <!-- Botão Limpar Tudo -->
  <button
    class="ctrl-btn clear-btn"
    disabled={(!hasWords && !isInSubBoard) || $isSpeaking}
    onclick={handleClear}
    aria-label="Limpar toda a frase e voltar ao início"
    title="Limpar Tudo e Início"
  >
    <Trash2 size={26} strokeWidth={2.4} />
    <span class="btn-text">LIMPAR</span>
  </button>
</div>

<style>
  .sentence-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  .ctrl-btn {
    border: none;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 94px;
    gap: 4px;
    font-weight: 900;
    cursor: pointer;
    transition: transform 0.08s ease, opacity 0.15s ease;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .ctrl-btn:active:not(:disabled) {
    transform: scale(0.93);
  }

  .ctrl-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    transform: none;
  }

  .btn-text {
    font-size: 0.85rem;
    font-weight: 900;
    letter-spacing: 0.6px;
    text-transform: uppercase;
  }

  .speak-btn {
    background: #16A34A;
    color: #FFFFFF;
    min-width: 105px;
    padding: 0 16px;
    box-shadow: 0 4px 8px -1px rgba(22, 163, 74, 0.35);
  }

  .speak-btn:hover:not(:disabled) {
    background: #15803D;
  }

  .speak-btn .btn-text {
    font-size: 1rem;
    letter-spacing: 0.8px;
  }

  .delete-btn {
    background: #F1F5F9;
    color: #1E293B;
    border: 3px solid #CBD5E1;
    min-width: 88px;
    padding: 0 12px;
  }

  .delete-btn:hover:not(:disabled) {
    background: #E2E8F0;
  }

  .clear-btn {
    background: #FEE2E2;
    color: #DC2626;
    border: 3px solid #FCA5A5;
    min-width: 88px;
    padding: 0 12px;
  }

  .clear-btn:hover:not(:disabled) {
    background: #FECACA;
  }

  @media (max-width: 640px) {
    .sentence-controls {
      gap: 5px;
    }

    .ctrl-btn {
      height: 68px;
      border-radius: 12px;
      gap: 2px;
    }

    .btn-text {
      font-size: 0.66rem;
      letter-spacing: 0.2px;
    }

    .speak-btn {
      min-width: 64px;
      padding: 0 6px;
    }

    .speak-btn .btn-text {
      font-size: 0.72rem;
      letter-spacing: 0.3px;
    }

    .delete-btn {
      min-width: 50px;
      padding: 0 4px;
      border-width: 2px;
    }

    .clear-btn {
      min-width: 50px;
      padding: 0 4px;
      border-width: 2px;
    }
  }

  @media (max-height: 500px) and (orientation: landscape) {
    .sentence-controls {
      gap: 4px;
    }

    .ctrl-btn {
      height: 56px;
      border-radius: 10px;
      gap: 1px;
    }

    .speak-btn {
      min-width: 58px;
      padding: 0 4px;
    }

    .delete-btn,
    .clear-btn {
      min-width: 46px;
      padding: 0 3px;
    }

    .btn-text {
      font-size: 0.62rem;
    }
  }
</style>
