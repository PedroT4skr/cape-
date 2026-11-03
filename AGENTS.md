# AGENTS.MD - Documentação Técnica e Arquitetural: Suíte CAPE Integrada

> **Instituição:** CAPE (Centro de Apoio Pedagógico Especializado) de Vitória da Conquista - BA  
> **Propósito:** Plataforma PWA Multifuncional de Tecnologia Assistiva e Educação Especial:  
> 1. **Comunicação Alternativa e Ampliada (CAA):** Pranchas de pictogramas, chave de Fitzgerald e voz neural.  
> 2. **Atividades Cognitivas:** Alfabetização, percepção visual e apoio à discalculia.  
> 3. **Quiz Matemático TDAH:** Cálculo rápido gamificado em 3 níveis com cronômetro sem bloqueio e penalidade positiva.  
> **Versão:** 5.0.0 (Unificação da Suíte CAPE: Hub Central, CAA, Atividades Didáticas e Quiz Matemático TDAH)

---

## 1. Regras de Negócio e Princípios Arquiteturais Inegociáveis

1. **Modularidade e Clean Code:** Nenhum arquivo deve ser longo ou monolítico. Todo componente, gerador e serviço possui responsabilidade única e desacoplada.
2. **Offline-First Nativo (PWA):** A aplicação funciona plenamente sem conexão de rede (pranchas em Dexie.js e rankings em localStorage).
3. **Módulo 1: Comunicação Alternativa (CAA):**
   - Chave de Fitzgerald semântica para categorização visual das células.
   - Barra de frases com síntese de voz (Edge-TTS via WebSocket e fallback Web Speech).
   - Prevenção de toques involuntários com throttle de 300ms.
4. **Módulo 2: Atividades Cognitivas:**
   - Currículos modulares para Alfabetização Fonológica, Percepção Visual e Discalculia (Método CPA).
   - Telas dedicadas e feedback de reforço positivo com comemorações.
5. **Módulo 3: Quiz Matemático Adaptado para TDAH:**
   - **3 Dificuldades Modulares:** Iniciante (soma/subtração), Intermediário (4 operações mistas e ordem) e Difícil (equações de 1º grau, %, potências, PA e funções).
   - **Mecânica sem Bloqueio Cognitivo:** O aluno nunca é travado ao zerar o tempo; acertos após o tempo zerar sofrem decréscimo progressivo de 40% a 50%.
   - **Direcionamento de Ação (UI):** O botão "PRÓXIMA QUESTÃO" permanece inativo (cinza) até que uma alternativa seja marcada, passando a pulsar continuamente em verde (`@keyframes pulse-cta`).
   - **Leaderboard Assíncrono do Professor:** Quadro de líderes protegido por PIN (`1234`), filtros por categoria e exportação CSV.
6. **Hub Central & Navegação Unificada:**
   - Alternância fluida entre módulos através do cabeçalho global e do Hub Portal.

---

## 2. Mapa de Módulos, Funções e Arquivos

### Camada de Tipos (`src/types/`)
- [`fitzgerald.types.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/types/fitzgerald.types.ts): Categorias e cores de Fitzgerald.
- [`board.types.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/types/board.types.ts): Modelos de Prancha, Células e Frases.
- [`activity.types.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/types/activity.types.ts): Atividades pedagógicas e níveis curriculares.
- [`quiz.types.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/types/quiz.types.ts): Definições do Quiz TDAH (`Difficulty`, `Question`, `AnswerRecord`, `ScoreBreakdown`, `LeaderboardEntry`).

### Camada de Domínio & Matemática Pura (`src/domain/`)
- [`scoring.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/domain/scoring.ts): Cálculo de penalidade pós-tempo (40%-50%), bônus de velocidade e pontuação final.
- [`questionFactory.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/domain/questionFactory.ts): Gerador de rodadas matemáticas procedurais sem duplicação de enunciados.
- [`generators/beginner.generator.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/domain/generators/beginner.generator.ts): Somas, subtrações, termos faltantes e historinhas.
- [`generators/intermediate.generator.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/domain/generators/intermediate.generator.ts): 4 operações e ordem das operações.
- [`generators/advanced.generator.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/domain/generators/advanced.generator.ts): Equações, porcentagem, potências, P.A. e funções.

### Camada de Gerenciamento de Estado (`src/stores/`)
- [`navigation.store.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/navigation.store.ts): Controla a visão ativa (`hub`, `board`, `activities`, `quiz`, `admin`).
- [`board.store.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/board.store.ts): Pranchas e navegação hierárquica.
- [`sentence.store.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/sentence.store.ts): Construção e vocalização de frases.
- [`activity.store.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/activity.store.ts): Sessões de exercícios didáticos.
- [`admin.store.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/admin.store.ts): Modo terapeuta e PIN challenge.
- [`quiz.store.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/quiz.store.ts): Máquina de estados reativa do Quiz TDAH, cronômetro e ranking.

### Camada de Componentes de Interface (`src/components/`)
- **Navegação & Hub (`common/`):**
  - [`Header.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/common/Header.svelte): Cabeçalho unificado com atalhos para Quiz TDAH, Atividades, Painel e Hub.
  - [`HubPortal.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/common/HubPortal.svelte): Portal de entrada da Suíte CAPE com cards informativos.
- **Prancha & Frases (`board/` & `sentence-bar/`):**
  - Grid de células táteis e barra de vocalização com TTS.
- **Atividades Didáticas (`activities/`):**
  - `ActivitiesPage.svelte` e `DyscalculiaPlayer.svelte`.
- **Quiz Matemático TDAH (`quiz/`):**
  - [`MathQuizView.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/quiz/MathQuizView.svelte): Container do Quiz em tela cheia com botão de retorno.
  - [`StartScreen.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/quiz/StartScreen.svelte): Entrada de nome e seleção de nível.
  - [`DifficultyCard.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/quiz/DifficultyCard.svelte): Card visual dos 3 níveis.
  - [`QuizPlayView.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/quiz/QuizPlayView.svelte): Execução da rodada com atalhos de teclado.
  - [`TimerBar.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/quiz/TimerBar.svelte): Barra de tempo com alerta pós-tempo.
  - [`QuestionCard.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/quiz/QuestionCard.svelte): Expressões destacadas com tipografia gigante.
  - [`OptionButton.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/quiz/OptionButton.svelte): Alternativas de alto contraste.
  - [`NextButton.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/quiz/NextButton.svelte): Botão verde com pulso contínuo após seleção.
  - [`ResultScreen.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/quiz/ResultScreen.svelte): Revisão pedagógica questão por questão.
  - [`TeacherGate.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/quiz/TeacherGate.svelte): PIN `1234` com teclado touch.
  - [`LeaderboardView.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/quiz/LeaderboardView.svelte): Pódios e exportação CSV.

---

## 3. Histórico de Versões

- **v5.0.0 (Unificação da Suíte CAPE):**
  - Integração da **Prancha de Comunicação CAA** e do **Quiz Matemático TDAH** sob a mesma plataforma.
  - Criação do **Hub Portal Central** e atualização do `Header.svelte` com navegação rápida entre todos os módulos.
  - Preservação integral do banco de dados Dexie.js e da sintetização de voz neural Edge-TTS.
  - Cobertura completa de testes automatizados com Vitest.
