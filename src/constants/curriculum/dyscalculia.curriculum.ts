import type { ActivityDefinition, ActivityOption } from '../../types/activity.types'

function numOpts(
  correct: number,
  alts: [number, number],
  emoji: string
): ActivityOption[] {
  const vals = [alts[0], correct, alts[1]].sort((a, b) => a - b)
  return vals.map((v, idx) => ({
    id: `opt_${idx + 1}`,
    label: String(v),
    numericValue: v,
    emojiVisual: v <= 6 ? emoji.repeat(v) : `${emoji} (${v})`,
    isCorrect: v === correct
  }))
}

export const DYSCALCULIA_ACTIVITIES: ActivityDefinition[] = [
  {
    id: 'level_1_subitizing',
    categoryId: 'dyscalculia',
    title: 'Contagem Básica (1 a 5)',
    subtitle: 'Reconhecimento visual imediato',
    methodology: 'CPA / Subitização',
    emoji: '🍎',
    badgeColor: '#16A34A',
    description: 'Contar objetos familiares de 1 a 5 com correspondência 1-a-1.',
    tags: ['iniciante', 'subitização', 'contagem'],
    isEnabled: true,
    isBuiltIn: true,
    order: 1,
    updatedAt: 0,
    questions: [
      {
        id: 'l1_q1',
        levelId: 'level_1_subitizing',
        type: 'count',
        prompt: 'QUANTAS MAÇÃS VOCÊ VÊ?',
        ttsPrompt: 'Quantas maçãs você vê na tela?',
        items: { emoji: '🍎', count: 2, label: 'MAÇÃS' },
        options: numOpts(2, [1, 3], '🍎')
      },
      {
        id: 'l1_q2',
        levelId: 'level_1_subitizing',
        type: 'count',
        prompt: 'QUANTAS BANANAS VOCÊ VÊ?',
        ttsPrompt: 'Quantas bananas você vê na tela?',
        items: { emoji: '🍌', count: 3, label: 'BANANAS' },
        options: numOpts(3, [2, 4], '🍌')
      },
      {
        id: 'l1_q3',
        levelId: 'level_1_subitizing',
        type: 'count',
        prompt: 'QUANTOS COPOS DE ÁGUA VOCÊ VÊ?',
        ttsPrompt: 'Quantos copos de água você vê?',
        items: { emoji: '🥤', count: 1, label: 'COPO' },
        options: numOpts(1, [2, 3], '🥤')
      },
      {
        id: 'l1_q4',
        levelId: 'level_1_subitizing',
        type: 'count',
        prompt: 'QUANTOS PÃES VOCÊ VÊ?',
        ttsPrompt: 'Quantos pães você vê na tela?',
        items: { emoji: '🥖', count: 4, label: 'PÃES' },
        options: numOpts(4, [3, 5], '🥖')
      },
      {
        id: 'l1_q5',
        levelId: 'level_1_subitizing',
        type: 'count',
        prompt: 'QUANTAS ESTRELAS VOCÊ VÊ?',
        ttsPrompt: 'Quantas estrelas você vê?',
        items: { emoji: '⭐', count: 5, label: 'ESTRELAS' },
        options: numOpts(5, [3, 4], '⭐')
      }
    ]
  },
  {
    id: 'dysc_count_6_10',
    categoryId: 'dyscalculia',
    title: 'Contagem Ampliada (6 a 10)',
    subtitle: 'Agrupamento visual até 10 unidades',
    methodology: 'CPA / Contagem Estendida',
    emoji: '🍓',
    badgeColor: '#059669',
    description: 'Desenvolver contagem sequencial de conjuntos maiores de 6 a 10 figuras.',
    tags: ['intermediário', 'contagem', '6 a 10'],
    isEnabled: true,
    isBuiltIn: true,
    order: 2,
    updatedAt: 0,
    questions: [
      {
        id: 'd610_q1',
        levelId: 'dysc_count_6_10',
        type: 'count',
        prompt: 'QUANTOS MORANGOS VOCÊ VÊ?',
        ttsPrompt: 'Conte com atenção quantos morangos aparecem na tela.',
        items: { emoji: '🍓', count: 6, label: 'MORANGOS' },
        options: numOpts(6, [5, 7], '🍓')
      },
      {
        id: 'd610_q2',
        levelId: 'dysc_count_6_10',
        type: 'count',
        prompt: 'QUANTAS BORBOLETAS VOCÊ VÊ?',
        ttsPrompt: 'Quantas borboletas você consegue contar?',
        items: { emoji: '🦋', count: 7, label: 'BORBOLETAS' },
        options: numOpts(7, [6, 8], '🦋')
      },
      {
        id: 'd610_q3',
        levelId: 'dysc_count_6_10',
        type: 'count',
        prompt: 'QUANTOS CORAÇÕES VOCÊ VÊ?',
        ttsPrompt: 'Conte devagar quantos corações existem na tela.',
        items: { emoji: '💙', count: 8, label: 'CORAÇÕES' },
        options: numOpts(8, [7, 9], '💙')
      },
      {
        id: 'd610_q4',
        levelId: 'dysc_count_6_10',
        type: 'count',
        prompt: 'QUANTAS FLORES VOCÊ VÊ?',
        ttsPrompt: 'Quantas flores estão no jardim?',
        items: { emoji: '🌻', count: 9, label: 'FLORES' },
        options: numOpts(9, [8, 10], '🌻')
      },
      {
        id: 'd610_q5',
        levelId: 'dysc_count_6_10',
        type: 'count',
        prompt: 'QUANTAS BOLAS VOCÊ VÊ?',
        ttsPrompt: 'Conte quantas bolas temos ao todo.',
        items: { emoji: '⚽', count: 10, label: 'BOLAS' },
        options: numOpts(10, [8, 9], '⚽')
      }
    ]
  },
  {
    id: 'level_2_addition',
    categoryId: 'dyscalculia',
    title: 'Adição Visual Iniciante',
    subtitle: 'Juntar conjuntos pequenos (até 5)',
    methodology: 'Numicon / Soma Pictórica',
    emoji: '➕',
    badgeColor: '#2563EB',
    description: 'Somar dois grupos visuais de alimentos com apoio concreto.',
    tags: ['adição', 'iniciante', 'cpa'],
    isEnabled: true,
    isBuiltIn: true,
    order: 3,
    updatedAt: 0,
    questions: [
      {
        id: 'l2_q1',
        levelId: 'level_2_addition',
        type: 'addition',
        prompt: 'VAMOS JUNTAR AS MAÇÃS! QUANTAS FICAM?',
        ttsPrompt: 'Uma maçã mais uma maçã. Quantas maçãs temos ao todo?',
        groupA: { emoji: '🍎', count: 1, label: '1 MAÇÃ' },
        groupB: { emoji: '🍎', count: 1, label: '1 MAÇÃ' },
        options: numOpts(2, [1, 3], '🍎')
      },
      {
        id: 'l2_q2',
        levelId: 'level_2_addition',
        type: 'addition',
        prompt: 'VAMOS JUNTAR AS LARANJAS! QUANTAS FICAM?',
        ttsPrompt: 'Duas laranjas mais uma laranja. Quantas temos ao todo?',
        groupA: { emoji: '🍊', count: 2, label: '2 LARANJAS' },
        groupB: { emoji: '🍊', count: 1, label: '1 LARANJA' },
        options: numOpts(3, [2, 4], '🍊')
      },
      {
        id: 'l2_q3',
        levelId: 'level_2_addition',
        type: 'addition',
        prompt: 'VAMOS JUNTAR OS SUCOS! QUANTOS FICAM?',
        ttsPrompt: 'Dois sucos mais dois sucos. Quantos sucos temos ao todo?',
        groupA: { emoji: '🧃', count: 2, label: '2 SUCOS' },
        groupB: { emoji: '🧃', count: 2, label: '2 SUCOS' },
        options: numOpts(4, [3, 5], '🧃')
      },
      {
        id: 'l2_q4',
        levelId: 'level_2_addition',
        type: 'addition',
        prompt: 'VAMOS JUNTAR AS BANANAS! QUANTAS FICAM?',
        ttsPrompt: 'Três bananas mais duas bananas. Quantas bananas temos ao todo?',
        groupA: { emoji: '🍌', count: 3, label: '3 BANANAS' },
        groupB: { emoji: '🍌', count: 2, label: '2 BANANAS' },
        options: numOpts(5, [4, 6], '🍌')
      }
    ]
  },
  {
    id: 'dysc_add_inter',
    categoryId: 'dyscalculia',
    title: 'Adição Visual Intermediária',
    subtitle: 'Juntar conjuntos maiores (até 8)',
    methodology: 'Numicon / Soma Concreta',
    emoji: '🧮',
    badgeColor: '#1D4ED8',
    description: 'Praticar somas de dois grupos visuais resultando de 5 a 8 elementos.',
    tags: ['adição', 'intermediário'],
    isEnabled: true,
    isBuiltIn: true,
    order: 4,
    updatedAt: 0,
    questions: [
      {
        id: 'dai_q1',
        levelId: 'dysc_add_inter',
        type: 'addition',
        prompt: 'QUANTOS COOKIES TEMOS JUNTANDO OS DOIS GRUPOS?',
        ttsPrompt: 'Três cookies mais três cookies. Quantos ficam ao todo?',
        groupA: { emoji: '🍪', count: 3, label: '3 COOKIES' },
        groupB: { emoji: '🍪', count: 3, label: '3 COOKIES' },
        options: numOpts(6, [5, 7], '🍪')
      },
      {
        id: 'dai_q2',
        levelId: 'dysc_add_inter',
        type: 'addition',
        prompt: 'JUNTANDO OS LÁPIS, QUANTOS FICAM?',
        ttsPrompt: 'Quatro lápis mais dois lápis. Quantos lápis temos?',
        groupA: { emoji: '✏️', count: 4, label: '4 LÁPIS' },
        groupB: { emoji: '✏️', count: 2, label: '2 LÁPIS' },
        options: numOpts(6, [5, 8], '✏️')
      },
      {
        id: 'dai_q3',
        levelId: 'dysc_add_inter',
        type: 'addition',
        prompt: 'QUANTOS PEIXINHOS TEMOS AO TODO?',
        ttsPrompt: 'Quatro peixinhos mais três peixinhos. Quantos temos ao todo?',
        groupA: { emoji: '🐠', count: 4, label: '4 PEIXES' },
        groupB: { emoji: '🐠', count: 3, label: '3 PEIXES' },
        options: numOpts(7, [6, 8], '🐠')
      },
      {
        id: 'dai_q4',
        levelId: 'dysc_add_inter',
        type: 'addition',
        prompt: 'QUANTAS ESTRELAS BRILHAM NO TOTAL?',
        ttsPrompt: 'Quatro estrelas mais quatro estrelas. Quantas estrelas ficam?',
        groupA: { emoji: '⭐', count: 4, label: '4 ESTRELAS' },
        groupB: { emoji: '⭐', count: 4, label: '4 ESTRELAS' },
        options: numOpts(8, [6, 7], '⭐')
      }
    ]
  },
  {
    id: 'level_3_magnitude',
    categoryId: 'dyscalculia',
    title: 'Mais ou Menos (Grandeza)',
    subtitle: 'Comparar esquerda e direita',
    methodology: 'Magnitude Visual',
    emoji: '⚖️',
    badgeColor: '#EA580C',
    description: 'Identificar visualmente qual lado possui maior ou menor quantidade.',
    tags: ['comparação', 'lateralidade', 'grandeza'],
    isEnabled: true,
    isBuiltIn: true,
    order: 5,
    updatedAt: 0,
    questions: [
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
      }
    ]
  },
  {
    id: 'dysc_functional_math',
    categoryId: 'dyscalculia',
    title: 'Matemática do Cotidiano',
    subtitle: 'Contar materiais escolares e brinquedos',
    methodology: 'Matemática Funcional AVD',
    emoji: '🎒',
    badgeColor: '#0284C7',
    description: 'Contagem e soma contextualizada com objetos reais da escola e casa.',
    tags: ['funcional', 'avd', 'escola'],
    isEnabled: true,
    isBuiltIn: true,
    order: 6,
    updatedAt: 0,
    questions: [
      {
        id: 'dfm_q1',
        levelId: 'dysc_functional_math',
        type: 'count',
        prompt: 'QUANTOS LIVROS ESTÃO NA MESA?',
        ttsPrompt: 'Quantos livros existem sobre a mesa?',
        items: { emoji: '📚', count: 4, label: 'LIVROS' },
        options: numOpts(4, [3, 5], '📚')
      },
      {
        id: 'dfm_q2',
        levelId: 'dysc_functional_math',
        type: 'addition',
        prompt: 'NA MOCHILA TINHA 2 LÁPIS E GANHOU 2. QUANTOS TEM?',
        ttsPrompt: 'Dois lápis mais dois lápis na mochila. Quantos ficaram?',
        groupA: { emoji: '✏️', count: 2, label: '2 LÁPIS' },
        groupB: { emoji: '✏️', count: 2, label: '2 LÁPIS' },
        options: numOpts(4, [3, 5], '✏️')
      },
      {
        id: 'dfm_q3',
        levelId: 'dysc_functional_math',
        type: 'comparison',
        prompt: 'ONDE TEM MENOS CARRINHOS?',
        ttsPrompt: 'Olhe os dois grupos. Onde há menos carrinhos?',
        targetComparison: 'less',
        optionLeft: { emoji: '🚗', count: 5, label: '5 CARROS' },
        optionRight: { emoji: '🚗', count: 2, label: '2 CARROS' },
        options: [
          { id: 'left', label: 'ESQUERDA', emojiVisual: '🚗 (5)', isCorrect: false },
          { id: 'right', label: 'DIREITA', emojiVisual: '🚗 (2)', isCorrect: true }
        ]
      },
      {
        id: 'dfm_q4',
        levelId: 'dysc_functional_math',
        type: 'count',
        prompt: 'QUANTOS DADOS VOCÊ VÊ?',
        ttsPrompt: 'Conte quantos dados apareceram na tela.',
        items: { emoji: '🎲', count: 6, label: 'DADOS' },
        options: numOpts(6, [4, 5], '🎲')
      }
    ]
  }
]
