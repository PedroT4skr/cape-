import type { ActivityDefinition, ActivityOption } from '../../types/activity.types'

function matchOpts(correct: string, a1: string, a2: string, pos: 0 | 1 | 2 = 0): ActivityOption[] {
  const arr = [a1, a2]
  arr.splice(pos, 0, correct)
  return arr.map((label, idx) => ({
    id: `opt_${idx + 1}`,
    label,
    isCorrect: label === correct
  }))
}

export const SOCIAL_EMOTIONS_ACTIVITIES: ActivityDefinition[] = [
  {
    id: 'soc_basic_emotions',
    categoryId: 'social_emotions',
    title: 'Identificando Emoções Básicas',
    subtitle: 'Alegria, tristeza, raiva e calma',
    methodology: 'Socioemocional / TEA',
    emoji: '😊',
    badgeColor: '#EC4899',
    description: 'Reconhecer expressões faciais básicas associando-as aos sentimentos.',
    tags: ['emoções', 'tea', 'expressões'],
    isEnabled: true,
    isBuiltIn: true,
    order: 18,
    updatedAt: 0,
    questions: [
      {
        id: 'sbe_q1',
        levelId: 'soc_basic_emotions',
        type: 'word_match',
        prompt: 'COMO ESTA PESSOA ESTÁ SE SENTINDO?',
        ttsPrompt: 'Olhe o rosto sorrindo! Como ela está se sentindo?',
        targetItem: { emoji: '😄', word: 'FELIZ', hintBadge: 'QUAL SENTIMENTO É ESTE?' },
        options: matchOpts('FELIZ', 'TRISTE', 'BRAVO', 0)
      },
      {
        id: 'sbe_q2',
        levelId: 'soc_basic_emotions',
        type: 'word_match',
        prompt: 'COMO ESTA PESSOA ESTÁ SE SENTINDO?',
        ttsPrompt: 'Olhe as lágrimas caindo. Que sentimento é esse?',
        targetItem: { emoji: '😢', word: 'TRISTE', hintBadge: 'QUAL SENTIMENTO É ESTE?' },
        options: matchOpts('TRISTE', 'FELIZ', 'SONO', 1)
      },
      {
        id: 'sbe_q3',
        levelId: 'soc_basic_emotions',
        type: 'word_match',
        prompt: 'COMO ESTA PESSOA ESTÁ SE SENTINDO?',
        ttsPrompt: 'Olhe a sobrancelha franzida! Que emoção ela demonstra?',
        targetItem: { emoji: '😡', word: 'BRAVO', hintBadge: 'QUAL SENTIMENTO É ESTE?' },
        options: matchOpts('BRAVO', 'CALMO', 'FELIZ', 2)
      },
      {
        id: 'sbe_q4',
        levelId: 'soc_basic_emotions',
        type: 'word_match',
        prompt: 'COMO ESTA PESSOA ESTÁ SE SENTINDO?',
        ttsPrompt: 'Olhe os olhos arregalados! Como ela ficou?',
        targetItem: { emoji: '😨', word: 'ASSUSTADO', hintBadge: 'QUAL SENTIMENTO É ESTE?' },
        options: matchOpts('ASSUSTADO', 'FELIZ', 'CALMO', 0)
      }
    ]
  },
  {
    id: 'soc_everyday_feelings',
    categoryId: 'social_emotions',
    title: 'Estados & Sensações do Dia',
    subtitle: 'Sono, cansaço, susto e carinho',
    methodology: 'Autorregulação Emocional',
    emoji: '🥰',
    badgeColor: '#DB2777',
    description: 'Auxiliar o aluno a nomear estados físicos e afetivos cotidianos.',
    tags: ['autorregulação', 'sentimentos', 'comunicação'],
    isEnabled: true,
    isBuiltIn: true,
    order: 19,
    updatedAt: 0,
    questions: [
      {
        id: 'sef_q1',
        levelId: 'soc_everyday_feelings',
        type: 'word_match',
        prompt: 'O QUE ESTA EXPRESSÃO MOSTRA?',
        ttsPrompt: 'Olhe o rosto bocejando de olhos fechados. O que ele sente?',
        targetItem: { emoji: '😴', word: 'SONO', hintBadge: 'O QUE ELA SENTE?' },
        options: matchOpts('SONO', 'FOME', 'RAIVA', 0)
      },
      {
        id: 'sef_q2',
        levelId: 'soc_everyday_feelings',
        type: 'word_match',
        prompt: 'O QUE ESTA EXPRESSÃO MOSTRA?',
        ttsPrompt: 'Olhe os corações no rosto! Qual sentimento é esse?',
        targetItem: { emoji: '🥰', word: 'CARINHO', hintBadge: 'O QUE ELA SENTE?' },
        options: matchOpts('CARINHO', 'MEDO', 'TRISTEZA', 1)
      },
      {
        id: 'sef_q3',
        levelId: 'soc_everyday_feelings',
        type: 'word_match',
        prompt: 'O QUE ESTA EXPRESSÃO MOSTRA?',
        ttsPrompt: 'Olhe o rosto pensando com a mão no queixo. O que ela está fazendo?',
        targetItem: { emoji: '🤔', word: 'PENSANDO', hintBadge: 'O QUE ESTÁ FAZENDO?' },
        options: matchOpts('PENSANDO', 'DORMINDO', 'CHORANDO', 2)
      },
      {
        id: 'sef_q4',
        levelId: 'soc_everyday_feelings',
        type: 'word_match',
        prompt: 'COMO ESTA PESSOA SE SENTE?',
        ttsPrompt: 'Olhe o rosto tranquilo e respirando devagar. Como ela está?',
        targetItem: { emoji: '😌', word: 'CALMA', hintBadge: 'QUAL ESTADO É ESTE?' },
        options: matchOpts('CALMA', 'BRAVA', 'ASSUSTADA', 0)
      }
    ]
  },
  {
    id: 'soc_manners_greetings',
    categoryId: 'social_emotions',
    title: 'Convivência & Boas Maneiras',
    subtitle: 'Gestos sociais e educação',
    methodology: 'Habilidades Sociais / CAA',
    emoji: '🤝',
    badgeColor: '#F43F5E',
    description: 'Reconhecer gestos de saudação, agradecimento, ajuda e respeito.',
    tags: ['social', 'gestos', 'convivência'],
    isEnabled: true,
    isBuiltIn: true,
    order: 20,
    updatedAt: 0,
    questions: [
      {
        id: 'smg_q1',
        levelId: 'soc_manners_greetings',
        type: 'word_match',
        prompt: 'QUANDO ALGUÉM ACENA ASSIM, O QUE DIZEMOS?',
        ttsPrompt: 'Quando encontramos um amigo acenando, o que dizemos?',
        targetItem: { emoji: '👋', word: 'OI / TCHAU', hintBadge: 'SAUDAÇÃO SOCIAL' },
        options: matchOpts('OLÁ', 'OBRIGADO', 'DESCULPA', 0)
      },
      {
        id: 'smg_q2',
        levelId: 'soc_manners_greetings',
        type: 'word_match',
        prompt: 'QUANDO RECEBEMOS UM PRESENTE, DIZEMOS...',
        ttsPrompt: 'Quando ganhamos algo especial, qual palavra mágica usamos?',
        targetItem: { emoji: '🎁', word: 'OBRIGADO', hintBadge: 'PALAVRA MÁGICA' },
        options: matchOpts('OBRIGADO', 'NÃO', 'SILÊNCIO', 1)
      },
      {
        id: 'smg_q3',
        levelId: 'soc_manners_greetings',
        type: 'word_match',
        prompt: 'QUANDO QUEREMOS PARABENIZAR UM COLEGA, FAZEMOS...',
        ttsPrompt: 'Quando um amigo acerta ou faz aniversário, batemos...',
        targetItem: { emoji: '👏', word: 'PALMAS', hintBadge: 'GESTO POSITIVO' },
        options: matchOpts('PALMAS', 'PULO', 'GRITO', 0)
      },
      {
        id: 'smg_q4',
        levelId: 'soc_manners_greetings',
        type: 'word_match',
        prompt: 'O QUE ESTE SINAL COM A MÃO SIGNIFICA?',
        ttsPrompt: 'Quando levantamos o polegar para cima, queremos dizer...',
        targetItem: { emoji: '👍', word: 'SIM / LEGAL', hintBadge: 'SINAL DE APOIO' },
        options: matchOpts('SIM / LEGAL', 'PERIGO', 'PROIBIDO', 2)
      }
    ]
  },
  {
    id: 'soc_senses_body',
    categoryId: 'social_emotions',
    title: 'Os 5 Sentidos & Corpo',
    subtitle: 'Ver, ouvir, cheirar, saborear e tocar',
    methodology: 'Consciência Corporal / Sensorial',
    emoji: '👀',
    badgeColor: '#E11D48',
    description: 'Associar os órgãos dos sentidos às ações perceptivas do corpo.',
    tags: ['sentidos', 'corpo humano', 'sensorial'],
    isEnabled: true,
    isBuiltIn: true,
    order: 21,
    updatedAt: 0,
    questions: [
      {
        id: 'ssb_q1',
        levelId: 'soc_senses_body',
        type: 'shape_match',
        prompt: 'COM QUAL PARTE DO CORPO NÓS OUVIMOS MÚSICA?',
        ttsPrompt: 'Olhe a nota musical! Com qual parte do corpo nós escutamos?',
        visualTarget: {
          modelEmoji: '🎵',
          modelLabel: 'MÚSICA / SOM',
          badgeText: 'PERCEPÇÃO AUDITIVA',
          guidanceText: 'TOQUE NO ÓRGÃO QUE OUVE O SOM'
        },
        options: [
          { id: 'opt_1', label: 'ORELHA', emojiVisual: '👂', isCorrect: true },
          { id: 'opt_2', label: 'NARIZ', emojiVisual: '👃', isCorrect: false },
          { id: 'opt_3', label: 'PÉ', emojiVisual: '🦶', isCorrect: false }
        ]
      },
      {
        id: 'ssb_q2',
        levelId: 'soc_senses_body',
        type: 'shape_match',
        prompt: 'COM QUAL PARTE NÓS VEMOS AS CORES E FIGURAS?',
        ttsPrompt: 'Para enxergar o arco-íris colorido, nós usamos os...',
        visualTarget: {
          modelEmoji: '🌈',
          modelLabel: 'VER CORES',
          badgeText: 'PERCEPÇÃO VISUAL',
          guidanceText: 'TOQUE NO ÓRGÃO DA VISÃO'
        },
        options: [
          { id: 'opt_1', label: 'BOCA', emojiVisual: '👄', isCorrect: false },
          { id: 'opt_2', label: 'OLHOS', emojiVisual: '👀', isCorrect: true },
          { id: 'opt_3', label: 'MÃO', emojiVisual: '✋', isCorrect: false }
        ]
      },
      {
        id: 'ssb_q3',
        levelId: 'soc_senses_body',
        type: 'shape_match',
        prompt: 'COM QUAL PARTE SENTIMOS O CHEIRO DA FLOR?',
        ttsPrompt: 'Qual parte do corpo sente o perfume da flor?',
        visualTarget: {
          modelEmoji: '🌸',
          modelLabel: 'PERFUME',
          badgeText: 'OLFATO',
          guidanceText: 'TOQUE NO ÓRGÃO DO OLFATO'
        },
        options: [
          { id: 'opt_1', label: 'ORELHA', emojiVisual: '👂', isCorrect: false },
          { id: 'opt_2', label: 'OLHOS', emojiVisual: '👀', isCorrect: false },
          { id: 'opt_3', label: 'NARIZ', emojiVisual: '👃', isCorrect: true }
        ]
      },
      {
        id: 'ssb_q4',
        levelId: 'soc_senses_body',
        type: 'shape_match',
        prompt: 'COM QUAL PARTE SENTIMOS O SABOR DO SORVETE?',
        ttsPrompt: 'Qual parte do corpo usamos para sentir o sabor gostoso?',
        visualTarget: {
          modelEmoji: '🍦',
          modelLabel: 'SABOR',
          badgeText: 'PALADAR',
          guidanceText: 'TOQUE NO ÓRGÃO DO PALADAR'
        },
        options: [
          { id: 'opt_1', label: 'BOCA', emojiVisual: '👅', isCorrect: true },
          { id: 'opt_2', label: 'NARIZ', emojiVisual: '👃', isCorrect: false },
          { id: 'opt_3', label: 'ORELHA', emojiVisual: '👂', isCorrect: false }
        ]
      }
    ]
  }
]
