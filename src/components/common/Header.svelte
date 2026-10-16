<script lang="ts">
  import { Lock, Sparkles } from '@lucide/svelte'
  import { currentBoard } from '../../stores/board.store'
  import { openAdminLock } from '../../stores/admin.store'
  import { openActivitiesPage } from '../../stores/activity.store'

  let boardTitle = $derived($currentBoard?.name || 'Comunicação Essencial')
</script>

<header class="app-header">
  <div class="left-section">
    <div class="brand-badge">
      <span class="brand-name">CAPE CAA</span>
    </div>
    <h1 class="board-title">{boardTitle}</h1>
  </div>

  <div class="right-section">
    <button class="activities-trigger-btn" onclick={openActivitiesPage} aria-label="Abrir Atividades Didáticas">
      <Sparkles size={18} strokeWidth={2.5} />
      <span>ATIVIDADES</span>
    </button>

    <button class="panel-trigger-btn" onclick={openAdminLock} aria-label="Abrir Painel de Ajustes e Configurações">
      <Lock size={18} strokeWidth={2.5} />
      <span class="panel-label">PAINEL</span>
    </button>
  </div>
</header>

<style>
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

  .right-section {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  .activities-trigger-btn {
    display: flex;
    align-items: center;
    gap: 7px;
    background: #059669;
    color: #FFFFFF;
    border: 2px solid #34D399;
    padding: 7px 16px;
    border-radius: 12px;
    font-size: 0.92rem;
    font-weight: 950;
    letter-spacing: 0.5px;
    cursor: pointer;
    box-shadow: 0 3px 10px rgba(5, 150, 105, 0.4);
    transition: transform 0.1s ease, background 0.15s ease, box-shadow 0.15s ease;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .activities-trigger-btn:hover {
    background: #047857;
    border-color: #6EE7B7;
    box-shadow: 0 4px 14px rgba(5, 150, 105, 0.55);
  }

  .activities-trigger-btn:active {
    transform: scale(0.96);
    box-shadow: 0 2px 6px rgba(5, 150, 105, 0.4);
  }

  .panel-trigger-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #2563EB;
    color: #FFFFFF;
    border: 2px solid #60A5FA;
    padding: 7px 18px;
    border-radius: 12px;
    font-size: 0.92rem;
    font-weight: 950;
    letter-spacing: 0.5px;
    cursor: pointer;
    box-shadow: 0 3px 10px rgba(37, 99, 235, 0.45);
    transition: transform 0.1s ease, background 0.15s ease, box-shadow 0.15s ease;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .panel-trigger-btn:hover {
    background: #1D4ED8;
    border-color: #93C5FD;
    box-shadow: 0 4px 14px rgba(37, 99, 235, 0.6);
  }

  .panel-trigger-btn:active {
    transform: scale(0.96);
    box-shadow: 0 2px 6px rgba(37, 99, 235, 0.4);
  }

  .panel-label {
    text-transform: uppercase;
  }

  @media (max-width: 640px) {
    .app-header {
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
      border-radius: 5px;
    }

    .board-title {
      font-size: 0.85rem;
      min-width: 0;
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .right-section {
      gap: 6px;
    }

    .activities-trigger-btn {
      padding: 5px 8px;
      font-size: 0.74rem;
      border-radius: 8px;
      gap: 4px;
    }

    .panel-trigger-btn {
      padding: 5px 8px;
      font-size: 0.74rem;
      border-radius: 8px;
      gap: 4px;
    }
  }

  @media (max-width: 360px) {
    .brand-badge {
      display: none;
    }
  }
</style>
