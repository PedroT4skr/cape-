import type { ActivityLevelConfig, ActivityQuestion } from '../types/activity.types'

export const VISUAL_LEVELS: ActivityLevelConfig[] = [
  {
    id: 'visual_level_1_colors',
    categoryId: 'visual_perception',
    title: 'Nível 1: Cores & Tons',
    subtitle: 'Parear e identificar cores iguais',
    methodology: 'TEACCH / Discriminação Cromática',
    emoji: '🎨',
    badgeColor: '#9333EA',
    description: 'Identificar e parear cores vibrantes correspondentes ao modelo.'
  },
  {
    id: 'visual_level_2_shapes',
    categoryId: 'visual_perception',
    title: 'Nível 2: Formas Geométricas',
    subtitle: 'Reconhecer formas e contornos',
    methodology: 'Montessori / Pareamento de Formas',
    emoji: '🔺',
    badgeColor: '#2563EB',
    description: 'Identificar formas geométricas como círculo, quadrado, triângulo e estrela.'
  },
  {
    id: 'visual_level_3_routines',
    categoryId: 'visual_perception',
    title: 'Nível 3: Sequência de Rotina',
    subtitle: 'O que nós fazemos depois?',
    methodology: 'Rotina Estruturada PECS / Encadeamento',
    emoji: '⏳',
    badgeColor: '#EA580C',
    description: 'Compreensão de etapas cronológicas e previsibilidade da rotina diária.'
  }
]

export const VISUAL_LEVEL_1_QUESTIONS: ActivityQuestion[] = [
  {
    id: 'vis_l1_q1',
    levelId: 'visual_level_1_colors',
    type: 'color_match',
    prompt: 'QUAL COR É IGUAL AO MODELO?',
    ttsPrompt: 'Olhe a cor vermelha no centro. Toque na cor que é igual ao modelo!',
    visualTarget: {
      modelEmoji: '🔴',
      modelLabel: 'VERMELHO',
      modelColor: '#EF4444'
    },
    options: [
      { id: 'opt_1', label: 'VERMELHO', emojiVisual: '🔴', isCorrect: true },
      { id: 'opt_2', label: 'AZUL', emojiVisual: '🔵', isCorrect: false },
      { id: 'opt_3', label: 'AMARELO', emojiVisual: '🟡', isCorrect: false }
    ]
  },
  {
    id: 'vis_l1_q2',
    levelId: 'visual_level_1_colors',
    type: 'color_match',
    prompt: 'QUAL COR É IGUAL AO MODELO?',
    ttsPrompt: 'Olhe a cor amarela. Toque na cor que é igual ao modelo!',
    visualTarget: {
      modelEmoji: '🟡',
      modelLabel: 'AMARELO',
      modelColor: '#EAB308'
    },
    options: [
      { id: 'opt_1', label: 'VERDE', emojiVisual: '🟢', isCorrect: false },
      { id: 'opt_2', label: 'AMARELO', emojiVisual: '🟡', isCorrect: true },
      { id: 'opt_3', label: 'ROXO', emojiVisual: '🟣', isCorrect: false }
    ]
  },
  {
    id: 'vis_l1_q3',
    levelId: 'visual_level_1_colors',
    type: 'color_match',
    prompt: 'QUAL COR É IGUAL AO MODELO?',
    ttsPrompt: 'Olhe a cor azul. Toque na cor que é igual ao modelo!',
    visualTarget: {
      modelEmoji: '🔵',
      modelLabel: 'AZUL',
      modelColor: '#3B82F6'
    },
    options: [
      { id: 'opt_1', label: 'AZUL', emojiVisual: '🔵', isCorrect: true },
      { id: 'opt_2', label: 'VERMELHO', emojiVisual: '🔴', isCorrect: false },
      { id: 'opt_3', label: 'VERDE', emojiVisual: '🟢', isCorrect: false }
    ]
  },
  {
    id: 'vis_l1_q4',
    levelId: 'visual_level_1_colors',
    type: 'color_match',
    prompt: 'QUAL COR É IGUAL AO MODELO?',
    ttsPrompt: 'Olhe a cor verde. Toque na cor que é igual ao modelo!',
    visualTarget: {
      modelEmoji: '🟢',
      modelLabel: 'VERDE',
      modelColor: '#22C55E'
    },
    options: [
      { id: 'opt_1', label: 'AMARELO', emojiVisual: '🟡', isCorrect: false },
      { id: 'opt_2', label: 'VERDE', emojiVisual: '🟢', isCorrect: true },
      { id: 'opt_3', label: 'LARANJA', emojiVisual: '🟠', isCorrect: false }
    ]
  },
  {
    id: 'vis_l1_q5',
    levelId: 'visual_level_1_colors',
    type: 'color_match',
    prompt: 'QUAL COR É IGUAL AO MODELO?',
    ttsPrompt: 'Olhe a cor roxa. Toque na cor que é igual ao modelo!',
    visualTarget: {
      modelEmoji: '🟣',
      modelLabel: 'ROXO',
      modelColor: '#A855F7'
    },
    options: [
      { id: 'opt_1', label: 'ROXO', emojiVisual: '🟣', isCorrect: true },
      { id: 'opt_2', label: 'AZUL', emojiVisual: '🔵', isCorrect: false },
      { id: 'opt_3', label: 'VERMELHO', emojiVisual: '🔴', isCorrect: false }
    ]
  }
]

export const VISUAL_LEVEL_2_QUESTIONS: ActivityQuestion[] = [
  {
    id: 'vis_l2_q1',
    levelId: 'visual_level_2_shapes',
    type: 'shape_match',
    prompt: 'QUAL FORMA É IGUAL AO MODELO?',
    ttsPrompt: 'Olhe o triângulo. Encontre a forma geométrica igual ao modelo!',
    visualTarget: {
      modelEmoji: '🔺',
      modelLabel: 'TRIÂNGULO'
    },
    options: [
      { id: 'opt_1', label: 'TRIÂNGULO', emojiVisual: '🔺', isCorrect: true },
      { id: 'opt_2', label: 'QUADRADO', emojiVisual: '🟩', isCorrect: false },
      { id: 'opt_3', label: 'CÍRCULO', emojiVisual: '⚪', isCorrect: false }
    ]
  },
  {
    id: 'vis_l2_q2',
    levelId: 'visual_level_2_shapes',
    type: 'shape_match',
    prompt: 'QUAL FORMA É IGUAL AO MODELO?',
    ttsPrompt: 'Olhe a estrela. Encontre a forma geométrica igual ao modelo!',
    visualTarget: {
      modelEmoji: '⭐',
      modelLabel: 'ESTRELA'
    },
    options: [
      { id: 'opt_1', label: 'CÍRCULO', emojiVisual: '⚪', isCorrect: false },
      { id: 'opt_2', label: 'ESTRELA', emojiVisual: '⭐', isCorrect: true },
      { id: 'opt_3', label: 'CORAÇÃO', emojiVisual: '💛', isCorrect: false }
    ]
  },
  {
    id: 'vis_l2_q3',
    levelId: 'visual_level_2_shapes',
    type: 'shape_match',
    prompt: 'QUAL FORMA É IGUAL AO MODELO?',
    ttsPrompt: 'Olhe o quadrado. Encontre a forma geométrica igual ao modelo!',
    visualTarget: {
      modelEmoji: '🟩',
      modelLabel: 'QUADRADO'
    },
    options: [
      { id: 'opt_1', label: 'QUADRADO', emojiVisual: '🟩', isCorrect: true },
      { id: 'opt_2', label: 'TRIÂNGULO', emojiVisual: '🔺', isCorrect: false },
      { id: 'opt_3', label: 'ESTRELA', emojiVisual: '⭐', isCorrect: false }
    ]
  },
  {
    id: 'vis_l2_q4',
    levelId: 'visual_level_2_shapes',
    type: 'shape_match',
    prompt: 'QUAL FORMA É IGUAL AO MODELO?',
    ttsPrompt: 'Olhe o círculo. Encontre a forma geométrica igual ao modelo!',
    visualTarget: {
      modelEmoji: '⚪',
      modelLabel: 'CÍRCULO'
    },
    options: [
      { id: 'opt_1', label: 'QUADRADO', emojiVisual: '🟩', isCorrect: false },
      { id: 'opt_2', label: 'CÍRCULO', emojiVisual: '⚪', isCorrect: true },
      { id: 'opt_3', label: 'TRIÂNGULO', emojiVisual: '🔺', isCorrect: false }
    ]
  },
  {
    id: 'vis_l2_q5',
    levelId: 'visual_level_2_shapes',
    type: 'shape_match',
    prompt: 'QUAL FORMA É IGUAL AO MODELO?',
    ttsPrompt: 'Olhe o coração. Encontre a forma geométrica igual ao modelo!',
    visualTarget: {
      modelEmoji: '💛',
      modelLabel: 'CORAÇÃO'
    },
    options: [
      { id: 'opt_1', label: 'CÍRCULO', emojiVisual: '⚪', isCorrect: false },
      { id: 'opt_2', label: 'ESTRELA', emojiVisual: '⭐', isCorrect: false },
      { id: 'opt_3', label: 'CORAÇÃO', emojiVisual: '💛', isCorrect: true }
    ]
  }
]

export const VISUAL_LEVEL_3_QUESTIONS: ActivityQuestion[] = [
  {
    id: 'vis_l3_q1',
    levelId: 'visual_level_3_routines',
    type: 'routine_sequence',
    prompt: 'O QUE NÓS FAZEMOS DEPOIS DE ESCOVAR OS DENTES?',
    ttsPrompt: 'Acordou, escovou os dentes... O que nós fazemos depois na rotina da manhã?',
    visualTarget: {
      modelEmoji: '⏳',
      modelLabel: 'ROTINA DA MANHÃ',
      sequenceSteps: [
        { emoji: '🛌', label: 'ACORDAR' },
        { emoji: '🪥', label: 'ESCOVAR DENTES' }
      ],
      missingStepIndex: 2
    },
    options: [
      { id: 'opt_1', label: 'TOMAR CAFÉ', emojiVisual: '🥣', isCorrect: true },
      { id: 'opt_2', label: 'DORMIR', emojiVisual: '🌙', isCorrect: false },
      { id: 'opt_3', label: 'TOMAR BANHO', emojiVisual: '🛁', isCorrect: false }
    ]
  },
  {
    id: 'vis_l3_q2',
    levelId: 'visual_level_3_routines',
    type: 'routine_sequence',
    prompt: 'DEPOIS DE USAR O BANHEIRO, O QUE FAZEMOS?',
    ttsPrompt: 'Depois de usar o banheiro, o que devemos fazer sempre?',
    visualTarget: {
      modelEmoji: '⏳',
      modelLabel: 'HIGIENE',
      sequenceSteps: [
        { emoji: '🚽', label: 'BANHEIRO' }
      ],
      missingStepIndex: 1
    },
    options: [
      { id: 'opt_1', label: 'LAVAR AS MÃOS', emojiVisual: '🧼', isCorrect: true },
      { id: 'opt_2', label: 'JOGAR BOLA', emojiVisual: '⚽', isCorrect: false },
      { id: 'opt_3', label: 'PASSEAR', emojiVisual: '🚗', isCorrect: false }
    ]
  },
  {
    id: 'vis_l3_q3',
    levelId: 'visual_level_3_routines',
    type: 'routine_sequence',
    prompt: 'DEPOIS DE COMER O LANCHE, O QUE FAZEMOS?',
    ttsPrompt: 'Depois de comer o lanche, o que fazemos para cuidar dos dentes?',
    visualTarget: {
      modelEmoji: '⏳',
      modelLabel: 'REFEIÇÃO',
      sequenceSteps: [
        { emoji: '🥪', label: 'COMER LANCHE' }
      ],
      missingStepIndex: 1
    },
    options: [
      { id: 'opt_1', label: 'ESCOVAR DENTES', emojiVisual: '🪥', isCorrect: true },
      { id: 'opt_2', label: 'DORMIR', emojiVisual: '🛌', isCorrect: false },
      { id: 'opt_3', label: 'CHOVER', emojiVisual: '🌧️', isCorrect: false }
    ]
  },
  {
    id: 'vis_l3_q4',
    levelId: 'visual_level_3_routines',
    type: 'routine_sequence',
    prompt: 'DEPOIS DE PINTAR COM TINTA, O QUE FAZEMOS?',
    ttsPrompt: 'Depois de pintar e brincar com tinta, o que fazemos com as mãos?',
    visualTarget: {
      modelEmoji: '⏳',
      modelLabel: 'ARTE E PINTURA',
      sequenceSteps: [
        { emoji: '🎨', label: 'PINTAR TINTA' }
      ],
      missingStepIndex: 1
    },
    options: [
      { id: 'opt_1', label: 'LAVAR AS MÃOS', emojiVisual: '🧼', isCorrect: true },
      { id: 'opt_2', label: 'ANDAR DE CARRO', emojiVisual: '🚗', isCorrect: false },
      { id: 'opt_3', label: 'DORMIR', emojiVisual: '🌙', isCorrect: false }
    ]
  },
  {
    id: 'vis_l3_q5',
    levelId: 'visual_level_3_routines',
    type: 'routine_sequence',
    prompt: 'DEPOIS DE ENTRAR NA SALA DE AULA, O QUE FAZEMOS?',
    ttsPrompt: 'Chegou na escola, entrou na sala... O que nós fazemos agora?',
    visualTarget: {
      modelEmoji: '⏳',
      modelLabel: 'ESCOLA / CAPE',
      sequenceSteps: [
        { emoji: '🎒', label: 'CHEGAR NA ESCOLA' },
        { emoji: '🚪', label: 'ENTRAR NA SALA' }
      ],
      missingStepIndex: 2
    },
    options: [
      { id: 'opt_1', label: 'ESTUDAR', emojiVisual: '📚', isCorrect: true },
      { id: 'opt_2', label: 'DORMIR', emojiVisual: '🛏️', isCorrect: false },
      { id: 'opt_3', label: 'TOMAR BANHO', emojiVisual: '🛁', isCorrect: false }
    ]
  }
]
