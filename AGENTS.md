# AGENTS.MD - Documentação Técnica e Arquitetural: Suíte CAPE Integrada

> **Instituição:** CAPE (Centro de Apoio Pedagógico Especializado) de Vitória da Conquista - BA  
> **Propósito:** Plataforma PWA Multifuncional de Tecnologia Assistiva e Educação Especial:  
> 1. **Comunicação Alternativa e Ampliada (CAA):** Pranchas de pictogramas, chave de Fitzgerald e voz neural.  
> 2. **Atividades Cognitivas:** Alfabetização, percepção visual e apoio à discalculia.  
> 3. **Quiz Matemático TDAH:** Cálculo rápido gamificado em 3 níveis com cronômetro sem bloqueio e penalidade positiva.  
> **Versão:** 5.1.0 (Troca e Gestão Segura de PIN no Painel do Terapeuta & Suíte CAPE Integrada)

---

## 1. Regras de Negócio e Princípios Arquiteturais Inegociáveis

1. **Modularidade e Clean Code:** Nenhum arquivo deve ser longo ou monolítico. Todo componente, gerador e serviço possui responsabilidade única e desacoplada.
2. **Offline-First Nativo (PWA):** A aplicação funciona plenamente sem conexão de rede (pranchas em Dexie.js, PIN e rankings em localStorage).
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
   - **Leaderboard Assíncrono do Professor:** Quadro de líderes protegido por PIN, filtros por categoria e exportação CSV.
6. **Módulo 4: Segurança & Gestão de PIN do Painel:**
   - O PIN de acesso ao painel pode ser alterado a qualquer momento em **Sistema & Ajustes** (`PinSettings.svelte`).
   - Exige autenticação com o PIN atual antes de gravar o novo PIN (4 a 8 dígitos numéricos).
   - Permite restauração direta para o PIN de fábrica do CAPE (`1234`).
7. **Hub Central & Navegação Unificada:**
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

### Camada de Utilidades de Segurança (`src/utils/`)
- [`pin.utils.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/utils/pin.utils.ts): Funções `getCurrentPin()`, `setCustomPin(newPin)`, `resetPinToDefault()`, `validatePin(inputPin)` e `generateMathChallenge()`.
- [`pin.utils.test.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/utils/pin.utils.test.ts): Cobertura completa de testes unitários para ciclo de vida do PIN.

### Camada de Gerenciamento de Estado (`src/stores/`)
- [`navigation.store.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/navigation.store.ts): Controla a visão ativa (`hub`, `board`, `activities`, `quiz`, `admin`).
- [`board.store.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/board.store.ts): Pranchas e navegação hierárquica.
- [`sentence.store.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/sentence.store.ts): Construção e vocalização de frases.
- [`activity.store.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/activity.store.ts): Sessões de exercícios didáticos.
- [`admin.store.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/admin.store.ts): Modo terapeuta e validação reativa com PIN dinâmico.
- [`quiz.store.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/quiz.store.ts): Máquina de estados reativa do Quiz TDAH, cronômetro e ranking.

### Camada de Componentes de Interface (`src/components/`)
- **Navegação & Hub (`common/`):**
  - [`Header.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/common/Header.svelte): Cabeçalho unificado com atalhos para Quiz TDAH, Atividades, Painel e Hub.
  - [`HubPortal.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/common/HubPortal.svelte): Portal de entrada da Suíte CAPE com cards informativos.
- **Painel do Terapeuta & Segurança (`admin/`):**
  - [`PinSettings.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/admin/PinSettings.svelte): Formulário para troca de PIN com verificação do PIN atual, confirmação e restauração de fábrica.
  - [`TherapistSystemTab.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/admin/TherapistSystemTab.svelte): Aba de ajustes de voz neural, segurança de PIN, memória e reset.
- **Quiz Matemático TDAH (`quiz/`):**
  - Componentes modulares de cálculo adaptado (`StartScreen`, `DifficultyCard`, `QuizPlayView`, `TimerBar`, `QuestionCard`, `OptionButton`, `NextButton`, `ResultScreen`, `TeacherGate`, `LeaderboardView`).

---

## 3. Histórico de Versões

- **v5.1.0 (Troca e Gestão do PIN do Painel):**
  - Adicionado componente modular [`PinSettings.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/admin/PinSettings.svelte) na aba **Sistema & Ajustes** do painel do terapeuta.
  - Persistência desacoplada em `localStorage` (`cape:admin:pin:v1`) com suporte a restauração do PIN padrão (`1234`).
  - Cobertura de testes unitários em `pin.utils.test.ts`.
