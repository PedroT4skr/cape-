import { useState, useEffect, type FC } from 'react'
import type { Difficulty, LeaderboardEntry } from '../../types/quiz.types'
import { DIFFICULTIES } from '../../config/quiz.config'
import { leaderboardRepository } from '../../services/leaderboard.repository'
import './leaderboard.css'

interface LeaderboardScreenProps {
  onBack: () => void
}

type FilterOption = 'all' | Difficulty

export const LeaderboardScreen: FC<LeaderboardScreenProps> = ({ onBack }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [filter, setFilter] = useState<FilterOption>('all')
  const [isLoading, setIsLoading] = useState(true)

  const reloadData = async () => {
    setIsLoading(true)
    const data = await leaderboardRepository.list(filter === 'all' ? undefined : filter)
    setEntries(data)
    setIsLoading(false)
  }

  useEffect(() => {
    reloadData()
  }, [filter])

  const handleClear = async () => {
    const confirmed = window.confirm(
      filter === 'all'
        ? 'Deseja apagar todo o ranking deste dispositivo?'
        : `Deseja apagar o ranking do nível ${DIFFICULTIES[filter].label}?`
    )
    if (confirmed) {
      await leaderboardRepository.clear(filter === 'all' ? undefined : filter)
      await reloadData()
    }
  }

  const handleExport = async () => {
    const csv = await leaderboardRepository.exportCsv()
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `ranking-matematica-tdah-${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return '🥇 1º'
      case 1:
        return '🥈 2º'
      case 2:
        return '🥉 3º'
      default:
        return `${index + 1}º`
    }
  }

  return (
    <div className="leaderboard-container">
      <header className="leaderboard-header">
        <div className="header-meta">
          <span className="teacher-tag">MODO PROFESSOR • PAINEL ASSÍNCRONO</span>
          <h1 className="leaderboard-title">Quadro de Líderes & Premiação</h1>
          <p className="leaderboard-desc">
            Visualização de desempenho dos alunos para premiação e acompanhamento pedagógico por categoria.
          </p>
        </div>

        <div className="leaderboard-top-actions">
          <button type="button" className="btn-secondary" onClick={handleExport} disabled={entries.length === 0}>
            📥 Exportar CSV
          </button>
          <button type="button" className="btn-danger" onClick={handleClear} disabled={entries.length === 0}>
            🗑️ Limpar Ranking
          </button>
          <button type="button" className="btn-back" onClick={onBack}>
            ← Voltar
          </button>
        </div>
      </header>

      <nav className="filter-nav" aria-label="Filtrar por nível de dificuldade">
        <button
          type="button"
          className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Todos os Níveis
        </button>
        {(['beginner', 'intermediate', 'advanced'] as Difficulty[]).map((diff) => (
          <button
            key={diff}
            type="button"
            className={`filter-tab ${filter === diff ? 'active' : ''}`}
            onClick={() => setFilter(diff)}
          >
            {DIFFICULTIES[diff].label}
          </button>
        ))}
      </nav>

      <main className="leaderboard-content">
        {isLoading ? (
          <div className="leaderboard-empty">Carregando dados...</div>
        ) : entries.length === 0 ? (
          <div className="leaderboard-empty">
            <span className="empty-icon">📊</span>
            <p className="empty-title">Nenhum resultado registrado ainda nesta categoria.</p>
            <p className="empty-sub">
              Assim que os alunos concluírem o quiz de matemática, os resultados e pontuações aparecerão aqui automaticamente.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th scope="col" className="col-rank">Posição</th>
                  <th scope="col" className="col-student">Aluno</th>
                  <th scope="col" className="col-category">Nível</th>
                  <th scope="col" className="col-score">Pontos</th>
                  <th scope="col" className="col-hits">Acertos</th>
                  <th scope="col" className="col-overtime">Pós-Tempo</th>
                  <th scope="col" className="col-time">Duração</th>
                  <th scope="col" className="col-date">Data / Hora</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => {
                  const dateStr = new Date(entry.finishedAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                  const diffLabel = DIFFICULTIES[entry.difficulty]?.label ?? entry.difficulty

                  return (
                    <tr key={entry.id} className={index < 3 ? `top-rank rank-${index + 1}` : ''}>
                      <td className="col-rank">
                        <span className="rank-indicator">{getRankBadge(index)}</span>
                      </td>
                      <td className="col-student">
                        <strong>{entry.playerName}</strong>
                      </td>
                      <td className="col-category">
                        <span className={`diff-pill pill-${entry.difficulty}`}>{diffLabel}</span>
                      </td>
                      <td className="col-score">
                        <span className="score-badge">{entry.score}</span>
                      </td>
                      <td className="col-hits">
                        {entry.correctCount} / {entry.totalQuestions}
                      </td>
                      <td className="col-overtime">
                        {entry.overtimeCount > 0 ? (
                          <span className="overtime-badge" title="Questões respondidas com penalidade de tempo">
                            ⚠️ {entry.overtimeCount}
                          </span>
                        ) : (
                          <span className="on-time-badge">⚡ 0</span>
                        )}
                      </td>
                      <td className="col-time">
                        {Math.round(entry.durationMs / 1000)}s
                      </td>
                      <td className="col-date">{dateStr}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
