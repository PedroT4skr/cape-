import { db } from './db'
import type { Board } from '../types/board.types'

export async function getAllBoards(): Promise<Board[]> {
  await db.seedInitialDataIfNeeded()
  return await db.boards.toArray()
}

export async function getBoardById(id: string): Promise<Board | undefined> {
  await db.seedInitialDataIfNeeded()
  return await db.boards.get(id)
}

export async function getRootBoard(): Promise<Board | undefined> {
  await db.seedInitialDataIfNeeded()
  const byId = await db.boards.get('board-root')
  if (byId) return byId
  return await db.boards.filter((b) => Boolean(b.isRoot)).first()
}

export async function saveBoard(board: Board): Promise<void> {
  await db.boards.put(board)
}

export async function deleteBoard(id: string): Promise<void> {
  await db.transaction('rw', db.boards, db.cells, async () => {
    await db.cells.where('boardId').equals(id).delete()
    await db.boards.delete(id)
  })
}
