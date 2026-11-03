<script lang="ts">
  import type { Difficulty, LeaderboardEntry } from '../../types/quiz.types'
  import { DIFFICULTIES } from '../../config/quiz.config'
  import { leaderboardRepository } from '../../services/leaderboard.repository'
  import { isLeaderboardOpen } from '../../stores/quiz.store'

  type FilterOption = 'all' | Difficulty

  let entries = $state<LeaderboardEntry[]>([])
  let filter = $state<FilterOption>('all')
  let isLoading = $state(true)

  async function reloadData() {
    isLoading = true
    entries = await leaderboardRepository.list(filter === 'all' ? undefined : filter)
    isLoading = false
  }

  $effect(() => {
    void filter
    void reloadData()
  })

  async function handleClear() {
    const confirmed = window.confirm('Deseja realmente limpar o histórico do ranking deste dispositivo?')
    if (confirmed) {
      await leaderboardRepository.clear(filter === 'all' ? undefined : filter)
      await reloadData()
    }
  }

  async function handleExport() {
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

  function getRankBadge(index: number) {
    if (index === 0) return '🥇 1º'
    if (index === 1) return '🥈 2º'
    if (index === 2) return '🥉 3º'
    return `${index + 1}º`
  }
</script>

<div class="leaderboard-container">
  <header class="leaderboard-header">
    <div class="header-meta">
      <span class="teacher-tag">MODO PROFESSOR</span>
      <h1 class="leaderboard-title">Quadro de Líderes</h1>
      <p class="leaderboard-desc">
        Acompanhamento pedagógico de desempenho por nível.
      </p>
    </div>

    <div class="leaderboard-top-actions">
      <button type="button" class="btn-secondary" onclick={handleExport} disabled={entries.length === 0}>
        📥 Exportar CSV
      </button>
      <button type="button" class="btn-danger" onclick={handleClear} disabled={entries.length === 0}>
        🗑️ Limpar
      </button>
      <button type="button" class="btn-back" onclick={() => isLeaderboardOpen.set(false)}>
        ← Voltar
      </button>
    </div>
  </header>

  <nav class="filter-nav" aria-label="Filtrar por nível">
    <button
      type="button"
      class="filter-tab {filter === 'all' ? 'active' : ''}"
      onclick={() => (filter = 'all')}
    >
      Todos os Níveis
    </button>
    {#each ['beginner', 'intermediate', 'advanced'] as diff}
      {@const d = diff as Difficulty}
      <button
        type="button"
        class="filter-tab {filter === d ? 'active' : ''}"
        onclick={() => (filter = d)}
      >
        {DIFFICULTIES[d].label}
      </button>
    {/each}
  </nav>

  <main class="leaderboard-content">
    {#if isLoading}
      <div class="leaderboard-empty">Carregando dados...</div>
    {:else if entries.length === 0}
      <div class="leaderboard-empty">
        <span class="empty-icon">📊</span>
        <p class="empty-title">Nenhum resultado registrado ainda nesta categoria.</p>
        <p class="empty-sub">
          Assim que os alunos concluírem o quiz, os resultados aparecerão aqui.
        </p>
      </div>
    {:else}
      <div class="table-responsive">
        <table class="leaderboard-table">
          <thead>
            <tr>
              <th scope="col">Posição</th>
              <th scope="col">Aluno</th>
              <th scope="col">Nível</th>
              <th scope="col">Pontos</th>
              <th scope="col">Acertos</th>
              <th scope="col">Pós-Tempo</th>
              <th scope="col">Duração</th>
              <th scope="col">Data</th>
            </tr>
          </thead>
          <tbody>
            {#each entries as entry, index}
              {@const diffLabel = DIFFICULTIES[entry.difficulty]?.label ?? entry.difficulty}
              {@const dateStr = new Date(entry.finishedAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })}
              <tr class={index < 3 ? `top-rank rank-${index + 1}` : ''}>
                <td>
                  <span class="rank-indicator">{getRankBadge(index)}</span>
                </td>
                <td>
                  <strong>{entry.playerName}</strong>
                </td>
                <td>
                  <span class="diff-pill pill-{entry.difficulty}">{diffLabel}</span>
                </td>
                <td>
                  <span class="score-badge">{entry.score}</span>
                </td>
                <td>{entry.correctCount} / {entry.totalQuestions}</td>
                <td>
                  {#if entry.overtimeCount > 0}
                    <span class="overtime-badge" title="Questões respondidas após o tempo">
                      ⚠️ {entry.overtimeCount}
                    </span>
                  {:else}
                    <span class="on-time-badge">⚡ 0</span>
                  {/if}
                </td>
                <td>{Math.round(entry.durationMs / 1000)}s</td>
                <td>{dateStr}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </main>
</div>

<style>
  .leaderboard-container {
    max-width: 1040px;
    margin: 0 auto;
    padding: 1.5rem 1rem 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    animation: fadeIn 0.2s ease-out;
  }

  .leaderboard-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1.5rem;
    flex-wrap: wrap;
    border-bottom: 2px solid #E2E8F0;
    padding-bottom: 1.1rem;
  }

  .teacher-tag {
    display: inline-block;
    background: #EFF6FF;
    border: 1px solid #BFDBFE;
    color: #1D4ED8;
    font-size: 0.75rem;
    font-weight: 800;
    padding: 0.2rem 0.6rem;
    border-radius: 9999px;
    letter-spacing: 0.05em;
    margin-bottom: 0.35rem;
  }

  .leaderboard-title {
    font-size: clamp(1.6rem, 3.5vw, 2.1rem);
    font-weight: 900;
    color: #0F172A;
    margin: 0;
  }

  .leaderboard-desc {
    font-size: 0.92rem;
    color: #64748B;
    margin: 0.2rem 0 0;
  }

  .leaderboard-top-actions {
    display: flex;
    gap: 0.6rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .btn-secondary, .btn-danger, .btn-back {
    padding: 0.6rem 0.95rem;
    border-radius: 10px;
    font-size: 0.82rem;
    font-weight: 800;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.15s ease;
    min-height: 38px;
  }

  .btn-secondary {
    background: #FFFFFF;
    color: #334155;
    border-color: #CBD5E1;
  }

  .btn-secondary:hover:not(:disabled) { background: #F1F5F9; color: #0F172A; }

  .btn-danger {
    background: #FFF1F2;
    color: #BE123C;
    border-color: #FECDD3;
  }

  .btn-danger:hover:not(:disabled) { background: #FFE4E6; }

  .btn-back {
    background: #059669;
    color: #FFFFFF;
  }

  .btn-back:hover { background: #047857; }

  .btn-secondary:disabled, .btn-danger:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .filter-nav {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding-bottom: 0.25rem;
  }

  .filter-tab {
    background: #FFFFFF;
    border: 1px solid #CBD5E1;
    color: #64748B;
    padding: 0.5rem 0.95rem;
    border-radius: 10px;
    font-size: 0.82rem;
    font-weight: 750;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.15s ease;
  }

  .filter-tab.active {
    background: #059669;
    color: #FFFFFF;
    border-color: #059669;
    font-weight: 850;
  }

  .leaderboard-content {
    background: #FFFFFF;
    border: 2px solid #E2E8F0;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
  }

  .leaderboard-empty {
    padding: 3rem 1.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .empty-icon { font-size: 2.2rem; }

  .empty-title {
    font-size: 1.05rem;
    font-weight: 800;
    color: #334155;
    margin: 0;
  }

  .empty-sub {
    font-size: 0.85rem;
    color: #64748B;
    max-width: 440px;
    margin: 0;
  }

  .table-responsive {
    width: 100%;
    overflow-x: auto;
  }

  .leaderboard-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 0.88rem;
  }

  .leaderboard-table th {
    background: #F8FAFC;
    color: #475569;
    font-size: 0.72rem;
    font-weight: 850;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.8rem 1rem;
    border-bottom: 2px solid #E2E8F0;
    white-space: nowrap;
  }

  .leaderboard-table td {
    padding: 0.8rem 1rem;
    border-bottom: 1px solid #E2E8F0;
    color: #334155;
    white-space: nowrap;
  }

  .leaderboard-table tr:hover td {
    background: #F8FAFC;
  }

  .rank-indicator {
    font-weight: 850;
    color: #0F172A;
  }

  .score-badge {
    font-size: 1rem;
    font-weight: 900;
    color: #059669;
    font-variant-numeric: tabular-nums;
  }

  .diff-pill {
    padding: 0.2rem 0.5rem;
    border-radius: 6px;
    font-size: 0.72rem;
    font-weight: 800;
  }

  .pill-beginner { background: #ECFDF5; color: #065F46; }
  .pill-intermediate { background: #FFFBEB; color: #92400E; }
  .pill-advanced { background: #F5F3FF; color: #5B21B6; }

  .overtime-badge { color: #D97706; font-weight: 800; }
  .on-time-badge { color: #059669; }

  @media (max-width: 640px) {
    .leaderboard-container {
      padding: 0.75rem 0.75rem 2rem;
      gap: 0.75rem;
    }

    .leaderboard-header {
      flex-direction: column;
      gap: 0.75rem;
    }

    .leaderboard-top-actions {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }

    .btn-secondary, .btn-danger, .btn-back {
      padding: 0.5rem 0.6rem;
      font-size: 0.75rem;
      text-align: center;
      justify-content: center;
    }

    .leaderboard-table th, .leaderboard-table td {
      padding: 0.6rem 0.75rem;
      font-size: 0.8rem;
    }
  }
</style>
