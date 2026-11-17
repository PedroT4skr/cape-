import type { ActivityDefinition, ActivityOption } from '../../types/activity.types'

function textOpts(correct: string, alt1: string, alt2: string, pos: 0 | 1 | 2 = 0): ActivityOption[] {
  const arr = [alt1, alt2]
  arr.splice(pos, 0, correct)
  return arr.map((label, idx) => ({
    id: `opt_${idx + 1}`,
    label,
    isCorrect: label === correct
  }))
}

export const LITERACY_ACTIVITIES: ActivityDefinition[] = [
  {
    id: 'literacy_level_1_initial_letter',
    categoryId: 'literacy',
    title: 'Letra Inicial: Objetos & Cotidiano',
    subtitle: 'Descobrir com qual letra a palavra começa',
    methodology: 'Método Fônico / Aliteração',
    emoji: '🔤',
    badgeColor: '#16A34A',
    description: 'Identificar a primeira letra de figuras cotidianas familiares.',
    tags: ['alfabetização', 'letra inicial', 'fônico'],
    isEnabled: true,
    isBuiltIn: true,
    order: 7,
    updatedAt: 0,
    questions: [
      {
        id: 'lit_l1_q1',
        levelId: 'literacy_level_1_initial_letter',
        type: 'initial_letter',
        prompt: 'COM QUAL LETRA COMEÇA A BOLA?',
        ttsPrompt: 'Com qual letra começa a palavra bola? Bola começa com...',
        targetItem: { emoji: '⚽', word: 'BOLA', displayWord: '_ O L A', highlight: 'B' },
        options: textOpts('B', 'M', 'P', 0)
      },
      {
        id: 'lit_l1_q2',
        levelId: 'literacy_level_1_initial_letter',
        type: 'initial_letter',
        prompt: 'COM QUAL LETRA COMEÇA O GATO?',
        ttsPrompt: 'Com qual letra começa a palavra gato? Gato começa com...',
        targetItem: { emoji: '🐱', word: 'GATO', displayWord: '_ A T O', highlight: 'G' },
        options: textOpts('G', 'T', 'C', 1)
      },
      {
        id: 'lit_l1_q3',
        levelId: 'literacy_level_1_initial_letter',
        type: 'initial_letter',
        prompt: 'COM QUAL LETRA COMEÇA O SAPO?',
        ttsPrompt: 'Com qual letra começa a palavra sapo? Sapo começa com...',
        targetItem: { emoji: '🐸', word: 'SAPO', displayWord: '_ A P O', highlight: 'S' },
        options: textOpts('S', 'L', 'J', 2)
      },
      {
        id: 'lit_l1_q4',
        levelId: 'literacy_level_1_initial_letter',
        type: 'initial_letter',
        prompt: 'COM QUAL LETRA COMEÇA O CARRO?',
        ttsPrompt: 'Com qual letra começa a palavra carro? Carro começa com...',
        targetItem: { emoji: '🚗', word: 'CARRO', displayWord: '_ A R R O', highlight: 'C' },
        options: textOpts('C', 'F', 'D', 0)
      },
      {
        id: 'lit_l1_q5',
        levelId: 'literacy_level_1_initial_letter',
        type: 'initial_letter',
        prompt: 'COM QUAL LETRA COMEÇA O SOL?',
        ttsPrompt: 'Com qual letra começa a palavra sol? Sol começa com...',
        targetItem: { emoji: '☀️', word: 'SOL', displayWord: '_ O L', highlight: 'S' },
        options: textOpts('S', 'V', 'R', 1)
      }
    ]
  },
  {
    id: 'lit_initial_animals',
    categoryId: 'literacy',
    title: 'Letra Inicial: Animais',
    subtitle: 'Sons iniciais do mundo animal',
    methodology: 'Método Fônico / Aliteração',
    emoji: '🦁',
    badgeColor: '#15803D',
    description: 'Associar a letra inicial correta ao nome de animais conhecidos.',
    tags: ['animais', 'letra inicial', 'fonologia'],
    isEnabled: true,
    isBuiltIn: true,
    order: 8,
    updatedAt: 0,
    questions: [
      {
        id: 'lia_q1',
        levelId: 'lit_initial_animals',
        type: 'initial_letter',
        prompt: 'COM QUAL LETRA COMEÇA O LEÃO?',
        ttsPrompt: 'Leão começa com qual letra? Lllleão...',
        targetItem: { emoji: '🦁', word: 'LEÃO', displayWord: '_ E Ã O', highlight: 'L' },
        options: textOpts('L', 'M', 'P', 1)
      },
      {
        id: 'lia_q2',
        levelId: 'lit_initial_animals',
        type: 'initial_letter',
        prompt: 'COM QUAL LETRA COMEÇA O ELEFANTE?',
        ttsPrompt: 'Elefante começa com qual vogal? Eeeelefante...',
        targetItem: { emoji: '🐘', word: 'ELEFANTE', displayWord: '_ L E F A N T E', highlight: 'E' },
        options: textOpts('E', 'A', 'U', 0)
      },
      {
        id: 'lia_q3',
        levelId: 'lit_initial_animals',
        type: 'initial_letter',
        prompt: 'COM QUAL LETRA COMEÇA A VACA?',
        ttsPrompt: 'Vaca começa com qual letra? Vvvvaca...',
        targetItem: { emoji: '🐮', word: 'VACA', displayWord: '_ A C A', highlight: 'V' },
        options: textOpts('V', 'B', 'F', 2)
      },
      {
        id: 'lia_q4',
        levelId: 'lit_initial_animals',
        type: 'initial_letter',
        prompt: 'COM QUAL LETRA COMEÇA O PATO?',
        ttsPrompt: 'Pato começa com qual letra? Ppppato...',
        targetItem: { emoji: '🦆', word: 'PATO', displayWord: '_ A T O', highlight: 'P' },
        options: textOpts('P', 'D', 'T', 1)
      }
    ]
  },
  {
    id: 'lit_initial_fruits',
    categoryId: 'literacy',
    title: 'Letra Inicial: Frutas & Lanches',
    subtitle: 'Vogais e consoantes nos alimentos',
    methodology: 'Método Fônico / Vocabulário',
    emoji: '🍇',
    badgeColor: '#22C55E',
    description: 'Reconhecer a letra inicial de frutas e alimentos do dia a dia.',
    tags: ['frutas', 'alimentos', 'vogais'],
    isEnabled: true,
    isBuiltIn: true,
    order: 9,
    updatedAt: 0,
    questions: [
      {
        id: 'lif_q1',
        levelId: 'lit_initial_fruits',
        type: 'initial_letter',
        prompt: 'COM QUAL LETRA COMEÇA A UVA?',
        ttsPrompt: 'Uva começa com qual vogal? Uuuuva...',
        targetItem: { emoji: '🍇', word: 'UVA', displayWord: '_ V A', highlight: 'U' },
        options: textOpts('U', 'O', 'A', 0)
      },
      {
        id: 'lif_q2',
        levelId: 'lit_initial_fruits',
        type: 'initial_letter',
        prompt: 'COM QUAL LETRA COMEÇA O ABACAXI?',
        ttsPrompt: 'Abacaxi começa com qual letra? Aaaabacaxi...',
        targetItem: { emoji: '🍍', word: 'ABACAXI', displayWord: '_ B A C A X I', highlight: 'A' },
        options: textOpts('A', 'E', 'I', 1)
      },
      {
        id: 'lif_q3',
        levelId: 'lit_initial_fruits',
        type: 'initial_letter',
        prompt: 'COM QUAL LETRA COMEÇA A MAÇÃ?',
        ttsPrompt: 'Maçã começa com qual letra? Mmmmaçã...',
        targetItem: { emoji: '🍎', word: 'MAÇÃ', displayWord: '_ A Ç Ã', highlight: 'M' },
        options: textOpts('M', 'N', 'B', 2)
      },
      {
        id: 'lif_q4',
        levelId: 'lit_initial_fruits',
        type: 'initial_letter',
        prompt: 'COM QUAL LETRA COMEÇA A LARANJA?',
        ttsPrompt: 'Laranja começa com qual letra? Llllaranja...',
        targetItem: { emoji: '🍊', word: 'LARANJA', displayWord: '_ A R A N J A', highlight: 'L' },
        options: textOpts('L', 'R', 'S', 0)
      }
    ]
  },
  {
    id: 'literacy_level_2_syllables',
    categoryId: 'literacy',
    title: 'Sílaba Inicial: Palavras Simples',
    subtitle: 'Qual é o primeiro pedacinho?',
    methodology: 'Segmentação Silábica',
    emoji: '🧩',
    badgeColor: '#2563EB',
    description: 'Identificar a sílaba inicial de palavras curtas com apoio visual.',
    tags: ['sílabas', 'iniciante', 'consciência silábica'],
    isEnabled: true,
    isBuiltIn: true,
    order: 10,
    updatedAt: 0,
    questions: [
      {
        id: 'lit_l2_q1',
        levelId: 'literacy_level_2_syllables',
        type: 'syllables',
        prompt: 'QUAL É O COMEÇO DE CASA?',
        ttsPrompt: 'Qual é o primeiro pedacinho de casa? Ca... sa.',
        targetItem: { emoji: '🏠', word: 'CASA', displayWord: '[ ? ] - SA', highlight: 'CA' },
        options: textOpts('CA', 'BA', 'DA', 0)
      },
      {
        id: 'lit_l2_q2',
        levelId: 'literacy_level_2_syllables',
        type: 'syllables',
        prompt: 'QUAL É O COMEÇO DE MACACO?',
        ttsPrompt: 'Qual é o primeiro pedacinho de macaco? Ma... ca... co.',
        targetItem: { emoji: '🐒', word: 'MACACO', displayWord: '[ ? ] - CA - CO', highlight: 'MA' },
        options: textOpts('MA', 'SA', 'PA', 2)
      },
      {
        id: 'lit_l2_q3',
        levelId: 'literacy_level_2_syllables',
        type: 'syllables',
        prompt: 'QUAL É O COMEÇO DE PIPOCA?',
        ttsPrompt: 'Qual é o primeiro pedacinho de pipoca? Pi... po... ca.',
        targetItem: { emoji: '🍿', word: 'PIPOCA', displayWord: '[ ? ] - PO - CA', highlight: 'PI' },
        options: textOpts('PI', 'TI', 'BI', 1)
      },
      {
        id: 'lit_l2_q4',
        levelId: 'literacy_level_2_syllables',
        type: 'syllables',
        prompt: 'QUAL É O COMEÇO DE PATO?',
        ttsPrompt: 'Qual é o primeiro pedacinho de pato? Pa... to.',
        targetItem: { emoji: '🦆', word: 'PATO', displayWord: '[ ? ] - TO', highlight: 'PA' },
        options: textOpts('PA', 'LA', 'TA', 0)
      }
    ]
  },
  {
    id: 'lit_syllables_extended',
    categoryId: 'literacy',
    title: 'Sílaba Inicial: Palavras Maiores',
    subtitle: 'Segmentação com trissílabas e dígrafos',
    methodology: 'Segmentação Silábica Avançada',
    emoji: '🦋',
    badgeColor: '#1D4ED8',
    description: 'Praticar sílabas iniciais em palavras mais longas do cotidiano.',
    tags: ['sílabas', 'intermediário'],
    isEnabled: true,
    isBuiltIn: true,
    order: 11,
    updatedAt: 0,
    questions: [
      {
        id: 'lse_q1',
        levelId: 'lit_syllables_extended',
        type: 'syllables',
        prompt: 'QUAL É A PRIMEIRA SÍLABA DE BORBOLETA?',
        ttsPrompt: 'Bor... bo... le... ta. Qual é o primeiro pedaço?',
        targetItem: { emoji: '🦋', word: 'BORBOLETA', displayWord: '[ ? ] - BOLETA', highlight: 'BOR' },
        options: textOpts('BOR', 'COR', 'MOR', 0)
      },
      {
        id: 'lse_q2',
        levelId: 'lit_syllables_extended',
        type: 'syllables',
        prompt: 'QUAL É A PRIMEIRA SÍLABA DE TARTARUGA?',
        ttsPrompt: 'Tar... ta... ru... ga. Como começa?',
        targetItem: { emoji: '🐢', word: 'TARTARUGA', displayWord: '[ ? ] - TARUGA', highlight: 'TAR' },
        options: textOpts('TAR', 'CAR', 'MAR', 1)
      },
      {
        id: 'lse_q3',
        levelId: 'lit_syllables_extended',
        type: 'syllables',
        prompt: 'QUAL É A PRIMEIRA SÍLABA DE SORVETE?',
        ttsPrompt: 'Sor... ve... te. Qual é a primeira sílaba?',
        targetItem: { emoji: '🍦', word: 'SORVETE', displayWord: '[ ? ] - VETE', highlight: 'SOR' },
        options: textOpts('SOR', 'COR', 'FOR', 2)
      },
      {
        id: 'lse_q4',
        levelId: 'lit_syllables_extended',
        type: 'syllables',
        prompt: 'QUAL É A PRIMEIRA SÍLABA DE CHUVA?',
        ttsPrompt: 'Chu... va. Com qual pedacinho começa chuva?',
        targetItem: { emoji: '🌧️', word: 'CHUVA', displayWord: '[ ? ] - VA', highlight: 'CHU' },
        options: textOpts('CHU', 'XU', 'JU', 0)
      }
    ]
  },
  {
    id: 'literacy_level_3_word_matching',
    categoryId: 'literacy',
    title: 'Pareamento Figura-Palavra (TEACCH)',
    subtitle: 'Ligar a imagem à palavra escrita',
    methodology: 'Leitura Global TEACCH / PECS',
    emoji: '📖',
    badgeColor: '#EA580C',
    description: 'Associação direta entre pictograma concreto e palavra em caixa alta.',
    tags: ['teacch', 'pecs', 'leitura global'],
    isEnabled: true,
    isBuiltIn: true,
    order: 12,
    updatedAt: 0,
    questions: [
      {
        id: 'lit_l3_q1',
        levelId: 'literacy_level_3_word_matching',
        type: 'word_match',
        prompt: 'QUAL PALAVRA É ESTA FIGURA?',
        ttsPrompt: 'Qual é a palavra para esta fruta? Maçã.',
        targetItem: { emoji: '🍎', word: 'MAÇÃ' },
        options: textOpts('MAÇÃ', 'UVA', 'BANANA', 0)
      },
      {
        id: 'lit_l3_q2',
        levelId: 'literacy_level_3_word_matching',
        type: 'word_match',
        prompt: 'QUAL PALAVRA É ESTA FIGURA?',
        ttsPrompt: 'Qual é a palavra para este animal? Cachorro.',
        targetItem: { emoji: '🐶', word: 'CACHORRO' },
        options: textOpts('CACHORRO', 'GATO', 'PÁSSARO', 1)
      },
      {
        id: 'lit_l3_q3',
        levelId: 'literacy_level_3_word_matching',
        type: 'word_match',
        prompt: 'QUAL PALAVRA É ESTA FIGURA?',
        ttsPrompt: 'Qual é a palavra para esta figura? Casa.',
        targetItem: { emoji: '🏠', word: 'CASA' },
        options: textOpts('CASA', 'ESCOLA', 'PARQUE', 2)
      },
      {
        id: 'lit_l3_q4',
        levelId: 'literacy_level_3_word_matching',
        type: 'word_match',
        prompt: 'QUAL PALAVRA É ESTA FIGURA?',
        ttsPrompt: 'Qual é a palavra para esta figura? Livro.',
        targetItem: { emoji: '📖', word: 'LIVRO' },
        options: textOpts('LIVRO', 'LÁPIS', 'CADERNO', 0)
      }
    ]
  }
]
