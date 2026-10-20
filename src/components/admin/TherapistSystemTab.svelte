<script lang="ts">
  import StorageStatus from './StorageStatus.svelte'
  import VoiceSettings from './VoiceSettings.svelte'
  import { db } from '../../db/db'
  import { currentBoard, loadBoard } from '../../stores/board.store'
  import { RotateCcw, AlertTriangle } from '@lucide/svelte'

  async function handleResetDatabase() {
    const confirmReset = window.confirm(
      'Tem certeza que deseja restaurar o vocabulário para o padrão original do CAPE?'
    )
    if (confirmReset) {
      await db.resetToDefaultSeed()
      if ($currentBoard) {
        await loadBoard($currentBoard.id)
      }
    }
  }
</script>

<div class="system-tab-grid">
  <!-- Configurações e Seletor do Motor de Voz Neural -->
  <VoiceSettings />

  <!-- Diagnóstico e Memória do Tablet -->
  <StorageStatus />

  <!-- Zona de Restauração -->
  <div class="system-card reset-card">
    <div class="reset-info">
      <div class="alert-icon-wrap">
        <AlertTriangle size={24} color="#E11D48" />
      </div>
      <div>
        <h4 class="reset-title">RESTAURAR CARTÕES ORIGINAIS</h4>
        <p class="reset-desc">
          Volta todas as pranchas e cartões para o vocabulário inicial da escola CAPE.
        </p>
      </div>
    </div>

    <button class="reset-btn" onclick={handleResetDatabase}>
      <RotateCcw size={18} />
      <span class="btn-label-full">RESTAURAR PADRÃO DO CAPE</span>
      <span class="btn-label-short">RESTAURAR PADRÃO</span>
    </button>
  </div>
</div>

<style>
  .system-tab-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  .system-card {
    background: #FFFFFF;
    border: 2px solid #E2E8F0;
    border-radius: 14px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-sizing: border-box;
  }

  .reset-card {
    background: #FFF1F2;
    border-color: #FECDD3;
    justify-content: space-between;
  }

  .reset-info {
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }

  .alert-icon-wrap {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: #FFE4E6;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .reset-title {
    font-size: 1.05rem;
    font-weight: 900;
    color: #9F1239;
    margin: 0 0 4px 0;
    letter-spacing: 0.5px;
  }

  .reset-desc {
    font-size: 0.85rem;
    color: #BE123C;
    margin: 0;
    line-height: 1.4;
    font-weight: 600;
  }

  .reset-btn {
    background: #E11D48;
    color: #FFFFFF;
    border: none;
    padding: 12px 18px;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 900;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .reset-btn:hover {
    background: #BE123C;
  }

  .btn-label-short {
    display: none;
  }

  @media (max-width: 640px) {
    .system-tab-grid {
      grid-template-columns: 1fr;
      gap: 12px;
      width: 100%;
      max-width: 100%;
    }

    .system-card {
      padding: 14px;
      gap: 12px;
    }

    .reset-title {
      font-size: 0.95rem;
    }

    .reset-desc {
      font-size: 0.8rem;
    }

    .btn-label-full {
      display: none;
    }

    .btn-label-short {
      display: inline;
    }

    .reset-btn {
      padding: 10px 14px;
      font-size: 0.82rem;
    }
  }
</style>
