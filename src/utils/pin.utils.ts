import { APP_CONFIG } from '../constants/config.constants'

export interface MathChallenge {
  num1: number
  num2: number
  operation: '+' | 'x'
  expectedAnswer: number
  questionText: string
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
 * Valida se o PIN informado corresponde ao PIN cadastrado
 */
export function validatePin(inputPin: string, correctPin: string = APP_CONFIG.DEFAULT_PIN): boolean {
  return inputPin.trim() === correctPin.trim()
}
