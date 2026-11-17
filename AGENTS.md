# AGENTS.MD - Documentação Técnica e Arquitetural: Suíte CAPE Integrada

> **Instituição:** CAPE (Centro de Apoio Pedagógico Especializado) de Vitória da Conquista - BA  
> **Propósito:** Plataforma PWA Multifuncional de Tecnologia Assistiva e Educação Especial:  
> 1. **Comunicação Alternativa e Ampliada (CAA):** Pranchas de pictogramas, chave de Fitzgerald e voz neural.  
> 2. **Atividades Cognitivas:** Alfabetização, percepção visual e apoio à discalculia.  
> 3. **Quiz Matemático TDAH:** Cálculo rápido gamificado em 3 níveis com cronômetro sem bloqueio e penalidade positiva.  
> **Versão:** 5.5.0 (Banco com 50 Atividades Psicopedagógicas & Fundamentação Científica EBP)

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
6. **Módulo 2: Atividades Cognitivas & Banco Psicopedagógico:**
   - **5 Categorias Modulares (50 atividades iniciais — 10 por categoria):** Discalculia, Alfabetização, Percepção Visual, Emoções & Social, e Lógica & Vida Diária.
   - **Fundamentação Científica & Práticas Baseadas em Evidência (EBP):** Cada categoria e atividade vincula-se a diretrizes/estudos verificados (`ScientificReference` em `evidence-references.constants.ts` — IES/WWC, Butterworth, NICHD/NRP, UNC NCAEP, AFIRM, CASEL, AOTA, MEC/BNCC), acessíveis via `EvidenceModal.svelte` no catálogo e painel do terapeuta, preservando a tela do aluno (`DyscalculiaPlayer.svelte`) livre de poluição visual.
   - **Persistência Offline-First (`Dexie.js v2`):** Tabela `activities` populada e atualizada incrementalmente (`seedActivitiesIfNeeded`) preservando customizações locais e integrada ao backup JSON.
   - **Curadoria e Edição do Terapeuta (`BANCO DE ATIVIDADES`):** Busca, filtro por área/origem, ativação seletiva (`Ativa para o Aluno`), duplicação como modelo, criação de novas atividades (com seleção da base científica) e editor completo de questões com geração automática de alternativas.
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

### Camada de Persistência & Repositórios (`src/db/`)
- [`db.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/db/db.ts): Banco IndexedDB (`Dexie v2`) com tabelas `boards`, `cells`, `mediaCache` e `activities`.
- [`activities.repository.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/db/activities.repository.ts): CRUD completo de atividades, ativação individual/em lote, clonagem e restauração de padrão.

### Camada de Currículo Modular (`src/constants/curriculum/`)
- [`evidence-references.constants.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/constants/curriculum/evidence-references.constants.ts): Catálogo com 8 referências científicas verificadas (`SCIENTIFIC_REFERENCES`, `EVIDENCE_MAP`) e `resolveActivityEvidence()`.
- [`curriculum.helpers.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/constants/curriculum/curriculum.helpers.ts): Construtores modulares reutilizáveis (`buildActivity`, `qCount`, `qAdd`, `qComp`, `qLetter`, `qSyllable`, `qWord`, `qMatch`, `qRoutine`, etc.) para padronizar as atividades sem duplicação de código.
- [`activity-categories.constants.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/constants/curriculum/activity-categories.constants.ts): Definições das 5 áreas psicopedagógicas com `defaultEvidenceId`.
- [`dyscalculia.curriculum.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/constants/curriculum/dyscalculia.curriculum.ts), [`literacy.curriculum.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/constants/curriculum/literacy.curriculum.ts), [`visual.curriculum.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/constants/curriculum/visual.curriculum.ts), [`social-emotions.curriculum.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/constants/curriculum/social-emotions.curriculum.ts), [`daily-logic.curriculum.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/constants/curriculum/daily-logic.curriculum.ts): Banco inicial com 50 atividades curadas (10 por categoria), todas vinculadas a diretrizes EBP.
- [`activity-bank.seed.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/constants/curriculum/activity-bank.seed.ts): Agregador de semente do banco inicial.

### Camada de Utilidades de Segurança (`src/utils/`)
- [`pin.utils.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/utils/pin.utils.ts): Funções `getCurrentPin()`, `setCustomPin(newPin)`, `resetPinToDefault()`, `validatePin(inputPin)` e `generateMathChallenge()`.
- [`pin.utils.test.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/utils/pin.utils.test.ts): Cobertura completa de testes unitários para ciclo de vida do PIN.
- [`activity-question.factory.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/utils/activity-question.factory.ts): Templates de questões, geração automática de alternativas, clonagem e validação de integridade.
- [`activity-question.factory.test.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/utils/activity-question.factory.test.ts): Testes unitários para geração, clonagem e validação.

### Camada de Gerenciamento de Estado (`src/stores/`)
- [`navigation.store.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/navigation.store.ts): Controla a visão ativa (`hub`, `board`, `activities`, `quiz`, `admin`).
- [`board.store.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/board.store.ts): Pranchas e navegação hierárquica.
- [`sentence.store.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/sentence.store.ts): Construção e vocalização de frases.
- [`activity-bank.store.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/activity-bank.store.ts): Catálogo reativo, filtragem de atividades habilitadas para o aluno e operações CRUD no Dexie.
- [`activity.store.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/activity.store.ts): Sessões de exercícios didáticos carregadas dinamicamente do `$activityBank`.
- [`admin.store.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/admin.store.ts): Modo terapeuta e validação reativa com PIN dinâmico.
- [`quiz.store.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/quiz.store.ts): Máquina de estados reativa do Quiz TDAH, cronômetro e ranking.

### Camada do Banco & Editor do Terapeuta (`src/components/admin/activities-bank/`)
- [`TherapistActivityBankTab.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/admin/activities-bank/TherapistActivityBankTab.svelte): Busca, filtros por categoria/status, seleção em lote e criação.
- [`BankActivityCard.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/admin/activities-bank/BankActivityCard.svelte): Card com toggle "Ativa para o Aluno", aplicar, editar, duplicar e excluir/restaurar.
- [`ActivityEditorModal.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/admin/activities-bank/ActivityEditorModal.svelte): Editor de metadados e lista reordenável de questões.
- [`QuestionEditorPanel.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/admin/activities-bank/QuestionEditorPanel.svelte) & [`QuestionTemplateFields.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/admin/activities-bank/QuestionTemplateFields.svelte): Construtor por modelo de exercício e editor uniforme de alternativas.

### Camada de Atividades Cognitivas & Player Modular (`src/components/activities/`)
- [`DyscalculiaPlayer.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/activities/DyscalculiaPlayer.svelte): Orquestrador responsivo do player de atividades (`margin: auto` + rolagem segura na área de palco sem cortes verticais).
- [`player/PlayerHeader.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/activities/player/PlayerHeader.svelte): Barra superior com sair, progresso e repetição em áudio.
- [`player/PlayerOptions.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/activities/player/PlayerOptions.svelte): Botões táteis em grade de largura igualitária (`minmax(0, 1fr)`) com quebra limpa de múltiplos emojis no hint.
- [`ActivityQuestionView.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/activities/ActivityQuestionView.svelte): Roteador enxuto entre os cenários concretos.
- [`dyscalculia/CountStage.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/activities/dyscalculia/CountStage.svelte): Nível 1 (Contagem 1-a-1) com densidade adaptativa (`low`/`medium`/`high`), moldura `aspect-ratio` e dimensionamento `min(vw, dvh)` mantendo todos os cards dentro da borda verde.
- [`dyscalculia/DualGroupStage.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/activities/dyscalculia/DualGroupStage.svelte): Componente compartilhado parametrizado para Adição (`➕`) e Comparação (`VS`), mantendo Esquerda/Direita preservadas, tiles enquadrados e escala proporcional à quantidade de itens.
- [`LiteracyQuestionView.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/activities/LiteracyQuestionView.svelte): Palco de alfabetização com escala proporcional à viewport (`min(vw, dvh)`).
- [`VisualPerceptionQuestionView.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/activities/VisualPerceptionQuestionView.svelte): Roteador enxuto entre pareamento e sequência de rotina.
- [`visual/ModelMatchStage.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/activities/visual/ModelMatchStage.svelte): Cartão modelo com espaço superior para badge sem cortes.
- [`visual/RoutineSequenceStage.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/activities/visual/RoutineSequenceStage.svelte): Passos de rotina flexíveis (`flex: 1 1 0`) sem estouro horizontal e badge multi-linha.
- [`evidence/EvidenceModal.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/activities/evidence/EvidenceModal.svelte): Modal de consulta à fundamentação científica por atividade/categoria ou biblioteca completa com links oficiais de documentação.

---

## 3. Histórico de Versões

- **v5.5.0 (50 Atividades Curadas & Fundamentação Científica EBP):**
  - Expandido o banco de currículo modular para **50 atividades curadas** (**10 em cada** uma das 5 áreas: Discalculia, Alfabetização, Percepção Visual, Emoções & Social e Lógica & Vida Diária) via helpers modulares (`curriculum.helpers.ts`).
  - Criado catálogo de **8 referências científicas e diretrizes oficiais verificadas** (`evidence-references.constants.ts`: IES/WWC 2021 & 2009, Butterworth *Science* 2011, NICHD National Reading Panel, UNC NCAEP 2020, UNC AFIRM Visual Supports & Task Analysis, CASEL SEL e MEC/BNCC).
  - Implementado [`EvidenceModal.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/activities/evidence/EvidenceModal.svelte) integrado ao catálogo de atividades (`TherapistActivitiesTab`, `ActivityCategoryCard`, `ActivityCard`), ao banco do terapeuta (`TherapistActivityBankTab`, `BankActivityCard`) e ao seletor de diretriz EBP no `ActivityEditorModal.svelte`.
  - Atualizada migração incremental em `seedActivitiesIfNeeded()` (`db.ts`) para inserir novas atividades e enriquecer registros built-in com `evidenceId` preservando edições locais.
- **v5.4.0 (Banco Extenso de Atividades & Editor Completo do Terapeuta):**
  - Refatorado currículo estático para persistência reativa no `Dexie.js v2` (`activities.repository.ts`, `activity-bank.store.ts`) e backup unificado (`backup.service.ts`).
  - Criado banco inicial extenso com 25 atividades (~96 questões) organizadas em 5 categorias modulares (`dyscalculia`, `literacy`, `visual_perception`, `social_emotions`, `daily_logic`).
  - Adicionada aba `BANCO DE ATIVIDADES` em `TherapistDashboardPage.svelte` (com atalho protegido por PIN em `ActivitiesPage.svelte`) permitindo buscar, filtrar, selecionar para o aluno, aplicar imediatamente, duplicar, editar atividades/questões existentes e criar novas do zero.
- **v5.3.3 (Correção de Disposição, Enquadramento e Responsividade nas Atividades & Pranchas):**
  - Modularizados `DyscalculiaPlayer.svelte`, `ActivityQuestionView.svelte` e `VisualPerceptionQuestionView.svelte` em subcomponentes pequenos e coesos (`CountStage`, `DualGroupStage`, `ModelMatchStage`, `RoutineSequenceStage`, `PlayerHeader`, `PlayerOptions`).
  - Removidos limites rígidos `max-height: 46vh/48vh/50vh` que faziam cards escaparem pelas bordas e serem cortados por `overflow: hidden`.
  - Adicionado dimensionamento por densidade (`low` / `medium` / `high` conforme quantidade de figuras) + escala `min(vw, dvh)` + molduras com `aspect-ratio` / `overflow: hidden` para conter todas as imagens dentro dos cards mesmo com muitos itens na tela.
  - Preservada disposição horizontal Esquerda vs Direita na Comparação (`DualGroupStage`), ajustados grids de opções em `PlayerOptions` (largura igualitária sem corte de emojis), `TherapistActivitiesTab` (grid de 3/2/1 colunas com scroll natural) e `BoardGrid`/`BoardCell`/`IconRenderer` (`minmax(0, 1fr)` e contenção de ícones).
- **v5.3.2 (Redirecionamento ao Painel de Sistema & Ajustes a partir do Hub):**
  - Corrigida a precedência de renderização no [`App.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/App.svelte) para abrir o painel do terapeuta (`$isAdminDashboardOpen`) mesmo quando na tela do Hub Portal.
  - Atualizado [`openAdminLock`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/admin.store.ts) para aceitar aba inicial (`boards` | `system`) e rota de retorno (`hub` | `board`).
  - No [`HubPortal.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/common/HubPortal.svelte), o card "Painel do Terapeuta & Gestão" redireciona diretamente para a aba **SISTEMA & AJUSTES** após validação do PIN.
  - Atualizado o botão de voltar no [`TherapistDashboardPage.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/admin/TherapistDashboardPage.svelte) para retornar contextualmente para a Suíte CAPE quando acionado do Hub.
- **v5.3.1 (Correção de Build CI/CD no Vercel & Sincronização do Lockfile):**
  - Removido `package-lock.json` conflitante que causou o erro `ERR_PNPM_OUTDATED_LOCKFILE`.
  - Sincronizado `pnpm-lock.yaml` com as versões do `package.json` atualizado.
  - Adicionado `package-lock.json` e `yarn.lock` ao `.gitignore` para prevenir commits acidentais de outros gerenciadores de pacote.
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
