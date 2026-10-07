<script lang="ts">
  import {
    sentenceItems,
    activeHighlightIndex
  } from '../../stores/sentence.store'
  import SentenceItem from './SentenceItem.svelte'
  import SentenceControls from './SentenceControls.svelte'

  let listContainer: HTMLDivElement | null = $state(null)

  // Auto-scroll para a direita quando novas palavras forem adicionadas
  $effect(() => {
    const count = $sentenceItems.length
    if (count > 0 && listContainer) {
      setTimeout(() => {
        if (listContainer) {
          listContainer.scrollTo({
            left: listContainer.scrollWidth,
            behavior: 'smooth'
          })
        }
      }, 50)
    }
  })
</script>

<section class="sentence-bar-wrapper" aria-label="Barra de construção de frases">
  <div class="items-scroll-area" bind:this={listContainer}>
    {#if $sentenceItems.length === 0}
      <div class="empty-state">
        <span class="empty-text">Toque nos cartões abaixo para formar uma frase</span>
      </div>
    {:else}
      {#each $sentenceItems as item, idx (item.id)}
        <SentenceItem
          {item}
          isHighlighted={$activeHighlightIndex === idx}
        />
      {/each}
    {/if}
  </div>

  <SentenceControls />
</section>

<style>
  .sentence-bar-wrapper {
    height: 124px;
    background: #FFFFFF;
    border-bottom: 3px solid #E2E8F0;
    display: flex;
    align-items: center;
    padding: 0 16px;
    gap: 16px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
    flex-shrink: 0;
  }

  .items-scroll-area {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    padding: 8px 0;
  }

  .empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 94px;
    background: #F8FAFC;
    border: 3px dashed #CBD5E1;
    border-radius: 16px;
  }

  .empty-text {
    font-size: 1.15rem;
    color: #64748B;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    text-align: center;
  }

  @media (max-width: 640px) {
    .sentence-bar-wrapper {
      height: 86px;
      padding: 0 8px;
      gap: 8px;
    }

    .items-scroll-area {
      gap: 6px;
      padding: 4px 0;
    }

    .empty-state {
      height: 68px;
      border-radius: 12px;
      border-width: 2px;
    }

    .empty-text {
      font-size: 0.76rem;
      letter-spacing: 0.2px;
      padding: 0 6px;
    }
  }

  @media (max-height: 500px) and (orientation: landscape) {
    .sentence-bar-wrapper {
      height: 72px;
      padding: 0 6px;
      gap: 6px;
    }

    .empty-state {
      height: 56px;
    }

    .empty-text {
      font-size: 0.72rem;
    }
  }
</style>
