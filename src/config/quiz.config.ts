import type { Difficulty } from '../types/quiz.types'

export interface DifficultyConfig {
  label: string
  description: string
  emoji: string
  timeLimitMs: number
  basePoints: number
  questionCount: number
  accent: string
}

export const DIFFICULTIES: Record<Difficulty, DifficultyConfig> = {
  beginner: {
    label: 'Iniciante',
    description: 'Somas e subtrações básicas',
    emoji: '🌱',
    timeLimitMs: 45_000,
    basePoints: 100,
    questionCount: 10,
    accent: '#22C55E'
  },
  intermediate: {
    label: 'Intermediário',
    description: 'As 4 operações misturadas',
    emoji: '⚡',
    timeLimitMs: 60_000,
    basePoints: 150,
    questionCount: 10,
    accent: '#F59E0B'
  },
  advanced: {
    label: 'Difícil',
    description: 'Equações, porcentagem, potências e funções',
    emoji: '🚀',
    timeLimitMs: 90_000,
    basePoints: 200,
    questionCount: 10,
    accent: '#A855F7'
  }
}

export const SCORING = {
  /** Bônus máximo de rapidez (fração dos pontos base) quando responde no prazo. */
  maxSpeedBonusRate: 0.5,
  /** Penalidade ao responder logo após o tempo zerar. */
  minOvertimePenalty: 0.4,
  /** Penalidade máxima, atingida após mais um ciclo completo do limite de tempo. */
  maxOvertimePenalty: 0.5,
  /** Penalidade fixa ao retroceder uma questão (metade da pontuação). */
  retrocedePenalty: 0.5
} as const

export const TIMER_TICK_MS = 250
export const LEADERBOARD_STORAGE_KEY = 'tdah-math-quiz:leaderboard:v1'
