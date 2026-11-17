import type { ActivityCategory, ActivityCategoryId } from '../../types/activity.types'

export const BASE_ACTIVITY_CATEGORIES: Omit<ActivityCategory, 'countLabel'>[] = [
  {
    id: 'dyscalculia',
    title: 'Discalculia & Matemática Concreta',
    subtitle: 'Subitização, contagem ampliada, adição pictórica CPA e grandeza',
    emoji: '🔢',
    color: '#2563EB',
    isAvailable: true,
    defaultEvidenceId: 'ev_dyscalculia_cpa'
  },
  {
    id: 'literacy',
    title: 'Alfabetização & Fonologia',
    subtitle: 'Letra inicial, segmentação silábica e pareamento imagem-palavra',
    emoji: '🔤',
    color: '#16A34A',
    isAvailable: true,
    defaultEvidenceId: 'ev_literacy_nrp'
  },
  {
    id: 'visual_perception',
    title: 'Percepção Visual & Pareamento',
    subtitle: 'Cores, formas geométricas e sequências de rotina PECS',
    emoji: '🧩',
    color: '#9333EA',
    isAvailable: true,
    defaultEvidenceId: 'ev_visual_ncaep'
  },
  {
    id: 'social_emotions',
    title: 'Emoções, Comunicação & Social',
    subtitle: 'Reconhecimento emocional, empatia, boas maneiras e sentidos',
    emoji: '💛',
    color: '#EC4899',
    isAvailable: true,
    defaultEvidenceId: 'ev_emotions_casel'
  },
  {
    id: 'daily_logic',
    title: 'Lógica, Associações & Vida Diária',
    subtitle: 'Associações funcionais, segurança, ambientes, clima e autonomia',
    emoji: '🧠',
    color: '#EA580C',
    isAvailable: true,
    defaultEvidenceId: 'ev_daily_task_analysis'
  }
]

export const CATEGORY_MAP: Record<ActivityCategoryId, Omit<ActivityCategory, 'countLabel'>> =
  BASE_ACTIVITY_CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat.id] = cat
      return acc
    },
    {} as Record<ActivityCategoryId, Omit<ActivityCategory, 'countLabel'>>
  )
