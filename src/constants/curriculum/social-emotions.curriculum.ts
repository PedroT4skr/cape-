import type { ActivityDefinition } from '../../types/activity.types'
import { buildActivity, qMatch, qWord } from './curriculum.helpers'

export const SOCIAL_EMOTIONS_ACTIVITIES: ActivityDefinition[] = [
  buildActivity({
    id: 'soc_basic_emotions',
    categoryId: 'social_emotions',
    title: 'Identificando Emoções Básicas',
    subtitle: 'Alegria, tristeza, raiva e susto',
    methodology: 'Modelo Ekman & CASEL / TEA',
    emoji: '😊',
    badgeColor: '#EC4899',
    description: 'Reconhecer expressões faciais básicas associando-as aos sentimentos.',
    tags: ['emoções', 'tea', 'expressões'],
    evidenceId: 'ev_emotions_casel',
    order: 31,
    questions: [
      qWord('soc_basic_emotions', 'sbe_q1', 'COMO ESTA PESSOA ESTÁ SE SENTINDO?', 'Olhe o rosto sorrindo! Como ela está?', '😄', 'FELIZ', ['TRISTE', 'BRAVO'], 'QUAL SENTIMENTO É ESTE?', 0),
      qWord('soc_basic_emotions', 'sbe_q2', 'COMO ESTA PESSOA ESTÁ SE SENTINDO?', 'Olhe as lágrimas caindo. Que sentimento é?', '😢', 'TRISTE', ['FELIZ', 'SONO'], 'QUAL SENTIMENTO É ESTE?', 1),
      qWord('soc_basic_emotions', 'sbe_q3', 'COMO ESTA PESSOA ESTÁ SE SENTINDO?', 'Olhe a sobrancelha franzida! Como ela está?', '😡', 'BRAVO', ['CALMO', 'FELIZ'], 'QUAL SENTIMENTO É ESTE?', 2),
      qWord('soc_basic_emotions', 'sbe_q4', 'COMO ESTA PESSOA ESTÁ SE SENTINDO?', 'Olhe os olhos arregalados! Como ficou?', '😨', 'ASSUSTADO', ['FELIZ', 'CALMO'], 'QUAL SENTIMENTO É ESTE?', 0)
    ]
  }),
  buildActivity({
    id: 'soc_everyday_feelings',
    categoryId: 'social_emotions',
    title: 'Estados & Sensações do Dia',
    subtitle: 'Sono, carinho, dúvida e calma',
    methodology: 'Autorregulação Emocional (CASEL)',
    emoji: '🥰',
    badgeColor: '#DB2777',
    description: 'Auxiliar o aluno a nomear estados físicos e afetivos cotidianos.',
    tags: ['autorregulação', 'sentimentos', 'comunicação'],
    evidenceId: 'ev_emotions_casel',
    order: 32,
    questions: [
      qWord('soc_everyday_feelings', 'sef_q1', 'O QUE ESTA EXPRESSÃO MOSTRA?', 'Olhe o rosto dormindo. O que ele sente?', '😴', 'SONO', ['FOME', 'RAIVA'], 'O QUE ELA SENTE?', 0),
      qWord('soc_everyday_feelings', 'sef_q2', 'O QUE ESTA EXPRESSÃO MOSTRA?', 'Olhe os corações! Que sentimento é?', '🥰', 'CARINHO', ['MEDO', 'TRISTEZA'], 'O QUE ELA SENTE?', 1),
      qWord('soc_everyday_feelings', 'sef_q3', 'O QUE ESTA EXPRESSÃO MOSTRA?', 'Mão no queixo... O que está fazendo?', '🤔', 'PENSANDO', ['DORMINDO', 'CHORANDO'], 'O QUE ESTÁ FAZENDO?', 2),
      qWord('soc_everyday_feelings', 'sef_q4', 'COMO ESTA PESSOA SE SENTE?', 'Rosto tranquilo respirando fundo. Como está?', '😌', 'CALMA', ['BRAVA', 'ASSUSTADA'], 'QUAL ESTADO É ESTE?', 0)
    ]
  }),
  buildActivity({
    id: 'soc_manners_greetings',
    categoryId: 'social_emotions',
    title: 'Convivência & Boas Maneiras',
    subtitle: 'Gestos sociais e respeito',
    methodology: 'Habilidades Sociais / CAA',
    emoji: '🤝',
    badgeColor: '#F43F5E',
    description: 'Reconhecer gestos de saudação, agradecimento, ajuda e apoio.',
    tags: ['social', 'gestos', 'convivência'],
    evidenceId: 'ev_emotions_casel',
    order: 33,
    questions: [
      qWord('soc_manners_greetings', 'smg_q1', 'QUANDO ALGUÉM ACENA ASSIM, DIZEMOS...', 'Quando encontramos um amigo acenando...', '👋', 'OLÁ', ['OBRIGADO', 'DESCULPA'], 'SAUDAÇÃO SOCIAL', 0),
      qWord('soc_manners_greetings', 'smg_q2', 'QUANDO GANHAMOS UM PRESENTE, DIZEMOS...', 'Qual palavra mágica usamos ao agradecer?', '🎁', 'OBRIGADO', ['NÃO', 'SILÊNCIO'], 'PALAVRA MÁGICA', 1),
      qWord('soc_manners_greetings', 'smg_q3', 'PARA PARABENIZAR UM AMIGO, FAZEMOS...', 'Quando um colega acerta, batemos...', '👏', 'PALMAS', ['PULO', 'GRITO'], 'GESTO POSITIVO', 0),
      qWord('soc_manners_greetings', 'smg_q4', 'O QUE ESTE SINAL COM A MÃO SIGNIFICA?', 'Polegar para cima significa...', '👍', 'SIM / LEGAL', ['PERIGO', 'PROIBIDO'], 'SINAL DE APOIO', 2)
    ]
  }),
  buildActivity({
    id: 'soc_senses_body',
    categoryId: 'social_emotions',
    title: 'Os 5 Sentidos & Corpo',
    subtitle: 'Ver, ouvir, cheirar e saborear',
    methodology: 'Consciência Corporal / BNCC',
    emoji: '👀',
    badgeColor: '#E11D48',
    description: 'Associar os órgãos dos sentidos às ações perceptivas do corpo.',
    tags: ['sentidos', 'corpo humano', 'sensorial'],
    evidenceId: 'ev_bncc_dua',
    order: 34,
    questions: [
      qMatch('soc_senses_body', 'ssb_q1', 'shape_match', 'COM QUAL PARTE OUVIMOS MÚSICA?', 'Com qual parte escutamos o som?', '🎵', 'MÚSICA', { label: 'ORELHA', emoji: '👂' }, { label: 'NARIZ', emoji: '👃' }, { label: 'PÉ', emoji: '🦶' }, { badgeText: 'AUDIÇÃO', guidanceText: 'TOQUE NO ÓRGÃO QUE OUVE', pos: 0 }),
      qMatch('soc_senses_body', 'ssb_q2', 'shape_match', 'COM QUAL PARTE VEMOS AS CORES?', 'Para enxergar o arco-íris, usamos os...', '🌈', 'CORES', { label: 'OLHOS', emoji: '👀' }, { label: 'BOCA', emoji: '👄' }, { label: 'MÃO', emoji: '✋' }, { badgeText: 'VISÃO', guidanceText: 'TOQUE NO ÓRGÃO DA VISÃO', pos: 1 }),
      qMatch('soc_senses_body', 'ssb_q3', 'shape_match', 'COM QUAL PARTE SENTIMOS O CHEIRO?', 'O que sente o perfume da flor?', '🌸', 'PERFUME', { label: 'NARIZ', emoji: '👃' }, { label: 'ORELHA', emoji: '👂' }, { label: 'OLHOS', emoji: '👀' }, { badgeText: 'OLFATO', guidanceText: 'TOQUE NO ÓRGÃO DO OLFATO', pos: 2 }),
      qMatch('soc_senses_body', 'ssb_q4', 'shape_match', 'COM QUAL PARTE SENTIMOS O SABOR?', 'O que sente o gostinho do sorvete?', '🍦', 'SABOR', { label: 'BOCA', emoji: '👅' }, { label: 'NARIZ', emoji: '👃' }, { label: 'ORELHA', emoji: '👂' }, { badgeText: 'PALADAR', guidanceText: 'TOQUE NO ÓRGÃO DO PALADAR', pos: 0 })
    ]
  }),
  buildActivity({
    id: 'soc_empathy_help',
    categoryId: 'social_emotions',
    title: 'Empatia: Como Posso Ajudar?',
    subtitle: 'Respostas acolhedoras diante de colegas',
    methodology: 'Consciência Social (CASEL)',
    emoji: '🫂',
    badgeColor: '#BE185D',
    description: 'Treinar atitudes empáticas quando um colega está triste, machucado ou perdido.',
    tags: ['empatia', 'amizade', 'casel'],
    evidenceId: 'ev_emotions_casel',
    order: 35,
    questions: [
      qMatch('soc_empathy_help', 'seh_q1', 'shape_match', 'O AMIGO ESTÁ CHORANDO. O QUE AJUDA?', 'Quando um colega está triste, como ajudamos?', '😢', 'AMIGO TRISTE', { label: 'ACOLHER', emoji: '🫂' }, { label: 'RIR DELE', emoji: '😆' }, { label: 'GRITAR', emoji: '📢' }, { badgeText: 'EMPATIA', guidanceText: 'ESCOLHA A ATITUDE GENTIL', pos: 0 }),
      qMatch('soc_empathy_help', 'seh_q2', 'shape_match', 'O COLEGA CAIU E RALOU O JOELHO. O QUE DAR?', 'Caiu! O que ajuda no machucado?', '🩹', 'MACHUCADO', { label: 'CURATIVO', emoji: '🩹' }, { label: 'PIMENTA', emoji: '🌶️' }, { label: 'MARTELO', emoji: '🔨' }, { badgeText: 'CUIDADO', guidanceText: 'ESCOLHA COMO CUIDAR', pos: 1 }),
      qMatch('soc_empathy_help', 'seh_q3', 'shape_match', 'UM AMIGO ESTÁ COM SEDE. O QUE OFERECER?', 'Seu amigo está com muita sede!', '🥵', 'MUITA SEDE', { label: 'ÁGUA', emoji: '🥤' }, { label: 'LIVRO', emoji: '📖' }, { label: 'SAPATO', emoji: '👟' }, { badgeText: 'GENTILEZA', guidanceText: 'O QUE OFERECER PARA ELE?', pos: 2 })
    ]
  }),
  buildActivity({
    id: 'soc_classroom_comm',
    categoryId: 'social_emotions',
    title: 'Comunicação em Sala de Aula',
    subtitle: 'Pedir ajuda, falar ou ouvir com atenção',
    methodology: 'CAA Funcional / Autorregulação',
    emoji: '🙋',
    badgeColor: '#9D174D',
    description: 'Identificar gestos e combinados positivos para participar da aula.',
    tags: ['escola', 'caa', 'combinados'],
    evidenceId: 'ev_visual_ncaep',
    order: 36,
    questions: [
      qWord('soc_classroom_comm', 'scc_q1', 'QUANDO QUEREMOS FALAR NA RODA, FAZEMOS...', 'Antes de falar na aula, levantamos a...', '🙋', 'LEVANTAR A MÃO', ['CORRER', 'DORMIR'], 'COMBINADO DA SALA', 0),
      qWord('soc_classroom_comm', 'scc_q2', 'QUANDO A PROFESSORA EXPLICA, FAZEMOS...', 'Para ouvir bem a explicação, ficamos em...', '🤫', 'SILÊNCIO', ['GRITARIA', 'CORRIDA'], 'ATENÇÃO NA AULA', 1),
      qWord('soc_classroom_comm', 'scc_q3', 'NÃO ENTENDI A TAREFA. POSSO PEDIR...', 'Se tiver dúvida na atividade, pedimos...', '🆘', 'AJUDA', ['DESISTIR', 'SUMIR'], 'COMUNICAÇÃO ASSERTIVA', 2)
    ]
  }),
  buildActivity({
    id: 'soc_sharing_turns',
    categoryId: 'social_emotions',
    title: 'Compartilhar & Esperar a Vez',
    subtitle: 'Cooperação em jogos e brincadeiras',
    methodology: 'Treino de Habilidades Sociais (NCAEP)',
    emoji: '🎲',
    badgeColor: '#E11D48',
    description: 'Compreender regras de convivência ao brincar em grupo ou esperar na fila.',
    tags: ['cooperação', 'brincar', 'regras'],
    evidenceId: 'ev_emotions_casel',
    order: 37,
    questions: [
      qMatch('soc_sharing_turns', 'sst_q1', 'shape_match', 'DOIS AMIGOS QUEREM A MESMA BOLA. O QUE FAZER?', 'Como brincar juntos com uma bola só?', '⚽', 'UM BRINQUEDO', { label: 'DIVIDIR', emoji: '🤝' }, { label: 'BRIGAR', emoji: '😡' }, { label: 'ESCONDER', emoji: '🙈' }, { badgeText: 'COOPERAÇÃO', guidanceText: 'ESCOLHA A MELHOR SOLUÇÃO', pos: 0 }),
      qMatch('soc_sharing_turns', 'sst_q2', 'shape_match', 'HÁ MAIS COLEGAS NA FILA. O QUE FAZEMOS?', 'Na fila do lanche ou brinquedo, nós...', '🧍', 'FILA DE AMIGOS', { label: 'ESPERAR A VEZ', emoji: '⏳' }, { label: 'EMPURRAR', emoji: '💥' }, { label: 'CHORAR', emoji: '😢' }, { badgeText: 'PACIÊNCIA', guidanceText: 'O QUE FAZEMOS NA FILA?', pos: 1 })
    ]
  }),
  buildActivity({
    id: 'soc_body_care',
    categoryId: 'social_emotions',
    title: 'Partes do Corpo & Autocuidado',
    subtitle: 'Mãos, pés, cabeça e dentes',
    methodology: 'Esquema Corporal / DUA',
    emoji: '✋',
    badgeColor: '#F43F5E',
    description: 'Nomear partes do corpo e associar cada uma à sua função cotidiana.',
    tags: ['corpo', 'autocuidado', 'bncc'],
    evidenceId: 'ev_bncc_dua',
    order: 38,
    questions: [
      qWord('soc_body_care', 'sbc_q1', 'QUAL PARTE DO CORPO USAMOS PARA DAR TCHAU?', 'Qual parte do corpo acena?', '✋', 'MÃO', ['PÉ', 'ORELHA'], 'ESQUEMA CORPORAL', 0),
      qWord('soc_body_care', 'sbc_q2', 'QUAL PARTE DO CORPO CALÇA O TÊNIS?', 'Onde colocamos a meia e o tênis?', '🦶', 'PÉ', ['NARIZ', 'CABEÇA'], 'ESQUEMA CORPORAL', 1),
      qWord('soc_body_care', 'sbc_q3', 'O QUE ESCOVAMOS COM PASTA E ESCOVA?', 'O que deixamos limpinho com a escova?', '🦷', 'DENTES', ['OLHOS', 'CABELO'], 'AUTOCUIDADO', 2)
    ]
  }),
  buildActivity({
    id: 'soc_celebration_play',
    categoryId: 'social_emotions',
    title: 'Alegria em Festas & Brincadeiras',
    subtitle: 'Reconhecer momentos felizes em grupo',
    methodology: 'Linguagem Pragmática / CASEL',
    emoji: '🥳',
    badgeColor: '#EC4899',
    description: 'Associar eventos positivos (aniversário, parque, conquista) a emoções alegres.',
    tags: ['festas', 'emoções', 'contexto'],
    evidenceId: 'ev_emotions_casel',
    order: 39,
    questions: [
      qWord('soc_celebration_play', 'scp_q1', 'NA FESTA DE ANIVERSÁRIO FICAMOS MUITO...', 'Bolo, balões e parabéns! Como ficamos?', '🎂', 'ANIMADO', ['TRISTE', 'DOENTE'], 'CONTEXTO FESTIVO', 0),
      qWord('soc_celebration_play', 'scp_q2', 'QUANDO ACERTAMOS O DESAFIO GANHAMOS...', 'Conseguiu terminar a tarefa! Que conquista!', '🏆', 'ORGULHO', ['MEDO', 'RAIVA'], 'REFORÇO POSITIVO', 1),
      qWord('soc_celebration_play', 'scp_q3', 'BRINCANDO COM O BALANÇO SENTIMOS...', 'Que sensação boa brincar no parque!', '🥳', 'ALEGRIA', ['TRISTEZA', 'CHORO'], 'EMOÇÃO POSITIVA', 2)
    ]
  }),
  buildActivity({
    id: 'soc_basic_needs',
    categoryId: 'social_emotions',
    title: 'Comunicar Necessidades Básicas',
    subtitle: 'Fome, sede, dor e banheiro (CAA)',
    methodology: 'Comunicação Funcional PECS (NCAEP)',
    emoji: '💬',
    badgeColor: '#DB2777',
    description: 'Associar sinais internos do corpo ao pedido comunicativo correto.',
    tags: ['caa', 'pecs', 'necessidades'],
    evidenceId: 'ev_visual_ncaep',
    order: 40,
    questions: [
      qMatch('soc_basic_needs', 'sbn_q1', 'shape_match', 'A BARRIGA RONCOU! O QUE PEDIR?', 'Quando sentimos fome, o que pedimos?', '😋', 'COM FOME', { label: 'COMIDA', emoji: '🍽️' }, { label: 'TRAVESSEIRO', emoji: '🛌' }, { label: 'LÁPIS', emoji: '✏️' }, { badgeText: 'NECESSIDADE', guidanceText: 'TOQUE NO QUE RESOLVE A FOME', pos: 0 }),
      qMatch('soc_basic_needs', 'sbn_q2', 'shape_match', 'PRECISO FAZER XIXI! ONDE VOU?', 'Quando dá vontade de ir ao banheiro...', '💧', 'APERTADO', { label: 'BANHEIRO', emoji: '🚽' }, { label: 'GELADEIRA', emoji: '🧊' }, { label: 'PARQUE', emoji: '🌳' }, { badgeText: 'AUTONOMIA', guidanceText: 'TOQUE NO LOCAL CERTO', pos: 1 }),
      qMatch('soc_basic_needs', 'sbn_q3', 'shape_match', 'ESTOU COM DOR NA CABEÇA! QUEM AVISAR?', 'Quando algo dói, devemos avisar o...', '🤕', 'ESTÁ DOENDO', { label: 'ADULTO / CUIDADOR', emoji: '👩‍⚕️' }, { label: 'BOLA', emoji: '⚽' }, { label: 'ÁRVORE', emoji: '🌲' }, { badgeText: 'PEDIR CUIDADO', guidanceText: 'QUEM PODE CUIDAR DE VOCÊ?', pos: 2 })
    ]
  })
]
