export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export type QuizPhase = 'setup' | 'playing' | 'finished'

export interface Question {
  id: string
  difficulty: Difficulty
  /** Enunciado principal exibido em tipografia grande. */
  prompt: string
  /** Expressão destacada (ex.: "7 + 5 = ?"). Opcional para problemas textuais. */
  expression?: string
  options: string[]
  correctIndex: number
  /** Explicação curta exibida na revisão final. */
  explanation: string
}

export interface AnswerRecord {
  selectedIndex: number | null
  /** Tempo total (ms) gasto na questão, somando visitas. */
  elapsedMs: number
  /** Tempo (ms) no momento da última seleção — base do cálculo de penalidade. */
  answeredAtMs: number | null
  /** Indica se o aluno retrocedeu para esta questão (penalidade de 50% da pontuação). */
  wasRetroceded?: boolean
}

export interface ScoreBreakdown {
  isCorrect: boolean
  isOvertime: boolean
  wasRetroceded?: boolean
  basePoints: number
  speedBonus: number
  penaltyRate: number
  finalPoints: number
}

export interface QuizState {
  phase: QuizPhase
  playerName: string
  difficulty: Difficulty
  questions: Question[]
  answers: AnswerRecord[]
  currentIndex: number
  startedAt: number | null
}

export interface LeaderboardEntry {
  id: string
  playerName: string
  difficulty: Difficulty
  correctCount: number
  totalQuestions: number
  score: number
  overtimeCount: number
  durationMs: number
  finishedAt: string
}
