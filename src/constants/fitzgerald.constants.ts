import type { FitzgeraldCategory, FitzgeraldColorStyle } from '../types/fitzgerald.types'

/**
 * Paleta de cores oficial adaptada da Chave de Fitzgerald Modificada
 * Projetada com alto contraste WCAG AAA para texto escuro e legibilidade máxima em tablets.
 */
export const FITZGERALD_COLORS: Record<FitzgeraldCategory, FitzgeraldColorStyle> = {
  PERSON: {
    bg: '#FEF08A',       // Amarelo claro (Tailwind yellow-200)
    border: '#CA8A04',   // Borda Amarela escura (yellow-600)
    text: '#713F12',     // Texto Marrom escuro
    label: 'Pessoas e Pronomes'
  },
  VERB: {
    bg: '#BBF7D0',       // Verde claro (green-200)
    border: '#16A34A',   // Borda Verde escura (green-600)
    text: '#14532D',     // Texto Verde floresta
    label: 'Ações e Verbos'
  },
  NOUN: {
    bg: '#FED7AA',       // Laranja suave (orange-200)
    border: '#EA580C',   // Borda Laranja forte (orange-600)
    text: '#7C2D12',     // Texto Laranja queimado
    label: 'Substantivos e Coisas'
  },
  DESCRIPTIVE: {
    bg: '#BAE6FD',       // Azul céu suave (sky-200)
    border: '#0284C7',   // Borda Azul forte (sky-600)
    text: '#0C4A6E',     // Texto Azul escuro
    label: 'Descritivos e Sentimentos'
  },
  SOCIAL: {
    bg: '#FBCFE8',       // Rosa suave (pink-200)
    border: '#DB2777',   // Borda Rosa forte (pink-600)
    text: '#831843',     // Texto Carmim escuro
    label: 'Social e Cortesia'
  },
  MISC: {
    bg: '#F1F5F9',       // Cinza suave (slate-100)
    border: '#64748B',   // Borda Cinza escuro (slate-500)
    text: '#1E293B',     // Texto Grafite
    label: 'Conectivos e Diversos'
  }
}
