import { useState, type FormEvent } from 'react'
import { DIFFICULTIES } from '../../config/quiz.config'
import type { Difficulty } from '../../types/quiz.types'
import { DifficultyCard } from './DifficultyCard'
import './setup.css'

interface Props {
  defaultName: string
  defaultDifficulty: Difficulty
  onStart: (name: string, difficulty: Difficulty) => void
  onOpenLeaderboard: () => void
}

export function StartScreen({ defaultName, defaultDifficulty, onStart, onOpenLeaderboard }: Props) {
  const [name, setName] = useState(defaultName)
  const [difficulty, setDifficulty] = useState<Difficulty>(defaultDifficulty)
  const canStart = name.trim().length >= 2

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (canStart) onStart(name, difficulty)
  }

  return (
    <main className="screen setup">
      <header className="setup-header">
        <h1>🧮 Desafio Matemático</h1>
        <p>Responda com calma. Cada questão tem um tempo — mas você sempre pode responder!</p>
      </header>

      <form onSubmit={handleSubmit} className="setup-form">
        <label className="field">
          <span>Seu nome</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            placeholder="Digite seu nome"
            autoComplete="off"
            autoFocus
          />
        </label>

        <fieldset className="difficulty-grid">
          <legend>Escolha o nível</legend>
          {(Object.keys(DIFFICULTIES) as Difficulty[]).map((id) => (
            <DifficultyCard key={id} id={id} selected={difficulty === id} onSelect={setDifficulty} />
          ))}
        </fieldset>

        <button type="submit" className={`btn start-btn ${canStart ? 'is-ready' : ''}`} disabled={!canStart}>
          COMEÇAR ▶
        </button>
      </form>

      <button type="button" className="btn btn-ghost teacher-link" onClick={onOpenLeaderboard}>
        🏆 Ranking do professor
      </button>
    </main>
  )
}
