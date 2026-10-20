import { writable } from 'svelte/store'
import { generateMathChallenge, validatePin, type MathChallenge } from '../utils/pin.utils'

export const isPinModalOpen = writable<boolean>(false)
export const isAdminDashboardOpen = writable<boolean>(false)
export const currentChallenge = writable<MathChallenge>(generateMathChallenge())
export const authError = writable<string | null>(null)

export function openAdminLock(): void {
  authError.set(null)
  isPinModalOpen.set(true)
}

export function closeAdminLock(): void {
  isPinModalOpen.set(false)
  authError.set(null)
}

export function verifyPin(inputValue: string): boolean {
  authError.set(null)
  const isPinValid = validatePin(inputValue)
  if (isPinValid) {
    isPinModalOpen.set(false)
    isAdminDashboardOpen.set(true)
    return true
  }

  authError.set('PIN incorreto. Tente novamente.')
  return false
}

// Mantido para compatibilidade retroativa
export const verifyPinOrChallenge = verifyPin

export function closeAdminDashboard(): void {
  isAdminDashboardOpen.set(false)
}
