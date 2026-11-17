<script lang="ts">
  import type { ActivityOption } from '../../../types/activity.types'

  interface Props {
    options: ActivityOption[]
    isProcessing: boolean
    onSelect: (option: ActivityOption) => void
  }

  const { options, isProcessing, onSelect }: Props = $props()
</script>

<footer
  class="options-container options-{options.length}"
  style="--opt-count: {options.length};"
>
  {#each options as option, idx}
    <button
      class="option-btn color-scheme-{idx % 3} {option.label.length <= 2 ? 'is-number' : 'is-text'}"
      disabled={isProcessing}
      onclick={() => onSelect(option)}
    >
      <span class="option-label">
        {option.label}
      </span>
      {#if option.emojiVisual}
        <span class="option-hint">{option.emojiVisual}</span>
      {/if}
    </button>
  {/each}
</footer>

<style>
  .options-container {
    display: grid;
    grid-template-columns: repeat(var(--opt-count, 3), minmax(0, 1fr));
    gap: clamp(10px, 2.2vw, 28px);
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 4px 0 10px;
    flex-shrink: 0;
    box-sizing: border-box;
  }

  .options-container.options-2 {
    max-width: 980px;
  }

  .option-btn {
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    cursor: pointer;
    transition: transform 0.1s ease, box-shadow 0.1s ease, filter 0.15s ease;
    padding: clamp(8px, 1.5dvh, 14px) clamp(8px, 2vw, 20px);
    box-sizing: border-box;
    user-select: none;
    min-width: 0;
    min-height: clamp(74px, 12dvh, 126px);
    overflow: hidden;
  }

  .options-container.options-2 .option-btn {
    min-height: clamp(82px, 13.5dvh, 136px);
  }

  .option-btn:disabled {
    cursor: default;
    opacity: 0.88;
    transform: none !important;
  }

  /* Esquema 0: Azul Royal Vibrante Gamificado */
  .option-btn.color-scheme-0 {
    background: #2563EB;
    border: 3.5px solid #60A5FA;
    box-shadow: 0 7px 0 #1D4ED8, 0 12px 20px rgba(37, 99, 235, 0.28);
    color: #FFFFFF;
  }

  .option-btn.color-scheme-0:hover {
    filter: brightness(1.06);
  }

  .option-btn.color-scheme-0:active {
    transform: translateY(5px);
    box-shadow: 0 2px 0 #1D4ED8, 0 5px 10px rgba(37, 99, 235, 0.2);
  }

  /* Esquema 1: Laranja/Coral Quente Vibrante Gamificado */
  .option-btn.color-scheme-1 {
    background: #EA580C;
    border: 3.5px solid #FDBA74;
    box-shadow: 0 7px 0 #C2410C, 0 12px 20px rgba(234, 88, 12, 0.28);
    color: #FFFFFF;
  }

  .option-btn.color-scheme-1:hover {
    filter: brightness(1.06);
  }

  .option-btn.color-scheme-1:active {
    transform: translateY(5px);
    box-shadow: 0 2px 0 #C2410C, 0 5px 10px rgba(234, 88, 12, 0.2);
  }

  /* Esquema 2: Verde Esmeralda Vibrante Gamificado */
  .option-btn.color-scheme-2 {
    background: #059669;
    border: 3.5px solid #6EE7B7;
    box-shadow: 0 7px 0 #047857, 0 12px 20px rgba(5, 150, 105, 0.28);
    color: #FFFFFF;
  }

  .option-btn.color-scheme-2:hover {
    filter: brightness(1.06);
  }

  .option-btn.color-scheme-2:active {
    transform: translateY(5px);
    box-shadow: 0 2px 0 #047857, 0 5px 10px rgba(5, 150, 105, 0.2);
  }

  .option-label {
    font-weight: 950;
    line-height: 1.08;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    letter-spacing: 0.4px;
    text-align: center;
    max-width: 100%;
    overflow-wrap: break-word;
  }

  .option-btn.is-number .option-label {
    font-size: clamp(2.2rem, min(5.5vw, 6.2dvh), 4.2rem);
  }

  .option-btn.is-text .option-label {
    font-size: clamp(1rem, min(2.6vw, 3.2dvh), 2rem);
    text-transform: uppercase;
  }

  .option-hint {
    font-size: clamp(0.85rem, min(2.2vw, 2.8dvh), 1.8rem);
    letter-spacing: 1px;
    line-height: 1.15;
    color: #FFFFFF;
    font-weight: 900;
    background: rgba(0, 0, 0, 0.18);
    padding: 4px 10px;
    border-radius: 14px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
    max-width: 100%;
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    box-sizing: border-box;
    word-break: break-word;
  }

  @media (max-width: 640px) {
    .options-container {
      gap: 7px;
      padding: 2px 0 6px;
    }

    .options-container.options-2 .option-btn,
    .options-container.options-3 .option-btn {
      min-height: 58px;
      border-radius: 15px;
      padding: 6px 5px;
      gap: 4px;
    }

    .option-btn.color-scheme-0,
    .option-btn.color-scheme-1,
    .option-btn.color-scheme-2 {
      border-width: 2.5px;
      box-shadow: 0 4px 0 rgba(0, 0, 0, 0.25);
    }

    .option-btn.is-number .option-label {
      font-size: clamp(1.7rem, 7.5vw, 2.6rem);
    }

    .option-btn.is-text .option-label {
      font-size: clamp(0.74rem, 3.2vw, 1.1rem);
    }

    .option-hint {
      font-size: clamp(0.68rem, 2.8vw, 0.95rem);
      padding: 2px 6px;
      border-radius: 9px;
      letter-spacing: 0px;
    }
  }

  @media (max-height: 500px) and (orientation: landscape) {
    .options-container {
      padding: 2px 0 5px;
    }

    .options-container.options-2 .option-btn,
    .options-container.options-3 .option-btn {
      min-height: 46px;
      padding: 4px 8px;
      border-radius: 14px;
    }

    .option-btn.is-number .option-label {
      font-size: 1.6rem;
    }

    .option-btn.is-text .option-label {
      font-size: 0.85rem;
    }

    .option-hint {
      font-size: 0.8rem;
      padding: 2px 6px;
    }
  }
</style>
