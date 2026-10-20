<script lang="ts">
  import {
    ACTIVITY_CATEGORIES,
    getLevelsByCategoryId,
    getCategoryById
  } from '../../constants/activity-curriculum.constants'
  import {
    selectedCategoryId,
    clearSelectedCategory
  } from '../../stores/activity.store'
  import { soundEffects } from '../../services/sound-effects.service'
  import ActivityCategoryCard from '../activities/ActivityCategoryCard.svelte'
  import ActivityCard from '../activities/ActivityCard.svelte'
  import { ArrowLeft } from '@lucide/svelte'

  let activeCategory = $derived(
    $selectedCategoryId ? getCategoryById($selectedCategoryId) : null
  )

  let activeLevels = $derived(
    $selectedCategoryId ? getLevelsByCategoryId($selectedCategoryId) : []
  )

  function handleBack() {
    soundEffects.playTapSound()
    clearSelectedCategory()
  }
</script>

<div class="activities-tab">
  {#if activeCategory}
    <!-- Visualização Interna da Pasta / Categoria Selecionada -->
    <div class="category-header">
      <button class="back-btn" onclick={handleBack}>
        <ArrowLeft size={20} strokeWidth={2.4} />
        <span class="back-btn-full">VOLTAR PARA CATEGORIAS</span>
        <span class="back-btn-short">VOLTAR</span>
      </button>

      <div class="category-title-wrap">
        <div class="title-row">
          <span class="category-emoji-badge">{activeCategory.emoji}</span>
          <h2 class="tab-title">{activeCategory.title}</h2>
          <span class="count-badge" style="background: {activeCategory.color}15; color: {activeCategory.color}; border-color: {activeCategory.color}40;">
            {activeLevels.length} ATIVIDADES DISPONÍVEIS
          </span>
        </div>
        <p class="tab-subtitle">{activeCategory.subtitle}</p>
      </div>
    </div>

    <div class="levels-grid">
      {#each activeLevels as level (level.id)}
        <ActivityCard {level} />
      {/each}
    </div>
  {:else}
    <!-- Catálogo de Pastas / Categorias Pedagógicas -->
    <div class="tab-header">
      <h2 class="tab-title">CATEGORIAS DE EXERCÍCIOS PEDAGÓGICOS</h2>
      <p class="tab-subtitle">
        Selecione uma pasta temática para iniciar atividades de estimulação cognitiva com o aluno:
      </p>
    </div>

    <div class="categories-grid">
      {#each ACTIVITY_CATEGORIES as category (category.id)}
        <ActivityCategoryCard {category} />
      {/each}
    </div>
  {/if}
</div>

<style>
  .activities-tab {
    display: flex;
    flex-direction: column;
    gap: 18px;
    width: 100%;
    height: 100%;
    flex: 1;
  }

  .tab-header {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex-shrink: 0;
  }

  .category-header {
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex-shrink: 0;
  }

  .back-btn {
    align-self: flex-start;
    background: #F1F5F9;
    border: 2px solid #CBD5E1;
    border-radius: 12px;
    padding: 8px 16px;
    font-size: 0.9rem;
    font-weight: 900;
    color: #334155;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .back-btn:hover {
    background: #E2E8F0;
    border-color: #94A3B8;
  }

  .category-title-wrap {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .title-row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .category-emoji-badge {
    font-size: 1.8rem;
    line-height: 1;
  }

  .count-badge {
    font-size: 0.78rem;
    font-weight: 900;
    padding: 4px 10px;
    border-radius: 14px;
    border: 1.5px solid;
    letter-spacing: 0.5px;
  }

  .tab-title {
    font-size: 1.25rem;
    font-weight: 900;
    text-transform: uppercase;
    color: #0F172A;
    margin: 0;
    letter-spacing: 0.5px;
  }

  .tab-subtitle {
    font-size: 0.95rem;
    font-weight: 600;
    color: #64748B;
    margin: 0;
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100%;
    flex: 1;
    align-items: stretch;
  }

  .levels-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100%;
    flex: 1;
    align-items: stretch;
  }

  .back-btn-short {
    display: none;
  }

  @media (max-width: 960px) {
    .categories-grid,
    .levels-grid {
      grid-template-columns: 1fr;
      gap: 14px;
    }
  }

  @media (max-width: 640px) {
    .back-btn-full {
      display: none;
    }

    .back-btn-short {
      display: inline;
    }

    .tab-title {
      font-size: 1rem;
    }

    .tab-subtitle {
      font-size: 0.82rem;
    }

    .back-btn {
      padding: 6px 12px;
      font-size: 0.78rem;
      white-space: nowrap;
    }

    .category-emoji-badge {
      font-size: 1.4rem;
    }

    .count-badge {
      font-size: 0.72rem;
      padding: 3px 8px;
    }
  }
</style>
