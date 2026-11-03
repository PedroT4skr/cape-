<script lang="ts">
  import { isTeacherGateOpen, isLeaderboardOpen } from '../../stores/quiz.store'

  const DEFAULT_PIN = '1234'
  let pin = $state('')
  let error = $state(false)

  function handleDigit(digit: string) {
    if (pin.length < 4) {
      pin += digit
      if (pin.length === 4) {
        if (pin === DEFAULT_PIN) {
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
      <p class="gate-subtitle">
        Digite a senha de 4 dígitos para visualizar o ranking pedagógico assíncrono.
      </p>
    </header>

    <div class="pin-dots">
      {#each [0, 1, 2, 3] as i}
        <span class="pin-dot {i < pin.length ? 'filled' : ''} {error ? 'error' : ''}"></span>
      {/each}
    </div>

    {#if error}
      <p class="gate-error-msg" role="alert">
        Senha incorreta. A senha padrão de demonstração é <strong>1234</strong>.
      </p>
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
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    z-index: 1000;
    animation: fadeIn 0.2s ease-out;
  }

  .gate-modal {
    background: #1e293b;
    border: 2px solid #334155;
    border-radius: 20px;
    max-width: 400px;
    width: 100%;
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    text-align: center;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  }

  .gate-icon { font-size: 2.2rem; }

  .gate-title {
    font-size: 1.4rem;
    font-weight: 800;
    color: #f8fafc;
    margin: 0;
  }

  .gate-subtitle {
    font-size: 0.85rem;
    color: #94a3b8;
    margin: 0.25rem 0 0;
  }

  .pin-dots {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .pin-dot {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #475569;
    background: transparent;
    transition: all 0.2s ease;
  }

  .pin-dot.filled {
    background: #10b981;
    border-color: #10b981;
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  }

  .pin-dot.error {
    border-color: #ef4444;
    background: rgba(239, 68, 68, 0.4);
  }

  .gate-error-msg {
    font-size: 0.85rem;
    color: #fca5a5;
    background: rgba(239, 68, 68, 0.15);
    border: 1px solid #ef4444;
    padding: 0.4rem 0.75rem;
    border-radius: 8px;
    margin: 0;
  }

  .pin-keypad {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.65rem;
    width: 100%;
    max-width: 270px;
  }

  .keypad-btn {
    height: 56px;
    font-size: 1.35rem;
    font-weight: 700;
    background: #0f172a;
    color: #f8fafc;
    border: 1px solid #334155;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .keypad-btn:active {
    background: #334155;
    transform: scale(0.96);
  }

  .keypad-clear { color: #f87171; }
  .keypad-cancel { color: #94a3b8; }

  .gate-close-link {
    background: transparent;
    border: none;
    color: #94a3b8;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
  }

  .gate-close-link:hover { color: #f8fafc; }
</style>
