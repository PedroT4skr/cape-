import type { AnswerRecord, Difficulty, Question, QuizState } from '../types/quiz.types'

export type QuizAction =
  | { type: 'START'; playerName: string; difficulty: Difficulty; questions: Question[]; now: number }
  | { type: 'TICK'; deltaMs: number }
  | { type: 'SELECT'; optionIndex: number }
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'FINISH' }
  | { type: 'RESET' }

const emptyAnswer = (): AnswerRecord => ({ selectedIndex: null, elapsedMs: 0, answeredAtMs: null })

export const initialQuizState: QuizState = {
  phase: 'setup',
  playerName: '',
  difficulty: 'beginner',
  questions: [],
  answers: [],
  currentIndex: 0,
  startedAt: null
}

function updateCurrentAnswer(state: QuizState, patch: (a: AnswerRecord) => AnswerRecord): QuizState {
  const answers = state.answers.map((a, i) => (i === state.currentIndex ? patch(a) : a))
  return { ...state, answers }
}

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START':
      return {
        phase: 'playing',
        playerName: action.playerName.trim(),
        difficulty: action.difficulty,
        questions: action.questions,
        answers: action.questions.map(emptyAnswer),
        currentIndex: 0,
        startedAt: action.now
      }

    case 'TICK':
      if (state.phase !== 'playing') return state
      // O cronômetro é por questão e continua contando ao retornar a ela.
      return updateCurrentAnswer(state, (a) => ({ ...a, elapsedMs: a.elapsedMs + action.deltaMs }))

    case 'SELECT':
      if (state.phase !== 'playing') return state
      // Permitido mesmo com tempo esgotado — a penalidade é aplicada na pontuação.
      return updateCurrentAnswer(state, (a) => ({ ...a, selectedIndex: action.optionIndex, answeredAtMs: a.elapsedMs }))

    case 'NEXT': {
      const current = state.answers[state.currentIndex]
      if (current?.selectedIndex == null) return state // Botão inativo até haver seleção.
      const isLast = state.currentIndex >= state.questions.length - 1
      return isLast ? { ...state, phase: 'finished' } : { ...state, currentIndex: state.currentIndex + 1 }
    }

    case 'PREVIOUS':
      return state.currentIndex > 0 ? { ...state, currentIndex: state.currentIndex - 1 } : state

    case 'FINISH':
      return { ...state, phase: 'finished' }

    case 'RESET':
      return { ...initialQuizState, playerName: state.playerName, difficulty: state.difficulty }

    default:
      return state
  }
}
