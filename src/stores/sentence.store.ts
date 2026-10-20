import { writable, get } from 'svelte/store'
import type { Cell, SentenceItem } from '../types/board.types'
import { soundEffects } from '../services/sound-effects.service'
import { speechService } from '../services/speech.service'

export const sentenceItems = writable<SentenceItem[]>([])
export const activeHighlightIndex = writable<number>(-1)
export const isSpeaking = writable<boolean>(false)

// Registros de controle para proteção anti-spam e espasmos motores
let lastAddedTimestamp = 0
let lastAddedLabel = ''

/**
 * Adiciona uma palavra/célula à Barra de Sentença com proteção anti-spam,
 * prevenindo repetições acidentais decorrentes de tremores ou impulsividade.
 */
export function addCellToSentence(cell: Cell): void {
  const now = Date.now()
  const cellLabel = cell.label.trim().toUpperCase()

  // 1. Proteção Anti-Spam de palavra duplicada (cooldown de 1000ms para a mesma tecla)
  if (cellLabel === lastAddedLabel && now - lastAddedTimestamp < 1000) {
    return
  }

  // 2. Proteção contra toques simultâneos acidentais (mão espalmada / múltiplos dedos: 250ms)
  if (now - lastAddedTimestamp < 250) {
    return
  }

  lastAddedTimestamp = now
  lastAddedLabel = cellLabel

  soundEffects.playTapSound()

  const textToSpeak = cell.audioText || cell.label
  speechService.speakWord(textToSpeak)

  const newItem: SentenceItem = {
    id: `${cell.id}-${now}-${Math.random().toString(36).substring(2, 6)}`,
    label: cell.label,
    category: cell.category,
    emoji: cell.emoji,
    iconName: cell.iconName,
    iconSvg: cell.iconSvg,
    audioText: textToSpeak,
    customStyle: cell.customStyle,
    addedAt: now
  }

  sentenceItems.update((items) => {
    const next = [...items, newItem]
    // Pré-carregamento assíncrono da frase combinada no IndexedDB para latência zero no clique de reprodução
    if (next.length > 1) {
      const words = next.map((i) => i.audioText || i.label)
      speechService.prefetchPhrase(words)
    }
    return next
  })
}

/**
 * Remove a última palavra da Barra de Sentença (Backspacing cognitivo)
 */
export function removeLastWord(): void {
  soundEffects.playClearSound()
  sentenceItems.update((items) => {
    const next = items.slice(0, -1)
    lastAddedLabel = next.length > 0 ? next[next.length - 1].label.trim().toUpperCase() : ''
    lastAddedTimestamp = Date.now()
    if (next.length > 1) {
      const words = next.map((i) => i.audioText || i.label)
      speechService.prefetchPhrase(words)
    }
    return next
  })
}

/**
 * Limpa completamente a Barra de Sentença
 */
export function clearSentence(): void {
  soundEffects.playClearSound()
  speechService.stop()
  lastAddedTimestamp = 0
  lastAddedLabel = ''
  sentenceItems.set([])
  activeHighlightIndex.set(-1)
  isSpeaking.set(false)
}

/**
 * Vocaliza a frase completa da esquerda para a direita com entonação contínua
 */
export function speakSentence(): void {
  const items = get(sentenceItems)
  if (items.length === 0) return

  isSpeaking.set(true)
  const words = items.map((i) => i.audioText || i.label)

  speechService.speakSequence(
    words,
    (index) => activeHighlightIndex.set(index),
    () => {
      isSpeaking.set(false)
      activeHighlightIndex.set(-1)
    }
  )
}
