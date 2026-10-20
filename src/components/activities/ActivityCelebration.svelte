<script lang="ts">
  import {
    activitySession,
    restartCurrentLevel,
    exitActivity
  } from '../../stores/activity.store'
  import { RotateCcw, ArrowLeft, Trophy, Star } from '@lucide/svelte'

  interface Props {
    score: number
    total: number
  }

  const { score, total }: Props = $props()
</script>

<div class="celebration-container">
  <div class="celebration-card">
    <div class="trophy-badge">
      <Trophy size={64} color="#EAB308" />
    </div>

    <div class="stars-row">
      <Star size={32} fill="#EAB308" color="#CA8A04" />
      <Star size={44} fill="#EAB308" color="#CA8A04" />
      <Star size={32} fill="#EAB308" color="#CA8A04" />
    </div>

    <h2 class="celebration-title">PARABÉNS! VOCÊ CONSEGUIU!</h2>
    <p class="celebration-subtitle">Você completou todos os desafios com sucesso!</p>

    <div class="score-pill">
      <span>ACERTOS: {score} DE {total}</span>
    </div>

    <div class="actions-row">
      <button class="action-btn replay-btn" onclick={restartCurrentLevel}>
        <RotateCcw size={22} />
        <span>JOGAR NOVAMENTE</span>
      </button>

      <button class="action-btn exit-btn" onclick={exitActivity}>
        <ArrowLeft size={22} />
        <span>VOLTAR AO PAINEL DO TERAPEUTA</span>
      </button>
    </div>
  </div>
</div>

<style>
  .celebration-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: #F8FAFC;
  }

  .celebration-card {
    background: #FFFFFF;
    border: 3px solid #E2E8F0;
    border-radius: 24px;
    padding: 32px 24px;
    max-width: 520px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  }

  .trophy-badge {
    width: 96px;
    height: 96px;
    background: #FEF9C3;
    border: 3px solid #FDE047;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: bounce 1s infinite alternate ease-in-out;
  }

  @keyframes bounce {
    from { transform: translateY(0); }
    to { transform: translateY(-8px); }
  }

  .stars-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .celebration-title {
    font-size: 1.6rem;
    font-weight: 900;
    color: #15803D;
    margin: 0;
  }

  .celebration-subtitle {
    font-size: 1rem;
    font-weight: 600;
    color: #64748B;
    margin: 0;
  }

  .score-pill {
    background: #EFF6FF;
    border: 2px solid #BFDBFE;
    color: #1D4ED8;
    padding: 8px 18px;
    border-radius: 20px;
    font-size: 1.1rem;
    font-weight: 900;
  }

  .actions-row {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    margin-top: 8px;
  }

  .action-btn {
    width: 100%;
    height: 56px;
    border-radius: 14px;
    border: none;
    font-size: 1.1rem;
    font-weight: 900;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    transition: transform 0.1s ease;
  }

  .action-btn:active {
    transform: scale(0.97);
  }

  .replay-btn {
    background: #2563EB;
    color: #FFFFFF;
  }

  .exit-btn {
    background: #0F172A;
    color: #FFFFFF;
  }
</style>
