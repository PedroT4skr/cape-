<script lang="ts">
  import Modal from '../common/Modal.svelte'
  import {
    isAdminDashboardOpen,
    closeAdminDashboard
  } from '../../stores/admin.store'
  import TherapistActivitiesTab from './TherapistActivitiesTab.svelte'
  import TherapistBoardsTab from './TherapistBoardsTab.svelte'
  import TherapistSystemTab from './TherapistSystemTab.svelte'
  import { Sparkles, LayoutGrid, HardDrive, ArrowLeft } from '@lucide/svelte'

  type TabId = 'activities' | 'boards' | 'system'
  let activeTab = $state<TabId>('activities')
</script>

<Modal
  isOpen={$isAdminDashboardOpen}
  title="Painel do Terapeuta & Educador - CAPE"
  onClose={closeAdminDashboard}
>
  <div class="therapist-hub">
    <!-- Navegação de Abas -->
    <nav class="hub-tabs" aria-label="Seções do Painel do Terapeuta">
      <button
        class="hub-tab-btn {activeTab === 'activities' ? 'active' : ''}"
        onclick={() => (activeTab = 'activities')}
      >
        <Sparkles size={18} />
        <span>Atividades Didáticas</span>
      </button>

      <button
        class="hub-tab-btn {activeTab === 'boards' ? 'active' : ''}"
        onclick={() => (activeTab = 'boards')}
      >
        <LayoutGrid size={18} />
        <span>Pranchas & Grade</span>
      </button>

      <button
        class="hub-tab-btn {activeTab === 'system' ? 'active' : ''}"
        onclick={() => (activeTab = 'system')}
      >
        <HardDrive size={18} />
        <span>Sistema</span>
      </button>
    </nav>

    <!-- Conteúdo da Aba Ativa -->
    <div class="tab-content">
      {#if activeTab === 'activities'}
        <TherapistActivitiesTab />
      {:else if activeTab === 'boards'}
        <TherapistBoardsTab />
      {:else if activeTab === 'system'}
        <TherapistSystemTab />
      {/if}
    </div>

    <!-- Rodapé -->
    <footer class="hub-footer">
      <button class="return-student-btn" onclick={closeAdminDashboard}>
        <ArrowLeft size={18} />
        <span>VOLTAR AO MODO PRANCHA (ALUNO)</span>
      </button>
    </footer>
  </div>
</Modal>

<style>
  .therapist-hub {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .hub-tabs {
    display: flex;
    gap: 6px;
    background: #F1F5F9;
    padding: 6px;
    border-radius: 12px;
  }

  .hub-tab-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 12px;
    border: none;
    background: transparent;
    border-radius: 8px;
    font-size: 0.88rem;
    font-weight: 700;
    color: #64748B;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .hub-tab-btn.active {
    background: #FFFFFF;
    color: #2563EB;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  }

  .tab-content {
    min-height: 280px;
  }

  .hub-footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 12px;
    border-top: 1px solid #E2E8F0;
  }

  .return-student-btn {
    background: #0F172A;
    color: #FFFFFF;
    border: none;
    padding: 12px 20px;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 900;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    width: 100%;
    justify-content: center;
    letter-spacing: 0.5px;
  }

  .return-student-btn:active {
    background: #1E293B;
  }
</style>
