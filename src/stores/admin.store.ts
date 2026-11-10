import { writable } from 'svelte/store'
import { generateMathChallenge, validatePin, type MathChallenge } from '../utils/pin.utils'

export type AdminTab = 'boards' | 'system'
export type AdminReturnTarget = 'hub' | 'board'

export const isPinModalOpen = writable<boolean>(false)
export const isAdminDashboardOpen = writable<boolean>(false)
export const adminActiveTab = writable<AdminTab>('system')
export const adminReturnTarget = writable<AdminReturnTarget>('board')
export const currentChallenge = writable<MathChallenge>(generateMathChallenge())
export const authError = writable<string | null>(null)

export function openAdminLock(initialTab: AdminTab = 'system', returnTarget: AdminReturnTarget = 'board'): void {
  authError.set(null)
  adminActiveTab.set(initialTab)
  adminReturnTarget.set(returnTarget)
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
