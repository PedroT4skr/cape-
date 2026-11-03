<script lang="ts">
  import { MessageSquare, Sparkles, Brain, Settings, ArrowRight } from '@lucide/svelte'
  import { navigateTo } from '../../stores/navigation.store'
  import { openAdminLock } from '../../stores/admin.store'
</script>

<div class="hub-container">
  <header class="hub-header">
    <div class="hub-badge">SUÍTE PEDAGÓGICA INTEGRADA</div>
    <h1 class="hub-title">Centro de Apoio Pedagógico Especializado</h1>
    <p class="hub-subtitle">
      Plataforma inclusiva multifuncional: Comunicação Aumentativa, Atividades Cognitivas e Desafios Matemáticos para TDAH.
    </p>
  </header>

  <main class="hub-grid">
    <!-- Card 1: Prancha CAA -->
    <button class="hub-card card-caa" onclick={() => navigateTo('board')}>
      <div class="card-icon-wrapper icon-caa">
        <MessageSquare size={36} />
      </div>
      <div class="card-body">
        <h2 class="card-title">Prancha de Comunicação (CAA)</h2>
        <p class="card-desc">
          Prancha interativa com código de cores Fitzgerald, formação de frases e síntese vocal neural para alunos não-verbais.
        </p>
      </div>
      <div class="card-footer">
        <span>Acessar Prancha</span>
        <ArrowRight size={18} />
      </div>
    </button>

    <!-- Card 2: Atividades Didáticas -->
    <button class="hub-card card-activities" onclick={() => navigateTo('activities')}>
      <div class="card-icon-wrapper icon-activities">
        <Sparkles size={36} />
      </div>
      <div class="card-body">
        <h2 class="card-title">Atividades Cognitivas</h2>
        <p class="card-desc">
          Exercícios estruturados de alfabetização, percepção visual e apoio à discalculia com reforço positivo imediato.
        </p>
      </div>
      <div class="card-footer">
        <span>Abrir Atividades</span>
        <ArrowRight size={18} />
      </div>
    </button>

    <!-- Card 3: Quiz Matemático TDAH -->
    <button class="hub-card card-quiz" onclick={() => navigateTo('quiz')}>
      <div class="card-icon-wrapper icon-quiz">
        <Brain size={36} />
      </div>
      <div class="card-body">
        <div class="title-with-badge">
          <h2 class="card-title">Quiz Matemático TDAH</h2>
          <span class="new-pill">NOVO</span>
        </div>
        <p class="card-desc">
          Quiz em 3 níveis com cronômetro sem bloqueio, penalidade positiva de 40% a 50%, alto contraste e ranking do professor.
        </p>
      </div>
      <div class="card-footer">
        <span>Iniciar Quiz</span>
        <ArrowRight size={18} />
      </div>
    </button>

    <!-- Card 4: Painel Terapeuta -->
    <button class="hub-card card-admin" onclick={() => openAdminLock()}>
      <div class="card-icon-wrapper icon-admin">
        <Settings size={36} />
      </div>
      <div class="card-body">
        <h2 class="card-title">Painel do Terapeuta & Gestão</h2>
        <p class="card-desc">
          Área restrita por PIN para personalização de vocabulário, novas células, ajuste de voz neural e exportações.
        </p>
      </div>
      <div class="card-footer">
        <span>Configurações</span>
        <ArrowRight size={18} />
      </div>
    </button>
  </main>

  <footer class="hub-footer">
    <button class="quick-board-btn" onclick={() => navigateTo('board')}>
      Ir diretamente para a Prancha de Comunicação →
    </button>
  </footer>
</div>

<style>
  .hub-container {
    min-height: 100vh;
    min-height: 100dvh;
    background: #0f172a;
    color: #f8fafc;
    padding: 2rem 1.25rem 3rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    overflow-y: auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .hub-header {
    text-align: center;
    max-width: 680px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .hub-badge {
    background: rgba(37, 99, 235, 0.15);
    border: 1px solid #3b82f6;
    color: #60a5fa;
    font-size: 0.75rem;
    font-weight: 800;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    letter-spacing: 0.05em;
  }

  .hub-title {
    font-size: clamp(1.8rem, 4.5vw, 2.6rem);
    font-weight: 900;
    color: #f8fafc;
    margin: 0;
    line-height: 1.2;
  }

  .hub-subtitle {
    font-size: 1rem;
    color: #94a3b8;
    margin: 0;
    line-height: 1.45;
  }

  .hub-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
    max-width: 900px;
    width: 100%;
  }

  @media (max-width: 700px) {
    .hub-grid {
      grid-template-columns: 1fr;
      gap: 0.85rem;
    }

    .hub-container {
      padding: 1.25rem 0.75rem 2rem;
      gap: 1.25rem;
    }

    .hub-header {
      gap: 0.35rem;
    }

    .hub-title {
      font-size: 1.45rem;
    }

    .hub-subtitle {
      font-size: 0.85rem;
    }

    .hub-card {
      padding: 1rem;
      gap: 0.75rem;
      border-radius: 16px;
    }

    .card-icon-wrapper {
      width: 44px;
      height: 44px;
      border-radius: 10px;
    }

    .card-title {
      font-size: 1.05rem;
    }

    .card-desc {
      font-size: 0.8rem;
    }

    .quick-board-btn {
      font-size: 0.82rem;
    }
  }

  .hub-card {
    background: #1e293b;
    border: 2px solid #334155;
    border-radius: 20px;
    padding: 1.5rem;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  }

  .hub-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.45);
  }

  .card-caa:hover { border-color: #3b82f6; }
  .card-activities:hover { border-color: #10b981; }
  .card-quiz:hover { border-color: #8b5cf6; }
  .card-admin:hover { border-color: #64748b; }

  .card-icon-wrapper {
    width: 60px;
    height: 60px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-caa { background: rgba(37, 99, 235, 0.15); color: #60a5fa; }
  .icon-activities { background: rgba(16, 185, 129, 0.15); color: #34d399; }
  .icon-quiz { background: rgba(139, 92, 246, 0.15); color: #a78bfa; }
  .icon-admin { background: rgba(100, 116, 139, 0.2); color: #cbd5e1; }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    flex: 1;
  }

  .title-with-badge {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .new-pill {
    background: #8b5cf6;
    color: #fff;
    font-size: 0.65rem;
    font-weight: 900;
    padding: 0.15rem 0.45rem;
    border-radius: 4px;
    letter-spacing: 0.05em;
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: 800;
    color: #f8fafc;
    margin: 0;
  }

  .card-desc {
    font-size: 0.88rem;
    color: #94a3b8;
    margin: 0;
    line-height: 1.4;
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.9rem;
    font-weight: 800;
    color: #cbd5e1;
    padding-top: 0.75rem;
    border-top: 1px solid #334155;
  }

  .hub-footer {
    margin-top: auto;
  }

  .quick-board-btn {
    background: transparent;
    border: none;
    color: #94a3b8;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    padding: 0.5rem 1rem;
    transition: color 0.15s ease;
  }

  .quick-board-btn:hover {
    color: #f8fafc;
  }
</style>
