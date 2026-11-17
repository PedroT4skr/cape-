import { writable, derived } from 'svelte/store'
import type { ActivityCategory, ActivityCategoryId, ActivityDefinition } from '../types/activity.types'
import { BASE_ACTIVITY_CATEGORIES } from '../constants/curriculum/activity-categories.constants'
import { INITIAL_ACTIVITY_BANK } from '../constants/curriculum/activity-bank.seed'
import {
  getAllActivities,
  saveActivity,
  setActivityEnabled,
  setAllActivitiesEnabled,
  deleteCustomActivity,
  restoreBuiltInActivity
} from '../db/activities.repository'
import { cloneActivityAsCustom } from '../utils/activity-question.factory'

export const activityBank = writable<ActivityDefinition[]>(INITIAL_ACTIVITY_BANK)
export const isBankLoading = writable<boolean>(false)

export const enabledActivities = derived(activityBank, ($bank) =>
  $bank.filter((act) => act.isEnabled)
)

export const studentCategories = derived(enabledActivities, ($enabled) => {
  return BASE_ACTIVITY_CATEGORIES.map((cat): ActivityCategory => {
    const levels = $enabled.filter((a) => a.categoryId === cat.id)
    return {
      ...cat,
      levelIds: levels.map((l) => l.id),
      isAvailable: levels.length > 0,
      countLabel:
        levels.length === 1
          ? '1 ATIVIDADE'
          : `${levels.length} ATIVIDADES`
    }
  }).filter((c) => (c.levelIds?.length || 0) > 0)
})

export function getEnabledByCategory(
  bank: ActivityDefinition[],
  categoryId: ActivityCategoryId
): ActivityDefinition[] {
  return bank.filter((a) => a.categoryId === categoryId && a.isEnabled)
}

export async function loadActivityBank(): Promise<void> {
  isBankLoading.set(true)
  try {
    const loaded = await getAllActivities()
    activityBank.set(loaded)
  } finally {
    isBankLoading.set(false)
  }
}

export async function upsertActivityInBank(activity: ActivityDefinition): Promise<void> {
  await saveActivity(activity)
  await loadActivityBank()
}

export async function toggleActivityEnabledInBank(id: string, isEnabled: boolean): Promise<void> {
  await setActivityEnabled(id, isEnabled)
  activityBank.update((list) =>
    list.map((item) => (item.id === id ? { ...item, isEnabled } : item))
  )
}

export async function setAllEnabledInBank(isEnabled: boolean): Promise<void> {
  await setAllActivitiesEnabled(isEnabled)
  activityBank.update((list) => list.map((item) => ({ ...item, isEnabled })))
}

export async function duplicateActivityInBank(source: ActivityDefinition): Promise<ActivityDefinition> {
  const copy = cloneActivityAsCustom(source)
  await saveActivity(copy)
  await loadActivityBank()
  return copy
}

export async function removeCustomActivityInBank(id: string): Promise<void> {
  await deleteCustomActivity(id)
  await loadActivityBank()
}

export async function restoreBuiltInActivityInBank(id: string): Promise<void> {
  await restoreBuiltInActivity(id)
  await loadActivityBank()
}
