import type {
  ActivityCategoryId,
  ActivityDefinition,
  ActivityOption,
  ActivityQuestion
} from '../../types/activity.types'

export function numOpts(correct: number, alts: [number, number], emoji: string): ActivityOption[] {
  const vals = [alts[0], correct, alts[1]].sort((a, b) => a - b)
  return vals.map((v, idx) => ({
    id: `opt_${idx + 1}`,
    label: String(v),
    numericValue: v,
    emojiVisual: v <= 6 ? emoji.repeat(v) : `${emoji} (${v})`,
    isCorrect: v === correct
  }))
}

export function textOpts(
  correct: string,
  alt1: string,
  alt2: string,
  pos: 0 | 1 | 2 = 0
): ActivityOption[] {
  const arr = [alt1, alt2]
  arr.splice(pos, 0, correct)
  return arr.map((label, idx) => ({
    id: `opt_${idx + 1}`,
    label,
    isCorrect: label === correct
  }))
}

export function visOpts(
  correct: { label: string; emoji: string },
  a1: { label: string; emoji: string },
  a2: { label: string; emoji: string },
  pos: 0 | 1 | 2 = 0
): ActivityOption[] {
  const arr = [a1, a2]
  arr.splice(pos, 0, correct)
  return arr.map((o, idx) => ({
    id: `opt_${idx + 1}`,
    label: o.label,
    emojiVisual: o.emoji,
    isCorrect: o.label === correct.label
  }))
}

export interface ActivitySeedSpec {
  id: string
  categoryId: ActivityCategoryId
  title: string
  subtitle: string
  methodology: string
  emoji: string
  badgeColor: string
  description: string
  tags: string[]
  evidenceId: string
  order: number
  questions: ActivityQuestion[]
}

export function buildActivity(spec: ActivitySeedSpec): ActivityDefinition {
  return {
    ...spec,
    isEnabled: true,
    isBuiltIn: true,
    updatedAt: 0
  }
}

export function qCount(
  levelId: string,
  id: string,
  prompt: string,
  ttsPrompt: string,
  emoji: string,
  count: number,
  label: string,
  alts: [number, number]
): ActivityQuestion {
  return {
    id,
    levelId,
    type: 'count',
    prompt,
    ttsPrompt,
    items: { emoji, count, label },
    options: numOpts(count, alts, emoji)
  }
}

export function qAdd(
  levelId: string,
  id: string,
  prompt: string,
  ttsPrompt: string,
  emoji: string,
  cA: number,
  lA: string,
  cB: number,
  lB: string,
  alts: [number, number]
): ActivityQuestion {
  return {
    id,
    levelId,
    type: 'addition',
    prompt,
    ttsPrompt,
    groupA: { emoji, count: cA, label: lA },
    groupB: { emoji, count: cB, label: lB },
    options: numOpts(cA + cB, alts, emoji)
  }
}

export function qComp(
  levelId: string,
  id: string,
  prompt: string,
  ttsPrompt: string,
  targetComparison: 'more' | 'less',
  emoji: string,
  cL: number,
  lL: string,
  cR: number,
  lR: string
): ActivityQuestion {
  const leftWins = targetComparison === 'more' ? cL >= cR : cL <= cR
  return {
    id,
    levelId,
    type: 'comparison',
    prompt,
    ttsPrompt,
    targetComparison,
    optionLeft: { emoji, count: cL, label: lL },
    optionRight: { emoji, count: cR, label: lR },
    options: [
      { id: 'left', label: 'ESQUERDA', emojiVisual: `${emoji} (${cL})`, isCorrect: leftWins },
      { id: 'right', label: 'DIREITA', emojiVisual: `${emoji} (${cR})`, isCorrect: !leftWins }
    ]
  }
}

export function qLetter(
  levelId: string,
  id: string,
  prompt: string,
  ttsPrompt: string,
  emoji: string,
  word: string,
  highlight: string,
  displayWord: string,
  alts: [string, string],
  pos: 0 | 1 | 2 = 0
): ActivityQuestion {
  return {
    id,
    levelId,
    type: 'initial_letter',
    prompt,
    ttsPrompt,
    targetItem: { emoji, word, displayWord, highlight },
    options: textOpts(highlight, alts[0], alts[1], pos)
  }
}

export function qSyllable(
  levelId: string,
  id: string,
  prompt: string,
  ttsPrompt: string,
  emoji: string,
  word: string,
  highlight: string,
  displayWord: string,
  alts: [string, string],
  pos: 0 | 1 | 2 = 0
): ActivityQuestion {
  return {
    id,
    levelId,
    type: 'syllables',
    prompt,
    ttsPrompt,
    targetItem: { emoji, word, displayWord, highlight },
    options: textOpts(highlight, alts[0], alts[1], pos)
  }
}

export function qWord(
  levelId: string,
  id: string,
  prompt: string,
  ttsPrompt: string,
  emoji: string,
  word: string,
  alts: [string, string],
  hintBadge?: string,
  pos: 0 | 1 | 2 = 0
): ActivityQuestion {
  return {
    id,
    levelId,
    type: 'word_match',
    prompt,
    ttsPrompt,
    targetItem: { emoji, word, hintBadge },
    options: textOpts(word, alts[0], alts[1], pos)
  }
}

export function qMatch(
  levelId: string,
  id: string,
  type: 'color_match' | 'shape_match',
  prompt: string,
  ttsPrompt: string,
  modelEmoji: string,
  modelLabel: string,
  correct: { label: string; emoji: string },
  a1: { label: string; emoji: string },
  a2: { label: string; emoji: string },
  opts?: { modelColor?: string; badgeText?: string; guidanceText?: string; pos?: 0 | 1 | 2 }
): ActivityQuestion {
  return {
    id,
    levelId,
    type,
    prompt,
    ttsPrompt,
    visualTarget: {
      modelEmoji,
      modelLabel,
      modelColor: opts?.modelColor,
      badgeText: opts?.badgeText,
      guidanceText: opts?.guidanceText
    },
    options: visOpts(correct, a1, a2, opts?.pos ?? 0)
  }
}

export function qRoutine(
  levelId: string,
  id: string,
  prompt: string,
  ttsPrompt: string,
  modelLabel: string,
  steps: { emoji: string; label: string }[],
  correct: { label: string; emoji: string },
  a1: { label: string; emoji: string },
  a2: { label: string; emoji: string },
  pos: 0 | 1 | 2 = 0
): ActivityQuestion {
  return {
    id,
    levelId,
    type: 'routine_sequence',
    prompt,
    ttsPrompt,
    visualTarget: {
      modelEmoji: '⏳',
      modelLabel,
      sequenceSteps: steps,
      missingStepIndex: steps.length
    },
    options: visOpts(correct, a1, a2, pos)
  }
}
