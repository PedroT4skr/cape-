import { useState } from 'react'
import { LeaderboardScreen } from './components/leaderboard/LeaderboardScreen'
import { TeacherGate } from './components/leaderboard/TeacherGate'
import { QuizScreen } from './components/quiz/QuizScreen'
import { ResultScreen } from './components/results/ResultScreen'
import { StartScreen } from './components/setup/StartScreen'
import { useQuiz } from './hooks/useQuiz'

type Overlay = 'none' | 'gate' | 'leaderboard'

export default function App() {
  const quiz = useQuiz()
  const [overlay, setOverlay] = useState<Overlay>('none')

  if (overlay === 'gate') return <TeacherGate onUnlock={() => setOverlay('leaderboard')} onCancel={() => setOverlay('none')} />
  if (overlay === 'leaderboard') return <LeaderboardScreen onBack={() => setOverlay('none')} />

  switch (quiz.state.phase) {
    case 'playing':
      return <QuizScreen quiz={quiz} />
    case 'finished':
      return <ResultScreen quiz={quiz} onOpenLeaderboard={() => setOverlay('gate')} />
    default:
      return (
        <StartScreen
          defaultName={quiz.state.playerName}
          defaultDifficulty={quiz.state.difficulty}
          onStart={quiz.start}
          onOpenLeaderboard={() => setOverlay('gate')}
        />
      )
  }
}
