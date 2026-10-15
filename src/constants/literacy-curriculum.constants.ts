import type { ActivityLevelConfig, ActivityQuestion } from '../types/activity.types'

export const LITERACY_LEVELS: ActivityLevelConfig[] = [
  {
    id: 'literacy_level_1_initial_letter',
    categoryId: 'literacy',
    title: 'Nível 1: Letra Inicial',
    subtitle: 'Descobrir com qual letra a palavra começa',
    methodology: 'Método Fônico / Aliteração',
    emoji: '🔤',
    badgeColor: '#16A34A',
    description: 'Identificar a primeira letra de figuras e palavras cotidianas.'
  },
  {
    id: 'literacy_level_2_syllables',
    categoryId: 'literacy',
    title: 'Nível 2: Sílaba Inicial',
    subtitle: 'Qual é o primeiro pedacinho da palavra?',
    methodology: 'Segmentação Silábica / Fonologia',
    emoji: '🧩',
    badgeColor: '#2563EB',
    description: 'Reconhecer a sílaba inicial da palavra falada e visualizada.'
  },
  {
    id: 'literacy_level_3_word_matching',
    categoryId: 'literacy',
    title: 'Nível 3: Qual é a Palavra?',
    subtitle: 'Ligue a figura à palavra escrita',
    methodology: 'Pareamento Visual TEACCH / PECS',
    emoji: '📖',
    badgeColor: '#EA580C',
    description: 'Associação entre imagem concreta e palavra em caixa alta.'
  }
]

export const LITERACY_LEVEL_1_QUESTIONS: ActivityQuestion[] = [
  {
    id: 'lit_l1_q1',
    levelId: 'literacy_level_1_initial_letter',
    type: 'initial_letter',
    prompt: 'COM QUAL LETRA COMEÇA A BOLA?',
    ttsPrompt: 'Com qual letra começa a palavra bola? Bola começa com...',
    targetItem: { emoji: '⚽', word: 'BOLA', displayWord: '_ O L A', highlight: 'B' },
    options: [
      { id: 'l1_opt1', label: 'B', isCorrect: true },
      { id: 'l1_opt2', label: 'M', isCorrect: false },
      { id: 'l1_opt3', label: 'P', isCorrect: false }
    ]
  },
  {
    id: 'lit_l1_q2',
    levelId: 'literacy_level_1_initial_letter',
    type: 'initial_letter',
    prompt: 'COM QUAL LETRA COMEÇA O GATO?',
    ttsPrompt: 'Com qual letra começa a palavra gato? Gato começa com...',
    targetItem: { emoji: '🐱', word: 'GATO', displayWord: '_ A T O', highlight: 'G' },
    options: [
      { id: 'l1_opt1', label: 'T', isCorrect: false },
      { id: 'l1_opt2', label: 'G', isCorrect: true },
      { id: 'l1_opt3', label: 'C', isCorrect: false }
    ]
  },
  {
    id: 'lit_l1_q3',
    levelId: 'literacy_level_1_initial_letter',
    type: 'initial_letter',
    prompt: 'COM QUAL LETRA COMEÇA O SAPO?',
    ttsPrompt: 'Com qual letra começa a palavra sapo? Sapo começa com...',
    targetItem: { emoji: '🐸', word: 'SAPO', displayWord: '_ A P O', highlight: 'S' },
    options: [
      { id: 'l1_opt1', label: 'L', isCorrect: false },
      { id: 'l1_opt2', label: 'J', isCorrect: false },
      { id: 'l1_opt3', label: 'S', isCorrect: true }
    ]
  },
  {
    id: 'lit_l1_q4',
    levelId: 'literacy_level_1_initial_letter',
    type: 'initial_letter',
    prompt: 'COM QUAL LETRA COMEÇA O CARRO?',
    ttsPrompt: 'Com qual letra começa a palavra carro? Carro começa com...',
    targetItem: { emoji: '🚗', word: 'CARRO', displayWord: '_ A R R O', highlight: 'C' },
    options: [
      { id: 'l1_opt1', label: 'C', isCorrect: true },
      { id: 'l1_opt2', label: 'F', isCorrect: false },
      { id: 'l1_opt3', label: 'D', isCorrect: false }
    ]
  },
  {
    id: 'lit_l1_q5',
    levelId: 'literacy_level_1_initial_letter',
    type: 'initial_letter',
    prompt: 'COM QUAL LETRA COMEÇA O SOL?',
    ttsPrompt: 'Com qual letra começa a palavra sol? Sol começa com...',
    targetItem: { emoji: '☀️', word: 'SOL', displayWord: '_ O L', highlight: 'S' },
    options: [
      { id: 'l1_opt1', label: 'V', isCorrect: false },
      { id: 'l1_opt2', label: 'S', isCorrect: true },
      { id: 'l1_opt3', label: 'R', isCorrect: false }
    ]
  }
]

export const LITERACY_LEVEL_2_QUESTIONS: ActivityQuestion[] = [
  {
    id: 'lit_l2_q1',
    levelId: 'literacy_level_2_syllables',
    type: 'syllables',
    prompt: 'QUAL É O COMEÇO DE CASA?',
    ttsPrompt: 'Qual é o primeiro pedacinho de casa? Ca... sa.',
    targetItem: { emoji: '🏠', word: 'CASA', displayWord: '[ ? ] - SA', highlight: 'CA' },
    options: [
      { id: 'l2_opt1', label: 'CA', isCorrect: true },
      { id: 'l2_opt2', label: 'BA', isCorrect: false },
      { id: 'l2_opt3', label: 'DA', isCorrect: false }
    ]
  },
  {
    id: 'lit_l2_q2',
    levelId: 'literacy_level_2_syllables',
    type: 'syllables',
    prompt: 'QUAL É O COMEÇO DE MACACO?',
    ttsPrompt: 'Qual é o primeiro pedacinho de macaco? Ma... ca... co.',
    targetItem: { emoji: '🐒', word: 'MACACO', displayWord: '[ ? ] - CA - CO', highlight: 'MA' },
    options: [
      { id: 'l2_opt1', label: 'SA', isCorrect: false },
      { id: 'l2_opt2', label: 'PA', isCorrect: false },
      { id: 'l2_opt3', label: 'MA', isCorrect: true }
    ]
  },
  {
    id: 'lit_l2_q3',
    levelId: 'literacy_level_2_syllables',
    type: 'syllables',
    prompt: 'QUAL É O COMEÇO DE PIPOCA?',
    ttsPrompt: 'Qual é o primeiro pedacinho de pipoca? Pi... po... ca.',
    targetItem: { emoji: '🍿', word: 'PIPOCA', displayWord: '[ ? ] - PO - CA', highlight: 'PI' },
    options: [
      { id: 'l2_opt1', label: 'TI', isCorrect: false },
      { id: 'l2_opt2', label: 'PI', isCorrect: true },
      { id: 'l2_opt3', label: 'BI', isCorrect: false }
    ]
  },
  {
    id: 'lit_l2_q4',
    levelId: 'literacy_level_2_syllables',
    type: 'syllables',
    prompt: 'QUAL É O COMEÇO DE PATO?',
    ttsPrompt: 'Qual é o primeiro pedacinho de pato? Pa... to.',
    targetItem: { emoji: '🦆', word: 'PATO', displayWord: '[ ? ] - TO', highlight: 'PA' },
    options: [
      { id: 'l2_opt1', label: 'PA', isCorrect: true },
      { id: 'l2_opt2', label: 'LA', isCorrect: false },
      { id: 'l2_opt3', label: 'TA', isCorrect: false }
    ]
  },
  {
    id: 'lit_l2_q5',
    levelId: 'literacy_level_2_syllables',
    type: 'syllables',
    prompt: 'QUAL É O COMEÇO DE LEÃO?',
    ttsPrompt: 'Qual é o primeiro pedacinho de leão? Le... ão.',
    targetItem: { emoji: '🦁', word: 'LEÃO', displayWord: '[ ? ] - ÃO', highlight: 'LE' },
    options: [
      { id: 'l2_opt1', label: 'ME', isCorrect: false },
      { id: 'l2_opt2', label: 'DE', isCorrect: false },
      { id: 'l2_opt3', label: 'LE', isCorrect: true }
    ]
  }
]

export const LITERACY_LEVEL_3_QUESTIONS: ActivityQuestion[] = [
  {
    id: 'lit_l3_q1',
    levelId: 'literacy_level_3_word_matching',
    type: 'word_match',
    prompt: 'QUAL PALAVRA É ESTA FIGURA?',
    ttsPrompt: 'Qual é a palavra para esta fruta? Maçã.',
    targetItem: { emoji: '🍎', word: 'MAÇÃ' },
    options: [
      { id: 'l3_opt1', label: 'MAÇÃ', isCorrect: true },
      { id: 'l3_opt2', label: 'UVA', isCorrect: false },
      { id: 'l3_opt3', label: 'BANANA', isCorrect: false }
    ]
  },
  {
    id: 'lit_l3_q2',
    levelId: 'literacy_level_3_word_matching',
    type: 'word_match',
    prompt: 'QUAL PALAVRA É ESTA FIGURA?',
    ttsPrompt: 'Qual é a palavra para este animal? Cachorro.',
    targetItem: { emoji: '🐶', word: 'CACHORRO' },
    options: [
      { id: 'l3_opt1', label: 'GATO', isCorrect: false },
      { id: 'l3_opt2', label: 'CACHORRO', isCorrect: true },
      { id: 'l3_opt3', label: 'PÁSSARO', isCorrect: false }
    ]
  },
  {
    id: 'lit_l3_q3',
    levelId: 'literacy_level_3_word_matching',
    type: 'word_match',
    prompt: 'QUAL PALAVRA É ESTA FIGURA?',
    ttsPrompt: 'Qual é a palavra para este transporte? Avião.',
    targetItem: { emoji: '✈️', word: 'AVIÃO' },
    options: [
      { id: 'l3_opt1', label: 'CARRO', isCorrect: false },
      { id: 'l3_opt2', label: 'NAVIO', isCorrect: false },
      { id: 'l3_opt3', label: 'AVIÃO', isCorrect: true }
    ]
  },
  {
    id: 'lit_l3_q4',
    levelId: 'literacy_level_3_word_matching',
    type: 'word_match',
    prompt: 'QUAL PALAVRA É ESTA FIGURA?',
    ttsPrompt: 'Qual é a palavra para esta bebida? Água.',
    targetItem: { emoji: '💧', word: 'ÁGUA' },
    options: [
      { id: 'l3_opt1', label: 'ÁGUA', isCorrect: true },
      { id: 'l3_opt2', label: 'SUCO', isCorrect: false },
      { id: 'l3_opt3', label: 'LEITE', isCorrect: false }
    ]
  },
  {
    id: 'lit_l3_q5',
    levelId: 'literacy_level_3_word_matching',
    type: 'word_match',
    prompt: 'QUAL PALAVRA É ESTA FIGURA?',
    ttsPrompt: 'Qual é a palavra para esta figura? Estrela.',
    targetItem: { emoji: '🌟', word: 'ESTRELA' },
    options: [
      { id: 'l3_opt1', label: 'LUA', isCorrect: false },
      { id: 'l3_opt2', label: 'SOL', isCorrect: false },
      { id: 'l3_opt3', label: 'ESTRELA', isCorrect: true }
    ]
  }
]
