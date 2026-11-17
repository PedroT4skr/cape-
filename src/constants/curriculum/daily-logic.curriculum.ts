import type { ActivityDefinition } from '../../types/activity.types'
import { buildActivity, qMatch } from './curriculum.helpers'

export const DAILY_LOGIC_ACTIVITIES: ActivityDefinition[] = [
  buildActivity({
    id: 'logic_associations',
    categoryId: 'daily_logic',
    title: 'O que Combina? (Associação)',
    subtitle: 'Relacionar objetos que trabalham juntos',
    methodology: 'Raciocínio Funcional / PECS',
    emoji: '🔗',
    badgeColor: '#EA580C',
    description: 'Desenvolver relações semânticas funcionais entre itens do cotidiano.',
    tags: ['lógica', 'associação', 'semântica'],
    evidenceId: 'ev_daily_task_analysis',
    order: 41,
    questions: [
      qMatch('logic_associations', 'la_q1', 'shape_match', 'O QUE USAMOS QUANDO ESTÁ CHOVENDO?', 'Chuva caindo! Qual objeto combina?', '🌧️', 'CHUVA', { label: 'GUARDA-CHUVA', emoji: '☂️' }, { label: 'ÓCULOS SOL', emoji: '🕶️' }, { label: 'BOLA', emoji: '⚽' }, { badgeText: 'O QUE COMBINA?', guidanceText: 'TOQUE NO QUE COMBINA COM CHUVA', pos: 0 }),
      qMatch('logic_associations', 'la_q2', 'shape_match', 'O QUE ABRE A PORTA TRANCADA?', 'A porta está fechada. Qual objeto abre?', '🚪', 'PORTA', { label: 'CHAVE', emoji: '🔑' }, { label: 'COLHER', emoji: '🥄' }, { label: 'LÁPIS', emoji: '✏️' }, { badgeText: 'O QUE COMBINA?', guidanceText: 'TOQUE NO QUE ABRE A PORTA', pos: 1 }),
      qMatch('logic_associations', 'la_q3', 'shape_match', 'O QUE VAI NOS PÉS ANTES DO TÊNIS?', 'Antes de calçar o tênis vestimos a...', '👟', 'TÊNIS', { label: 'MEIA', emoji: '🧦' }, { label: 'BONÉ', emoji: '🧢' }, { label: 'MOCHILA', emoji: '🎒' }, { badgeText: 'O QUE COMBINA?', guidanceText: 'TOQUE NO QUE VAI COM O TÊNIS', pos: 2 }),
      qMatch('logic_associations', 'la_q4', 'shape_match', 'O QUE USAMOS PARA ESCOVAR OS DENTES?', 'Qual objeto limpa nossos dentes?', '🦷', 'DENTES', { label: 'ESCOVA', emoji: '🪥' }, { label: 'GARFO', emoji: '🍴' }, { label: 'TESOURA', emoji: '✂️' }, { badgeText: 'O QUE COMBINA?', guidanceText: 'TOQUE NO ITEM DE HIGIENE', pos: 0 })
    ]
  }),
  buildActivity({
    id: 'logic_safety_care',
    categoryId: 'daily_logic',
    title: 'Segurança & Cuidados Diários',
    subtitle: 'Situações de proteção e prevenção',
    methodology: 'AVDs & Segurança (AFIRM / AOTA)',
    emoji: '🛡️',
    badgeColor: '#D97706',
    description: 'Reconhecer o que traz segurança ou requer atenção em casa e na rua.',
    tags: ['segurança', 'avd', 'autonomia'],
    evidenceId: 'ev_daily_task_analysis',
    order: 42,
    questions: [
      qMatch('logic_safety_care', 'lsc_q1', 'shape_match', 'QUAL COR DO SEMÁFORO INDICA "PARE"?', 'Qual luz do sinal manda parar?', '🚦', 'TRÂNSITO', { label: 'VERMELHO', emoji: '🔴' }, { label: 'VERDE', emoji: '🟢' }, { label: 'AZUL', emoji: '🔵' }, { badgeText: 'SEGURANÇA NA RUA', guidanceText: 'QUAL COR SIGNIFICA PARE?', pos: 0 }),
      qMatch('logic_safety_care', 'lsc_q2', 'shape_match', 'O QUE PROTEGE A CABEÇA NA BICICLETA?', 'Andando de bicicleta, protegemos a cabeça com...', '🚲', 'BICICLETA', { label: 'CAPACETE', emoji: '⛑️' }, { label: 'CHINELO', emoji: '🩴' }, { label: 'LIVRO', emoji: '📖' }, { badgeText: 'PROTEÇÃO', guidanceText: 'ESCOLHA O ITEM DE SEGURANÇA', pos: 1 }),
      qMatch('logic_safety_care', 'lsc_q3', 'shape_match', 'QUAL DESSES É QUENTE E PERIGOSO?', 'Cuidado! Qual desses é muito quente?', '⚠️', 'CUIDADO', { label: 'FOGO', emoji: '🔥' }, { label: 'GELO', emoji: '🧊' }, { label: 'URSINHO', emoji: '🧸' }, { badgeText: 'PREVENÇÃO', guidanceText: 'TOQUE NO QUE É QUENTE', pos: 2 })
    ]
  }),
  buildActivity({
    id: 'logic_environments',
    categoryId: 'daily_logic',
    title: 'Classificação por Ambientes',
    subtitle: 'Cozinha, escola, mar e natureza',
    methodology: 'Categorização Semântica (BNCC)',
    emoji: '🏠',
    badgeColor: '#0284C7',
    description: 'Classificar objetos e animais conforme o lugar onde pertencem.',
    tags: ['ambientes', 'categorização', 'conceitos'],
    evidenceId: 'ev_bncc_dua',
    order: 43,
    questions: [
      qMatch('logic_environments', 'len_q1', 'shape_match', 'O QUE USAMOS NA COZINHA PARA TOMAR SOPA?', 'Estamos na cozinha! O que pega a sopa?', '🥣', 'COZINHA', { label: 'COLHER', emoji: '🥄' }, { label: 'SABONETE', emoji: '🧼' }, { label: 'BOLA', emoji: '⚽' }, { badgeText: 'COZINHA', guidanceText: 'QUAL TALHER USAR NA SOPA?', pos: 0 }),
      qMatch('logic_environments', 'len_q2', 'shape_match', 'QUAL ANIMAL VIVE NO MAR E NA ÁGUA?', 'Olhe o oceano! Qual animal vive na água?', '🌊', 'OCEANO', { label: 'PEIXE', emoji: '🐠' }, { label: 'GATO', emoji: '🐱' }, { label: 'GALINHA', emoji: '🐔' }, { badgeText: 'HABITAT', guidanceText: 'TOQUE NO ANIMAL AQUÁTICO', pos: 1 }),
      qMatch('logic_environments', 'len_q3', 'shape_match', 'O QUE LEVAMOS NA MOCHILA PARA A ESCOLA?', 'O que colocamos na mochila escolar?', '🏫', 'ESCOLA', { label: 'CADERNO', emoji: '📓' }, { label: 'TRAVESSEIRO', emoji: '🛏️' }, { label: 'FRIGIDEIRA', emoji: '🍳' }, { badgeText: 'ESCOLA', guidanceText: 'TOQUE NO MATERIAL ESCOLAR', pos: 2 })
    ]
  }),
  buildActivity({
    id: 'logic_weather_clothes',
    categoryId: 'daily_logic',
    title: 'Clima, Tempo & Vestuário',
    subtitle: 'O que vestir no calor e no frio',
    methodology: 'Autonomia AVD (AOTA / AFIRM)',
    emoji: '☀️',
    badgeColor: '#F59E0B',
    description: 'Associar temperatura e clima com roupas e cuidados adequados.',
    tags: ['clima', 'vestuário', 'avd'],
    evidenceId: 'ev_daily_task_analysis',
    order: 44,
    questions: [
      qMatch('logic_weather_clothes', 'lwc_q1', 'shape_match', 'NO FRIO INTENSO, O QUE VESTIMOS?', 'Está gelado! Qual roupa esquenta?', '❄️', 'MUITO FRIO', { label: 'CASACO', emoji: '🧥' }, { label: 'SHORTS', emoji: '🩳' }, { label: 'SORVETE', emoji: '🍦' }, { badgeText: 'CLIMA GELADO', guidanceText: 'ESCOLHA A ROUPA DE FRIO', pos: 0 }),
      qMatch('logic_weather_clothes', 'lwc_q2', 'shape_match', 'NO SOL FORTE, O QUE PROTEGE OS OLHOS?', 'Dia ensolarado! O que protege os olhos?', '☀️', 'SOL FORTE', { label: 'ÓCULOS DE SOL', emoji: '🕶️' }, { label: 'CACHECOL', emoji: '🧣' }, { label: 'BOTA DE NEVE', emoji: '🥾' }, { badgeText: 'CLIMA QUENTE', guidanceText: 'TOQUE NA PROTEÇÃO SOLAR', pos: 1 }),
      qMatch('logic_weather_clothes', 'lwc_q3', 'shape_match', 'COM SEDE NO CALOR, O QUE BEBEMOS?', 'Está quente e temos sede! O que beber?', '🥵', 'SEDE', { label: 'ÁGUA', emoji: '💧' }, { label: 'PIMENTA', emoji: '🌶️' }, { label: 'LÁPIS', emoji: '✏️' }, { badgeText: 'HIDRATAÇÃO', guidanceText: 'TOQUE NA BEBIDA SAUDÁVEL', pos: 0 })
    ]
  }),
  buildActivity({
    id: 'logic_professions_tools',
    categoryId: 'daily_logic',
    title: 'Profissões & Ferramentas',
    subtitle: 'Quem cuida, ensina e constrói',
    methodology: 'Conhecimento de Mundo (BNCC)',
    emoji: '👩‍🏫',
    badgeColor: '#2563EB',
    description: 'Relacionar profissionais importantes da comunidade aos seus instrumentos.',
    tags: ['profissões', 'comunidade', 'ferramentas'],
    evidenceId: 'ev_bncc_dua',
    order: 45,
    questions: [
      qMatch('logic_professions_tools', 'lpt_q1', 'shape_match', 'O MÉDICO USA O QUE PARA NOS CUIDAR?', 'No consultório, qual item é do médico?', '🩺', 'MÉDICO(A)', { label: 'REMÉDIO', emoji: '💊' }, { label: 'PIANO', emoji: '🎹' }, { label: 'BOLA', emoji: '⚽' }, { badgeText: 'PROFISSÃO: SAÚDE', guidanceText: 'QUAL ITEM PERTENCE À SAÚDE?', pos: 0 }),
      qMatch('logic_professions_tools', 'lpt_q2', 'shape_match', 'O BOMBEIRO APAGA O FOGO USANDO...', 'Quando há incêndio, o bombeiro vem de...', '🚒', 'BOMBEIRO', { label: 'ÁGUA', emoji: '💦' }, { label: 'PAPEL', emoji: '📄' }, { label: 'SORVETE', emoji: '🍦' }, { badgeText: 'PROFISSÃO: RESGATE', guidanceText: 'O QUE APAGA O FOGO?', pos: 1 }),
      qMatch('logic_professions_tools', 'lpt_q3', 'shape_match', 'A PROFESSORA ENSINA USANDO...', 'Na escola, o que a professora usa?', '👩‍🏫', 'PROFESSORA', { label: 'LIVROS', emoji: '📚' }, { label: 'PANELAS', emoji: '🍳' }, { label: 'PNEU', emoji: '🛞' }, { badgeText: 'PROFISSÃO: EDUCAÇÃO', guidanceText: 'O QUE A PROFESSORA USA?', pos: 2 })
    ]
  }),
  buildActivity({
    id: 'logic_food_utensils',
    categoryId: 'daily_logic',
    title: 'Alimentação & Utensílios',
    subtitle: 'Comidas saudáveis e onde servir',
    methodology: 'Análise de Tarefas AVD (AFIRM)',
    emoji: '🥗',
    badgeColor: '#16A34A',
    description: 'Associar alimentos do dia a dia aos utensílios corretos de refeição.',
    tags: ['alimentação', 'utensílios', 'avd'],
    evidenceId: 'ev_daily_task_analysis',
    order: 46,
    questions: [
      qMatch('logic_food_utensils', 'lfu_q1', 'shape_match', 'ONDE COLOCAMOS O SUCO PARA BEBER?', 'Servimos o suco gelado dentro do...', '🧃', 'SUCO', { label: 'COPO', emoji: '🥤' }, { label: 'BALDE', emoji: '🪣' }, { label: 'SAPATO', emoji: '👟' }, { badgeText: 'REFEIÇÃO', guidanceText: 'TOQUE ONDE SERVIMOS O SUCO', pos: 0 }),
      qMatch('logic_food_utensils', 'lfu_q2', 'shape_match', 'QUAL DESSAS É UMA FRUTA SAUDÁVEL?', 'Qual figura mostra uma fruta natural?', '🥗', 'SAUDÁVEL', { label: 'MAÇÃ', emoji: '🍎' }, { label: 'PARAFUSO', emoji: '🔩' }, { label: 'MOEDA', emoji: '🪙' }, { badgeText: 'NUTRIÇÃO', guidanceText: 'ESCOLHA A FRUTA SAUDÁVEL', pos: 1 }),
      qMatch('logic_food_utensils', 'lfu_q3', 'shape_match', 'ONDE GUARDAMOS O LEITE PARA FICAR GELADO?', 'Onde guardamos alimentos que estragam no calor?', '🥛', 'LEITE', { label: 'GELADEIRA', emoji: '🧊' }, { label: 'CAMA', emoji: '🛌' }, { label: 'MOCHILA', emoji: '🎒' }, { badgeText: 'CONSERVAÇÃO', guidanceText: 'ONDE DEIXAMOS GELADO?', pos: 2 })
    ]
  }),
  buildActivity({
    id: 'logic_animals_plants_care',
    categoryId: 'daily_logic',
    title: 'Cuidando de Animais & Plantas',
    subtitle: 'Zelo pela natureza e seres vivos',
    methodology: 'Educação Ambiental Inclusiva (BNCC)',
    emoji: '🌱',
    badgeColor: '#059669',
    description: 'Identificar do que plantas e animais precisam para crescerem saudáveis.',
    tags: ['natureza', 'animais', 'cuidado'],
    evidenceId: 'ev_bncc_dua',
    order: 47,
    questions: [
      qMatch('logic_animals_plants_care', 'lap_q1', 'shape_match', 'O QUE A PLANTINHA PRECISA PARA CRESCER?', 'A plantinha no vaso precisa beber...', '🌱', 'PLANTINHA', { label: 'ÁGUA', emoji: '💧' }, { label: 'CHOCOLATE', emoji: '🍫' }, { label: 'TESOURA', emoji: '✂️' }, { badgeText: 'NATUREZA', guidanceText: 'DO QUE A PLANTA PRECISA?', pos: 0 }),
      qMatch('logic_animals_plants_care', 'lap_q2', 'shape_match', 'O QUE O COELHO GOSTA DE COMER?', 'Qual alimento saudável o coelhinho adora?', '🐰', 'COELHO', { label: 'CENOURA', emoji: '🥕' }, { label: 'CHAVE', emoji: '🔑' }, { label: 'ROUPA', emoji: '👕' }, { badgeText: 'ANIMAIS', guidanceText: 'TOQUE NO ALIMENTO DO COELHO', pos: 1 }),
      qMatch('logic_animals_plants_care', 'lap_q3', 'shape_match', 'O QUE O CACHORRO BEBE QUANDO TEM SEDE?', 'O cachorrinho correu bastante! Damos a ele...', '🐶', 'CACHORRO', { label: 'ÁGUA FRESCA', emoji: '💧' }, { label: 'LÁPIS', emoji: '✏️' }, { label: 'SABÃO', emoji: '🧼' }, { badgeText: 'CUIDADO ANIMAL', guidanceText: 'O QUE DAR PARA ELE BEBER?', pos: 2 })
    ]
  }),
  buildActivity({
    id: 'logic_transport_modes',
    categoryId: 'daily_logic',
    title: 'Transportes: Terra, Água & Ar',
    subtitle: 'Onde cada meio de transporte anda',
    methodology: 'Classificação Lógica (TEACCH / BNCC)',
    emoji: '✈️',
    badgeColor: '#0EA5E9',
    description: 'Associar veículos aos seus espaços de deslocamento (estrada, mar, céu).',
    tags: ['transportes', 'espaço', 'classificação'],
    evidenceId: 'ev_bncc_dua',
    order: 48,
    questions: [
      qMatch('logic_transport_modes', 'ltm_q1', 'shape_match', 'QUAL TRANSPORTE VOA PELAS NUVENS NO CÉU?', 'Olhe o céu azul! O que voa lá em cima?', '☁️', 'NO CÉU', { label: 'AVIÃO', emoji: '✈️' }, { label: 'NAVIO', emoji: '🚢' }, { label: 'TREM', emoji: '🚂' }, { badgeText: 'TRANSPORTE AÉREO', guidanceText: 'TOQUE NO QUE VOA NO CÉU', pos: 0 }),
      qMatch('logic_transport_modes', 'ltm_q2', 'shape_match', 'QUAL TRANSPORTE NAVEGA SOBRE A ÁGUA?', 'Olhe as ondas do mar! O que anda na água?', '🌊', 'NA ÁGUA', { label: 'BARCO', emoji: '⛵' }, { label: 'CARRO', emoji: '🚗' }, { label: 'BICICLETA', emoji: '🚲' }, { badgeText: 'TRANSPORTE AQUÁTICO', guidanceText: 'TOQUE NO QUE ANDA NA ÁGUA', pos: 1 }),
      qMatch('logic_transport_modes', 'ltm_q3', 'shape_match', 'QUAL TRANSPORTE RODA PELA ESTRADA?', 'Na rua de asfalto, quem anda com 4 rodas?', '🛣️', 'NA ESTRADA', { label: 'CARRO', emoji: '🚗' }, { label: 'HELICÓPTERO', emoji: '🚁' }, { label: 'SUBMARINO', emoji: '🛟' }, { badgeText: 'TRANSPORTE TERRESTRE', guidanceText: 'TOQUE NO QUE ANDA NA ESTRADA', pos: 2 })
    ]
  }),
  buildActivity({
    id: 'logic_room_organization',
    categoryId: 'daily_logic',
    title: 'Organização: Quarto & Mochila',
    subtitle: 'Onde guardar roupas, livros e lixo',
    methodology: 'Análise de Tarefas / Autonomia (AFIRM)',
    emoji: '🧺',
    badgeColor: '#C2410C',
    description: 'Promover organização espacial identificando o destino correto de objetos.',
    tags: ['organização', 'quarto', 'avd'],
    evidenceId: 'ev_daily_task_analysis',
    order: 49,
    questions: [
      qMatch('logic_room_organization', 'lro_q1', 'shape_match', 'ONDE JOGAMOS O PAPEL AMASSADO?', 'Tem papel usado na mesa. Onde jogar?', '📄', 'PAPEL USADO', { label: 'LIXEIRA', emoji: '🗑️' }, { label: 'CAMA', emoji: '🛏️' }, { label: 'PRATO', emoji: '🍽️' }, { badgeText: 'LIMPEZA', guidanceText: 'ONDE DESCARTAR O LIXO?', pos: 0 }),
      qMatch('logic_room_organization', 'lro_q2', 'shape_match', 'ONDE GUARDAMOS O LIVRO DEPOIS DE LER?', 'Acabou a leitura! Onde guardamos o livro?', '📖', 'LIVRO', { label: 'ESTANTE / MOCHILA', emoji: '📚' }, { label: 'BANHEIRO', emoji: '🚿' }, { label: 'GELADEIRA', emoji: '🧊' }, { badgeText: 'ORGANIZAÇÃO', guidanceText: 'ONDE GUARDAR O LIVRO?', pos: 1 }),
      qMatch('logic_room_organization', 'lro_q3', 'shape_match', 'ONDE COLOCAMOS A ROUPA SUJA DE BRINCAR?', 'A camisa sujou no parque! Onde colocamos?', '👕', 'ROUPA SUJA', { label: 'CESTO DE ROUPAS', emoji: '🧺' }, { label: 'MESA DO CAFÉ', emoji: '🥣' }, { label: 'GELADEIRA', emoji: '🧊' }, { badgeText: 'ROTINA DE CASA', guidanceText: 'ONDE VAI A ROUPA SUJA?', pos: 2 })
    ]
  }),
  buildActivity({
    id: 'logic_complete_hygiene',
    categoryId: 'daily_logic',
    title: 'Higiene Pessoal Completa',
    subtitle: 'Associar cada parte ao item de limpeza',
    methodology: 'Task Analysis AVD (AOTA / AFIRM)',
    emoji: '🧼',
    badgeColor: '#0D9488',
    description: 'Consolidar autonomia no uso correto dos produtos básicos de higiene.',
    tags: ['higiene', 'autocuidado', 'aota'],
    evidenceId: 'ev_daily_task_analysis',
    order: 50,
    questions: [
      qMatch('logic_complete_hygiene', 'lch_q1', 'shape_match', 'O QUE USAMOS COM ÁGUA PARA LAVAR AS MÃOS?', 'Mãos sujas! O que limpa junto com a água?', '✋', 'MÃOS SUJAS', { label: 'SABONETE', emoji: '🧼' }, { label: 'LÁPIS', emoji: '✏️' }, { label: 'MEIA', emoji: '🧦' }, { badgeText: 'HIGIENE DAS MÃOS', guidanceText: 'TOQUE NO ITEM DE LIMPEZA', pos: 0 }),
      qMatch('logic_complete_hygiene', 'lch_q2', 'shape_match', 'O QUE USAMOS PARA SECAR O CORPO NO BANHO?', 'Saiu do chuveiro molhado! Com o que secamos?', '🚿', 'SAIR DO BANHO', { label: 'TOALHA', emoji: '🧻' }, { label: 'BOLA', emoji: '⚽' }, { label: 'CADERNO', emoji: '📓' }, { badgeText: 'PÓS-BANHO', guidanceText: 'TOQUE NO QUE SECA O CORPO', pos: 1 }),
      qMatch('logic_complete_hygiene', 'lch_q3', 'shape_match', 'O QUE USAMOS DEPOIS DO BANHO PARA PENTEAR?', 'Vamos arrumar o cabelo! O que usamos?', '💆', 'ARRUMAR CABELO', { label: 'PENTE / ESCOVA', emoji: '💇' }, { label: 'COLHER', emoji: '🥄' }, { label: 'CHAVE', emoji: '🔑' }, { badgeText: 'CUIDADO PESSOAL', guidanceText: 'O QUE ARRUMA O CABELO?', pos: 2 })
    ]
  })
]
