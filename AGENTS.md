# AGENTS.MD - Documentação Técnica e Arquitetural: CAPE Math (TDAH)

> **Instituição:** CAPE (Centro de Apoio Pedagógico Especializado) de Vitória da Conquista - BA  
> **Propósito:** Plataforma PWA de Quiz Matemático Gamificado adaptada para crianças e adolescentes com TDAH (Transtorno do Déficit de Atenção com Hiperatividade).  
> **Versão:** 4.0.0 (Pivot de Escopo: Quiz Matemático TDAH com React/TypeScript, Dificuldade Modular, Temporizador com Penalidade de 40%-50% e Leaderboard Assíncrono do Professor)

---

## 1. Regras de Negócio e Princípios Arquiteturais Inegociáveis

1. **Modularidade e Clean Code:** Nenhum arquivo deve ser longo ou monolítico. Todo componente, gerador e serviço possui responsabilidade única e desacoplada.
2. **Disciplina Única (Estritamente Matemática):** O banco de questões é restrito à Matemática, categorizado proceduralmente em 3 níveis:
   - **Iniciante:** Somas e subtrações básicas com resultados não-negativos, termos faltantes e historinhas concretas simples.
   - **Intermediário:** As 4 operações fundamentais misturadas (`+`, `−`, `×`, `÷`), expressões respeitando ordem de operações e problemas aritméticos.
   - **Difícil:** Lógica e álgebra de ensino médio (equações de 1º grau, porcentagem, potenciação, progressão aritmética - P.A., e funções afins).
3. **Mecânica de Temporizador e Punição Positiva TDAH:**
   - Cada questão possui um cronômetro com feedback visual de barra de progresso suave.
   - **Sem Bloqueio Cognitivo:** Quando o tempo zera, o aluno NÃO é interrompido nem impedido de responder ou retroceder. O aprendizado e a persistência continuam.
   - **Penalidade Proporcional:** Acertos efetuados após o tempo zerar sofrem um decréscimo de **40% a 50%** na pontuação (`SCORING.minOvertimePenalty` = 0.40, crescendo até `maxOvertimePenalty` = 0.50 caso demore mais um ciclo).
   - Respostas erradas recebem 0 pontos independente do tempo. Respostas dentro do prazo recebem pontuação cheia mais bônus de velocidade proporcional ao tempo restante.
4. **Acessibilidade TDAH (UI/UX Focado):**
   - **Foco Visual Único:** Enunciados com tipografia grande (`clamp(1.5rem, 4.5vw, 2.3rem)`), expressões em destaque (`clamp(2.6rem, 10vw, 4.6rem)`) e contraste elevado com paleta escura (reduz sobrecarga sensorial).
   - **Direcionamento de Ação Estrito:** O botão "PRÓXIMA QUESTÃO" permanece cinza e desabilitado até que uma alternativa seja selecionada. Após o clique em uma opção, o botão torna-se verde vibrante com animação de pulso contínuo (`@keyframes pulse-cta`), induzindo a ação imediata do aluno e prevenindo desatenção ou dispersão na tela.
   - **Suporte a Teclado Físico:** Teclas `1-4`, `A-D`, `Enter` para avançar e `Seta para Esquerda` para retroceder.
5. **Leaderboard Assíncrono & Modo Professor:**
   - Persistência local assíncrona (`leaderboardRepository`) em `localStorage` com suporte a filtros por nível.
   - Área do professor protegida por PIN (`1234`) com teclado touchscreen para conferência de notas, premiações e exportação instantânea em CSV.

---

## 2. Mapa de Módulos, Funções e Arquivos

### Camada de Tipos (`src/types/`)
- [`quiz.types.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/types/quiz.types.ts): Definições de `Difficulty`, `QuizPhase`, `Question`, `AnswerRecord`, `ScoreBreakdown`, `QuizState` e `LeaderboardEntry`.

### Camada de Configurações (`src/config/`)
- [`quiz.config.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/config/quiz.config.ts): Configuração de limites de tempo (Iniciante: 20s, Intermediário: 30s, Difícil: 45s), pontos-base (100, 150, 200), taxas de bônus e penalidade de 40%-50%, e chaves de armazenamento.

### Camada de Domínio & Geradores Matemáticos (`src/domain/`)
- [`scoring.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/domain/scoring.ts): Cálculo matemático puro (`overtimePenaltyRate`, `speedBonus`, `scoreAnswer`, `summarizeQuiz`).
- [`questionFactory.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/domain/questionFactory.ts): Gerador de rodadas (`createQuestionSet`) com deduplicação de enunciados.
- [`generators/random.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/domain/generators/random.ts): Utilitários pseudoaleatórios (`randInt`, `pick`, `shuffle`, `buildNumericOptions`, `buildTextOptions`).
- [`generators/beginner.generator.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/domain/generators/beginner.generator.ts): Questões de soma, subtração, termo faltante e problemas cotidianos.
- [`generators/intermediate.generator.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/domain/generators/intermediate.generator.ts): Multiplicação, divisão exata, ordem das operações (`PEMDAS/BODMAS`) e problemas mistos.
- [`generators/advanced.generator.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/domain/generators/advanced.generator.ts): Equações de 1º grau, porcentagem, potenciação, progressão aritmética e funções afins.

### Camada de Estado & Hooks (`src/state/` & `src/hooks/`)
- [`quizReducer.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/state/quizReducer.ts): Reducer imutável para ações `START`, `TICK`, `SELECT`, `NEXT`, `PREVIOUS`, `RESET`.
- [`useQuiz.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/hooks/useQuiz.ts): Hook de fachada única integrando timer, reducer, derivações e auto-salvamento no ranking ao concluir.
- [`useQuizTimer.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/hooks/useQuizTimer.ts): Cronômetro imune a drift e pausa automática quando a aba perde visibilidade (`visibilitychange`).
- [`useQuizKeyboard.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/hooks/useQuizKeyboard.ts): Mapeamento de acessibilidade por teclado.

### Camada de Serviços & Persistência (`src/services/`)
- [`leaderboard.repository.ts`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/services/leaderboard.repository.ts): Repositório assíncrono para listagem ordenada (`list`), salvamento (`save`), limpeza (`clear`) e exportação para arquivo `.csv` (`exportCsv`).

### Camada de Componentes de Interface (`src/components/`)
- **Configuração Inicial (`setup/`):**
  - [`StartScreen.tsx`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/setup/StartScreen.tsx): Entrada do nome do aluno, seleção do nível e botão para acesso do professor.
  - [`DifficultyCard.tsx`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/setup/DifficultyCard.tsx): Card seletor com indicação de tempo e conteúdo pedagógico.
- **Execução do Quiz (`quiz/`):**
  - [`QuizScreen.tsx`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/quiz/QuizScreen.tsx): Layout em tela cheia orquestrando progresso, tempo, questão e ações.
  - [`QuizProgress.tsx`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/quiz/QuizProgress.tsx): Contador em pílula de questão atual e total.
  - [`TimerBar.tsx`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/quiz/TimerBar.tsx): Barra de tempo responsiva com alerta de penalidade ativa pós-tempo.
  - [`QuestionCard.tsx`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/quiz/QuestionCard.tsx): Enunciado e expressão matemática com tipografia gigante.
  - [`OptionButton.tsx`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/quiz/OptionButton.tsx): Botão tátil amplo com atalhos e seleção de alto contraste.
  - [`NextButton.tsx`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/quiz/NextButton.tsx): Botão com transição de inativo (cinza) para verde pulsante (`is-ready`).
- **Resultados & Revisão (`results/`):**
  - [`ResultScreen.tsx`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/results/ResultScreen.tsx): Resumo da pontuação, acertos, penalidades sofridas, revisão detalhada questão por questão com explicações didáticas e reinício.
- **Painel do Professor & Ranking (`leaderboard/`):**
  - [`TeacherGate.tsx`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/leaderboard/TeacherGate.tsx): Modal de autenticação PIN (`1234`) com teclado touchscreen.
  - [`LeaderboardScreen.tsx`](file:///c:/Users/pedro/Downloads/CAPE%20PROJETO%20HACKATON/src/components/leaderboard/LeaderboardScreen.tsx): Tabela assíncrona de ranqueamento com pódios (🥇, 🥈, 🥉), filtros e exportação CSV.

---

## 3. Histórico de Alterações

- **v4.0.0 (Pivot de Escopo: Quiz Matemático Gamificado para TDAH):**
  - **Reestruturação Completa da Stack:** Migração de Svelte 5 para React 19 + TypeScript + Vite PWA + Vitest.
  - **Três Níveis Modulares:** Banco estrito de Matemática com geradores procedurais (`beginner`, `intermediate`, `advanced`).
  - **Mecânica de Punição TDAH:** Penalidade de 40% a 50% para respostas após o término do tempo, permitindo continuar e retroceder sem bloqueio.
  - **Direcionamento de Ação:** Botão de avançar com animação de pulso verde após seleção da alternativa.
  - **Leaderboard Assíncrono do Professor:** Quadro de notas, pódios e exportação CSV protegidos por PIN.
  - **Cobertura de Testes Automatizados:** Testes unitários de pontuação e validação de geradores matemáticos no Vitest.
