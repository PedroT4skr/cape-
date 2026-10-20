import type { FitzgeraldCategory } from '../types/fitzgerald.types'

export interface ArasaacSearchResult {
  id: number
  keyword: string
  imageUrl: string
  suggestedCategory: FitzgeraldCategory
}

/**
 * Mapeia termos comuns para categorias gramaticais da Chave de Fitzgerald Modificada
 */
function inferFitzgeraldCategory(keyword: string): FitzgeraldCategory {
  const lower = keyword.toLowerCase()

  const persons = ['eu', 'você', 'ele', 'ela', 'mãe', 'pai', 'professor', 'amigo', 'criança', 'médico']
  if (persons.some((p) => lower.includes(p))) return 'PERSON'

  const verbs = ['comer', 'beber', 'dormir', 'brincar', 'ir', 'querer', 'gostar', 'falar', 'olhar', 'pegar', 'andar']
  if (verbs.some((v) => lower.includes(v))) return 'VERB'

  const descriptives = ['feliz', 'triste', 'dor', 'cansado', 'bravo', 'grande', 'pequeno', 'quente', 'frio', 'bom', 'ruim']
  if (descriptives.some((d) => lower.includes(d))) return 'DESCRIPTIVE'

  const socials = ['sim', 'não', 'obrigado', 'por favor', 'olá', 'tchau', 'ajuda', 'desculpa', 'socorro']
  if (socials.some((s) => lower.includes(s))) return 'SOCIAL'

  // Padrão geral: substantivo
  return 'NOUN'
}

/**
 * Consulta a API pública do ARASAAC no idioma Português
 */
export async function searchArasaac(term: string): Promise<ArasaacSearchResult[]> {
  if (!term.trim()) return []

  try {
    const encoded = encodeURIComponent(term.trim().toLowerCase())
    const res = await fetch(`https://api.arasaac.org/api/pictograms/pt/search/${encoded}`)
    if (!res.ok) return []

    const data = await res.json()
    if (!Array.isArray(data)) return []

    return data.slice(0, 12).map((item) => {
      const id = item._id || item.id
      const keyword = item.keywords?.[0]?.keyword || item.keyword || term
      return {
        id,
        keyword,
        imageUrl: `https://api.arasaac.org/api/pictograms/${id}?download=false&color=true`,
        suggestedCategory: inferFitzgeraldCategory(keyword)
      }
    })
  } catch (error) {
    console.warn('Falha na conexão com a API ARASAAC (modo offline ativo):', error)
    return []
  }
}
