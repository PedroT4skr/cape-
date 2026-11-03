<script lang="ts">
  import { downloadBackupJson, importBackupData } from '../../services/backup.service'
  import { currentBoard, loadBoard } from '../../stores/board.store'
  import { Download, Upload, CheckCircle2, AlertCircle } from '@lucide/svelte'

  let fileInput: HTMLInputElement | null = $state(null)
  let statusMessage = $state<string | null>(null)
  let isError = $state(false)
  let isProcessing = $state(false)

  async function handleExport() {
    try {
      isProcessing = true
      await downloadBackupJson()
      statusMessage = 'Backup baixado com sucesso!'
      isError = false
    } catch (err: any) {
      statusMessage = 'Erro ao exportar dados: ' + (err.message || 'Falha desconhecida')
      isError = true
    } finally {
      isProcessing = false
      setTimeout(() => (statusMessage = null), 4000)
    }
  }

  function triggerFileInput() {
    if (fileInput) {
      fileInput.click()
    }
  }

  async function handleFileSelected(event: Event) {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return

    try {
      isProcessing = true
      const text = await file.text()
      const json = JSON.parse(text)
      const res = await importBackupData(json)
      
      if ($currentBoard) {
        await loadBoard($currentBoard.id)
      }

      statusMessage = `Sucesso! Restauradas ${res.boardsCount} pranchas e ${res.cellsCount} cartões.`
      isError = false
    } catch (err: any) {
      statusMessage = 'Erro ao importar backup: ' + (err.message || 'Arquivo inválido')
      isError = true
    } finally {
      isProcessing = false
      target.value = ''
      setTimeout(() => (statusMessage = null), 5000)
    }
  }
</script>

<div class="system-card backup-card">
  <div class="card-header">
    <div class="icon-wrap">
      <Download size={20} color="#0284C7" />
    </div>
    <div>
      <h4 class="card-title">BACKUP & SINCRONIZAÇÃO DE PRANCHAS</h4>
      <p class="card-desc">
        Exporte todas as pranchas em arquivo JSON para salvar em outro aparelho ou restaurar um backup.
      </p>
    </div>
  </div>

  <div class="actions-row">
    <button class="action-btn export-btn" onclick={handleExport} disabled={isProcessing}>
      <Download size={18} />
      <span>EXPORTAR BACKUP (JSON)</span>
    </button>

    <button class="action-btn import-btn" onclick={triggerFileInput} disabled={isProcessing}>
      <Upload size={18} />
      <span>IMPORTAR BACKUP</span>
    </button>

    <input
      type="file"
      accept=".json,application/json"
      bind:this={fileInput}
      onchange={handleFileSelected}
      style="display: none;"
    />
  </div>

  {#if statusMessage}
    <div class="status-alert" class:is-error={isError}>
      {#if isError}
        <AlertCircle size={18} />
      {:else}
        <CheckCircle2 size={18} />
      {/if}
      <span>{statusMessage}</span>
    </div>
  {/if}
</div>

<style>
  .backup-card {
    background: #FFFFFF;
    border: 2px solid #E2E8F0;
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .card-header {
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }

  .icon-wrap {
    background: #E0F2FE;
    width: 42px;
    height: 42px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .card-title {
    font-size: 0.95rem;
    font-weight: 800;
    color: #0F172A;
    letter-spacing: 0.5px;
    margin: 0;
  }

  .card-desc {
    font-size: 0.85rem;
    color: #64748B;
    margin: 4px 0 0;
    line-height: 1.4;
  }

  .actions-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .action-btn {
    flex: 1;
    min-width: 150px;
    height: 44px;
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid transparent;
  }

  .export-btn {
    background: #F0F9FF;
    color: #0284C7;
    border-color: #BAE6FD;
  }

  .export-btn:hover:not(:disabled) {
    background: #E0F2FE;
    border-color: #0284C7;
  }

  .import-btn {
    background: #F8FAFC;
    color: #334155;
    border-color: #CBD5E1;
  }

  .import-btn:hover:not(:disabled) {
    background: #F1F5F9;
    border-color: #64748B;
  }

  .action-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .status-alert {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 600;
    background: #F0FDF4;
    color: #16A34A;
    border: 1.5px solid #BBF7D0;
  }

  .status-alert.is-error {
    background: #FFF1F2;
    color: #E11D48;
    border-color: #FECDD3;
  }
</style>

