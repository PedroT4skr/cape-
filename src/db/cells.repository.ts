import { db } from './db'
import type { Cell } from '../types/board.types'

export async function getCellsByBoardId(boardId: string): Promise<Cell[]> {
  await db.seedInitialDataIfNeeded()
  const cells = await db.cells.where('boardId').equals(boardId).toArray()
  return cells.sort((a, b) => a.position - b.position)
}

export async function saveCell(cell: Cell): Promise<void> {
  await db.cells.put(cell)
}

export async function deleteCell(id: string): Promise<void> {
  await db.cells.delete(id)
}

export async function reorderCells(cells: Cell[]): Promise<void> {
  await db.cells.bulkPut(cells)
}
