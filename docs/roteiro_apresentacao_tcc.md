# Roteiro de Apresentação — TCC IncluiDev

**Tempo estimado:** 15 a 20 minutos  
**Número sugerido de slides:** 12 slides  
**Apresentadores:** Lucas R. Pedro e Esteice Janaina Santos Batista

---

## Dicas Gerais para a Defesa
- **Não leia os slides:** Os slides devem ter pouco texto. Deixe o texto para a sua fala.
- **Demonstre o sistema:** Se possível, tenha o site aberto em uma aba paralela para uma demonstração de 1 minuto (se a banca permitir). Se não, use prints claros da tela do Assistente Guiado.
- **Postura sobre a Metodologia de IA:** Se a banca questionar a ausência de usuários reais, **não seja defensivo**. Afirme claramente que a literatura moderna usa IAs como um "filtro heurístico" (Seshadri et al., 2026), e que testes empíricos com humanos sempre são o padrão-ouro, mas que a simulação garantiu a viabilidade da lógica antes do contato com pessoas reais.

---

## Estrutura de Slides e Script de Fala

### Slide 1: Capa
- **Visual:** Título do TCC, Nome dos Autores, Orientador(a), Logo da UFMS e Faculdade de Computação.
- **Fala Sugerida:** "Olá a todos, bom dia/boa tarde. Gostaríamos de agradecer a presença da banca avaliadora. Hoje apresentaremos nosso TCC intitulado: *IncluiDev: Desenvolvimento e Avaliação de uma Plataforma Baseada em Evidências para Apoio ao Ensino de Programação para Pessoas com Deficiência Visual*."

### Slide 2: Contexto e Motivação
- **Visual:** Imagens ilustrativas (um IDE normal de programação cheio de cores/indentações ao lado de um ícone de deficiência visual com um ponto de interrogação). 
- **Bullet points:**
  - Metáforas visuais na programação.
  - Sobrecarga cognitiva no uso de leitores de tela.
  - Ferramentas isoladas.
- **Fala Sugerida:** "A nossa pesquisa partiu de um problema real: o ensino de programação baseia-se fortemente na visão. Diagramas, blocos coloridos como o Scratch e indentações de código criam enormes barreiras para alunos cegos. A comunidade científica e a indústria até criaram soluções ótimas (como a linguagem Quorum e o Code Jumper), mas esses recursos estão completamente fragmentados pela web. É muito difícil para um professor ou aluno PcDV encontrar o que realmente precisa."

### Slide 3: O Problema de Pesquisa e Objetivos
- **Visual:** Pergunta central em destaque. E os objetivos (Geral e Específicos) em bullet points resumidos.
- **Fala Sugerida:** "Nossa pergunta central foi: *Como centralizar, classificar e recomendar de forma acessível ferramentas e pesquisas sobre o ensino de programação para Pessoas com Deficiência Visual?* Nosso objetivo geral foi construir o IncluiDev, e como objetivos específicos, organizamos uma taxonomia dos recursos, construímos um sistema de recomendação dinâmico chamado 'Assistente Guiado', garantimos acessibilidade WCAG 2.1 e conduzimos uma validação de usabilidade com personas simuladas."

### Slide 4: Fundamentação Teórica
- **Visual:** Duas colunas ou ícones: "Abordagens Tangíveis" (hardware) e "Abordagens de Software" (Leitores de tela, Quorum).
- **Fala Sugerida:** "O nosso referencial teórico se fundamenta nas principais respostas acadêmicas a esse problema. Duas frentes emergem fortemente na literatura: as tecnologias tangíveis, que tiram o aluno da tela e o levam pro mundo físico, como o projeto Code Jumper, e tecnologias adaptadas por software, com linguagens criadas já sob o rigor das evidências científicas de audição fonética, a exemplo da Quorum Language. São essas soluções que povoaram nosso catálogo."

### Slide 5: Desenvolvimento (O Portal IncluiDev)
- **Visual:** Um print bonito da tela inicial do Portal (Desktop e Mobile lado a lado). Ícones das tecnologias: React, Vite, Node.js.
- **Fala Sugerida:** "Para solucionar a fragmentação, construímos o IncluiDev, uma *Single Page Application* em React. O projeto consolidou 34 recursos fundamentais, que vão de \textit{papers} a documentações da W3C. O desenvolvimento foi pautado desde a linha zero na acessibilidade, com marcações semânticas ricas utilizando ARIA Labels para garantir total compatibilidade com leitores de tela como NVDA."

### Slide 6: A Cereja do Bolo - O Assistente Guiado
- **Visual:** Print do Assistente e das "Personas" (Estudante, Professor, Desenvolvedor, Pesquisador).
- **Fala Sugerida:** "Nós percebemos que não adiantaria centralizar o conteúdo se o usuário cego tivesse que ler 30 resultados seguidos numa tabela. Para isso, criamos o 'Assistente Guiado'. Ele é um motor de busca orientado por perfis. O usuário entra, escolhe sua jornada (se é um estudante, um professor) e responde a 2 perguntas. Em tempo real, através de um sistema de match de *tags*, a aplicação exibe somente aquilo que resolve a sua dor pontual, reduzindo drasticamente a sobrecarga de leitura e busca."

### Slide 7: Diagrama Lógico e Fluxograma (Opcional)
- **Visual:** Inserir a figura `fluxograma_navegacao.jpg` que geramos.
- **Fala Sugerida:** "Este é o fluxograma que rege o Assistente. Vejam que a árvore de decisão atua de forma determinística em cima do motor de inferência, impedindo respostas vazias e garantindo o alinhamento pedagógico dos resultados."

### Slide 8: Validação 1 - Testes de Acessibilidade
- **Visual:** Ícones do Google Lighthouse (nota verde 96/100) e do WAVE. 
- **Fala Sugerida:** "Para provarmos que a ferramenta atende o público para qual foi desenhada, rodamos baterias de testes mistos. No Google Lighthouse atingimos 96/100, e no WAVE confirmamos a ausência de armadilhas de teclado. O principal acerto técnico foi a manipulação de regiões `aria-live='assertive'`, que avisa instantaneamente o usuário cego de qualquer alteração que o Assistente Guiado faça na tela, evitando a desorientação."

### Slide 9: Validação 2 - Simulação com Agentes de IA
- **Visual:** Rápida explicação do "Prompt" de Persona vs "Formulários SUS e TAM".
- **Fala Sugerida:** "Como validação preliminar do fluxo lógico, adotamos uma metodologia emergente baseada em Agentes de IA. Diante de limitações de tempo para testes reais massivos, instruímos Grandes Modelos de Linguagem para simular os quatro perfis de usuário do nosso sistema, e os submetemos à *System Usability Scale* (SUS) e ao *Technology Acceptance Model* (TAM)."

### Slide 10: Resultados da Validação com IA
- **Visual:** Textos qualitativos curtos ("Baixa carga de leitura", "Busca assertiva").
- **Fala Sugerida:** "As quatro personas virtuais concluíram o fluxo com respostas dissertativas muito favoráveis. O agente de 'Estudante', por exemplo, justificou que a ferramenta filtrou perfeitamente os conteúdos de lógica em blocos sem sobrecarregá-lo de menus, validando o propósito do nosso assistente. É fundamental frisar que, metodologicamente, nós tratamos essas respostas não como escores finais definitivos (já que IAs não sentem cansaço real), mas sim como um poderoso filtro heurístico que confirmou a excelência da arquitetura lógica desenvolvida."

### Slide 11: Conclusão
- **Visual:** Pontos fortes (Taxonomia, Assistente, Acessibilidade).
- **Fala Sugerida:** "Concluímos que o IncluiDev cumpriu sua proposta. Ele centraliza a dispersão, aplica rigorosamente as diretrizes da WCAG e entrega um mecanismo eficiente focado na redução da carga cognitiva de Pessoas com Deficiência Visual através da busca direcionada."

### Slide 12: Limitações e Trabalhos Futuros
- **Visual:** Bullet points: "Validação Empírica", "Expansão da Base de Dados".
- **Fala Sugerida:** "Nós reconhecemos que a principal limitação deste MVP está justamente na natureza simulada da sua validação de usabilidade. Portanto, os trabalhos futuros desta pesquisa englobam a condução de testes empíricos rigorosos em campo com estudantes e professores humanos, além da contínua curadoria para expansão do banco de dados do catálogo. Muito obrigado."

---

## Possíveis Perguntas da Banca e Como Responder

**Banca:** *"Por que vocês não testaram com pessoas reais? A IA não invalida os resultados de vocês?"*
**Sua Resposta:** *"Excelente pergunta, professor(a). Nós deixamos muito claro no texto (com base no estudo de Seshadri de 2026) que a IA não substitui o humano. A IA foi usada aqui como uma etapa de validação 'Em Fases'. Em projetos de software modernos, a simulação serve como um teste unitário de fluxo. Ela garantiu que nossa árvore de decisão de tags não tem buracos. De fato, o teste real humano é o próximo passo fundamental."*

**Banca:** *"O que torna seu site mais acessível que o Google para um aluno cego procurar algo?"*
**Sua Resposta:** *"A diferença é a assertividade e a carga cognitiva. No Google, ele precisaria dar 'Tab' por dezenas de anúncios e páginas não estruturadas, filtrando o que presta e o que não presta. No IncluiDev, a taxonomia já é especializada, e o Assistente Guiado funciona à base de 2 cliques via teclado, entregando exatamente uma recomendação final, toda encapsulada nas diretrizes WCAG."*