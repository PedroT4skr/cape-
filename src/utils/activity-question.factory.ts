import type {
  ActivityCategoryId,
  ActivityDefinition,
  ActivityOption,
  ActivityQuestion,
  ActivityQuestionType
} from '../types/activity.types'
import { CATEGORY_MAP } from '../constants/curriculum/activity-categories.constants'

export interface QuestionTypeInfo {
  type: ActivityQuestionType
  label: string
  shortHint: string
}

export const QUESTION_TYPE_OPTIONS: QuestionTypeInfo[] = [
  { type: 'count', label: 'Contagem (1 a 10)', shortHint: 'Figuras com numeração 1-a-1' },
  { type: 'addition', label: 'Adição Visual (Grupo A + B)', shortHint: 'Somar dois conjuntos de figuras' },
  { type: 'comparison', label: 'Comparação (Esquerda vs Direita)', shortHint: 'Onde tem mais ou menos?' },
  { type: 'initial_letter', label: 'Letra Inicial', shortHint: 'Primeira letra da palavra' },
  { type: 'syllables', label: 'Sílaba Inicial', shortHint: 'Primeiro pedacinho da palavra' },
  { type: 'word_match', label: 'Figura-Palavra / Emoção', shortHint: 'Associar imagem ao nome ou sentimento' },
  { type: 'color_match', label: 'Pareamento de Cores', shortHint: 'Encontrar a cor igual ao modelo' },
  { type: 'shape_match', label: 'Pareamento / Associação Lógica', shortHint: 'Forma igual ou o que combina' },
  { type: 'routine_sequence', label: 'Sequência / Rotina (Passos)', shortHint: 'Descobrir o próximo passo' }
]

const DISTRACTOR_LETTERS = ['B', 'C', 'D', 'F', 'G', 'L', 'M', 'P', 'R', 'S', 'T', 'V', 'A', 'E', 'O']

export function generateUid(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

export function generateSmartNumericOptions(correctCount: number, emoji: string): ActivityOption[] {
  const safeCorrect = Math.max(1, Math.min(20, Math.round(correctCount)))
  const candidateA = safeCorrect > 1 ? safeCorrect - 1 : safeCorrect + 2
  const candidateB = safeCorrect + 1
  const unique = Array.from(new Set([candidateA, safeCorrect, candidateB])).sort((a, b) => a - b)

  return unique.map((num, idx) => ({
    id: `opt_${idx + 1}`,
    label: String(num),
    numericValue: num,
    emojiVisual: num <= 6 ? emoji.repeat(num) : `${emoji} (${num})`,
    isCorrect: num === safeCorrect
  }))
}

export function generateSmartLetterOptions(correctLetter: string): ActivityOption[] {
  const clean = (correctLetter.trim().toUpperCase()[0] || 'A')
  const alts = DISTRACTOR_LETTERS.filter((l) => l !== clean).slice(0, 2)
  const list = [clean, ...alts]

  return list.map((letter, idx) => ({
    id: `opt_${idx + 1}`,
    label: letter,
    isCorrect: letter === clean
  }))
}

export function createDefaultActivityDraft(categoryId: ActivityCategoryId = 'dyscalculia'): ActivityDefinition {
  const cat = CATEGORY_MAP[categoryId]
  const id = generateUid('custom_act')
  const defaultTypeMap: Record<ActivityCategoryId, ActivityQuestionType> = {
    dyscalculia: 'count',
    literacy: 'word_match',
    visual_perception: 'color_match',
    social_emotions: 'word_match',
    daily_logic: 'shape_match'
  }

  return {
    id,
    categoryId,
    title: 'Nova Atividade Pedagógica',
    subtitle: 'Exercício personalizado para o aluno',
    methodology: 'Personalizada / CAPE',
    emoji: cat?.emoji || '✨',
    badgeColor: cat?.color || '#2563EB',
    description: 'Atividade criada sob medida no painel do terapeuta.',
    tags: ['personalizada'],
    isEnabled: true,
    isBuiltIn: false,
    order: Date.now(),
    updatedAt: Date.now(),
    questions: [createDefaultQuestionForType(id, defaultTypeMap[categoryId])]
  }
}

export function createDefaultQuestionForType(
  levelId: string,
  type: ActivityQuestionType
): ActivityQuestion {
  const id = generateUid('q')

  switch (type) {
    case 'count':
      return {
        id,
        levelId,
        type,
        prompt: 'QUANTAS MAÇÃS VOCÊ VÊ?',
        ttsPrompt: 'Quantas maçãs você vê na tela?',
        items: { emoji: '🍎', count: 3, label: 'MAÇÃS' },
        options: generateSmartNumericOptions(3, '🍎')
      }
    case 'addition':
      return {
        id,
        levelId,
        type,
        prompt: 'VAMOS JUNTAR OS GRUPOS! QUANTOS FICAM?',
        ttsPrompt: 'Vamos juntar as figuras! Quantas ficam ao todo?',
        groupA: { emoji: '🍓', count: 2, label: '2 MORANGOS' },
        groupB: { emoji: '🍓', count: 1, label: '1 MORANGO' },
        options: generateSmartNumericOptions(3, '🍓')
      }
    case 'comparison':
      return {
        id,
        levelId,
        type,
        prompt: 'ONDE TEM MAIS FIGURAS?',
        ttsPrompt: 'Toque no grupo que tem mais figuras!',
        targetComparison: 'more',
        optionLeft: { emoji: '⭐', count: 4, label: '4 ESTRELAS' },
        optionRight: { emoji: '⭐', count: 2, label: '2 ESTRELAS' },
        options: [
          { id: 'opt_1', label: 'ESQUERDA', emojiVisual: '⭐ (4)', isCorrect: true },
          { id: 'opt_2', label: 'DIREITA', emojiVisual: '⭐ (2)', isCorrect: false }
        ]
      }
    case 'initial_letter':
      return {
        id,
        levelId,
        type,
        prompt: 'COM QUAL LETRA COMEÇA A BOLA?',
        ttsPrompt: 'Com qual letra começa a palavra bola?',
        targetItem: { emoji: '⚽', word: 'BOLA', displayWord: '_ O L A', highlight: 'B' },
        options: generateSmartLetterOptions('B')
      }
    case 'syllables':
      return {
        id,
        levelId,
        type,
        prompt: 'QUAL É A PRIMEIRA SÍLABA DE CASA?',
        ttsPrompt: 'Qual é o primeiro pedacinho de casa?',
        targetItem: { emoji: '🏠', word: 'CASA', displayWord: '[ ? ] - SA', highlight: 'CA' },
        options: [
          { id: 'opt_1', label: 'CA', isCorrect: true },
          { id: 'opt_2', label: 'BA', isCorrect: false },
          { id: 'opt_3', label: 'PA', isCorrect: false }
        ]
      }
    case 'word_match':
      return {
        id,
        levelId,
        type,
        prompt: 'QUAL É A FIGURA MOSTRADA?',
        ttsPrompt: 'Olhe a figura e toque na resposta correta.',
        targetItem: { emoji: '🐶', word: 'CACHORRO', hintBadge: 'ESCOLHA A PALAVRA CORRETA' },
        options: [
          { id: 'opt_1', label: 'CACHORRO', isCorrect: true },
          { id: 'opt_2', label: 'GATO', isCorrect: false },
          { id: 'opt_3', label: 'PÁSSARO', isCorrect: false }
        ]
      }
    case 'color_match':
      return {
        id,
        levelId,
        type,
        prompt: 'QUAL COR É IGUAL AO MODELO?',
        ttsPrompt: 'Olhe o modelo e toque na cor igual!',
        visualTarget: { modelEmoji: '🔵', modelLabel: 'AZUL', modelColor: '#3B82F6' },
        options: [
          { id: 'opt_1', label: 'AZUL', emojiVisual: '🔵', isCorrect: true },
          { id: 'opt_2', label: 'VERMELHO', emojiVisual: '🔴', isCorrect: false },
          { id: 'opt_3', label: 'AMARELO', emojiVisual: '🟡', isCorrect: false }
        ]
      }
    case 'shape_match':
      return {
        id,
        levelId,
        type,
        prompt: 'QUAL OPÇÃO COMBINA OU É IGUAL AO MODELO?',
        ttsPrompt: 'Observe o modelo e toque na resposta correta!',
        visualTarget: {
          modelEmoji: '🌧️',
          modelLabel: 'CHUVA',
          badgeText: 'O QUE COMBINA?',
          guidanceText: 'TOQUE NO ITEM QUE COMBINA COM O MODELO'
        },
        options: [
          { id: 'opt_1', label: 'GUARDA-CHUVA', emojiVisual: '☂️', isCorrect: true },
          { id: 'opt_2', label: 'BOLA', emojiVisual: '⚽', isCorrect: false },
          { id: 'opt_3', label: 'LÁPIS', emojiVisual: '✏️', isCorrect: false }
        ]
      }
    case 'routine_sequence':
      return {
        id,
        levelId,
        type,
        prompt: 'O QUE FAZEMOS DEPOIS?',
        ttsPrompt: 'Observe os passos. O que devemos fazer depois?',
        visualTarget: {
          modelEmoji: '⏳',
          modelLabel: 'ROTINA',
          sequenceSteps: [
            { emoji: '🛌', label: 'ACORDAR' },
            { emoji: '🪥', label: 'ESCOVAR DENTES' }
          ],
          missingStepIndex: 2
        },
        options: [
          { id: 'opt_1', label: 'TOMAR CAFÉ', emojiVisual: '🥣', isCorrect: true },
          { id: 'opt_2', label: 'DORMIR', emojiVisual: '🌙', isCorrect: false },
          { id: 'opt_3', label: 'BRINCAR', emojiVisual: '🎲', isCorrect: false }
        ]
      }
  }
}

export function cloneActivityAsCustom(source: ActivityDefinition): ActivityDefinition {
  const newId = generateUid('custom_act')
  const plainSource = JSON.parse(JSON.stringify(source)) as ActivityDefinition
  return {
    ...plainSource,
    id: newId,
    title: `${plainSource.title} (Cópia)`,
    isBuiltIn: false,
    isEnabled: true,
    order: Date.now(),
    updatedAt: Date.now(),
    questions: plainSource.questions.map((q) => ({
      ...q,
      id: generateUid('q'),
      levelId: newId
    }))
  }
}

export function validateActivityDefinition(activity: ActivityDefinition): string | null {
  if (!activity.title.trim()) {
    return 'Informe um título para a atividade.'
  }
  if (!activity.questions || activity.questions.length === 0) {
    return 'A atividade precisa de pelo menos 1 questão.'
  }
  for (let i = 0; i < activity.questions.length; i++) {
    const q = activity.questions[i]
    if (!q.prompt.trim()) {
      return `A questão ${i + 1} precisa de um enunciado.`
    }
    if (!q.options || q.options.length < 2) {
      return `A questão ${i + 1} precisa de pelo menos 2 alternativas.`
    }
    if (q.options.some((o) => !o.label.trim())) {
      return `Todas as alternativas da questão ${i + 1} precisam ter um texto.`
    }
    if (!q.options.some((o) => o.isCorrect)) {
      return `Marque pelo menos 1 alternativa correta na questão ${i + 1}.`
    }
  }
  return null
}
