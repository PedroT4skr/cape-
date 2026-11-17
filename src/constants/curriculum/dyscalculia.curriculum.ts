import type { ActivityDefinition } from '../../types/activity.types'
import { buildActivity, qAdd, qComp, qCount } from './curriculum.helpers'

export const DYSCALCULIA_ACTIVITIES: ActivityDefinition[] = [
  buildActivity({
    id: 'level_1_subitizing',
    categoryId: 'dyscalculia',
    title: 'Contagem Básica (1 a 5)',
    subtitle: 'Reconhecimento visual imediato',
    methodology: 'CPA / Subitização (Butterworth)',
    emoji: '🍎',
    badgeColor: '#16A34A',
    description: 'Contar objetos familiares de 1 a 5 com correspondência 1-a-1.',
    tags: ['iniciante', 'subitização', 'contagem'],
    evidenceId: 'ev_dyscalculia_subitizing',
    order: 1,
    questions: [
      qCount('level_1_subitizing', 'l1_q1', 'QUANTAS MAÇÃS VOCÊ VÊ?', 'Quantas maçãs você vê na tela?', '🍎', 2, 'MAÇÃS', [1, 3]),
      qCount('level_1_subitizing', 'l1_q2', 'QUANTAS BANANAS VOCÊ VÊ?', 'Quantas bananas você vê na tela?', '🍌', 3, 'BANANAS', [2, 4]),
      qCount('level_1_subitizing', 'l1_q3', 'QUANTOS COPOS DE ÁGUA VOCÊ VÊ?', 'Quantos copos de água você vê?', '🥤', 1, 'COPO', [2, 3]),
      qCount('level_1_subitizing', 'l1_q4', 'QUANTOS PÃES VOCÊ VÊ?', 'Quantos pães você vê na tela?', '🥖', 4, 'PÃES', [3, 5]),
      qCount('level_1_subitizing', 'l1_q5', 'QUANTAS ESTRELAS VOCÊ VÊ?', 'Quantas estrelas você vê?', '⭐', 5, 'ESTRELAS', [3, 4])
    ]
  }),
  buildActivity({
    id: 'dysc_count_6_10',
    categoryId: 'dyscalculia',
    title: 'Contagem Ampliada (6 a 10)',
    subtitle: 'Agrupamento visual até 10 unidades',
    methodology: 'CPA / Contagem Estendida',
    emoji: '🍓',
    badgeColor: '#059669',
    description: 'Desenvolver contagem sequencial de conjuntos maiores de 6 a 10 figuras.',
    tags: ['intermediário', 'contagem', '6 a 10'],
    evidenceId: 'ev_dyscalculia_subitizing',
    order: 2,
    questions: [
      qCount('dysc_count_6_10', 'd610_q1', 'QUANTOS MORANGOS VOCÊ VÊ?', 'Conte quantos morangos aparecem.', '🍓', 6, 'MORANGOS', [5, 7]),
      qCount('dysc_count_6_10', 'd610_q2', 'QUANTAS BORBOLETAS VOCÊ VÊ?', 'Quantas borboletas você conta?', '🦋', 7, 'BORBOLETAS', [6, 8]),
      qCount('dysc_count_6_10', 'd610_q3', 'QUANTOS CORAÇÕES VOCÊ VÊ?', 'Conte os corações azuis.', '💙', 8, 'CORAÇÕES', [7, 9]),
      qCount('dysc_count_6_10', 'd610_q4', 'QUANTAS FLORES VOCÊ VÊ?', 'Quantas flores estão no jardim?', '🌻', 9, 'FLORES', [8, 10]),
      qCount('dysc_count_6_10', 'd610_q5', 'QUANTAS BOLAS VOCÊ VÊ?', 'Conte quantas bolas temos ao todo.', '⚽', 10, 'BOLAS', [8, 9])
    ]
  }),
  buildActivity({
    id: 'level_2_addition',
    categoryId: 'dyscalculia',
    title: 'Adição Visual Iniciante',
    subtitle: 'Juntar conjuntos pequenos (até 5)',
    methodology: 'Numicon / Soma Pictórica CPA',
    emoji: '➕',
    badgeColor: '#2563EB',
    description: 'Somar dois grupos visuais de alimentos com apoio concreto.',
    tags: ['adição', 'iniciante', 'cpa'],
    evidenceId: 'ev_dyscalculia_cpa',
    order: 3,
    questions: [
      qAdd('level_2_addition', 'l2_q1', 'VAMOS JUNTAR AS MAÇÃS! QUANTAS FICAM?', 'Uma maçã mais uma maçã.', '🍎', 1, '1 MAÇÃ', 1, '1 MAÇÃ', [1, 3]),
      qAdd('level_2_addition', 'l2_q2', 'VAMOS JUNTAR AS LARANJAS! QUANTAS FICAM?', 'Duas laranjas mais uma laranja.', '🍊', 2, '2 LARANJAS', 1, '1 LARANJA', [2, 4]),
      qAdd('level_2_addition', 'l2_q3', 'VAMOS JUNTAR OS SUCOS! QUANTOS FICAM?', 'Dois sucos mais dois sucos.', '🧃', 2, '2 SUCOS', 2, '2 SUCOS', [3, 5]),
      qAdd('level_2_addition', 'l2_q4', 'VAMOS JUNTAR AS BANANAS! QUANTAS FICAM?', 'Três bananas mais duas bananas.', '🍌', 3, '3 BANANAS', 2, '2 BANANAS', [4, 6])
    ]
  }),
  buildActivity({
    id: 'dysc_add_inter',
    categoryId: 'dyscalculia',
    title: 'Adição Visual Intermediária',
    subtitle: 'Juntar conjuntos maiores (até 8)',
    methodology: 'IES / WWC — Representação CPA',
    emoji: '🧮',
    badgeColor: '#1D4ED8',
    description: 'Praticar somas de dois grupos visuais resultando de 5 a 8 elementos.',
    tags: ['adição', 'intermediário'],
    evidenceId: 'ev_dyscalculia_cpa',
    order: 4,
    questions: [
      qAdd('dysc_add_inter', 'dai_q1', 'QUANTOS COOKIES TEMOS AO TODO?', 'Três cookies mais três cookies.', '🍪', 3, '3 COOKIES', 3, '3 COOKIES', [5, 7]),
      qAdd('dysc_add_inter', 'dai_q2', 'JUNTANDO OS LÁPIS, QUANTOS FICAM?', 'Quatro lápis mais dois lápis.', '✏️', 4, '4 LÁPIS', 2, '2 LÁPIS', [5, 8]),
      qAdd('dysc_add_inter', 'dai_q3', 'QUANTOS PEIXINHOS TEMOS AO TODO?', 'Quatro peixes mais três peixes.', '🐠', 4, '4 PEIXES', 3, '3 PEIXES', [6, 8]),
      qAdd('dysc_add_inter', 'dai_q4', 'QUANTAS ESTRELAS BRILHAM NO TOTAL?', 'Quatro estrelas mais quatro estrelas.', '⭐', 4, '4 ESTRELAS', 4, '4 ESTRELAS', [6, 7])
    ]
  }),
  buildActivity({
    id: 'level_3_magnitude',
    categoryId: 'dyscalculia',
    title: 'Mais ou Menos (Grandeza)',
    subtitle: 'Comparar esquerda e direita',
    methodology: 'Magnitude Visual & Lateralidade',
    emoji: '⚖️',
    badgeColor: '#EA580C',
    description: 'Identificar visualmente qual lado possui maior ou menor quantidade.',
    tags: ['comparação', 'lateralidade', 'grandeza'],
    evidenceId: 'ev_dyscalculia_subitizing',
    order: 5,
    questions: [
      qComp('level_3_magnitude', 'l3_q1', 'ONDE TEM MAIS MAÇÃS?', 'Toque no grupo que tem mais maçãs!', 'more', '🍎', 4, '4 MAÇÃS', 1, '1 MAÇÃ'),
      qComp('level_3_magnitude', 'l3_q2', 'ONDE TEM MAIS BANANAS?', 'Toque no grupo que tem mais bananas!', 'more', '🍌', 2, '2 BANANAS', 5, '5 BANANAS'),
      qComp('level_3_magnitude', 'l3_q3', 'ONDE TEM MENOS PÃES?', 'Toque no grupo que tem menos pães!', 'less', '🥖', 1, '1 PÃO', 4, '4 PÃES'),
      qComp('level_3_magnitude', 'l3_q4', 'ONDE TEM MAIS SUCOS?', 'Toque no grupo que tem mais sucos!', 'more', '🧃', 5, '5 SUCOS', 2, '2 SUCOS')
    ]
  }),
  buildActivity({
    id: 'dysc_functional_math',
    categoryId: 'dyscalculia',
    title: 'Matemática do Cotidiano',
    subtitle: 'Contar materiais escolares e brinquedos',
    methodology: 'Matemática Funcional / BNCC-DUA',
    emoji: '🎒',
    badgeColor: '#0284C7',
    description: 'Contagem e soma contextualizada com objetos reais da escola e casa.',
    tags: ['funcional', 'avd', 'escola'],
    evidenceId: 'ev_dyscalculia_cpa',
    order: 6,
    questions: [
      qCount('dysc_functional_math', 'dfm_q1', 'QUANTOS LIVROS ESTÃO NA MESA?', 'Quantos livros existem na mesa?', '📚', 4, 'LIVROS', [3, 5]),
      qAdd('dysc_functional_math', 'dfm_q2', '2 LÁPIS MAIS 2 LÁPIS. QUANTOS SÃO?', 'Dois lápis mais dois lápis na mochila.', '✏️', 2, '2 LÁPIS', 2, '2 LÁPIS', [3, 5]),
      qComp('dysc_functional_math', 'dfm_q3', 'ONDE TEM MENOS CARRINHOS?', 'Olhe os dois grupos. Onde há menos carrinhos?', 'less', '🚗', 5, '5 CARROS', 2, '2 CARROS'),
      qCount('dysc_functional_math', 'dfm_q4', 'QUANTOS DADOS VOCÊ VÊ?', 'Conte quantos dados apareceram na tela.', '🎲', 6, 'DADOS', [4, 5])
    ]
  }),
  buildActivity({
    id: 'dysc_add_fruits',
    categoryId: 'dyscalculia',
    title: 'Adição com Frutas & Lanches',
    subtitle: 'Somar quantidades até 10 na cozinha',
    methodology: 'CPA / Ensino Explícito IES',
    emoji: '🍉',
    badgeColor: '#10B981',
    description: 'Construir fluência aditiva somando conjuntos concretos de frutas.',
    tags: ['adição', 'frutas', 'cpa'],
    evidenceId: 'ev_dyscalculia_cpa',
    order: 7,
    questions: [
      qAdd('dysc_add_fruits', 'daf_q1', 'JUNTANDO AS MELANCIAS, QUANTAS FICAM?', 'Três melancias mais uma melancia.', '🍉', 3, '3 MELANCIAS', 1, '1 MELANCIA', [3, 5]),
      qAdd('dysc_add_fruits', 'daf_q2', 'QUANTOS MORANGOS TEMOS NO TOTAL?', 'Quatro morangos mais um morango.', '🍓', 4, '4 MORANGOS', 1, '1 MORANGO', [4, 6]),
      qAdd('dysc_add_fruits', 'daf_q3', 'QUANTAS CEREJAS FICAM JUNTANDO TUDO?', 'Cinco cerejas mais duas cerejas.', '🍒', 5, '5 CEREJAS', 2, '2 CEREJAS', [6, 8]),
      qAdd('dysc_add_fruits', 'daf_q4', 'JUNTANDO OS ABACAXIS, QUANTOS SÃO?', 'Cinco abacaxis mais quatro abacaxis.', '🍍', 5, '5 ABACAXIS', 4, '4 ABACAXIS', [8, 10])
    ]
  }),
  buildActivity({
    id: 'dysc_comp_animals',
    categoryId: 'dyscalculia',
    title: 'Comparação com Animais',
    subtitle: 'Discriminar conjuntos maiores e menores',
    methodology: 'Magnitude Espacial (Butterworth)',
    emoji: '🐸',
    badgeColor: '#F97316',
    description: 'Comparar grupos de animais para consolidar noções de maior e menor.',
    tags: ['comparação', 'animais', 'grandeza'],
    evidenceId: 'ev_dyscalculia_subitizing',
    order: 8,
    questions: [
      qComp('dysc_comp_animals', 'dca_q1', 'ONDE TEM MAIS SAPOS?', 'Qual lado tem mais sapos?', 'more', '🐸', 5, '5 SAPOS', 2, '2 SAPOS'),
      qComp('dysc_comp_animals', 'dca_q2', 'ONDE TEM MENOS PATINHOS?', 'Toque no grupo com menos patinhos.', 'less', '🦆', 3, '3 PATOS', 6, '6 PATOS'),
      qComp('dysc_comp_animals', 'dca_q3', 'ONDE TEM MAIS BORBOLETAS?', 'Qual grupo tem mais borboletas?', 'more', '🦋', 2, '2 BORBOLETAS', 6, '6 BORBOLETAS'),
      qComp('dysc_comp_animals', 'dca_q4', 'ONDE TEM MENOS PEIXES?', 'Toque no lado com menos peixinhos.', 'less', '🐠', 5, '5 PEIXES', 1, '1 PEIXE')
    ]
  }),
  buildActivity({
    id: 'dysc_subitizing_objects',
    categoryId: 'dyscalculia',
    title: 'Subitização: Objetos da Casa',
    subtitle: 'Percepção rápida de pequenas quantidades',
    methodology: 'Subitização / Atenção Visual',
    emoji: '🔑',
    badgeColor: '#0D9488',
    description: 'Reconhecer quantidades de objetos cotidianos sem sobrecarga cognitiva.',
    tags: ['subitização', 'objetos', 'atenção'],
    evidenceId: 'ev_dyscalculia_subitizing',
    order: 9,
    questions: [
      qCount('dysc_subitizing_objects', 'dso_q1', 'QUANTAS CHAVES VOCÊ VÊ?', 'Quantas chaves aparecem na tela?', '🔑', 3, 'CHAVES', [2, 4]),
      qCount('dysc_subitizing_objects', 'dso_q2', 'QUANTAS CAMISAS VOCÊ VÊ?', 'Conte quantas camisas há na tela.', '👕', 4, 'CAMISAS', [3, 5]),
      qCount('dysc_subitizing_objects', 'dso_q3', 'QUANTOS ÓCULOS VOCÊ VÊ?', 'Quantos óculos estão aparecendo?', '👓', 2, 'ÓCULOS', [1, 3]),
      qCount('dysc_subitizing_objects', 'dso_q4', 'QUANTOS BALÕES VOCÊ VÊ?', 'Conte todos os balões.', '🎈', 5, 'BALÕES', [4, 6])
    ]
  }),
  buildActivity({
    id: 'dysc_add_classroom',
    categoryId: 'dyscalculia',
    title: 'Soma Funcional na Sala de Aula',
    subtitle: 'Problemas concretos com itens escolares',
    methodology: 'IES / Instrução Sistemática CPA',
    emoji: '✂️',
    badgeColor: '#4F46E5',
    description: 'Resolver adições visuais simples com materiais usados na escola.',
    tags: ['adição', 'escola', 'cpa'],
    evidenceId: 'ev_dyscalculia_cpa',
    order: 10,
    questions: [
      qAdd('dysc_add_classroom', 'dac_q1', 'QUANTOS CADERNOS TEMOS NA MESA?', 'Dois cadernos mais três cadernos.', '📓', 2, '2 CADERNOS', 3, '3 CADERNOS', [4, 6]),
      qAdd('dysc_add_classroom', 'dac_q2', 'JUNTANDO AS TESOURAS, QUANTAS FICAM?', 'Uma tesoura mais duas tesouras.', '✂️', 1, '1 TESOURA', 2, '2 TESOURAS', [2, 4]),
      qAdd('dysc_add_classroom', 'dac_q3', 'QUANTAS MOCHILAS ESTÃO NA SALA?', 'Três mochilas mais três mochilas.', '🎒', 3, '3 MOCHILAS', 3, '3 MOCHILAS', [5, 7]),
      qAdd('dysc_add_classroom', 'dac_q4', 'QUANTOS PINCÉIS TEMOS PARA PINTAR?', 'Cinco pincéis mais três pincéis.', '🖌️', 5, '5 PINCÉIS', 3, '3 PINCÉIS', [7, 9])
    ]
  })
]
