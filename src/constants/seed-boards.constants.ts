import type { Board, Cell } from '../types/board.types'

export const INITIAL_BOARDS: Board[] = [
  {
    id: 'board-root',
    name: 'Comunicação Essencial',
    icon: 'MessageSquare',
    gridCols: 4,
    gridRows: 3,
    parentId: null,
    isRoot: true,
    createdAt: Date.now()
  },
  {
    id: 'board-food',
    name: 'Alimentação & Lanche',
    icon: 'Utensils',
    gridCols: 4,
    gridRows: 3,
    parentId: 'board-root',
    isRoot: false,
    createdAt: Date.now()
  },
  {
    id: 'board-feelings',
    name: 'Sentimentos & Saúde',
    icon: 'Heart',
    gridCols: 4,
    gridRows: 3,
    parentId: 'board-root',
    isRoot: false,
    createdAt: Date.now()
  }
]

export const INITIAL_CELLS: Cell[] = [
  // =========================================================================
  // --- PRANCHA PRINCIPAL (12 Células com Cores Semânticas Intuitivas) ---
  // =========================================================================
  {
    id: 'c-root-1',
    boardId: 'board-root',
    position: 0,
    label: 'Eu',
    category: 'PERSON',
    emoji: '🙋',
    audioText: 'Eu',
    customStyle: { bg: '#FEF08A', border: '#CA8A04', text: '#713F12' } // Amarelo sol
  },
  {
    id: 'c-root-2',
    boardId: 'board-root',
    position: 1,
    label: 'Você',
    category: 'PERSON',
    emoji: '👉',
    audioText: 'Você',
    customStyle: { bg: '#FDE68A', border: '#D97706', text: '#78350F' } // Âmbar
  },
  {
    id: 'c-root-3',
    boardId: 'board-root',
    position: 2,
    label: 'Quero',
    category: 'VERB',
    emoji: '🤲',
    audioText: 'Quero',
    customStyle: { bg: '#BBF7D0', border: '#16A34A', text: '#14532D' } // Verde ação
  },
  {
    id: 'c-root-4',
    boardId: 'board-root',
    position: 3,
    label: 'Comer',
    category: 'VERB',
    emoji: '🍽️',
    audioText: 'Comer',
    targetBoardId: 'board-food',
    customStyle: { bg: '#FED7AA', border: '#EA580C', text: '#7C2D12' } // Laranja apetite
  },
  {
    id: 'c-root-5',
    boardId: 'board-root',
    position: 4,
    label: 'Beber',
    category: 'VERB',
    emoji: '🥤',
    audioText: 'Beber',
    customStyle: { bg: '#A7F3D0', border: '#059669', text: '#064E3B' } // Menta refrescante
  },
  {
    id: 'c-root-6',
    boardId: 'board-root',
    position: 5,
    label: 'Água',
    category: 'NOUN',
    emoji: '💧',
    audioText: 'Água',
    customStyle: { bg: '#BAE6FD', border: '#0284C7', text: '#0C4A6E' } // Azul água/oceano
  },
  {
    id: 'c-root-7',
    boardId: 'board-root',
    position: 6,
    label: 'Banheiro',
    category: 'NOUN',
    emoji: '🚽',
    audioText: 'Banheiro',
    customStyle: { bg: '#CFFAFE', border: '#0891B2', text: '#164E63' } // Ciano/turquesa sanitário
  },
  {
    id: 'c-root-8',
    boardId: 'board-root',
    position: 7,
    label: 'Sentimentos',
    category: 'DESCRIPTIVE',
    emoji: '❤️',
    audioText: 'Sentimentos',
    targetBoardId: 'board-feelings',
    customStyle: { bg: '#FECDD3', border: '#E11D48', text: '#881337' } // Vermelho/coral coração
  },
  {
    id: 'c-root-9',
    boardId: 'board-root',
    position: 8,
    label: 'Ajuda',
    category: 'SOCIAL',
    emoji: '🆘',
    audioText: 'Ajuda',
    customStyle: { bg: '#FEE2E2', border: '#DC2626', text: '#7F1D1D' } // Vermelho alerta
  },
  {
    id: 'c-root-10',
    boardId: 'board-root',
    position: 9,
    label: 'Por favor',
    category: 'SOCIAL',
    emoji: '🙏',
    audioText: 'Por favor',
    customStyle: { bg: '#E9D5FF', border: '#9333EA', text: '#581C87' } // Lilás cortesia
  },
  {
    id: 'c-root-11',
    boardId: 'board-root',
    position: 10,
    label: 'Sim',
    category: 'SOCIAL',
    emoji: '👍',
    audioText: 'Sim',
    customStyle: { bg: '#86EFAC', border: '#15803D', text: '#14532D' } // Verde aprovação
  },
  {
    id: 'c-root-12',
    boardId: 'board-root',
    position: 11,
    label: 'Não',
    category: 'SOCIAL',
    emoji: '👎',
    audioText: 'Não',
    customStyle: { bg: '#FCA5A5', border: '#B91C1C', text: '#7F1D1D' } // Vermelho recusa
  },

  // =========================================================================
  // --- SUB-PRANCHA ALIMENTAÇÃO ---
  // =========================================================================
  {
    id: 'c-food-1',
    boardId: 'board-food',
    position: 0,
    label: 'Água',
    category: 'NOUN',
    emoji: '💧',
    audioText: 'Água',
    customStyle: { bg: '#BAE6FD', border: '#0284C7', text: '#0C4A6E' } // Azul água
  },
  {
    id: 'c-food-2',
    boardId: 'board-food',
    position: 1,
    label: 'Suco',
    category: 'NOUN',
    emoji: '🧃',
    audioText: 'Suco',
    customStyle: { bg: '#FED7AA', border: '#EA580C', text: '#7C2D12' } // Laranja suco
  },
  {
    id: 'c-food-3',
    boardId: 'board-food',
    position: 2,
    label: 'Maçã',
    category: 'NOUN',
    emoji: '🍎',
    audioText: 'Maçã',
    customStyle: { bg: '#FECDD3', border: '#E11D48', text: '#881337' } // Vermelho maçã
  },
  {
    id: 'c-food-4',
    boardId: 'board-food',
    position: 3,
    label: 'Pão',
    category: 'NOUN',
    emoji: '🍞',
    audioText: 'Pão',
    customStyle: { bg: '#FDE68A', border: '#D97706', text: '#78350F' } // Dourado trigo
  },
  {
    id: 'c-food-5',
    boardId: 'board-food',
    position: 4,
    label: 'Biscoito',
    category: 'NOUN',
    emoji: '🍪',
    audioText: 'Biscoito',
    customStyle: { bg: '#FED7AA', border: '#C2410C', text: '#7C2D12' } // Caramelo
  },
  {
    id: 'c-food-6',
    boardId: 'board-food',
    position: 5,
    label: 'Arroz',
    category: 'NOUN',
    emoji: '🍚',
    audioText: 'Arroz',
    customStyle: { bg: '#F1F5F9', border: '#64748B', text: '#1E293B' } // Pérola claro
  },
  {
    id: 'c-food-7',
    boardId: 'board-food',
    position: 6,
    label: 'Quero',
    category: 'VERB',
    emoji: '🤲',
    audioText: 'Quero',
    customStyle: { bg: '#BBF7D0', border: '#16A34A', text: '#14532D' } // Verde
  },
  {
    id: 'c-food-8',
    boardId: 'board-food',
    position: 7,
    label: 'Gostoso',
    category: 'DESCRIPTIVE',
    emoji: '😋',
    audioText: 'Gostoso',
    customStyle: { bg: '#FEF08A', border: '#CA8A04', text: '#713F12' } // Amarelo sabor
  },
  {
    id: 'c-food-9',
    boardId: 'board-food',
    position: 8,
    label: 'Mais',
    category: 'DESCRIPTIVE',
    emoji: '➕',
    audioText: 'Mais',
    customStyle: { bg: '#BAE6FD', border: '#0284C7', text: '#0C4A6E' } // Azul
  },
  {
    id: 'c-food-10',
    boardId: 'board-food',
    position: 9,
    label: 'Chega',
    category: 'SOCIAL',
    emoji: '🛑',
    audioText: 'Chega',
    customStyle: { bg: '#FCA5A5', border: '#DC2626', text: '#7F1D1D' } // Vermelho pare
  },
  {
    id: 'c-food-11',
    boardId: 'board-food',
    position: 10,
    label: 'Obrigado',
    category: 'SOCIAL',
    emoji: '🤝',
    audioText: 'Obrigado',
    customStyle: { bg: '#E9D5FF', border: '#9333EA', text: '#581C87' } // Lilás cortesia
  },
  {
    id: 'c-food-12',
    boardId: 'board-food',
    position: 11,
    label: 'Voltar',
    category: 'MISC',
    emoji: '⬅️',
    audioText: 'Voltar',
    targetBoardId: 'board-root',
    isNavigationOnly: true,
    customStyle: { bg: '#E2E8F0', border: '#64748B', text: '#1E293B' } // Neutro
  },

  // =========================================================================
  // --- SUB-PRANCHA SENTIMENTOS & SAÚDE ---
  // =========================================================================
  {
    id: 'c-feel-1',
    boardId: 'board-feelings',
    position: 0,
    label: 'Feliz',
    category: 'DESCRIPTIVE',
    emoji: '😄',
    audioText: 'Feliz',
    customStyle: { bg: '#FEF08A', border: '#CA8A04', text: '#713F12' } // Amarelo alegria
  },
  {
    id: 'c-feel-2',
    boardId: 'board-feelings',
    position: 1,
    label: 'Triste',
    category: 'DESCRIPTIVE',
    emoji: '😢',
    audioText: 'Triste',
    customStyle: { bg: '#BAE6FD', border: '#0284C7', text: '#0C4A6E' } // Azul tristeza
  },
  {
    id: 'c-feel-3',
    boardId: 'board-feelings',
    position: 2,
    label: 'Bravo',
    category: 'DESCRIPTIVE',
    emoji: '😡',
    audioText: 'Bravo',
    customStyle: { bg: '#FCA5A5', border: '#DC2626', text: '#7F1D1D' } // Vermelho raiva
  },
  {
    id: 'c-feel-4',
    boardId: 'board-feelings',
    position: 3,
    label: 'Cansado',
    category: 'DESCRIPTIVE',
    emoji: '😴',
    audioText: 'Cansado',
    customStyle: { bg: '#E9D5FF', border: '#9333EA', text: '#581C87' } // Lilás sonolência
  },
  {
    id: 'c-feel-5',
    boardId: 'board-feelings',
    position: 4,
    label: 'Dor',
    category: 'DESCRIPTIVE',
    emoji: '🤕',
    audioText: 'Estou com dor',
    customStyle: { bg: '#FED7AA', border: '#EA580C', text: '#7C2D12' } // Laranja dor
  },
  {
    id: 'c-feel-6',
    boardId: 'board-feelings',
    position: 5,
    label: 'Calor',
    category: 'DESCRIPTIVE',
    emoji: '🥵',
    audioText: 'Calor',
    customStyle: { bg: '#FECDD3', border: '#E11D48', text: '#881337' } // Vermelho quente
  },
  {
    id: 'c-feel-7',
    boardId: 'board-feelings',
    position: 6,
    label: 'Frio',
    category: 'DESCRIPTIVE',
    emoji: '🥶',
    audioText: 'Frio',
    customStyle: { bg: '#CFFAFE', border: '#0891B2', text: '#164E63' } // Ciano gelo
  },
  {
    id: 'c-feel-8',
    boardId: 'board-feelings',
    position: 7,
    label: 'Medo',
    category: 'DESCRIPTIVE',
    emoji: '😨',
    audioText: 'Estou com medo',
    customStyle: { bg: '#DDD6FE', border: '#7C3AED', text: '#4C1D95' } // Violeta susto
  },
  {
    id: 'c-feel-9',
    boardId: 'board-feelings',
    position: 8,
    label: 'Abraço',
    category: 'VERB',
    emoji: '🤗',
    audioText: 'Quero um abraço',
    customStyle: { bg: '#FBCFE8', border: '#DB2777', text: '#831843' } // Rosa afeto
  },
  {
    id: 'c-feel-10',
    boardId: 'board-feelings',
    position: 9,
    label: 'Calma',
    category: 'SOCIAL',
    emoji: '🕊️',
    audioText: 'Preciso de calma',
    customStyle: { bg: '#BBF7D0', border: '#16A34A', text: '#14532D' } // Verde paz
  },
  {
    id: 'c-feel-11',
    boardId: 'board-feelings',
    position: 10,
    label: 'Remédio',
    category: 'NOUN',
    emoji: '💊',
    audioText: 'Remédio',
    customStyle: { bg: '#CCFBF1', border: '#0D9488', text: '#115E59' } // Menta saúde
  },
  {
    id: 'c-feel-12',
    boardId: 'board-feelings',
    position: 11,
    label: 'Voltar',
    category: 'MISC',
    emoji: '⬅️',
    audioText: 'Voltar',
    targetBoardId: 'board-root',
    isNavigationOnly: true,
    customStyle: { bg: '#E2E8F0', border: '#64748B', text: '#1E293B' } // Neutro
  }
]
