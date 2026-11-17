<script lang="ts">
  import type { ActivityCategoryId, ActivityDefinition } from '../../../types/activity.types'
  import { BASE_ACTIVITY_CATEGORIES } from '../../../constants/curriculum/activity-categories.constants'
  import {
    activityBank,
    enabledActivities,
    toggleActivityEnabledInBank,
    setAllEnabledInBank,
    duplicateActivityInBank,
    removeCustomActivityInBank,
    restoreBuiltInActivityInBank
  } from '../../../stores/activity-bank.store'
  import { startActivity } from '../../../stores/activity.store'
  import BankActivityCard from './BankActivityCard.svelte'
  import ActivityEditorModal from './ActivityEditorModal.svelte'
  import { Plus, Search, CheckSquare, Square, Sparkles } from '@lucide/svelte'

  type CategoryFilter = 'all' | ActivityCategoryId
  type StatusFilter = 'all' | 'enabled' | 'hidden' | 'custom'

  let searchQuery = $state('')
  let categoryFilter = $state<CategoryFilter>('all')
  let statusFilter = $state<StatusFilter>('all')

  let isEditorOpen = $state(false)
  let editingActivity = $state<ActivityDefinition | null>(null)

  let filteredActivities = $derived.by(() => {
    const query = searchQuery.trim().toLowerCase()
    return $activityBank.filter((act) => {
      if (categoryFilter !== 'all' && act.categoryId !== categoryFilter) return false
      if (statusFilter === 'enabled' && !act.isEnabled) return false
      if (statusFilter === 'hidden' && act.isEnabled) return false
      if (statusFilter === 'custom' && act.isBuiltIn) return false
      if (!query) return true
      return (
        act.title.toLowerCase().includes(query) ||
        act.subtitle.toLowerCase().includes(query) ||
        act.methodology.toLowerCase().includes(query) ||
        act.description.toLowerCase().includes(query) ||
        (act.tags || []).some((t) => t.toLowerCase().includes(query))
      )
    })
  })

  function handleCreateNew() {
    editingActivity = null
    isEditorOpen = true
  }

  function handleEdit(act: ActivityDefinition) {
    editingActivity = act
    isEditorOpen = true
  }

  async function handleDuplicate(act: ActivityDefinition) {
    const copy = await duplicateActivityInBank(act)
    editingActivity = copy
    isEditorOpen = true
  }

  function handlePlay(act: ActivityDefinition) {
    startActivity(act.id)
  }

  async function handleDeleteOrRestore(act: ActivityDefinition) {
    if (!act.isBuiltIn) {
      if (window.confirm(`Deseja excluir a atividade "${act.title}"?`)) {
        await removeCustomActivityInBank(act.id)
      }
    } else {
      if (window.confirm(`Restaurar "${act.title}" para o conteúdo original do CAPE?`)) {
        await restoreBuiltInActivityInBank(act.id)
      }
    }
  }
</script>

<div class="bank-tab-container">
  <!-- Barra de Resumo e Criação -->
  <header class="bank-top-header">
    <div class="header-info">
      <div class="title-with-badge">
        <Sparkles size={20} color="#2563EB" />
        <h2 class="bank-title">BANCO PSICOPEDAGÓGICO DE ATIVIDADES</h2>
      </div>
      <p class="bank-sub">
        <strong>{$activityBank.length}</strong> atividades no banco •
        <strong>{$enabledActivities.length}</strong> selecionadas para a tela do aluno.
      </p>
    </div>

    <div class="header-actions">
      <button type="button" class="batch-btn" onclick={() => setAllEnabledInBank(true)} title="Ativar todas as atividades para o aluno">
        <CheckSquare size={16} />
        <span>Ativar Todas</span>
      </button>
      <button type="button" class="batch-btn" onclick={() => setAllEnabledInBank(false)} title="Ocultar todas para selecionar manualmente">
        <Square size={16} />
        <span>Limpar Seleção</span>
      </button>
      <button type="button" class="create-btn" onclick={handleCreateNew}>
        <Plus size={18} strokeWidth={2.6} />
        <span>NOVA ATIVIDADE</span>
      </button>
    </div>
  </header>

  <!-- Barra de Busca & Filtros -->
  <section class="filters-bar">
    <div class="search-status-row">
      <div class="search-box">
        <Search size={17} color="#64748B" />
        <input
          type="search"
          class="search-input"
          placeholder="Buscar por tema, metodologia (TEACCH, PECS, CPA), tag..."
          bind:value={searchQuery}
        />
      </div>

      <div class="status-pills">
        <button type="button" class="pill-btn {statusFilter === 'all' ? 'active' : ''}" onclick={() => (statusFilter = 'all')}>
          Todas
        </button>
        <button type="button" class="pill-btn {statusFilter === 'enabled' ? 'active' : ''}" onclick={() => (statusFilter = 'enabled')}>
          Ativas ({$enabledActivities.length})
        </button>
        <button type="button" class="pill-btn {statusFilter === 'hidden' ? 'active' : ''}" onclick={() => (statusFilter = 'hidden')}>
          Ocultas ({$activityBank.length - $enabledActivities.length})
        </button>
        <button type="button" class="pill-btn {statusFilter === 'custom' ? 'active' : ''}" onclick={() => (statusFilter = 'custom')}>
          Criadas p/ Mim ({$activityBank.filter((a) => !a.isBuiltIn).length})
        </button>
      </div>
    </div>

    <div class="category-chips">
      <button
        type="button"
        class="cat-chip {categoryFilter === 'all' ? 'active' : ''}"
        onclick={() => (categoryFilter = 'all')}
      >
        Todas as Áreas ({$activityBank.length})
      </button>
      {#each BASE_ACTIVITY_CATEGORIES as cat}
        {@const count = $activityBank.filter((a) => a.categoryId === cat.id).length}
        <button
          type="button"
          class="cat-chip {categoryFilter === cat.id ? 'active' : ''}"
          style={categoryFilter === cat.id ? `background: ${cat.color}; border-color: ${cat.color}; color: #FFFFFF;` : ''}
          onclick={() => (categoryFilter = cat.id)}
        >
          <span>{cat.emoji}</span>
          <span>{cat.title}</span>
          <span class="chip-count">({count})</span>
        </button>
      {/each}
    </div>
  </section>

  <!-- Grade de Atividades -->
  {#if filteredActivities.length === 0}
    <div class="empty-state">
      <p class="empty-title">Nenhuma atividade encontrada com esses filtros.</p>
      <button type="button" class="reset-filters-btn" onclick={() => { searchQuery = ''; categoryFilter = 'all'; statusFilter = 'all'; }}>
        Limpar Filtros
      </button>
    </div>
  {:else}
    <div class="bank-grid">
      {#each filteredActivities as activity (activity.id)}
        <BankActivityCard
          {activity}
          onToggleEnabled={toggleActivityEnabledInBank}
          onEdit={handleEdit}
          onDuplicate={handleDuplicate}
          onPlay={handlePlay}
          onDeleteOrRestore={handleDeleteOrRestore}
        />
      {/each}
    </div>
  {/if}
</div>

<ActivityEditorModal
  isOpen={isEditorOpen}
  {editingActivity}
  onClose={() => (isEditorOpen = false)}
/>

<style>
  .bank-tab-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    box-sizing: border-box;
  }

  .bank-top-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    flex-wrap: wrap;
    background: #FFFFFF;
    border: 2px solid #E2E8F0;
    border-radius: 16px;
    padding: 16px;
  }

  .header-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .title-with-badge {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .bank-title {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 900;
    color: #0F172A;
  }

  .bank-sub {
    margin: 0;
    font-size: 0.86rem;
    color: #64748B;
    font-weight: 600;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .batch-btn {
    background: #F8FAFC;
    border: 1.5px solid #CBD5E1;
    color: #475569;
    border-radius: 10px;
    padding: 9px 12px;
    font-size: 0.8rem;
    font-weight: 850;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }

  .batch-btn:hover {
    background: #F1F5F9;
    color: #0F172A;
  }

  .create-btn {
    background: #2563EB;
    border: none;
    color: #FFFFFF;
    border-radius: 10px;
    padding: 10px 16px;
    font-size: 0.86rem;
    font-weight: 900;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    box-shadow: 0 3px 10px rgba(37, 99, 235, 0.25);
  }

  .create-btn:hover {
    background: #1D4ED8;
  }

  .filters-bar {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .search-status-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .search-box {
    flex: 1;
    min-width: 220px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: #FFFFFF;
    border: 2px solid #E2E8F0;
    border-radius: 12px;
    padding: 0 12px;
    height: 42px;
  }

  .search-input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 0.88rem;
    font-weight: 650;
    color: #0F172A;
    background: transparent;
  }

  .status-pills {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .pill-btn {
    background: #FFFFFF;
    border: 1.5px solid #CBD5E1;
    color: #475569;
    border-radius: 10px;
    padding: 7px 12px;
    font-size: 0.78rem;
    font-weight: 800;
    cursor: pointer;
  }

  .pill-btn.active {
    background: #0F172A;
    border-color: #0F172A;
    color: #FFFFFF;
  }

  .category-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }

  .cat-chip {
    background: #FFFFFF;
    border: 1.5px solid #CBD5E1;
    color: #334155;
    border-radius: 999px;
    padding: 6px 12px;
    font-size: 0.78rem;
    font-weight: 850;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    flex-shrink: 0;
  }

  .cat-chip.active {
    background: #2563EB;
    border-color: #2563EB;
    color: #FFFFFF;
  }

  .chip-count {
    opacity: 0.85;
  }

  .bank-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    width: 100%;
  }

  .empty-state {
    background: #FFFFFF;
    border: 2px dashed #CBD5E1;
    border-radius: 16px;
    padding: 36px 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .empty-title {
    margin: 0;
    font-size: 0.96rem;
    font-weight: 800;
    color: #475569;
  }

  .reset-filters-btn {
    background: #2563EB;
    color: #FFFFFF;
    border: none;
    border-radius: 9px;
    padding: 8px 16px;
    font-size: 0.82rem;
    font-weight: 850;
    cursor: pointer;
  }

  @media (max-width: 1040px) {
    .bank-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 640px) {
    .bank-top-header {
      padding: 12px;
    }

    .bank-title {
      font-size: 0.95rem;
    }

    .header-actions {
      width: 100%;
    }

    .create-btn {
      flex: 1;
      justify-content: center;
    }

    .bank-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .category-chips {
      flex-wrap: nowrap;
      overflow-x: auto;
      padding-bottom: 4px;
      -webkit-overflow-scrolling: touch;
    }
  }
</style>
