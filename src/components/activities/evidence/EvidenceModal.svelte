<script lang="ts">
  import type { ScientificReference } from '../../../types/activity.types'
  import { SCIENTIFIC_REFERENCES } from '../../../constants/curriculum/evidence-references.constants'
  import Modal from '../../common/Modal.svelte'
  import { BookOpen, ExternalLink, ShieldCheck, Users } from '@lucide/svelte'

  interface Props {
    isOpen: boolean
    reference: ScientificReference | null
    contextTitle?: string
    onClose: () => void
  }

  let { isOpen, reference, contextTitle, onClose }: Props = $props()

  let showAllReferences = $state(false)

  $effect(() => {
    if (isOpen) {
      showAllReferences = reference === null
    }
  })

  let displayedRefs = $derived(
    showAllReferences || !reference ? SCIENTIFIC_REFERENCES : [reference]
  )
</script>

<Modal
  {isOpen}
  title={showAllReferences || !reference
    ? 'Fundamentação Científica & Diretrizes Profissionais'
    : `Base Científica — ${contextTitle || 'Atividade'}`}
  {onClose}
  maxWidth="760px"
>
  <div class="evidence-body">
    <div class="disclaimer-banner">
      <ShieldCheck size={20} color="#059669" class="shrink-0" />
      <p>
        As atividades deste banco aplicam <strong>Práticas Baseadas em Evidência (EBP)</strong> e diretrizes clínicas/educacionais reconhecidas internacionalmente para AEE, Psicopedagogia, Fonoaudiologia e Terapia Ocupacional.
      </p>
    </div>

    <div class="refs-list">
      {#each displayedRefs as ref (ref.id)}
        <article class="ref-card">
          <div class="ref-top">
            <span class="ref-badge">{ref.badgeLabel}</span>
            <h3 class="ref-framework">{ref.framework}</h3>
          </div>

          <div class="ref-indication">
            <Users size={15} color="#1D4ED8" />
            <span>{ref.recommendedBy}</span>
          </div>

          <p class="ref-summary">{ref.summary}</p>

          <div class="ref-citation-box">
            <div class="citation-label">
              <BookOpen size={14} />
              <span>Referência Bibliográfica / Diretriz:</span>
            </div>
            <p class="citation-text">{ref.citation}</p>
          </div>

          <div class="ref-actions">
            <a
              href={ref.docUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="doc-link-btn"
            >
              <span>{ref.docTitle}</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </article>
      {/each}
    </div>

    <footer class="evidence-footer">
      {#if reference && !showAllReferences}
        <button type="button" class="toggle-all-btn" onclick={() => (showAllReferences = true)}>
          Ver Todas as {SCIENTIFIC_REFERENCES.length} Referências Científicas
        </button>
      {:else if reference && showAllReferences}
        <button type="button" class="toggle-all-btn" onclick={() => (showAllReferences = false)}>
          Ver Apenas Esta Atividade
        </button>
      {/if}
      <button type="button" class="close-modal-btn" onclick={onClose}>
        FECHAR
      </button>
    </footer>
  </div>
</Modal>

<style>
  .evidence-body {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .disclaimer-banner {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background: #ECFDF5;
    border: 1.5px solid #A7F3D0;
    color: #065F46;
    border-radius: 12px;
    padding: 10px 14px;
    font-size: 0.84rem;
    line-height: 1.4;
  }

  .disclaimer-banner p {
    margin: 0;
  }

  .refs-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .ref-card {
    background: #FFFFFF;
    border: 2px solid #E2E8F0;
    border-radius: 14px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .ref-top {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .ref-badge {
    width: fit-content;
    background: #EFF6FF;
    color: #1D4ED8;
    border: 1px solid #BFDBFE;
    font-size: 0.72rem;
    font-weight: 900;
    padding: 2px 9px;
    border-radius: 999px;
    text-transform: uppercase;
  }

  .ref-framework {
    margin: 0;
    font-size: 1.02rem;
    font-weight: 900;
    color: #0F172A;
  }

  .ref-indication {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.82rem;
    font-weight: 800;
    color: #1E40AF;
    background: #F8FAFC;
    padding: 6px 10px;
    border-radius: 8px;
    border: 1px solid #E2E8F0;
  }

  .ref-summary {
    margin: 0;
    font-size: 0.86rem;
    color: #334155;
    line-height: 1.45;
  }

  .ref-citation-box {
    background: #F8FAFC;
    border-left: 3.5px solid #64748B;
    border-radius: 6px;
    padding: 8px 12px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .citation-label {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.72rem;
    font-weight: 850;
    color: #475569;
    text-transform: uppercase;
  }

  .citation-text {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 600;
    color: #1E293B;
    line-height: 1.35;
  }

  .ref-actions {
    display: flex;
    justify-content: flex-start;
  }

  .doc-link-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #2563EB;
    color: #FFFFFF;
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 850;
    padding: 7px 13px;
    border-radius: 9px;
    transition: background 0.15s ease;
  }

  .doc-link-btn:hover {
    background: #1D4ED8;
  }

  .evidence-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
    padding-top: 8px;
    border-top: 1px solid #E2E8F0;
  }

  .toggle-all-btn {
    background: #F1F5F9;
    border: 1.5px solid #CBD5E1;
    color: #334155;
    border-radius: 9px;
    padding: 8px 14px;
    font-size: 0.8rem;
    font-weight: 850;
    cursor: pointer;
  }

  .close-modal-btn {
    background: #0F172A;
    color: #FFFFFF;
    border: none;
    border-radius: 9px;
    padding: 9px 18px;
    font-size: 0.84rem;
    font-weight: 900;
    cursor: pointer;
    margin-left: auto;
  }
</style>
