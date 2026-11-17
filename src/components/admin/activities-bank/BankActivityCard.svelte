<script lang="ts">
  import type { ActivityDefinition } from '../../../types/activity.types'
  import { CATEGORY_MAP } from '../../../constants/curriculum/activity-categories.constants'
  import { Play, Pencil, Copy, Trash2, RotateCcw } from '@lucide/svelte'

  interface Props {
    activity: ActivityDefinition
    onToggleEnabled: (id: string, nextValue: boolean) => void
    onEdit: (activity: ActivityDefinition) => void
    onDuplicate: (activity: ActivityDefinition) => void
    onPlay: (activity: ActivityDefinition) => void
    onDeleteOrRestore: (activity: ActivityDefinition) => void
  }

  const {
    activity,
    onToggleEnabled,
    onEdit,
    onDuplicate,
    onPlay,
    onDeleteOrRestore
  }: Props = $props()

  let categoryInfo = $derived(CATEGORY_MAP[activity.categoryId])
</script>

<article
  class="bank-card {activity.isEnabled ? 'is-enabled' : 'is-hidden'}"
  style="--accent: {activity.badgeColor};"
>
  <div class="card-accent-bar"></div>

  <div class="card-content">
    <div class="card-top-row">
      <div class="emoji-chip" style="background: {activity.badgeColor}15; border-color: {activity.badgeColor}40;">
        <span>{activity.emoji}</span>
      </div>

      <div class="badges-col">
        <span class="cat-badge" style="color: {categoryInfo?.color || activity.badgeColor}; background: {(categoryInfo?.color || activity.badgeColor)}14;">
          {categoryInfo?.emoji} {categoryInfo?.title}
        </span>
        <div class="meta-pills">
          <span class="origin-pill {activity.isBuiltIn ? 'builtin' : 'custom'}">
            {activity.isBuiltIn ? 'Banco CAPE' : 'Criada p/ Mim'}
          </span>
          <span class="q-count-pill">
            {activity.questions.length} {activity.questions.length === 1 ? 'questão' : 'questões'}
          </span>
        </div>
      </div>
    </div>

    <div class="card-text-block">
      <h3 class="act-title">{activity.title}</h3>
      <p class="act-sub">{activity.subtitle}</p>
      <span class="methodology-tag">{activity.methodology}</span>
    </div>

    <!-- Controle de Seleção para o Aluno -->
    <label class="toggle-row">
      <input
        type="checkbox"
        checked={activity.isEnabled}
        onchange={(e) => onToggleEnabled(activity.id, (e.target as HTMLInputElement).checked)}
      />
      <span class="toggle-switch"></span>
      <span class="toggle-label">
        {activity.isEnabled ? 'Ativa para o Aluno' : 'Oculta para o Aluno'}
      </span>
    </label>

    <!-- Ações do Terapeuta -->
    <div class="card-actions">
      <button type="button" class="act-btn play-btn" onclick={() => onPlay(activity)} title="Iniciar atividade agora">
        <Play size={15} fill="currentColor" />
        <span>Aplicar</span>
      </button>

      <button type="button" class="act-btn edit-btn" onclick={() => onEdit(activity)} title="Editar título e questões">
        <Pencil size={15} />
        <span>Editar</span>
      </button>

      <button type="button" class="act-btn dup-btn" onclick={() => onDuplicate(activity)} title="Criar cópia editável">
        <Copy size={15} />
        <span>Duplicar</span>
      </button>

      {#if !activity.isBuiltIn}
        <button
          type="button"
          class="act-btn icon-only danger-btn"
          onclick={() => onDeleteOrRestore(activity)}
          title="Excluir atividade personalizada"
          aria-label="Excluir atividade"
        >
          <Trash2 size={15} />
        </button>
      {:else}
        <button
          type="button"
          class="act-btn icon-only restore-btn"
          onclick={() => onDeleteOrRestore(activity)}
          title="Restaurar padrão original desta atividade"
          aria-label="Restaurar padrão original"
        >
          <RotateCcw size={15} />
        </button>
      {/if}
    </div>
  </div>
</article>

<style>
  .bank-card {
    background: #FFFFFF;
    border: 2px solid #E2E8F0;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
    transition: border-color 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
    min-width: 0;
  }

  .bank-card:hover {
    border-color: #CBD5E1;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.07);
  }

  .bank-card.is-hidden {
    background: #F8FAFC;
    border-style: dashed;
    opacity: 0.84;
  }

  .card-accent-bar {
    height: 6px;
    width: 100%;
    background: var(--accent, #2563EB);
    flex-shrink: 0;
  }

  .card-content {
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
    box-sizing: border-box;
  }

  .card-top-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .emoji-chip {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    border: 2px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    flex-shrink: 0;
  }

  .badges-col {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .cat-badge {
    font-size: 0.7rem;
    font-weight: 900;
    padding: 2px 8px;
    border-radius: 999px;
    display: inline-block;
    width: fit-content;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .meta-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .origin-pill,
  .q-count-pill {
    font-size: 0.68rem;
    font-weight: 800;
    padding: 2px 7px;
    border-radius: 6px;
  }

  .origin-pill.builtin {
    background: #F1F5F9;
    color: #475569;
  }

  .origin-pill.custom {
    background: #EDE9FE;
    color: #6D28D9;
  }

  .q-count-pill {
    background: #EFF6FF;
    color: #1D4ED8;
  }

  .card-text-block {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }

  .act-title {
    margin: 0;
    font-size: 1rem;
    font-weight: 900;
    color: #0F172A;
    line-height: 1.25;
  }

  .act-sub {
    margin: 0;
    font-size: 0.82rem;
    font-weight: 600;
    color: #64748B;
    line-height: 1.3;
  }

  .methodology-tag {
    font-size: 0.72rem;
    font-weight: 800;
    color: #475569;
    margin-top: 2px;
  }

  .toggle-row {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 7px 10px;
    border-radius: 10px;
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    user-select: none;
  }

  .toggle-row input {
    display: none;
  }

  .toggle-switch {
    width: 36px;
    height: 20px;
    background: #CBD5E1;
    border-radius: 999px;
    position: relative;
    transition: background 0.15s ease;
    flex-shrink: 0;
  }

  .toggle-switch::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #FFFFFF;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
    transition: transform 0.15s ease;
  }

  .toggle-row input:checked + .toggle-switch {
    background: #10B981;
  }

  .toggle-row input:checked + .toggle-switch::after {
    transform: translateX(16px);
  }

  .toggle-label {
    font-size: 0.78rem;
    font-weight: 850;
    color: #1E293B;
  }

  .card-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding-top: 6px;
    border-top: 1px solid #E2E8F0;
  }

  .act-btn {
    border: 1.5px solid #CBD5E1;
    background: #FFFFFF;
    color: #334155;
    border-radius: 9px;
    padding: 6px 10px;
    font-size: 0.76rem;
    font-weight: 850;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    cursor: pointer;
    transition: background 0.12s ease, border-color 0.12s ease;
  }

  .act-btn:hover {
    background: #F1F5F9;
  }

  .play-btn {
    background: #059669;
    color: #FFFFFF;
    border-color: #059669;
    flex: 1;
  }

  .play-btn:hover {
    background: #047857;
  }

  .edit-btn {
    color: #1D4ED8;
    border-color: #BFDBFE;
    background: #EFF6FF;
  }

  .edit-btn:hover {
    background: #DBEAFE;
  }

  .dup-btn {
    color: #475569;
  }

  .icon-only {
    padding: 6px 8px;
  }

  .danger-btn {
    color: #BE123C;
    border-color: #FECDD3;
    background: #FFF1F2;
  }

  .danger-btn:hover {
    background: #FFE4E6;
  }

  .restore-btn {
    color: #64748B;
  }
</style>
