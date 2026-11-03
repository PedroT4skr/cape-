const LETTERS = ['A', 'B', 'C', 'D']

interface Props {
  label: string
  index: number
  selected: boolean
  onSelect: (index: number) => void
}

export function OptionButton({ label, index, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className={`option-btn ${selected ? 'is-selected' : ''}`}
      onClick={() => onSelect(index)}
    >
      <span className="option-letter" aria-hidden>{LETTERS[index]}</span>
      <span className="option-label">{label}</span>
      <kbd className="option-key" aria-hidden>{index + 1}</kbd>
    </button>
  )
}
