export interface VoiceConfig {
  rate: number
  pitch: number
  volume: number
  lang: string
}

export type PlaybackStatus = 'idle' | 'speaking' | 'paused' | 'error'
