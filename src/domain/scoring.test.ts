import { describe, it, expect } from 'vitest'
import {
  overtimePenaltyRate,
  speedBonus,
  scoreAnswer,
  summarizeQuiz
} from './scoring'
import { DIFFICULTIES, SCORING } from '../config/quiz.config'
import type { Question, AnswerRecord } from '../types/quiz.types'

const dummyQuestion: Question = {
  id: 'q1',
  difficulty: 'beginner',
  prompt: '5 + 3 = ?',
  options: ['6', '7', '8', '9'],
  correctIndex: 2,
  explanation: '5 + 3 = 8'
}

describe('Scoring Logic with ADHD Time & Penalty Rules', () => {
  it('awards base score + speed bonus for on-time correct answers', () => {
    // 20s limit (20,000ms), answered at 5,000ms
    const timeLimitMs = DIFFICULTIES.beginner.timeLimitMs
    const basePoints = DIFFICULTIES.beginner.basePoints
    const answer: AnswerRecord = {
      selectedIndex: 2,
      elapsedMs: 5000,
      answeredAtMs: 5000
    }

    const breakdown = scoreAnswer(dummyQuestion, answer, 'beginner')

    expect(breakdown.isCorrect).toBe(true)
    expect(breakdown.isOvertime).toBe(false)
    expect(breakdown.penaltyRate).toBe(0)
    expect(breakdown.speedBonus).toBeGreaterThan(0)
    expect(breakdown.finalPoints).toBe(basePoints + breakdown.speedBonus)
  })

  it('applies 40% penalty immediately when timer zeroes out', () => {
    const timeLimitMs = DIFFICULTIES.beginner.timeLimitMs
    const penaltyRate = overtimePenaltyRate(timeLimitMs + 100, timeLimitMs)

    // Should be at least 40%
    expect(penaltyRate).toBeGreaterThanOrEqual(SCORING.minOvertimePenalty)
    expect(penaltyRate).toBeLessThanOrEqual(SCORING.maxOvertimePenalty)

    const answer: AnswerRecord = {
      selectedIndex: 2,
      elapsedMs: timeLimitMs + 100,
      answeredAtMs: timeLimitMs + 100
    }

    const breakdown = scoreAnswer(dummyQuestion, answer, 'beginner')
    expect(breakdown.isCorrect).toBe(true)
    expect(breakdown.isOvertime).toBe(true)
    expect(breakdown.speedBonus).toBe(0)
    // 100 base * (1 - 0.4) = ~60
    expect(breakdown.finalPoints).toBeLessThanOrEqual(60)
    expect(breakdown.finalPoints).toBeGreaterThanOrEqual(50)
  })

  it('caps penalty at 50% even if the student takes longer', () => {
    const timeLimitMs = DIFFICULTIES.beginner.timeLimitMs
    // 3x time limit
    const penaltyRate = overtimePenaltyRate(timeLimitMs * 3, timeLimitMs)
    expect(penaltyRate).toBe(SCORING.maxOvertimePenalty) // exactly 0.5 (50%)

    const answer: AnswerRecord = {
      selectedIndex: 2,
      elapsedMs: timeLimitMs * 3,
      answeredAtMs: timeLimitMs * 3
    }

    const breakdown = scoreAnswer(dummyQuestion, answer, 'beginner')
    expect(breakdown.finalPoints).toBe(50) // 100 * (1 - 0.5) = 50
  })

  it('awards 0 points on wrong answer regardless of time or overtime', () => {
    const onTimeWrong: AnswerRecord = {
      selectedIndex: 0,
      elapsedMs: 3000,
      answeredAtMs: 3000
    }
    const breakdown1 = scoreAnswer(dummyQuestion, onTimeWrong, 'beginner')
    expect(breakdown1.isCorrect).toBe(false)
    expect(breakdown1.finalPoints).toBe(0)

    const overtimeWrong: AnswerRecord = {
      selectedIndex: 0,
      elapsedMs: 25000,
      answeredAtMs: 25000
    }
    const breakdown2 = scoreAnswer(dummyQuestion, overtimeWrong, 'beginner')
    expect(breakdown2.isCorrect).toBe(false)
    expect(breakdown2.finalPoints).toBe(0)
  })

  it('summarizes a full quiz session correctly', () => {
    const questions: Question[] = [
      dummyQuestion,
      { ...dummyQuestion, id: 'q2', prompt: '10 - 4 = ?', correctIndex: 1, options: ['5', '6', '7', '8'] },
      { ...dummyQuestion, id: 'q3', prompt: '2 + 2 = ?', correctIndex: 0, options: ['4', '5', '6', '7'] }
    ]

    const answers: AnswerRecord[] = [
      { selectedIndex: 2, elapsedMs: 5000, answeredAtMs: 5000 }, // correct, on-time
      { selectedIndex: 1, elapsedMs: 25000, answeredAtMs: 25000 }, // correct, overtime (penalty)
      { selectedIndex: 1, elapsedMs: 4000, answeredAtMs: 4000 } // wrong
    ]

    const summary = summarizeQuiz(questions, answers, 'beginner')
    expect(summary.breakdowns).toHaveLength(3)
    expect(summary.correctCount).toBe(2)
    expect(summary.overtimeCount).toBe(1)
    expect(summary.totalScore).toBeGreaterThan(0)
  })
})
