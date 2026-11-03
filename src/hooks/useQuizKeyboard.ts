import { useEffect, useRef } from 'react'

interface Options {
  optionCount: number
  onSelect: (index: number) => void
  onNext: () => void
  onPrevious: () => void
}

/** Atalhos: 1–4 ou A–D seleciona, Enter avança, ← volta. */
export function useQuizKeyboard(opts: Options) {
  const ref = useRef(opts)
  ref.current = opts

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return
      const { optionCount, onSelect, onNext, onPrevious } = ref.current
      const key = e.key.toLowerCase()
      const num = Number(key)
      if (num >= 1 && num <= optionCount) return onSelect(num - 1)
      const letter = 'abcd'.indexOf(key)
      if (letter >= 0 && letter < optionCount) return onSelect(letter)
      if (key === 'enter') {
        e.preventDefault()
        onNext()
      }
      if (key === 'arrowleft') onPrevious()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}
