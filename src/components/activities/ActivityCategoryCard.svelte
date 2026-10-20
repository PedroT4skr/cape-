<script lang="ts">
  import type { ActivityCategory } from '../../types/activity.types'
  import { selectCategory } from '../../stores/activity.store'
  import { soundEffects } from '../../services/sound-effects.service'
  import { Folder, FolderOpen, Lock } from '@lucide/svelte'

  interface Props {
    category: ActivityCategory
  }

  const { category }: Props = $props()

  function handleOpen() {
    if (!category.isAvailable) return
    soundEffects.playTapSound()
    selectCategory(category.id)
  }
</script>

<div
  class="category-card {!category.isAvailable ? 'is-disabled' : ''}"
  style="border-top: 6px solid {category.color};"
  onclick={handleOpen}
  role="button"
  tabindex={category.isAvailable ? 0 : -1}
  onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpen()}
>
  <div class="card-header">
    <div class="icon-bubble" style="background: {category.color}15; border-color: {category.color}40;">
      <span class="category-emoji">{category.emoji}</span>
    </div>
    <span
      class="badge-pill {category.isAvailable ? 'available' : 'coming-soon'}"
      style={category.isAvailable ? `background: ${category.color}15; color: ${category.color}; border-color: ${category.color}40;` : ''}
    >
      {category.countLabel}
    </span>
  </div>

  <div class="card-info">
    <h3 class="category-title">{category.title}</h3>
    <p class="category-subtitle">{category.subtitle}</p>
  </div>

  <button
    class="action-btn {category.isAvailable ? 'active-btn' : 'disabled-btn'}"
    style={category.isAvailable ? `background: ${category.color};` : ''}
    disabled={!category.isAvailable}
    tabindex="-1"
  >
    {#if category.isAvailable}
      <FolderOpen size={20} strokeWidth={2.4} />
      <span>ABRIR PASTA</span>
    {:else}
      <Lock size={18} strokeWidth={2.2} />
      <span>EM BREVE</span>
    {/if}
  </button>
</div>

<style>
  .category-card {
    background: #FFFFFF;
    border: 2px solid #E2E8F0;
    border-radius: 18px;
    padding: 22px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
    min-height: 250px;
  }

  .category-card:hover:not(.is-disabled) {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    border-color: #CBD5E1;
  }

  .category-card.is-disabled {
    cursor: not-allowed;
    opacity: 0.75;
    background: #F8FAFC;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .icon-bubble {
    width: 72px;
    height: 72px;
    border-radius: 20px;
    border: 2px solid;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .category-emoji {
    font-size: 2.6rem;
    line-height: 1;
  }

  .badge-pill {
    font-size: 0.8rem;
    font-weight: 900;
    padding: 6px 12px;
    border-radius: 20px;
    letter-spacing: 0.5px;
    border: 1.5px solid;
    text-transform: uppercase;
  }

  .badge-pill.coming-soon {
    background: #F1F5F9;
    color: #64748B;
    border-color: #CBD5E1;
  }

  .card-info {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
  }

  .category-title {
    font-size: 1.2rem;
    font-weight: 900;
    text-transform: uppercase;
    color: #0F172A;
    margin: 0;
    letter-spacing: 0.5px;
    line-height: 1.25;
  }

  .category-subtitle {
    font-size: 0.92rem;
    font-weight: 600;
    color: #64748B;
    margin: 0;
    line-height: 1.35;
  }

  .action-btn {
    width: 100%;
    min-height: 48px;
    border: none;
    border-radius: 12px;
    padding: 10px 16px;
    font-size: 0.95rem;
    font-weight: 900;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-sizing: border-box;
  }

  .active-btn {
    color: #FFFFFF;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  }

  .disabled-btn {
    background: #E2E8F0;
    color: #64748B;
  }

  @media (max-width: 640px) {
    .category-card {
      min-height: auto;
      padding: 14px 14px;
      gap: 12px;
      border-radius: 14px;
    }

    .icon-bubble {
      width: 50px;
      height: 50px;
      border-radius: 12px;
    }

    .category-emoji {
      font-size: 1.9rem;
    }

    .badge-pill {
      font-size: 0.72rem;
      padding: 4px 8px;
    }

    .category-title {
      font-size: 1.05rem;
    }

    .category-subtitle {
      font-size: 0.82rem;
    }

    .action-btn {
      min-height: 40px;
      padding: 8px 12px;
      font-size: 0.85rem;
      border-radius: 10px;
    }
  }
</style>
