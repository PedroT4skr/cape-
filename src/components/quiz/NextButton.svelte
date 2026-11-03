<script lang="ts">
  interface Props {
    enabled: boolean
    isLast: boolean
    onclick: () => void
  }

  let { enabled, isLast, onclick }: Props = $props()
</script>

<button
  type="button"
  class="next-btn {enabled ? 'is-ready' : ''}"
  disabled={!enabled}
  aria-disabled={!enabled}
  {onclick}
>
  {isLast ? 'FINALIZAR RESPOSTAS ✔' : 'PRÓXIMA QUESTÃO ▶'}
</button>

<style>
  .next-btn {
    width: 100%;
    max-width: 420px;
    padding: 1.15rem 2rem;
    border-radius: 16px;
    font-size: 1.25rem;
    font-weight: 900;
    letter-spacing: 0.05em;
    border: none;
    background: #334155;
    color: #94a3b8;
    cursor: not-allowed;
    transition: all 0.2s ease;
    box-shadow: none;
  }

  .next-btn.is-ready {
    background: #10b981;
    color: #022c22;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
    animation: pulse-cta 1.2s ease-in-out infinite;
  }

  @keyframes pulse-cta {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
    }
    50% {
      transform: scale(1.03);
      box-shadow: 0 0 0 14px rgba(16, 185, 129, 0);
    }
  }
</style>
