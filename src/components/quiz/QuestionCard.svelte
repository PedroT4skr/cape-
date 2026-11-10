<script lang="ts">
  import type { Question } from '../../types/quiz.types'

  interface Props {
    question: Question
    wasRetroceded?: boolean
  }

  let { question, wasRetroceded = false }: Props = $props()

  interface Token {
    text: string
    kind: 'number' | 'keyword' | 'operator' | 'plain'
  }

  const KEYWORD_REGEX = /^(quanto|quantos|quantas|qual|calcule|resolva|encontre|dada|total|sobraram|ficou)$/i
  const NUMBER_REGEX = /^([+-]?\d+(?:º|%|\^\d+)?|[a-z]\([a-z0-9+-]+\)|[0-9]*x)$/i
  const OPERATOR_REGEX = /^([+\-−×÷=?%])$/

  function tokenizePrompt(text: string): Token[] {
    const parts = text.split(/(\s+|[,:;?!()])/g).filter((p) => p.length > 0)
    return parts.map((part) => {
      const clean = part.trim()
      if (!clean) return { text: part, kind: 'plain' }
      if (NUMBER_REGEX.test(clean)) return { text: part, kind: 'number' }
      if (OPERATOR_REGEX.test(clean)) return { text: part, kind: 'operator' }
      if (KEYWORD_REGEX.test(clean)) return { text: part, kind: 'keyword' }
      return { text: part, kind: 'plain' }
    })
  }

  function tokenizeExpression(expr: string): Token[] {
    const parts = expr.split(/(\s+|[+\-−×÷=?^%])/g).filter((p) => p.length > 0)
    return parts.map((part) => {
      const clean = part.trim()
      if (!clean) return { text: part, kind: 'plain' }
      if (clean === '?') return { text: part, kind: 'keyword' }
      if (/^[+\-−×÷=^%]$/.test(clean)) return { text: part, kind: 'operator' }
      return { text: part, kind: 'number' }
    })
  }

  let promptTokens = $derived(tokenizePrompt(question.prompt))
  let exprTokens = $derived(question.expression ? tokenizeExpression(question.expression) : [])
</script>

<div class="question-card diff-{question.difficulty}">
  {#if wasRetroceded}
    <div class="retrocede-banner" role="status">
      ↩ Questão revisitada — vale <strong>50% da pontuação</strong>
    </div>
  {/if}

  <h2 class="question-prompt">
    {#each promptTokens as token}
      {#if token.kind === 'number'}
        <span class="hl-number">{token.text}</span>
      {:else if token.kind === 'keyword'}
        <span class="hl-keyword">{token.text}</span>
      {:else if token.kind === 'operator'}
        <span class="hl-operator">{token.text}</span>
      {:else}
        {token.text}
      {/if}
    {/each}
  </h2>

  {#if question.expression}
    <div class="question-expression" aria-label={question.expression}>
      {#each exprTokens as token}
        {#if token.kind === 'operator'}
          <span class="expr-op">{token.text}</span>
        {:else if token.kind === 'keyword'}
          <span class="expr-q">{token.text}</span>
        {:else if token.kind === 'number'}
          <span class="expr-num">{token.text}</span>
        {:else}
          {token.text}
        {/if}
      {/each}
    </div>
  {/if}
</div>

<style>
  .question-card {
    background: linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%);
    border: 3px solid #CBD5E1;
    border-top: 6px solid #059669;
    border-radius: 22px;
    padding: 1.75rem 1.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.9rem;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.07);
  }

  .question-card.diff-beginner {
    border-top-color: #10B981;
  }

  .question-card.diff-intermediate {
    border-top-color: #F59E0B;
  }

  .question-card.diff-advanced {
    border-top-color: #8B5CF6;
  }

  .retrocede-banner {
    background: #FEF3C7;
    border: 2px solid #F59E0B;
    color: #92400E;
    font-size: 0.9rem;
    font-weight: 800;
    padding: 0.35rem 0.9rem;
    border-radius: 9999px;
  }

  .question-prompt {
    font-size: clamp(1.65rem, 4.5vw, 2.45rem);
    font-weight: 900;
    color: #1E293B;
    margin: 0;
    line-height: 1.35;
    letter-spacing: -0.01em;
  }

  .hl-number {
    display: inline-block;
    background: #FEF3C7;
    color: #B45309;
    border: 2px solid #FCD34D;
    padding: 0.05rem 0.45rem;
    border-radius: 10px;
    font-weight: 950;
    margin: 0 0.08rem;
  }

  .hl-keyword {
    color: #2563EB;
    text-decoration: underline;
    text-decoration-thickness: 3px;
    text-underline-offset: 4px;
    font-weight: 950;
  }

  .hl-operator {
    color: #E11D48;
    font-weight: 950;
  }

  .question-expression {
    font-size: clamp(2.6rem, 8.5vw, 4.5rem);
    font-weight: 950;
    letter-spacing: 0.04em;
    font-variant-numeric: tabular-nums;
    background: #F0FDF4;
    border: 2px solid #A7F3D0;
    border-radius: 18px;
    padding: 0.5rem 1.35rem;
  }

  .expr-num {
    color: #047857;
  }

  .expr-op {
    color: #D97706;
    padding: 0 0.1rem;
  }

  .expr-q {
    display: inline-block;
    background: #DBEAFE;
    color: #1D4ED8;
    border: 2px solid #93C5FD;
    border-radius: 12px;
    padding: 0 0.45rem;
  }

  @media (max-width: 640px) {
    .question-card {
      padding: 1rem 1rem;
      gap: 0.55rem;
      border-radius: 16px;
    }

    .question-prompt {
      font-size: clamp(1.3rem, 5vw, 1.7rem);
      line-height: 1.3;
    }

    .question-expression {
      font-size: clamp(1.95rem, 8vw, 2.8rem);
      padding: 0.35rem 0.9rem;
      word-break: break-word;
    }
  }
</style>
