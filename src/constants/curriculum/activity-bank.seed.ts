import type { ActivityDefinition } from '../../types/activity.types'
import { DYSCALCULIA_ACTIVITIES } from './dyscalculia.curriculum'
import { LITERACY_ACTIVITIES } from './literacy.curriculum'
import { VISUAL_ACTIVITIES } from './visual.curriculum'
import { SOCIAL_EMOTIONS_ACTIVITIES } from './social-emotions.curriculum'
import { DAILY_LOGIC_ACTIVITIES } from './daily-logic.curriculum'

export const INITIAL_ACTIVITY_BANK: ActivityDefinition[] = [
  ...DYSCALCULIA_ACTIVITIES,
  ...LITERACY_ACTIVITIES,
  ...VISUAL_ACTIVITIES,
  ...SOCIAL_EMOTIONS_ACTIVITIES,
  ...DAILY_LOGIC_ACTIVITIES
]

export const BUILT_IN_ACTIVITY_MAP: Record<string, ActivityDefinition> =
  INITIAL_ACTIVITY_BANK.reduce(
    (acc, act) => {
      acc[act.id] = act
      return acc
    },
    {} as Record<string, ActivityDefinition>
  )
