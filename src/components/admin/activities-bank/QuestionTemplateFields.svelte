<script lang="ts">
  import type { ActivityQuestion } from '../../../types/activity.types'
  import {
    generateSmartNumericOptions,
    generateSmartLetterOptions
  } from '../../../utils/activity-question.factory'
  import { Plus, Trash2, Sparkles } from '@lucide/svelte'

  interface Props {
    question: ActivityQuestion
    onChange: () => void
  }

  let { question = $bindable(), onChange }: Props = $props()

  function syncNumericCount(target: 'count' | 'addition') {
    if (target === 'count' && question.items) {
      question.options = generateSmartNumericOptions(question.items.count, question.items.emoji || '🍎')
    } else if (target === 'addition' && question.groupA && question.groupB) {
      const total = question.groupA.count + question.groupB.count
      question.options = generateSmartNumericOptions(total, question.groupA.emoji || '🍎')
    }
    onChange()
  }

  function syncComparisonSides() {
    if (!question.optionLeft || !question.optionRight) return
    const leftCount = question.optionLeft.count
    const rightCount = question.optionRight.count
    const leftCorrect =
      question.targetComparison === 'less' ? leftCount <= rightCount : leftCount >= rightCount

    question.options = [
      {
        id: 'opt_1',
        label: 'ESQUERDA',
        emojiVisual: `${question.optionLeft.emoji} (${leftCount})`,
        isCorrect: leftCorrect
      },
      {
        id: 'opt_2',
        label: 'DIREITA',
        emojiVisual: `${question.optionRight.emoji} (${rightCount})`,
        isCorrect: !leftCorrect
      }
    ]
    onChange()
  }

  function syncLetterOptions() {
    if (!question.targetItem?.highlight) return
    question.options = generateSmartLetterOptions(question.targetItem.highlight)
    onChange()
  }

  function addRoutineStep() {
    if (!question.visualTarget) return
    const steps = question.visualTarget.sequenceSteps || []
    if (steps.length >= 3) return
    question.visualTarget.sequenceSteps = [...steps, { emoji: '📚', label: 'NOVO PASSO' }]
    onChange()
  }

  function removeRoutineStep(idx: number) {
    if (!question.visualTarget?.sequenceSteps) return
    if (question.visualTarget.sequenceSteps.length <= 1) return
    question.visualTarget.sequenceSteps = question.visualTarget.sequenceSteps.filter((_, i) => i !== idx)
    onChange()
  }
</script>

<div class="template-fields-box">
  {#if question.type === 'count' && question.items}
    <div class="section-header-row">
      <span class="section-subtitle">Configuração de Contagem</span>
      <button type="button" class="auto-btn" onclick={() => syncNumericCount('count')}>
        <Sparkles size={14} /> Gerar Alternativas ({question.items.count})
      </button>
    </div>
    <div class="fields-row three-col">
      <label class="field-cell">
        <span>Emoji / Figura</span>
        <input type="text" class="text-input emoji-input" bind:value={question.items.emoji} maxlength="4" onchange={onChange} />
      </label>
      <label class="field-cell">
        <span>Quantidade (1 a 10)</span>
        <input type="number" class="text-input" min="1" max="10" bind:value={question.items.count} onchange={() => syncNumericCount('count')} />
      </label>
      <label class="field-cell">
        <span>Nome do Item</span>
        <input type="text" class="text-input" bind:value={question.items.label} placeholder="Ex: MAÇÃS" onchange={onChange} />
      </label>
    </div>

  {:else if question.type === 'addition' && question.groupA && question.groupB}
    <div class="section-header-row">
      <span class="section-subtitle">Grupos da Soma Visual</span>
      <button type="button" class="auto-btn" onclick={() => syncNumericCount('addition')}>
        <Sparkles size={14} /> Gerar Soma ({question.groupA.count + question.groupB.count})
      </button>
    </div>
    <div class="dual-groups-edit">
      <div class="mini-panel">
        <span class="mini-panel-title">Grupo A (Esquerda)</span>
        <div class="fields-row three-col">
          <label class="field-cell">
            <span>Emoji</span>
            <input type="text" class="text-input emoji-input" bind:value={question.groupA.emoji} maxlength="4" onchange={onChange} />
          </label>
          <label class="field-cell">
            <span>Qtd</span>
            <input type="number" class="text-input" min="1" max="6" bind:value={question.groupA.count} onchange={onChange} />
          </label>
          <label class="field-cell">
            <span>Etiqueta</span>
            <input type="text" class="text-input" bind:value={question.groupA.label} onchange={onChange} />
          </label>
        </div>
      </div>

      <div class="mini-panel">
        <span class="mini-panel-title">Grupo B (Direita)</span>
        <div class="fields-row three-col">
          <label class="field-cell">
            <span>Emoji</span>
            <input type="text" class="text-input emoji-input" bind:value={question.groupB.emoji} maxlength="4" onchange={onChange} />
          </label>
          <label class="field-cell">
            <span>Qtd</span>
            <input type="number" class="text-input" min="1" max="6" bind:value={question.groupB.count} onchange={onChange} />
          </label>
          <label class="field-cell">
            <span>Etiqueta</span>
            <input type="text" class="text-input" bind:value={question.groupB.label} onchange={onChange} />
          </label>
        </div>
      </div>
    </div>

  {:else if question.type === 'comparison' && question.optionLeft && question.optionRight}
    <div class="section-header-row">
      <span class="section-subtitle">Comparação Espacial (Esquerda vs Direita)</span>
      <button type="button" class="auto-btn" onclick={syncComparisonSides}>
        <Sparkles size={14} /> Atualizar Esquerda / Direita
      </button>
    </div>
    <label class="field-cell">
      <span>Objetivo da Comparação</span>
      <select class="text-input" bind:value={question.targetComparison} onchange={syncComparisonSides}>
        <option value="more">Onde tem MAIS</option>
        <option value="less">Onde tem MENOS</option>
      </select>
    </label>
    <div class="dual-groups-edit">
      <div class="mini-panel">
        <span class="mini-panel-title">Lado Esquerdo</span>
        <div class="fields-row three-col">
          <label class="field-cell">
            <span>Emoji</span>
            <input type="text" class="text-input emoji-input" bind:value={question.optionLeft.emoji} maxlength="4" onchange={onChange} />
          </label>
          <label class="field-cell">
            <span>Qtd</span>
            <input type="number" class="text-input" min="1" max="8" bind:value={question.optionLeft.count} onchange={syncComparisonSides} />
          </label>
          <label class="field-cell">
            <span>Etiqueta</span>
            <input type="text" class="text-input" bind:value={question.optionLeft.label} onchange={onChange} />
          </label>
        </div>
      </div>
      <div class="mini-panel">
        <span class="mini-panel-title">Lado Direito</span>
        <div class="fields-row three-col">
          <label class="field-cell">
            <span>Emoji</span>
            <input type="text" class="text-input emoji-input" bind:value={question.optionRight.emoji} maxlength="4" onchange={onChange} />
          </label>
          <label class="field-cell">
            <span>Qtd</span>
            <input type="number" class="text-input" min="1" max="8" bind:value={question.optionRight.count} onchange={syncComparisonSides} />
          </label>
          <label class="field-cell">
            <span>Etiqueta</span>
            <input type="text" class="text-input" bind:value={question.optionRight.label} onchange={onChange} />
          </label>
        </div>
      </div>
    </div>

  {:else if (question.type === 'initial_letter' || question.type === 'syllables' || question.type === 'word_match') && question.targetItem}
    <div class="section-header-row">
      <span class="section-subtitle">Figura & Palavra Alvo</span>
      {#if question.type === 'initial_letter'}
        <button type="button" class="auto-btn" onclick={syncLetterOptions}>
          <Sparkles size={14} /> Gerar Letras ({question.targetItem.highlight || '?'})
        </button>
      {/if}
    </div>
    <div class="fields-row two-col">
      <label class="field-cell">
        <span>Emoji / Figura Central</span>
        <input type="text" class="text-input emoji-input" bind:value={question.targetItem.emoji} maxlength="4" onchange={onChange} />
      </label>
      <label class="field-cell">
        <span>Palavra Completa</span>
        <input type="text" class="text-input" bind:value={question.targetItem.word} placeholder="Ex: BOLA" onchange={onChange} />
      </label>
    </div>
    {#if question.type === 'initial_letter' || question.type === 'syllables'}
      <div class="fields-row two-col">
        <label class="field-cell">
          <span>{question.type === 'initial_letter' ? 'Letra Inicial Correta' : 'Sílaba Inicial Correta'}</span>
          <input type="text" class="text-input" bind:value={question.targetItem.highlight} placeholder="Ex: B ou CA" onchange={onChange} />
        </label>
        <label class="field-cell">
          <span>Restante Exibido (Opcional)</span>
          <input type="text" class="text-input" bind:value={question.targetItem.displayWord} placeholder="_ O L A" onchange={onChange} />
        </label>
      </div>
    {:else}
      <label class="field-cell">
        <span>Texto da Etiqueta Inferior (Opcional)</span>
        <input type="text" class="text-input" bind:value={question.targetItem.hintBadge} placeholder="Ex: QUAL SENTIMENTO É ESTE?" onchange={onChange} />
      </label>
    {/if}

  {:else if (question.type === 'color_match' || question.type === 'shape_match') && question.visualTarget}
    <span class="section-subtitle">Cartão Modelo / Estímulo Visual</span>
    <div class="fields-row three-col">
      <label class="field-cell">
        <span>Emoji Modelo</span>
        <input type="text" class="text-input emoji-input" bind:value={question.visualTarget.modelEmoji} maxlength="4" onchange={onChange} />
      </label>
      <label class="field-cell">
        <span>Título do Modelo</span>
        <input type="text" class="text-input" bind:value={question.visualTarget.modelLabel} placeholder="Ex: CHUVA" onchange={onChange} />
      </label>
      <label class="field-cell">
        <span>Etiqueta Superior</span>
        <input type="text" class="text-input" bind:value={question.visualTarget.badgeText} placeholder="MODELO / O QUE COMBINA?" onchange={onChange} />
      </label>
    </div>
    <label class="field-cell">
      <span>Dica Inferior para o Aluno (Opcional)</span>
      <input type="text" class="text-input" bind:value={question.visualTarget.guidanceText} placeholder="ENCONTRE A OPÇÃO IGUAL AO MODELO" onchange={onChange} />
    </label>

  {:else if question.type === 'routine_sequence' && question.visualTarget}
    <div class="section-header-row">
      <span class="section-subtitle">Passos Visuais Antes do "[ ? ]"</span>
      {#if (question.visualTarget.sequenceSteps?.length || 0) < 3}
        <button type="button" class="auto-btn" onclick={addRoutineStep}>
          <Plus size={14} /> Adicionar Passo
        </button>
      {/if}
    </div>
    <div class="steps-list">
      {#each question.visualTarget.sequenceSteps || [] as step, idx}
        <div class="step-edit-row">
          <span class="step-idx">Passo {idx + 1}</span>
          <input type="text" class="text-input emoji-input step-em" bind:value={step.emoji} maxlength="4" onchange={onChange} />
          <input type="text" class="text-input step-lbl" bind:value={step.label} placeholder="Ex: ACORDAR" onchange={onChange} />
          {#if (question.visualTarget.sequenceSteps?.length || 0) > 1}
            <button type="button" class="del-step-btn" onclick={() => removeRoutineStep(idx)} aria-label="Remover passo">
              <Trash2 size={14} />
            </button>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .template-fields-box {
    background: #F8FAFC;
    border: 1.5px solid #E2E8F0;
    border-radius: 12px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .section-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
  }

  .section-subtitle {
    font-size: 0.78rem;
    font-weight: 900;
    color: #334155;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  .auto-btn {
    background: #EFF6FF;
    color: #1D4ED8;
    border: 1.5px solid #BFDBFE;
    border-radius: 8px;
    padding: 4px 10px;
    font-size: 0.74rem;
    font-weight: 850;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }

  .auto-btn:hover {
    background: #DBEAFE;
  }

  .fields-row {
    display: grid;
    gap: 8px;
  }

  .two-col {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .three-col {
    grid-template-columns: 80px 1fr 1fr;
  }

  .dual-groups-edit {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }

  .mini-panel {
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 10px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .mini-panel-title {
    font-size: 0.72rem;
    font-weight: 900;
    color: #475569;
  }

  .field-cell {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }

  .field-cell span {
    font-size: 0.72rem;
    font-weight: 800;
    color: #475569;
  }

  .text-input {
    width: 100%;
    border: 1.5px solid #CBD5E1;
    border-radius: 8px;
    padding: 6px 9px;
    font-size: 0.85rem;
    font-weight: 700;
    color: #0F172A;
    background: #FFFFFF;
    box-sizing: border-box;
  }

  .emoji-input {
    text-align: center;
    font-size: 1.1rem;
  }

  .steps-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .step-edit-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .step-idx {
    font-size: 0.72rem;
    font-weight: 850;
    color: #64748B;
    white-space: nowrap;
  }

  .step-em {
    width: 56px;
    flex-shrink: 0;
  }

  .step-lbl {
    flex: 1;
  }

  .del-step-btn {
    background: #FFF1F2;
    color: #BE123C;
    border: 1px solid #FECDD3;
    border-radius: 7px;
    padding: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  @media (max-width: 640px) {
    .two-col,
    .three-col,
    .dual-groups-edit {
      grid-template-columns: 1fr;
    }
  }
</style>
