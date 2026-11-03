<script lang="ts">
  import { onMount } from 'svelte'
  import { Shield, KeyRound, Check, AlertCircle, RotateCcw } from '@lucide/svelte'
  import { getCurrentPin, setCustomPin, resetPinToDefault, validatePin } from '../../utils/pin.utils'
  import { APP_CONFIG } from '../../constants/config.constants'

  let currentInput = $state('')
  let newPin = $state('')
  let confirmPin = $state('')

  let statusMessage = $state<{ type: 'success' | 'error'; text: string } | null>(null)
  let isCustom = $state(false)

  function checkCustomStatus() {
    isCustom = getCurrentPin() !== APP_CONFIG.DEFAULT_PIN
  }

  onMount(() => {
    checkCustomStatus()
  })

  function handleSavePin(e?: Event) {
    if (e) e.preventDefault()
    statusMessage = null

    // 1. Validar PIN atual
    if (!validatePin(currentInput)) {
      statusMessage = { type: 'error', text: 'O PIN atual informado está incorreto.' }
      return
    }

    // 2. Validar formato do novo PIN
    const trimmedNew = newPin.trim()
    if (!/^\d{4,8}$/.test(trimmedNew)) {
      statusMessage = {
        type: 'error',
        text: 'O novo PIN deve conter entre 4 e 8 dígitos numéricos (apenas números).'
      }
      return
    }

    // 3. Validar confirmação
    if (trimmedNew !== confirmPin.trim()) {
      statusMessage = { type: 'error', text: 'A confirmação do novo PIN não coincide.' }
      return
    }

    // 4. Salvar
    const success = setCustomPin(trimmedNew)
    if (success) {
      statusMessage = { type: 'success', text: 'PIN do Painel atualizado com sucesso!' }
      currentInput = ''
      newPin = ''
      confirmPin = ''
      checkCustomStatus()
    } else {
      statusMessage = { type: 'error', text: 'Não foi possível salvar o PIN no dispositivo.' }
    }
  }

  function handleResetDefault() {
    const confirmReset = window.confirm(
      'Deseja restaurar a senha do painel para o padrão original de fábrica (1234)?'
    )
    if (confirmReset) {
      resetPinToDefault()
      currentInput = ''
      newPin = ''
      confirmPin = ''
      statusMessage = { type: 'success', text: 'PIN restaurado para o padrão original: 1234' }
      checkCustomStatus()
    }
  }
</script>

<div class="pin-settings-card">
  <header class="card-header">
    <div class="icon-wrap">
      <Shield size={22} color="#2563EB" />
    </div>
    <div class="header-text">
      <h3 class="card-title">SEGURANÇA & PIN DO PAINEL</h3>
      <p class="card-desc">
        Altere o código de 4 dígitos exigido para acessar as configurações e ajustes do sistema.
      </p>
    </div>
  </header>

  <div class="status-badge-row">
    <span class="status-indicator {isCustom ? 'is-custom' : 'is-default'}">
      <KeyRound size={14} />
      {isCustom ? 'PIN Personalizado Ativo' : 'PIN Padrão de Fábrica (1234)'}
    </span>
  </div>

  {#if statusMessage}
    <div class="message-banner {statusMessage.type}">
      {#if statusMessage.type === 'success'}
        <Check size={18} />
      {:else}
        <AlertCircle size={18} />
      {/if}
      <span>{statusMessage.text}</span>
    </div>
  {/if}

  <form class="pin-form" onsubmit={handleSavePin}>
    <div class="form-grid">
      <div class="form-field">
        <label for="current-pin-input" class="field-label">PIN ATUAL</label>
        <input
          id="current-pin-input"
          type="password"
          inputmode="numeric"
          pattern="[0-9]*"
          maxlength="8"
          class="pin-input"
          placeholder="Digite o PIN atual"
          bind:value={currentInput}
          required
        />
      </div>

      <div class="form-field">
        <label for="new-pin-input" class="field-label">NOVO PIN (4 a 8 DÍGITOS)</label>
        <input
          id="new-pin-input"
          type="password"
          inputmode="numeric"
          pattern="[0-9]*"
          maxlength="8"
          class="pin-input"
          placeholder="Ex: 5678"
          bind:value={newPin}
          required
        />
      </div>

      <div class="form-field">
        <label for="confirm-pin-input" class="field-label">CONFIRMAR NOVO PIN</label>
        <input
          id="confirm-pin-input"
          type="password"
          inputmode="numeric"
          pattern="[0-9]*"
          maxlength="8"
          class="pin-input"
          placeholder="Repita o novo PIN"
          bind:value={confirmPin}
          required
        />
      </div>
    </div>

    <div class="action-buttons">
      <button type="submit" class="save-pin-btn">
        <KeyRound size={16} />
        SALVAR NOVO PIN
      </button>

      {#if isCustom}
        <button type="button" class="reset-pin-btn" onclick={handleResetDefault}>
          <RotateCcw size={16} />
          RESTAURAR PIN PADRÃO (1234)
        </button>
      {/if}
    </div>
  </form>
</div>

<style>
  .pin-settings-card {
    background: #FFFFFF;
    border: 2px solid #E2E8F0;
    border-radius: 14px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-sizing: border-box;
    width: 100%;
  }

  .card-header {
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }

  .icon-wrap {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: #EFF6FF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .card-title {
    font-size: 1.05rem;
    font-weight: 900;
    color: #1E293B;
    margin: 0 0 4px 0;
    letter-spacing: 0.5px;
  }

  .card-desc {
    font-size: 0.85rem;
    color: #64748B;
    margin: 0;
    line-height: 1.4;
    font-weight: 500;
  }

  .status-badge-row {
    display: flex;
    align-items: center;
  }

  .status-indicator {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 9999px;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.03em;
  }

  .status-indicator.is-default {
    background: #F1F5F9;
    color: #475569;
    border: 1px solid #CBD5E1;
  }

  .status-indicator.is-custom {
    background: #EFF6FF;
    color: #1D4ED8;
    border: 1px solid #93C5FD;
  }

  .message-banner {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 700;
  }

  .message-banner.success {
    background: #ECFDF5;
    color: #065F46;
    border: 1px solid #A7F3D0;
  }

  .message-banner.error {
    background: #FFF1F2;
    color: #9F1239;
    border: 1px solid #FECDD3;
  }

  .pin-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .field-label {
    font-size: 0.75rem;
    font-weight: 800;
    color: #64748B;
    letter-spacing: 0.05em;
  }

  .pin-input {
    background: #F8FAFC;
    border: 2px solid #CBD5E1;
    border-radius: 10px;
    padding: 10px 12px;
    font-size: 1rem;
    font-weight: 700;
    color: #0F172A;
    outline: none;
    letter-spacing: 0.2em;
    transition: border-color 0.15s ease;
  }

  .pin-input:focus {
    border-color: #2563EB;
    background: #FFFFFF;
  }

  .action-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
  }

  .save-pin-btn {
    background: #2563EB;
    color: #FFFFFF;
    border: none;
    padding: 11px 18px;
    border-radius: 10px;
    font-size: 0.88rem;
    font-weight: 900;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .save-pin-btn:hover {
    background: #1D4ED8;
  }

  .reset-pin-btn {
    background: transparent;
    color: #64748B;
    border: 1px solid #CBD5E1;
    padding: 10px 16px;
    border-radius: 10px;
    font-size: 0.82rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .reset-pin-btn:hover {
    background: #F1F5F9;
    color: #0F172A;
    border-color: #94A3B8;
  }

  @media (max-width: 640px) {
    .pin-settings-card {
      padding: 14px;
      gap: 12px;
    }

    .form-grid {
      grid-template-columns: 1fr;
    }

    .action-buttons {
      flex-direction: column;
      width: 100%;
    }

    .save-pin-btn, .reset-pin-btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>
