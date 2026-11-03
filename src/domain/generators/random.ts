/** Utilitários aleatórios + montagem de alternativas plausíveis. */
export const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

export const pick = <T,>(items: readonly T[]): T => items[randInt(0, items.length - 1)]

export function shuffle<T>(items: T[]): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(0, i)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

let counter = 0
export const uid = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${(counter++).toString(36)}`

/**
 * Gera 4 alternativas numéricas: a correta + distratores próximos (erros comuns:
 * ±1, ±2, troca de operação), sem repetições e sem negativos quando indesejado.
 */
export function buildNumericOptions(
  correct: number,
  extraDistractors: number[] = [],
  allowNegative = false
): { options: string[]; correctIndex: number } {
  const set = new Set<number>([correct])
  const candidates = [...extraDistractors, correct + 1, correct - 1, correct + 2, correct - 2, correct + 10, correct - 10]
  for (const c of shuffle(candidates)) {
    if (set.size >= 4) break
    if (!allowNegative && c < 0) continue
    if (Number.isFinite(c)) set.add(c)
  }
  while (set.size < 4) set.add(correct + randInt(3, 15) * (Math.random() < 0.5 && allowNegative ? -1 : 1))

  const options = shuffle([...set])
  return { options: options.map(String), correctIndex: options.indexOf(correct) }
}

/** Alternativas textuais (ex.: "x = 3"). */
export function buildTextOptions(correct: string, distractors: string[]): { options: string[]; correctIndex: number } {
  const unique = [...new Set([correct, ...distractors])].slice(0, 4)
  const options = shuffle(unique)
  return { options, correctIndex: options.indexOf(correct) }
}
