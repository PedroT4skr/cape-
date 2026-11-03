import { APP_CONFIG } from '../constants/config.constants'

export const PIN_STORAGE_KEY = 'cape:admin:pin:v1'

export interface MathChallenge {
  num1: number
  num2: number
  operation: '+' | 'x'
  expectedAnswer: number
  questionText: string
}

/**
 * Retorna o PIN atualmente ativo (do localStorage ou o padrão 1234)
 */
export function getCurrentPin(): string {
  try {
    const savedPin = localStorage.getItem(PIN_STORAGE_KEY)
    if (savedPin && savedPin.trim().length >= 4) {
      return savedPin.trim()
    }
  } catch {
    // Caso de navegação anônima restrita
  }
  return APP_CONFIG.DEFAULT_PIN
}

/**
 * Define um novo PIN personalizado
 */
export function setCustomPin(newPin: string): boolean {
  const sanitized = newPin.trim()
  if (!/^\d{4,8}$/.test(sanitized)) {
    return false
  }
  try {
    localStorage.setItem(PIN_STORAGE_KEY, sanitized)
    return true
  } catch {
    return false
  }
}

/**
 * Restaura o PIN para o padrão de fábrica do CAPE (1234)
 */
export function resetPinToDefault(): void {
  try {
    localStorage.removeItem(PIN_STORAGE_KEY)
  } catch {
    // Ignora erro
  }
}

/**
 * Gera um desafio cognitivo simples para barreira de acesso do educador/terapeuta
 */
export function generateMathChallenge(): MathChallenge {
  const isMultiply = Math.random() > 0.5
  if (isMultiply) {
    const num1 = Math.floor(Math.random() * 4) + 2 // 2 a 5
    const num2 = Math.floor(Math.random() * 4) + 2 // 2 a 5
    return {
      num1,
      num2,
      operation: 'x',
      expectedAnswer: num1 * num2,
      questionText: `Quanto é ${num1} × ${num2}?`
    }
  } else {
    const num1 = Math.floor(Math.random() * 8) + 3 // 3 a 10
    const num2 = Math.floor(Math.random() * 8) + 2 // 2 a 9
    return {
      num1,
      num2,
      operation: '+',
      expectedAnswer: num1 + num2,
      questionText: `Quanto é ${num1} + ${num2}?`
    }
  }
}

/**
 * Valida se o PIN informado corresponde ao PIN ativo do sistema
 */
export function validatePin(inputPin: string, correctPin: string = getCurrentPin()): boolean {
  return inputPin.trim() === correctPin.trim()
}
