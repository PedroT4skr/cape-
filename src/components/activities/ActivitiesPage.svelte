<script lang="ts">
  import { closeActivitiesPage } from '../../stores/activity.store'
  import TherapistActivitiesTab from '../admin/TherapistActivitiesTab.svelte'
  import { ArrowLeft, Sparkles } from '@lucide/svelte'
</script>

<div class="activities-page-layout">
  <!-- Cabeçalho Superior da Página de Atividades -->
  <header class="activities-header">
    <div class="left-section">
      <div class="brand-badge">
        <Sparkles size={16} strokeWidth={2.4} />
        <span class="brand-name">CAPE CAA</span>
      </div>
      <h1 class="header-title">
        <span class="full-title">ATIVIDADES PEDAGÓGICAS</span>
        <span class="short-title">ATIVIDADES</span>
      </h1>
    </div>

    <div class="right-section">
      <button class="back-board-btn" onclick={closeActivitiesPage} aria-label="Voltar para a prancha de comunicação">
        <ArrowLeft size={18} strokeWidth={2.4} />
        <span class="back-label-full">VOLTAR À PRANCHA</span>
        <span class="back-label-short">VOLTAR</span>
      </button>
    </div>
  </header>

  <!-- Conteúdo Principal de Atividades (Pastas e Níveis) -->
  <main class="activities-main-content">
    <TherapistActivitiesTab />
  </main>
</div>

<style>
  .activities-page-layout {
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    max-height: 100dvh;
    display: flex;
    flex-direction: column;
    background-color: #F8FAFC;
    overflow: hidden;
    position: fixed;
    inset: 0;
    z-index: 1000;
    padding-top: env(safe-area-inset-top, 0);
    padding-bottom: env(safe-area-inset-bottom, 0);
    box-sizing: border-box;
  }

  .activities-header {
    height: 54px;
    background: #0F172A;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    flex-shrink: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    width: 100%;
  }

  .left-section {
    display: flex;
    align-items: center;
    gap: 14px;
    min-width: 0;
  }

  .brand-badge {
    background: #059669;
    color: #FFFFFF;
    font-weight: 800;
    font-size: 0.85rem;
    padding: 4px 10px;
    border-radius: 6px;
    letter-spacing: 0.5px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .brand-name {
    white-space: nowrap;
  }

  .header-title {
    font-size: 1.15rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #F8FAFC;
    margin: 0;
  }

  .short-title,
  .back-label-short {
    display: none;
  }

  .right-section {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  .back-board-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #059669;
    color: #FFFFFF;
    border: 2px solid #34D399;
    padding: 7px 16px;
    border-radius: 10px;
    font-size: 0.88rem;
    font-weight: 900;
    letter-spacing: 0.5px;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(5, 150, 105, 0.35);
    transition: all 0.15s ease;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .back-board-btn:hover {
    background: #047857;
    border-color: #6EE7B7;
    box-shadow: 0 3px 10px rgba(5, 150, 105, 0.5);
  }

  .back-board-btn:active {
    transform: scale(0.97);
  }

  .activities-main-content {
    flex: 1;
    overflow-y: auto;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  @media (max-width: 640px) {
    .full-title,
    .back-label-full {
      display: none;
    }

    .short-title,
    .back-label-short {
      display: inline;
    }

    .activities-header {
      height: 46px;
      padding: 0 10px;
    }

    .left-section {
      gap: 8px;
      min-width: 0;
      flex: 1;
    }

    .brand-badge {
      font-size: 0.72rem;
      padding: 3px 6px;
      gap: 4px;
      border-radius: 5px;
    }

    .header-title {
      font-size: 0.88rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
    }

    .right-section {
      flex-shrink: 0;
    }

    .back-board-btn {
      padding: 5px 10px;
      font-size: 0.78rem;
      border-radius: 8px;
      gap: 5px;
    }

    .activities-main-content {
      padding: 10px 10px;
    }
  }

  @media (max-width: 340px) {
    .brand-badge {
      display: none;
    }
  }
</style>
