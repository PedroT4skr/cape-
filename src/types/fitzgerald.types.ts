/**
 * Categorias gramaticais baseadas na Chave de Fitzgerald Modificada (ARASAAC / CAA)
 */
export type FitzgeraldCategory =
  | 'PERSON'       // Pessoas e Pronomes Pessoais (Amarelo)
  | 'VERB'         // Verbos e Ações (Verde)
  | 'NOUN'         // Substantivos: Coisas, Alimentos e Lugares (Laranja)
  | 'DESCRIPTIVE'  // Adjetivos, Descritivos e Sentimentos (Azul)
  | 'SOCIAL'       // Palavras Sociais, Cortesia e Respostas (Rosa / Roxo)
  | 'MISC'         // Diversos, Preposições e Conectivos (Branco / Neutro)

export interface FitzgeraldColorStyle {
  bg: string
  border: string
  text: string
  label: string
}
