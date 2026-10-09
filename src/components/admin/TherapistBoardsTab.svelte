<script lang="ts">
  import {
    currentBoard,
    boardCells,
    allBoards,
    loadBoard
  } from '../../stores/board.store'
  import { saveBoard } from '../../db/boards.repository'
  import { deleteCell } from '../../db/cells.repository'
  import { FITZGERALD_COLORS } from '../../constants/fitzgerald.constants'
  import IconRenderer from '../common/IconRenderer.svelte'
  import AddCellModal from './AddCellModal.svelte'
  import { Plus, Trash2, LayoutGrid } from '@lucide/svelte'

  let isAddCellOpen = $state(false)

  async function handleBoardSelect(event: Event) {
    const target = event.target as HTMLSelectElement
    if (target.value) {
      await loadBoard(target.value)
    }
  }

  async function handleGridChange(cols: number, rows: number) {
    if (!$currentBoard) return
    const updated = { ...$currentBoard, gridCols: cols, gridRows: rows }
    await saveBoard(updated)
    await loadBoard(updated.id)
  }

  async function handleDeleteCell(cellId: string) {
    if (!$currentBoard) return
    await deleteCell(cellId)
    await loadBoard($currentBoard.id)
  }
</script>

<div class="boards-tab-layout">
  <!-- Painel Esquerdo: Configurações da Prancha -->
  <aside class="sidebar-panel">
    <div class="config-card">
      <span class="card-section-title">Prancha em Edição:</span>
      <select
        id="board-select"
        class="board-dropdown"
        value={$currentBoard?.id}
        onchange={handleBoardSelect}
      >
        {#each $allBoards as board}
          <option value={board.id}>{board.name}</option>
        {/each}
      </select>

      <button class="add-cell-btn" onclick={() => (isAddCellOpen = true)}>
        <Plus size={20} />
        <span>ADICIONAR NOVO CARTÃO</span>
      </button>
    </div>

    <div class="config-card">
      <div class="title-with-icon">
        <LayoutGrid size={18} />
        <span class="card-section-title">Densidade da Grade:</span>
      </div>
      <p class="density-hint">Ajuste o tamanho dos botões para o nível motor do aluno:</p>
      <div class="grid-presets">
        <button
          class="preset-btn {$currentBoard?.gridCols === 2 && $currentBoard?.gridRows === 2 ? 'active' : ''}"
          onclick={() => handleGridChange(2, 2)}
        >
          2 × 2 (Grande)
        </button>
        <button
          class="preset-btn {$currentBoard?.gridCols === 3 && $currentBoard?.gridRows === 3 ? 'active' : ''}"
          onclick={() => handleGridChange(3, 3)}
        >
          3 × 3 (Médio)
        </button>
        <button
          class="preset-btn {$currentBoard?.gridCols === 4 && $currentBoard?.gridRows === 3 ? 'active' : ''}"
          onclick={() => handleGridChange(4, 3)}
        >
          4 × 3 (Padrão)
        </button>
      </div>
    </div>
  </aside>

  <!-- Painel Direito: Grid Ampla de Cartões Cadastrados -->
  <section class="cards-preview-panel">
    <div class="panel-header">
      <h3 class="panel-title">CARTÕES CADASTRADOS ({$boardCells.length})</h3>
      <span class="panel-sub">Visualização fiel das células desta prancha:</span>
    </div>

    <div class="cells-grid-scroll">
      {#each $boardCells as cell (cell.id)}
        {@const style = cell.customStyle || FITZGERALD_COLORS[cell.category] || FITZGERALD_COLORS.MISC}
        <div
          class="mini-cell-card"
          style="background-color: {style.bg}; border-color: {style.border}; color: {style.text};"
        >
          <button
            class="del-cell-btn"
            onclick={() => handleDeleteCell(cell.id)}
            aria-label="Excluir cartão {cell.label}"
          >
            <Trash2 size={16} />
          </button>

          <div class="mini-icon">
            <IconRenderer emoji={cell.emoji} iconName={cell.iconName} iconSvg={cell.iconSvg} size={38} />
          </div>

          <span class="mini-cell-label">{cell.label}</span>
        </div>
      {/each}
    </div>
  </section>
</div>

<AddCellModal isOpen={isAddCellOpen} onClose={() => (isAddCellOpen = false)} />

<style>
  .boards-tab-layout {
    display: grid;
    grid-template-columns: 340px 1fr;
    gap: 16px;
    width: 100%;
    max-width: 100%;
    height: 100%;
    flex: 1;
    min-height: 0;
    box-sizing: border-box;
  }

  @media (max-width: 900px) {
    .boards-tab-layout {
      grid-template-columns: 1fr;
      max-width: 100%;
    }
  }

  .sidebar-panel {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .config-card {
    background: #FFFFFF;
    border: 2px solid #E2E8F0;
    border-radius: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .card-section-title {
    font-size: 0.95rem;
    font-weight: 800;
    color: #0F172A;
  }

  .title-with-icon {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #0F172A;
  }

  .density-hint {
    font-size: 0.8rem;
    color: #64748B;
    margin: 0;
  }

  .board-dropdown {
    width: 100%;
    height: 44px;
    border: 2px solid #CBD5E1;
    border-radius: 10px;
    padding: 0 12px;
    font-size: 0.95rem;
    font-weight: 700;
    color: #0F172A;
  }

  .add-cell-btn {
    width: 100%;
    height: 44px;
    background: #2563EB;
    color: #FFFFFF;
    border: none;
    border-radius: 10px;
    font-size: 0.88rem;
    font-weight: 900;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .add-cell-btn:hover {
    background: #1D4ED8;
  }

  .grid-presets {
    display: flex;
    gap: 8px;
  }

  .preset-btn {
    flex: 1;
    padding: 10px 6px;
    background: #F1F5F9;
    border: 2px solid #E2E8F0;
    border-radius: 8px;
    font-size: 0.82rem;
    font-weight: 800;
    color: #334155;
    cursor: pointer;
    text-align: center;
  }

  .preset-btn.active {
    background: #2563EB;
    color: #FFFFFF;
    border-color: #1D4ED8;
  }

  .cards-preview-panel {
    background: #FFFFFF;
    border: 2px solid #E2E8F0;
    border-radius: 14px;
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    height: 100%;
    min-height: 0;
    box-sizing: border-box;
  }

  .panel-header {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex-shrink: 0;
  }

  .panel-title {
    font-size: 1.1rem;
    font-weight: 900;
    color: #0F172A;
    margin: 0;
    letter-spacing: 0.5px;
  }

  .panel-sub {
    font-size: 0.85rem;
    color: #64748B;
  }

  .cells-grid-scroll {
    flex: 1;
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 12px;
    padding: 4px 6px 12px 0;
    align-content: start;
  }

  .mini-cell-card {
    border-width: 3px;
    border-style: solid;
    border-radius: 12px;
    padding: 10px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    position: relative;
    min-height: 100px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  }

  .mini-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mini-cell-label {
    font-size: 0.85rem;
    font-weight: 900;
    text-transform: uppercase;
    text-align: center;
    line-height: 1.2;
  }

  .del-cell-btn {
    position: absolute;
    top: 4px;
    right: 4px;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: #EF4444;
    border-radius: 6px;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .del-cell-btn:hover {
    background: #FEE2E2;
  }

  @media (max-width: 640px) {
    .config-card {
      padding: 12px;
      gap: 10px;
    }

    .card-section-title {
      font-size: 0.88rem;
    }

    .board-dropdown {
      height: 40px;
      font-size: 0.88rem;
    }

    .add-cell-btn {
      height: 40px;
      font-size: 0.82rem;
    }

    .preset-btn {
      padding: 8px 4px;
      font-size: 0.74rem;
    }

    .cards-preview-panel {
      padding: 12px;
      gap: 10px;
    }

    .panel-title {
      font-size: 0.95rem;
    }

    .panel-sub {
      font-size: 0.76rem;
    }

    .cells-grid-scroll {
      grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
      gap: 8px;
    }

    .mini-cell-card {
      min-height: 76px;
      padding: 6px 4px;
      border-width: 2.5px;
      border-radius: 10px;
    }

    .mini-cell-label {
      font-size: 0.72rem;
    }
  }
</style>
