import type { ActivityDefinition } from '../../types/activity.types'
import { buildActivity, qMatch, qRoutine } from './curriculum.helpers'

export const VISUAL_ACTIVITIES: ActivityDefinition[] = [
  buildActivity({
    id: 'visual_level_1_colors',
    categoryId: 'visual_perception',
    title: 'Cores Primárias & Secundárias',
    subtitle: 'Parear e identificar cores iguais',
    methodology: 'Suportes Visuais (AFIRM / TEACCH)',
    emoji: '🎨',
    badgeColor: '#9333EA',
    description: 'Identificar e parear cores vibrantes idênticas ao modelo de referência.',
    tags: ['cores', 'pareamento', 'teacch'],
    evidenceId: 'ev_visual_afirm',
    order: 21,
    questions: [
      qMatch('visual_level_1_colors', 'vis_l1_q1', 'color_match', 'QUAL COR É IGUAL AO MODELO?', 'Olhe a cor vermelha. Toque na igual!', '🔴', 'VERMELHO', { label: 'VERMELHO', emoji: '🔴' }, { label: 'AZUL', emoji: '🔵' }, { label: 'AMARELO', emoji: '🟡' }, { modelColor: '#EF4444', pos: 0 }),
      qMatch('visual_level_1_colors', 'vis_l1_q2', 'color_match', 'QUAL COR É IGUAL AO MODELO?', 'Olhe a cor amarela. Toque na igual!', '🟡', 'AMARELO', { label: 'AMARELO', emoji: '🟡' }, { label: 'VERDE', emoji: '🟢' }, { label: 'ROXO', emoji: '🟣' }, { modelColor: '#EAB308', pos: 1 }),
      qMatch('visual_level_1_colors', 'vis_l1_q3', 'color_match', 'QUAL COR É IGUAL AO MODELO?', 'Olhe a cor azul. Toque na igual!', '🔵', 'AZUL', { label: 'AZUL', emoji: '🔵' }, { label: 'VERMELHO', emoji: '🔴' }, { label: 'VERDE', emoji: '🟢' }, { modelColor: '#3B82F6', pos: 0 }),
      qMatch('visual_level_1_colors', 'vis_l1_q4', 'color_match', 'QUAL COR É IGUAL AO MODELO?', 'Olhe a cor verde. Toque na igual!', '🟢', 'VERDE', { label: 'VERDE', emoji: '🟢' }, { label: 'AMARELO', emoji: '🟡' }, { label: 'LARANJA', emoji: '🟠' }, { modelColor: '#22C55E', pos: 2 })
    ]
  }),
  buildActivity({
    id: 'visual_level_2_shapes',
    categoryId: 'visual_perception',
    title: 'Formas Geométricas & Símbolos',
    subtitle: 'Reconhecer formas e contornos iguais',
    methodology: 'Pareamento Estruturado (NCAEP)',
    emoji: '🔺',
    badgeColor: '#2563EB',
    description: 'Discriminação visual de formas geométricas clássicas e símbolos.',
    tags: ['formas', 'montessori', 'atenção visual'],
    evidenceId: 'ev_visual_afirm',
    order: 22,
    questions: [
      qMatch('visual_level_2_shapes', 'vis_l2_q1', 'shape_match', 'QUAL FORMA É IGUAL AO MODELO?', 'Olhe o triângulo. Encontre a forma igual!', '🔺', 'TRIÂNGULO', { label: 'TRIÂNGULO', emoji: '🔺' }, { label: 'QUADRADO', emoji: '🟩' }, { label: 'CÍRCULO', emoji: '⚪' }, { pos: 0 }),
      qMatch('visual_level_2_shapes', 'vis_l2_q2', 'shape_match', 'QUAL FORMA É IGUAL AO MODELO?', 'Olhe a estrela. Encontre a estrela igual!', '⭐', 'ESTRELA', { label: 'ESTRELA', emoji: '⭐' }, { label: 'CÍRCULO', emoji: '⚪' }, { label: 'CORAÇÃO', emoji: '💛' }, { pos: 1 }),
      qMatch('visual_level_2_shapes', 'vis_l2_q3', 'shape_match', 'QUAL FORMA É IGUAL AO MODELO?', 'Olhe o quadrado. Encontre o quadrado igual!', '🟩', 'QUADRADO', { label: 'QUADRADO', emoji: '🟩' }, { label: 'TRIÂNGULO', emoji: '🔺' }, { label: 'ESTRELA', emoji: '⭐' }, { pos: 2 }),
      qMatch('visual_level_2_shapes', 'vis_l2_q4', 'shape_match', 'QUAL FORMA É IGUAL AO MODELO?', 'Olhe o coração. Encontre o coração igual!', '💛', 'CORAÇÃO', { label: 'CORAÇÃO', emoji: '💛' }, { label: 'CÍRCULO', emoji: '⚪' }, { label: 'ESTRELA', emoji: '⭐' }, { pos: 1 })
    ]
  }),
  buildActivity({
    id: 'visual_level_3_routines',
    categoryId: 'visual_perception',
    title: 'Sequência: Manhã & Higiene',
    subtitle: 'O que nós fazemos depois?',
    methodology: 'Rotina Estruturada PECS (NCAEP)',
    emoji: '🪥',
    badgeColor: '#EA580C',
    description: 'Previsibilidade da rotina matinal e cuidados básicos de higiene.',
    tags: ['rotina', 'pecs', 'higiene'],
    evidenceId: 'ev_visual_ncaep',
    order: 23,
    questions: [
      qRoutine('visual_level_3_routines', 'vis_l3_q1', 'O QUE FAZEMOS DEPOIS DE ESCOVAR OS DENTES?', 'Acordou, escovou os dentes... O que vem depois?', 'ROTINA DA MANHÃ', [{ emoji: '🛌', label: 'ACORDAR' }, { emoji: '🪥', label: 'ESCOVAR DENTES' }], { label: 'TOMAR CAFÉ', emoji: '🥣' }, { label: 'DORMIR', emoji: '🌙' }, { label: 'TOMAR BANHO', emoji: '🛁' }, 0),
      qRoutine('visual_level_3_routines', 'vis_l3_q2', 'DEPOIS DE USAR O BANHEIRO, O QUE FAZEMOS?', 'Depois do banheiro, o que devemos fazer?', 'HIGIENE', [{ emoji: '🚽', label: 'BANHEIRO' }], { label: 'LAVAR AS MÃOS', emoji: '🧼' }, { label: 'JOGAR BOLA', emoji: '⚽' }, { label: 'PASSEAR', emoji: '🚗' }, 1),
      qRoutine('visual_level_3_routines', 'vis_l3_q3', 'DEPOIS DE TOMAR BANHO, O QUE FAZEMOS?', 'Tomou banho, ficou limpo... O que fazemos?', 'BANHO', [{ emoji: '🚿', label: 'TOMAR BANHO' }], { label: 'VESTIR ROUPA', emoji: '👕' }, { label: 'COMER LANCHE', emoji: '🥪' }, { label: 'CHOVER', emoji: '🌧️' }, 0)
    ]
  }),
  buildActivity({
    id: 'vis_routine_school',
    categoryId: 'visual_perception',
    title: 'Sequência: Escola & Refeição',
    subtitle: 'Passos do ambiente escolar',
    methodology: 'Encadeamento Temporal PECS',
    emoji: '🏫',
    badgeColor: '#D97706',
    description: 'Sequência lógica das atividades realizadas na escola e nas refeições.',
    tags: ['escola', 'rotina', 'sequência'],
    evidenceId: 'ev_visual_ncaep',
    order: 24,
    questions: [
      qRoutine('vis_routine_school', 'vrs_q1', 'DEPOIS DE ENTRAR NA SALA, O QUE FAZEMOS?', 'Chegou na escola, entrou na sala... E agora?', 'ESCOLA', [{ emoji: '🎒', label: 'CHEGAR' }, { emoji: '🚪', label: 'ENTRAR' }], { label: 'ESTUDAR', emoji: '📚' }, { label: 'DORMIR', emoji: '🛏️' }, { label: 'TOMAR BANHO', emoji: '🛁' }, 0),
      qRoutine('vis_routine_school', 'vrs_q2', 'DEPOIS DE PINTAR COM TINTA, O QUE FAZEMOS?', 'Depois de pintar com tinta, o que fazemos?', 'ARTE', [{ emoji: '🎨', label: 'PINTAR' }], { label: 'LAVAR AS MÃOS', emoji: '🧼' }, { label: 'ANDAR DE CARRO', emoji: '🚗' }, { label: 'DORMIR', emoji: '🌙' }, 1),
      qRoutine('vis_routine_school', 'vrs_q3', 'DEPOIS DE COMER O LANCHE, O QUE FAZEMOS?', 'Comeu o lanche! O que fazemos com os dentes?', 'REFEIÇÃO', [{ emoji: '🥪', label: 'LANCHAR' }], { label: 'ESCOVAR DENTES', emoji: '🪥' }, { label: 'VOAR', emoji: '✈️' }, { label: 'CHOVER', emoji: '🌧️' }, 2)
    ]
  }),
  buildActivity({
    id: 'vis_routine_night',
    categoryId: 'visual_perception',
    title: 'Sequência: Fim do Dia & Lazer',
    subtitle: 'Organização noturna e descanso',
    methodology: 'Rotina Estruturada AFIRM',
    emoji: '🌙',
    badgeColor: '#7C3AED',
    description: 'Compreender a sequência saudável para brincar, guardar e descansar.',
    tags: ['rotina', 'sono', 'organização'],
    evidenceId: 'ev_visual_afirm',
    order: 25,
    questions: [
      qRoutine('vis_routine_night', 'vrn_q1', 'DEPOIS DE BRINCAR, O QUE FAZEMOS?', 'Antes de sair, o que fazemos com os brinquedos?', 'ORGANIZAÇÃO', [{ emoji: '🎲', label: 'BRINCAR' }], { label: 'GUARDAR', emoji: '🧺' }, { label: 'CHORAR', emoji: '😢' }, { label: 'COMER', emoji: '🍎' }, 0),
      qRoutine('vis_routine_night', 'vrn_q2', 'CHEGOU A NOITE E DEITOU. O QUE VEM DEPOIS?', 'Chegou a noite, deitou na cama... E agora?', 'HORA DE DORMIR', [{ emoji: '🌙', label: 'NOITE' }, { emoji: '🛌', label: 'DEITAR' }], { label: 'DORMIR', emoji: '😴' }, { label: 'IR À ESCOLA', emoji: '🎒' }, { label: 'NADAR', emoji: '🏊' }, 1)
    ]
  }),
  buildActivity({
    id: 'vis_match_animals',
    categoryId: 'visual_perception',
    title: 'Pareamento Visual: Animais',
    subtitle: 'Discriminação figura-figura com animais',
    methodology: 'Pareamento por Identidade (TEACCH)',
    emoji: '🐼',
    badgeColor: '#6D28D9',
    description: 'Fortalecer atenção visual seletiva pareando animais idênticos.',
    tags: ['pareamento', 'animais', 'teacch'],
    evidenceId: 'ev_visual_afirm',
    order: 26,
    questions: [
      qMatch('vis_match_animals', 'vma_q1', 'shape_match', 'ENCONTRE O ANIMAL IGUAL AO MODELO!', 'Olhe a borboleta. Qual figura é igual?', '🦋', 'BORBOLETA', { label: 'BORBOLETA', emoji: '🦋' }, { label: 'ABELHA', emoji: '🐝' }, { label: 'JOANINHA', emoji: '🐞' }, { pos: 0 }),
      qMatch('vis_match_animals', 'vma_q2', 'shape_match', 'ENCONTRE O ANIMAL IGUAL AO MODELO!', 'Olhe a tartaruga. Toque na igual!', '🐢', 'TARTARUGA', { label: 'TARTARUGA', emoji: '🐢' }, { label: 'PEIXE', emoji: '🐠' }, { label: 'SAPO', emoji: '🐸' }, { pos: 1 }),
      qMatch('vis_match_animals', 'vma_q3', 'shape_match', 'ENCONTRE O ANIMAL IGUAL AO MODELO!', 'Olhe a coruja. Onde está a outra coruja?', '🦉', 'CORUJA', { label: 'CORUJA', emoji: '🦉' }, { label: 'PATO', emoji: '🦆' }, { label: 'GALINHA', emoji: '🐔' }, { pos: 2 })
    ]
  }),
  buildActivity({
    id: 'vis_match_symbols',
    categoryId: 'visual_perception',
    title: 'Sinais & Símbolos Cotidianos',
    subtitle: 'Atenção a ícones urbanos e escolares',
    methodology: 'Leitura Ambiental / Suportes Visuais',
    emoji: '🚦',
    badgeColor: '#4F46E5',
    description: 'Reconhecer e parear ícones visuais importantes de orientação e sinalização.',
    tags: ['símbolos', 'atenção', 'orientação'],
    evidenceId: 'ev_visual_ncaep',
    order: 27,
    questions: [
      qMatch('vis_match_symbols', 'vms_q1', 'shape_match', 'QUAL SÍMBOLO É IGUAL AO MODELO?', 'Olhe o sinal de trânsito. Encontre o igual!', '🚦', 'SEMÁFORO', { label: 'SEMÁFORO', emoji: '🚦' }, { label: 'PLACA PARE', emoji: '🛑' }, { label: 'RELÓGIO', emoji: '⏰' }, { pos: 0 }),
      qMatch('vis_match_symbols', 'vms_q2', 'shape_match', 'QUAL SÍMBOLO É IGUAL AO MODELO?', 'Olhe a placa PARE. Toque na figura igual!', '🛑', 'PARE', { label: 'PARE', emoji: '🛑' }, { label: 'ATENÇÃO', emoji: '⚠️' }, { label: 'ESTRELA', emoji: '⭐' }, { pos: 1 }),
      qMatch('vis_match_symbols', 'vms_q3', 'shape_match', 'QUAL SÍMBOLO É IGUAL AO MODELO?', 'Olhe o telefone. Onde está o telefone igual?', '📱', 'CELULAR', { label: 'CELULAR', emoji: '📱' }, { label: 'RELÓGIO', emoji: '⏰' }, { label: 'CHAVE', emoji: '🔑' }, { pos: 2 })
    ]
  }),
  buildActivity({
    id: 'vis_routine_snack',
    categoryId: 'visual_perception',
    title: 'Sequência: Preparo de Lanche',
    subtitle: 'Passos simples de culinária segura',
    methodology: 'Rotina Visual PECS / Autonomia',
    emoji: '🥪',
    badgeColor: '#EA580C',
    description: 'Ordenar visualmente passos básicos ao preparar ou consumir um lanche.',
    tags: ['lanche', 'rotina', 'avd'],
    evidenceId: 'ev_visual_ncaep',
    order: 28,
    questions: [
      qRoutine('vis_routine_snack', 'vrsn_q1', 'ANTES DE PREPARAR A FRUTA, O QUE FAZEMOS?', 'Pegou a maçã... O que fazemos antes de comer?', 'FRUTA LIMPA', [{ emoji: '🍎', label: 'PEGAR FRUTA' }, { emoji: '🚰', label: 'LAVAR' }], { label: 'COMER', emoji: '😋' }, { label: 'CHOVER', emoji: '🌧️' }, { label: 'DORMIR', emoji: '🛌' }, 0),
      qRoutine('vis_routine_snack', 'vrsn_q2', 'ENCHEU O COPO DE ÁGUA. O QUE FAZEMOS DEPOIS?', 'Colocou água no copo. Qual é o próximo passo?', 'HIDRATAÇÃO', [{ emoji: '🚰', label: 'ENCHER COPO' }], { label: 'BEBER ÁGUA', emoji: '🥤' }, { label: 'CALÇAR TÊNIS', emoji: '👟' }, { label: 'PINTAR', emoji: '🎨' }, 1),
      qRoutine('vis_routine_snack', 'vrsn_q3', 'TERMINOU O LANCHE. ONDE VAI O GUARDANAPO?', 'Lanche acabou! Onde jogamos o lixo?', 'LIMPEZA', [{ emoji: '🥪', label: 'COMER' }], { label: 'NA LIXEIRA', emoji: '🗑️' }, { label: 'NA CAMA', emoji: '🛌' }, { label: 'NA MOCHILA', emoji: '🎒' }, 2)
    ]
  }),
  buildActivity({
    id: 'vis_routine_park',
    categoryId: 'visual_perception',
    title: 'Sequência: Passeio & Parque',
    subtitle: 'Etapas seguras ao sair de casa',
    methodology: 'Previsibilidade Comportamental (TEACCH)',
    emoji: '🛝',
    badgeColor: '#16A34A',
    description: 'Antecipar ações de saída, travessia e lazer reduzindo ansiedade em passeios.',
    tags: ['passeio', 'parque', 'previsibilidade'],
    evidenceId: 'ev_visual_ncaep',
    order: 29,
    questions: [
      qRoutine('vis_routine_park', 'vrp_q1', 'VAI SAIR DE CASA DE TÊNIS. O QUE CALÇA ANTES?', 'Pegou os pés... Antes do tênis colocamos a...', 'SAIR DE CASA', [{ emoji: '🦶', label: 'PÉS' }, { emoji: '🧦', label: 'MEIA' }], { label: 'CALÇAR TÊNIS', emoji: '👟' }, { label: 'ESCOVAR', emoji: '🪥' }, { label: 'NADAR', emoji: '🏊' }, 0),
      qRoutine('vis_routine_park', 'vrp_q2', 'CHEGOU NO PARQUE COM OS AMIGOS. O QUE FAZEMOS?', 'Chegou no parque! Hora de...', 'LAZER', [{ emoji: '🚶', label: 'CHEGAR' }, { emoji: '🌳', label: 'PARQUE' }], { label: 'BRINCAR', emoji: '⚽' }, { label: 'DORMIR', emoji: '😴' }, { label: 'TOMAR BANHO', emoji: '🚿' }, 1)
    ]
  }),
  buildActivity({
    id: 'vis_color_object_match',
    categoryId: 'visual_perception',
    title: 'Discriminação: Cores na Natureza',
    subtitle: 'Associar cores a frutas e elementos',
    methodology: 'Discriminação Cromática / AFIRM',
    emoji: '🌈',
    badgeColor: '#A855F7',
    description: 'Identificar a cor predominante de objetos e frutas reais do entorno.',
    tags: ['cores', 'natureza', 'discriminação'],
    evidenceId: 'ev_visual_afirm',
    order: 30,
    questions: [
      qMatch('vis_color_object_match', 'vco_q1', 'color_match', 'QUAL COR COMBINA COM O MORANGO?', 'Olhe o morango! Qual cor é igual à dele?', '🍓', 'MORANGO', { label: 'VERMELHO', emoji: '🔴' }, { label: 'AZUL', emoji: '🔵' }, { label: 'ROXO', emoji: '🟣' }, { modelColor: '#EF4444', badgeText: 'COR DA FIGURA', guidanceText: 'TOQUE NA COR IGUAL AO MORANGO', pos: 0 }),
      qMatch('vis_color_object_match', 'vco_q2', 'color_match', 'QUAL COR COMBINA COM O SOL?', 'Olhe o sol brilhando! Qual cor é a dele?', '☀️', 'SOL', { label: 'AMARELO', emoji: '🟡' }, { label: 'VERDE', emoji: '🟢' }, { label: 'VERMELHO', emoji: '🔴' }, { modelColor: '#EAB308', badgeText: 'COR DA FIGURA', guidanceText: 'TOQUE NA COR DO SOL', pos: 1 }),
      qMatch('vis_color_object_match', 'vco_q3', 'color_match', 'QUAL COR COMBINA COM A FOLHA?', 'Olhe a folha da árvore! Qual é a sua cor?', '🌿', 'FOLHA', { label: 'VERDE', emoji: '🟢' }, { label: 'LARANJA', emoji: '🟠' }, { label: 'AZUL', emoji: '🔵' }, { modelColor: '#22C55E', badgeText: 'COR DA FIGURA', guidanceText: 'TOQUE NA COR DA FOLHA', pos: 2 })
    ]
  })
]
