<script lang="ts">
  import { onMount } from 'svelte'
  import Header from './components/common/Header.svelte'
  import SentenceBar from './components/sentence-bar/SentenceBar.svelte'
  import BoardGrid from './components/board/BoardGrid.svelte'
  import PinChallengeModal from './components/admin/PinChallengeModal.svelte'
  import TherapistDashboardPage from './components/admin/TherapistDashboardPage.svelte'
  import ActivitiesPage from './components/activities/ActivitiesPage.svelte'
  import DyscalculiaPlayer from './components/activities/DyscalculiaPlayer.svelte'
  import { initRootBoard } from './stores/board.store'
  import { requestPersistentStorage } from './db/storage.manager'
  import { isAdminDashboardOpen } from './stores/admin.store'
  import { isActivitiesPageOpen } from './stores/activity.store'

  onMount(async () => {
    // Inicializa a prancha raiz com o seed do CAPE
    await initRootBoard()
    // Solicita persistência silenciosa no Android PWA
    await requestPersistentStorage()
  })
</script>

{#if $isAdminDashboardOpen}
  <!-- Página de Configurações & Ajustes do Painel -->
  <TherapistDashboardPage />
{:else if $isActivitiesPageOpen}
  <!-- Página Dedicada de Atividades Didáticas -->
  <ActivitiesPage />
{:else}
  <!-- Modo Aluno (Prancha e Comunicação Alternativa) -->
  <div class="app-layout">
    <Header />
    <SentenceBar />
    <BoardGrid />
  </div>
{/if}

<!-- Modal de Autenticação Estrita por PIN -->
<PinChallengeModal />

<!-- Player de Atividades Didáticas (Discalculia / CPA) -->
<DyscalculiaPlayer />

<style>
  .app-layout {
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    max-height: 100dvh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #F8FAFC;
    padding-top: env(safe-area-inset-top, 0);
    padding-bottom: env(safe-area-inset-bottom, 0);
    padding-left: env(safe-area-inset-left, 0);
    padding-right: env(safe-area-inset-right, 0);
    box-sizing: border-box;
  }
</style>
