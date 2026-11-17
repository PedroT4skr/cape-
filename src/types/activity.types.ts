export type ActivityCategoryId =
  | 'dyscalculia'
  | 'literacy'
  | 'visual_perception'
  | 'social_emotions'
  | 'daily_logic'

export interface ActivityCategory {
  id: ActivityCategoryId
  title: string
  subtitle: string
  emoji: string
  color: string
  levelIds?: ActivityLevelId[]
  isAvailable: boolean
  countLabel: string
}

export type ActivityLevelId = string

export type ActivityQuestionType =
  | 'count'
  | 'addition'
  | 'comparison'
  | 'initial_letter'
  | 'syllables'
  | 'word_match'
  | 'color_match'
  | 'shape_match'
  | 'routine_sequence'

export interface ActivityLevelConfig {
  id: ActivityLevelId
  categoryId: ActivityCategoryId
  title: string
  subtitle: string
  methodology: string
  emoji: string
  badgeColor: string
  description: string
}

export interface ActivityDefinition extends ActivityLevelConfig {
  isEnabled: boolean
  isBuiltIn: boolean
  order: number
  tags?: string[]
  questions: ActivityQuestion[]
  updatedAt: number
}

export interface ConcreteItemGroup {
  emoji: string
  count: number
  label: string
}

export interface ActivityOption {
  id: string
  label: string
  numericValue?: number
  emojiVisual?: string
  isCorrect: boolean
}

export interface ActivityQuestion {
  id: string
  levelId: ActivityLevelId
  type: ActivityQuestionType
  prompt: string
  ttsPrompt: string
  // Discalculia: Contagem, Adição, Comparação
  items?: ConcreteItemGroup
  groupA?: ConcreteItemGroup
  groupB?: ConcreteItemGroup
  optionLeft?: ConcreteItemGroup
  optionRight?: ConcreteItemGroup
  targetComparison?: 'more' | 'less'
  // Alfabetização, Vocabulário & Emoções
  targetItem?: {
    emoji: string
    word: string
    displayWord?: string
    highlight?: string
    hintBadge?: string
  }
  // Percepção Visual, Pareamento, Associação Lógica & Sequência de Rotina
  visualTarget?: {
    modelEmoji: string
    modelLabel: string
    modelColor?: string
    badgeText?: string
    guidanceText?: string
    sequenceSteps?: { emoji: string; label: string }[]
    missingStepIndex?: number
  }
  // Opções de toque para a criança
  options: ActivityOption[]
}

export interface ActivitySessionState {
  isActive: boolean
  currentLevelId: ActivityLevelId | null
  currentQuestionIndex: number
  questions: ActivityQuestion[]
  score: number
  totalAnswered: number
  isCompleted: boolean
  lastAnswerCorrect: boolean | null
  encouragementMessage: string | null
  isProcessing: boolean
}
