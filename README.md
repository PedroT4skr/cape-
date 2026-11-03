# CAPE Math - Quiz Matemático Adaptado para TDAH

> Plataforma PWA gamificada de matemática desenvolvida para crianças e adolescentes com Transtorno do Déficit de Atenção com Hiperatividade (TDAH).

---

## 🎯 Objetivo & Proposta de Valor

Estudantes com TDAH frequentemente enfrentam sobrecarga sensorial, perda de foco em interfaces com excesso de estímulos e desmotivação imediata frente a cronômetros punitivos rígidos que bloqueiam o raciocínio.

O **CAPE Math** resolve esses desafios através de:
- **Foco Visual Único:** Tipografia ampliada, paleta de cores escura com alto contraste e sem distrações visuais.
- **Direcionamento Ativo de Atenção:** O botão "PRÓXIMA QUESTÃO" permanece inativo (cinza) e só é ativado após a seleção de uma resposta, momento em que passa a pulsar em verde para induzir o próximo passo natural.
- **Mecânica de Punição Pedagógica Positiva:** Quando o cronômetro zera, o estudante **continua livre para responder e pensar** (ou até retroceder). Caso acerte, recebe pontuação com decréscimo de **40% a 50%**, valorizando a persistência e evitando bloqueios emocionais.
- **Disciplina Estritamente Matemática:** Exercícios procedurais focados exclusivamente em competências numéricas e lógicas.

---

## 🚀 Dificuldades Modulares

| Nível | Tempo / Questão | Pontos Base | Conteúdo Pedagógico |
| :--- | :---: | :---: | :--- |
| **🌱 Iniciante** | 20s | 100 pts | Adição, subtração simples, termos faltantes e problemas cotidianos |
| **⚡ Intermediário** | 30s | 150 pts | As 4 operações fundamentais misturadas e ordem das operações (`PEMDAS`) |
| **🚀 Difícil** | 45s | 200 pts | Equações de 1º grau, porcentagens, potenciação, P.A. e funções afins |

---

## 🏆 Leaderboard Assíncrono para Professores

- **Área Protegida por PIN:** Acesso seguro com senha padrão (`1234`) para professores e mediadores.
- **Pódios & Premiações:** Visualização de melhores pontuações com medalhas de 1º, 2º e 3º lugar por categoria.
- **Exportação CSV:** Download com um clique de relatórios em planilha contendo tempo gasto, acertos, questões respondidas fora do tempo e notas finais.

---

## 🛠️ Stack Tecnológica

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite 6 + Vite PWA (Offline-ready)
- **Design System:** CSS Modular, Alto Contraste (WCAG AAA), Animações Guiadas
- **Testes Unitários:** Vitest
- **Arquitetura:** Clean Architecture com Reducer Puro, Custom Hooks e Repositório Assíncrono

---

## 🏁 Como Executar Localmente

### Pré-requisitos
- Node.js 18+
- pnpm (ou npm / yarn)

### Passo a passo

```bash
# 1. Instalar dependências
pnpm install

# 2. Executar suíte de testes
pnpm exec vitest run

# 3. Iniciar servidor de desenvolvimento
pnpm dev

# 4. Gerar build de produção
pnpm build
```

---

## 🔒 Credenciais de Acesso Pedagógico

- **PIN do Professor:** `1234`
