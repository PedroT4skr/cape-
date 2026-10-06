<script lang="ts">
  import type { Cell } from '../../types/board.types'
  import { FITZGERALD_COLORS } from '../../constants/fitzgerald.constants'
  import { addCellToSentence } from '../../stores/sentence.store'
  import { navigateToBoard, navigateBack } from '../../stores/board.store'
  import { soundEffects } from '../../services/sound-effects.service'
  import { createTouchThrottler } from '../../utils/touch.utils'
  import IconRenderer from '../common/IconRenderer.svelte'
  import { FolderOpen } from '@lucide/svelte'

  interface Props {
    cell: Cell
  }

  let { cell }: Props = $props()

  const throttle = createTouchThrottler(300)
  let isPressed = $state(false)

  let isBackAction = $derived(
    cell.isNavigationOnly ||
    cell.label.trim().toUpperCase() === 'VOLTAR' ||
    (cell.category === 'MISC' && cell.targetBoardId === 'board-root')
  )

  let style = $derived(cell.customStyle || FITZGERALD_COLORS[cell.category] || FITZGERALD_COLORS.MISC)

  function handleInteraction() {
    throttle(() => {
      isPressed = true
      setTimeout(() => (isPressed = false), 180)

      // Se for botão de retorno/navegação exclusiva, apenas volta sem poluir a frase
      if (isBackAction) {
        soundEffects.playTapSound()
        if (cell.targetBoardId && cell.targetBoardId !== 'board-root') {
          navigateToBoard(cell.targetBoardId)
        } else {
          navigateBack()
        }
        return
      }

      // Adiciona à frase e pronuncia
      addCellToSentence(cell)

      // Se for atalho para outra sub-prancha (ex: Comer -> Alimentação), navega
      if (cell.targetBoardId) {
        setTimeout(() => {
          if (cell.targetBoardId) {
            navigateToBoard(cell.targetBoardId)
          }
        }, 220)
      }
    })
  }
</script>

<button
  type="button"
  class="board-cell-btn {isPressed ? 'pressed' : ''} {cell.targetBoardId ? 'has-subboard' : ''}"
  style="background-color: {style.bg}; border-color: {style.border}; color: {style.text};"
  onclick={handleInteraction}
  aria-label="{cell.label} ({style.label})"
>
  {#if cell.targetBoardId}
    <div class="subboard-badge" title="Abre outra pasta de cartões">
      <FolderOpen size={14} strokeWidth={2.4} />
    </div>
  {/if}

  <div class="cell-icon-wrapper">
    {#if cell.emoji}
      <span class="cell-emoji">{cell.emoji}</span>
    {:else}
      <IconRenderer
        iconName={cell.iconName}
        iconSvg={cell.iconSvg}
        size={84}
      />
    {/if}
  </div>

  <span class="cell-label">{cell.label}</span>
</button>

<style>
  .board-cell-btn {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 0;
    border-radius: 20px;
    border: 4.5px solid;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px 6px;
    box-shadow: 0 4px 8px -1px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    touch-action: manipulation;
    user-select: none;
    -webkit-user-select: none;
    transition: transform 0.08s ease, filter 0.08s ease;
  }

  .board-cell-btn:active,
  .board-cell-btn.pressed {
    transform: scale(0.94);
    filter: brightness(0.9);
  }

  .subboard-badge {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(15, 23, 42, 0.18);
    color: currentColor;
    border-radius: 8px;
    padding: 4px 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cell-icon-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 0;
  }

  .cell-emoji {
    font-size: clamp(3.6rem, 7.8vw, 6.4rem);
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.12));
    transition: transform 0.1s ease;
  }

  .cell-label {
    font-size: clamp(1.35rem, 2.5vw, 2.2rem);
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    text-align: center;
    line-height: 1.1;
    margin-top: 4px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 8px;
  }

  @media (max-width: 640px) {
    .board-cell-btn {
      border-width: 3px;
      border-radius: 14px;
      padding: 4px 2px;
    }
    .cell-emoji {
      font-size: clamp(1.8rem, 6.8vw, 2.8rem);
    }
    .cell-label {
      font-size: clamp(0.68rem, 2.4vw, 0.92rem);
      letter-spacing: 0.2px;
      padding: 0 2px;
      margin-top: 2px;
    }
    .subboard-badge {
      top: 4px;
      right: 4px;
      padding: 2px 4px;
      border-radius: 6px;
    }
  }

  @media (max-height: 500px) and (orientation: landscape) {
    .board-cell-btn {
      border-width: 2.5px;
      border-radius: 11px;
      padding: 2px;
    }
    .cell-emoji {
      font-size: clamp(1.6rem, 11vh, 2.4rem);
    }
    .cell-label {
      font-size: 0.68rem;
      margin-top: 1px;
      padding: 0 2px;
    }
    .subboard-badge {
      top: 3px;
      right: 3px;
      padding: 1px 3px;
    }
  }
</style>
