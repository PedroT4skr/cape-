import { writable, get } from 'svelte/store'
import { isActivitiesPageOpen, selectedCategoryId } from './activity.store'
import { isAdminDashboardOpen } from './admin.store'
import { isMathQuizOpen } from './quiz.store'

export type ActiveAppView = 'hub' | 'board' | 'activities' | 'quiz' | 'admin'

export const activeView = writable<ActiveAppView>('board')
export const previousMainView = writable<ActiveAppView>('board')

export function navigateTo(view: ActiveAppView) {
  const current = get(activeView)
  if (current === 'board' || current === 'hub') {
    previousMainView.set(current)
  }

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
    selectedCategoryId.set(null)
  }
}

export function navigateBackToMain() {
  const target = get(previousMainView) || 'board'
  navigateTo(target)
}
