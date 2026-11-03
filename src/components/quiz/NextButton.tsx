interface Props {
  enabled: boolean
  isLast: boolean
  onClick: () => void
}

/**
 * Direcionamento de ação: cinza e inativo sem seleção;
 * verde e pulsando após a seleção para induzir o clique.
 */
export function NextButton({ enabled, isLast, onClick }: Props) {
  return (
    <button
      type="button"
      className={`next-btn ${enabled ? 'is-ready' : ''}`}
      disabled={!enabled}
      aria-disabled={!enabled}
      onClick={onClick}
    >
      {isLast ? 'FINALIZAR ✔' : 'PRÓXIMA ▶'}
      {!enabled && <span className="sr-only"> — escolha uma alternativa primeiro</span>}
    </button>
  )
}
