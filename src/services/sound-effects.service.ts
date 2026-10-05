class SoundEffectsService {
  private audioCtx: AudioContext | null = null

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
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
   * Clique auditivo tátil suave de confirmação (40ms)
   */
  playTapSound(): void {
    try {
      const ctx = this.getAudioContext()
      if (!ctx) return

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(600, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04)

      gain.gain.setValueAtTime(0.15, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.05)
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

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(320, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.08)

      gain.gain.setValueAtTime(0.12, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.09)
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

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(350, ctx.currentTime)
      osc.frequency.setValueAtTime(300, ctx.currentTime + 0.08)

      gain.gain.setValueAtTime(0.10, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.21)
    } catch {
      // Falha silenciosa
    }
  }
}

export const soundEffects = new SoundEffectsService()
