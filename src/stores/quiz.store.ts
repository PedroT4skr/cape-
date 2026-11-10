import { writable, derived, get } from 'svelte/store'
import type { Difficulty, Question, AnswerRecord, QuizPhase } from '../types/quiz.types'
import { DIFFICULTIES, SCORING, TIMER_TICK_MS } from '../config/quiz.config'
import { createQuestionSet } from '../domain/questionFactory'
import { summarizeQuiz, type QuizSummary } from '../domain/scoring'
import { leaderboardRepository } from '../services/leaderboard.repository'
import { activeView } from './navigation.store'

export const isMathQuizOpen = writable<boolean>(false)
export const isTeacherGateOpen = writable<boolean>(false)
export const isLeaderboardOpen = writable<boolean>(false)

export function openMathQuiz() {
  activeView.set('quiz')
  isMathQuizOpen.set(true)
}

export function closeMathQuiz() {
  isMathQuizOpen.set(false)
  isTeacherGateOpen.set(false)
  isLeaderboardOpen.set(false)
  activeView.set('board')
}

// Estados do Quiz
export const quizPhase = writable<QuizPhase>('setup')
export const playerName = writable<string>('')
export const currentDifficulty = writable<Difficulty>('beginner')
export const quizQuestions = writable<Question[]>([])
export const currentIndex = writable<number>(0)
export const quizAnswers = writable<AnswerRecord[]>([])

let timerInterval: ReturnType<typeof setInterval> | null = null
let lastTickTime = 0

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

function startTimer() {
  stopTimer()
  lastTickTime = performance.now()
  timerInterval = setInterval(() => {
    const now = performance.now()
    const delta = Math.round(now - lastTickTime)
    lastTickTime = now

    quizAnswers.update((answers) => {
      const idx = get(currentIndex)
      const current = answers[idx]
      if (!current) return answers
      const updated = [...answers]
      updated[idx] = {
        ...current,
        elapsedMs: current.elapsedMs + delta
      }
      return updated
    })
  }, TIMER_TICK_MS)
}

export function startQuiz(name: string, difficulty: Difficulty) {
  stopTimer()
  const questions = createQuestionSet(difficulty)
  const initialAnswers: AnswerRecord[] = questions.map(() => ({
    selectedIndex: null,
    elapsedMs: 0,
    answeredAtMs: null,
    wasRetroceded: false
  }))

  playerName.set(name.trim() || 'Aluno')
  currentDifficulty.set(difficulty)
  quizQuestions.set(questions)
  quizAnswers.set(initialAnswers)
  currentIndex.set(0)
  quizPhase.set('playing')

  startTimer()
}

export function selectOption(optionIndex: number) {
  const idx = get(currentIndex)
  quizAnswers.update((answers) => {
    const current = answers[idx]
    if (!current) return answers
    const updated = [...answers]
    updated[idx] = {
      ...current,
      selectedIndex: optionIndex,
      answeredAtMs: current.elapsedMs
    }
    return updated
  })
}

export function nextQuestion() {
  const idx = get(currentIndex)
  const total = get(quizQuestions).length

  if (idx < total - 1) {
    currentIndex.set(idx + 1)
  } else {
    finishQuiz()
  }
}

export function previousQuestion() {
  const idx = get(currentIndex)
  if (idx > 0) {
    const prevIdx = idx - 1
    quizAnswers.update((answers) => {
      const target = answers[prevIdx]
      if (!target) return answers
      const updated = [...answers]
      updated[prevIdx] = {
        ...target,
        wasRetroceded: true
      }
      return updated
    })
    currentIndex.set(prevIdx)
  }
}

export async function finishQuiz() {
  stopTimer()

  const questions = get(quizQuestions)
  const answers = get(quizAnswers)
  const diff = get(currentDifficulty)
  const name = get(playerName)

  const summary = summarizeQuiz(questions, answers, diff)
  const durationMs = answers.reduce((acc, a) => acc + (a.elapsedMs || 0), 0)

  // Salva no ranking antes de exibir a tela final
  await leaderboardRepository.save({
    id: crypto.randomUUID(),
    playerName: name,
    difficulty: diff,
    correctCount: summary.correctCount,
    totalQuestions: questions.length,
    score: summary.totalScore,
    overtimeCount: summary.overtimeCount,
    durationMs,
    finishedAt: new Date().toISOString()
  })

  quizPhase.set('finished')
}

export function resetQuiz() {
  stopTimer()
  quizPhase.set('setup')
  currentIndex.set(0)
  quizQuestions.set([])
  quizAnswers.set([])
}

export const currentQuestion = derived(
  [quizQuestions, currentIndex],
  ([$questions, $idx]) => $questions[$idx] ?? null
)

export const currentAnswer = derived(
  [quizAnswers, currentIndex],
  ([$answers, $idx]) => $answers[$idx] ?? null
)

export const currentSummary = derived(
  [quizPhase, quizQuestions, quizAnswers, currentDifficulty],
  ([$phase, $questions, $answers, $diff]): QuizSummary | null => {
    if ($phase !== 'finished' || $questions.length === 0) return null
    return summarizeQuiz($questions, $answers, $diff)
  }
)
