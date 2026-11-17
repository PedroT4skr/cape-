import type { ActivityDefinition } from '../../types/activity.types'
import { buildActivity, qLetter, qSyllable, qWord } from './curriculum.helpers'

export const LITERACY_ACTIVITIES: ActivityDefinition[] = [
  buildActivity({
    id: 'literacy_level_1_initial_letter',
    categoryId: 'literacy',
    title: 'Letra Inicial: Objetos & Cotidiano',
    subtitle: 'Descobrir com qual letra a palavra começa',
    methodology: 'Método Fônico (National Reading Panel)',
    emoji: '🔤',
    badgeColor: '#16A34A',
    description: 'Identificar a primeira letra de figuras cotidianas familiares.',
    tags: ['alfabetização', 'letra inicial', 'fônico'],
    evidenceId: 'ev_literacy_nrp',
    order: 11,
    questions: [
      qLetter('literacy_level_1_initial_letter', 'lit_l1_q1', 'COM QUAL LETRA COMEÇA A BOLA?', 'Com qual letra começa bola?', '⚽', 'BOLA', 'B', '_ O L A', ['M', 'P'], 0),
      qLetter('literacy_level_1_initial_letter', 'lit_l1_q2', 'COM QUAL LETRA COMEÇA O GATO?', 'Com qual letra começa gato?', '🐱', 'GATO', 'G', '_ A T O', ['T', 'C'], 1),
      qLetter('literacy_level_1_initial_letter', 'lit_l1_q3', 'COM QUAL LETRA COMEÇA O SAPO?', 'Com qual letra começa sapo?', '🐸', 'SAPO', 'S', '_ A P O', ['L', 'J'], 2),
      qLetter('literacy_level_1_initial_letter', 'lit_l1_q4', 'COM QUAL LETRA COMEÇA O CARRO?', 'Com qual letra começa carro?', '🚗', 'CARRO', 'C', '_ A R R O', ['F', 'D'], 0),
      qLetter('literacy_level_1_initial_letter', 'lit_l1_q5', 'COM QUAL LETRA COMEÇA O SOL?', 'Com qual letra começa sol?', '☀️', 'SOL', 'S', '_ O L', ['V', 'R'], 1)
    ]
  }),
  buildActivity({
    id: 'lit_initial_animals',
    categoryId: 'literacy',
    title: 'Letra Inicial: Animais',
    subtitle: 'Sons iniciais do mundo animal',
    methodology: 'Consciência Fonêmica (NRP)',
    emoji: '🦁',
    badgeColor: '#15803D',
    description: 'Associar a letra inicial correta ao nome de animais conhecidos.',
    tags: ['animais', 'letra inicial', 'fonologia'],
    evidenceId: 'ev_literacy_nrp',
    order: 12,
    questions: [
      qLetter('lit_initial_animals', 'lia_q1', 'COM QUAL LETRA COMEÇA O LEÃO?', 'Leão começa com qual letra?', '🦁', 'LEÃO', 'L', '_ E Ã O', ['M', 'P'], 1),
      qLetter('lit_initial_animals', 'lia_q2', 'COM QUAL LETRA COMEÇA O ELEFANTE?', 'Elefante começa com qual vogal?', '🐘', 'ELEFANTE', 'E', '_ L E F A N T E', ['A', 'U'], 0),
      qLetter('lit_initial_animals', 'lia_q3', 'COM QUAL LETRA COMEÇA A VACA?', 'Vaca começa com qual letra?', '🐮', 'VACA', 'V', '_ A C A', ['B', 'F'], 2),
      qLetter('lit_initial_animals', 'lia_q4', 'COM QUAL LETRA COMEÇA O PATO?', 'Pato começa com qual letra?', '🦆', 'PATO', 'P', '_ A T O', ['D', 'T'], 1)
    ]
  }),
  buildActivity({
    id: 'lit_initial_fruits',
    categoryId: 'literacy',
    title: 'Letra Inicial: Frutas & Lanches',
    subtitle: 'Vogais e consoantes nos alimentos',
    methodology: 'Método Fônico / Vocabulário',
    emoji: '🍇',
    badgeColor: '#22C55E',
    description: 'Reconhecer a letra inicial de frutas e alimentos do dia a dia.',
    tags: ['frutas', 'alimentos', 'vogais'],
    evidenceId: 'ev_literacy_nrp',
    order: 13,
    questions: [
      qLetter('lit_initial_fruits', 'lif_q1', 'COM QUAL LETRA COMEÇA A UVA?', 'Uva começa com qual vogal?', '🍇', 'UVA', 'U', '_ V A', ['O', 'A'], 0),
      qLetter('lit_initial_fruits', 'lif_q2', 'COM QUAL LETRA COMEÇA O ABACAXI?', 'Abacaxi começa com qual letra?', '🍍', 'ABACAXI', 'A', '_ B A C A X I', ['E', 'I'], 1),
      qLetter('lit_initial_fruits', 'lif_q3', 'COM QUAL LETRA COMEÇA A MAÇÃ?', 'Maçã começa com qual letra?', '🍎', 'MAÇÃ', 'M', '_ A Ç Ã', ['N', 'B'], 2),
      qLetter('lit_initial_fruits', 'lif_q4', 'COM QUAL LETRA COMEÇA A LARANJA?', 'Laranja começa com qual letra?', '🍊', 'LARANJA', 'L', '_ A R A N J A', ['R', 'S'], 0)
    ]
  }),
  buildActivity({
    id: 'lit_vowels_initial',
    categoryId: 'literacy',
    title: 'Vogais Iniciais: A, E, I, O, U',
    subtitle: 'Identificar as 5 vogais pelo som inicial',
    methodology: 'Aliteração Fônica (NICHD / BNCC)',
    emoji: '🐝',
    badgeColor: '#10B981',
    description: 'Consolidar as cinco vogais por meio de figuras sonoras claras.',
    tags: ['vogais', 'iniciante', 'fônico'],
    evidenceId: 'ev_literacy_nrp',
    order: 14,
    questions: [
      qLetter('lit_vowels_initial', 'lvi_q1', 'COM QUAL VOGAL COMEÇA A ABELHA?', 'Aaaabelha começa com...', '🐝', 'ABELHA', 'A', '_ B E L H A', ['E', 'O'], 0),
      qLetter('lit_vowels_initial', 'lvi_q2', 'COM QUAL VOGAL COMEÇA A ESTRELA?', 'Eeeestrela começa com...', '⭐', 'ESTRELA', 'E', '_ S T R E L A', ['A', 'I'], 1),
      qLetter('lit_vowels_initial', 'lvi_q3', 'COM QUAL VOGAL COMEÇA A ILHA?', 'Iiiilha começa com...', '🏝️', 'ILHA', 'I', '_ L H A', ['O', 'U'], 2),
      qLetter('lit_vowels_initial', 'lvi_q4', 'COM QUAL VOGAL COMEÇA O OVO?', 'Oooovo começa com...', '🥚', 'OVO', 'O', '_ V O', ['A', 'U'], 0),
      qLetter('lit_vowels_initial', 'lvi_q5', 'COM QUAL VOGAL COMEÇA O URSO?', 'Uuuurso começa com...', '🐻', 'URSO', 'U', '_ R S O', ['I', 'O'], 1)
    ]
  }),
  buildActivity({
    id: 'lit_nature_house_letter',
    categoryId: 'literacy',
    title: 'Letra Inicial: Natureza & Casa',
    subtitle: 'Explorar consoantes do ambiente',
    methodology: 'Instrução Fônica Sistemática (NRP)',
    emoji: '🌳',
    badgeColor: '#059669',
    description: 'Associar letras iniciais a elementos da natureza e da moradia.',
    tags: ['natureza', 'casa', 'consoantes'],
    evidenceId: 'ev_literacy_nrp',
    order: 15,
    questions: [
      qLetter('lit_nature_house_letter', 'lnh_q1', 'COM QUAL LETRA COMEÇA A FLOR?', 'Flor começa com qual letra?', '🌸', 'FLOR', 'F', '_ L O R', ['V', 'P'], 0),
      qLetter('lit_nature_house_letter', 'lnh_q2', 'COM QUAL LETRA COMEÇA A MESA?', 'Mesa começa com qual letra?', '🪑', 'MESA', 'M', '_ E S A', ['N', 'L'], 1),
      qLetter('lit_nature_house_letter', 'lnh_q3', 'COM QUAL LETRA COMEÇA A PORTA?', 'Porta começa com qual letra?', '🚪', 'PORTA', 'P', '_ O R T A', ['B', 'T'], 2),
      qLetter('lit_nature_house_letter', 'lnh_q4', 'COM QUAL LETRA COMEÇA A NUVEM?', 'Nuvem começa com qual letra?', '☁️', 'NUVEM', 'N', '_ U V E M', ['M', 'S'], 0)
    ]
  }),
  buildActivity({
    id: 'literacy_level_2_syllables',
    categoryId: 'literacy',
    title: 'Sílaba Inicial: Palavras Simples',
    subtitle: 'Qual é o primeiro pedacinho?',
    methodology: 'Segmentação Silábica (NRP)',
    emoji: '🧩',
    badgeColor: '#2563EB',
    description: 'Identificar a sílaba inicial de palavras curtas com apoio visual.',
    tags: ['sílabas', 'iniciante', 'consciência silábica'],
    evidenceId: 'ev_literacy_nrp',
    order: 16,
    questions: [
      qSyllable('literacy_level_2_syllables', 'lit_l2_q1', 'QUAL É O COMEÇO DE CASA?', 'Qual é o primeiro pedaço de ca-sa?', '🏠', 'CASA', 'CA', '[ ? ] - SA', ['BA', 'DA'], 0),
      qSyllable('literacy_level_2_syllables', 'lit_l2_q2', 'QUAL É O COMEÇO DE MACACO?', 'Qual é o primeiro pedaço de ma-ca-co?', '🐒', 'MACACO', 'MA', '[ ? ] - CA - CO', ['SA', 'PA'], 2),
      qSyllable('literacy_level_2_syllables', 'lit_l2_q3', 'QUAL É O COMEÇO DE PIPOCA?', 'Qual é o primeiro pedaço de pi-po-ca?', '🍿', 'PIPOCA', 'PI', '[ ? ] - PO - CA', ['TI', 'BI'], 1),
      qSyllable('literacy_level_2_syllables', 'lit_l2_q4', 'QUAL É O COMEÇO DE PATO?', 'Qual é o primeiro pedaço de pa-to?', '🦆', 'PATO', 'PA', '[ ? ] - TO', ['LA', 'TA'], 0)
    ]
  }),
  buildActivity({
    id: 'lit_syllables_extended',
    categoryId: 'literacy',
    title: 'Sílaba Inicial: Palavras Maiores',
    subtitle: 'Trissílabas e dígrafos cotidianos',
    methodology: 'Segmentação Silábica Avançada',
    emoji: '🦋',
    badgeColor: '#1D4ED8',
    description: 'Praticar sílabas iniciais em palavras mais longas do cotidiano.',
    tags: ['sílabas', 'intermediário'],
    evidenceId: 'ev_literacy_nrp',
    order: 17,
    questions: [
      qSyllable('lit_syllables_extended', 'lse_q1', 'QUAL É A PRIMEIRA SÍLABA DE BORBOLETA?', 'Bor-bo-le-ta. Qual é o começo?', '🦋', 'BORBOLETA', 'BOR', '[ ? ] - BOLETA', ['COR', 'MOR'], 0),
      qSyllable('lit_syllables_extended', 'lse_q2', 'QUAL É A PRIMEIRA SÍLABA DE TARTARUGA?', 'Tar-ta-ru-ga. Como começa?', '🐢', 'TARTARUGA', 'TAR', '[ ? ] - TARUGA', ['CAR', 'MAR'], 1),
      qSyllable('lit_syllables_extended', 'lse_q3', 'QUAL É A PRIMEIRA SÍLABA DE SORVETE?', 'Sor-ve-te. Qual é a primeira sílaba?', '🍦', 'SORVETE', 'SOR', '[ ? ] - VETE', ['COR', 'FOR'], 2),
      qSyllable('lit_syllables_extended', 'lse_q4', 'QUAL É A PRIMEIRA SÍLABA DE CHUVA?', 'Chu-va. Com qual pedacinho começa?', '🌧️', 'CHUVA', 'CHU', '[ ? ] - VA', ['XU', 'JU'], 0)
    ]
  }),
  buildActivity({
    id: 'literacy_level_3_word_matching',
    categoryId: 'literacy',
    title: 'Pareamento Figura-Palavra (TEACCH)',
    subtitle: 'Ligar a imagem à palavra escrita',
    methodology: 'Leitura Global TEACCH / PECS',
    emoji: '📖',
    badgeColor: '#EA580C',
    description: 'Associação direta entre pictograma concreto e palavra em caixa alta.',
    tags: ['teacch', 'pecs', 'leitura global'],
    evidenceId: 'ev_visual_ncaep',
    order: 18,
    questions: [
      qWord('literacy_level_3_word_matching', 'lit_l3_q1', 'QUAL PALAVRA É ESTA FIGURA?', 'Qual é a palavra para esta fruta?', '🍎', 'MAÇÃ', ['UVA', 'BANANA'], 'ESCOLHA A PALAVRA CORRETA', 0),
      qWord('literacy_level_3_word_matching', 'lit_l3_q2', 'QUAL PALAVRA É ESTA FIGURA?', 'Qual é a palavra para este animal?', '🐶', 'CACHORRO', ['GATO', 'PÁSSARO'], 'ESCOLHA A PALAVRA CORRETA', 1),
      qWord('literacy_level_3_word_matching', 'lit_l3_q3', 'QUAL PALAVRA É ESTA FIGURA?', 'Qual é a palavra para esta figura?', '🏠', 'CASA', ['ESCOLA', 'PARQUE'], 'ESCOLHA A PALAVRA CORRETA', 2),
      qWord('literacy_level_3_word_matching', 'lit_l3_q4', 'QUAL PALAVRA É ESTA FIGURA?', 'Qual é a palavra para esta figura?', '📖', 'LIVRO', ['LÁPIS', 'CADERNO'], 'ESCOLHA A PALAVRA CORRETA', 0)
    ]
  }),
  buildActivity({
    id: 'lit_teacch_places_transport',
    categoryId: 'literacy',
    title: 'TEACCH: Transportes & Lugares',
    subtitle: 'Leitura funcional do entorno urbano',
    methodology: 'TEACCH / Vocabulário Funcional',
    emoji: '🚌',
    badgeColor: '#0284C7',
    description: 'Reconhecimento global de palavras ligadas a transporte e locais.',
    tags: ['teacch', 'transportes', 'lugares'],
    evidenceId: 'ev_visual_ncaep',
    order: 19,
    questions: [
      qWord('lit_teacch_places_transport', 'ltp_q1', 'QUAL PALAVRA REPRESENTA ESTA FIGURA?', 'Qual meio de transporte é este?', '🚌', 'ÔNIBUS', ['TREM', 'BARCO'], 'LEITURA DE TRANSPORTES', 0),
      qWord('lit_teacch_places_transport', 'ltp_q2', 'QUAL PALAVRA REPRESENTA ESTA FIGURA?', 'Que transporte voa no céu?', '✈️', 'AVIÃO', ['CARRO', 'BICICLETA'], 'LEITURA DE TRANSPORTES', 1),
      qWord('lit_teacch_places_transport', 'ltp_q3', 'QUAL LUGAR É ESTE?', 'Que lugar cuidamos da saúde?', '🏥', 'HOSPITAL', ['PADARIA', 'PRAIA'], 'LUGARES DA CIDADE', 2),
      qWord('lit_teacch_places_transport', 'ltp_q4', 'QUAL PALAVRA REPRESENTA ESTA FIGURA?', 'Que veículo anda sobre duas rodas?', '🚲', 'BICICLETA', ['NAVIO', 'MOTO'], 'LEITURA DE TRANSPORTES', 0)
    ]
  }),
  buildActivity({
    id: 'lit_teacch_clothes_school',
    categoryId: 'literacy',
    title: 'TEACCH: Vestuário & Materiais',
    subtitle: 'Palavras úteis no dia a dia escolar',
    methodology: 'Leitura Funcional TEACCH / BNCC',
    emoji: '👕',
    badgeColor: '#9333EA',
    description: 'Pareamento de roupas e materiais escolares à escrita em caixa alta.',
    tags: ['vestuário', 'escola', 'teacch'],
    evidenceId: 'ev_bncc_dua',
    order: 20,
    questions: [
      qWord('lit_teacch_clothes_school', 'ltc_q1', 'QUAL PEÇA DE ROUPA É ESTA?', 'Qual o nome desta peça?', '👕', 'CAMISA', ['SAPATO', 'BONÉ'], 'VESTUÁRIO', 0),
      qWord('lit_teacch_clothes_school', 'ltc_q2', 'QUAL CALÇADO É ESTE?', 'Qual é a palavra correta para o calçado?', '👟', 'TÊNIS', ['MEIA', 'CASACO'], 'VESTUÁRIO', 1),
      qWord('lit_teacch_clothes_school', 'ltc_q3', 'QUAL MATERIAL ESCOLAR É ESTE?', 'O que carregamos nas costas para a escola?', '🎒', 'MOCHILA', ['BORRACHA', 'RÉGUA'], 'MATERIAIS ESCOLARES', 2),
      qWord('lit_teacch_clothes_school', 'ltc_q4', 'QUAL MATERIAL ESCOLAR É ESTE?', 'O que usamos para escrever no caderno?', '✏️', 'LÁPIS', ['COLA', 'TESOURA'], 'MATERIAIS ESCOLARES', 0)
    ]
  })
]
