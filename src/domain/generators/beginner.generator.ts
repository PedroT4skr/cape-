import type { Question } from '../../types/quiz.types'
import { buildNumericOptions, pick, randInt, uid } from './random'

/** Iniciante: soma e subtração com resultados não-negativos. */
function addition(): Question {
  const a = randInt(2, 30)
  const b = randInt(2, 30)
  const r = a + b
  return {
    id: uid('beg'),
    difficulty: 'beginner',
    prompt: 'Quanto é?',
    expression: `${a} + ${b} = ?`,
    ...buildNumericOptions(r, [Math.abs(a - b)]),
    explanation: `${a} + ${b} = ${r}`
  }
}

function subtraction(): Question {
  const a = randInt(10, 50)
  const b = randInt(1, a)
  const r = a - b
  return {
    id: uid('beg'),
    difficulty: 'beginner',
    prompt: 'Quanto é?',
    expression: `${a} − ${b} = ?`,
    ...buildNumericOptions(r, [a + b]),
    explanation: `${a} − ${b} = ${r}`
  }
}

function missingTerm(): Question {
  const a = randInt(3, 20)
  const r = randInt(a + 1, 40)
  const missing = r - a
  return {
    id: uid('beg'),
    difficulty: 'beginner',
    prompt: 'Qual número completa a conta?',
    expression: `${a} + ? = ${r}`,
    ...buildNumericOptions(missing, [r + a]),
    explanation: `${r} − ${a} = ${missing}, então ${a} + ${missing} = ${r}`
  }
}

function storyProblem(): Question {
  const item = pick(['figurinhas', 'balas', 'lápis', 'moedas'])
  const has = randInt(8, 30)
  const gave = randInt(1, has - 1)
  const r = has - gave
  return {
    id: uid('beg'),
    difficulty: 'beginner',
    prompt: `Ana tinha ${has} ${item} e deu ${gave} para o amigo. Com quantas ficou?`,
    ...buildNumericOptions(r, [has + gave]),
    explanation: `${has} − ${gave} = ${r} ${item}`
  }
}

const builders = [addition, addition, subtraction, subtraction, missingTerm, storyProblem]

export const generateBeginner = (): Question => pick(builders)()
