import { APP_CONFIG } from '../constants/config.constants'
import type { PlaybackStatus } from '../types/audio.types'
import { edgeTtsService } from './edge-tts.service'

export type TtsEngine = 'edge' | 'native'

class SpeechService {
  private synth: SpeechSynthesis | null = null
  private preferredNativeVoice: SpeechSynthesisVoice | null = null
  private status: PlaybackStatus = 'idle'
  private activeUtterance: SpeechSynthesisUtterance | null = null
  private resumeTimer: any = null
  private highlightTimer: any = null
  private isSequenceCancelled = false

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis
      this.initNativeVoices()
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initNativeVoices()
      }
    }
  }

  public getEngine(): TtsEngine {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('cape_tts_engine')
      if (saved === 'native' || saved === 'edge') return saved
    }
    return 'edge'
  }

  public setEngine(engine: TtsEngine): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cape_tts_engine', engine)
    }
  }

  private initNativeVoices(): void {
    if (!this.synth) return
    const voices = this.synth.getVoices()
    if (voices.length === 0) return

    const savedVoiceName =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem('cape_voice_name')
        : null

    if (savedVoiceName) {
      const saved = voices.find((v) => v.name === savedVoiceName)
      if (saved) {
        this.preferredNativeVoice = saved
        return
      }
    }

    this.preferredNativeVoice = this.rankBestNativeVoice(voices)
  }

  private rankBestNativeVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
    const ptVoices = voices.filter(
      (v) => v.lang === 'pt-BR' || v.lang.startsWith('pt')
    )
    if (ptVoices.length === 0) return voices[0] || null

    const scoreVoice = (v: SpeechSynthesisVoice): number => {
      const name = v.name.toLowerCase()
      let score = 0
      if (name.includes('natural')) score += 100
      if (name.includes('neural')) score += 95
      if (name.includes('online')) score += 80
      if (name.includes('google')) score += 75
      if (name.includes('francisca') || name.includes('antônio') || name.includes('antonio')) score += 65
      if (name.includes('thalita') || name.includes('letícia') || name.includes('leticia')) score += 60
      if (v.lang === 'pt-BR') score += 20
      if (name.includes('desktop')) score -= 60
      if (name.includes('microsoft maria')) score -= 70
      return score
    }

    return [...ptVoices].sort((a, b) => scoreVoice(b) - scoreVoice(a))[0] || ptVoices[0]
  }

  public getPortugueseVoices(): { voice: SpeechSynthesisVoice; isNeural: boolean; isSelected: boolean }[] {
    if (!this.synth) return []
    const voices = this.synth.getVoices()
    const ptVoices = voices.filter(
      (v) => v.lang === 'pt-BR' || v.lang.startsWith('pt')
    )

    const isNativeEngineActive = this.getEngine() === 'native'

    return ptVoices.map((v) => {
      const name = v.name.toLowerCase()
      const isNeural =
        name.includes('natural') ||
        name.includes('neural') ||
        name.includes('online') ||
        name.includes('google')
      const isSelected = isNativeEngineActive && this.preferredNativeVoice?.name === v.name
      return { voice: v, isNeural, isSelected }
    })
  }

  public isEdgeVoiceActive(voiceId: string): boolean {
    return this.getEngine() === 'edge' && edgeTtsService.getSelectedVoiceId() === voiceId
  }

  public isNativeVoiceActive(voiceName: string): boolean {
    return this.getEngine() === 'native' && this.preferredNativeVoice?.name === voiceName
  }

  public selectEdgeVoice(voiceId: string): void {
    this.setEngine('edge')
    edgeTtsService.setSelectedVoiceId(voiceId)
  }

  public selectNativeVoice(voiceName: string): void {
    this.setEngine('native')
    this.setPreferredVoiceByName(voiceName)
  }

  public setPreferredVoiceByName(voiceName: string): void {
    if (!this.synth) return
    const voices = this.synth.getVoices()
    const found = voices.find((v) => v.name === voiceName)
    if (found) {
      this.preferredNativeVoice = found
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('cape_voice_name', found.name)
      }
    }
  }

  public getPreferredVoice(): SpeechSynthesisVoice | null {
    return this.preferredNativeVoice
  }

  public getStatus(): PlaybackStatus {
    return this.status
  }

  /**
   * Pronuncia uma palavra individual. Tenta Edge-TTS (ou cache) primeiro;
   * se falhar ou estiver offline sem cache, recorre à voz nativa com afinação pedagógica.
   */
  public async speakWord(text: string): Promise<void> {
    this.stop()

    if (this.getEngine() === 'edge') {
      this.status = 'speaking'
      const success = await edgeTtsService.playAudio(text)
      if (success) {
        this.status = 'idle'
        return
      }
      // Se não obteve áudio do Edge-TTS, fallback automático para a voz nativa
      console.warn('[SpeechService] Fallback para sintetizador nativo offline')
    }

    await this.speakWordNative(text)
  }

  private speakWordNative(text: string): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth) {
        this.status = 'idle'
        resolve()
        return
      }

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = APP_CONFIG.SPEECH_DEFAULT_LANG
      utterance.rate = APP_CONFIG.SPEECH_DEFAULT_RATE
      utterance.pitch = APP_CONFIG.SPEECH_DEFAULT_PITCH
      if (this.preferredNativeVoice) {
        utterance.voice = this.preferredNativeVoice
      }

      this.activeUtterance = utterance
      this.status = 'speaking'

      let finished = false
      const finish = () => {
        if (finished) return
        finished = true
        this.status = 'idle'
        this.activeUtterance = null
        resolve()
      }

      utterance.onend = finish
      utterance.onerror = finish

      if (this.synth.paused) {
        this.synth.resume()
      }

      this.synth.speak(utterance)

      // Salvaguarda caso a Web Speech API trave silenciosamente em alguns navegadores
      setTimeout(() => {
        if (!finished) {
          finish()
        }
      }, 7000)
    })
  }

  /**
   * Formata a lista de palavras em uma frase natural com pontuação de fechamento
   */
  public formatFullPhrase(words: string[]): string {
    const raw = words.map((w) => w.trim()).filter(Boolean).join(' ')
    if (!raw) return ''
    return /[.!?]$/.test(raw) ? raw : `${raw}.`
  }

  /**
   * Calcula janelas de tempo proporcionais ao tamanho léxico de cada palavra
   */
  private calculateWordProgressWindows(words: string[]): { start: number; end: number; index: number }[] {
    const weights = words.map((w) => Math.max(w.trim().length, 3))
    const totalWeight = weights.reduce((sum, w) => sum + w, 0)

    const windows: { start: number; end: number; index: number }[] = []
    let currentAccum = 0

    for (let i = 0; i < words.length; i++) {
      const start = currentAccum / totalWeight
      currentAccum += weights[i]
      const end = i === words.length - 1 ? 1.0 : currentAccum / totalWeight
      windows.push({ start, end, index: i })
    }

    return windows
  }

  private findActiveWordIndex(
    progress: number,
    windows: { start: number; end: number; index: number }[]
  ): number {
    for (const win of windows) {
      if (progress >= win.start && progress <= win.end) {
        return win.index
      }
    }
    return windows.length - 1
  }

  /**
   * Dispara pré-carregamento em segundo plano da frase completa no IndexedDB (zero latência no clique)
   */
  public prefetchPhrase(words: string[]): void {
    if (words.length <= 1) return
    if (this.getEngine() === 'edge') {
      const phrase = this.formatFullPhrase(words)
      edgeTtsService.prefetch(phrase)
    }
  }

  /**
   * Vocaliza a frase completa de forma contínua e fluida (sem pausas artificiais entre palavras),
   * sincronizando o destaque visual dos cartões em tempo real.
   */
  public async speakSequence(
    words: string[],
    onWordHighlight?: (index: number) => void,
    onComplete?: () => void
  ): Promise<void> {
    if (words.length === 0) {
      if (onWordHighlight) onWordHighlight(-1)
      if (onComplete) onComplete()
      return
    }

    this.stop()
    this.isSequenceCancelled = false

    // Se for apenas 1 palavra, vocaliza direto
    if (words.length === 1) {
      if (onWordHighlight) onWordHighlight(0)
      await this.speakWord(words[0])
      if (onWordHighlight) onWordHighlight(-1)
      if (onComplete) onComplete()
      return
    }

    const fullPhrase = this.formatFullPhrase(words)

    if (this.getEngine() === 'edge') {
      this.status = 'speaking'
      if (onWordHighlight) onWordHighlight(0)

      const windows = this.calculateWordProgressWindows(words)

      const success = await edgeTtsService.playAudio(
        fullPhrase,
        undefined,
        undefined,
        (progress) => {
          if (this.isSequenceCancelled || !onWordHighlight) return
          const activeIndex = this.findActiveWordIndex(progress, windows)
          onWordHighlight(activeIndex)
        }
      )

      if (success) {
        this.status = 'idle'
        if (onWordHighlight) onWordHighlight(-1)
        if (onComplete) onComplete()
        return
      }

      // Se falhou no Edge-TTS (offline sem cache prévio da frase), fallback para voz nativa
      console.warn('[SpeechService] Fallback de frase completa para motor nativo offline')
    }

    // Motor nativo: vocalização fluida com SpeechSynthesisUtterance
    this.speakSequenceNative(words, onWordHighlight, onComplete)
  }

  private async speakSequenceNative(
    words: string[],
    onWordHighlight?: (index: number) => void,
    onComplete?: () => void
  ): Promise<void> {
    if (!this.synth || words.length === 0) {
      if (onWordHighlight) onWordHighlight(-1)
      if (onComplete) onComplete()
      return
    }

    const fullSentence = this.formatFullPhrase(words)
    const utterance = new SpeechSynthesisUtterance(fullSentence)
    utterance.lang = APP_CONFIG.SPEECH_DEFAULT_LANG
    utterance.rate = APP_CONFIG.SPEECH_DEFAULT_RATE
    utterance.pitch = APP_CONFIG.SPEECH_DEFAULT_PITCH
    if (this.preferredNativeVoice) {
      utterance.voice = this.preferredNativeVoice
    }

    this.activeUtterance = utterance
    this.status = 'speaking'

    const wordBoundaries: { start: number; end: number; index: number }[] = []
    let cursor = 0
    for (let i = 0; i < words.length; i++) {
      const len = words[i].length
      wordBoundaries.push({ start: cursor, end: cursor + len, index: i })
      cursor += len + 1
    }

    let hasBoundaryFired = false
    let currentHighlightedIndex = 0
    if (onWordHighlight) onWordHighlight(0)

    utterance.onboundary = (event) => {
      hasBoundaryFired = true
      if (typeof event.charIndex === 'number' && onWordHighlight) {
        const found = wordBoundaries.find(
          (b) => event.charIndex >= b.start && event.charIndex <= b.end
        )
        if (found) {
          currentHighlightedIndex = found.index
          onWordHighlight(found.index)
        }
      }
    }

    const estimatedWordMs = Math.max(380, Math.round(2500 / words.length))
    this.highlightTimer = setInterval(() => {
      if (!hasBoundaryFired && this.status === 'speaking' && onWordHighlight) {
        currentHighlightedIndex++
        if (currentHighlightedIndex < words.length) {
          onWordHighlight(currentHighlightedIndex)
        }
      }
    }, estimatedWordMs)

    const finish = () => {
      if (this.highlightTimer) clearInterval(this.highlightTimer)
      if (this.resumeTimer) clearInterval(this.resumeTimer)
      this.status = 'idle'
      this.activeUtterance = null
      if (onWordHighlight) onWordHighlight(-1)
      if (onComplete) onComplete()
    }

    utterance.onend = () => finish()
    utterance.onerror = () => finish()

    this.synth.speak(utterance)
  }

  public async testEdgeVoice(
    voiceId: string,
    phrase: string = 'Olá! Esta é a voz de alta fidelidade para o aluno no CAPE.'
  ): Promise<boolean> {
    this.stop()
    return await edgeTtsService.playAudio(phrase, voiceId)
  }

  public testNativeVoice(
    voiceName: string,
    phrase: string = 'Olá! Esta é a voz do seu aparelho para o aluno.'
  ): void {
    this.stop()
    if (!this.synth) return
    const voices = this.synth.getVoices()
    const voice = voices.find((v) => v.name === voiceName) || this.preferredNativeVoice
    const utterance = new SpeechSynthesisUtterance(phrase)
    utterance.lang = APP_CONFIG.SPEECH_DEFAULT_LANG
    utterance.rate = APP_CONFIG.SPEECH_DEFAULT_RATE
    utterance.pitch = APP_CONFIG.SPEECH_DEFAULT_PITCH
    if (voice) utterance.voice = voice

    this.activeUtterance = utterance
    this.status = 'speaking'
    utterance.onend = () => {
      this.status = 'idle'
      this.activeUtterance = null
    }
    utterance.onerror = () => {
      this.status = 'idle'
      this.activeUtterance = null
    }

    if (this.synth.paused) {
      this.synth.resume()
    }
    this.synth.speak(utterance)
  }

  public testVoice(text: string = 'Olá! Esta é a voz de comunicação do CAPE.'): void {
    this.speakWord(text)
  }

  public stop(): void {
    this.isSequenceCancelled = true
    edgeTtsService.stop()
    if (this.highlightTimer) {
      clearInterval(this.highlightTimer)
      this.highlightTimer = null
    }
    if (this.resumeTimer) {
      clearInterval(this.resumeTimer)
      this.resumeTimer = null
    }
    if (this.synth) {
      this.synth.cancel()
    }
    this.activeUtterance = null
    this.status = 'idle'
  }
}

export const speechService = new SpeechService()
