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
    background: #FFFFFF;
    border: 3px solid #E2E8F0;
    border-radius: 16px;
    padding: 1rem 1.25rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #0F172A;
    cursor: pointer;
    transition: all 0.15s ease;
    min-height: 70px;
    box-sizing: border-box;
    width: 100%;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
  }

  .option-btn:hover {
    border-color: #CBD5E1;
    background: #F8FAFC;
    transform: translateY(-1px);
  }

  .option-btn.is-selected {
    border-color: #059669;
    background: #ECFDF5;
    box-shadow: 0 0 0 1px #059669, 0 4px 14px rgba(5, 150, 105, 0.15);
  }

  .option-badge {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: #F1F5F9;
    color: #475569;
    border: 1px solid #E2E8F0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    font-weight: 850;
    flex-shrink: 0;
  }

  .option-btn.is-selected .option-badge {
    background: #059669;
    color: #FFFFFF;
    border-color: transparent;
  }

  .option-label {
    flex: 1;
    text-align: left;
    font-size: clamp(1.2rem, 3.5vw, 1.55rem);
    font-weight: 850;
    font-variant-numeric: tabular-nums;
  }

  .option-shortcut {
    font-size: 0.75rem;
    font-weight: 750;
    color: #94A3B8;
    border: 1px solid #E2E8F0;
    border-radius: 6px;
    padding: 0.15rem 0.45rem;
    background: #F8FAFC;
  }

  @media (max-width: 640px) {
    .option-btn {
      min-height: 50px;
      padding: 0.55rem 0.85rem;
      gap: 0.65rem;
      border-radius: 12px;
      border-width: 2px;
    }

    .option-badge {
      width: 30px;
      height: 30px;
      font-size: 0.95rem;
      border-radius: 8px;
    }

    .option-label {
      font-size: clamp(1.05rem, 4vw, 1.3rem);
    }
  }

  @media (max-width: 540px) {
    .option-shortcut {
      display: none;
    }
  }
</style>
