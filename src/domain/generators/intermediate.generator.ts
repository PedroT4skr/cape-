import type { Question } from '../../types/quiz.types'
import { buildNumericOptions, pick, randInt, uid } from './random'

/** Intermediário: quatro operações misturadas e ordem das operações. */
function multiplication(): Question {
  const a = randInt(3, 12)
  const b = randInt(3, 12)
  const r = a * b
  return {
    id: uid('int'),
    difficulty: 'intermediate',
    prompt: 'Quanto é?',
    expression: `${a} × ${b} = ?`,
    ...buildNumericOptions(r, [a + b, r + a, r - b]),
    explanation: `${a} × ${b} = ${r}`
  }
}

function division(): Question {
  const b = randInt(2, 12)
  const r = randInt(2, 12)
  const a = b * r
  return {
    id: uid('int'),
    difficulty: 'intermediate',
    prompt: 'Quanto é?',
    expression: `${a} ÷ ${b} = ?`,
    ...buildNumericOptions(r, [a - b, r * 2]),
    explanation: `${b} × ${r} = ${a}, logo ${a} ÷ ${b} = ${r}`
  }
}

function orderOfOperations(): Question {
  const a = randInt(2, 20)
  const b = randInt(2, 9)
  const c = randInt(2, 9)
  const r = a + b * c
  const wrong = (a + b) * c
  return {
    id: uid('int'),
    difficulty: 'intermediate',
    prompt: 'Resolva respeitando a ordem das operações:',
    expression: `${a} + ${b} × ${c} = ?`,
    ...buildNumericOptions(r, [wrong]),
    explanation: `Multiplicação primeiro: ${b} × ${c} = ${b * c}; depois ${a} + ${b * c} = ${r}`
  }
}

function mixedStory(): Question {
  const boxes = randInt(3, 9)
  const perBox = randInt(4, 12)
  const eaten = randInt(1, perBox)
  const r = boxes * perBox - eaten
  return {
    id: uid('int'),
    difficulty: 'intermediate',
    prompt: `Há ${boxes} caixas com ${perBox} bombons cada. Pedro comeu ${eaten}. Quantos sobraram?`,
    ...buildNumericOptions(r, [boxes * perBox, boxes + perBox - eaten]),
    explanation: `${boxes} × ${perBox} = ${boxes * perBox}; ${boxes * perBox} − ${eaten} = ${r}`
  }
}

const builders = [multiplication, division, orderOfOperations, mixedStory]

export const generateIntermediate = (): Question => pick(builders)()
