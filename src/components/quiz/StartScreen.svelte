<script lang="ts">
  import type { Difficulty } from '../../types/quiz.types'
  import DifficultyCard from './DifficultyCard.svelte'
  import {
    playerName,
    currentDifficulty,
    startQuiz,
    isTeacherGateOpen
  } from '../../stores/quiz.store'
  import { User, Play, Lock, Sparkles, Brain } from '@lucide/svelte'

  let localName = $state($playerName || '')
  let selectedDiff = $state<Difficulty>($currentDifficulty)

  const difficulties: Difficulty[] = ['beginner', 'intermediate', 'advanced']

  function handleStart(e?: Event) {
    if (e) e.preventDefault()
    startQuiz(localName.trim() || 'Aluno', selectedDiff)
  }
</script>

<div class="start-container">
  <!-- Cabeçalho Principal -->
  <header class="start-header">
    <div class="header-pill">
      <Sparkles size={14} color="#10b981" />
      <span>TECNOLOGIA ASSISTIVA • CAPE</span>
    </div>

    <h1 class="start-title">
      Quiz Matemático <span class="highlight-gradient">TDAH</span>
    </h1>

    <p class="start-subtitle">
      Cálculo rápido gamificado com foco atencional, tempo adaptado e mecânica acolhedora sem bloqueios cognitivos.
    </p>
  </header>

  <!-- Formulário de Inicialização -->
  <form class="start-card-panel" onsubmit={handleStart}>
    <!-- Campo do Aluno -->
    <div class="field-block">
      <label for="student-name" class="field-label">
        <span>QUEM VAI JOGAR?</span>
        <span class="label-hint">Identificação para premiação</span>
      </label>

      <div class="input-wrapper">
        <div class="input-icon">
          <User size={18} color="#94a3b8" />
        </div>
        <input
          id="student-name"
          type="text"
          class="name-input"
          placeholder="Digite seu nome ou apelido..."
          bind:value={localName}
          maxlength="28"
          autocomplete="off"
        />
      </div>
    </div>

    <!-- Seletor de Dificuldade -->
    <div class="field-block">
      <div class="field-label">
        <span>ESCOLHA A DIFICULDADE</span>
        <span class="label-hint">Selecione o nível desejado</span>
      </div>

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

    <!-- CTA de Ação Principal -->
    <button type="submit" class="start-action-btn">
      <div class="btn-content">
        <span class="btn-text">COMEÇAR O DESAFIO</span>
        <div class="btn-icon-capsule">
          <Play size={18} fill="currentColor" />
        </div>
      </div>
    </button>
  </form>

  <!-- Rodapé / Modo Professor -->
  <footer class="start-footer">
    <button
      type="button"
      class="teacher-gate-btn"
      onclick={() => isTeacherGateOpen.set(true)}
    >
      <Lock size={14} />
      <span>Acesso do Professor & Ranking</span>
    </button>
  </footer>
</div>

<style>
  .start-container {
    max-width: 820px;
    margin: 0 auto;
    padding: 2rem 1.25rem 3.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    box-sizing: border-box;
  }

  .start-header {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
  }

  .header-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(16, 185, 129, 0.12);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #34d399;
    padding: 0.3rem 0.85rem;
    border-radius: 9999px;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
  }

  .start-title {
    font-size: clamp(2rem, 5vw, 2.8rem);
    font-weight: 900;
    color: #f8fafc;
    margin: 0;
    line-height: 1.15;
    letter-spacing: -0.02em;
  }

  .highlight-gradient {
    background: linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .start-subtitle {
    font-size: 0.98rem;
    color: #94a3b8;
    margin: 0;
    max-width: 580px;
    line-height: 1.5;
  }

  .start-card-panel {
    background: #0f172a;
    border: 1px solid #1e293b;
    border-radius: 24px;
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
  }

  .field-block {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .field-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.78rem;
    font-weight: 850;
    color: #cbd5e1;
    letter-spacing: 0.06em;
  }

  .label-hint {
    font-size: 0.72rem;
    color: #64748b;
    font-weight: 600;
    letter-spacing: normal;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-icon {
    position: absolute;
    left: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  .name-input {
    width: 100%;
    background: #1e293b;
    border: 2px solid #334155;
    border-radius: 14px;
    color: #f8fafc;
    font-size: 1.1rem;
    font-weight: 700;
    padding: 0.95rem 1rem 0.95rem 2.75rem;
    outline: none;
    transition: all 0.2s ease;
    box-sizing: border-box;
  }

  .name-input:focus {
    border-color: #10b981;
    background: #223046;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
  }

  .name-input::placeholder {
    color: #64748b;
    font-weight: 500;
  }

  .difficulty-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  @media (max-width: 680px) {
    .difficulty-grid {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }
  }

  .start-action-btn {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: #022c22;
    border: none;
    border-radius: 16px;
    padding: 1.15rem 1.5rem;
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    outline: none;
  }

  .start-action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(16, 185, 129, 0.55);
    filter: brightness(1.06);
  }

  .start-action-btn:active {
    transform: translateY(1px) scale(0.99);
  }

  .btn-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  .btn-text {
    font-size: 1.25rem;
    font-weight: 950;
    letter-spacing: 0.05em;
  }

  .btn-icon-capsule {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(2, 44, 34, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .start-footer {
    display: flex;
    justify-content: center;
  }

  .teacher-gate-btn {
    background: transparent;
    border: 1px solid #334155;
    color: #94a3b8;
    font-size: 0.85rem;
    font-weight: 700;
    padding: 0.65rem 1.25rem;
    border-radius: 12px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.15s ease;
  }

  .teacher-gate-btn:hover {
    background: #1e293b;
    color: #f8fafc;
    border-color: #64748b;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
