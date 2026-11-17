import { db } from './db'
import type { ActivityDefinition } from '../types/activity.types'
import { BUILT_IN_ACTIVITY_MAP, INITIAL_ACTIVITY_BANK } from '../constants/curriculum/activity-bank.seed'

export async function getAllActivities(): Promise<ActivityDefinition[]> {
  await db.seedActivitiesIfNeeded()
  const list = await db.activities.toArray()
  return list.sort((a, b) => a.order - b.order)
}

export async function getActivityById(id: string): Promise<ActivityDefinition | undefined> {
  await db.seedActivitiesIfNeeded()
  return await db.activities.get(id)
}

function toPlain<T>(data: T): T {
  return JSON.parse(JSON.stringify(data)) as T
}

export async function saveActivity(activity: ActivityDefinition): Promise<void> {
  const payload: ActivityDefinition = {
    ...toPlain(activity),
    updatedAt: Date.now()
  }
  await db.activities.put(payload)
}

export async function setActivityEnabled(id: string, isEnabled: boolean): Promise<void> {
  await db.activities.update(id, { isEnabled, updatedAt: Date.now() })
}

export async function setAllActivitiesEnabled(isEnabled: boolean): Promise<void> {
  const all = await db.activities.toArray()
  const updated = all.map((a) => ({ ...a, isEnabled, updatedAt: Date.now() }))
  await db.activities.bulkPut(updated)
}

export async function deleteCustomActivity(id: string): Promise<void> {
  const target = await db.activities.get(id)
  if (!target || target.isBuiltIn) return
  await db.activities.delete(id)
}

export async function restoreBuiltInActivity(id: string): Promise<void> {
  const seed = BUILT_IN_ACTIVITY_MAP[id]
  if (!seed) return
  await db.activities.put({
    ...toPlain(seed),
    updatedAt: Date.now()
  })
}

export async function resetBuiltInActivitiesOnly(): Promise<void> {
  await db.activities.bulkPut(
    INITIAL_ACTIVITY_BANK.map((a) => ({ ...toPlain(a), updatedAt: Date.now() }))
  )
}
