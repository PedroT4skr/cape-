<script lang="ts">
  import type { Difficulty } from '../../types/quiz.types'
  import DifficultyCard from './DifficultyCard.svelte'
  import {
    playerName,
    currentDifficulty,
    startQuiz,
    isTeacherGateOpen
  } from '../../stores/quiz.store'
  import { User, Play, Lock } from '@lucide/svelte'

  let localName = $state($playerName || '')
  let selectedDiff = $state<Difficulty>($currentDifficulty)

  const difficulties: Difficulty[] = ['beginner', 'intermediate', 'advanced']

  function handleStart(e?: Event) {
    if (e) e.preventDefault()
    startQuiz(localName.trim() || 'Aluno', selectedDiff)
  }
</script>

<div class="start-container">
  <!-- Cabeçalho Limpo e Direto -->
  <header class="start-header">
    <h1 class="start-title">Quiz Matemático TDAH</h1>
    <p class="start-subtitle">
      Treino de raciocínio rápido com tempo adaptativo e sem bloqueios.
    </p>
  </header>

  <!-- Painel do Formulário em Tema Branco -->
  <form class="start-card" onsubmit={handleStart}>
    <!-- Campo do Aluno -->
    <div class="field-block">
      <label for="student-name" class="field-label">NOME DO ALUNO</label>
      <div class="input-wrapper">
        <User size={18} class="input-icon" color="#94A3B8" />
        <input
          id="student-name"
          type="text"
          class="name-input"
          placeholder="Digite seu nome..."
          bind:value={localName}
          maxlength="28"
          autocomplete="off"
        />
      </div>
    </div>

    <!-- Dificuldade -->
    <div class="field-block">
      <span class="field-label">DIFICULDADE</span>
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

    <!-- Botão Principal -->
    <button type="submit" class="start-btn">
      <Play size={18} fill="currentColor" />
      <span>INICIAR DESAFIO</span>
    </button>
  </form>

  <!-- Acesso ao Ranking -->
  <footer class="start-footer">
    <button
      type="button"
      class="teacher-btn"
      onclick={() => isTeacherGateOpen.set(true)}
    >
      <Lock size={14} />
      <span>Ranking & Acesso do Professor</span>
    </button>
  </footer>
</div>

<style>
  .start-container {
    max-width: 760px;
    margin: 0 auto;
    padding: 1.5rem 1rem 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    box-sizing: border-box;
    animation: fadeIn 0.2s ease-out;
  }

  .start-header {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
  }

  .start-title {
    font-size: clamp(1.8rem, 4vw, 2.3rem);
    font-weight: 900;
    color: #0F172A;
    margin: 0;
    letter-spacing: -0.02em;
  }

  .start-subtitle {
    font-size: 0.95rem;
    color: #64748B;
    margin: 0;
    font-weight: 500;
  }

  .start-card {
    background: #FFFFFF;
    border: 2px solid #E2E8F0;
    border-radius: 20px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  }

  .field-block {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .field-label {
    font-size: 0.78rem;
    font-weight: 850;
    color: #475569;
    letter-spacing: 0.05em;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  :global(.input-wrapper .input-icon) {
    position: absolute;
    left: 14px;
    pointer-events: none;
  }

  .name-input {
    width: 100%;
    background: #F8FAFC;
    border: 2px solid #CBD5E1;
    border-radius: 12px;
    color: #0F172A;
    font-size: 1.05rem;
    font-weight: 700;
    padding: 0.85rem 1rem 0.85rem 2.6rem;
    outline: none;
    transition: all 0.15s ease;
    box-sizing: border-box;
  }

  .name-input:focus {
    border-color: #059669;
    background: #FFFFFF;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
  }

  .name-input::placeholder {
    color: #94A3B8;
    font-weight: 500;
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
    background: #059669;
    color: #FFFFFF;
    border: none;
    border-radius: 14px;
    padding: 1rem 1.5rem;
    cursor: pointer;
    font-size: 1.15rem;
    font-weight: 900;
    letter-spacing: 0.04em;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    box-shadow: 0 4px 14px rgba(5, 150, 105, 0.35);
    transition: all 0.15s ease;
  }

  .start-btn:hover {
    background: #047857;
    box-shadow: 0 6px 18px rgba(5, 150, 105, 0.45);
    transform: translateY(-1px);
  }

  .start-btn:active {
    transform: scale(0.99);
  }

  .start-footer {
    display: flex;
    justify-content: center;
  }

  .teacher-btn {
    background: transparent;
    border: 1px solid #CBD5E1;
    color: #64748B;
    font-size: 0.82rem;
    font-weight: 750;
    padding: 0.55rem 1rem;
    border-radius: 10px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.15s ease;
  }

  .teacher-btn:hover {
    background: #FFFFFF;
    color: #0F172A;
    border-color: #94A3B8;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
