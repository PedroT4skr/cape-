<script lang="ts">
  import { onMount } from 'svelte'
  import { getStorageEstimate, requestPersistentStorage, type StorageInfo } from '../../db/storage.manager'
  import { db } from '../../db/db'
  import { HardDrive, Check, Layers, Volume2 } from '@lucide/svelte'

  let storageInfo = $state<StorageInfo>({
    supported: false,
    persisted: false,
    usageMB: 0,
    quotaMB: 0,
    percentUsed: 0
  })

  let totalCards = $state<number>(0)
  let totalAudios = $state<number>(0)

  function formatQuota(mb: number): string {
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(1)} GB`
    }
    return `${Math.round(mb)} MB`
  }

  async function loadData() {
    // Garante persistência em background silenciosamente sem incomodar o usuário
    requestPersistentStorage()
    storageInfo = await getStorageEstimate()
    try {
      totalCards = await db.cells.count()
      totalAudios = await db.mediaCache.count()
    } catch {
      // Fallback
    }
  }

  onMount(() => {
    loadData()
  })
</script>

<div class="storage-card">
  <!-- Topo Direto -->
  <div class="storage-header">
    <div class="header-icon">
      <HardDrive size={20} color="#2563EB" />
    </div>

    <div class="header-title-wrap">
      <h3 class="title">MEMÓRIA DO TABLET</h3>
      <span class="offline-badge">
        <Check size={13} strokeWidth={3} />
        <span>100% OFFLINE</span>
      </span>
    </div>
  </div>

  <!-- Barra com Uso e Limite Máximo -->
  <div class="meter-section">
    <div class="meter-bar-bg">
      <div
        class="meter-bar-fill"
        style="width: {Math.max(4, Math.min(100, storageInfo.percentUsed))}%;"
      ></div>
    </div>

    <div class="meter-values">
      <span class="used-val">
        <strong>{storageInfo.usageMB} MB</strong> utilizados
      </span>
      <span class="max-val">
        Limite total: <strong>{formatQuota(storageInfo.quotaMB)}</strong>
      </span>
    </div>
  </div>

  <!-- Métricas Rápidas e Limpas -->
  <div class="stats-grid">
    <div class="stat-pill">
      <Layers size={16} color="#2563EB" />
      <span class="stat-label">Cartões:</span>
      <strong class="stat-num">{totalCards}</strong>
    </div>

    <div class="stat-pill">
      <Volume2 size={16} color="#16A34A" />
      <span class="stat-label">Áudios:</span>
      <strong class="stat-num">{totalAudios}</strong>
    </div>
  </div>
</div>

<style>
  .storage-card {
    background: #FFFFFF;
    border: 2px solid #E2E8F0;
    border-radius: 16px;
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    box-sizing: border-box;
  }

  .storage-header {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .header-icon {
    width: 36px;
    height: 36px;
    border-radius: 9px;
    background: #EFF6FF;
    border: 1.5px solid #BFDBFE;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .header-title-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    min-width: 0;
    gap: 8px;
    flex-wrap: wrap;
  }

  .title {
    font-size: 0.95rem;
    font-weight: 900;
    color: #0F172A;
    margin: 0;
    letter-spacing: 0.5px;
  }

  .offline-badge {
    background: #DCFCE7;
    color: #15803D;
    border: 1px solid #86EFAC;
    padding: 2px 8px;
    border-radius: 8px;
    font-size: 0.72rem;
    font-weight: 900;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  /* Barra de Espaço */
  .meter-section {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .meter-bar-bg {
    width: 100%;
    height: 9px;
    background: #E2E8F0;
    border-radius: 999px;
    overflow: hidden;
  }

  .meter-bar-fill {
    height: 100%;
    background: #2563EB;
    border-radius: 999px;
    transition: width 0.3s ease;
  }

  .meter-values {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.82rem;
    color: #475569;
  }

  .meter-values strong {
    color: #0F172A;
  }

  /* Grid de Métricas */
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    width: 100%;
    box-sizing: border-box;
  }

  .stat-pill {
    background: #F8FAFC;
    border: 1.5px solid #E2E8F0;
    border-radius: 10px;
    padding: 8px 10px;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.82rem;
    color: #475569;
    min-width: 0;
    box-sizing: border-box;
  }

  .stat-num {
    margin-left: auto;
    font-size: 0.92rem;
    font-weight: 900;
    color: #0F172A;
  }

  @media (max-width: 640px) {
    .storage-card {
      padding: 12px 14px;
      max-width: 100%;
      box-sizing: border-box;
    }

    .meter-values {
      font-size: 0.74rem;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
    }

    .stats-grid {
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      width: 100%;
    }

    .stat-pill {
      padding: 6px 8px;
      font-size: 0.76rem;
      gap: 4px;
    }

    .stat-num {
      font-size: 0.85rem;
    }
  }
</style>
