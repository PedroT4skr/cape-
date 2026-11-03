# Suíte Pedagógica CAPE

> Plataforma PWA Multifuncional de Tecnologia Assistiva e Educação Especial desenvolvida para o **Centro de Apoio Pedagógico Especializado (CAPE)** de Vitória da Conquista - BA.

---

## 🌟 Módulos da Suíte

### 1. 🗣️ Comunicação Alternativa e Ampliada (CAA)
- **Substituição de Pastas Físicas PECS:** Prancha digital tátil e responsiva para alunos não-verbais e no espectro autista (TEA).
- **Código Cromático Fitzgerald:** Categorização morfossintática estrita (pessoas em amarelo, ações em verde, substantivos em laranja, etc.).
- **Voz Neural:** Vocalização natural da frase montada com Edge-TTS e fallback nativo (Web Speech API).
- **Painel do Terapeuta (PIN 1234):** Gestão de pranchas, inclusão de células, ajuste de velocidade/tom de voz e persistência no IndexedDB via Dexie.js.

### 2. 🧩 Atividades Cognitivas
- **Alfabetização Fonológica:** Letra inicial, sílaba inicial e pareamento palavra-imagem.
- **Percepção Visual:** Discriminação de cores, formas geométricas e rotinas diárias.
- **Apoio à Discalculia:** Exercícios estruturados no método CPA (Concreto, Pictórico e Abstrato).

### 3. ⚡ Quiz Matemático Gamificado para TDAH
- **3 Níveis Procedurais:** Iniciante (soma/subtração), Intermediário (4 operações mistas) e Difícil (equações de 1º grau, %, potências, P.A. e funções).
- **Cronômetro sem Bloqueio:** O aluno nunca é interrompido ao zerar o tempo; acertos fora do prazo sofrem decréscimo positivo de **40% a 50%**.
- **Direcionamento Ativo:** O botão "PRÓXIMA QUESTÃO" só é habilitado após selecionar uma opção, passando a pulsar em verde para reter o foco.
- **Leaderboard Assíncrono:** Tela de notas e pódios para premiação com exportação em CSV.

---

## 🏁 Como Executar Localmente

### Pré-requisitos
- Node.js 18+
- pnpm (ou npm)

```bash
# 1. Instalar dependências
pnpm install

# 2. Executar testes de domínio
pnpm exec vitest run

# 3. Iniciar servidor de desenvolvimento
pnpm dev

# 4. Gerar build de produção
pnpm build
```

---

## 🔒 Credenciais Padrão

- **PIN do Terapeuta / Painel Geral:** `1234`
- **PIN do Professor / Ranking TDAH:** `1234`
