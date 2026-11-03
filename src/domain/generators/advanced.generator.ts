import type { Question } from '../../types/quiz.types'
import { buildNumericOptions, buildTextOptions, pick, randInt, uid } from './random'

/** Difícil: conteúdos de ensino médio (equações, %, potências, PA, funções). */
function linearEquation(): Question {
  const x = randInt(-9, 12)
  const a = pick([2, 3, 4, 5, 6])
  const b = randInt(-15, 20)
  const c = a * x + b
  const bStr = b >= 0 ? `+ ${b}` : `− ${Math.abs(b)}`
  return {
    id: uid('adv'),
    difficulty: 'advanced',
    prompt: 'Encontre o valor de x:',
    expression: `${a}x ${bStr} = ${c}`,
    ...buildTextOptions(`x = ${x}`, [`x = ${-x || x + 3}`, `x = ${x + 1}`, `x = ${c - b}`, `x = ${x - 2}`]),
    explanation: `${a}x = ${c} ${b >= 0 ? '−' : '+'} ${Math.abs(b)} = ${c - b} → x = ${x}`
  }
}

function percentage(): Question {
  const p = pick([10, 15, 20, 25, 30, 40, 50, 75])
  const base = pick([40, 60, 80, 120, 200, 240, 360, 400])
  const r = Math.round((p * base) / 100)
  return {
    id: uid('adv'),
    difficulty: 'advanced',
    prompt: 'Calcule a porcentagem:',
    expression: `${p}% de ${base} = ?`,
    ...buildNumericOptions(r, [base - r, p + base / 10, r * 2]),
    explanation: `${p}/100 × ${base} = ${r}`
  }
}

function power(): Question {
  const b = randInt(2, 6)
  const e = randInt(2, b <= 3 ? 5 : 3)
  const r = b ** e
  return {
    id: uid('adv'),
    difficulty: 'advanced',
    prompt: 'Calcule a potência:',
    expression: `${b}^${e} = ?`,
    ...buildNumericOptions(r, [b * e, r + b, b ** (e - 1)]),
    explanation: `${b} multiplicado ${e} vezes = ${r}`
  }
}

function arithmeticProgression(): Question {
  const a1 = randInt(1, 10)
  const r = randInt(2, 7)
  const n = randInt(6, 12)
  const an = a1 + (n - 1) * r
  return {
    id: uid('adv'),
    difficulty: 'advanced',
    prompt: `Na PA (${a1}, ${a1 + r}, ${a1 + 2 * r}, …), qual é o ${n}º termo?`,
    ...buildNumericOptions(an, [a1 + n * r, an - r]),
    explanation: `aₙ = a₁ + (n − 1)·r = ${a1} + ${n - 1}·${r} = ${an}`
  }
}

function affineFunction(): Question {
  const a = randInt(2, 6)
  const b = randInt(-8, 8)
  const x = randInt(-4, 6)
  const r = a * x + b
  const bStr = b >= 0 ? `+ ${b}` : `− ${Math.abs(b)}`
  return {
    id: uid('adv'),
    difficulty: 'advanced',
    prompt: `Dada f(x) = ${a}x ${bStr}, quanto vale f(${x})?`,
    ...buildNumericOptions(r, [a + x + b, a * x - b], true),
    explanation: `f(${x}) = ${a}·(${x}) ${bStr} = ${r}`
  }
}

const builders = [linearEquation, percentage, power, arithmeticProgression, affineFunction]

export const generateAdvanced = (): Question => pick(builders)()
