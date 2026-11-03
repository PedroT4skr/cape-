<script lang="ts">
  import type { Difficulty } from '../../types/quiz.types'
  import DifficultyCard from './DifficultyCard.svelte'
  import {
    playerName,
    currentDifficulty,
    startQuiz,
    isTeacherGateOpen
  } from '../../stores/quiz.store'

  let localName = $state($playerName || '')
  let selectedDiff = $state<Difficulty>($currentDifficulty)

  const difficulties: Difficulty[] = ['beginner', 'intermediate', 'advanced']

  function handleStart(e?: Event) {
    if (e) e.preventDefault()
    startQuiz(localName.trim() || 'Aluno', selectedDiff)
  }
</script>

<div class="start-container">
  <header class="start-header">
    <span class="cape-tag">CAPE • MATEMÁTICA INCLUSIVA</span>
    <h1 class="start-title">Quiz Matemático TDAH 🧠⚡</h1>
    <p class="start-subtitle">
      Treino cognitivo focado, sem bloqueio de tempo e com pontuação gamificada adaptada.
    </p>
  </header>

  <form class="start-form" onsubmit={handleStart}>
    <div class="field-group">
      <label for="student-name" class="field-label">NOME DO ALUNO</label>
      <input
        id="student-name"
        type="text"
        class="name-input"
        placeholder="Ex.: Lucas, Sofia, Pedro..."
        bind:value={localName}
        maxlength="30"
      />
    </div>

    <div class="field-group">
      <span class="field-label">ESCOLHA A DIFICULDADE</span>
      <div class="difficulty-grid">
        {#each difficulties as diff}
          <DifficultyCard
            difficulty={diff}
            selected={selectedDiff === diff}
            onselect={(d) => (selectedDiff = d)}
          />
        {/each}
      </div>
    </div>

    <button type="submit" class="start-btn">
      INICIAR DESAFIO ▶
    </button>
  </form>

  <footer class="start-footer">
    <button
      type="button"
      class="teacher-btn"
      onclick={() => isTeacherGateOpen.set(true)}
    >
      🔒 Acesso do Professor / Ranking
    </button>
  </footer>
</div>

<style>
  .start-container {
    max-width: 680px;
    margin: 0 auto;
    padding: 1.5rem 1rem 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    animation: fadeIn 0.3s ease-out;
  }

  .start-header {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
  }

  .cape-tag {
    background: rgba(16, 185, 129, 0.15);
    border: 1px solid #10b981;
    color: #10b981;
    padding: 0.2rem 0.65rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.05em;
  }

  .start-title {
    font-size: clamp(1.8rem, 4.5vw, 2.5rem);
    font-weight: 900;
    color: #f8fafc;
    margin: 0.25rem 0 0;
  }

  .start-subtitle {
    font-size: 0.95rem;
    color: #94a3b8;
    margin: 0;
    max-width: 520px;
  }

  .start-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .field-label {
    font-size: 0.8rem;
    font-weight: 800;
    color: #94a3b8;
    letter-spacing: 0.05em;
  }

  .name-input {
    background: #1e293b;
    border: 2px solid #334155;
    border-radius: 12px;
    color: #f8fafc;
    font-size: 1.15rem;
    font-weight: 700;
    padding: 0.9rem 1.1rem;
    outline: none;
    transition: border-color 0.15s ease;
  }

  .name-input:focus {
    border-color: #10b981;
  }

  .difficulty-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }

  @media (max-width: 640px) {
    .difficulty-grid {
      grid-template-columns: 1fr;
    }
  }

  .start-btn {
    background: #10b981;
    color: #022c22;
    border: none;
    border-radius: 14px;
    padding: 1.1rem;
    font-size: 1.25rem;
    font-weight: 900;
    letter-spacing: 0.05em;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(16, 185, 129, 0.3);
    transition: transform 0.15s ease, filter 0.15s ease;
  }

  .start-btn:hover {
    filter: brightness(1.1);
  }

  .start-btn:active {
    transform: scale(0.98);
  }

  .start-footer {
    display: flex;
    justify-content: center;
  }

  .teacher-btn {
    background: transparent;
    border: 1px solid #475569;
    color: #94a3b8;
    font-size: 0.85rem;
    font-weight: 700;
    padding: 0.6rem 1rem;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .teacher-btn:hover {
    background: #1e293b;
    color: #f8fafc;
    border-color: #64748b;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
