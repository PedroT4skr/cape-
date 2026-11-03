class SoundEffectsService {
  private audioCtx: AudioContext | null = null

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (!this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass()
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {})
    }
    return this.audioCtx
  }

  /**
   * Clique auditivo tátil moderno e agradável (pop/click de 35ms)
   */
  playTapSound(): void {
    try {
      const ctx = this.getAudioContext()
      if (!ctx) return

      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      // Pop acústico moderno com pitch drop rápido
      osc.type = 'sine'
      osc.frequency.setValueAtTime(520, now)
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.035)

      // Envelope com ataque instantâneo e decaimento exponencial
      gain.gain.setValueAtTime(0.18, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.04)
    } catch {
      // Falha silenciosa caso áudio esteja indisponível
    }
  }

  /**
   * Som de clique alternativo com tom ligeiramente mais alto para ações primárias / confirmação
   */
  playActionSound(): void {
    try {
      const ctx = this.getAudioContext()
      if (!ctx) return

      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(650, now)
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.045)

      gain.gain.setValueAtTime(0.16, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.05)
    } catch {
      // Falha silenciosa
    }
  }

  /**
   * Som suave para ação de remoção / limpeza
   */
  playClearSound(): void {
    try {
      const ctx = this.getAudioContext()
      if (!ctx) return

      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(320, now)
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.08)

      gain.gain.setValueAtTime(0.12, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.09)
    } catch {
      // Falha silenciosa
    }
  }

  /**
   * Arpejo suave e harmonioso de acerto para reforço positivo
   */
  playSuccessChime(): void {
    try {
      const ctx = this.getAudioContext()
      if (!ctx) return

      const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
      const now = ctx.currentTime

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.08)

        gain.gain.setValueAtTime(0.15, now + idx * 0.08)
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now + idx * 0.08)
        osc.stop(now + idx * 0.08 + 0.26)
      })
    } catch {
      // Falha silenciosa
    }
  }

  /**
   * Som sutil e neutro para nova tentativa (sem efeito punitivo)
   */
  playGentleRetry(): void {
    try {
      const ctx = this.getAudioContext()
      if (!ctx) return

      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(350, now)
      osc.frequency.setValueAtTime(300, now + 0.08)

      gain.gain.setValueAtTime(0.10, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.21)
    } catch {
      // Falha silenciosa
    }
  }
}

export const soundEffects = new SoundEffectsService()
