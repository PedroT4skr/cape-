import { db } from '../db/db'
import type { Board, Cell } from '../types/board.types'

export interface CapeBackupData {
  version: string
  exportedAt: string
  institution: string
  boards: Board[]
  cells: Cell[]
}

/**
 * Exporta todas as pranchas e cartões do IndexedDB em um único objeto JSON estruturado.
 */
export async function exportAllBoardsData(): Promise<CapeBackupData> {
  await db.seedInitialDataIfNeeded()
  const boards = await db.boards.toArray()
  const cells = await db.cells.toArray()

  return {
    version: '5.3.0',
    exportedAt: new Date().toISOString(),
    institution: 'CAPE - Centro de Apoio Pedagógico Especializado',
    boards,
    cells
  }
}

/**
 * Dispara o download de um arquivo .json contendo o backup completo das pranchas e cartões.
 */
export async function downloadBackupJson(): Promise<void> {
  const data = await exportAllBoardsData()
  const jsonStr = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `cape-backup-pranchas-${new Date().toISOString().slice(0, 10)}.json`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Importa e restaura pranchas e cartões a partir de um objeto JSON de backup.
 */
export async function importBackupData(backup: CapeBackupData): Promise<{ boardsCount: number; cellsCount: number }> {
  if (!backup || !Array.isArray(backup.boards) || !Array.isArray(backup.cells)) {
    throw new Error('Arquivo de backup inválido: formato incompatível com a Suíte CAPE.')
  }

  await db.transaction('rw', db.boards, db.cells, async () => {
    // Importa ou sobrescreve pranchas e células preservando integridade
    await db.boards.bulkPut(backup.boards)
    await db.cells.bulkPut(backup.cells)
  })

  return {
    boardsCount: backup.boards.length,
    cellsCount: backup.cells.length
  }
}

