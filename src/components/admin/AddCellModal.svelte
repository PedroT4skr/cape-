<script lang="ts">
  import Modal from '../common/Modal.svelte'
  import EmojiPicker from './EmojiPicker.svelte'
  import type { Cell } from '../../types/board.types'
  import type { FitzgeraldCategory } from '../../types/fitzgerald.types'
  import { FITZGERALD_COLORS } from '../../constants/fitzgerald.constants'
  import { currentBoard, loadBoard, allBoards } from '../../stores/board.store'
  import { saveCell } from '../../db/cells.repository'
  import { searchArasaac, type ArasaacSearchResult } from '../../services/arasaac.service'
  import { Search, Loader2, Check, Folder } from '@lucide/svelte'

  interface Props {
    isOpen: boolean
    onClose: () => void
  }

  let { isOpen, onClose }: Props = $props()

  let label = $state('')
  let emoji = $state('🍎')
  let category = $state<FitzgeraldCategory>('NOUN')
  let audioText = $state('')
  let iconUrl = $state('')
  let targetBoardId = $state<string | null>(null)

  let searchTerm = $state('')
  let isSearching = $state(false)
  let searchResults = $state<ArasaacSearchResult[]>([])

  let selectedStyle = $derived(FITZGERALD_COLORS[category] || FITZGERALD_COLORS.MISC)

  async function handleSearch() {
    if (!searchTerm.trim()) return
    isSearching = true
    try {
      searchResults = await searchArasaac(searchTerm)
    } finally {
      isSearching = false
    }
  }

  function selectArasaacResult(res: ArasaacSearchResult) {
    label = res.keyword
    category = res.suggestedCategory
    iconUrl = res.imageUrl
    emoji = ''
  }

  async function handleSave() {
    if (!label.trim() || !$currentBoard) return

    const newCell: Cell = {
      id: `cell-${Date.now()}`,
      boardId: $currentBoard.id,
      position: Date.now(),
      label: label.trim().toUpperCase(),
      category,
      emoji: emoji.trim() || undefined,
      audioText: audioText.trim() || label.trim(),
      iconSvg: iconUrl ? undefined : undefined,
      targetBoardId: targetBoardId || null
    }

    await saveCell(newCell)
    await loadBoard($currentBoard.id)

    // Reset
    label = ''
    audioText = ''
    emoji = '🍎'
    iconUrl = ''
    searchTerm = ''
    searchResults = []
    targetBoardId = null
    onClose()
  }
</script>

<Modal {isOpen} title="Criar Novo Cartão de Comunicação" {onClose} maxWidth="880px">
  <div class="add-cell-modal-grid">
    <!-- Coluna Esquerda: Informações e Categoria -->
    <div class="form-column">
      <div class="field-group">
        <label for="cell-label" class="field-label">Palavra / Rótulo do Cartão:</label>
        <input
          id="cell-label"
          type="text"
          class="text-input bold-input"
          bind:value={label}
          placeholder="Ex: SUCO DE UVA"
        />
      </div>

      <div class="field-group">
        <label for="cell-audio" class="field-label">Pronúncia Vocal (Opcional):</label>
        <input
          id="cell-audio"
          type="text"
          class="text-input"
          bind:value={audioText}
          placeholder="Deixe em branco para pronunciar o rótulo"
        />
      </div>

      <div class="field-group">
        <span class="field-label">Categoria Gramatical (Chave de Fitzgerald):</span>
        <div class="categories-grid">
          {#each (['PERSON', 'VERB', 'NOUN', 'DESCRIPTIVE', 'SOCIAL', 'MISC'] as FitzgeraldCategory[]) as cat}
            {@const col = FITZGERALD_COLORS[cat]}
            <button
              type="button"
              class="cat-btn {category === cat ? 'selected' : ''}"
              style="background-color: {col.bg}; border-color: {col.border}; color: {col.text};"
              onclick={() => (category = cat)}
            >
              {col.label}
            </button>
          {/each}
        </div>
      </div>

      <div class="field-group">
        <label for="cell-target" class="field-label">Tipo de Ação do Cartão:</label>
        <select id="cell-target" class="text-input select-input" bind:value={targetBoardId}>
          <option value={null}>Cartão de Fala Normal (Adiciona à Frase)</option>
          {#each $allBoards as b}
            {#if b.id !== $currentBoard?.id}
              <option value={b.id}>Abrir Sub-Prancha: {b.name}</option>
            {/if}
          {/each}
        </select>
      </div>

      <!-- Busca ARASAAC Compacta -->
      <div class="arasaac-accordion">
        <span class="accordion-title">Buscar pictograma alternativo no ARASAAC:</span>
        <div class="search-row">
          <input
            type="text"
            class="text-input search-field"
            bind:value={searchTerm}
            placeholder="Ex: bola, água..."
            onkeydown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button class="search-btn" disabled={isSearching} onclick={handleSearch}>
            {#if isSearching}
              <Loader2 size={16} class="spin" />
            {:else}
              <Search size={16} />
            {/if}
            <span>Buscar</span>
          </button>
        </div>

        {#if searchResults.length > 0}
          <div class="results-grid">
            {#each searchResults as res}
              <button
                type="button"
                class="result-item"
                onclick={() => selectArasaacResult(res)}
              >
                <img src={res.imageUrl} alt={res.keyword} class="result-img" />
                <span class="result-name">{res.keyword}</span>
              </button>
            {/each}
          </div>
        {/if}
      </div>
    </div>

    <!-- Coluna Direita: Preview Visual e Seletor de Emojis -->
    <div class="visual-column">
      <!-- Prévia Real do Cartão -->
      <div class="preview-box">
        <span class="preview-title">PRÉ-VISUALIZAÇÃO DO CARTÃO:</span>
        <div
          class="card-preview-renderer"
          style="background-color: {selectedStyle.bg}; border-color: {selectedStyle.border}; color: {selectedStyle.text};"
        >
          {#if targetBoardId}
            <span class="folder-badge"><Folder size={14} /> PASTA</span>
          {/if}
          {#if iconUrl}
            <img src={iconUrl} alt="preview" class="preview-img" />
          {:else}
            <span class="preview-emoji">{emoji || '⭐'}</span>
          {/if}
          <span class="preview-label">{label.trim().toUpperCase() || 'NOVO CARTÃO'}</span>
        </div>
      </div>

      <!-- Seletor de Emojis Completo -->
      <div class="picker-section">
        <span class="field-label">Selecione o Emoji (Centenas de Opções):</span>
        <EmojiPicker selectedEmoji={emoji} onSelect={(em) => { emoji = em; iconUrl = ''; }} />
      </div>
    </div>
  </div>

  <!-- Ações no Rodapé -->
  <div class="modal-footer">
    <button class="cancel-btn" onclick={onClose}>Cancelar</button>
    <button class="save-btn" disabled={!label.trim()} onclick={handleSave}>
      <Check size={18} strokeWidth={2.4} />
      <span>SALVAR CARTÃO</span>
    </button>
  </div>
</Modal>

<style>
  .add-cell-modal-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: start;
  }

  @media (max-width: 760px) {
    .add-cell-modal-grid {
      grid-template-columns: 1fr;
    }
  }

  .form-column {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .field-label {
    font-size: 0.86rem;
    font-weight: 800;
    color: #334155;
  }

  .text-input {
    height: 42px;
    border: 2px solid #CBD5E1;
    border-radius: 10px;
    padding: 0 12px;
    font-size: 0.95rem;
    color: #0F172A;
    background: #FFFFFF;
    outline: none;
  }

  .text-input:focus {
    border-color: #2563EB;
  }

  .bold-input {
    font-weight: 800;
    text-transform: uppercase;
  }

  .select-input {
    cursor: pointer;
    font-weight: 600;
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .cat-btn {
    padding: 8px 10px;
    border-radius: 8px;
    border: 2.5px solid;
    font-size: 0.8rem;
    font-weight: 800;
    text-align: center;
    cursor: pointer;
    transition: transform 0.1s ease;
  }

  .cat-btn.selected {
    box-shadow: 0 0 0 3px #0F172A;
    transform: scale(0.98);
  }

  .arasaac-accordion {
    background: #F8FAFC;
    border: 1.5px solid #E2E8F0;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .accordion-title {
    font-size: 0.78rem;
    font-weight: 700;
    color: #64748B;
  }

  .search-row {
    display: flex;
    gap: 8px;
  }

  .search-field {
    flex: 1;
    height: 36px;
    font-size: 0.85rem;
  }

  .search-btn {
    background: #0284C7;
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
    padding: 0 12px;
    font-size: 0.85rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }

  .results-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
    max-height: 100px;
    overflow-y: auto;
  }

  .result-item {
    background: #FFFFFF;
    border: 1px solid #CBD5E1;
    border-radius: 6px;
    padding: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }

  .result-img {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }

  .result-name {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .visual-column {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .preview-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    background: #F8FAFC;
    border: 2px dashed #CBD5E1;
    border-radius: 14px;
    padding: 14px;
  }

  .preview-title {
    font-size: 0.78rem;
    font-weight: 800;
    color: #64748B;
    letter-spacing: 0.5px;
  }

  .card-preview-renderer {
    width: 140px;
    height: 130px;
    border-width: 4px;
    border-style: solid;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    position: relative;
    box-sizing: border-box;
  }

  .preview-emoji {
    font-size: 3.2rem;
    line-height: 1;
  }

  .preview-img {
    width: 54px;
    height: 54px;
    object-fit: contain;
  }

  .preview-label {
    font-size: 0.95rem;
    font-weight: 900;
    text-align: center;
    line-height: 1.1;
  }

  .folder-badge {
    position: absolute;
    top: 6px;
    left: 6px;
    font-size: 0.65rem;
    font-weight: 900;
    background: rgba(0, 0, 0, 0.15);
    padding: 2px 5px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .picker-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 20px;
    padding-top: 14px;
    border-top: 1px solid #E2E8F0;
  }

  .cancel-btn {
    background: #F1F5F9;
    border: 1.5px solid #CBD5E1;
    padding: 10px 18px;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 800;
    color: #475569;
    cursor: pointer;
  }

  .save-btn {
    background: #16A34A;
    color: #FFFFFF;
    border: none;
    padding: 10px 22px;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 900;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .save-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .save-btn:not(:disabled):hover {
    background: #15803D;
  }

  @media (max-width: 640px) {
    .modal-footer {
      gap: 8px;
    }

    .cancel-btn,
    .save-btn {
      flex: 1;
      justify-content: center;
      padding: 9px 12px;
      font-size: 0.82rem;
    }

    .card-preview-renderer {
      width: 118px;
      height: 108px;
    }

    .cat-btn {
      padding: 6px 6px;
      font-size: 0.74rem;
    }
  }
</style>
