<script lang="ts">
  import { Lock, Sparkles, Brain, LayoutGrid, ArrowLeft } from '@lucide/svelte'
  import { currentBoard, boardHistory, navigateBack } from '../../stores/board.store'
  import { openAdminLock } from '../../stores/admin.store'
  import { openActivitiesPage } from '../../stores/activity.store'
  import { openMathQuiz } from '../../stores/quiz.store'
  import { navigateTo } from '../../stores/navigation.store'

  let boardTitle = $derived($currentBoard?.name || 'Comunicação Essencial')
  let canGoBackBoard = $derived($boardHistory.length > 1)
</script>

<header class="app-header">
  <div class="left-section">
    {#if canGoBackBoard}
      <button
        type="button"
        class="back-subboard-btn"
        onclick={navigateBack}
        aria-label="Voltar para a prancha anterior"
      >
        <ArrowLeft size={20} strokeWidth={2.8} />
        <span>VOLTAR</span>
      </button>
    {/if}

    <button class="brand-badge-btn" onclick={() => navigateTo('hub')} aria-label="Abrir Portal Central da Suíte CAPE">
      <LayoutGrid size={18} />
      <span class="brand-name">SUÍTE CAPE</span>
    </button>
    <h1 class="board-title">{boardTitle}</h1>
  </div>

  <div class="right-section">
    <button class="quiz-trigger-btn" onclick={openMathQuiz} aria-label="Abrir Quiz Matemático Gamificado para TDAH">
      <Brain size={20} strokeWidth={2.5} />
      <span class="btn-label">QUIZ TDAH</span>
    </button>

    <button class="activities-trigger-btn" onclick={openActivitiesPage} aria-label="Abrir Atividades Didáticas">
      <Sparkles size={20} strokeWidth={2.5} />
      <span class="btn-label">ATIVIDADES</span>
    </button>

    <button class="panel-trigger-btn" onclick={() => openAdminLock('boards', 'board')} aria-label="Abrir Painel de Ajustes e Configurações">
      <Lock size={20} strokeWidth={2.5} />
      <span class="btn-label">PAINEL</span>
    </button>
  </div>
</header>

<style>
  .app-header {
    height: 62px;
    background: #0F172A;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    flex-shrink: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    width: 100%;
    z-index: 50;
  }

  .left-section {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
    flex: 1;
  }

  .back-subboard-btn {
    background: #F59E0B;
    color: #0F172A;
    border: 2px solid #FDE68A;
    font-weight: 950;
    font-size: 0.98rem;
    padding: 7px 14px;
    border-radius: 10px;
    letter-spacing: 0.5px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(245, 158, 11, 0.35);
    transition: background 0.15s ease, transform 0.1s ease;
  }

  .back-subboard-btn:hover {
    background: #D97706;
    color: #FFFFFF;
  }

  .back-subboard-btn:active {
    transform: scale(0.96);
  }

  .brand-badge-btn {
    background: #2563EB;
    color: #FFFFFF;
    border: 2px solid #60A5FA;
    font-weight: 900;
    font-size: 0.95rem;
    padding: 7px 12px;
    border-radius: 10px;
    letter-spacing: 0.5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 7px;
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
    font-size: 1.22rem;
    font-weight: 900;
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
    gap: 10px;
    flex-shrink: 0;
  }

  .quiz-trigger-btn {
    display: flex;
    align-items: center;
    gap: 7px;
    background: #7c3aed;
    color: #FFFFFF;
    border: 2px solid #a78bfa;
    padding: 8px 15px;
    border-radius: 10px;
    font-size: 0.98rem;
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
    gap: 7px;
    background: #059669;
    color: #FFFFFF;
    border: 2px solid #34D399;
    padding: 8px 15px;
    border-radius: 10px;
    font-size: 0.98rem;
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
    gap: 7px;
    background: #1e293b;
    color: #cbd5e1;
    border: 2px solid #475569;
    padding: 8px 15px;
    border-radius: 10px;
    font-size: 0.98rem;
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

  @media (max-width: 780px) {
    .board-title {
      display: none;
    }
  }

  @media (max-width: 560px) {
    .app-header {
      height: 54px;
      padding: 0 8px;
      gap: 6px;
    }
    .btn-label {
      display: none;
    }
    .quiz-trigger-btn,
    .activities-trigger-btn,
    .panel-trigger-btn {
      padding: 8px 10px;
    }
    .back-subboard-btn {
      padding: 6px 10px;
      font-size: 0.88rem;
    }
    .brand-badge-btn {
      padding: 6px 10px;
      font-size: 0.85rem;
    }
  }
</style>
