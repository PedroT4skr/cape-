import { DIFFICULTIES } from '../config/quiz.config'
import type { Difficulty, Question } from '../types/quiz.types'
import { generateAdvanced } from './generators/advanced.generator'
import { generateBeginner } from './generators/beginner.generator'
import { generateIntermediate } from './generators/intermediate.generator'

const GENERATORS: Record<Difficulty, () => Question> = {
  beginner: generateBeginner,
  intermediate: generateIntermediate,
  advanced: generateAdvanced
}

/** Monta uma rodada sem enunciados repetidos. */
export function createQuestionSet(difficulty: Difficulty, count = DIFFICULTIES[difficulty].questionCount): Question[] {
  const seen = new Set<string>()
  const questions: Question[] = []
  let guard = 0
  while (questions.length < count && guard++ < count * 20) {
    const q = GENERATORS[difficulty]()
    const key = `${q.prompt}|${q.expression ?? ''}`
    if (seen.has(key)) continue
    seen.add(key)
    questions.push(q)
  }
  return questions
}
