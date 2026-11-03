import { writable } from 'svelte/store'
import { isActivitiesPageOpen } from './activity.store'
import { isAdminDashboardOpen } from './admin.store'
import { isMathQuizOpen } from './quiz.store'

export type ActiveAppView = 'hub' | 'board' | 'activities' | 'quiz' | 'admin'

export const activeView = writable<ActiveAppView>('board')

export function navigateTo(view: ActiveAppView) {
  activeView.set(view)

  if (view === 'activities') {
    isActivitiesPageOpen.set(true)
    isAdminDashboardOpen.set(false)
    isMathQuizOpen.set(false)
  } else if (view === 'admin') {
    isAdminDashboardOpen.set(true)
    isActivitiesPageOpen.set(false)
    isMathQuizOpen.set(false)
  } else if (view === 'quiz') {
    isMathQuizOpen.set(true)
    isActivitiesPageOpen.set(false)
    isAdminDashboardOpen.set(false)
  } else {
    // board or hub
    isActivitiesPageOpen.set(false)
    isAdminDashboardOpen.set(false)
    isMathQuizOpen.set(false)
  }
}
