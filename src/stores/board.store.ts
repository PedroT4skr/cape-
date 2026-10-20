import { writable, get } from 'svelte/store'
import type { Board, Cell } from '../types/board.types'
import { db } from '../db/db'
import { getBoardById, getRootBoard, getAllBoards } from '../db/boards.repository'
import { getCellsByBoardId } from '../db/cells.repository'

export const currentBoard = writable<Board | null>(null)
export const boardCells = writable<Cell[]>([])
export const allBoards = writable<Board[]>([])
export const boardHistory = writable<string[]>([])
export const isLoadingBoard = writable<boolean>(false)

/**
 * Carrega uma prancha pelo ID e popula suas células
 */
export async function loadBoard(boardId: string): Promise<void> {
  isLoadingBoard.set(true)
  try {
    await db.seedInitialDataIfNeeded()
    const board = await getBoardById(boardId)
    if (board) {
      currentBoard.set(board)
      const cells = await getCellsByBoardId(board.id)
      boardCells.set(cells)
    }
    const boardsList = await getAllBoards()
    allBoards.set(boardsList)
  } finally {
    isLoadingBoard.set(false)
  }
}

/**
 * Inicializa na prancha raiz
 */
export async function initRootBoard(): Promise<void> {
  isLoadingBoard.set(true)
  try {
    await db.seedInitialDataIfNeeded()
    const root = await getRootBoard()
    if (root) {
      currentBoard.set(root)
      boardHistory.set([root.id])
      const cells = await getCellsByBoardId(root.id)
      boardCells.set(cells)
    }
    const boardsList = await getAllBoards()
    allBoards.set(boardsList)
  } finally {
    isLoadingBoard.set(false)
  }
}

/**
 * Navega para uma sub-prancha hierárquica (ex: "Alimentação")
 */
export async function navigateToBoard(targetBoardId: string): Promise<void> {
  const current = get(currentBoard)
  if (current) {
    boardHistory.update((h) => [...h, targetBoardId])
  }
  await loadBoard(targetBoardId)
}

/**
 * Retorna à prancha anterior no histórico
 */
export async function navigateBack(): Promise<void> {
  const history = get(boardHistory)
  if (history.length > 1) {
    const newHistory = history.slice(0, -1)
    const prevBoardId = newHistory[newHistory.length - 1]
    boardHistory.set(newHistory)
    await loadBoard(prevBoardId)
  } else {
    await initRootBoard()
  }
}
