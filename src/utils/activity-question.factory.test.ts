import { describe, it, expect } from 'vitest'
import {
  QUESTION_TYPE_OPTIONS,
  createDefaultActivityDraft,
  createDefaultQuestionForType,
  generateSmartNumericOptions,
  generateSmartLetterOptions,
  cloneActivityAsCustom,
  validateActivityDefinition
} from './activity-question.factory'

describe('Activity Question Factory & Validation', () => {
  it('generates valid smart numeric options containing the exact target', () => {
    const opts = generateSmartNumericOptions(5, '⭐')
    expect(opts).toHaveLength(3)
    const correct = opts.filter((o) => o.isCorrect)
    expect(correct).toHaveLength(1)
    expect(correct[0].numericValue).toBe(5)
    expect(correct[0].emojiVisual).toBe('⭐⭐⭐⭐⭐')
  })

  it('caps emoji repetition cleanly above 6 items', () => {
    const opts = generateSmartNumericOptions(9, '🍎')
    const correct = opts.find((o) => o.isCorrect)
    expect(correct?.emojiVisual).toBe('🍎 (9)')
  })

  it('generates 3 distinct uppercase letters for initial letter questions', () => {
    const opts = generateSmartLetterOptions('c')
    expect(opts).toHaveLength(3)
    expect(new Set(opts.map((o) => o.label)).size).toBe(3)
    expect(opts.find((o) => o.isCorrect)?.label).toBe('C')
  })

  it('builds valid default questions for every supported template type', () => {
    for (const meta of QUESTION_TYPE_OPTIONS) {
      const q = createDefaultQuestionForType('test_act', meta.type)
      const draft = createDefaultActivityDraft('dyscalculia')
      draft.questions = [q]
      expect(validateActivityDefinition(draft)).toBeNull()
    }
  })

  it('clones an activity as an editable custom copy with fresh IDs', () => {
    const base = createDefaultActivityDraft('literacy')
    base.isBuiltIn = true
    const copy = cloneActivityAsCustom(base)

    expect(copy.id).not.toBe(base.id)
    expect(copy.isBuiltIn).toBe(false)
    expect(copy.title).toContain('(Cópia)')
    expect(copy.questions[0].id).not.toBe(base.questions[0].id)
    expect(copy.questions[0].levelId).toBe(copy.id)
  })

  it('rejects invalid activities lacking title, questions, or correct answers', () => {
    const draft = createDefaultActivityDraft('daily_logic')
    expect(validateActivityDefinition({ ...draft, title: '  ' })).not.toBeNull()
    expect(validateActivityDefinition({ ...draft, questions: [] })).not.toBeNull()

    const noCorrect = createDefaultActivityDraft('daily_logic')
    noCorrect.questions[0].options.forEach((o) => (o.isCorrect = false))
    expect(validateActivityDefinition(noCorrect)).not.toBeNull()
  })
})
