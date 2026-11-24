<script lang="ts">
  import { closeAdminDashboard, adminActiveTab, adminReturnTarget, type AdminTab } from '../../stores/admin.store'
  import { navigateTo } from '../../stores/navigation.store'
  import TherapistBoardsTab from './TherapistBoardsTab.svelte'
  import TherapistSystemTab from './TherapistSystemTab.svelte'
  import TherapistActivityBankTab from './activities-bank/TherapistActivityBankTab.svelte'
  import { LayoutGrid, HardDrive, ArrowLeft, Sparkles } from '@lucide/svelte'

  let activeTab = $state<AdminTab>($adminActiveTab)

  $effect(() => {
    activeTab = $adminActiveTab
  })

  function handleBack() {
    closeAdminDashboard()
    if ($adminReturnTarget === 'hub') {
      navigateTo('hub')
    } else if ($adminReturnTarget === 'activities') {
      navigateTo('activities')
    } else {
      navigateTo('board')
    }
  }

  function handleGoToHub() {
    closeAdminDashboard()
    navigateTo('hub')
  }
</script>

<div class="therapist-layout">
  <!-- Cabeçalho Idêntico ao Header da Aplicação Principal -->
  <header class="app-header">
    <div class="left-section">
      <button class="back-student-btn" onclick={handleBack} aria-label="Voltar">
        <ArrowLeft size={18} strokeWidth={2.6} />
        {#if $adminReturnTarget === 'hub'}
          <span class="back-label-full">VOLTAR À SUÍTE</span>
          <span class="back-label-short">VOLTAR</span>
        {:else if $adminReturnTarget === 'activities'}
          <span class="back-label-full">VOLTAR ÀS ATIVIDADES</span>
          <span class="back-label-short">VOLTAR</span>
        {:else}
          <span class="back-label-full">VOLTAR À PRANCHA</span>
          <span class="back-label-short">VOLTAR</span>
        {/if}
      </button>

      <h1 class="board-title">
        <span class="full-title">PAINEL DE CONFIGURAÇÕES & AJUSTES</span>
        <span class="short-title">AJUSTES</span>
      </h1>
    </div>

    <div class="right-section">
      <button class="brand-badge-btn" onclick={handleGoToHub} aria-label="Abrir Portal Central da Suíte CAPE">
        <LayoutGrid size={16} />
        <span class="brand-name">SUÍTE CAPE</span>
      </button>
    </div>
  </header>

  <!-- Barra de Abas Secundária de Ajustes -->
  <nav class="sub-navbar" aria-label="Navegação de Configurações">
    <button
      class="sub-tab-btn {activeTab === 'activities' ? 'active' : ''}"
      onclick={() => {
        activeTab = 'activities'
        adminActiveTab.set('activities')
      }}
    >
      <Sparkles size={16} />
      <span class="tab-label-full">BANCO DE ATIVIDADES</span>
      <span class="tab-label-short">ATIVIDADES</span>
    </button>

    <button
      class="sub-tab-btn {activeTab === 'boards' ? 'active' : ''}"
      onclick={() => {
        activeTab = 'boards'
        adminActiveTab.set('boards')
      }}
    >
      <LayoutGrid size={16} />
      <span class="tab-label-full">PRANCHAS & GRADE</span>
      <span class="tab-label-short">PRANCHAS</span>
    </button>

    <button
      class="sub-tab-btn {activeTab === 'system' ? 'active' : ''}"
      onclick={() => {
        activeTab = 'system'
        adminActiveTab.set('system')
      }}
    >
      <HardDrive size={16} />
      <span class="tab-label-full">SISTEMA & AJUSTES</span>
      <span class="tab-label-short">SISTEMA</span>
    </button>
  </nav>

  <!-- Área Principal de Conteúdo (100% da Largura e Altura sem Margens Mortas) -->
  <main class="therapist-main-area">
    {#if activeTab === 'activities'}
      <TherapistActivityBankTab />
    {:else if activeTab === 'boards'}
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

  .brand-badge-btn {
    background: #2563EB;
    color: #FFFFFF;
    border: none;
    font-weight: 800;
    font-size: 0.8rem;
    padding: 5px 9px;
    border-radius: 8px;
    letter-spacing: 0.5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
    flex-shrink: 0;
    transition: background 0.15s ease, transform 0.1s ease;
  }

  .brand-badge-btn:hover {
    background: #1d4ed8;
  }

  .brand-badge-btn:active {
    transform: scale(0.96);
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
  .back-label-short,
  .tab-label-short {
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
    .back-label-full,
    .tab-label-full {
      display: none;
    }

    .short-title,
    .back-label-short,
    .tab-label-short {
      display: inline;
    }

    .app-header {
      height: 46px;
      padding: 0 10px;
    }

    .left-section {
      gap: 8px;
    }

    .brand-badge-btn {
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
      height: auto;
      min-height: 44px;
      padding: 4px 6px;
      gap: 4px;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      overflow-x: hidden;
    }

    .sub-tab-btn {
      width: 100%;
      justify-content: center;
      padding: 4px 4px;
      font-size: 0.7rem;
      height: 36px;
      gap: 4px;
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
