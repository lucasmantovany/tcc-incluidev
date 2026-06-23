# Validação de Usabilidade por Simulação de Agentes de IA (LLMs)

Este diretório contém os artefatos completos e o registro histórico das sessões de testes de usabilidade simuladas por **Agentes de IA (LLM-Simulated Users)**, conduzidas de forma preliminar para homologação estrutural do Portal IncluiDev.

A metodologia e a fundamentação científica adotada são detalhadas no artigo principal do TCC e amparadas pela literatura recente sobre simulação de usuários conversacionais em interação humano-computador (Seshadri et al., 2026).

---

## 📂 Conteúdo deste Diretório

- **`persona_estudante_ana_clara.md`** — Sessão completa de interação, System Prompt, logs de navegação no Assistente Guiado e questionários SUS/TAM respondidos pelo agente simulando o perfil de estudante cega (Ana Clara, 17 anos).
- **`persona_professor_carlos_eduardo.md`** — Registro de teste do agente simulando o perfil do professor de informática do ensino técnico (Carlos Eduardo, 42 anos).
- **`persona_pesquisadora_mariana_souza.md`** — Registro de teste do agente simulando o perfil de pesquisadora acadêmica e doutoranda (Mariana Souza, 31 anos).
- **`persona_desenvolvedor_rafael_martins.md`** — Registro de teste do agente simulando o perfil do desenvolvedor de software de tecnologia assistiva (Rafael Martins, 29 anos).

---

## 🛠️ Metodologia e Modelagem do Teste

O protocolo de execução de teste seguiu quatro fases estritas para cada agente simulado:

### Passo A: Mapeamento de Interface
A interface gráfica da aplicação React foi convertida em representações puramente textuais de alta fidelidade semântica, contendo a hierarquia de títulos, rótulos de botões, opções de rádio-button e descrições técnicas dos estados focáveis, simulando o que um leitor de tela (como o NVDA) verbalizaria.

### Passo B: Condução Guiada (Árvore de Decisão)
O pesquisador enviou prompts de interação sucessivos com base nos objetivos de cada persona. Os agentes de IA analisaram as opções de navegação fornecidas e responderam escolhendo os botões e rádio-buttons correspondentes à sua persona de forma fundamentada.

### Passo C: Aplicação das Escalas SUS e TAM
Após o agente receber as recomendações geradas em tempo real pelo portal React, ele foi submetido a dois questionários psicométricos simulados:

#### 1. System Usability Scale (SUS)
Questionário clássico composto por 10 perguntas respondidas em escala Likert de 1 (Discordo Totalmente) a 5 (Concordo Totalmente):
1. Eu acho que gostaria de usar este sistema frequentemente.
2. Eu achei o sistema desnecessariamente complexo.
3. Eu achei o sistema fácil de usar.
4. Eu acho que precisaria de ajuda de suporte técnico para usar este sistema.
5. Eu achei que as várias funções deste sistema estavam bem integradas.
6. Eu achei que havia muita inconsistência neste sistema.
7. Eu imagino que a maioria das pessoas aprenderia a usar este sistema rapidamente.
8. Eu achei o sistema muito pesado/desconfortável de usar.
9. Eu me senti muito confiante usando o sistema.
10. Eu precisei aprender muitas coisas novas antes de conseguir usar o sistema.

*O escore SUS final de cada persona foi calculado de acordo com a fórmula padrão de Brooke (1996), em que as perguntas ímpares têm seus valores subtraídos por 1 e as perguntas pares têm seus valores de resposta subtraídos de 5, multiplicando-se o somatório final por 2.5 (gerando uma nota final de 0 a 100).*

#### 2. Technology Acceptance Model (TAM)
Avaliação qualitativa focada em dois eixos:
- **Percepção de Utilidade (PU):** Grau em que o agente acredita que a ferramenta otimiza e facilita as suas dores reais de busca e ensino.
- **Percepção de Facilidade de Uso (PFU):** Grau em que a interface foi limpa, direta e sem barreiras informacionais durante a interação textual.

---

## ⚠️ Nota de Transparência Científica
Conforme as discussões apresentadas no artigo do TCC (Seção 4.4 e Seção 5), as avaliações simuladas por LLMs servem como **indicadores heurísticos preliminares de consistência lógica** e coesão da árvore de decisão da plataforma. Elas não substituem o teste presencial real com humanos (que possui barreiras orgânicas e fadiga sensorial real que modelos estatísticos de texto não reproduzem), mas provam que a arquitetura sistêmica do portal está perfeitamente madura e segura para a validação empírica presencial (trabalho futuro).
