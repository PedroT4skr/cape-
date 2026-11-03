<script lang="ts">
  import { isTeacherGateOpen, isLeaderboardOpen } from '../../stores/quiz.store'
  import { getCurrentPin } from '../../utils/pin.utils'

  let pin = $state('')
  let error = $state(false)

  function handleDigit(digit: string) {
    if (pin.length < 8) {
      pin += digit
      const targetPin = getCurrentPin()
      if (pin.length === targetPin.length) {
        if (pin === targetPin) {
          error = false
          isTeacherGateOpen.set(false)
          isLeaderboardOpen.set(true)
        } else {
          error = true
          pin = ''
        }
      }
    }
  }

  function handleDelete() {
    pin = pin.slice(0, -1)
    error = false
  }

  function handleCancel() {
    isTeacherGateOpen.set(false)
  }
</script>

<div class="gate-backdrop" role="dialog" aria-modal="true" aria-labelledby="gate-title">
  <div class="gate-modal">
    <header class="gate-header">
      <span class="gate-icon">🔒</span>
      <h2 id="gate-title" class="gate-title">Acesso do Professor</h2>
      <p class="gate-subtitle">Digite o PIN para ver o ranking</p>
    </header>

    <div class="pin-dots">
      {#each [0, 1, 2, 3] as i}
        <span class="pin-dot {i < pin.length ? 'filled' : ''} {error ? 'error' : ''}"></span>
      {/each}
    </div>

    {#if error}
      <p class="gate-error-msg" role="alert">Senha incorreta. Tente novamente.</p>
    {/if}

    <div class="pin-keypad" role="group" aria-label="Teclado numérico">
      {#each ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as digit}
        <button type="button" class="keypad-btn" onclick={() => handleDigit(digit)}>
          {digit}
        </button>
      {/each}
      <button type="button" class="keypad-btn keypad-clear" onclick={handleDelete} aria-label="Apagar">
        ⌫
      </button>
      <button type="button" class="keypad-btn" onclick={() => handleDigit('0')}>
        0
      </button>
      <button type="button" class="keypad-btn keypad-cancel" onclick={handleCancel} aria-label="Cancelar">
        ✕
      </button>
    </div>

    <button type="button" class="gate-close-link" onclick={handleCancel}>
      ← Voltar
    </button>
  </div>
</div>

<style>
  .gate-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.65);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    z-index: 1000;
    animation: fadeIn 0.15s ease-out;
  }

  .gate-modal {
    background: #FFFFFF;
    border: 2px solid #E2E8F0;
    border-radius: 20px;
    max-width: 360px;
    width: 100%;
    max-height: 94dvh;
    overflow-y: auto;
    padding: 1.5rem 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
  }

  .gate-icon { font-size: 1.8rem; line-height: 1; }

  .gate-title {
    font-size: 1.15rem;
    font-weight: 850;
    color: #0F172A;
    margin: 0;
  }

  .gate-subtitle {
    font-size: 0.82rem;
    color: #64748B;
    margin: 0.15rem 0 0;
  }

  .pin-dots {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
  }

  .pin-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid #CBD5E1;
    background: transparent;
    transition: all 0.15s ease;
  }

  .pin-dot.filled {
    background: #059669;
    border-color: #059669;
    box-shadow: 0 0 8px rgba(5, 150, 105, 0.4);
  }

  .pin-dot.error {
    border-color: #E11D48;
    background: rgba(225, 29, 72, 0.3);
  }

  .gate-error-msg {
    font-size: 0.8rem;
    color: #BE123C;
    background: #FFF1F2;
    border: 1px solid #FECDD3;
    padding: 0.35rem 0.65rem;
    border-radius: 8px;
    margin: 0;
    font-weight: 700;
  }

  .pin-keypad {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    width: 100%;
    max-width: 250px;
  }

  .keypad-btn {
    height: 48px;
    font-size: 1.25rem;
    font-weight: 750;
    background: #F8FAFC;
    color: #0F172A;
    border: 1px solid #CBD5E1;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.12s ease;
  }

  .keypad-btn:active {
    background: #E2E8F0;
    transform: scale(0.96);
  }

  .keypad-clear { color: #E11D48; }
  .keypad-cancel { color: #64748B; }

  .gate-close-link {
    background: transparent;
    border: none;
    color: #64748B;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
    padding: 0.2rem 0.5rem;
  }

  .gate-close-link:hover { color: #0F172A; }

  /* Ajuste para celulares com tela pequena ou baixa */
  @media (max-height: 680px), (max-width: 420px) {
    .gate-modal {
      padding: 1rem 0.9rem;
      gap: 0.65rem;
      max-width: 320px;
    }

    .gate-icon {
      font-size: 1.5rem;
    }

    .gate-title {
      font-size: 1rem;
    }

    .gate-subtitle {
      font-size: 0.75rem;
    }

    .pin-dots {
      gap: 0.5rem;
    }

    .pin-dot {
      width: 12px;
      height: 12px;
    }

    .pin-keypad {
      max-width: 220px;
      gap: 0.4rem;
    }

    .keypad-btn {
      height: 40px;
      font-size: 1.15rem;
      border-radius: 10px;
    }
  }
</style>
