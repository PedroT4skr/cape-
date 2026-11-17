import type { ActivityDefinition } from '../../types/activity.types'

export const DAILY_LOGIC_ACTIVITIES: ActivityDefinition[] = [
  {
    id: 'logic_associations',
    categoryId: 'daily_logic',
    title: 'O que Combina? (Associação Lógica)',
    subtitle: 'Relacionar objetos que trabalham juntos',
    methodology: 'Raciocínio Lógico / PECS',
    emoji: '🔗',
    badgeColor: '#EA580C',
    description: 'Desenvolver relações semânticas funcionais entre itens do cotidiano.',
    tags: ['lógica', 'associação', 'semântica'],
    isEnabled: true,
    isBuiltIn: true,
    order: 22,
    updatedAt: 0,
    questions: [
      {
        id: 'la_q1',
        levelId: 'logic_associations',
        type: 'shape_match',
        prompt: 'O QUE USAMOS QUANDO ESTÁ CHOVENDO?',
        ttsPrompt: 'Olhe a chuva caindo! Qual objeto combina com a chuva?',
        visualTarget: {
          modelEmoji: '🌧️',
          modelLabel: 'CHUVA',
          badgeText: 'O QUE COMBINA?',
          guidanceText: 'TOQUE NO OBJETO QUE COMBINA COM CHUVA'
        },
        options: [
          { id: 'opt_1', label: 'GUARDA-CHUVA', emojiVisual: '☂️', isCorrect: true },
          { id: 'opt_2', label: 'ÓCULOS SOL', emojiVisual: '🕶️', isCorrect: false },
          { id: 'opt_3', label: 'BOLA', emojiVisual: '⚽', isCorrect: false }
        ]
      },
      {
        id: 'la_q2',
        levelId: 'logic_associations',
        type: 'shape_match',
        prompt: 'O QUE USAMOS PARA ABRIR A PORTA TRANCADA?',
        ttsPrompt: 'A porta está fechada. Qual objeto abre a porta?',
        visualTarget: {
          modelEmoji: '🚪',
          modelLabel: 'PORTA',
          badgeText: 'O QUE COMBINA?',
          guidanceText: 'TOQUE NO QUE ABRE A PORTA'
        },
        options: [
          { id: 'opt_1', label: 'COLHER', emojiVisual: '🥄', isCorrect: false },
          { id: 'opt_2', label: 'CHAVE', emojiVisual: '🔑', isCorrect: true },
          { id: 'opt_3', label: 'LÁPIS', emojiVisual: '✏️', isCorrect: false }
        ]
      },
      {
        id: 'la_q3',
        levelId: 'logic_associations',
        type: 'shape_match',
        prompt: 'O QUE COLOCAMOS NOS PÉS ANTES DO TÊNIS?',
        ttsPrompt: 'Olhe o tênis! O que vestimos no pé antes de calçar o tênis?',
        visualTarget: {
          modelEmoji: '👟',
          modelLabel: 'TÊNIS',
          badgeText: 'O QUE COMBINA?',
          guidanceText: 'TOQUE NO QUE VAI COM O TÊNIS'
        },
        options: [
          { id: 'opt_1', label: 'BONÉ', emojiVisual: '🧢', isCorrect: false },
          { id: 'opt_2', label: 'MEIA', emojiVisual: '🧦', isCorrect: true },
          { id: 'opt_3', label: 'MOCHILA', emojiVisual: '🎒', isCorrect: false }
        ]
      },
      {
        id: 'la_q4',
        levelId: 'logic_associations',
        type: 'shape_match',
        prompt: 'QUAL OBJETO USAMOS PARA ESCOVAR OS DENTES?',
        ttsPrompt: 'Olhe o creme dental. O que usamos junto com ele?',
        visualTarget: {
          modelEmoji: '🦷',
          modelLabel: 'DENTES',
          badgeText: 'O QUE COMBINA?',
          guidanceText: 'TOQUE NO ITEM DE HIGIENE BUCAL'
        },
        options: [
          { id: 'opt_1', label: 'ESCOVA', emojiVisual: '🪥', isCorrect: true },
          { id: 'opt_2', label: 'GARFO', emojiVisual: '🍴', isCorrect: false },
          { id: 'opt_3', label: 'TESOURA', emojiVisual: '✂️', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'logic_safety_care',
    categoryId: 'daily_logic',
    title: 'Segurança & Cuidados Diários',
    subtitle: 'Identificar situações de risco e proteção',
    methodology: 'Vida Prática / Segurança',
    emoji: '🛡️',
    badgeColor: '#D97706',
    description: 'Reconhecer o que traz segurança ou requer atenção em casa e na rua.',
    tags: ['segurança', 'avd', 'autonomia'],
    isEnabled: true,
    isBuiltIn: true,
    order: 23,
    updatedAt: 0,
    questions: [
      {
        id: 'lsc_q1',
        levelId: 'logic_safety_care',
        type: 'shape_match',
        prompt: 'QUAL COR DO SEMÁFORO INDICA "PARE"?',
        ttsPrompt: 'No trânsito, qual luz do sinal pede para parar e esperar?',
        visualTarget: {
          modelEmoji: '🚦',
          modelLabel: 'TRÂNSITO',
          badgeText: 'SEGURANÇA NA RUA',
          guidanceText: 'QUAL COR SIGNIFICA PARE?'
        },
        options: [
          { id: 'opt_1', label: 'VERMELHO', emojiVisual: '🔴', isCorrect: true },
          { id: 'opt_2', label: 'VERDE', emojiVisual: '🟢', isCorrect: false },
          { id: 'opt_3', label: 'AZUL', emojiVisual: '🔵', isCorrect: false }
        ]
      },
      {
        id: 'lsc_q2',
        levelId: 'logic_safety_care',
        type: 'shape_match',
        prompt: 'O QUE PROTEGE A CABEÇA AO ANDAR DE BICICLETA?',
        ttsPrompt: 'Quando andamos de bicicleta, o que protege nossa cabeça?',
        visualTarget: {
          modelEmoji: '🚲',
          modelLabel: 'BICICLETA',
          badgeText: 'PROTEÇÃO',
          guidanceText: 'ESCOLHA O ITEM DE SEGURANÇA'
        },
        options: [
          { id: 'opt_1', label: 'CHINELO', emojiVisual: '🩴', isCorrect: false },
          { id: 'opt_2', label: 'CAPACETE', emojiVisual: '⛑️', isCorrect: true },
          { id: 'opt_3', label: 'LIVRO', emojiVisual: '📖', isCorrect: false }
        ]
      },
      {
        id: 'lsc_q3',
        levelId: 'logic_safety_care',
        type: 'shape_match',
        prompt: 'QUAL DESSES OBJETOS É QUENTE E NÃO DEVEMOS TOCAR?',
        ttsPrompt: 'Cuidado! Qual dessas figuras mostra algo muito quente?',
        visualTarget: {
          modelEmoji: '⚠️',
          modelLabel: 'CUIDADO',
          badgeText: 'PREVENÇÃO DE RISCOS',
          guidanceText: 'TOQUE NO QUE É MUITO QUENTE'
        },
        options: [
          { id: 'opt_1', label: 'GELO', emojiVisual: '🧊', isCorrect: false },
          { id: 'opt_2', label: 'URSINHO', emojiVisual: '🧸', isCorrect: false },
          { id: 'opt_3', label: 'FOGO', emojiVisual: '🔥', isCorrect: true }
        ]
      }
    ]
  },
  {
    id: 'logic_environments',
    categoryId: 'daily_logic',
    title: 'Classificação por Ambientes',
    subtitle: 'O que pertence à cozinha, escola e jardim',
    methodology: 'Categorização Semântica',
    emoji: '🏠',
    badgeColor: '#0284C7',
    description: 'Classificar objetos e animais conforme o lugar onde pertencem.',
    tags: ['ambientes', 'categorização', 'conceitos'],
    isEnabled: true,
    isBuiltIn: true,
    order: 24,
    updatedAt: 0,
    questions: [
      {
        id: 'len_q1',
        levelId: 'logic_environments',
        type: 'shape_match',
        prompt: 'O QUE ENCONTRAMOS NA COZINHA PARA COMER SOPA?',
        ttsPrompt: 'Estamos na cozinha! O que usamos para tomar sopa na tigela?',
        visualTarget: {
          modelEmoji: '🥣',
          modelLabel: 'COZINHA / SOPA',
          badgeText: 'AMBIENTE: COZINHA',
          guidanceText: 'QUAL TALHER PERTENCE À COZINHA?'
        },
        options: [
          { id: 'opt_1', label: 'COLHER', emojiVisual: '🥄', isCorrect: true },
          { id: 'opt_2', label: 'SABONETE', emojiVisual: '🧼', isCorrect: false },
          { id: 'opt_3', label: 'BOLA', emojiVisual: '⚽', isCorrect: false }
        ]
      },
      {
        id: 'len_q2',
        levelId: 'logic_environments',
        type: 'shape_match',
        prompt: 'QUAL ANIMAL VIVE NO MAR E NA ÁGUA?',
        ttsPrompt: 'Olhe o oceano azul! Qual animal mora dentro da água?',
        visualTarget: {
          modelEmoji: '🌊',
          modelLabel: 'OCEANO',
          badgeText: 'HABITAT NATURAL',
          guidanceText: 'TOQUE NO ANIMAL AQUÁTICO'
        },
        options: [
          { id: 'opt_1', label: 'GATO', emojiVisual: '🐱', isCorrect: false },
          { id: 'opt_2', label: 'PEIXE', emojiVisual: '🐠', isCorrect: true },
          { id: 'opt_3', label: 'GALINHA', emojiVisual: '🐔', isCorrect: false }
        ]
      },
      {
        id: 'len_q3',
        levelId: 'logic_environments',
        type: 'shape_match',
        prompt: 'O QUE LEVAMOS DENTRO DA MOCHILA ESCOLAR?',
        ttsPrompt: 'Na hora de ir à escola, o que colocamos na mochila?',
        visualTarget: {
          modelEmoji: '🏫',
          modelLabel: 'ESCOLA',
          badgeText: 'AMBIENTE ESCOLAR',
          guidanceText: 'TOQUE NO MATERIAL ESCOLAR'
        },
        options: [
          { id: 'opt_1', label: 'TRAVESSEIRO', emojiVisual: '🛏️', isCorrect: false },
          { id: 'opt_2', label: 'FRIGIDEIRA', emojiVisual: '🍳', isCorrect: false },
          { id: 'opt_3', label: 'CADERNO', emojiVisual: '📓', isCorrect: true }
        ]
      }
    ]
  },
  {
    id: 'logic_weather_clothes',
    categoryId: 'daily_logic',
    title: 'Clima, Tempo & Vestuário',
    subtitle: 'O que vestir no calor e no frio',
    methodology: 'Autonomia / Vida Diária',
    emoji: '☀️',
    badgeColor: '#F59E0B',
    description: 'Associar temperatura e clima com roupas e cuidados adequados.',
    tags: ['clima', 'vestuário', 'avd'],
    isEnabled: true,
    isBuiltIn: true,
    order: 25,
    updatedAt: 0,
    questions: [
      {
        id: 'lwc_q1',
        levelId: 'logic_weather_clothes',
        type: 'shape_match',
        prompt: 'QUANDO ESTÁ MUITO FRIO E NEVANDO, O QUE VESTIMOS?',
        ttsPrompt: 'Que frio! Quando está gelado, qual roupa nos esquenta?',
        visualTarget: {
          modelEmoji: '❄️',
          modelLabel: 'MUITO FRIO',
          badgeText: 'CLIMA GELADO',
          guidanceText: 'ESCOLHA A ROUPA DE FRIO'
        },
        options: [
          { id: 'opt_1', label: 'CASACO', emojiVisual: '🧥', isCorrect: true },
          { id: 'opt_2', label: 'SHORTS', emojiVisual: '🩳', isCorrect: false },
          { id: 'opt_3', label: 'SORVETE', emojiVisual: '🍦', isCorrect: false }
        ]
      },
      {
        id: 'lwc_q2',
        levelId: 'logic_weather_clothes',
        type: 'shape_match',
        prompt: 'NO DIA DE SOL QUENTE NA PRAIA, O QUE PROTEGE OS OLHOS?',
        ttsPrompt: 'Dia ensolarado! O que colocamos para proteger os olhos da luz?',
        visualTarget: {
          modelEmoji: '☀️',
          modelLabel: 'SOL FORTE',
          badgeText: 'CLIMA QUENTE',
          guidanceText: 'TOQUE NO ITEM DE PROTEÇÃO SOLAR'
        },
        options: [
          { id: 'opt_1', label: 'CACHECOL', emojiVisual: '🧣', isCorrect: false },
          { id: 'opt_2', label: 'ÓCULOS DE SOL', emojiVisual: '🕶️', isCorrect: true },
          { id: 'opt_3', label: 'BOTA DE NEVE', emojiVisual: '🥾', isCorrect: false }
        ]
      },
      {
        id: 'lwc_q3',
        levelId: 'logic_weather_clothes',
        type: 'shape_match',
        prompt: 'QUANDO SENTIMOS SEDE NO CALOR, O QUE DEVEMOS BEBER?',
        ttsPrompt: 'Está muito calor e estamos com sede! O que devemos beber?',
        visualTarget: {
          modelEmoji: '🥵',
          modelLabel: 'SEDE / CALOR',
          badgeText: 'HIDRATAÇÃO',
          guidanceText: 'TOQUE NA BEBIDA SAUDÁVEL'
        },
        options: [
          { id: 'opt_1', label: 'ÁGUA', emojiVisual: '💧', isCorrect: true },
          { id: 'opt_2', label: 'PIMENTA', emojiVisual: '🌶️', isCorrect: false },
          { id: 'opt_3', label: 'LÁPIS', emojiVisual: '✏️', isCorrect: false }
        ]
      }
    ]
  }
]
