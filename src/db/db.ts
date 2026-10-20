import Dexie, { type EntityTable } from 'dexie'
import type { Board, Cell } from '../types/board.types'
import { INITIAL_BOARDS, INITIAL_CELLS } from '../constants/seed-boards.constants'

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

  constructor() {
    super('CapeCaaDatabase')
    this.version(1).stores({
      boards: 'id, name, parentId, isRoot',
      cells: 'id, boardId, position, label, category',
      mediaCache: 'id, type, timestamp'
    })
  }

  /**
   * Inicializa o banco de dados com os dados de semente do CAPE
   * caso a tabela de pranchas esteja vazia.
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
  }

  /**
   * Restaura o banco de dados para os valores padrão de fábrica do CAPE.
   */
  async resetToDefaultSeed(): Promise<void> {
    await this.transaction('rw', this.boards, this.cells, async () => {
      await this.cells.clear()
      await this.boards.clear()
      await this.boards.bulkAdd(INITIAL_BOARDS)
      await this.cells.bulkAdd(INITIAL_CELLS)
    })
  }
}

export const db = new CapeDatabase()
