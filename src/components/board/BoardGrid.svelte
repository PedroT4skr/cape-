<script lang="ts">
  import {
    currentBoard,
    boardCells,
    isLoadingBoard
  } from '../../stores/board.store'
  import BoardCell from './BoardCell.svelte'

  let cols = $derived($currentBoard?.gridCols || 4)
  let rows = $derived($currentBoard?.gridRows || 3)
</script>

<main class="board-grid-container" aria-label="Grade de pictogramas">
  {#if $isLoadingBoard}
    <div class="grid-loading">
      <div class="spinner"></div>
      <p>Carregando prancha...</p>
    </div>
  {:else if $boardCells.length === 0}
    <div class="grid-empty">
      <p>Nenhum cartão cadastrado nesta prancha.</p>
    </div>
  {:else}
    <div
      class="board-grid"
      style="grid-template-columns: repeat({cols}, 1fr); grid-template-rows: repeat({rows}, 1fr);"
    >
      {#each $boardCells as cell (cell.id)}
        <div class="cell-wrapper">
          <BoardCell {cell} />
        </div>
      {/each}
    </div>
  {/if}
</main>

<style>
  .board-grid-container {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 12px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .board-grid {
    flex: 1;
    width: 100%;
    height: 100%;
    display: grid;
    gap: 12px;
  }

  .cell-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .grid-loading,
  .grid-empty {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #64748B;
    font-size: 1.1rem;
    font-weight: 600;
    gap: 12px;
  }

  .spinner {
    width: 36px;
    height: 36px;
    border: 4px solid #E2E8F0;
    border-top-color: #2563EB;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 640px) {
    .board-grid-container {
      padding: 6px;
    }

    .board-grid {
      gap: 6px;
    }
  }

  @media (max-height: 500px) and (orientation: landscape) {
    .board-grid-container {
      padding: 4px;
    }

    .board-grid {
      gap: 5px;
    }
  }
</style>
