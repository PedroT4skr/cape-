import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import { DIFFICULTIES } from '../config/quiz.config'
import { createQuestionSet } from '../domain/questionFactory'
import { summarizeQuiz } from '../domain/scoring'
import { leaderboardRepository } from '../services/leaderboard.repository'
import { initialQuizState, quizReducer } from '../state/quizReducer'
import type { Difficulty } from '../types/quiz.types'
import { useQuizTimer } from './useQuizTimer'

/** Fachada única do quiz: estado, cronômetro, derivações e persistência do resultado. */
export function useQuiz() {
  const [state, dispatch] = useReducer(quizReducer, initialQuizState)
  const savedRef = useRef(false)

  useQuizTimer(state.phase === 'playing', (deltaMs) => dispatch({ type: 'TICK', deltaMs }))

  const config = DIFFICULTIES[state.difficulty]
  const question = state.questions[state.currentIndex]
  const answer = state.answers[state.currentIndex]
  const remainingMs = answer ? Math.max(0, config.timeLimitMs - answer.elapsedMs) : config.timeLimitMs
  const isOvertime = !!answer && answer.elapsedMs > config.timeLimitMs

  const summary = useMemo(
    () => (state.phase === 'finished' ? summarizeQuiz(state.questions, state.answers, state.difficulty) : null),
    [state.phase, state.questions, state.answers, state.difficulty]
  )

  // Salva no ranking exatamente uma vez ao terminar.
  useEffect(() => {
    if (state.phase !== 'finished' || !summary || savedRef.current) return
    savedRef.current = true
    const durationMs = state.answers.reduce((s, a) => s + a.elapsedMs, 0)
    void leaderboardRepository.save({
      id: crypto.randomUUID(),
      playerName: state.playerName || 'Anônimo',
      difficulty: state.difficulty,
      correctCount: summary.correctCount,
      totalQuestions: state.questions.length,
      score: summary.totalScore,
      overtimeCount: summary.overtimeCount,
      durationMs,
      finishedAt: new Date().toISOString()
    })
  }, [state.phase, summary, state.answers, state.playerName, state.difficulty, state.questions.length])

  const start = useCallback((playerName: string, difficulty: Difficulty) => {
    savedRef.current = false
    dispatch({ type: 'START', playerName, difficulty, questions: createQuestionSet(difficulty), now: Date.now() })
  }, [])

  return {
    state,
    config,
    question,
    answer,
    remainingMs,
    isOvertime,
    summary,
    start,
    select: useCallback((optionIndex: number) => dispatch({ type: 'SELECT', optionIndex }), []),
    next: useCallback(() => dispatch({ type: 'NEXT' }), []),
    previous: useCallback(() => dispatch({ type: 'PREVIOUS' }), []),
    reset: useCallback(() => dispatch({ type: 'RESET' }), [])
  }
}

export type QuizController = ReturnType<typeof useQuiz>
