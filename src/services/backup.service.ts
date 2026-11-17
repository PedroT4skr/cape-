import { db } from '../db/db'
import type { Board, Cell } from '../types/board.types'
import type { ActivityDefinition } from '../types/activity.types'

export interface CapeBackupData {
  version: string
  exportedAt: string
  institution: string
  boards: Board[]
  cells: Cell[]
  activities?: ActivityDefinition[]
}

/**
 * Exporta pranchas, cartões e banco de atividades do IndexedDB em JSON estruturado.
 */
export async function exportAllBoardsData(): Promise<CapeBackupData> {
  await db.seedInitialDataIfNeeded()
  const boards = await db.boards.toArray()
  const cells = await db.cells.toArray()
  const activities = await db.activities.toArray()

  return {
    version: '5.4.0',
    exportedAt: new Date().toISOString(),
    institution: 'CAPE - Centro de Apoio Pedagógico Especializado',
    boards,
    cells,
    activities
  }
}

/**
 * Dispara o download de um arquivo .json contendo o backup completo da plataforma.
 */
export async function downloadBackupJson(): Promise<void> {
  const data = await exportAllBoardsData()
  const jsonStr = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `cape-backup-completo-${new Date().toISOString().slice(0, 10)}.json`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Importa e restaura pranchas, cartões e atividades a partir de um arquivo JSON de backup.
 */
export async function importBackupData(
  backup: CapeBackupData
): Promise<{ boardsCount: number; cellsCount: number; activitiesCount: number }> {
  if (!backup || !Array.isArray(backup.boards) || !Array.isArray(backup.cells)) {
    throw new Error('Arquivo de backup inválido: formato incompatível com a Suíte CAPE.')
  }

  const hasActivities = Array.isArray(backup.activities) && backup.activities.length > 0

  await db.transaction('rw', db.boards, db.cells, db.activities, async () => {
    await db.boards.bulkPut(backup.boards)
    await db.cells.bulkPut(backup.cells)
    if (hasActivities && backup.activities) {
      await db.activities.bulkPut(backup.activities)
    }
  })

  return {
    boardsCount: backup.boards.length,
    cellsCount: backup.cells.length,
    activitiesCount: hasActivities && backup.activities ? backup.activities.length : 0
  }
}
