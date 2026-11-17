<script lang="ts">
  import type { ActivityQuestion, ActivityQuestionType } from '../../../types/activity.types'
  import {
    QUESTION_TYPE_OPTIONS,
    createDefaultQuestionForType
  } from '../../../utils/activity-question.factory'
  import QuestionTemplateFields from './QuestionTemplateFields.svelte'
  import { ArrowLeft, Check, Plus, Trash2 } from '@lucide/svelte'

  interface Props {
    question: ActivityQuestion
    questionNumber: number
    onDone: () => void
  }

  let { question = $bindable(), questionNumber, onDone }: Props = $props()

  function handleTypeSwitch(event: Event) {
    const newType = (event.target as HTMLSelectElement).value as ActivityQuestionType
    if (newType === question.type) return
    const fresh = createDefaultQuestionForType(question.levelId, newType)
    question.type = fresh.type
    question.prompt = fresh.prompt
    question.ttsPrompt = fresh.ttsPrompt
    question.items = fresh.items
    question.groupA = fresh.groupA
    question.groupB = fresh.groupB
    question.optionLeft = fresh.optionLeft
    question.optionRight = fresh.optionRight
    question.targetComparison = fresh.targetComparison
    question.targetItem = fresh.targetItem
    question.visualTarget = fresh.visualTarget
    question.options = fresh.options
  }

  function markCorrectOption(targetIdx: number) {
    question.options = question.options.map((opt, idx) => ({
      ...opt,
      isCorrect: idx === targetIdx
    }))
  }

  function addOption() {
    if (question.options.length >= 3) return
    question.options = [
      ...question.options,
      { id: `opt_${Date.now()}`, label: 'NOVA OPÇÃO', isCorrect: false }
    ]
  }

  function removeOption(idx: number) {
    if (question.options.length <= 2) return
    const removedWasCorrect = question.options[idx].isCorrect
    const next = question.options.filter((_, i) => i !== idx)
    if (removedWasCorrect && next.length > 0) {
      next[0].isCorrect = true
    }
    question.options = next
  }

  function noopChange() {
    // Gatilho reativo explícito quando bindings profundos atualizam
    question = { ...question }
  }
</script>

<div class="question-editor-panel">
  <div class="editor-top-bar">
    <button type="button" class="back-list-btn" onclick={onDone}>
      <ArrowLeft size={16} />
      <span>Voltar à Lista de Questões</span>
    </button>
    <span class="q-badge">Editando Questão {questionNumber}</span>
  </div>

  <div class="form-grid">
    <label class="field-group">
      <span class="field-label">Formato Visual do Exercício</span>
      <select class="select-input" value={question.type} onchange={handleTypeSwitch}>
        {#each QUESTION_TYPE_OPTIONS as opt}
          <option value={opt.type}>{opt.label} — {opt.shortHint}</option>
        {/each}
      </select>
    </label>

    <label class="field-group">
      <span class="field-label">Enunciado na Tela (Caixa Alta)</span>
      <input
        type="text"
        class="text-input"
        bind:value={question.prompt}
        placeholder="Ex: QUANTAS MAÇÃS VOCÊ VÊ?"
      />
    </label>

    <label class="field-group">
      <span class="field-label">Narração em Áudio (Botão OUVIR / TTS)</span>
      <input
        type="text"
        class="text-input"
        bind:value={question.ttsPrompt}
        placeholder="Texto falado para o aluno com voz neural..."
      />
    </label>
  </div>

  <!-- Campos Dinâmicos do Template -->
  <QuestionTemplateFields bind:question onChange={noopChange} />

  <!-- Editor Uniforme de Alternativas -->
  <div class="options-editor-box">
    <div class="options-header">
      <span class="field-label">Alternativas para o Aluno Tocar (Marque a Correta)</span>
      {#if question.options.length < 3}
        <button type="button" class="add-opt-btn" onclick={addOption}>
          <Plus size={14} /> Adicionar Opção
        </button>
      {/if}
    </div>

    <div class="options-list">
      {#each question.options as opt, idx}
        <div class="opt-row {opt.isCorrect ? 'is-correct' : ''}">
          <button
            type="button"
            class="correct-radio {opt.isCorrect ? 'checked' : ''}"
            onclick={() => markCorrectOption(idx)}
            title="Marcar como resposta correta"
            aria-label="Marcar alternativa {idx + 1} como correta"
          >
            <Check size={14} strokeWidth={3} />
          </button>

          <input
            type="text"
            class="opt-label-input"
            bind:value={opt.label}
            placeholder="Texto da opção"
          />

          <input
            type="text"
            class="opt-emoji-input"
            bind:value={opt.emojiVisual}
            placeholder="Emoji (opcional)"
            maxlength="14"
          />

          {#if question.options.length > 2}
            <button
              type="button"
              class="del-opt-btn"
              onclick={() => removeOption(idx)}
              aria-label="Remover opção"
            >
              <Trash2 size={14} />
            </button>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <div class="panel-footer">
    <button type="button" class="done-q-btn" onclick={onDone}>
      <Check size={16} strokeWidth={2.8} />
      <span>CONCLUIR QUESTÃO</span>
    </button>
  </div>
</div>

<style>
  .question-editor-panel {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .editor-top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
    padding-bottom: 10px;
    border-bottom: 1px solid #E2E8F0;
  }

  .back-list-btn {
    background: #F1F5F9;
    border: 1.5px solid #CBD5E1;
    color: #334155;
    border-radius: 9px;
    padding: 6px 12px;
    font-size: 0.8rem;
    font-weight: 850;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }

  .q-badge {
    background: #EFF6FF;
    color: #1D4ED8;
    border: 1px solid #BFDBFE;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 900;
  }

  .form-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .field-label {
    font-size: 0.76rem;
    font-weight: 850;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  .text-input,
  .select-input {
    width: 100%;
    border: 1.5px solid #CBD5E1;
    border-radius: 9px;
    padding: 8px 10px;
    font-size: 0.88rem;
    font-weight: 700;
    color: #0F172A;
    background: #FFFFFF;
    box-sizing: border-box;
  }

  .options-editor-box {
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-radius: 12px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .options-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
  }

  .add-opt-btn {
    background: #F1F5F9;
    border: 1px solid #CBD5E1;
    color: #334155;
    border-radius: 7px;
    padding: 4px 9px;
    font-size: 0.74rem;
    font-weight: 800;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
  }

  .options-list {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  .opt-row {
    display: flex;
    align-items: center;
    gap: 7px;
    background: #F8FAFC;
    border: 1.5px solid #E2E8F0;
    padding: 6px 8px;
    border-radius: 10px;
  }

  .opt-row.is-correct {
    background: #ECFDF5;
    border-color: #34D399;
  }

  .correct-radio {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid #CBD5E1;
    background: #FFFFFF;
    color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
  }

  .correct-radio.checked {
    background: #059669;
    border-color: #059669;
    color: #FFFFFF;
  }

  .opt-label-input {
    flex: 1;
    min-width: 0;
    border: 1px solid #CBD5E1;
    border-radius: 7px;
    padding: 6px 8px;
    font-size: 0.84rem;
    font-weight: 750;
    color: #0F172A;
    background: #FFFFFF;
  }

  .opt-emoji-input {
    width: 110px;
    border: 1px solid #CBD5E1;
    border-radius: 7px;
    padding: 6px 8px;
    font-size: 0.84rem;
    font-weight: 700;
    color: #0F172A;
    background: #FFFFFF;
    text-align: center;
  }

  .del-opt-btn {
    background: #FFF1F2;
    color: #BE123C;
    border: 1px solid #FECDD3;
    border-radius: 7px;
    padding: 6px;
    cursor: pointer;
  }

  .panel-footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 6px;
  }

  .done-q-btn {
    background: #2563EB;
    color: #FFFFFF;
    border: none;
    border-radius: 10px;
    padding: 10px 18px;
    font-size: 0.88rem;
    font-weight: 900;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }

  @media (max-width: 640px) {
    .opt-row {
      flex-wrap: wrap;
    }

    .opt-emoji-input {
      width: 90px;
    }
  }
</style>
