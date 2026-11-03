<script lang="ts">
  interface Props {
    option: string
    index: number
    selected: boolean
    onselect: (index: number) => void
  }

  let { option, index, selected, onselect }: Props = $props()

  const letters = ['A', 'B', 'C', 'D']
</script>

<button
  type="button"
  class="option-btn {selected ? 'is-selected' : ''}"
  onclick={() => onselect(index)}
  aria-pressed={selected}
>
  <span class="option-badge">{letters[index]}</span>
  <span class="option-label">{option}</span>
  <span class="option-shortcut">{index + 1}</span>
</button>

<style>
  .option-btn {
    background: #1e293b;
    border: 3px solid #334155;
    border-radius: 16px;
    padding: 1.1rem 1.25rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #f8fafc;
    cursor: pointer;
    transition: all 0.15s ease;
    min-height: 72px;
    box-sizing: border-box;
    width: 100%;
  }

  .option-btn:hover {
    border-color: #64748b;
    background: #242f44;
  }

  .option-btn.is-selected {
    border-color: #10b981;
    background: rgba(16, 185, 129, 0.15);
    box-shadow: 0 0 16px rgba(16, 185, 129, 0.3);
  }

  .option-badge {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: #0f172a;
    color: #94a3b8;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    font-weight: 800;
    flex-shrink: 0;
  }

  .option-btn.is-selected .option-badge {
    background: #10b981;
    color: #022c22;
  }

  .option-label {
    flex: 1;
    text-align: left;
    font-size: clamp(1.2rem, 3.5vw, 1.6rem);
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }

  .option-shortcut {
    font-size: 0.75rem;
    font-weight: 700;
    color: #64748b;
    border: 1px solid #334155;
    border-radius: 6px;
    padding: 0.15rem 0.45rem;
  }

  @media (max-width: 540px) {
    .option-shortcut {
      display: none;
    }
  }
</style>
