export interface StorageInfo {
  supported: boolean
  persisted: boolean
  usageMB: number
  quotaMB: number
  percentUsed: number
}

/**
 * Solicita ao navegador a persistência duradoura do IndexedDB
 * impedindo a expulsão automática de dados (LRU eviction) sob pressão de disco no Android.
 */
export async function requestPersistentStorage(): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) {
    try {
      return await navigator.storage.persist()
    } catch {
      return false
    }
  }
  return false
}

/**
 * Retorna estimativas de consumo e limite de cota de armazenamento no dispositivo.
 */
export async function getStorageEstimate(): Promise<StorageInfo> {
  if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.estimate) {
    try {
      const persisted = navigator.storage.persisted ? await navigator.storage.persisted() : false
      const estimate = await navigator.storage.estimate()
      const usage = estimate.usage ?? 0
      const quota = estimate.quota ?? 1
      const usageMB = Math.round((usage / (1024 * 1024)) * 10) / 10
      const quotaMB = Math.round((quota / (1024 * 1024)) * 10) / 10
      const percentUsed = Math.min(100, Math.round((usage / quota) * 100))

      return {
        supported: true,
        persisted,
        usageMB,
        quotaMB,
        percentUsed
      }
    } catch {
      // Fallback em caso de erro de API
    }
  }

  return {
    supported: false,
    persisted: false,
    usageMB: 0,
    quotaMB: 0,
    percentUsed: 0
  }
}
