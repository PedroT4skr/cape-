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
import { INITIAL_ACTIVITY_BANK } from '../constants/curriculum/activity-bank.seed'
import { BASE_ACTIVITY_CATEGORIES } from '../constants/curriculum/activity-categories.constants'
import { EVIDENCE_MAP, resolveActivityEvidence } from '../constants/curriculum/evidence-references.constants'

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

  it('provides 50 valid built-in activities (10 per category) backed by verified evidence references', () => {
    expect(BASE_ACTIVITY_CATEGORIES).toHaveLength(5)
    expect(INITIAL_ACTIVITY_BANK).toHaveLength(50)

    for (const cat of BASE_ACTIVITY_CATEGORIES) {
      const catActs = INITIAL_ACTIVITY_BANK.filter((a) => a.categoryId === cat.id)
      expect(catActs).toHaveLength(10)
    }

    const ids = new Set<string>()
    for (const act of INITIAL_ACTIVITY_BANK) {
      expect(ids.has(act.id)).toBe(false)
      ids.add(act.id)
      expect(validateActivityDefinition(act)).toBeNull()
      expect(act.evidenceId).toBeTruthy()
      expect(EVIDENCE_MAP[act.evidenceId!]).toBeDefined()
      const ref = resolveActivityEvidence(act.evidenceId, act.categoryId)
      expect(ref.docUrl).toMatch(/^https:\/\//)
      expect(ref.citation.length).toBeGreaterThan(15)
    }
  })
})
