<script lang="ts">
  import type { ActivityLevelConfig } from '../../types/activity.types'
  import { startActivity } from '../../stores/activity.store'
  import { closeAdminDashboard } from '../../stores/admin.store'
  import { Play } from '@lucide/svelte'

  interface Props {
    level: ActivityLevelConfig
  }

  const { level }: Props = $props()

  function handleStart() {
    closeAdminDashboard()
    startActivity(level.id)
  }
</script>

<div class="activity-card" style="border-top: 6px solid {level.badgeColor};">
  <div class="card-body">
    <div class="card-icon-area">
      <span class="level-emoji">{level.emoji}</span>
    </div>

    <div class="card-info">
      <h3 class="level-title">{level.title}</h3>
      <p class="level-subtitle">{level.subtitle}</p>
    </div>
  </div>

  <button class="start-btn" style="background: {level.badgeColor};" onclick={handleStart}>
    <Play size={20} fill="#FFFFFF" />
    <span>INICIAR ATIVIDADE</span>
  </button>
</div>

<style>
  .activity-card {
    background: #FFFFFF;
    border: 2px solid #E2E8F0;
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    gap: 20px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    height: 100%;
    box-sizing: border-box;
  }

  .activity-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }

  .card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    flex: 1;
    justify-content: center;
  }

  .card-icon-area {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: #F8FAFC;
    border: 3px solid #E2E8F0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .level-emoji {
    font-size: 3.2rem;
    line-height: 1;
  }

  .card-info {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .level-title {
    font-size: 1.25rem;
    font-weight: 900;
    text-transform: uppercase;
    color: #0F172A;
    margin: 0;
    letter-spacing: 0.5px;
  }

  .level-subtitle {
    font-size: 0.95rem;
    font-weight: 600;
    color: #64748B;
    margin: 0;
  }

  .start-btn {
    width: 100%;
    min-height: 52px;
    color: #FFFFFF;
    border: none;
    border-radius: 12px;
    padding: 12px 20px;
    font-size: 1.05rem;
    font-weight: 900;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.1s ease;
  }

  .start-btn:active {
    transform: scale(0.97);
  }

  @media (max-width: 640px) {
    .activity-card {
      padding: 14px 14px;
      gap: 12px;
      border-radius: 14px;
    }

    .card-icon-area {
      width: 58px;
      height: 58px;
    }

    .level-emoji {
      font-size: 2.2rem;
    }

    .level-title {
      font-size: 1.05rem;
    }

    .level-subtitle {
      font-size: 0.82rem;
    }

    .start-btn {
      min-height: 42px;
      font-size: 0.88rem;
      padding: 8px 14px;
      border-radius: 10px;
      gap: 6px;
    }
  }
</style>
