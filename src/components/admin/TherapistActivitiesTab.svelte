<script lang="ts">
  import {
    activityBank,
    studentCategories,
    getEnabledByCategory
  } from '../../stores/activity-bank.store'
  import {
    selectedCategoryId,
    clearSelectedCategory
  } from '../../stores/activity.store'
  import { soundEffects } from '../../services/sound-effects.service'
  import ActivityCategoryCard from '../activities/ActivityCategoryCard.svelte'
  import ActivityCard from '../activities/ActivityCard.svelte'
  import { ArrowLeft, BookOpen } from '@lucide/svelte'
  import EvidenceModal from '../activities/evidence/EvidenceModal.svelte'
  import { resolveActivityEvidence } from '../../constants/curriculum/evidence-references.constants'
  import type {
    ActivityCategory,
    ActivityDefinition,
    ActivityLevelConfig,
    ScientificReference
  } from '../../types/activity.types'

  let isEvidenceOpen = $state(false)
  let activeEvidenceRef = $state<ScientificReference | null>(null)
  let evidenceContextTitle = $state('')

  function openCategoryEvidence(cat: ActivityCategory) {
    activeEvidenceRef = resolveActivityEvidence(cat.defaultEvidenceId, cat.id)
    evidenceContextTitle = cat.title
    isEvidenceOpen = true
  }

  function openLevelEvidence(lvl: ActivityLevelConfig | ActivityDefinition) {
    const evidenceId = 'evidenceId' in lvl ? lvl.evidenceId : undefined
    activeEvidenceRef = resolveActivityEvidence(evidenceId, lvl.categoryId)
    evidenceContextTitle = lvl.title
    isEvidenceOpen = true
  }

  function openAllEvidence() {
    activeEvidenceRef = null
    evidenceContextTitle = 'Diretrizes e Estudos Científicos do Banco'
    isEvidenceOpen = true
  }

  let activeCategory = $derived(
    $selectedCategoryId
      ? $studentCategories.find((c) => c.id === $selectedCategoryId) ?? null
      : null
  )

  let activeLevels = $derived(
    $selectedCategoryId
      ? getEnabledByCategory($activityBank, $selectedCategoryId)
      : []
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
        <ActivityCard {level} onShowEvidence={openLevelEvidence} />
      {/each}
    </div>
  {:else}
    <!-- Catálogo de Pastas / Categorias Pedagógicas -->
    <div class="tab-header">
      <div class="tab-header-top">
        <h2 class="tab-title">CATEGORIAS DE EXERCÍCIOS PEDAGÓGICOS</h2>
        <button type="button" class="evidence-library-btn" onclick={openAllEvidence}>
          <BookOpen size={17} strokeWidth={2.4} />
          <span>Estudos &amp; Diretrizes</span>
        </button>
      </div>
      <p class="tab-subtitle">
        Selecione uma pasta temática para iniciar atividades de estimulação cognitiva com o aluno:
      </p>
    </div>

    {#if $studentCategories.length === 0}
      <div class="empty-catalog">
        <p class="empty-catalog-title">Nenhuma atividade habilitada para o aluno.</p>
        <p class="empty-catalog-sub">
          Acesse <strong>Painel → Banco de Atividades</strong> para selecionar ou criar exercícios.
        </p>
      </div>
    {:else}
      <div class="categories-grid">
        {#each $studentCategories as category (category.id)}
          <ActivityCategoryCard {category} onShowEvidence={openCategoryEvidence} />
        {/each}
      </div>
    {/if}
  {/if}
</div>

<EvidenceModal
  isOpen={isEvidenceOpen}
  reference={activeEvidenceRef}
  contextTitle={evidenceContextTitle}
  onClose={() => (isEvidenceOpen = false)}
/>

<style>
  .activities-tab {
    display: flex;
    flex-direction: column;
    gap: 18px;
    width: 100%;
    min-height: 100%;
    box-sizing: border-box;
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
    border: 2.5px solid #CBD5E1;
    border-radius: 12px;
    padding: 10px 18px;
    font-size: 1.05rem;
    font-weight: 900;
    color: #1E293B;
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
    gap: 6px;
  }

  .title-row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .category-emoji-badge {
    font-size: 2rem;
    line-height: 1;
  }

  .count-badge {
    font-size: 0.9rem;
    font-weight: 900;
    padding: 5px 12px;
    border-radius: 14px;
    border: 1.5px solid;
    letter-spacing: 0.5px;
  }

  .tab-header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 4px;
  }

  .evidence-library-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: #EFF6FF;
    color: #1D4ED8;
    border: 2px solid #BFDBFE;
    border-radius: 12px;
    padding: 7px 14px;
    font-size: 0.84rem;
    font-weight: 800;
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease;
    white-space: nowrap;
  }

  .evidence-library-btn:hover {
    background: #DBEAFE;
    border-color: #93C5FD;
  }

  .tab-title {
    font-size: 1.45rem;
    font-weight: 900;
    text-transform: uppercase;
    color: #0F172A;
    margin: 0;
    letter-spacing: 0.5px;
  }

  .tab-subtitle {
    font-size: 1.12rem;
    font-weight: 600;
    color: #475569;
    margin: 0;
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
    width: 100%;
    align-items: stretch;
    box-sizing: border-box;
  }

  .levels-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
    width: 100%;
    align-items: stretch;
    box-sizing: border-box;
  }

  .back-btn-short {
    display: none;
  }

  @media (max-width: 1024px) {
    .categories-grid,
    .levels-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
    }
  }

  @media (max-width: 640px) {
    .categories-grid,
    .levels-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }
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

  .empty-catalog {
    background: #FFFFFF;
    border: 2px dashed #CBD5E1;
    border-radius: 16px;
    padding: 32px 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .empty-catalog-title {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 900;
    color: #0F172A;
  }

  .empty-catalog-sub {
    margin: 0;
    font-size: 0.9rem;
    color: #64748B;
  }
</style>
