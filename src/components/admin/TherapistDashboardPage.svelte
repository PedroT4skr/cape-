<script lang="ts">
  import { closeAdminDashboard } from '../../stores/admin.store'
  import TherapistBoardsTab from './TherapistBoardsTab.svelte'
  import TherapistSystemTab from './TherapistSystemTab.svelte'
  import { LayoutGrid, HardDrive, ArrowLeft } from '@lucide/svelte'

  type TabId = 'boards' | 'system'
  let activeTab = $state<TabId>('boards')
</script>

<div class="therapist-layout">
  <!-- Cabeçalho Idêntico ao Header da Aplicação Principal -->
  <header class="app-header">
    <div class="left-section">
      <div class="brand-badge">
        <span class="brand-name">CAPE CAA</span>
      </div>
      <h1 class="board-title">
        <span class="full-title">PAINEL DE CONFIGURAÇÕES & AJUSTES</span>
        <span class="short-title">AJUSTES</span>
      </h1>
    </div>

    <div class="right-section">
      <button class="back-student-btn" onclick={closeAdminDashboard} aria-label="Voltar para a prancha de comunicação">
        <ArrowLeft size={18} strokeWidth={2.4} />
        <span class="back-label-full">VOLTAR À PRANCHA</span>
        <span class="back-label-short">VOLTAR</span>
      </button>
    </div>
  </header>

  <!-- Barra de Abas Secundária de Ajustes -->
  <nav class="sub-navbar" aria-label="Navegação de Configurações">
    <button
      class="sub-tab-btn {activeTab === 'boards' ? 'active' : ''}"
      onclick={() => (activeTab = 'boards')}
    >
      <LayoutGrid size={18} />
      <span>PRANCHAS & GRADE</span>
    </button>

    <button
      class="sub-tab-btn {activeTab === 'system' ? 'active' : ''}"
      onclick={() => (activeTab = 'system')}
    >
      <HardDrive size={18} />
      <span>SISTEMA & AJUSTES</span>
    </button>
  </nav>

  <!-- Área Principal de Conteúdo (100% da Largura e Altura sem Margens Mortas) -->
  <main class="therapist-main-area">
    {#if activeTab === 'boards'}
      <TherapistBoardsTab />
    {:else if activeTab === 'system'}
      <TherapistSystemTab />
    {/if}
  </main>
</div>

<style>
  .therapist-layout {
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

  .app-header {
    height: 54px;
    background: #0F172A;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    flex-shrink: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .left-section {
    display: flex;
    align-items: center;
    gap: 14px;
    min-width: 0;
  }

  .brand-badge {
    background: #2563EB;
    color: #FFFFFF;
    font-weight: 800;
    font-size: 0.85rem;
    padding: 4px 10px;
    border-radius: 6px;
    letter-spacing: 0.5px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .board-title {
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
    flex-shrink: 0;
  }

  .back-student-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #2563EB;
    color: #FFFFFF;
    border: none;
    padding: 7px 16px;
    border-radius: 8px;
    font-size: 0.88rem;
    font-weight: 800;
    cursor: pointer;
    letter-spacing: 0.5px;
    transition: background 0.15s ease, transform 0.1s ease;
    white-space: nowrap;
  }

  .back-student-btn:hover {
    background: #1D4ED8;
  }

  .back-student-btn:active {
    transform: scale(0.97);
  }

  .sub-navbar {
    height: 48px;
    background: #FFFFFF;
    border-bottom: 2px solid #E2E8F0;
    display: flex;
    align-items: center;
    padding: 0 16px;
    gap: 8px;
    flex-shrink: 0;
    overflow-x: auto;
    width: 100%;
    box-sizing: border-box;
  }

  .sub-tab-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: none;
    background: transparent;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 800;
    color: #64748B;
    cursor: pointer;
    transition: all 0.15s ease;
    height: 36px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .sub-tab-btn:hover {
    background: #F1F5F9;
    color: #0F172A;
  }

  .sub-tab-btn.active {
    background: #EFF6FF;
    color: #2563EB;
  }

  .therapist-main-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 16px;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    max-width: 100%;
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

    .app-header {
      height: 46px;
      padding: 0 10px;
    }

    .left-section {
      gap: 8px;
    }

    .brand-badge {
      font-size: 0.72rem;
      padding: 3px 6px;
    }

    .board-title {
      font-size: 0.85rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 140px;
    }

    .back-student-btn {
      padding: 5px 10px;
      font-size: 0.78rem;
      gap: 5px;
    }

    .sub-navbar {
      height: 44px;
      padding: 4px 8px;
      gap: 6px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      overflow-x: hidden;
    }

    .sub-tab-btn {
      width: 100%;
      justify-content: center;
      padding: 4px 6px;
      font-size: 0.74rem;
      height: 34px;
      gap: 5px;
    }

    .therapist-main-area {
      padding: 10px 8px;
    }
  }

  @media (max-width: 380px) {
    .board-title {
      display: none;
    }
  }
</style>
