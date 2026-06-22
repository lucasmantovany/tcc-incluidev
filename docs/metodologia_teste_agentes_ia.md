# Metodologia de Avaliação Simulada por Agentes de IA (LLMs)

Como etapa preliminar de validação da arquitetura lógica, antes da realização de testes empíricos com participantes humanos (como pessoas com deficiência visual e educadores especialistas), este projeto empregará a técnica de simulação baseada em Grandes Modelos de Linguagem (*Large Language Models - LLMs*) atuando como *Agentes Avaliadores*. Esta metodologia baseia-se na literatura recente sobre a simulação de usuários conversacionais em interações humano-computador e funciona como um filtro rigoroso de qualidade.

## 1. Fundamentação e Limitações do Método

A avaliação por Agentes de IA consiste em instanciar modelos como o GPT-4 (OpenAI) ou Claude 3 (Anthropic) com "Prompts de Sistema" rigorosos, fazendo-os interpretar Personas pré-definidas. O LLM navega teoricamente pelas opções textuais da interface e preenche formulários de avaliação, como a *System Usability Scale* (SUS) e o *Technology Acceptance Model* (TAM).

**Ressalvas Acadêmicas Importantes:**
Conforme apontado pelo estudo *Lost in Simulation: LLM-Simulated Users are Unreliable Proxies for Human Users in Agentic Evaluations* (Seshadri et al., 2025), é imperativo reconhecer que Agentes de IA **não são substitutos perfeitos para humanos**. O estudo demonstra que:
- LLMs apresentam **descalibração de sucesso** (frequentemente subestimam dificuldades extremas ou superestimam tarefas fáceis).
- Eles tendem a produzir "artefatos conversacionais" (como excesso de polidez ou perguntas desnecessárias).
- Não reproduzem fielmente a sobrecarga cognitiva e a fadiga sensorial de um usuário humano utilizando um leitor de tela (NVDA/JAWS).

Portanto, no TCC, essa abordagem deve ser categorizada como uma **Validação Heurística Baseada em Personas Artificiais**, servindo como uma etapa preparatória robusta para homologação do design lógico (árvore de decisão). Os resultados estabelecem uma base segura para que futuras iterações da pesquisa contemplem os testes práticos definitivos com o público-alvo real.

## 2. Configuração das Personas (System Prompts)

Para o teste, a IA será alimentada com contextos específicos (Personas). Exemplo de estrutura de Prompt para a persona de **Estudante**:

> **Contexto Principal:** "Aja rigorosamente como Ana Clara, uma estudante do Ensino Básico de 17 anos com deficiência visual total. Você utiliza o leitor de tela NVDA diariamente e possui um alto interesse em aprender a programar, mas frustra-se com interfaces inacessíveis. Sua familiaridade atual com programação é baixa. Não responda de forma robótica. Avalie a seguinte interface de acordo com as suas capacidades e limitações."

> **Instrução de Interação:** "Abaixo está a representação em texto da tela inicial do portal 'IncluiDev'. O que você clicaria para tentar encontrar conteúdos lúdicos de programação em blocos acessíveis para você?"

## 3. Protocolo de Execução do Teste

O pesquisador deve seguir as seguintes etapas para cada uma das 4 personas da Busca Guiada (Estudante, Professor, Pesquisador, Desenvolvedor):

### Passo A: Mapeamento de Texto da Interface
Como o LLM interage com texto, as telas do portal React devem ser extraídas e fornecidas em blocos limpos, contendo os rótulos de botões, perguntas e opções de resposta da Busca Guiada.

### Passo B: Condução Guiada e Árvore de Decisão
O pesquisador deve solicitar que a IA faça escolhas sucessivas com base no seu objetivo. 
*Exemplo:* A IA com a Persona de Professor declara que precisa de "Metodologias e planos de aula" e escolhe a opção correspondente. O pesquisador envia como retorno a tela gerada pelos algoritmos de filtragem do React com as recomendações obtidas.

### Passo C: Aplicação do SUS e TAM
Após a IA visualizar os resultados da Busca Guiada, o pesquisador submete os questionários originais do portal:
> "Ana Clara, baseado na sua experiência navegando pelo fluxo acima e nos resultados que encontrou, por favor classifique as seguintes 10 afirmações do SUS de 1 (Discordo Totalmente) a 5 (Concordo Totalmente), justificando cada uma brevemente."

### Passo D: Tabulação e Análise Cruzada
O pesquisador coleta os escores fornecidos pela IA, computa as médias finais do SUS e compila as respostas dissertativas para análise qualitativa no artigo do TCC. Deve-se cruzar as justificativas dadas pelas IAs com as diretrizes do WCAG para enriquecer a discussão técnica.
