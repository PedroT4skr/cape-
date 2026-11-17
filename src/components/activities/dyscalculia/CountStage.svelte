<script lang="ts">
  interface CountItems {
    emoji: string
    count: number
    label: string
  }

  interface Props {
    items: CountItems
  }

  const { items }: Props = $props()

  let density = $derived(
    items.count >= 6 ? 'high' : items.count >= 4 ? 'medium' : 'low'
  )
</script>

<div class="concrete-container density-{density}">
  <div class="items-grid" style="--item-count: {items.count};">
    {#each Array(items.count) as _, i}
      <div class="item-token" style="animation-delay: {i * 70}ms;">
        <div class="emoji-frame">
          <span class="token-emoji">{items.emoji}</span>
        </div>
        <div class="token-dot-wrap">
          <span class="token-dot"></span>
          <span class="dot-number">{i + 1}</span>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .concrete-container {
    background: #F0FDF4;
    border: 4px solid #4ADE80;
    border-radius: 28px;
    padding: clamp(14px, min(2.4vw, 2.8dvh), 30px);
    box-shadow: 0 10px 26px rgba(34, 197, 94, 0.12);
    width: 100%;
    max-width: 1120px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    overflow: hidden;
  }

  .items-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: clamp(10px, min(2vw, 2.4dvh), 26px);
    width: 100%;
    box-sizing: border-box;
  }

  .concrete-container.density-high .items-grid {
    gap: clamp(8px, min(1.4vw, 1.8dvh), 16px);
  }

  .item-token {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: clamp(6px, min(1vw, 1.2dvh), 12px);
    background: #FFFFFF;
    border: 3px solid #86EFAC;
    border-radius: 22px;
    padding: clamp(10px, min(1.6vw, 2dvh), 20px) clamp(12px, min(2vw, 2.2dvh), 24px);
    box-shadow: 0 5px 0 #22C55E, 0 8px 16px rgba(0, 0, 0, 0.05);
    min-width: clamp(92px, min(14vw, 17dvh), 164px);
    max-width: 190px;
    box-sizing: border-box;
    transition: transform 0.2s ease;
    margin-bottom: 5px;
  }

  /* 4–5 itens: garante disposição equilibrada (1 linha em desktop/tablet, 3+2 no celular) */
  .concrete-container.density-medium .item-token {
    min-width: clamp(82px, min(13vw, 15dvh), 152px);
    padding: clamp(8px, min(1.3vw, 1.6dvh), 16px) clamp(10px, min(1.7vw, 2dvh), 20px);
  }

  /* 6+ itens: grade compacta para evitar cortes ou estouro vertical */
  .concrete-container.density-high .item-token {
    min-width: clamp(68px, min(10.5vw, 13dvh), 124px);
    border-radius: 16px;
    border-width: 2.5px;
    padding: clamp(6px, min(1vw, 1.2dvh), 12px) clamp(8px, min(1.2vw, 1.4dvh), 14px);
    gap: 4px;
    box-shadow: 0 4px 0 #22C55E, 0 6px 12px rgba(0, 0, 0, 0.05);
    margin-bottom: 4px;
  }

  .emoji-frame {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 1 / 1;
    max-width: clamp(46px, min(7vw, 10dvh), 92px);
    overflow: hidden;
  }

  .concrete-container.density-medium .emoji-frame {
    max-width: clamp(42px, min(6.2vw, 8.8dvh), 82px);
  }

  .concrete-container.density-high .emoji-frame {
    max-width: clamp(32px, min(4.8vw, 6.8dvh), 62px);
  }

  .token-emoji {
    font-size: clamp(2.4rem, min(6.2vw, 8.5dvh), 5.2rem);
    line-height: 1;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.14));
    display: inline-block;
    user-select: none;
  }

  .concrete-container.density-medium .token-emoji {
    font-size: clamp(2.1rem, min(5.4vw, 7.6dvh), 4.6rem);
  }

  .concrete-container.density-high .token-emoji {
    font-size: clamp(1.6rem, min(4.2vw, 6dvh), 3.4rem);
  }

  .token-dot-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background: #16A34A;
    padding: 3px 12px;
    border-radius: 20px;
    box-shadow: 0 2px 5px rgba(22, 163, 74, 0.3);
  }

  .concrete-container.density-high .token-dot-wrap {
    padding: 2px 9px;
    gap: 4px;
  }

  .token-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #FFFFFF;
    flex-shrink: 0;
  }

  .concrete-container.density-high .token-dot {
    width: 8px;
    height: 8px;
  }

  .dot-number {
    font-size: clamp(0.95rem, min(1.8vw, 2.2dvh), 1.2rem);
    font-weight: 950;
    color: #FFFFFF;
    line-height: 1;
  }

  .concrete-container.density-high .dot-number {
    font-size: 0.88rem;
  }

  @media (max-width: 640px) {
    .concrete-container {
      padding: 10px 10px;
      border-radius: 18px;
      border-width: 3px;
    }

    .items-grid {
      gap: 8px;
    }

    .item-token {
      min-width: clamp(72px, 24vw, 108px);
      padding: 7px 8px;
      border-radius: 15px;
      border-width: 2.5px;
      gap: 5px;
      box-shadow: 0 4px 0 #22C55E, 0 6px 10px rgba(0, 0, 0, 0.05);
      margin-bottom: 4px;
    }

    .concrete-container.density-medium .item-token {
      min-width: clamp(68px, 22vw, 96px);
      padding: 6px 8px;
    }

    .concrete-container.density-high .item-token {
      min-width: clamp(58px, 19vw, 80px);
      padding: 5px 6px;
      border-radius: 12px;
    }

    .emoji-frame {
      max-width: clamp(40px, 12vw, 56px);
    }

    .concrete-container.density-medium .emoji-frame {
      max-width: clamp(34px, 10.5vw, 48px);
    }

    .concrete-container.density-high .emoji-frame {
      max-width: clamp(28px, 9vw, 40px);
    }

    .token-emoji {
      font-size: clamp(2.1rem, 9.5vw, 3.1rem);
    }

    .concrete-container.density-medium .token-emoji {
      font-size: clamp(1.85rem, 8.2vw, 2.7rem);
    }

    .concrete-container.density-high .token-emoji {
      font-size: clamp(1.45rem, 6.8vw, 2.2rem);
    }

    .token-dot-wrap {
      padding: 2px 8px;
      gap: 4px;
    }

    .token-dot {
      width: 8px;
      height: 8px;
    }

    .dot-number {
      font-size: 0.82rem;
    }
  }
</style>
