import { describe, it, expect } from 'vitest'
import { scoreAnswer, summarizeQuiz, overtimePenaltyRate } from './scoring'
import { DIFFICULTIES } from '../config/quiz.config'
import type { Question, AnswerRecord } from '../types/quiz.types'

const sampleQuestion: Question = {
  id: 'q1',
  difficulty: 'beginner',
  prompt: 'Quanto é?',
  expression: '5 + 5 = ?',
  options: ['8', '10', '12', '15'],
  correctIndex: 1,
  explanation: '5 + 5 = 10'
}

describe('Quiz Scoring & Accessibility Rules', () => {
  it('configures extended timers for students with disabilities', () => {
    expect(DIFFICULTIES.beginner.timeLimitMs).toBe(45_000)
    expect(DIFFICULTIES.intermediate.timeLimitMs).toBe(60_000)
    expect(DIFFICULTIES.advanced.timeLimitMs).toBe(90_000)
  })

  it('awards half of base points (50%) when a question was retroceded', () => {
    const answer: AnswerRecord = {
      selectedIndex: 1,
      elapsedMs: 5_000,
      answeredAtMs: 5_000,
      wasRetroceded: true
    }

    const breakdown = scoreAnswer(sampleQuestion, answer, 'beginner')
    expect(breakdown.isCorrect).toBe(true)
    expect(breakdown.wasRetroceded).toBe(true)
    expect(breakdown.penaltyRate).toBe(0.5)
    expect(breakdown.speedBonus).toBe(0)
    expect(breakdown.finalPoints).toBe(50) // 50% of 100 basePoints
  })

  it('awards 0 points when retroceded question is answered wrong', () => {
    const answer: AnswerRecord = {
      selectedIndex: 0,
      elapsedMs: 5_000,
      answeredAtMs: 5_000,
      wasRetroceded: true
    }

    const breakdown = scoreAnswer(sampleQuestion, answer, 'beginner')
    expect(breakdown.isCorrect).toBe(false)
    expect(breakdown.finalPoints).toBe(0)
  })

  it('applies progressive 40% to 50% penalty on overtime answers without retrocede', () => {
    expect(overtimePenaltyRate(45_001, 45_000)).toBeCloseTo(0.4, 2)
    expect(overtimePenaltyRate(90_000, 45_000)).toBeCloseTo(0.5, 2)
  })

  it('summarizes quiz with retrocededCount and totalScore accurately', () => {
    const questions: Question[] = [sampleQuestion, { ...sampleQuestion, id: 'q2' }]
    const answers: AnswerRecord[] = [
      { selectedIndex: 1, elapsedMs: 10_000, answeredAtMs: 10_000, wasRetroceded: true },
      { selectedIndex: 1, elapsedMs: 45_000, answeredAtMs: 45_000, wasRetroceded: false }
    ]

    const summary = summarizeQuiz(questions, answers, 'beginner')
    expect(summary.correctCount).toBe(2)
    expect(summary.retrocededCount).toBe(1)
    expect(summary.totalScore).toBe(150) // 50 + 100
  })
})
