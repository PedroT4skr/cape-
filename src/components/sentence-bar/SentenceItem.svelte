<script lang="ts">
  import type { SentenceItem } from '../../types/board.types'
  import { FITZGERALD_COLORS } from '../../constants/fitzgerald.constants'
  import IconRenderer from '../common/IconRenderer.svelte'

  interface Props {
    item: SentenceItem
    isHighlighted: boolean
  }

  let { item, isHighlighted }: Props = $props()

  let style = $derived(item.customStyle || FITZGERALD_COLORS[item.category] || FITZGERALD_COLORS.MISC)
</script>

<div
  class="sentence-item-card {isHighlighted ? 'highlighted' : ''}"
  style="background-color: {style.bg}; border-color: {style.border}; color: {style.text};"
>
  <div class="item-icon-area">
    {#if item.emoji}
      <span class="item-emoji">{item.emoji}</span>
    {:else}
      <IconRenderer
        iconName={item.iconName}
        iconSvg={item.iconSvg}
        size={46}
      />
    {/if}
  </div>
  <span class="item-label">{item.label}</span>
</div>

<style>
  .sentence-item-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 96px;
    height: 96px;
    padding: 6px;
    border-radius: 14px;
    border: 3.5px solid;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
    flex-shrink: 0;
    transition: transform 0.1s ease, box-shadow 0.1s ease;
  }

  .sentence-item-card.highlighted {
    transform: scale(1.08);
    box-shadow: 0 0 0 4px #2563EB, 0 8px 16px rgba(37, 99, 235, 0.35);
    z-index: 2;
  }

  .item-icon-area {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 52px;
  }

  .item-emoji {
    font-size: 2.6rem;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
  }

  .item-label {
    font-size: 0.95rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    margin-top: 2px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    padding: 0 2px;
  }

  @media (max-width: 640px) {
    .sentence-item-card {
      min-width: 68px;
      height: 72px;
      padding: 4px;
      border-radius: 10px;
      border-width: 2.5px;
    }

    .item-icon-area {
      height: 38px;
    }

    .item-emoji {
      font-size: 1.8rem;
    }

    .item-label {
      font-size: 0.68rem;
      margin-top: 1px;
    }
  }

  @media (max-height: 500px) and (orientation: landscape) {
    .sentence-item-card {
      min-width: 58px;
      height: 58px;
      padding: 3px;
      border-radius: 8px;
      border-width: 2px;
    }

    .item-icon-area {
      height: 30px;
    }

    .item-emoji {
      font-size: 1.4rem;
    }

    .item-label {
      font-size: 0.62rem;
    }
  }
</style>
