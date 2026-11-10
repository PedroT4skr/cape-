# AGENTS.MD - Documentação Técnica e Arquitetural: Suíte CAPE Integrada

> **Instituição:** CAPE (Centro de Apoio Pedagógico Especializado) de Vitória da Conquista - BA  
> **Propósito:** Plataforma PWA Multifuncional de Tecnologia Assistiva e Educação Especial:  
> 1. **Comunicação Alternativa e Ampliada (CAA):** Pranchas de pictogramas, chave de Fitzgerald e voz neural.  
> 2. **Atividades Cognitivas:** Alfabetização, percepção visual e apoio à discalculia.  
> 3. **Quiz Matemático TDAH:** Cálculo rápido gamificado em 3 níveis com cronômetro sem bloqueio e penalidade positiva.  
> **Versão:** 5.3.0 (Otimização Completa de Responsividade Mobile em Toda a Suíte CAPE)

---

## 1. Regras de Negócio e Princípios Arquiteturais Inegociáveis

1. **Modularidade e Clean Code:** Nenhum arquivo deve ser longo ou monolítico. Todo componente, gerador e serviço possui responsabilidade única e desacoplada.
2. **Offline-First Nativo (PWA):** A aplicação funciona plenamente sem conexão de rede (pranchas em Dexie.js, PIN e rankings em localStorage).
3. **Feedback Auditivo Universal TDAH / Acessibilidade:**
   - **Toda e qualquer interação de clique** (botões, links, alternativas, abas, cards e células) emite um clique sonoro tátil suave (*pop/tap* sintético via Web Audio API pura).
   - Gerenciado de forma não-intrusiva por [`ui-sound-manager.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/services/ui-sound-manager.ts) com throttle de 60ms para evitar poluição acústica ou eco de duplo toque.
4. **Design Responsivo Universal (Mobile & Tablets Compactos):**
   - Suporte refinado para telas estreitas (320px–480px) e alturas reduzidas (600px–720px / landscape mobile).
   - Teclados numéricos compactos (40px de altura de tecla), display enxuto de PIN, modais com `max-height: 94dvh` e scroll interno suave.
   - Botões de alternativas do quiz com altura otimizada (50px) para que todas as 4 alternativas caibam na viewport sem empurrar o CTA para fora da tela.
5. **Módulo 1: Comunicação Alternativa (CAA):**
   - Chave de Fitzgerald semântica para categorização visual das células.
   - Barra de frases com síntese de voz (Edge-TTS via WebSocket e fallback Web Speech).
   - Prevenção de toques involuntários com throttle de 300ms.
6. **Módulo 2: Atividades Cognitivas:**
   - Currículos modulares para Alfabetização Fonológica, Percepção Visual e Discalculia (Método CPA).
   - Telas dedicadas e feedback de reforço positivo com comemorações.
7. **Módulo 3: Quiz Matemático Adaptado para TDAH:**
   - **3 Dificuldades Modulares:** Iniciante (soma/subtração - 45s), Intermediário (4 operações mistas e ordem - 60s) e Difícil (equações de 1º grau, %, potências, PA e funções - 90s).
   - **Enunciado Acessível de Alto Contraste:** Tipografia ampliada com destaque colorido automático para números, operadores e palavras-chave no enunciado.
   - **Mecânica sem Bloqueio Cognitivo & Retrocesso com 50% dos Pontos:** O aluno nunca é travado ao zerar o tempo (decréscimo progressivo de 40% a 50%); ao retroceder uma questão (`← Anterior`), a questão revisitada passa a valer exatamente metade da pontuação base (50%).
   - **Direcionamento de Ação (UI):** O botão "PRÓXIMA QUESTÃO" permanece inativo (cinza) até que uma alternativa seja marcada, passando a pulsar continuamente em verde (`@keyframes pulse-cta`).
   - **Ranking Final & Leaderboard do Professor:** Exibição direta do Ranking Final na tela de conclusão (mostrando posição, aluno, nível selecionado, acertos e pontos), além do painel completo do professor protegido por PIN com filtros e exportação CSV.
8. **Módulo 4: Segurança & Gestão de PIN do Painel:**
   - O PIN de acesso ao painel pode ser alterado a qualquer momento em **Sistema & Ajustes** (`PinSettings.svelte`).
   - Exige autenticação com o PIN atual antes de gravar o novo PIN (4 a 8 dígitos numéricos).
   - Permite restauração direta para o PIN de fábrica do CAPE (`1234`).
9. **Hub Central & Navegação Unificada:**
   - Alternância fluida entre módulos através do cabeçalho global e do Hub Portal.

---

## 2. Mapa de Módulos, Funções e Arquivos

### Camada de Serviços de Áudio & Feedback (`src/services/`)
- [`sound-effects.service.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/services/sound-effects.service.ts): Sintetizador Web Audio API (`playTapSound`, `playActionSound`, `playClearSound`, `playSuccessChime`, `playGentleRetry`).
- [`ui-sound-manager.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/services/ui-sound-manager.ts): Interceptador global de eventos `pointerdown` para emitir som em botões e elementos táteis com throttle.
- [`ui-sound-manager.test.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/services/ui-sound-manager.test.ts): Cobertura de testes unitários do interceptador sonoro.

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

---

## 3. Histórico de Versões

- **v5.3.0 (Responsividade Universal em Dispositivos Móveis):**
  - Otimização responsiva nos modais de PIN (`TeacherGate.svelte`, `PinChallengeModal.svelte`) com botões reduzidos (40px) e controle de altura (`94dvh`).
  - Redimensionamento e layout em grade responsiva no Quiz TDAH (`StartScreen.svelte`, `DifficultyCard.svelte`, `QuestionCard.svelte`, `OptionButton.svelte`, `QuizPlayView.svelte`, `ResultScreen.svelte`, `LeaderboardView.svelte`).
  - Ajustes de densidade no Hub Portal e painéis de administração em telas menores que 640px.
- **v5.2.0 (Feedback Auditivo Universal & Redesign Gamificado):**
  - Implementado [`ui-sound-manager.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/services/ui-sound-manager.ts) para resposta auditiva tátil instantânea em todos os cliques do aplicativo.
  - Redesign completo dos cards de dificuldade e da tela inicial do Quiz Matemático TDAH.
- **v5.1.0 (Troca e Gestão do PIN do Painel):**
  - Adicionado componente modular [`PinSettings.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/admin/PinSettings.svelte) na aba **Sistema & Ajustes** do painel do terapeuta.
- **v5.0.0 (Unificação da Suíte CAPE):**
  - Integração da **Prancha de Comunicação CAA** e do **Quiz Matemático TDAH** sob a mesma plataforma.
