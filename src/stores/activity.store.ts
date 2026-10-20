import { writable, get } from 'svelte/store'
import type { ActivityCategoryId, ActivityLevelId, ActivityOption, ActivitySessionState, ActivityQuestion } from '../types/activity.types'
import { ALL_QUESTIONS_BY_LEVEL } from '../constants/activity-curriculum.constants'
import { soundEffects } from '../services/sound-effects.service'
import { speechService } from '../services/speech.service'
import { isAdminDashboardOpen } from './admin.store'

export const selectedCategoryId = writable<ActivityCategoryId | null>(null)
export const isActivitiesPageOpen = writable<boolean>(false)

export function openActivitiesPage(): void {
  isAdminDashboardOpen.set(false)
  isActivitiesPageOpen.set(true)
}

export function closeActivitiesPage(): void {
  isActivitiesPageOpen.set(false)
  selectedCategoryId.set(null)
}

export function selectCategory(id: ActivityCategoryId): void {
  selectedCategoryId.set(id)
}

export function clearSelectedCategory(): void {
  selectedCategoryId.set(null)
}

const initialState: ActivitySessionState = {
  isActive: false,
  currentLevelId: null,
  currentQuestionIndex: 0,
  questions: [],
  score: 0,
  totalAnswered: 0,
  isCompleted: false,
  lastAnswerCorrect: null,
  encouragementMessage: null,
  isProcessing: false
}

export const activitySession = writable<ActivitySessionState>(initialState)

export function startActivity(levelId: ActivityLevelId): void {
  const questions = ALL_QUESTIONS_BY_LEVEL[levelId] || []
  if (questions.length === 0) return

  activitySession.set({
    isActive: true,
    currentLevelId: levelId,
    currentQuestionIndex: 0,
    questions,
    score: 0,
    totalAnswered: 0,
    isCompleted: false,
    lastAnswerCorrect: null,
    encouragementMessage: null,
    isProcessing: false
  })

  // Vocaliza a primeira pergunta
  const firstQ = questions[0]
  if (firstQ) {
    setTimeout(() => {
      speechService.speakWord(firstQ.ttsPrompt)
    }, 300)
  }
}

export function repeatPrompt(): void {
  const state = get(activitySession)
  const q = state.questions[state.currentQuestionIndex]
  if (q) {
    speechService.speakWord(q.ttsPrompt)
  }
}

export async function submitAnswer(option: ActivityOption): Promise<void> {
  const state = get(activitySession)
  const currentQ = state.questions[state.currentQuestionIndex]
  if (!currentQ || state.isCompleted || state.isProcessing) return

  // Trava toques subsequentes durante a execução da resposta
  activitySession.update(s => ({ ...s, isProcessing: true }))

  if (option.isCorrect) {
    const newScore = state.score + 1
    const isLast = state.currentQuestionIndex >= state.questions.length - 1

    activitySession.update(s => ({
      ...s,
      score: newScore,
      totalAnswered: s.totalAnswered + 1,
      lastAnswerCorrect: true,
      encouragementMessage: 'MUITO BEM! VOCÊ ACERTOU! 🌟'
    }))

    soundEffects.playSuccessChime()

    // Aguarda a fala COMPLETA de incentivo sem nenhum corte
    try {
      await Promise.race([
        speechService.speakWord('Muito bem! Você acertou!'),
        new Promise(r => setTimeout(r, 4500))
      ])
    } catch {
      // Ignora erro eventual
    }

    // Pausa confortável pedagógica para absorção da conquista
    await new Promise(r => setTimeout(r, 450))

    // Se o usuário saiu da atividade durante o áudio, interrompe
    const latestState = get(activitySession)
    if (!latestState.isActive) return

    if (isLast) {
      activitySession.update(s => ({
        ...s,
        isCompleted: true,
        lastAnswerCorrect: null,
        encouragementMessage: null,
        isProcessing: false
      }))
      await speechService.speakWord('Parabéns! Você completou todas as atividades!')
    } else {
      const nextIndex = latestState.currentQuestionIndex + 1
      activitySession.update(s => ({
        ...s,
        currentQuestionIndex: nextIndex,
        lastAnswerCorrect: null,
        encouragementMessage: null,
        isProcessing: false
      }))
      const nextQ = latestState.questions[nextIndex]
      if (nextQ) {
        await speechService.speakWord(nextQ.ttsPrompt)
      }
    }
  } else {
    activitySession.update(s => ({
      ...s,
      lastAnswerCorrect: false,
      encouragementMessage: 'VAMOS TENTAR DE NOVO! VOCÊ CONSEGUE!'
    }))

    soundEffects.playGentleRetry()

    try {
      await Promise.race([
        speechService.speakWord('Vamos tentar de novo! Conte com calma.'),
        new Promise(r => setTimeout(r, 4500))
      ])
    } catch {
      // Ignora erro
    }

    await new Promise(r => setTimeout(r, 350))

    // Libera para nova tentativa
    activitySession.update(s => ({
      ...s,
      lastAnswerCorrect: null,
      encouragementMessage: null,
      isProcessing: false
    }))
  }
}

export function exitActivity(): void {
  speechService.stop()
  activitySession.set(initialState)
}

export function restartCurrentLevel(): void {
  const state = get(activitySession)
  if (state.currentLevelId) {
    startActivity(state.currentLevelId)
  }
}
