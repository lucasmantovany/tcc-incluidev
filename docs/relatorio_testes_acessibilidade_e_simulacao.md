# Relatório de Testes: Acessibilidade, Validação Manual e Simulação de Agentes

Este documento consolida os resultados obtidos através das auditorias automatizadas (Lighthouse e WAVE), a revisão heurística manual de acessibilidade e a bateria de testes de usabilidade simulada por Agentes de IA.

## 1. Avaliação Automatizada de Acessibilidade

### 1.1 Resultados do Google Lighthouse
Os testes foram executados na URL de produção `https://tcc-incluidev.vercel.app/`.
- **Score Desktop:** 96 / 100
- **Score Mobile:** 95 / 100

**Problemas Encontrados (Oportunidades de Melhoria):**
1. **Contraste de Cores (Color Contrast):** 
   - A ferramenta apontou contraste insuficiente nos subtítulos H4 dentro dos cards da tela de categorias ("Ensino Básico", "Ensino Técnico", etc). O texto preto sobre fundo `#1a2436` gera um ratio de 1.34:1, sendo que o recomendado (WCAG AA) é 3:1 para textos em negrito grandes ou 4.5:1 para textos normais.
   - O botão "Explorar Tudo" apresentou contraste limite de 3.67:1 entre o texto branco e o fundo `#3b82f6`.
   - Links no rodapé apresentaram contraste de 3.07:1.
2. **Nomes Acessíveis (Label Content Mismatch):** 
   - Houve um aviso sobre *label-content-name-mismatch* no botão "Explorar Tudo", indicando divergência entre o nome visível e o lido pelo leitor.

**Aprovações Relevantes:**
- Atributos ARIA (Roles, Hidden, Validade) passaram em 100% dos testes.
- Navegação estrutural (Headings H1-H6) e `Skip-link` foram corretamente detectados e validados.
- Viewport e redimensionamento de tela aprovados em acessibilidade visual.

### 1.2 Resultados do WAVE (Web Accessibility Evaluation Tool)
A verificação via extensão WAVE confirmou a excelência da estruturação de Landmarks HTML5 (Header, Main, Section, Footer) e ausência de erros críticos (Zero Errors). O único alerta coincidiu com o apontamento do Lighthouse sobre as questões de contraste nos botões e no rodapé.

---

## 2. Auditoria Manual Heurística (Leitor de Tela e Teclado)
Conforme a metodologia de acessibilidade, testes manuais foram conduzidos inspecionando o DOM (Document Object Model) e simulando a semântica para leitores de tela.

**Resultados da Auditoria Manual:**
- **Navegação por Teclado:** O sistema gerencia o `Focus Ring` ativamente. Componentes interativos, como o rádio button do Wizard (Assistente Guia), reagem de forma visual (mudança de borda e cor de fundo) ao focar usando a tecla `Tab`. Não foram detectados *Keyboard Traps*.
- **Leitores de Tela (Atributos ARIA dinâmicos):** 
  - A aplicação faz o uso excelente da "região viva" (`aria-live="assertive"`) na classe `sr-only` da página do Assistente. Ao avançar de etapa, o sistema atualiza programaticamente a div, forçando o NVDA/JAWS a ler as instruções dinâmicas da Etapa 2, Etapa 3 sem que o usuário precise procurar o foco manualmente.
  - Campos do formulário `Experiencias.jsx` possuem foco associado pelo `htmlFor`, tornando o preenchimento fluido e não-ambíguo.

---

## 3. Avaliação Simulada por Agentes de IA (LLM-Simulated Users)

Conforme proposto, 4 testes foram executados instanciando Modelos de Linguagem (GPT-4 class) com System Prompts estritos, obrigando-os a atuar nas 4 personas mapeadas pelo TCC para avaliar o fluxo lógico e responder aos questionários SUS e TAM.

### 3.1 Persona: Estudante PcDV (Ana Clara)
*Contexto:* Ana Clara busca aprender lógica em blocos e materiais de iniciação, usa NVDA.
- **Interação:** No fluxo, escolheu "Estudante", procurou por "Lógica de Blocos e Robótica". A recomendação de linguagem baseada em áudio e ferramentas físicas (ex: Code Jumper) foi entregue corretamente.
- **Escore SUS Simulado:** 87.5
- **Escore TAM Simulado:** Alto (Percepção de utilidade extrema ao filtrar os resultados sem sobrecarregá-la visualmente).
- **Justificativa da IA:** "A interface fez perguntas objetivas. Não tive que ler centenas de links de pesquisa, o que aliviou minha fadiga com o NVDA."

### 3.2 Persona: Professor (Carlos Eduardo)
*Contexto:* Busca metodologias inclusivas para salas de ensino básico.
- **Interação:** Escolheu "Professor", necessitava de "Estratégias metodológicas". Retornou planos de aula e diretrizes educacionais.
- **Escore SUS Simulado:** 92.5
- **Escore TAM Simulado:** Muito Alto
- **Justificativa da IA:** "Como educador, o repositório centralizado salvou horas de pesquisa em bases como Google Scholar. O caminho foi fluido."

### 3.3 Persona: Pesquisador (Lúcia)
*Contexto:* Mestranda fazendo RSL sobre acessibilidade, precisa de estado da arte.
- **Interação:** Escolheu "Pesquisador", precisava de "Revisões sistemáticas". A árvore filtrou apenas \textit{papers} revisados por pares e artigos sobre heurísticas.
- **Escore SUS Simulado:** 85.0
- **Escore TAM Simulado:** Alto
- **Justificativa da IA:** "A busca em 3 cliques foi mais eficaz do que queries booleanas longas em bases digitais. O formulário é amigável."

### 3.4 Persona: Desenvolvedor (Felipe)
*Contexto:* Analista de Sistemas focado em conformidade WCAG e desenvolvimento de código.
- **Interação:** Escolheu "Desenvolvedor", focado em "Normas, WCAG e Boas Práticas".
- **Escore SUS Simulado:** 90.0
- **Escore TAM Simulado:** Alto
- **Justificativa da IA:** "A arquitetura e marcações técnicas estavam todas lá. Interface limpa sem ruído desnecessário."

### Resumo das Escalas (Dados das Simulações)
- **Média Geral do SUS (Simulada):** 88.75 / 100 (Classificação: Excelente / Adjetivo: *Best Imaginable*)
- **Percepção (TAM):** A centralização minimizou severamente a Carga Cognitiva e a jornada orientada gerou uma alta utilidade percebida.
- **Limitações Reconhecidas:** Conforme previsto na metodologia, os agentes de IA tendem a dar pontuações ligeiramente mais otimistas (Miscalibration bias), porém atestam solidamente a coesão lógica do fluxo desenvolvido.
