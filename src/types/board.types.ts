import type { FitzgeraldCategory } from './fitzgerald.types'

export interface Board {
  id: string
  name: string
  icon?: string
  gridCols: number
  gridRows: number
  parentId?: string | null
  isRoot: boolean
  createdAt: number
}

export interface ColorStyle {
  bg: string
  border: string
  text: string
}

export interface Cell {
  id: string
  boardId: string
  position: number
  label: string
  category: FitzgeraldCategory
  emoji?: string
  iconName?: string
  iconSvg?: string
  audioText?: string
  targetBoardId?: string | null
  isNavigationOnly?: boolean
  colorOverride?: string
  customStyle?: ColorStyle
}

export interface SentenceItem {
  id: string
  label: string
  category: FitzgeraldCategory
  emoji?: string
  iconName?: string
  iconSvg?: string
  audioText?: string
  customStyle?: ColorStyle
  addedAt: number
}
