import Dexie, { type EntityTable } from 'dexie'
import type { Board, Cell } from '../types/board.types'
import type { ActivityDefinition } from '../types/activity.types'
import { INITIAL_BOARDS, INITIAL_CELLS } from '../constants/seed-boards.constants'
import { INITIAL_ACTIVITY_BANK } from '../constants/curriculum/activity-bank.seed'

export interface MediaCacheItem {
  id: string
  type: 'image' | 'audio'
  data: Blob
  timestamp: number
}

export class CapeDatabase extends Dexie {
  boards!: EntityTable<Board, 'id'>
  cells!: EntityTable<Cell, 'id'>
  mediaCache!: EntityTable<MediaCacheItem, 'id'>
  activities!: EntityTable<ActivityDefinition, 'id'>

  constructor() {
    super('CapeCaaDatabase')
    this.version(1).stores({
      boards: 'id, name, parentId, isRoot',
      cells: 'id, boardId, position, label, category',
      mediaCache: 'id, type, timestamp'
    })
    this.version(2).stores({
      boards: 'id, name, parentId, isRoot',
      cells: 'id, boardId, position, label, category',
      mediaCache: 'id, type, timestamp',
      activities: 'id, categoryId, isEnabled, isBuiltIn, order'
    })
  }

  /**
   * Inicializa pranchas e banco de atividades com os dados padrão do CAPE
   * preservando personalizações existentes.
   */
  async seedInitialDataIfNeeded(): Promise<void> {
    const boardsCount = await this.boards.count()
    const cellsCount = await this.cells.count()
    if (boardsCount === 0 || cellsCount === 0) {
      await this.transaction('rw', this.boards, this.cells, async () => {
        if (boardsCount === 0) {
          await this.boards.bulkPut(INITIAL_BOARDS)
        }
        await this.cells.bulkPut(INITIAL_CELLS)
      })
    } else {
      const allExisting = await this.cells.toArray()
      if (allExisting.some((c) => !c.customStyle || c.emoji === '🚻')) {
        await this.cells.bulkPut(INITIAL_CELLS)
      }
    }

    await this.seedActivitiesIfNeeded()
  }

  async seedActivitiesIfNeeded(): Promise<void> {
    const existingActivities = await this.activities.toArray()
    const existingIds = new Set(existingActivities.map((a) => a.id))
    const missingBuiltIns = INITIAL_ACTIVITY_BANK.filter((a) => !existingIds.has(a.id))

    if (missingBuiltIns.length > 0) {
      await this.activities.bulkPut(missingBuiltIns.map((a) => structuredClone(a)))
    }
  }

  /**
   * Restaura pranchas, cartões e banco de atividades para o padrão original de fábrica.
   */
  async resetToDefaultSeed(): Promise<void> {
    await this.transaction('rw', this.boards, this.cells, this.activities, async () => {
      await this.cells.clear()
      await this.boards.clear()
      await this.activities.clear()
      await this.boards.bulkAdd(INITIAL_BOARDS)
      await this.cells.bulkAdd(INITIAL_CELLS)
      await this.activities.bulkAdd(INITIAL_ACTIVITY_BANK.map((a) => structuredClone(a)))
    })
  }
}

export const db = new CapeDatabase()
