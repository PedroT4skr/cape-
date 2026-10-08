<script lang="ts">
  import { EMOJI_CATALOG, type EmojiCategory } from '../../constants/emoji-catalog.constants'
  import { Search } from '@lucide/svelte'

  interface Props {
    selectedEmoji: string
    onSelect: (emoji: string) => void
  }

  const { selectedEmoji, onSelect }: Props = $props()

  let activeCatId = $state<string>('people')
  let searchQuery = $state<string>('')

  let currentCategory = $derived(
    EMOJI_CATALOG.find((c) => c.id === activeCatId) || EMOJI_CATALOG[0]
  )

  let displayedEmojis = $derived.by(() => {
    const q = searchQuery.trim()
    if (!q) {
      return currentCategory.emojis
    }
    // Se digitou algo na busca, filtra em todo o catálogo
    const all = EMOJI_CATALOG.flatMap((c) => c.emojis)
    return all.filter((em) => em.includes(q))
  })
</script>

<div class="emoji-picker-container">
  <!-- Barra de Busca de Emojis -->
  <div class="search-bar">
    <Search size={16} color="#64748B" />
    <input
      type="text"
      class="search-input"
      bind:value={searchQuery}
      placeholder="Filtrar ou colar emoji..."
    />
  </div>

  <!-- Barra de Categorias -->
  {#if !searchQuery.trim()}
    <div class="category-tabs" role="tablist">
      {#each EMOJI_CATALOG as cat}
        <button
          type="button"
          class="cat-tab-btn {activeCatId === cat.id ? 'active' : ''}"
          onclick={() => (activeCatId = cat.id)}
          title={cat.name}
        >
          <span class="cat-icon">{cat.icon}</span>
        </button>
      {/each}
    </div>
  {/if}

  <!-- Grade de Emojis Rolável -->
  <div class="emojis-grid" role="grid">
    {#each displayedEmojis as em}
      <button
        type="button"
        class="emoji-cell {selectedEmoji === em ? 'selected' : ''}"
        onclick={() => onSelect(em)}
      >
        {em}
      </button>
    {/each}
  </div>
</div>

<style>
  .emoji-picker-container {
    background: #FFFFFF;
    border: 2px solid #E2E8F0;
    border-radius: 12px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    box-sizing: border-box;
  }

  .search-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #F8FAFC;
    border: 1.5px solid #CBD5E1;
    border-radius: 8px;
    padding: 6px 10px;
  }

  .search-input {
    border: none;
    background: transparent;
    outline: none;
    width: 100%;
    font-size: 0.85rem;
    font-weight: 600;
    color: #0F172A;
  }

  .category-tabs {
    display: flex;
    gap: 4px;
    background: #F1F5F9;
    padding: 3px;
    border-radius: 8px;
    overflow-x: auto;
  }

  .cat-tab-btn {
    flex: 1;
    min-width: 36px;
    height: 32px;
    border: none;
    background: transparent;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.1s ease;
  }

  .cat-tab-btn.active {
    background: #FFFFFF;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .cat-icon {
    font-size: 1.15rem;
    line-height: 1;
  }

  .emojis-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(38px, 1fr));
    gap: 4px;
    max-height: 190px;
    overflow-y: auto;
    padding: 4px 2px;
  }

  .emoji-cell {
    height: 40px;
    border: 1px solid transparent;
    border-radius: 8px;
    background: transparent;
    font-size: 1.45rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.1s ease, background 0.1s ease;
  }

  .emoji-cell:hover {
    background: #F1F5F9;
    transform: scale(1.15);
  }

  .emoji-cell.selected {
    background: #EFF6FF;
    border-color: #3B82F6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }
</style>
