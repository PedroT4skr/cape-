<script lang="ts">
  import { Lock, Sparkles, Brain, LayoutGrid } from '@lucide/svelte'
  import { currentBoard } from '../../stores/board.store'
  import { openAdminLock } from '../../stores/admin.store'
  import { openActivitiesPage } from '../../stores/activity.store'
  import { openMathQuiz } from '../../stores/quiz.store'
  import { navigateTo } from '../../stores/navigation.store'

  let boardTitle = $derived($currentBoard?.name || 'Comunicação Essencial')
</script>

<header class="app-header">
  <div class="left-section">
    <button class="brand-badge-btn" onclick={() => navigateTo('hub')} aria-label="Abrir Portal Central da Suíte CAPE">
      <LayoutGrid size={15} />
      <span class="brand-name">SUÍTE CAPE</span>
    </button>
    <h1 class="board-title">{boardTitle}</h1>
  </div>

  <div class="right-section">
    <button class="quiz-trigger-btn" onclick={openMathQuiz} aria-label="Abrir Quiz Matemático Gamificado para TDAH">
      <Brain size={18} strokeWidth={2.5} />
      <span class="btn-label">QUIZ TDAH</span>
    </button>

    <button class="activities-trigger-btn" onclick={openActivitiesPage} aria-label="Abrir Atividades Didáticas">
      <Sparkles size={18} strokeWidth={2.5} />
      <span class="btn-label">ATIVIDADES</span>
    </button>

    <button class="panel-trigger-btn" onclick={() => openAdminLock('boards', 'board')} aria-label="Abrir Painel de Ajustes e Configurações">
      <Lock size={18} strokeWidth={2.5} />
      <span class="btn-label">PAINEL</span>
    </button>
  </div>
</header>

<style>
  .app-header {
    height: 54px;
    background: #0F172A;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px;
    flex-shrink: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    width: 100%;
    z-index: 50;
  }

  .left-section {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    flex: 1;
  }

  .brand-badge-btn {
    background: #2563EB;
    color: #FFFFFF;
    border: none;
    font-weight: 800;
    font-size: 0.8rem;
    padding: 5px 9px;
    border-radius: 8px;
    letter-spacing: 0.5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
    flex-shrink: 0;
    transition: background 0.15s ease, transform 0.1s ease;
  }

  .brand-badge-btn:hover {
    background: #1d4ed8;
  }

  .brand-badge-btn:active {
    transform: scale(0.96);
  }

  .board-title {
    font-size: 1.05rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #F8FAFC;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .right-section {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .quiz-trigger-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #7c3aed;
    color: #FFFFFF;
    border: 2px solid #a78bfa;
    padding: 6px 13px;
    border-radius: 10px;
    font-size: 0.88rem;
    font-weight: 950;
    letter-spacing: 0.5px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(124, 58, 237, 0.4);
    transition: transform 0.1s ease, background 0.15s ease;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .quiz-trigger-btn:hover {
    background: #6d28d9;
    border-color: #c4b5fd;
  }

  .quiz-trigger-btn:active {
    transform: scale(0.96);
  }

  .activities-trigger-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #059669;
    color: #FFFFFF;
    border: 2px solid #34D399;
    padding: 6px 13px;
    border-radius: 10px;
    font-size: 0.88rem;
    font-weight: 950;
    letter-spacing: 0.5px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(5, 150, 105, 0.4);
    transition: transform 0.1s ease, background 0.15s ease;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .activities-trigger-btn:hover {
    background: #047857;
    border-color: #6EE7B7;
  }

  .activities-trigger-btn:active {
    transform: scale(0.96);
  }

  .panel-trigger-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #1e293b;
    color: #cbd5e1;
    border: 2px solid #475569;
    padding: 6px 13px;
    border-radius: 10px;
    font-size: 0.88rem;
    font-weight: 950;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: transform 0.1s ease, background 0.15s ease;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .panel-trigger-btn:hover {
    background: #334155;
    color: #ffffff;
    border-color: #64748b;
  }

  .panel-trigger-btn:active {
    transform: scale(0.96);
  }

  @media (max-width: 720px) {
    .board-title {
      display: none;
    }
  }

  @media (max-width: 520px) {
    .app-header {
      padding: 0 8px;
      gap: 6px;
    }
    .btn-label {
      display: none;
    }
    .quiz-trigger-btn,
    .activities-trigger-btn,
    .panel-trigger-btn {
      padding: 7px 10px;
    }
    .brand-name {
      display: none;
    }
  }
</style>
