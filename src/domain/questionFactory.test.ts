import { describe, it, expect } from 'vitest'
import { createQuestionSet } from './questionFactory'
import type { Difficulty } from '../types/quiz.types'

describe('Math Question Factory (Strict Single Discipline)', () => {
  const difficulties: Difficulty[] = ['beginner', 'intermediate', 'advanced']

  difficulties.forEach((diff) => {
    it(`generates 10 valid math questions for ${diff} difficulty`, () => {
      const questions = createQuestionSet(diff, 10)
      expect(questions).toHaveLength(10)

      questions.forEach((q) => {
        expect(q.prompt).toBeTruthy()
        expect(q.options).toHaveLength(4)
        expect(q.correctIndex).toBeGreaterThanOrEqual(0)
        expect(q.correctIndex).toBeLessThan(4)

        // Verify all 4 options are distinct (no duplicate answers)
        const uniqueOptions = new Set(q.options)
        expect(uniqueOptions.size).toBe(4)

        // Verify correct option is accessible
        const correctAnswer = q.options[q.correctIndex]
        expect(correctAnswer).toBeTruthy()
      })
    })
  })

  it('generates strictly addition/subtraction for beginner', () => {
    const questions = createQuestionSet('beginner', 20)
    questions.forEach((q) => {
      const full = `${q.prompt} ${q.expression ?? ''} ${q.explanation}`
      const hasAddOrSub =
        full.includes('+') ||
        full.includes('−') ||
        full.includes('-') ||
        full.includes('tinha')
      expect(hasAddOrSub).toBe(true)
    })
  })

  it('generates 4 basic operations for intermediate', () => {
    const questions = createQuestionSet('intermediate', 40)
    const allText = questions.map((q) => `${q.prompt} ${q.expression ?? ''} ${q.explanation}`).join(' ')
    const hasAddOrSub = allText.includes('+') || allText.includes('−')
    const hasMulOrDiv = allText.includes('×') || allText.includes('÷')

    expect(hasAddOrSub).toBe(true)
    expect(hasMulOrDiv).toBe(true)
  })

  it('generates high school algebra/powers/functions for advanced', () => {
    const questions = createQuestionSet('advanced', 20)
    questions.forEach((q) => {
      const fullText = `${q.prompt} ${q.expression ?? ''} ${q.explanation}`
      const isAdvancedMath =
        fullText.includes('x') ||
        fullText.includes('%') ||
        fullText.includes('^') ||
        fullText.includes('f(') ||
        fullText.includes('PA') ||
        fullText.includes('termo')
      expect(isAdvancedMath).toBe(true)
    })
  })
})
