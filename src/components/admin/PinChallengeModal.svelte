<script lang="ts">
  import Modal from '../common/Modal.svelte'
  import {
    isPinModalOpen,
    closeAdminLock,
    authError,
    verifyPin
  } from '../../stores/admin.store'
  import { soundEffects } from '../../services/sound-effects.service'
  import { Delete, Lock } from '@lucide/svelte'

  let enteredPin = $state('')
  let isShaking = $state(false)

  // Garante que o input zere sempre que o modal for aberto
  $effect(() => {
    if ($isPinModalOpen) {
      enteredPin = ''
      isShaking = false
    }
  })

  function handleKeypadPress(digit: string) {
    if (enteredPin.length < 8) {
      enteredPin += digit
      soundEffects.playTapSound()
    }
  }

  function handleKeypadBackspace() {
    enteredPin = enteredPin.slice(0, -1)
    soundEffects.playTapSound()
  }

  function handlePinSubmit() {
    const success = verifyPin(enteredPin)
    if (success) {
      enteredPin = ''
      isShaking = false
      soundEffects.playSuccessChime()
    } else {
      // Zera o input imediatamente em caso de erro sem necessidade de apagar manualmente
      enteredPin = ''
      isShaking = true
      soundEffects.playGentleRetry()
      setTimeout(() => {
        isShaking = false
      }, 450)
    }
  }

  function handleWindowKeydown(e: KeyboardEvent) {
    if (!$isPinModalOpen) return
    if (e.key >= '0' && e.key <= '9') {
      handleKeypadPress(e.key)
    } else if (e.key === 'Backspace') {
      handleKeypadBackspace()
    } else if (e.key === 'Enter') {
      handlePinSubmit()
    }
  }
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<Modal
  isOpen={$isPinModalOpen}
  title="Acesso do Terapeuta / Educador"
  onClose={closeAdminLock}
>
  <div class="pin-modal-content">
    <div class="pin-header">
      <div class="lock-icon-wrap">
        <Lock size={24} color="#2563EB" />
      </div>
      <p class="section-hint">Digite o PIN de segurança (Padrão: 1234):</p>
    </div>

    {#if $authError}
      <div class="auth-error-banner" role="alert">
        {$authError}
      </div>
    {/if}

    <div class="pin-display {isShaking ? 'is-invalid shake-anim' : ''}">
      {'•'.repeat(enteredPin.length) || '----'}
    </div>

    <div class="keypad-grid">
      {#each ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as digit}
        <button class="keypad-btn" onclick={() => handleKeypadPress(digit)}>
          {digit}
        </button>
      {/each}
      <button class="keypad-btn action-key" onclick={handleKeypadBackspace} aria-label="Apagar dígito">
        <Delete size={22} />
      </button>
      <button class="keypad-btn" onclick={() => handleKeypadPress('0')}>
        0
      </button>
      <button class="keypad-btn submit-key" onclick={handlePinSubmit}>
        ENTRAR
      </button>
    </div>
  </div>
</Modal>

<style>
  .pin-modal-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 4px;
  }

  .pin-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
  }

  .lock-icon-wrap {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #EFF6FF;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .section-hint {
    font-size: 0.95rem;
    font-weight: 600;
    color: #475569;
    margin: 0;
  }

  .auth-error-banner {
    background: #FEE2E2;
    color: #B91C1C;
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 700;
    text-align: center;
    animation: fadeIn 0.2s ease-in-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .pin-display {
    height: 52px;
    background: #F8FAFC;
    border: 2px solid #CBD5E1;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    letter-spacing: 10px;
    color: #0F172A;
    font-weight: 800;
    transition: border-color 0.15s ease, background-color 0.15s ease;
  }

  .pin-display.is-invalid {
    border-color: #EF4444;
    background: #FEF2F2;
    color: #DC2626;
  }

  @keyframes pinShake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-8px); }
    40%, 80% { transform: translateX(8px); }
  }

  .shake-anim {
    animation: pinShake 0.4s ease-in-out;
  }

  .keypad-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .keypad-btn {
    height: 56px;
    font-size: 1.4rem;
    font-weight: 800;
    background: #FFFFFF;
    border: 2px solid #E2E8F0;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1E293B;
    transition: all 0.1s ease;
  }

  .keypad-btn:active {
    background: #F1F5F9;
    transform: scale(0.96);
  }

  .action-key {
    background: #F8FAFC;
    color: #64748B;
  }

  .submit-key {
    background: #2563EB;
    color: #FFFFFF;
    border-color: #1D4ED8;
    font-size: 1rem;
    font-weight: 900;
    box-shadow: 0 2px 6px rgba(37, 99, 235, 0.3);
  }

  .submit-key:active {
    background: #1D4ED8;
    transform: scale(0.96);
  }

  @media (max-width: 640px) {
    .pin-modal-content {
      gap: 10px;
    }

    .pin-display {
      height: 44px;
      font-size: 1.5rem;
      letter-spacing: 6px;
    }

    .keypad-grid {
      gap: 8px;
    }

    .keypad-btn {
      height: 46px;
      font-size: 1.2rem;
      border-radius: 10px;
    }

    .submit-key {
      font-size: 0.85rem;
    }
  }
</style>
