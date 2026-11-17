<script lang="ts">
  import type { ActivityCategoryId, ActivityDefinition } from '../../../types/activity.types'
  import Modal from '../../common/Modal.svelte'
  import EmojiPicker from '../EmojiPicker.svelte'
  import QuestionEditorPanel from './QuestionEditorPanel.svelte'
  import { BASE_ACTIVITY_CATEGORIES } from '../../../constants/curriculum/activity-categories.constants'
  import { SCIENTIFIC_REFERENCES } from '../../../constants/curriculum/evidence-references.constants'
  import {
    QUESTION_TYPE_OPTIONS,
    createDefaultActivityDraft,
    createDefaultQuestionForType,
    generateUid,
    validateActivityDefinition
  } from '../../../utils/activity-question.factory'
  import { upsertActivityInBank } from '../../../stores/activity-bank.store'
  import {
    Plus,
    Pencil,
    Trash2,
    ArrowUp,
    ArrowDown,
    Save,
    Smile,
    AlertCircle
  } from '@lucide/svelte'

  interface Props {
    isOpen: boolean
    editingActivity: ActivityDefinition | null
    onClose: () => void
  }

  let { isOpen, editingActivity, onClose }: Props = $props()

  const COLOR_SWATCHES = ['#16A34A', '#2563EB', '#EA580C', '#9333EA', '#EC4899', '#0284C7', '#D97706', '#059669']

  let draft = $state<ActivityDefinition>(createDefaultActivityDraft())
  let editingQuestionIdx = $state<number | null>(null)
  let showEmojiPicker = $state(false)
  let errorMsg = $state<string | null>(null)
  let isSaving = $state(false)

  $effect(() => {
    if (isOpen) {
      errorMsg = null
      editingQuestionIdx = null
      showEmojiPicker = false
      draft = editingActivity
        ? (JSON.parse(JSON.stringify(editingActivity)) as ActivityDefinition)
        : createDefaultActivityDraft('dyscalculia')
    }
  })

  function handleCategoryChange(event: Event) {
    const catId = (event.target as HTMLSelectElement).value as ActivityCategoryId
    draft.categoryId = catId
  }

  function handleAddQuestion() {
    const defaultTypeMap: Record<ActivityCategoryId, (typeof QUESTION_TYPE_OPTIONS)[number]['type']> = {
      dyscalculia: 'count',
      literacy: 'word_match',
      visual_perception: 'color_match',
      social_emotions: 'word_match',
      daily_logic: 'shape_match'
    }
    const newQ = createDefaultQuestionForType(draft.id, defaultTypeMap[draft.categoryId])
    draft.questions = [...draft.questions, newQ]
    editingQuestionIdx = draft.questions.length - 1
  }

  function handleMoveQuestion(idx: number, delta: -1 | 1) {
    const target = idx + delta
    if (target < 0 || target >= draft.questions.length) return
    const copy = [...draft.questions]
    const [moved] = copy.splice(idx, 1)
    copy.splice(target, 0, moved)
    draft.questions = copy
  }

  function handleDuplicateQuestion(idx: number) {
    const src = JSON.parse(JSON.stringify(draft.questions[idx]))
    src.id = generateUid('q')
    const copy = [...draft.questions]
    copy.splice(idx + 1, 0, src)
    draft.questions = copy
  }

  function handleDeleteQuestion(idx: number) {
    if (draft.questions.length <= 1) {
      errorMsg = 'A atividade precisa manter pelo menos 1 questão.'
      return
    }
    errorMsg = null
    draft.questions = draft.questions.filter((_, i) => i !== idx)
  }

  async function handleSaveActivity() {
    errorMsg = validateActivityDefinition(draft)
    if (errorMsg) return

    isSaving = true
    try {
      await upsertActivityInBank(draft)
      onClose()
    } catch (err: any) {
      errorMsg = err?.message || 'Erro ao salvar atividade.'
    } finally {
      isSaving = false
    }
  }
</script>

<Modal
  {isOpen}
  title={editingActivity ? `Editar: ${draft.title}` : 'Criar Nova Atividade Pedagógica'}
  {onClose}
  maxWidth="840px"
>
  <div class="activity-editor-body">
    {#if editingQuestionIdx !== null && draft.questions[editingQuestionIdx]}
      <QuestionEditorPanel
        bind:question={draft.questions[editingQuestionIdx]}
        questionNumber={editingQuestionIdx + 1}
        onDone={() => (editingQuestionIdx = null)}
      />
    {:else}
      <!-- Metadados da Atividade -->
      <section class="meta-section">
        <div class="top-meta-row">
          <div class="emoji-selector-wrap">
            <span class="field-label">Ícone</span>
            <button
              type="button"
              class="emoji-trigger-btn"
              style="border-color: {draft.badgeColor};"
              onclick={() => (showEmojiPicker = !showEmojiPicker)}
              title="Escolher emoji do catálogo"
            >
              <span class="big-em">{draft.emoji}</span>
              <Smile size={14} />
            </button>
          </div>

          <div class="title-cat-grid">
            <label class="field-group">
              <span class="field-label">Título da Atividade</span>
              <input type="text" class="text-input" bind:value={draft.title} placeholder="Ex: Contagem de Animais" />
            </label>

            <label class="field-group">
              <span class="field-label">Categoria Pedagógica</span>
              <select class="select-input" value={draft.categoryId} onchange={handleCategoryChange}>
                {#each BASE_ACTIVITY_CATEGORIES as cat}
                  <option value={cat.id}>{cat.emoji} {cat.title}</option>
                {/each}
              </select>
            </label>
          </div>
        </div>

        {#if showEmojiPicker}
          <div class="inline-picker">
            <EmojiPicker
              selectedEmoji={draft.emoji}
              onSelect={(em) => {
                draft.emoji = em
                showEmojiPicker = false
              }}
            />
          </div>
        {/if}

        <div class="two-col-meta">
          <label class="field-group">
            <span class="field-label">Subtítulo Curto</span>
            <input type="text" class="text-input" bind:value={draft.subtitle} placeholder="Objetivo resumido no card" />
          </label>

          <label class="field-group">
            <span class="field-label">Metodologia / Abordagem</span>
            <input type="text" class="text-input" bind:value={draft.methodology} placeholder="Ex: TEACCH / PECS / CPA" />
          </label>
        </div>

        <div class="two-col-meta">
          <label class="field-group">
            <span class="field-label">Descrição Terapêutica</span>
            <input type="text" class="text-input" bind:value={draft.description} placeholder="Detalhes do exercício..." />
          </label>

          <label class="field-group">
            <span class="field-label">Base Científica / Diretriz (EBP)</span>
            <select class="select-input" bind:value={draft.evidenceId}>
              {#each SCIENTIFIC_REFERENCES as ref}
                <option value={ref.id}>{ref.badgeLabel}</option>
              {/each}
            </select>
          </label>
        </div>

        <div class="field-group">
          <span class="field-label">Cor do Cartão</span>
          <div class="swatches-row">
            {#each COLOR_SWATCHES as col}
              <button
                type="button"
                class="color-dot {draft.badgeColor === col ? 'active' : ''}"
                style="background: {col};"
                onclick={() => (draft.badgeColor = col)}
                aria-label="Cor {col}"
              ></button>
            {/each}
          </div>
        </div>
      </section>

      <!-- Lista de Questões -->
      <section class="questions-section">
        <div class="q-section-header">
          <h3 class="q-section-title">Questões da Atividade ({draft.questions.length})</h3>
          <button type="button" class="add-q-btn" onclick={handleAddQuestion}>
            <Plus size={16} />
            <span>Adicionar Questão</span>
          </button>
        </div>

        <div class="q-list">
          {#each draft.questions as q, idx (q.id)}
            {@const typeLabel = QUESTION_TYPE_OPTIONS.find((t) => t.type === q.type)?.label || q.type}
            <div class="q-item-row">
              <div class="q-item-info">
                <span class="q-num">#{idx + 1}</span>
                <div class="q-texts">
                  <span class="q-prompt">{q.prompt}</span>
                  <span class="q-type">{typeLabel} • {q.options.length} opções</span>
                </div>
              </div>

              <div class="q-item-actions">
                <button type="button" class="mini-btn" disabled={idx === 0} onclick={() => handleMoveQuestion(idx, -1)} aria-label="Mover para cima">
                  <ArrowUp size={14} />
                </button>
                <button type="button" class="mini-btn" disabled={idx === draft.questions.length - 1} onclick={() => handleMoveQuestion(idx, 1)} aria-label="Mover para baixo">
                  <ArrowDown size={14} />
                </button>
                <button type="button" class="mini-btn edit-mini" onclick={() => (editingQuestionIdx = idx)}>
                  <Pencil size={14} />
                  <span>Editar</span>
                </button>
                <button type="button" class="mini-btn" onclick={() => handleDuplicateQuestion(idx)} title="Duplicar questão" aria-label="Duplicar questão">
                  +1
                </button>
                <button type="button" class="mini-btn del-mini" onclick={() => handleDeleteQuestion(idx)} aria-label="Remover questão">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          {/each}
        </div>
      </section>

      {#if errorMsg}
        <div class="error-banner" role="alert">
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      {/if}

      <footer class="modal-footer-actions">
        <button type="button" class="cancel-btn" onclick={onClose} disabled={isSaving}>
          CANCELAR
        </button>
        <button type="button" class="save-btn" onclick={handleSaveActivity} disabled={isSaving}>
          <Save size={18} />
          <span>{isSaving ? 'SALVANDO...' : 'SALVAR ATIVIDADE'}</span>
        </button>
      </footer>
    {/if}
  </div>
</Modal>

<style>
  .activity-editor-body {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .meta-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .top-meta-row {
    display: flex;
    gap: 12px;
    align-items: flex-end;
  }

  .emoji-selector-wrap {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex-shrink: 0;
  }

  .emoji-trigger-btn {
    height: 44px;
    padding: 0 10px;
    background: #F8FAFC;
    border: 2px solid;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    color: #475569;
  }

  .big-em {
    font-size: 1.5rem;
    line-height: 1;
  }

  .title-cat-grid {
    flex: 1;
    min-width: 0;
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 10px;
  }

  .two-col-meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .field-label {
    font-size: 0.74rem;
    font-weight: 850;
    color: #475569;
    text-transform: uppercase;
  }

  .text-input,
  .select-input {
    width: 100%;
    height: 40px;
    border: 1.5px solid #CBD5E1;
    border-radius: 9px;
    padding: 0 10px;
    font-size: 0.88rem;
    font-weight: 700;
    color: #0F172A;
    background: #FFFFFF;
    box-sizing: border-box;
  }

  .swatches-row {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    flex-wrap: wrap;
  }

  .color-dot {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 2px solid #FFFFFF;
    box-shadow: 0 0 0 1px #CBD5E1;
    cursor: pointer;
  }

  .color-dot.active {
    box-shadow: 0 0 0 2.5px #0F172A;
    transform: scale(1.1);
  }

  .inline-picker {
    border: 1.5px solid #E2E8F0;
    border-radius: 12px;
    padding: 8px;
    background: #F8FAFC;
  }

  .questions-section {
    background: #F8FAFC;
    border: 1.5px solid #E2E8F0;
    border-radius: 14px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .q-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
  }

  .q-section-title {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 900;
    color: #0F172A;
  }

  .add-q-btn {
    background: #2563EB;
    color: #FFFFFF;
    border: none;
    border-radius: 9px;
    padding: 7px 12px;
    font-size: 0.8rem;
    font-weight: 850;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }

  .q-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 260px;
    overflow-y: auto;
  }

  .q-item-row {
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-radius: 10px;
    padding: 8px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
  }

  .q-item-info {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    min-width: 180px;
  }

  .q-num {
    background: #F1F5F9;
    color: #475569;
    font-size: 0.72rem;
    font-weight: 900;
    padding: 3px 7px;
    border-radius: 6px;
  }

  .q-texts {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .q-prompt {
    font-size: 0.84rem;
    font-weight: 800;
    color: #0F172A;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .q-type {
    font-size: 0.72rem;
    font-weight: 650;
    color: #64748B;
  }

  .q-item-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .mini-btn {
    background: #F8FAFC;
    border: 1px solid #CBD5E1;
    border-radius: 7px;
    padding: 5px 7px;
    font-size: 0.74rem;
    font-weight: 800;
    color: #475569;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
  }

  .mini-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .edit-mini {
    background: #EFF6FF;
    color: #1D4ED8;
    border-color: #BFDBFE;
  }

  .del-mini {
    background: #FFF1F2;
    color: #BE123C;
    border-color: #FECDD3;
  }

  .error-banner {
    background: #FFF1F2;
    border: 1px solid #FECDD3;
    color: #9F1239;
    border-radius: 10px;
    padding: 9px 12px;
    font-size: 0.84rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .modal-footer-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding-top: 8px;
    border-top: 1px solid #E2E8F0;
  }

  .cancel-btn {
    background: #F1F5F9;
    border: 1.5px solid #CBD5E1;
    color: #475569;
    border-radius: 10px;
    padding: 10px 16px;
    font-size: 0.86rem;
    font-weight: 850;
    cursor: pointer;
  }

  .save-btn {
    background: #059669;
    border: none;
    color: #FFFFFF;
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 0.88rem;
    font-weight: 900;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    cursor: pointer;
  }

  @media (max-width: 640px) {
    .top-meta-row {
      flex-direction: column;
      align-items: stretch;
    }

    .title-cat-grid,
    .two-col-meta {
      grid-template-columns: 1fr;
    }

    .modal-footer-actions {
      flex-direction: column-reverse;
    }

    .cancel-btn,
    .save-btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>
