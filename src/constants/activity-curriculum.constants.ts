import type { ActivityCategory, ActivityLevelConfig, ActivityQuestion } from '../types/activity.types'
import {
  LITERACY_LEVELS,
  LITERACY_LEVEL_1_QUESTIONS,
  LITERACY_LEVEL_2_QUESTIONS,
  LITERACY_LEVEL_3_QUESTIONS
} from './literacy-curriculum.constants'
import {
  VISUAL_LEVELS,
  VISUAL_LEVEL_1_QUESTIONS,
  VISUAL_LEVEL_2_QUESTIONS,
  VISUAL_LEVEL_3_QUESTIONS
} from './visual-curriculum.constants'

export const ACTIVITY_CATEGORIES: ActivityCategory[] = [
  {
    id: 'dyscalculia',
    title: 'Discalculia & Matemática Concreta',
    subtitle: 'Subitização, adição pictórica CPA e noções de grandeza',
    emoji: '🔢',
    color: '#2563EB',
    levelIds: ['level_1_subitizing', 'level_2_addition', 'level_3_magnitude'],
    isAvailable: true,
    countLabel: '3 EXERCÍCIOS'
  },
  {
    id: 'literacy',
    title: 'Alfabetização & Fonologia',
    subtitle: 'Consciência fonológica, pareamento som-letra e palavras',
    emoji: '🔤',
    color: '#16A34A',
    levelIds: [
      'literacy_level_1_initial_letter',
      'literacy_level_2_syllables',
      'literacy_level_3_word_matching'
    ],
    isAvailable: true,
    countLabel: '3 EXERCÍCIOS'
  },
  {
    id: 'visual_perception',
    title: 'Percepção Visual & Pareamento',
    subtitle: 'Discriminação de formas, cores e sequências de rotina',
    emoji: '🧩',
    color: '#9333EA',
    levelIds: [
      'visual_level_1_colors',
      'visual_level_2_shapes',
      'visual_level_3_routines'
    ],
    isAvailable: true,
    countLabel: '3 EXERCÍCIOS'
  }
]

export const ACTIVITY_LEVELS: ActivityLevelConfig[] = [
  {
    id: 'level_1_subitizing',
    categoryId: 'dyscalculia',
    title: 'Nível 1: Contagem (1 a 5)',
    subtitle: 'Reconhecimento visual de quantidades',
    methodology: 'CPA / Subitização',
    emoji: '🍎',
    badgeColor: '#16A34A',
    description: 'Contar objetos familiares de 1 a 5.'
  },
  {
    id: 'level_2_addition',
    categoryId: 'dyscalculia',
    title: 'Nível 2: Adição com Figuras',
    subtitle: 'Juntar conjuntos de objetos',
    methodology: 'Numicon / Soma Visual',
    emoji: '➕',
    badgeColor: '#2563EB',
    description: 'Somar dois grupos de figuras.'
  },
  {
    id: 'level_3_magnitude',
    categoryId: 'dyscalculia',
    title: 'Nível 3: Mais ou Menos',
    subtitle: 'Comparar dois grupos',
    methodology: 'Magnitude Visual',
    emoji: '⚖️',
    badgeColor: '#EA580C',
    description: 'Identificar onde tem mais ou menos.'
  },
  ...LITERACY_LEVELS,
  ...VISUAL_LEVELS
]

export function getLevelsByCategoryId(categoryId: string): ActivityLevelConfig[] {
  return ACTIVITY_LEVELS.filter(l => l.categoryId === categoryId)
}

export function getCategoryById(categoryId: string): ActivityCategory | undefined {
  return ACTIVITY_CATEGORIES.find(c => c.id === categoryId)
}

export const LEVEL_1_QUESTIONS: ActivityQuestion[] = [
  {
    id: 'l1_q1',
    levelId: 'level_1_subitizing',
    type: 'count',
    prompt: 'QUANTAS MAÇÃS VOCÊ VÊ?',
    ttsPrompt: 'Quantas maçãs você vê na tela?',
    items: { emoji: '🍎', count: 2, label: 'MAÇÃS' },
    options: [
      { id: 'opt_1', label: '1', numericValue: 1, emojiVisual: '🍎', isCorrect: false },
      { id: 'opt_2', label: '2', numericValue: 2, emojiVisual: '🍎🍎', isCorrect: true },
      { id: 'opt_3', label: '3', numericValue: 3, emojiVisual: '🍎🍎🍎', isCorrect: false }
    ]
  },
  {
    id: 'l1_q2',
    levelId: 'level_1_subitizing',
    type: 'count',
    prompt: 'QUANTAS BANANAS VOCÊ VÊ?',
    ttsPrompt: 'Quantas bananas você vê na tela?',
    items: { emoji: '🍌', count: 3, label: 'BANANAS' },
    options: [
      { id: 'opt_1', label: '2', numericValue: 2, emojiVisual: '🍌🍌', isCorrect: false },
      { id: 'opt_2', label: '3', numericValue: 3, emojiVisual: '🍌🍌🍌', isCorrect: true },
      { id: 'opt_3', label: '4', numericValue: 4, emojiVisual: '🍌🍌🍌🍌', isCorrect: false }
    ]
  },
  {
    id: 'l1_q3',
    levelId: 'level_1_subitizing',
    type: 'count',
    prompt: 'QUANTOS COPOS DE ÁGUA VOCÊ VÊ?',
    ttsPrompt: 'Quantos copos de água você vê?',
    items: { emoji: '🥤', count: 1, label: 'COPO' },
    options: [
      { id: 'opt_1', label: '1', numericValue: 1, emojiVisual: '🥤', isCorrect: true },
      { id: 'opt_2', label: '2', numericValue: 2, emojiVisual: '🥤🥤', isCorrect: false },
      { id: 'opt_3', label: '3', numericValue: 3, emojiVisual: '🥤🥤🥤', isCorrect: false }
    ]
  },
  {
    id: 'l1_q4',
    levelId: 'level_1_subitizing',
    type: 'count',
    prompt: 'QUANTOS PÃES VOCÊ VÊ?',
    ttsPrompt: 'Quantos pães você vê na tela?',
    items: { emoji: '🥖', count: 4, label: 'PÃES' },
    options: [
      { id: 'opt_1', label: '3', numericValue: 3, emojiVisual: '🥖🥖🥖', isCorrect: false },
      { id: 'opt_2', label: '4', numericValue: 4, emojiVisual: '🥖🥖🥖🥖', isCorrect: true },
      { id: 'opt_3', label: '5', numericValue: 5, emojiVisual: '🥖🥖🥖🥖🥖', isCorrect: false }
    ]
  },
  {
    id: 'l1_q5',
    levelId: 'level_1_subitizing',
    type: 'count',
    prompt: 'QUANTAS ESTRELAS VOCÊ VÊ?',
    ttsPrompt: 'Quantas estrelas você vê?',
    items: { emoji: '⭐', count: 5, label: 'ESTRELAS' },
    options: [
      { id: 'opt_1', label: '4', numericValue: 4, emojiVisual: '⭐⭐⭐⭐', isCorrect: false },
      { id: 'opt_2', label: '5', numericValue: 5, emojiVisual: '⭐⭐⭐⭐⭐', isCorrect: true },
      { id: 'opt_3', label: '3', numericValue: 3, emojiVisual: '⭐⭐⭐', isCorrect: false }
    ]
  }
]

export const LEVEL_2_QUESTIONS: ActivityQuestion[] = [
  {
    id: 'l2_q1',
    levelId: 'level_2_addition',
    type: 'addition',
    prompt: 'VAMOS JUNTAR AS MAÇÃS! QUANTAS FICAM AO TODO?',
    ttsPrompt: 'Uma maçã mais uma maçã. Quantas maçãs temos ao todo?',
    groupA: { emoji: '🍎', count: 1, label: '1 MAÇÃ' },
    groupB: { emoji: '🍎', count: 1, label: '1 MAÇÃ' },
    options: [
      { id: 'opt_1', label: '1', numericValue: 1, emojiVisual: '🍎', isCorrect: false },
      { id: 'opt_2', label: '2', numericValue: 2, emojiVisual: '🍎🍎', isCorrect: true },
      { id: 'opt_3', label: '3', numericValue: 3, emojiVisual: '🍎🍎🍎', isCorrect: false }
    ]
  },
  {
    id: 'l2_q2',
    levelId: 'level_2_addition',
    type: 'addition',
    prompt: 'VAMOS JUNTAR AS LARANJAS! QUANTAS FICAM?',
    ttsPrompt: 'Duas laranjas mais uma laranja. Quantas temos ao todo?',
    groupA: { emoji: '🍊', count: 2, label: '2 LARANJAS' },
    groupB: { emoji: '🍊', count: 1, label: '1 LARANJA' },
    options: [
      { id: 'opt_1', label: '2', numericValue: 2, emojiVisual: '🍊🍊', isCorrect: false },
      { id: 'opt_2', label: '3', numericValue: 3, emojiVisual: '🍊🍊🍊', isCorrect: true },
      { id: 'opt_3', label: '4', numericValue: 4, emojiVisual: '🍊🍊🍊🍊', isCorrect: false }
    ]
  },
  {
    id: 'l2_q3',
    levelId: 'level_2_addition',
    type: 'addition',
    prompt: 'VAMOS JUNTAR OS SUCOS! QUANTOS FICAM?',
    ttsPrompt: 'Dois sucos mais dois sucos. Quantos sucos temos ao todo?',
    groupA: { emoji: '🧃', count: 2, label: '2 SUCOS' },
    groupB: { emoji: '🧃', count: 2, label: '2 SUCOS' },
    options: [
      { id: 'opt_1', label: '3', numericValue: 3, emojiVisual: '🧃🧃🧃', isCorrect: false },
      { id: 'opt_2', label: '4', numericValue: 4, emojiVisual: '🧃🧃🧃🧃', isCorrect: true },
      { id: 'opt_3', label: '5', numericValue: 5, emojiVisual: '🧃🧃🧃🧃🧃', isCorrect: false }
    ]
  },
  {
    id: 'l2_q4',
    levelId: 'level_2_addition',
    type: 'addition',
    prompt: 'VAMOS JUNTAR OS MORANGOS! QUANTOS FICAM?',
    ttsPrompt: 'Três morangos mais um morango. Quantos morangos temos ao todo?',
    groupA: { emoji: '🍓', count: 3, label: '3 MORANGOS' },
    groupB: { emoji: '🍓', count: 1, label: '1 MORANGO' },
    options: [
      { id: 'opt_1', label: '3', numericValue: 3, emojiVisual: '🍓🍓🍓', isCorrect: false },
      { id: 'opt_2', label: '4', numericValue: 4, emojiVisual: '🍓🍓🍓🍓', isCorrect: true },
      { id: 'opt_3', label: '5', numericValue: 5, emojiVisual: '🍓🍓🍓🍓🍓', isCorrect: false }
    ]
  },
  {
    id: 'l2_q5',
    levelId: 'level_2_addition',
    type: 'addition',
    prompt: 'VAMOS JUNTAR AS BANANAS! QUANTAS FICAM?',
    ttsPrompt: 'Três bananas mais duas bananas. Quantas bananas temos ao todo?',
    groupA: { emoji: '🍌', count: 3, label: '3 BANANAS' },
    groupB: { emoji: '🍌', count: 2, label: '2 BANANAS' },
    options: [
      { id: 'opt_1', label: '4', numericValue: 4, emojiVisual: '🍌🍌🍌🍌', isCorrect: false },
      { id: 'opt_2', label: '5', numericValue: 5, emojiVisual: '🍌🍌🍌🍌🍌', isCorrect: true },
      { id: 'opt_3', label: '6', numericValue: 6, emojiVisual: '🍌🍌🍌🍌🍌🍌', isCorrect: false }
    ]
  }
]

export const LEVEL_3_QUESTIONS: ActivityQuestion[] = [
  {
    id: 'l3_q1',
    levelId: 'level_3_magnitude',
    type: 'comparison',
    prompt: 'ONDE TEM MAIS MAÇÃS?',
    ttsPrompt: 'Toque no grupo que tem mais maçãs!',
    targetComparison: 'more',
    optionLeft: { emoji: '🍎', count: 4, label: '4 MAÇÃS' },
    optionRight: { emoji: '🍎', count: 1, label: '1 MAÇÃ' },
    options: [
      { id: 'left', label: 'ESQUERDA', emojiVisual: '🍎 (4)', isCorrect: true },
      { id: 'right', label: 'DIREITA', emojiVisual: '🍎 (1)', isCorrect: false }
    ]
  },
  {
    id: 'l3_q2',
    levelId: 'level_3_magnitude',
    type: 'comparison',
    prompt: 'ONDE TEM MAIS BANANAS?',
    ttsPrompt: 'Toque no grupo que tem mais bananas!',
    targetComparison: 'more',
    optionLeft: { emoji: '🍌', count: 2, label: '2 BANANAS' },
    optionRight: { emoji: '🍌', count: 5, label: '5 BANANAS' },
    options: [
      { id: 'left', label: 'ESQUERDA', emojiVisual: '🍌 (2)', isCorrect: false },
      { id: 'right', label: 'DIREITA', emojiVisual: '🍌 (5)', isCorrect: true }
    ]
  },
  {
    id: 'l3_q3',
    levelId: 'level_3_magnitude',
    type: 'comparison',
    prompt: 'ONDE TEM MENOS PÃES?',
    ttsPrompt: 'Toque no grupo que tem menos pães!',
    targetComparison: 'less',
    optionLeft: { emoji: '🥖', count: 1, label: '1 PÃO' },
    optionRight: { emoji: '🥖', count: 4, label: '4 PÃES' },
    options: [
      { id: 'left', label: 'ESQUERDA', emojiVisual: '🥖 (1)', isCorrect: true },
      { id: 'right', label: 'DIREITA', emojiVisual: '🥖 (4)', isCorrect: false }
    ]
  },
  {
    id: 'l3_q4',
    levelId: 'level_3_magnitude',
    type: 'comparison',
    prompt: 'ONDE TEM MAIS SUCOS?',
    ttsPrompt: 'Toque no grupo que tem mais sucos!',
    targetComparison: 'more',
    optionLeft: { emoji: '🧃', count: 5, label: '5 SUCOS' },
    optionRight: { emoji: '🧃', count: 2, label: '2 SUCOS' },
    options: [
      { id: 'left', label: 'ESQUERDA', emojiVisual: '🧃 (5)', isCorrect: true },
      { id: 'right', label: 'DIREITA', emojiVisual: '🧃 (2)', isCorrect: false }
    ]
  },
  {
    id: 'l3_q5',
    levelId: 'level_3_magnitude',
    type: 'comparison',
    prompt: 'ONDE TEM MAIS ESTRELAS?',
    ttsPrompt: 'Toque no grupo que tem mais estrelas!',
    targetComparison: 'more',
    optionLeft: { emoji: '⭐', count: 2, label: '2 ESTRELAS' },
    optionRight: { emoji: '⭐', count: 4, label: '4 ESTRELAS' },
    options: [
      { id: 'left', label: 'ESQUERDA', emojiVisual: '⭐ (2)', isCorrect: false },
      { id: 'right', label: 'DIREITA', emojiVisual: '⭐ (4)', isCorrect: true }
    ]
  }
]

export const ALL_QUESTIONS_BY_LEVEL: Record<string, ActivityQuestion[]> = {
  level_1_subitizing: LEVEL_1_QUESTIONS,
  level_2_addition: LEVEL_2_QUESTIONS,
  level_3_magnitude: LEVEL_3_QUESTIONS,
  literacy_level_1_initial_letter: LITERACY_LEVEL_1_QUESTIONS,
  literacy_level_2_syllables: LITERACY_LEVEL_2_QUESTIONS,
  literacy_level_3_word_matching: LITERACY_LEVEL_3_QUESTIONS,
  visual_level_1_colors: VISUAL_LEVEL_1_QUESTIONS,
  visual_level_2_shapes: VISUAL_LEVEL_2_QUESTIONS,
  visual_level_3_routines: VISUAL_LEVEL_3_QUESTIONS
}
