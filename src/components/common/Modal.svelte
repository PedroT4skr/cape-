<script lang="ts">
  import type { Snippet } from 'svelte'
  import { X } from '@lucide/svelte'

  interface Props {
    isOpen: boolean
    title: string
    onClose: () => void
    maxWidth?: string
    children?: Snippet
  }

  let { isOpen, title, onClose, maxWidth = '580px', children }: Props = $props()

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isOpen) {
      onClose()
    }
  }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
  <div class="modal-backdrop" onclick={handleBackdropClick} role="presentation">
    <div
      class="modal-card"
      style="max-width: {maxWidth};"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <header class="modal-header">
        <h2 class="modal-title">{title}</h2>
        <button class="close-btn" onclick={onClose} aria-label="Fechar janela">
          <X size={24} />
        </button>
      </header>

      <div class="modal-body">
        {#if children}
          {@render children()}
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(15, 23, 42, 0.65);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 16px;
  }

  .modal-card {
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 580px;
    max-height: 90vh;
    max-height: 92dvh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid #E2E8F0;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    background: #F8FAFC;
    border-bottom: 1px solid #E2E8F0;
  }

  .modal-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: #0F172A;
  }

  .close-btn {
    background: transparent;
    border: none;
    color: #64748B;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close-btn:hover {
    background: #E2E8F0;
    color: #0F172A;
  }

  .modal-body {
    padding: 20px;
    overflow-y: auto;
  }

  @media (max-width: 640px) {
    .modal-backdrop {
      padding: 8px;
    }

    .modal-card {
      border-radius: 14px;
      max-height: 96dvh;
    }

    .modal-header {
      padding: 10px 14px;
    }

    .modal-title {
      font-size: 0.95rem;
    }

    .close-btn {
      padding: 4px;
    }

    .modal-body {
      padding: 12px;
    }
  }
</style>
