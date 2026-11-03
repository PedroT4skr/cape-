import { useState, type FC, type FormEvent } from 'react'
import './leaderboard.css'

interface TeacherGateProps {
  onUnlock: () => void
  onCancel: () => void
}

const DEFAULT_PIN = '1234'

export const TeacherGate: FC<TeacherGateProps> = ({ onUnlock, onCancel }) => {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault()
    if (pin.trim() === DEFAULT_PIN) {
      setError(false)
      onUnlock()
    } else {
      setError(true)
      setPin('')
    }
  }

  const handleDigit = (digit: string) => {
    if (pin.length < 4) {
      const next = pin + digit
      setPin(next)
      if (next.length === 4) {
        if (next === DEFAULT_PIN) {
          setError(false)
          onUnlock()
        } else {
          setError(true)
          setPin('')
        }
      }
    }
  }

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1))
    setError(false)
  }

  return (
    <div className="gate-backdrop" role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div className="gate-modal">
        <header className="gate-header">
          <span className="gate-icon">🔒</span>
          <h2 id="gate-title" className="gate-title">Acesso do Professor</h2>
          <p className="gate-subtitle">
            Digite a senha de 4 dígitos para visualizar o ranking pedagógico assíncrono.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="gate-form">
          <div className="pin-dots" aria-label={`Senha com ${pin.length} dígitos preenchidos`}>
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`pin-dot ${i < pin.length ? 'filled' : ''} ${error ? 'error' : ''}`}
              />
            ))}
          </div>

          {error && (
            <p className="gate-error-msg" role="alert">
              Senha incorreta. A senha padrão de demonstração é <strong>1234</strong>.
            </p>
          )}

          <div className="pin-keypad" role="group" aria-label="Teclado numérico">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                type="button"
                className="keypad-btn"
                onClick={() => handleDigit(digit)}
              >
                {digit}
              </button>
            ))}
            <button
              type="button"
              className="keypad-btn keypad-clear"
              onClick={handleDelete}
              aria-label="Apagar dígito"
            >
              ⌫
            </button>
            <button
              type="button"
              className="keypad-btn"
              onClick={() => handleDigit('0')}
            >
              0
            </button>
            <button
              type="button"
              className="keypad-btn keypad-confirm"
              onClick={() => handleSubmit()}
              aria-label="Confirmar"
            >
              ✓
            </button>
          </div>

          <div className="gate-actions">
            <button type="button" className="gate-cancel-btn" onClick={onCancel}>
              ← Voltar ao Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
