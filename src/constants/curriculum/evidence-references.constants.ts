import type { ActivityCategoryId, ScientificReference } from '../../types/activity.types'

export const SCIENTIFIC_REFERENCES: ScientificReference[] = [
  {
    id: 'ev_dyscalculia_cpa',
    badgeLabel: 'Prática Baseada em Evidência (IES / WWC)',
    framework: 'Sequência Concreto-Pictórico-Abstrato (CPA) & Instrução Explícita',
    citation:
      'Fuchs, L. S., Gersten, R., et al. (2021). Assisting Students Struggling with Mathematics: Intervention in the Elementary Grades (WWC 2021006). IES / What Works Clearinghouse; Gersten et al. (2009), NCEE 2009-4060.',
    recommendedBy: 'Indicado para Psicopedagogia, Neuropsicopedagogia e AEE em Discalculia e TDAH',
    summary:
      'Revisões sistemáticas do What Works Clearinghouse demonstram que representar operações matemáticas com objetos visuais e agrupamentos concretos antes da abstração simbólica reduz a sobrecarga da memória de trabalho e acelera o raciocínio quantitativo.',
    docUrl: 'https://ies.ed.gov/ncee/wwc/PracticeGuide/26',
    docTitle: 'Guia Oficial IES / What Works Clearinghouse (2021)'
  },
  {
    id: 'ev_dyscalculia_subitizing',
    badgeLabel: 'Evidência em Neurociência Cognitiva',
    framework: 'Subitização, Numerosidade e Discriminação de Grandeza',
    citation:
      'Butterworth, B., Varma, S., & Laurillard, D. (2011). Dyscalculia: From brain to education. Science, 332(6033), 1049–1053; Butterworth, B. (2010), Trends in Cognitive Sciences.',
    recommendedBy: 'Indicado para Intervenção Precoce em Discalculia do Desenvolvimento e AEE',
    summary:
      'Estudos em neurociência educacional apontam que o núcleo da discalculia envolve o processamento de conjuntos e magnitudes. O treino visual 1-a-1 de pequenos conjuntos (subitização) e comparação espacial fortalece o senso numérico intuitivo.',
    docUrl: 'https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/rti_math_pg_042109.pdf',
    docTitle: 'Documento Técnico IES / RtI em Matemática (PDF Oficial)'
  },
  {
    id: 'ev_literacy_nrp',
    badgeLabel: 'Consenso Científico (NICHD / NRP)',
    framework: 'Consciência Fonêmica, Método Fônico e Segmentação Silábica',
    citation:
      'National Reading Panel / NICHD-NIH (2000). Teaching Children to Read: An Evidence-Based Assessment of the Scientific Research Literature on Reading and Its Implications for Reading Instruction (NIH Pub. No. 00-4769).',
    recommendedBy: 'Indicado para Fonoaudiologia, Alfabetização Inclusiva e Dislexia/TDAH',
    summary:
      'A meta-análise do National Reading Panel comprovou que o ensino explícito e sistemático da consciência fonêmica (identificação de sons iniciais), correspondência grafema-fonema e segmentação silábica produz ganhos consistentes na decodificação e escrita.',
    docUrl: 'https://www.nichd.nih.gov/publications/pubs/nrp',
    docTitle: 'Publicação Oficial National Reading Panel (NICHD / NIH)'
  },
  {
    id: 'ev_visual_ncaep',
    badgeLabel: 'EBP Reconhecida para TEA (NCAEP / UNC)',
    framework: 'Ensino Estruturado (TEACCH), Suportes Visuais & PECS',
    citation:
      'Steinbrenner, J. R., Hume, K., Odom, S. L., et al. (2020). Evidence-Based Practices for Children, Youth, and Young Adults with Autism. The University of North Carolina at Chapel Hill (NCAEP).',
    recommendedBy: 'Indicado para Atendimento em TEA, Fonoaudiologia CAA e Salas de Recursos (SRM)',
    summary:
      'O relatório NCAEP (síntese de 972 estudos entre 1990 e 2017) classifica Suportes Visuais, Sistemas de Comunicação por Troca de Figuras (PECS — Bondy & Frost) e Ensino Estruturado como Práticas Baseadas em Evidência para autonomia e comunicação no TEA.',
    docUrl: 'https://ncaep.fpg.unc.edu/wp-content/uploads/EBP-Report-2020.pdf',
    docTitle: 'Relatório Oficial NCAEP / UNC — EBP Autism (PDF)'
  },
  {
    id: 'ev_visual_afirm',
    badgeLabel: 'Módulo Clínico Validado (AFIRM / UNC)',
    framework: 'Suportes Visuais (Visual Supports) e Pareamento Estruturado',
    citation:
      'AFIRM Team — Frank Porter Graham Child Development Institute (UNC). Visual Supports & Picture Exchange Communication System (PECS) Modules.',
    recommendedBy: 'Indicado para Terapia Ocupacional, Psicopedagogia e Educação Especial',
    summary:
      'Suportes visuais organizados por pistas concretas reduzem a ansiedade diante de instruções puramente verbais, aproveitando o processamento visual preservado para consolidar pareamento de cores, formas e rotinas.',
    docUrl: 'https://afirm.fpg.unc.edu/visual-supports/',
    docTitle: 'Módulo Oficial AFIRM — Visual Supports (UNC)'
  },
  {
    id: 'ev_emotions_casel',
    badgeLabel: 'Diretriz Socioemocional (CASEL & Pistas Visuais)',
    framework: 'Competências SEL (CASEL) & Reconhecimento Visual de Emoções (Ekman)',
    citation:
      'CASEL — Collaborative for Academic, Social, and Emotional Learning (Fundamentals of SEL); Ekman Facial Affect Taxonomy aplicada com isolamento de pistas visuais em intervenções para TEA (NCAEP, 2020).',
    recommendedBy: 'Indicado para Psicologia Clínica, Neuropsicologia e Treino de Habilidades Sociais',
    summary:
      'Combinar categorias emocionais discretas (alegria, tristeza, raiva, medo) com pistas visuais claras e contextos funcionais desenvolve Autoconsciência e Consciência Social conforme as diretrizes do CASEL e estudos clínicos de TEA.',
    docUrl: 'https://casel.org/fundamentals-of-sel/',
    docTitle: 'Diretriz Oficial CASEL — Fundamentals of SEL'
  },
  {
    id: 'ev_daily_task_analysis',
    badgeLabel: 'EBP Funcional (AFIRM / AOTA OTPF)',
    framework: 'Análise de Tarefas (Task Analysis) & Atividades de Vida Diária (AVDs)',
    citation:
      'AFIRM / UNC — Task Analysis Evidence-Based Practice Module; AOTA — Occupational Therapy Practice Framework (OTPF) & Diretrizes Brasileiras de Educação Inclusiva / DUA (MEC).',
    recommendedBy: 'Indicado para Terapia Ocupacional, AEE e Treino de Autonomia Funcional',
    summary:
      'A Análise de Tarefas aliada a pistas visuais sequenciais reduz a demanda executiva em rotinas cotidianas, segurança, higiene e vida prática, promovendo independência progressiva na escola e em casa.',
    docUrl: 'https://afirm.fpg.unc.edu/task-analysis/',
    docTitle: 'Módulo Oficial AFIRM — Task Analysis (UNC)'
  },
  {
    id: 'ev_bncc_dua',
    badgeLabel: 'Diretriz Nacional Brasileira (MEC / BNCC)',
    framework: 'Educação Especial Inclusiva, AEE e Desenho Universal (DUA)',
    citation:
      'Brasil / MEC — Base Nacional Comum Curricular (BNCC), Política Nacional de Educação Especial Inclusiva (PNEEI) e Lei nº 12.764/2012 com flexibilização curricular por DUA e PEI.',
    recommendedBy: 'Indicado para AEE, Salas de Recursos Multifuncionais (SRM) e Coordenação Pedagógica',
    summary:
      'Alinhado às normativas brasileiras de Educação Especial Inclusiva e ao Desenho Universal para a Aprendizagem (DUA), garantindo múltiplas representações visuais, auditivas e táteis sem barreiras comunicacionais.',
    docUrl: 'https://www.gov.br/mec/pt-br',
    docTitle: 'Portal Oficial MEC — Educação Especial & BNCC'
  }
]

export const EVIDENCE_MAP: Record<string, ScientificReference> =
  SCIENTIFIC_REFERENCES.reduce(
    (acc, ref) => {
      acc[ref.id] = ref
      return acc
    },
    {} as Record<string, ScientificReference>
  )

const CATEGORY_DEFAULT_EVIDENCE: Record<ActivityCategoryId, string> = {
  dyscalculia: 'ev_dyscalculia_cpa',
  literacy: 'ev_literacy_nrp',
  visual_perception: 'ev_visual_afirm',
  social_emotions: 'ev_emotions_casel',
  daily_logic: 'ev_daily_task_analysis'
}

export function resolveActivityEvidence(
  evidenceId?: string,
  categoryId?: ActivityCategoryId
): ScientificReference {
  if (evidenceId && EVIDENCE_MAP[evidenceId]) {
    return EVIDENCE_MAP[evidenceId]
  }
  if (categoryId && CATEGORY_DEFAULT_EVIDENCE[categoryId]) {
    return EVIDENCE_MAP[CATEGORY_DEFAULT_EVIDENCE[categoryId]]
  }
  return SCIENTIFIC_REFERENCES[0]
}
