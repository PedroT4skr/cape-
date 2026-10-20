import { db } from '../db/db'

export interface EdgeVoiceOption {
  id: string
  name: string
  gender: string
  description: string
}

export const EDGE_TTS_VOICES: EdgeVoiceOption[] = [
  {
    id: 'pt-BR-FranciscaNeural',
    name: 'Francisca',
    gender: 'Feminino',
    description: 'Voz acolhedora, doce e calma (altamente recomendada para TEA)'
  },
  {
    id: 'pt-BR-AntonioNeural',
    name: 'Antônio',
    gender: 'Masculino',
    description: 'Voz masculina clara, firme e didática'
  },
  {
    id: 'pt-BR-ThalitaMultilingualNeural',
    name: 'Thalita',
    gender: 'Feminino',
    description: 'Voz jovem, expressiva e dinâmica'
  }
]

export const DEFAULT_EDGE_VOICE = 'pt-BR-FranciscaNeural'

class EdgeTtsService {
  private activeAudio: HTMLAudioElement | null = null
  private activeAudioUrl: string | null = null
  private progressInterval: any = null

  private getCacheKey(text: string, voice: string): string {
    const cleanText = text.trim().toLowerCase()
    return `edge_tts_${voice}_${cleanText}`
  }

  public getSelectedVoiceId(): string {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('cape_edge_voice') || DEFAULT_EDGE_VOICE
    }
    return DEFAULT_EDGE_VOICE
  }

  public setSelectedVoiceId(voiceId: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cape_edge_voice', voiceId)
    }
  }

  /**
   * Obtém o áudio sintetizado como Blob, consultando primeiro o cache IndexedDB
   * e baixando via proxy local se necessário. Retorna null se offline e sem cache.
   */
  public async getAudioBlob(text: string, voice?: string): Promise<Blob | null> {
    const activeVoice = voice || this.getSelectedVoiceId()
    const cacheKey = this.getCacheKey(text, activeVoice)

    // 1. Tenta recuperar do cache local offline (IndexedDB)
    try {
      const cached = await db.mediaCache.get(cacheKey)
      if (cached && cached.data) {
        return cached.data
      }
    } catch (e) {
      console.warn('[EdgeTTS] Falha ao ler cache IndexedDB:', e)
    }

    // 2. Se não estiver no cache, requisita ao proxy local
    try {
      const res = await fetch(`/api/tts?text=${encodeURIComponent(text)}&voice=${encodeURIComponent(activeVoice)}`)
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }
      const blob = await res.blob()

      // 3. Salva no cache local anti-evicção
      await db.mediaCache.put({
        id: cacheKey,
        type: 'audio',
        data: blob,
        timestamp: Date.now()
      })

      return blob
    } catch (err) {
      console.warn('[EdgeTTS] Falha ao buscar áudio remoto (possível offline):', err)
      return null
    }
  }

  /**
   * Pré-carrega o áudio de um texto em segundo plano e persiste no IndexedDB (sem travar a interface)
   */
  public async prefetch(text: string, voice?: string): Promise<void> {
    const clean = text?.trim()
    if (!clean) return
    try {
      await this.getAudioBlob(clean, voice)
    } catch {
      // Ignora falhas silenciosamente em caso de offline
    }
  }

  /**
   * Reproduz o áudio com controle de concorrência, suporte a tracking de progresso e limpeza de recursos
   */
  public async playAudio(
    text: string,
    voice?: string,
    onEnded?: () => void,
    onProgress?: (progress: number, currentTime: number, duration: number) => void
  ): Promise<boolean> {
    this.stop()

    const blob = await this.getAudioBlob(text, voice)
    if (!blob) {
      return false // Indica que falhou para permitir fallback transparente
    }

    return new Promise((resolve) => {
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      this.activeAudio = audio
      this.activeAudioUrl = url

      const cleanup = () => {
        if (this.progressInterval) {
          clearInterval(this.progressInterval)
          this.progressInterval = null
        }
        if (this.activeAudioUrl === url) {
          URL.revokeObjectURL(url)
          this.activeAudioUrl = null
          this.activeAudio = null
        }
      }

      if (onProgress) {
        this.progressInterval = setInterval(() => {
          if (!this.activeAudio || this.activeAudio !== audio) {
            if (this.progressInterval) {
              clearInterval(this.progressInterval)
              this.progressInterval = null
            }
            return
          }
          const duration = audio.duration
          if (duration && !isNaN(duration) && duration > 0) {
            const fraction = Math.min(1, Math.max(0, audio.currentTime / duration))
            onProgress(fraction, audio.currentTime, duration)
          }
        }, 35)
      }

      audio.onended = () => {
        if (onProgress && audio.duration) {
          onProgress(1, audio.duration, audio.duration)
        }
        cleanup()
        if (onEnded) onEnded()
        resolve(true)
      }

      audio.onerror = () => {
        cleanup()
        if (onEnded) onEnded()
        resolve(false)
      }

      audio.play().catch(() => {
        cleanup()
        resolve(false)
      })
    })
  }

  public stop(): void {
    if (this.progressInterval) {
      clearInterval(this.progressInterval)
      this.progressInterval = null
    }
    if (this.activeAudio) {
      this.activeAudio.pause()
      this.activeAudio.currentTime = 0
      this.activeAudio = null
    }
    if (this.activeAudioUrl) {
      URL.revokeObjectURL(this.activeAudioUrl)
      this.activeAudioUrl = null
    }
  }

  public async getCacheStats(): Promise<{ count: number; totalBytes: number }> {
    try {
      const items = await db.mediaCache.where('type').equals('audio').toArray()
      let totalBytes = 0
      for (const item of items) {
        totalBytes += item.data?.size || 0
      }
      return { count: items.length, totalBytes }
    } catch {
      return { count: 0, totalBytes: 0 }
    }
  }

  public async clearAudioCache(): Promise<void> {
    try {
      await db.mediaCache.where('type').equals('audio').delete()
    } catch (e) {
      console.error('[EdgeTTS] Falha ao limpar cache de áudio:', e)
    }
  }
}

export const edgeTtsService = new EdgeTtsService()
