<script lang="ts">
  interface GroupItems {
    emoji: string
    count: number
    label: string
  }

  interface Props {
    leftGroup: GroupItems
    rightGroup: GroupItems
    centerBadge: string
    variant: 'addition' | 'comparison'
  }

  const { leftGroup, rightGroup, centerBadge, variant }: Props = $props()

  let maxCount = $derived(Math.max(leftGroup.count, rightGroup.count))
  let density = $derived(
    maxCount >= 5 ? 'high' : maxCount >= 3 ? 'medium' : 'low'
  )
</script>

<div class="dual-stage-container variant-{variant} density-{density}">
  <div class="group-panel panel-left">
    <span class="group-badge badge-left">{leftGroup.label}</span>
    <div class="group-items-grid">
      {#each Array(leftGroup.count) as _}
        <div class="visual-item-tile left-tile">
          <span class="tile-emoji">{leftGroup.emoji}</span>
        </div>
      {/each}
    </div>
  </div>

  <div class="center-divider {variant === 'addition' ? 'is-operator' : 'is-vs'}" aria-hidden="true">
    {centerBadge}
  </div>

  <div class="group-panel panel-right">
    <span class="group-badge badge-right">{rightGroup.label}</span>
    <div class="group-items-grid">
      {#each Array(rightGroup.count) as _}
        <div class="visual-item-tile right-tile">
          <span class="tile-emoji">{rightGroup.emoji}</span>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .dual-stage-container {
    display: flex;
    align-items: stretch;
    justify-content: center;
    gap: clamp(8px, 2vw, 26px);
    width: 100%;
    max-width: 1180px;
    box-sizing: border-box;
  }

  .group-panel {
    flex: 1 1 0;
    min-width: 0;
    border-radius: 26px;
    padding: clamp(12px, min(2vw, 2.2dvh), 26px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: clamp(10px, min(1.8vw, 2dvh), 16px);
    box-sizing: border-box;
    overflow: hidden;
  }

  .group-panel.panel-left {
    background: #EFF6FF;
    border: 4px solid #3B82F6;
    box-shadow: 0 10px 24px rgba(37, 99, 235, 0.12);
  }

  .group-panel.panel-right {
    background: #FFF7ED;
    border: 4px solid #F97316;
    box-shadow: 0 10px 24px rgba(249, 115, 22, 0.12);
  }

  .group-badge {
    font-size: clamp(0.85rem, min(1.85vw, 2.2dvh), 1.25rem);
    font-weight: 950;
    color: #FFFFFF;
    padding: clamp(4px, 0.85dvh, 8px) clamp(12px, 2vw, 22px);
    border-radius: 22px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    text-align: center;
    max-width: 100%;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .badge-left {
    background: #2563EB;
    box-shadow: 0 3px 8px rgba(37, 99, 235, 0.3);
  }

  .badge-right {
    background: #EA580C;
    box-shadow: 0 3px 8px rgba(234, 88, 12, 0.3);
  }

  .group-items-grid {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: clamp(8px, min(1.5vw, 1.8dvh), 18px);
    width: 100%;
    box-sizing: border-box;
  }

  .visual-item-tile {
    background: #FFFFFF;
    border-radius: 18px;
    border: 2.5px solid #BFDBFE;
    padding: clamp(6px, min(1.2vw, 1.4dvh), 14px);
    box-shadow: 0 4px 0 #93C5FD, 0 6px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1 / 1;
    box-sizing: border-box;
    overflow: hidden;
    margin-bottom: 4px;
  }

  .visual-item-tile.right-tile {
    border-color: #FED7AA;
    box-shadow: 0 4px 0 #FDBA74, 0 6px 12px rgba(0, 0, 0, 0.05);
  }

  .tile-emoji {
    font-size: clamp(2rem, min(5.5vw, 8dvh), 4.6rem);
    line-height: 1;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.14));
    user-select: none;
    display: inline-block;
  }

  .density-medium .tile-emoji {
    font-size: clamp(1.7rem, min(4.5vw, 6.6dvh), 3.6rem);
  }

  .density-high .tile-emoji {
    font-size: clamp(1.4rem, min(3.7vw, 5.2dvh), 2.9rem);
  }

  .density-high .visual-item-tile {
    border-radius: 14px;
    padding: clamp(4px, 0.8vw, 10px);
  }

  .center-divider {
    align-self: center;
    font-weight: 950;
    color: #854D0E;
    background: #FEF08A;
    border: 3.5px solid #EAB308;
    border-radius: 50%;
    width: clamp(42px, min(6.8vw, 8.2dvh), 76px);
    height: clamp(42px, min(6.8vw, 8.2dvh), 76px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 6px 16px rgba(234, 179, 8, 0.32);
  }

  .center-divider.is-operator {
    font-size: clamp(1.4rem, min(3.6vw, 4.6dvh), 2.6rem);
  }

  .center-divider.is-vs {
    font-size: clamp(1rem, min(2.2vw, 2.8dvh), 1.75rem);
  }

  @media (max-width: 640px) {
    .dual-stage-container {
      gap: 5px;
    }

    .group-panel {
      padding: 8px 4px;
      border-radius: 16px;
      border-width: 2.5px;
      gap: 6px;
    }

    .group-badge {
      font-size: 0.68rem;
      padding: 3px 8px;
    }

    .group-items-grid {
      gap: 4px;
    }

    .visual-item-tile {
      border-radius: 10px;
      border-width: 2px;
      padding: 4px;
      box-shadow: 0 3px 0 #93C5FD;
      margin-bottom: 3px;
    }

    .density-high .visual-item-tile {
      padding: 3px;
      border-radius: 8px;
    }

    .visual-item-tile.right-tile {
      box-shadow: 0 3px 0 #FDBA74;
    }

    .tile-emoji {
      font-size: clamp(1.75rem, 7.8vw, 2.5rem);
    }

    .density-medium .tile-emoji {
      font-size: clamp(1.4rem, 5.8vw, 2.05rem);
    }

    .density-high .tile-emoji {
      font-size: clamp(1.1rem, 4.4vw, 1.65rem);
    }

    .center-divider {
      width: 32px;
      height: 32px;
      border-width: 2.5px;
    }

    .center-divider.is-operator {
      font-size: 1rem;
    }

    .center-divider.is-vs {
      font-size: 0.72rem;
    }
  }
</style>
