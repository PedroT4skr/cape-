import type { ActivityCategory, ActivityCategoryId, ActivityDefinition, ActivityQuestion } from '../types/activity.types'
import { BASE_ACTIVITY_CATEGORIES, CATEGORY_MAP } from './curriculum/activity-categories.constants'
import { INITIAL_ACTIVITY_BANK } from './curriculum/activity-bank.seed'

export const ACTIVITY_CATEGORIES: ActivityCategory[] = BASE_ACTIVITY_CATEGORIES.map((cat) => {
  const levels = INITIAL_ACTIVITY_BANK.filter((a) => a.categoryId === cat.id && a.isEnabled)
  return {
    ...cat,
    levelIds: levels.map((l) => l.id),
    countLabel: `${levels.length} ATIVIDADES`
  }
})

export const ACTIVITY_LEVELS: ActivityDefinition[] = INITIAL_ACTIVITY_BANK

export const ALL_QUESTIONS_BY_LEVEL: Record<string, ActivityQuestion[]> =
  INITIAL_ACTIVITY_BANK.reduce(
    (acc, act) => {
      acc[act.id] = act.questions
      return acc
    },
    {} as Record<string, ActivityQuestion[]>
  )

export function getLevelsByCategoryId(
  categoryId: ActivityCategoryId,
  activities: ActivityDefinition[] = INITIAL_ACTIVITY_BANK
): ActivityDefinition[] {
  return activities.filter((l) => l.categoryId === categoryId)
}

export function getCategoryById(categoryId: ActivityCategoryId): ActivityCategory | undefined {
  const found = CATEGORY_MAP[categoryId]
  if (!found) return undefined
  const levels = INITIAL_ACTIVITY_BANK.filter((a) => a.categoryId === categoryId)
  return {
    ...found,
    levelIds: levels.map((l) => l.id),
    countLabel: `${levels.length} ATIVIDADES`
  }
}

export { BASE_ACTIVITY_CATEGORIES, CATEGORY_MAP, INITIAL_ACTIVITY_BANK }
