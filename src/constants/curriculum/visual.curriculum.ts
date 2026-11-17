import type { ActivityDefinition, ActivityOption } from '../../types/activity.types'

function visOpts(
  correct: { label: string; emoji: string },
  a1: { label: string; emoji: string },
  a2: { label: string; emoji: string },
  pos: 0 | 1 | 2 = 0
): ActivityOption[] {
  const arr = [a1, a2]
  arr.splice(pos, 0, correct)
  return arr.map((o, idx) => ({
    id: `opt_${idx + 1}`,
    label: o.label,
    emojiVisual: o.emoji,
    isCorrect: o.label === correct.label
  }))
}

export const VISUAL_ACTIVITIES: ActivityDefinition[] = [
  {
    id: 'visual_level_1_colors',
    categoryId: 'visual_perception',
    title: 'Cores Primárias & Secundárias',
    subtitle: 'Parear e identificar cores iguais',
    methodology: 'TEACCH / Discriminação Cromática',
    emoji: '🎨',
    badgeColor: '#9333EA',
    description: 'Identificar e parear cores vibrantes idênticas ao modelo de referência.',
    tags: ['cores', 'pareamento', 'teacch'],
    isEnabled: true,
    isBuiltIn: true,
    order: 13,
    updatedAt: 0,
    questions: [
      {
        id: 'vis_l1_q1',
        levelId: 'visual_level_1_colors',
        type: 'color_match',
        prompt: 'QUAL COR É IGUAL AO MODELO?',
        ttsPrompt: 'Olhe a cor vermelha no centro. Toque na cor igual ao modelo!',
        visualTarget: { modelEmoji: '🔴', modelLabel: 'VERMELHO', modelColor: '#EF4444' },
        options: visOpts(
          { label: 'VERMELHO', emoji: '🔴' },
          { label: 'AZUL', emoji: '🔵' },
          { label: 'AMARELO', emoji: '🟡' },
          0
        )
      },
      {
        id: 'vis_l1_q2',
        levelId: 'visual_level_1_colors',
        type: 'color_match',
        prompt: 'QUAL COR É IGUAL AO MODELO?',
        ttsPrompt: 'Olhe a cor amarela. Toque na cor igual ao modelo!',
        visualTarget: { modelEmoji: '🟡', modelLabel: 'AMARELO', modelColor: '#EAB308' },
        options: visOpts(
          { label: 'AMARELO', emoji: '🟡' },
          { label: 'VERDE', emoji: '🟢' },
          { label: 'ROXO', emoji: '🟣' },
          1
        )
      },
      {
        id: 'vis_l1_q3',
        levelId: 'visual_level_1_colors',
        type: 'color_match',
        prompt: 'QUAL COR É IGUAL AO MODELO?',
        ttsPrompt: 'Olhe a cor azul. Toque na cor igual ao modelo!',
        visualTarget: { modelEmoji: '🔵', modelLabel: 'AZUL', modelColor: '#3B82F6' },
        options: visOpts(
          { label: 'AZUL', emoji: '🔵' },
          { label: 'VERMELHO', emoji: '🔴' },
          { label: 'VERDE', emoji: '🟢' },
          0
        )
      },
      {
        id: 'vis_l1_q4',
        levelId: 'visual_level_1_colors',
        type: 'color_match',
        prompt: 'QUAL COR É IGUAL AO MODELO?',
        ttsPrompt: 'Olhe a cor verde. Toque na cor igual ao modelo!',
        visualTarget: { modelEmoji: '🟢', modelLabel: 'VERDE', modelColor: '#22C55E' },
        options: visOpts(
          { label: 'VERDE', emoji: '🟢' },
          { label: 'AMARELO', emoji: '🟡' },
          { label: 'LARANJA', emoji: '🟠' },
          2
        )
      }
    ]
  },
  {
    id: 'visual_level_2_shapes',
    categoryId: 'visual_perception',
    title: 'Formas Geométricas & Símbolos',
    subtitle: 'Reconhecer formas e contornos iguais',
    methodology: 'Montessori / Pareamento Visual',
    emoji: '🔺',
    badgeColor: '#2563EB',
    description: 'Discriminação visual de formas geométricas clássicas e símbolos.',
    tags: ['formas', 'montessori', 'atenção visual'],
    isEnabled: true,
    isBuiltIn: true,
    order: 14,
    updatedAt: 0,
    questions: [
      {
        id: 'vis_l2_q1',
        levelId: 'visual_level_2_shapes',
        type: 'shape_match',
        prompt: 'QUAL FORMA É IGUAL AO MODELO?',
        ttsPrompt: 'Olhe o triângulo. Encontre a forma igual ao modelo!',
        visualTarget: { modelEmoji: '🔺', modelLabel: 'TRIÂNGULO' },
        options: visOpts(
          { label: 'TRIÂNGULO', emoji: '🔺' },
          { label: 'QUADRADO', emoji: '🟩' },
          { label: 'CÍRCULO', emoji: '⚪' },
          0
        )
      },
      {
        id: 'vis_l2_q2',
        levelId: 'visual_level_2_shapes',
        type: 'shape_match',
        prompt: 'QUAL FORMA É IGUAL AO MODELO?',
        ttsPrompt: 'Olhe a estrela. Encontre a estrela igual ao modelo!',
        visualTarget: { modelEmoji: '⭐', modelLabel: 'ESTRELA' },
        options: visOpts(
          { label: 'ESTRELA', emoji: '⭐' },
          { label: 'CÍRCULO', emoji: '⚪' },
          { label: 'CORAÇÃO', emoji: '💛' },
          1
        )
      },
      {
        id: 'vis_l2_q3',
        levelId: 'visual_level_2_shapes',
        type: 'shape_match',
        prompt: 'QUAL FORMA É IGUAL AO MODELO?',
        ttsPrompt: 'Olhe o quadrado. Encontre o quadrado igual!',
        visualTarget: { modelEmoji: '🟩', modelLabel: 'QUADRADO' },
        options: visOpts(
          { label: 'QUADRADO', emoji: '🟩' },
          { label: 'TRIÂNGULO', emoji: '🔺' },
          { label: 'ESTRELA', emoji: '⭐' },
          2
        )
      },
      {
        id: 'vis_l2_q4',
        levelId: 'visual_level_2_shapes',
        type: 'shape_match',
        prompt: 'QUAL FORMA É IGUAL AO MODELO?',
        ttsPrompt: 'Olhe o coração. Encontre o coração igual ao modelo!',
        visualTarget: { modelEmoji: '💛', modelLabel: 'CORAÇÃO' },
        options: visOpts(
          { label: 'CORAÇÃO', emoji: '💛' },
          { label: 'CÍRCULO', emoji: '⚪' },
          { label: 'ESTRELA', emoji: '⭐' },
          1
        )
      }
    ]
  },
  {
    id: 'visual_level_3_routines',
    categoryId: 'visual_perception',
    title: 'Sequência: Manhã & Higiene',
    subtitle: 'O que nós fazemos depois?',
    methodology: 'Rotina Estruturada PECS',
    emoji: '🪥',
    badgeColor: '#EA580C',
    description: 'Previsibilidade da rotina matinal e cuidados básicos de higiene.',
    tags: ['rotina', 'pecs', 'higiene'],
    isEnabled: true,
    isBuiltIn: true,
    order: 15,
    updatedAt: 0,
    questions: [
      {
        id: 'vis_l3_q1',
        levelId: 'visual_level_3_routines',
        type: 'routine_sequence',
        prompt: 'O QUE FAZEMOS DEPOIS DE ESCOVAR OS DENTES?',
        ttsPrompt: 'Acordou, escovou os dentes... O que fazemos depois na manhã?',
        visualTarget: {
          modelEmoji: '⏳',
          modelLabel: 'ROTINA DA MANHÃ',
          sequenceSteps: [
            { emoji: '🛌', label: 'ACORDAR' },
            { emoji: '🪥', label: 'ESCOVAR DENTES' }
          ],
          missingStepIndex: 2
        },
        options: visOpts(
          { label: 'TOMAR CAFÉ', emoji: '🥣' },
          { label: 'DORMIR', emoji: '🌙' },
          { label: 'TOMAR BANHO', emoji: '🛁' },
          0
        )
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
          sequenceSteps: [{ emoji: '🚽', label: 'BANHEIRO' }],
          missingStepIndex: 1
        },
        options: visOpts(
          { label: 'LAVAR AS MÃOS', emoji: '🧼' },
          { label: 'JOGAR BOLA', emoji: '⚽' },
          { label: 'PASSEAR', emoji: '🚗' },
          1
        )
      },
      {
        id: 'vis_l3_q3',
        levelId: 'visual_level_3_routines',
        type: 'routine_sequence',
        prompt: 'DEPOIS DE TOMAR BANHO, O QUE FAZEMOS?',
        ttsPrompt: 'Tomou banho, ficou limpinho... O que fazemos depois?',
        visualTarget: {
          modelEmoji: '⏳',
          modelLabel: 'BANHO',
          sequenceSteps: [{ emoji: '🚿', label: 'TOMAR BANHO' }],
          missingStepIndex: 1
        },
        options: visOpts(
          { label: 'VESTIR ROUPA', emoji: '👕' },
          { label: 'COMER LANCHE', emoji: '🥪' },
          { label: 'CHOVER', emoji: '🌧️' },
          0
        )
      }
    ]
  },
  {
    id: 'vis_routine_school',
    categoryId: 'visual_perception',
    title: 'Sequência: Escola & Refeição',
    subtitle: 'Passos do ambiente escolar',
    methodology: 'Encadeamento Temporal PECS',
    emoji: '🏫',
    badgeColor: '#D97706',
    description: 'Sequência lógica das atividades realizadas na escola e nas refeições.',
    tags: ['escola', 'rotina', 'sequência'],
    isEnabled: true,
    isBuiltIn: true,
    order: 16,
    updatedAt: 0,
    questions: [
      {
        id: 'vrs_q1',
        levelId: 'vis_routine_school',
        type: 'routine_sequence',
        prompt: 'DEPOIS DE ENTRAR NA SALA, O QUE FAZEMOS?',
        ttsPrompt: 'Chegou na escola, entrou na sala... O que fazemos depois?',
        visualTarget: {
          modelEmoji: '⏳',
          modelLabel: 'ESCOLA',
          sequenceSteps: [
            { emoji: '🎒', label: 'CHEGAR' },
            { emoji: '🚪', label: 'ENTRAR NA SALA' }
          ],
          missingStepIndex: 2
        },
        options: visOpts(
          { label: 'ESTUDAR', emoji: '📚' },
          { label: 'DORMIR', emoji: '🛏️' },
          { label: 'TOMAR BANHO', emoji: '🛁' },
          0
        )
      },
      {
        id: 'vrs_q2',
        levelId: 'vis_routine_school',
        type: 'routine_sequence',
        prompt: 'DEPOIS DE PINTAR COM TINTA, O QUE FAZEMOS?',
        ttsPrompt: 'Depois de pintar com tinta, o que fazemos com as mãos?',
        visualTarget: {
          modelEmoji: '⏳',
          modelLabel: 'ARTE',
          sequenceSteps: [{ emoji: '🎨', label: 'PINTAR TINTA' }],
          missingStepIndex: 1
        },
        options: visOpts(
          { label: 'LAVAR AS MÃOS', emoji: '🧼' },
          { label: 'ANDAR DE CARRO', emoji: '🚗' },
          { label: 'DORMIR', emoji: '🌙' },
          1
        )
      },
      {
        id: 'vrs_q3',
        levelId: 'vis_routine_school',
        type: 'routine_sequence',
        prompt: 'DEPOIS DE COMER O LANCHE, O QUE FAZEMOS?',
        ttsPrompt: 'Comeu o lanche! O que devemos fazer com os dentes?',
        visualTarget: {
          modelEmoji: '⏳',
          modelLabel: 'REFEIÇÃO',
          sequenceSteps: [{ emoji: '🥪', label: 'COMER LANCHE' }],
          missingStepIndex: 1
        },
        options: visOpts(
          { label: 'ESCOVAR DENTES', emoji: '🪥' },
          { label: 'VOAR', emoji: '✈️' },
          { label: 'CHOVER', emoji: '🌧️' },
          2
        )
      }
    ]
  },
  {
    id: 'vis_routine_night',
    categoryId: 'visual_perception',
    title: 'Sequência: Fim do Dia & Lazer',
    subtitle: 'Organização noturna e descanso',
    methodology: 'Rotina Estruturada / Autonomia',
    emoji: '🌙',
    badgeColor: '#7C3AED',
    description: 'Compreender a sequência saudável para brincar, guardar e descansar.',
    tags: ['rotina', 'sono', 'organização'],
    isEnabled: true,
    isBuiltIn: true,
    order: 17,
    updatedAt: 0,
    questions: [
      {
        id: 'vrn_q1',
        levelId: 'vis_routine_night',
        type: 'routine_sequence',
        prompt: 'DEPOIS DE BRINCAR, O QUE FAZEMOS COM OS BRINQUEDOS?',
        ttsPrompt: 'Brincou bastante! Antes de sair, o que fazemos com os brinquedos?',
        visualTarget: {
          modelEmoji: '⏳',
          modelLabel: 'ORGANIZAÇÃO',
          sequenceSteps: [{ emoji: '🎲', label: 'BRINCAR' }],
          missingStepIndex: 1
        },
        options: visOpts(
          { label: 'GUARDAR', emoji: '🧺' },
          { label: 'CHORAR', emoji: '😢' },
          { label: 'COMER', emoji: '🍎' },
          0
        )
      },
      {
        id: 'vrn_q2',
        levelId: 'vis_routine_night',
        type: 'routine_sequence',
        prompt: 'CHEGOU A NOITE E VESTIU O PIJAMA. O QUE VEM DEPOIS?',
        ttsPrompt: 'Chegou a noite, vestiu o pijama... O que fazemos na cama?',
        visualTarget: {
          modelEmoji: '⏳',
          modelLabel: 'HORA DE DORMIR',
          sequenceSteps: [
            { emoji: '🌙', label: 'NOITE' },
            { emoji: '🛌', label: 'DEITAR' }
          ],
          missingStepIndex: 2
        },
        options: visOpts(
          { label: 'DORMIR', emoji: '😴' },
          { label: 'IR À ESCOLA', emoji: '🎒' },
          { label: 'NADAR', emoji: '🏊' },
          1
        )
      }
    ]
  }
]
