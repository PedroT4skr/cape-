import { DIFFICULTIES, SCORING } from '../config/quiz.config'
import type { AnswerRecord, Difficulty, Question, ScoreBreakdown } from '../types/quiz.types'

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

/**
 * Penalidade progressiva de 40% → 50%.
 * Começa em 40% no instante em que o tempo zera e cresce linearmente
 * até 50% quando o aluno ultrapassa o limite em mais um ciclo completo.
 */
export function overtimePenaltyRate(answeredAtMs: number, timeLimitMs: number): number {
  if (answeredAtMs <= timeLimitMs) return 0
  const overflow = clamp((answeredAtMs - timeLimitMs) / timeLimitMs, 0, 1)
  const { minOvertimePenalty: min, maxOvertimePenalty: max } = SCORING
  return min + (max - min) * overflow
}

/** Bônus de rapidez proporcional ao tempo restante (somente dentro do prazo). */
export function speedBonus(answeredAtMs: number, timeLimitMs: number, basePoints: number): number {
  if (answeredAtMs > timeLimitMs) return 0
  const remainingRatio = 1 - answeredAtMs / timeLimitMs
  return Math.round(basePoints * SCORING.maxSpeedBonusRate * remainingRatio)
}

export function scoreAnswer(question: Question, answer: AnswerRecord, difficulty: Difficulty): ScoreBreakdown {
  const { basePoints, timeLimitMs } = DIFFICULTIES[difficulty]
  const answeredAt = answer.answeredAtMs ?? Number.POSITIVE_INFINITY
  const isCorrect = answer.selectedIndex === question.correctIndex
  const isOvertime = answeredAt > timeLimitMs
  const wasRetroceded = Boolean(answer.wasRetroceded)

  if (!isCorrect) {
    return { isCorrect, isOvertime, wasRetroceded, basePoints: 0, speedBonus: 0, penaltyRate: 0, finalPoints: 0 }
  }

  // Se o aluno retrocedeu a questão, recebe exatamente metade da pontuação base (50%), sem bônus de velocidade
  if (wasRetroceded) {
    const penaltyRate = SCORING.retrocedePenalty
    const finalPoints = Math.round(basePoints * (1 - penaltyRate))
    return {
      isCorrect,
      isOvertime,
      wasRetroceded: true,
      basePoints,
      speedBonus: 0,
      penaltyRate,
      finalPoints
    }
  }

  const bonus = speedBonus(answeredAt, timeLimitMs, basePoints)
  const penaltyRate = overtimePenaltyRate(answeredAt, timeLimitMs)
  const finalPoints = Math.round((basePoints + bonus) * (1 - penaltyRate))

  return { isCorrect, isOvertime, wasRetroceded: false, basePoints, speedBonus: bonus, penaltyRate, finalPoints }
}

export interface QuizSummary {
  breakdowns: ScoreBreakdown[]
  totalScore: number
  correctCount: number
  overtimeCount: number
  retrocededCount: number
}

export function summarizeQuiz(questions: Question[], answers: AnswerRecord[], difficulty: Difficulty): QuizSummary {
  const breakdowns = questions.map((q, i) => scoreAnswer(q, answers[i], difficulty))
  return {
    breakdowns,
    totalScore: breakdowns.reduce((sum, b) => sum + b.finalPoints, 0),
    correctCount: breakdowns.filter((b) => b.isCorrect).length,
    overtimeCount: breakdowns.filter((b) => b.isCorrect && b.isOvertime).length,
    retrocededCount: breakdowns.filter((b) => b.isCorrect && b.wasRetroceded).length
  }
}
