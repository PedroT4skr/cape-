export type ActivityCategoryId = 'dyscalculia' | 'literacy' | 'visual_perception'

export interface ActivityCategory {
  id: ActivityCategoryId
  title: string
  subtitle: string
  emoji: string
  color: string
  levelIds: ActivityLevelId[]
  isAvailable: boolean
  countLabel: string
}

export type ActivityLevelId =
  | 'level_1_subitizing'
  | 'level_2_addition'
  | 'level_3_magnitude'
  | 'literacy_level_1_initial_letter'
  | 'literacy_level_2_syllables'
  | 'literacy_level_3_word_matching'
  | 'visual_level_1_colors'
  | 'visual_level_2_shapes'
  | 'visual_level_3_routines'

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
  type:
    | 'count'
    | 'addition'
    | 'comparison'
    | 'initial_letter'
    | 'syllables'
    | 'word_match'
    | 'color_match'
    | 'shape_match'
    | 'routine_sequence'
  prompt: string
  ttsPrompt: string
  // Discalculia: Nível 1, 2, 3
  items?: ConcreteItemGroup
  groupA?: ConcreteItemGroup
  groupB?: ConcreteItemGroup
  optionLeft?: ConcreteItemGroup
  optionRight?: ConcreteItemGroup
  targetComparison?: 'more' | 'less'
  // Alfabetização & Fonologia: Níveis 1, 2, 3
  targetItem?: {
    emoji: string
    word: string
    displayWord?: string
    highlight?: string
  }
  // Percepção Visual & Pareamento: Níveis 1, 2, 3
  visualTarget?: {
    modelEmoji: string
    modelLabel: string
    modelColor?: string
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
