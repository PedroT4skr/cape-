# AGENTS.MD - Documentação Técnica e Arquitetural: CAPE CAA

> **Instituição:** CAPE (Centro de Apoio Pedagógico Especializado) de Vitória da Conquista - BA  
> **Propósito:** Plataforma PWA de Comunicação Alternativa e Ampliada (CAA) para tablets de baixo custo, substituindo pastas físicas PECS.  
> **Versão:** 3.0.3 (Sincronização Completa do Áudio de Incentivo nas Atividades)

---

## 1. Regras de Negócio e Princípios Arquiteturais Inegociáveis

1. **Modularidade e Clean Code:** Nenhum arquivo deve ser excessivamente longo. Toda funcionalidade deve ser decomposta em pequenos módulos desacoplados com responsabilidade única.
2. **Offline-First Nativo:** A aplicação não pode falhar ou exibir tela branca caso o tablet fique sem sinal Wi-Fi/3G. A comunicação é uma prótese humana ininterrupta.
3. **Chave de Fitzgerald Modificada:** Padronização cromática semântica estrita para categorização morfossintática:
   - **Pessoas e Pronomes (Amarelo):** `#FEF08A` (borda `#CA8A04`, texto `#713F12`)
   - **Ações e Verbos (Verde):** `#BBF7D0` (borda `#16A34A`, texto `#14532D`)
   - **Substantivos e Coisas (Laranja):** `#FED7AA` (borda `#EA580C`, texto `#7C2D12`)
   - **Descritivos e Sentimentos (Azul):** `#BAE6FD` (borda `#0284C7`, texto `#0C4A6E`)
   - **Social e Cortesia (Rosa/Roxo):** `#FBCFE8` (borda `#DB2777`, texto `#831843`)
   - **Conectivos e Diversos (Cinza/Neutro):** `#F1F5F9` (borda `#64748B`, texto `#1E293B`)
4. **Acessibilidade Cognitiva (W3C COGA):**
   - **Barra de Sentença:** Fixa no topo para externalizar a memória de trabalho do aluno.
   - **Prevenção de Erros Motores:** Throttle/debounce de 300ms nos eventos de toque para mitigar espasmos motores.
   - **Alvos de Toque:** Áreas amplas de contato com espaçamento visual e feedback tátil imediato.
5. **Separação de Modos:**
   - **Modo Prancha (Aluno):** Interface espartana, sem distrações, tela cheia/standalone.
   - **Modo Terapeuta/Educador (Admin):** Protegido por PIN (`1234`) ou desafio cognitivo matemático para evitar desconfigurações acidentais.

---

## 2. Mapa de Módulos, Funções e Arquivos

### Camada de Tipos (`src/types/`)
- [`fitzgerald.types.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/types/fitzgerald.types.ts): Definição de `FitzgeraldCategory` e estilos de cor `FitzgeraldColorStyle`.
- [`board.types.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/types/board.types.ts): Modelos de dados para `Board`, `Cell` e `SentenceItem`.
- [`audio.types.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/types/audio.types.ts): Tipos para configuração de voz e estado de reprodução.
- [`activity.types.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/types/activity.types.ts): Modelos para categorias e atividades pedagógicas (`ActivityCategoryId`, `ActivityCategory`, `ActivityLevelId`, `ActivityLevelConfig`, `ActivityQuestion`, `ActivitySessionState`).

### Camada de Constantes (`src/constants/`)
- [`fitzgerald.constants.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/constants/fitzgerald.constants.ts): Mapeamento cromático com conformidade de contraste WCAG AAA.
- [`config.constants.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/constants/config.constants.ts): Configurações globais (PIN padrão, tempos de debounce, grid padrão).
- [`seed-boards.constants.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/constants/seed-boards.constants.ts): Pranchas e células iniciais do CAPE (Prancha Principal, Alimentação, Sentimentos).
- [`activity-curriculum.constants.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/constants/activity-curriculum.constants.ts): Catálogo de categorias pedagógicas (`ACTIVITY_CATEGORIES`), currículo unificado de atividades e helpers de busca (`getLevelsByCategoryId`, `getCategoryById`).
- [`literacy-curriculum.constants.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/constants/literacy-curriculum.constants.ts): Currículo didático estruturado de Alfabetização & Fonologia (Nível 1: Letra Inicial, Nível 2: Sílaba Inicial, Nível 3: Pareamento Palavra-Imagem PECS).
- [`visual-curriculum.constants.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/constants/visual-curriculum.constants.ts): Currículo didático de Percepção Visual & Pareamento (Nível 1: Cores & Tons, Nível 2: Formas Geométricas, Nível 3: Sequência de Rotina Diária PECS).
- [`emoji-catalog.constants.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/constants/emoji-catalog.constants.ts): Catálogo rico de mais de 300 emojis categorizados para CAA (Pessoas, Alimentos, Ações, Objetos, Social, Animais).

### Camada de Persistência Local (`src/db/`)
- [`db.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/db/db.ts): Instância Dexie.js (`CapeDatabase`), esquema de tabelas (`boards`, `cells`, `mediaCache`), método de seed automático e restauração de fábrica.
- [`boards.repository.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/db/boards.repository.ts): CRUD de pranchas (`getAllBoards`, `getBoardById`, `getRootBoard`, `saveBoard`, `deleteBoard`).
- [`cells.repository.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/db/cells.repository.ts): CRUD de células táteis (`getCellsByBoardId`, `saveCell`, `deleteCell`, `reorderCells`).
- [`storage.manager.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/db/storage.manager.ts): Persistência anti-evicção (`requestPersistentStorage`) e diagnóstico de cota (`getStorageEstimate`).

### Camada de Servidor & Plugins Vite (`src/server/`)
- [`edge-tts-plugin.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/server/edge-tts-plugin.ts): Middleware Vite para `/api/tts`, efetuando a conexão WebSocket com a nuvem do Microsoft Edge Read Aloud (DRM 2.1) e retornando áudio MP3 streamado.

### Camada de Serviços (`src/services/`)
- [`edge-tts.service.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/services/edge-tts.service.ts): Gerenciador de síntese neural com cache IndexedDB, download via proxy, prefetching em segundo plano (`prefetch`), reprodução com tracking temporal (`playAudio` com `onProgress`), controle de concorrência (`stop`) e cota (`getCacheStats`, `clearAudioCache`).
- [`speech.service.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/services/speech.service.ts): Orquestrador unificado de fala com síntese fluida de frase única (`speakSequence` sem pausas artificiais), pré-aquecimento de cache (`prefetchPhrase`), cálculo de janelas de progresso proporcional (`calculateWordProgressWindows`), testes de voz e fallback transparente instantâneo para Web Speech API quando offline.
- [`sound-effects.service.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/services/sound-effects.service.ts): Áudio tátil sintético via Web Audio API (`playTapSound`, `playClearSound`, `playSuccessChime`, `playGentleRetry`).
- [`arasaac.service.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/services/arasaac.service.ts): Integração com API REST do ARASAAC (`searchArasaac`) e inferência de classe gramatical.

### Camada de Utilitários (`src/utils/`)
- [`touch.utils.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/utils/touch.utils.ts): Throttler tátil para mitigar espasmos e toques repetidos acidentais.
- [`pin.utils.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/utils/pin.utils.ts): Validação de PIN de segurança do educador.

### Camada de Estado Reativo (`src/stores/`)
- [`sentence.store.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/sentence.store.ts): `sentenceItems`, `activeHighlightIndex`, `addCellToSentence` (com prefetch em segundo plano), `removeLastWord`, `clearSentence`, `speakSentence`.
- [`board.store.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/board.store.ts): `currentBoard`, `boardCells`, `allBoards`, `boardHistory`, `loadBoard`, `initRootBoard`, `navigateToBoard`, `navigateBack`.
- [`admin.store.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/admin.store.ts): Controle do modal de PIN e autenticação do terapeuta (`openAdminLock`, `closeAdminLock`, `verifyPin`, `closeAdminDashboard`).
- [`activity.store.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/activity.store.ts): Gerenciador da sessão, catálogo e navegação pedagógica (`selectedCategoryId`, `selectCategory`, `clearSelectedCategory`, `activitySession`, `isActivitiesPageOpen`, `openActivitiesPage`, `closeActivitiesPage`, `startActivity`, `submitAnswer`, `repeatPrompt`, `exitActivity`, `restartCurrentLevel`).

### Camada de Componentes (`src/components/`)
- **Comum:**
  - [`Header.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/common/Header.svelte): Barra de topo minimalista com título, botão em destaque **ATIVIDADES** (acesso pedagógico direto) e botão **PAINEL** (cadeado PIN do terapeuta).
  - [`Modal.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/common/Modal.svelte): Modal acessível reutilizável com suporte a largura ajustável (`maxWidth`).
  - [`IconRenderer.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/common/IconRenderer.svelte): Renderizador unificado para ícones Lucide e imagens ARASAAC.
- **Barra de Sentença:**
  - [`SentenceBar.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/sentence-bar/SentenceBar.svelte): Contêiner superior com scroll horizontal automático.
  - [`SentenceItem.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/sentence-bar/SentenceItem.svelte): Card visual individual com destaque durante vocalização.
  - [`SentenceControls.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/sentence-bar/SentenceControls.svelte): Botões de ação (Falar Frase, Apagar Última, Limpar Tudo).
- **Prancha e Grade:**
  - [`BoardGrid.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/board/BoardGrid.svelte): Grade ortogonal dinâmica ajustada às colunas e linhas.
  - [`BoardCell.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/board/BoardCell.svelte): Botão tátil individual com cores de Fitzgerald e indicador de pasta.
- **Painel do Terapeuta & Segurança:**
  - [`PinChallengeModal.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/admin/PinChallengeModal.svelte): Teclado numérico estrito para PIN (`1234`), sem distrações.
  - [`TherapistDashboardPage.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/admin/TherapistDashboardPage.svelte): Página dedicada de configurações e ajustes em tela cheia (exibe exclusivamente as abas `PRANCHAS & GRADE` e `SISTEMA & AJUSTES`).
  - [`TherapistBoardsTab.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/admin/TherapistBoardsTab.svelte): Gerenciador de pranchas, densidade de grade e cartões.
  - [`TherapistSystemTab.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/admin/TherapistSystemTab.svelte): Monitor de armazenamento offline e restauração de fábrica.
  - [`AddCellModal.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/admin/AddCellModal.svelte): Formulário de novo cartão reformulado em 2 colunas com prévia ao vivo do cartão e seletor rico de emojis.
  - [`EmojiPicker.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/admin/EmojiPicker.svelte): Seletor visual de emojis com abas de categorias e barra de busca instantânea.
  - [`StorageStatus.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/admin/StorageStatus.svelte): Widget minimalista e quantitativo de memória do tablet com métricas claras (MB utilizados, limite máximo total em GB/MB, contagem de cartões e áudios salvos offline), sem botões redundantes.
  - [`VoiceSettings.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/admin/VoiceSettings.svelte): Painel completo de configuração do motor de voz (Edge-TTS Neural vs Voz Nativa do OS), catálogo de vozes brasileiras de estúdio (Francisca, Antônio, Thalita), monitor de cota de áudios em cache IndexedDB e botão de limpeza.
- **Atividades Didáticas (Discalculia, Alfabetização & Percepção Visual):**
  - [`ActivitiesPage.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/activities/ActivitiesPage.svelte): Tela cheia dedicada de catálogo de atividades pedagógicas, desacoplada do painel de ajustes, com botão de retorno à prancha.
  - [`TherapistActivitiesTab.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/admin/TherapistActivitiesTab.svelte): Central de atividades didáticas com suporte a navegação por pastas de categorias pedagógicas.
  - [`ActivityCategoryCard.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/activities/ActivityCategoryCard.svelte): Card visual de pasta temática (emoji grande, badge de contagem de exercícios e ação de abertura).
  - [`ActivityCard.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/activities/ActivityCard.svelte): Card visual sintetizado de nível didático com disparador da atividade (textos objetivos, sem poluição).
  - [`DyscalculiaPlayer.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/activities/DyscalculiaPlayer.svelte): Player de tela cheia gamificado com síntese de voz, barra de progresso e alvos táteis 3D.
  - [`ActivityQuestionView.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/activities/ActivityQuestionView.svelte): Renderizador concreto de objetos (maçãs, bananas, sucos) seguindo Bruner CPA.
  - [`LiteracyQuestionView.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/activities/LiteracyQuestionView.svelte): Palco visual interativo para alfabetização com visualizador de grafemas, blocos de sílaba e pareamento concreto de palavras.
  - [`VisualPerceptionQuestionView.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/activities/VisualPerceptionQuestionView.svelte): Palco interativo de discriminação visual de cartões modelo (cores e formas) e sequenciamento de passos de rotina diária PECS com slot pulsante.
  - [`ActivityCelebration.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/activities/ActivityCelebration.svelte): Tela final de conquista com troféu, estrelas, pontuação e repetição.

---

## 3. Histórico de Alterações

- **v3.0.3 (Sincronização Completa do Áudio de Incentivo nas Atividades):**
  - **Fim do Corte Prematuro de Voz (`activity.store.ts` & `speech.service.ts`):**
    - Substituição do timeout arbitrário e insuficiente de `1500ms` por aguardo assíncrono real (`await speechService.speakWord('Muito bem! Você acertou!')`), garantindo que a fala de reforço positivo seja reproduzida até o último fonema antes de trocar de pergunta.
    - Promessa em `speakWordNative` com resolução em `utterance.onend`, blindando tanto o motor neural Edge-TTS quanto sintetizadores locais offline do sistema operacional contra interrupções prematuras.
    - Pausa pedagógica de absorção cognitiva de `450ms` inserida após o término do áudio de incentivo, permitindo assimilação tranquila da conquista pela criança antes da nova pergunta.
  - **Prevenção de Toques Duplos & Condições de Corrida (`activity.types.ts` & `DyscalculiaPlayer.svelte`):**
    - Adicionado estado `isProcessing` à sessão; botões de resposta são desabilitados durante a avaliação e transição, prevenindo submissões duplicadas e sobreposições de áudio.
    - Verificação de segurança de liveness (`latestState.isActive`) impedindo transições indesejadas caso o educador/aluno decida sair da atividade durante o reforço positivo.

- **v3.0.2 (Responsividade Total nos Cabeçalhos da Aplicação):**
  - **Cabeçalho de Atividades Pedagógicas (`ActivitiesPage.svelte`):**
    - Rótulo adaptativo no título: exibe `"ATIVIDADES"` em smartphones e `"ATIVIDADES PEDAGÓGICAS"` em desktop, eliminando por completo o corte com reticências (`"ATIVIDADES P..."`).
    - Rótulo adaptativo e linha única no botão de retorno: exibe `"VOLTAR"` em mobile com `white-space: nowrap; flex-shrink: 0;`, eliminando a quebra em duas linhas (`"VOLTAR À"` / `"PRANCHA"`).
    - Blindagem do selo da marca (`.brand-badge`): adição de `white-space: nowrap; flex-shrink: 0;` impedindo que `"CAPE"` e `"CAA"` quebrem verticalmente.
  - **Cabeçalho Principal (`Header.svelte`):**
    - Adicionado `white-space: nowrap; flex-shrink: 0;` aos botões `ATIVIDADES` e `PAINEL` e ao badge `CAPE CAA`.
    - Distribuição flexível (`flex: 1; min-width: 0;`) para o título da prancha em smartphones, com ocultação seletiva apenas do selo institucional em telas ultra-estreitas (<= 360px), preservando a legibilidade do título da prancha.
  - **Navegação Interna de Categorias (`TherapistActivitiesTab.svelte`):**
    - Botão de retorno adaptativo: exibe `"VOLTAR"` em mobile em vez do longo `"VOLTAR PARA CATEGORIAS"`, com `white-space: nowrap`.

- **v3.0.1 (Responsividade Cirúrgica no Painel de Ajustes & Configurações do Terapeuta):**
  - **Eliminação de Overflow Horizontal no Painel (`TherapistDashboardPage.svelte`):**
    - Rótulos adaptativos com alternância semântica: `"AJUSTES"` em vez do longo `"PAINEL DE CONFIGURAÇÕES & AJUSTES"` em mobile, e botão `"VOLTAR"` em vez de `"VOLTAR À PRANCHA"`, evitando quebra do cabeçalho.
    - Sub-navbar dividida em grid 50%/50% em smartphones, impedindo que as abas ultrapassem a borda direita da viewport.
    - Contêiner de conteúdo principal (`.therapist-main-area`) com `max-width: 100%` e `overflow-x: hidden`.
  - **Grid Fluido e Seguro na Aba Sistema (`TherapistSystemTab.svelte`):**
    - Substituição de `minmax(340px, 1fr)` por `grid-template-columns: 1fr` em mobile com `width: 100%`, permitindo renderização perfeita em telas de 320px a 480px sem estourar a largura da tela.
    - Botão de restauração com rótulo adaptativo (`"RESTAURAR PADRÃO"` em telas móveis).
  - **Vozes Sem Cortes & Alvos Táteis Otimizados (`VoiceSettings.svelte`):**
    - Abas compactas no mobile: `"ESTÚDIO"` e `"DO APARELHO"`.
    - Cartões de voz (`.voice-item`) reorganizados em layout de grid de 2 linhas em celulares: linha 1 com avatar e nome/status; linha 2 com botões `"OUVIR"` e `"USAR ESTA"` ocupando a largura total (50% cada), eliminando truncamento de texto (`"OUV..."`) e garantindo toques precisos.
  - **Widget de Memória Compacto (`StorageStatus.svelte`):**
    - Grid de estatísticas (`.stats-grid`) reestruturado para `grid-template-columns: 1fr 1fr` com `min-width: 0`, garantindo que os cards de Cartões e Áudios fiquem 100% alinhados sem estourar as margens.

- **v3.0.0 (Responsividade Total para Dispositivos Móveis & Smartphones):**
  - **Dynamic Viewport Height (`100dvh`) & Safe Areas:** Adoção de `100dvh` e insets de segurança do sistema operacional (`env(safe-area-inset)`) em `App.svelte`, `ActivitiesPage.svelte`, `TherapistDashboardPage.svelte` e `DyscalculiaPlayer.svelte`, eliminando sobreposições e cortes provocados por barras de navegação do Chrome/Safari móvel.
  - **Cabeçalho Adaptativo (`Header.svelte`):** Redução para `46px` de altura em telas `<= 640px`, com botões `ATIVIDADES` e `PAINEL` compactados e truncamento responsivo do título da prancha, impedindo quebra de layout em telas de 360px a 480px.
  - **Barra de Sentença Proporcional (`SentenceBar.svelte`, `SentenceControls.svelte`, `SentenceItem.svelte`):**
    - Altura dinâmica em mobile portrait (`86px`) e landscape (`72px`), liberando a maior parte da viewport vertical para os cartões de comunicação.
    - Controles de ação (`FALAR`, `APAGAR`, `LIMPAR`) e cards individuais redimensionados proporcionalmente sem perda de área de toque.
  - **Grade de Pictogramas Flexível (`BoardGrid.svelte` & `BoardCell.svelte`):**
    - Redução de gaps e paddings externos, com bordas adaptadas (`3px`) e cantos suavizados (`14px`).
    - Tipografia de rótulo e emojis calibrados via `clamp` para mitigar o truncamento de texto em colunas estreitas de celulares.
  - **Player Didático e Questões Gamificadas (`DyscalculiaPlayer.svelte`, `VisualPerceptionQuestionView.svelte`, `LiteracyQuestionView.svelte`):**
    - Encadeamento de rotina PECS (`routine-chain`) com rolagem horizontal touch fluida (`overflow-x: auto`), evitando overflow lateral.
    - Banners de desafio, fichas concretas e botões de resposta 3D dimensionados com ergonomia tátil para dedos de crianças e adultos em telas pequenas.
  - **Painel do Terapeuta & Modais (`TherapistDashboardPage.svelte`, `PinChallengeModal.svelte`, `AddCellModal.svelte`, `Modal.svelte`):**
    - Teclado numérico de PIN com alvos táteis compactos sem necessidade de rolagem vertical.
    - Sub-navbar com scroll horizontal, formulários em coluna única e modais ocupando até `96dvh`.

- **v2.9.0 (Fluência e Baixa Latência na Frase Completa & Pré-Carregamento):**
  - **Eliminação do Loop Palavra por Palavra (`speech.service.ts`):** Substituição da iteração síncrona pausada por síntese direta de fluxo contínuo (`formatFullPhrase`), acabando com os longos intervalos artificiais entre as palavras.
  - **Entonação Humana Natural & Prosódia Conclusiva:** A frase completa agora é sintetizada como um bloco oracional unificado da língua portuguesa (com pontuação final declarativa), conferindo cadência descendente suave e natural.
  - **Sincronização Visual Proporcional dos Cartões (`calculateWordProgressWindows` & `findActiveWordIndex`):** Durante a reprodução do áudio contínuo, o progresso temporal (`currentTime / duration`) é mapeado nas janelas léxicas de cada palavra, iluminando cada cartão na Barra de Sentença de forma fluida sem interromper a fala.
  - **Pré-Carregamento em Segundo Plano (`prefetchPhrase` & `sentence.store.ts`):** Conforme o aluno clica nos cartões e monta a frase, o áudio da sentença combinada é silenciosamente baixado e gravado no IndexedDB em background. Ao clicar em "Falar Frase", o áudio inicia instantaneamente (0ms de latência).
  - **Fallback Offline Imediato:** Se o tablet estiver sem conexão e a frase completa não tiver sido gravada previamente em cache, o sistema aciona sem engasgos o sintetizador nativo do sistema operacional (`Web Speech API`), mantendo a fala da frase inteira.

- **v2.8.0 (Desacoplamento de Atividades & Botão Dedicado no Topo):**
  - **Botão Dedicado "ATIVIDADES" no Topo (`Header.svelte`):** Adicionado botão de alto relevo 3D na cor verde esmeralda com ícone de brilho (`Sparkles`), permitindo acesso direto e instantâneo à central de atividades pedagógicas a partir da prancha principal.
  - **Página Dedicada de Atividades (`ActivitiesPage.svelte`):** Criação de uma tela exclusiva para exploração pedagógica (categorização por pastas, níveis e exercícios), com cabeçalho limpo e botão intuitivo "VOLTAR À PRANCHA".
  - **Painel do Terapeuta 100% Focado em Configurações (`TherapistDashboardPage.svelte`):** A aba de atividades foi desvinculada do painel administrativo. O painel (protegido por PIN `1234`) agora exibe estritamente as abas `PRANCHAS & GRADE` e `SISTEMA & AJUSTES`, eliminando sobreposição de papéis e poluição visual.
  - **Gerenciamento Desacoplado de Estado (`activity.store.ts` & `App.svelte`):**
    - Adicionados os controles `isActivitiesPageOpen`, `openActivitiesPage()` e `closeActivitiesPage()`.
    - Ao finalizar ou sair de uma atividade pedagógica (`exitActivity`), o sistema retorna naturalmente para o catálogo de atividades sem abrir inadvertidamente o painel do terapeuta.

- **v2.7.0 (Redesign Humanizado de Voz, Memória do Tablet & Seleção Estrita Única):**
  - **Eliminação de Jargões Técnicos (`VoiceSettings.svelte` & `StorageStatus.svelte`):** Removidos termos complexos para leigos ("TTS", "Edge-TTS Neural", "IndexedDB", "Proxy DRM", "Blindar Dados"). Interface agora utiliza linguagem limpa e objetiva.
  - **Widget Minimalista de Memória (`StorageStatus.svelte`):** Remoção de textos longos e eliminação do botão confuso "proteger cartões" (a persistência agora é garantida automaticamente em segundo plano). Exibição direta do consumo (ex.: `0.5 MB`), limite máximo total (ex.: `2.0 GB`) e contadores quantitativos de cartões e áudios salvos.
  - **Correção de Dupla Marcação "EM USO":** Corrigido bug em que uma voz do Edge e uma voz nativa ficavam marcadas simultaneamente como "EM USO". A reatividade agora garante que **apenas uma única voz** em todo o sistema possua o badge verde `✓ EM USO`.
  - **Correção dos Botões de Teste/Prévia:**
    - Corrigido problema em que o teste de vozes nativas invocava a voz do Edge ou falhava.
    - Adicionados métodos dedicados `testEdgeVoice()` e `testNativeVoice()` em `speech.service.ts` com garantia de execução da voz selecionada.
    - Botão interativo agora exibe estado ativo `PARAR` durante a reprodução.
  - **Nomes Amigáveis para Vozes do Dispositivo:** Higienização de strings do Windows/Android (`Microsoft Daniel - Portuguese (Brazil)` ➔ `Daniel`).
  - **Harmonização do Layout de Sistema (`TherapistSystemTab.svelte`):** Remoção de container duplicado e alinhamento do card de restauração de fábrica com tipografia acolhedora.

- **v2.6.0 (Categoria Percepção Visual & Pareamento Ativada):**
  - **Ativação da Categoria Percepção Visual & Pareamento (`ACTIVITY_CATEGORIES`):** Fim do status "Em breve" para a 3ª pasta didática. Pasta 100% ativa no painel do terapeuta com badge `"3 EXERCÍCIOS"` e tema roxo institucional (`#9333EA`).
  - **Currículo de Pareamento Multissensorial (`visual-curriculum.constants.ts`):** 3 níveis didáticos fundamentados no modelo TEACCH e rotinas visuais PECS:
    - *Nível 1 (Cores & Tons):* Pareamento idêntico cromático (Vermelho 🔴, Amarelo 🟡, Azul 🔵, Verde 🟢, Roxo 🟣).
    - *Nível 2 (Formas Geométricas):* Discriminação de silhuetas e contornos (Triângulo 🔺, Estrela ⭐, Quadrado 🟩, Círculo ⚪, Coração 💛).
    - *Nível 3 (Sequência de Rotina Diária):* Previsibilidade e encadeamento de passos cronológicos de autonomia e higiene (Rotina da manhã, Lavar mãos após o banheiro, Escovação após lanche, Higiene pós-pintura, Chegada no CAPE/escola).
  - **Componente Visual Especializado (`VisualPerceptionQuestionView.svelte`):** Cartão modelo ampliado com profundidade 3D e cadeia visual horizontal de passos com setas conectivas e slot pulsante `[ ? ]` com a pergunta "O que vem depois?".
  - **Integração Total com TTS & Efeitos Sonoros:** Suporte completo à síntese de voz (Edge-TTS / Fallback) e áudio tátil de reforço positivo.

- **v2.5.0 (Edge-TTS Proxy Neural & Cache Local Offline no IndexedDB):**
  - **Síntese Neural de Estúdio a Custo Zero:** Integração com o protocolo Microsoft Edge Read Aloud (`msedge-tts@2.1.0`), disponibilizando as vozes neurais brasileiras mais realistas do mercado: *Francisca* (doce, afetuosa, calma - recomendada para TEA), *Antônio* (firme e didático) e *Thalita* (jovem e dinâmica).
  - **Middleware Proxy Local Vite (`edge-tts-plugin.ts`):** Rota `/api/tts` integrada ao servidor dev, efetuando o handshake WebSocket com o serviço da Microsoft com proteção DRM atualizada e devolvendo stream MP3 de 24kHz.
  - **Cache Local Anti-Evicção no IndexedDB (`edge-tts.service.ts`):** Antes de qualquer requisição, o sistema busca na tabela `mediaCache` do Dexie. Áudios solicitados uma vez são gravados permanentemente no tablet em formato `Blob`, permitindo uso contínuo mesmo com Wi-Fi desligado.
  - **Fallback Automático Resiliente (`speech.service.ts`):** Caso o tablet esteja sem internet e uma palavra ainda não tenha sido colocada em cache, o sistema recorre instantaneamente ao sintetizador nativo do sistema operacional (`Web Speech API`), garantindo que o aluno NUNCA fique sem voz.
  - **Interface Completa no Painel do Terapeuta (`VoiceSettings.svelte`):** Seletor entre *Edge-TTS Neural* e *Voz Nativa*, seleção de voz com badges *Neural HD*, botão de teste imediato e monitor do cache local com contagem de arquivos e tamanho em KB.

- **v2.4.0 (Otimização de Voz Neural & Seletor de Vozes sem Custo):**
  - **Ranking Heurístico de Vozes Neurais (`speech.service.ts`):** Fim da seleção cega da primeira voz da lista (que no Windows escolhia a robótica "Microsoft Maria Desktop" SAPI5 de 1998). O sistema agora pontua e prioriza automaticamente vozes modernas com os selos *Natural*, *Neural*, *Google* e *Online* (ex.: *Microsoft Francisca Natural*, *Google português do Brasil*, *Antonio*).
  - **Modulação Acústica Pedagógica:** Ajuste fino da velocidade (`rate: 0.92`) e afinação (`pitch: 1.05`), eliminando o tom metálico monocórdico e tornando a pronúncia mais calorosa, doce e adequada para crianças com TEA.
  - **Painel de Configuração de Voz (`VoiceSettings.svelte`):** Nova seção na aba de Sistema do Painel do Terapeuta, listando todas as vozes em português instaladas com badge **NEURAL / NATURAL**, botão de teste imediato ("Olá! Esta é a voz do CAPE...") e salvamento permanente no `localStorage`.

- **v2.3.0 (Botão PAINEL em Destaque & Reset Automático de PIN):**
  - **Botão PAINEL Visível e com Alto Enfoque (`Header.svelte`):** O antigo botão discreto acinzentado `"Terapeuta"` foi reformulado para um botão de alto contraste e rápida localização visual: **`PAINEL`**, com fundo azul real (`#2563EB`), borda iluminada (`#60A5FA`), relevo tátil, tipografia `font-weight: 950` e ícone de cadeado de segurança.
  - **Zerar Input Automaticamente no PIN Incorreto (`PinChallengeModal.svelte`):** Ao digitar um PIN errado e pressionar `"ENTRAR"`, o campo de dígitos é **imediatamente esvaziado** (`enteredPin = ''`), acompanhado de animação de vibração horizontal (*shake effect*) e feedback sonoro sutil. O usuário não precisa mais apagar dígito por dígito no backspace.
  - **Limpeza Automática ao Reabrir Modal:** Efeito reativo `$effect` que zera qualquer digitação residual sempre que o modal de autenticação for acionado.

- **v2.2.0 (Categoria e Exercícios de Alfabetização & Consciência Fonológica):**
  - **Ativação da Categoria Alfabetização & Fonologia (`ACTIVITY_CATEGORIES`):** Fim do status "Em breve" para a pasta de alfabetização. A pasta agora está 100% ativa, com badge `"3 EXERCÍCIOS"` e tema verde esmeralda institucional.
  - **Currículo de Alfabetização Multissensorial (`literacy-curriculum.constants.ts`):** 3 níveis pedagógicos completos fundamentados na BNCC e educação especial:
    - *Nível 1 (Letra Inicial):* Discriminação fonológica e aliteração (ex.: ⚽ BOLA, 🐱 GATO, 🐸 SAPO, 🚗 CARRO, ☀️ SOL).
    - *Nível 2 (Sílaba Inicial):* Segmentação de unidades silábicas simples (ex.: 🏠 CA-SA, 🐒 MA-CA-CO, 🍿 PI-PO-CA).
    - *Nível 3 (Pareamento Palavra-Imagem):* Reconhecimento global de palavras em CAIXA ALTA baseado em PECS/TEACCH (ex.: 🍎 MAÇÃ, 🐶 CACHORRO, ✈️ AVIÃO).
  - **Componente Visual Especializado (`LiteracyQuestionView.svelte`):** Exibição de figuras em cards gigantes com sombra e relevo 3D, caixas com letra faltante pulsante `[ ? ]` e correntes de blocos silábicos.
  - **Integração com TTS & Efeitos Sonoros:** Suporte completo à síntese de voz em português com pistas fonéticas e reprodução com feedback tátil positivo e suave.

- **v2.1.0 (Design Lúdico, Cores Vibrantes e Maximização de Alvos Táteis no Player):**
  - **Botões Gamificados de Alto Relevo 3D (`DyscalculiaPlayer.svelte`):** Fim dos botões acromáticos monocromáticos. Os botões de resposta agora possuem cores vibrantes temáticas (Azul Royal `#2563EB`, Laranja Solar `#EA580C`, Verde Esmeralda `#059669`) com relevo 3D tátil (`box-shadow: 0 8px 0 ...`) e afundamento mecânico ao toque, simulando botões físicos de brinquedo ideais para crianças com TEA e déficits motores.
  - **Aproveitamento Total da Viewport:** Largura máxima expandida para $1380\text{ px}$. Para 2 opções (Nível 3), os botões se expandem até $580\text{ px}$ cada, preenchendo a tela e eliminando o vazio lateral.
  - **Palco Central Vibrante e Lúdico (`ActivityQuestionView.svelte`):**
    - *Nível 3 (Magnitude):* Prato da esquerda estilizado em azul-celeste pastel com borda grossa e badge de rótulo azul; prato da direita em laranja pastel com badge laranja; divisor central com medalha dourada `VS` com brilho âmbar; e maçãs ampliadas para dimensões gigantes (`clamp(4.4rem, 8.5vw, 7.2rem)`).
    - *Nível 1 (Contagem):* Fundo verde menta suave com bordas e cartões de subitização com relevo 3D e contadores táteis ampliados.
    - *Nível 2 (Adição):* Grupos com cores complementares e operador de soma `➕` em bolha dourada lúdica com relevo 3D.
  - **Banner de Pergunta e Topo Acolhedores:** Borda azul grossa com cantos arredondados ($22\text{ px}$), botão de áudio azul vibrante com relevo tátil e barra de progresso com gradiente gamificado.

- **v2.0.0 (Categorias e Pastas Didáticas de Exercícios):**
  - **Arquitetura Hierárquica em Pastas (`activity.types.ts` & `activity-curriculum.constants.ts`):** Criação do modelo `ActivityCategory` e catálogo `ACTIVITY_CATEGORIES` para agrupamento pedagógico modular. A categoria inaugural `"Discalculia & Matemática Concreta"` organiza os 3 exercícios atuais (Subitização, Adição Pictórica e Discriminação de Magnitude), abrindo espaço escalável para novas pastas (como `"Alfabetização & Fonologia"` e `"Percepção Visual & Pareamento"`).
  - **Componente Visual de Pasta (`ActivityCategoryCard.svelte`):** Card tátil com borda cromática, ícone/emoji expressivo, badge de contagem de exercícios disponíveis ou indicador "EM BREVE", e botão de abertura.
  - **Navegação em Dois Níveis (`TherapistActivitiesTab.svelte`):** A aba de atividades exibe inicialmente as pastas temáticas. Ao clicar em "ABRIR PASTA", a visão transiciona suavemente para a grade de exercícios com cabeçalho contextual e botão `"VOLTAR PARA CATEGORIAS"`.
  - **Gerenciamento de Estado Reativo (`activity.store.ts`):** Inclusão de `selectedCategoryId`, `selectCategory()` e `clearSelectedCategory()`. Ao sair de um exercício, o educador retorna automaticamente para o interior da pasta selecionada, garantindo fluxo contínuo de trabalho pedagógico.

- **v1.9.0 (Fluxo de Navegação do Educador & Refinamento de Magnitude CPA):**
  - **Fluxo de Retorno ao Painel do Terapeuta (`activity.store.ts`):** O método `exitActivity()` foi configurado para reabrir obrigatoriamente a página do terapeuta (`isAdminDashboardOpen.set(true)`). Assim, ao clicar no botão "SAIR" durante uma atividade ou ao concluir a sessão na tela de celebração, o aplicativo retorna à central pedagógica de exercícios, mantendo a sessão do educador ativa e prevenindo retorno acidental à prancha do aluno.
  - **Tela de Conquista Acessível (`ActivityCelebration.svelte`):** Botão de ação explícito `"VOLTAR AO PAINEL DO TERAPEUTA"`, eliminando ambiguidades de navegação.
  - **Rótulos Concisos na Discriminação de Magnitude (`activity-curriculum.constants.ts`):** Rótulos extensos no Nível 3 que causavam quebra de texto foram sintetizados em opções intuitivas e diretas (`ESQUERDA 🍎 (4)` e `DIREITA 🍎 (1)`).
  - **Tipografia Adaptativa e Enquadramento Estrito em 100vh (`DyscalculiaPlayer.svelte` & `ActivityQuestionView.svelte`):** Estilos condicionais (`.is-number` e `.is-text`) nos botões de resposta e teto de altura (`max-height: 40vh` nos palcos de contagem) garantindo que nenhum exercício gere scroll vertical em tablets de qualquer resolução.

- **v1.8.0 (Acessibilidade Motora & Otimização Visual do Player de Atividades):**
  - **Ampliação do Palco Concreto (`ActivityQuestionView.svelte`):** O contêiner de contagem e os tokens agora ocupam a viewport com destaque, exibindo emojis gigantes (`clamp(4.5rem, 9.5vw, 7.5rem)`), cartões de subitização estruturados ($160\text{ px}$) e contadores numéricos táteis claros.
  - **Alvos Táteis de Resposta Ampliados (`DyscalculiaPlayer.svelte`):** Os botões de alternativa foram expandidos para altura de até $155\text{ px}$ com números em tamanho gigante (`clamp(2.6rem, 5.8vw, 4.2rem)`), eliminando o layout encolhido e aproveitando toda a largura da tela com acessibilidade W3C COGA estrita.
  - **Adição e Comparação Proporcionadas:** Grupos de soma e pratos de magnitude agora preenchem proporcionalmente o display do tablet.

- **v1.7.0 (Seletor Rico com Centenas de Emojis & Novo Layout do Modal de Criação):**
  - **Seletor de Emojis Completo (`EmojiPicker.svelte`):** Substituição dos 12 presets limitados por um seletor visual categorizado com mais de 300 emojis pedagógicos divididos em 6 abas (Pessoas/Expressões, Alimentos, Ações, Objetos/Casa, Sentimentos/Social e Animais) com filtro de busca em tempo real.
  - **Layout em 2 Colunas (`AddCellModal.svelte`):** O modal agora conta com largura expandida ($880\text{ px}$) e divisão em duas colunas funcionais:
    - *Coluna Esquerda:* Rótulo do cartão (com CAIXA ALTA bold automática), pronúncia vocal opcional, seleção de categoria gramatical (Chave de Fitzgerald) e configuração de sub-prancha/pasta.
    - *Coluna Direita:* **Pré-visualização do Cartão em Tempo Real** (renderiza imediatamente o visual final com a cor e borda de Fitzgerald, emoji selecionado e rótulo) posicionado acima do seletor completo de emojis.

- **v1.6.0 (Consistência Visual, Alinhamento de Cabeçalho & Otimização Espacial):**
  - **Identidade Visual Unificada:** O cabeçalho de [`TherapistDashboardPage.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/admin/TherapistDashboardPage.svelte) agora segue com rigor a altura ($54\text{ px}$), tom escuro (`#0F172A`), badge institucional azul (`#2563EB`) e tipografia de [`Header.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/common/Header.svelte), garantindo continuidade estética e alinhamento perfeito.
  - **Sub-navbar Alinhada:** Barra de abas secundária fixada a $48\text{ px}$ com padding de $16\text{ px}$ alinhado à borda da tela.
  - **Eliminação de Espaço Desperdiçado:** Remoção de limitadores estáticos centrais (`max-width: 1100px`) que deixavam laterais vazias em monitores e tablets. O layout agora aproveita fluidamente 100% da área útil da viewport.
  - **Grid Visual na Gestão de Pranchas:** Em [`TherapistBoardsTab.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/admin/TherapistBoardsTab.svelte), divisão em 2 painéis responsivos: lateral de configurações e painel com **grid visual de mini-cartões táteis** estilizados com as cores de Fitzgerald, eliminando a restrição de $180\text{ px}$ e preenchendo a tela de forma rica e tátil.
  - **Grid Equilibrado para Atividades e Sistema:** Atividades didáticas preenchem em 3 colunas amplas com alvos confortáveis, e sistema distribuído em grid responsivo de 2 colunas.

- **v1.5.0 (Página Dedicada do Terapeuta & Síntese Visual de Cartões):**
  - **Página Dedicada de Navegação:** Substituição do modal flutuante com barra de rolagem pela página dedicada [`TherapistDashboardPage.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/admin/TherapistDashboardPage.svelte). Ao digitar o PIN (`1234`), a aplicação navega para um ambiente limpo em tela cheia, com barra superior contendo o botão de retorno direto ao modo aluno.
  - **Eliminação de Sobrecarga Textual (Corte de 80% do Texto):** Remoção de faixas textuais acadêmicas extensas e parágrafos prolixos. Os cartões de atividades agora exibem ícone em destaque, título direto (ex: *Nível 1: Contagem 1 a 5*), subtítulo de uma linha e botão proeminente *INICIAR ATIVIDADE*.
  - **Grid Espaçosa para Tablets:** Os cartões são distribuídos em grade ortogonal ampla e responsiva, aproveitando todo o display do tablet.

- **v1.0.0 (MVP Inicial):**
  - Implementação inicial completa da estrutura Svelte 5 + TypeScript + Vite.
  - Banco de dados IndexedDB com Dexie.js e semeadura automática do CAPE.
  - Suporte completo à Chave de Fitzgerald Modificada com alto contraste.
  - Barra de Sentença com síntese de voz imediata e sequencial com realce dinâmico.
  - Navegação entre prancha principal e sub-pranchas temáticas (Alimentação, Sentimentos).
  - Trava de segurança por PIN ou desafio matemático com Painel do Terapeuta.
  - Configuração PWA com Service Worker offline e Web App Manifest instalável.
  - **Fix (Modal A11y & Click Propagation):** Ajuste em [`Modal.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/common/Modal.svelte) para interceptar cliques estritamente no backdrop (`event.target === event.currentTarget`), impedindo que interações com o teclado de PIN, abas ou botões internos fechassem indevidamente a janela.
- **v1.1.0 (Refinamento Visual & Acessibilidade Cognitiva):**
  - Substituição dos ícones vetoriais por **Emojis táteis de alta resolução** nos cartões das pranchas e na barra de sentença, aumentando o reconhecimento cognitivo imediato.
  - Ampliação da **Barra de Sentença Superior** (altura ajustada para 124px) com alvos visuais maiores ($94\times 94\text{ px}$).
  - Formatação de todos os rótulos de palavras e botões de comando em **CAIXA ALTA (CAPS LOCK)** com fonte bold/black ($900$).
  - Botões de controle ampliados e com rótulos explícitos: **FALAR** (com ícone de volume), **APAGAR** (com ícone de retrocesso) e **LIMPAR** (com ícone de lixeira).
  - Migração e hidratação automática dos dados existentes no IndexedDB com os novos emojis sem requerer reset manual do navegador.
  - **Fix (Navegação Exclusiva do Botão Voltar):** Ajuste em [`BoardCell.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/board/BoardCell.svelte) e introdução da propriedade `isNavigationOnly` em [`board.types.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/types/board.types.ts), garantindo que o botão "VOLTAR" execute apenas a navegação de retorno à pasta anterior e emita clique tátil, sem ser inserido na Barra de Sentença nem ser pronunciado pelo sintetizador de voz.
- **v1.2.0 (Proteção Anti-Spam & Blindagem da Síntese de Fala):**
  - **Filtro Anti-Spam & Erros Motores:** Implementação em [`sentence.store.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/stores/sentence.store.ts) de cooldown de 1000ms para a mesma tecla e proteção de 250ms contra toques de múltiplos dedos/palma, impedindo a duplicação involuntária de cartões na Barra de Sentença.
  - **Vocalização Fluida da Frase Inteira:** Refatoração de [`speech.service.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/services/speech.service.ts) para pronunciar a sentença inteira como uma unidade contínua em português com prosódia natural, eliminando o congelamento da fila do Chrome/Android após a primeira palavra, adicionando keep-alive de `resume()` e rastreamento de `onboundary` com timer adaptativo de realce visual.
- **v1.3.0 (Associação Semântica Cromática & Ícone Sanitário):**
  - **Emoji de Privada no Banheiro:** Substituição do pictograma genérico de porta `🚻` pela privada explícita `🚽` no cartão BANHEIRO.
  - **Cores Semânticas Intuitivas por Cartão:** Introdução de `customStyle` em [`board.types.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/types/board.types.ts) e [`seed-boards.constants.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/constants/seed-boards.constants.ts) permitindo associações visuais diretas e naturais.
  - **Reset de Navegação no Botão Limpar:** O botão **LIMPAR** limpa a sentença e retorna à raiz se estiver em sub-pasta.
  - **Interface Espartana no Topo (Header):** Remoção de botão redundante no cabeçalho.
- **v1.4.0 (Atividades Didáticas para Discalculia & Painel do Terapeuta):**
  - **Acesso Estrito por PIN (`1234`):** Eliminação do desafio matemático e de abas no modal de bloqueio. O acesso de educador em [`PinChallengeModal.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/admin/PinChallengeModal.svelte) agora é estritamente numérico via PIN.
  - **Painel do Terapeuta Modularizado:** Refatoração de [`AdminDashboard.svelte`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/admin/AdminDashboard.svelte) dividindo as responsabilidades em abas desacopladas (`TherapistActivitiesTab`, `TherapistBoardsTab`, `TherapistSystemTab`), reduzindo o acoplamento e mantendo todos os arquivos abaixo de 120 linhas.
  - **Fundamentação Pedagógica Inclusiva (Bruner CPA & Numicon):** Criação de atividades pedagógicas fundamentadas em neurociência para discalculia e autismo:
    - **Nível 1 (Subitização & Contagem 1-a-1):** Reconhecimento de quantidades visuais (1 a 5) com objetos cotidianos (maçãs, bananas, sucos) e pontos táteis.
    - **Nível 2 (Adição Concreta):** Agrupamento físico e visual de dois conjuntos separados com operador de soma (`🍎 + 🍎 = 2`).
    - **Nível 3 (Magnitude Parietal):** Treinamento da discriminação de grandeza espacial ("Onde tem MAIS? / Onde tem MENOS?").
  - **Player de Atividades (`DyscalculiaPlayer.svelte`):** Interface espartana em tela cheia com vocalização automática da instrução via Web Speech API, botão para repetir áudio em voz alta, feedback imediato com arpejo de acerto em Web Audio API e encorajamento suave sem punição para tentativas incorretas, culminando em tela de celebração com estrelas e troféu.


