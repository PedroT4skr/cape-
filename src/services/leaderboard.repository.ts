import { LEADERBOARD_STORAGE_KEY } from '../config/quiz.config'
import type { Difficulty, LeaderboardEntry } from '../types/quiz.types'

/**
 * Persistência local e assíncrona do ranking (sem servidor).
 * Interface Promise-based para permitir troca futura por uma API sem alterar a UI.
 */
function readAll(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LEADERBOARD_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as LeaderboardEntry[]) : []
  } catch {
    return []
  }
}

function writeAll(entries: LeaderboardEntry[]) {
  localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(entries))
}

/** Ordenação: pontuação ↓, acertos ↓, tempo total ↑. */
export const compareEntries = (a: LeaderboardEntry, b: LeaderboardEntry) =>
  b.score - a.score || b.correctCount - a.correctCount || a.durationMs - b.durationMs

export const leaderboardRepository = {
  async save(entry: LeaderboardEntry): Promise<void> {
    writeAll([...readAll(), entry])
  },

  async list(difficulty?: Difficulty): Promise<LeaderboardEntry[]> {
    const all = readAll()
    return (difficulty ? all.filter((e) => e.difficulty === difficulty) : all).sort(compareEntries)
  },

  async clear(difficulty?: Difficulty): Promise<void> {
    writeAll(difficulty ? readAll().filter((e) => e.difficulty !== difficulty) : [])
  },

  /** Exportação CSV para o professor arquivar/premiar. */
  async exportCsv(): Promise<string> {
    const header = 'Aluno,Nível,Acertos,Total,Pontuação,Respostas fora do tempo,Duração (s),Data'
    const rows = (await this.list()).map((e) =>
      [e.playerName, e.difficulty, e.correctCount, e.totalQuestions, e.score, e.overtimeCount, Math.round(e.durationMs / 1000), e.finishedAt]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(',')
    )
    return [header, ...rows].join('\n')
  }
}
