# Roteiro de Apresentação — TCC IncluiDev (atualizado pós-revisão)

**Tempo estimado:** 15 a 20 minutos
**Slides:** 13
**Apresentador:** Lucas R. Pedro | **Orientadora:** Esteice Janaina Santos Batista

Este roteiro acompanha o arquivo `IncluiDev_Apresentacao.pptx`. As falas abaixo também estão nas notas do apresentador de cada slide (visíveis só para você, no modo apresentador).

---

## Dicas gerais para a defesa

- **Não leia os slides.** Eles têm pouco texto de propósito — a fala completa está aqui e nas notas.
- **Não abra o sistema ao vivo durante a fala.** Os prints já estão nos slides 7 e 8. Se a banca pedir, abra o link só durante as perguntas.
- **Sobre a ausência de testes com usuários reais:** não seja defensivo. A postura é "a simulação por IA foi uma etapa preparatória e transparente, não um substituto — o teste com humanos é o próximo passo natural", não uma desculpa.

---

## Slide 1 — Capa

**Fala:** "Boa tarde a todos. Agradeço a presença da banca avaliadora. Vou apresentar o trabalho *IncluiDev: Desenvolvimento e Avaliação de uma Plataforma Baseada em Evidências para Apoio ao Ensino de Programação para Pessoas com Deficiência Visual*, orientado pela professora Esteice Janaina."

## Slide 2 — Agenda

**Fala:** "A apresentação segue seis blocos: o contexto e o problema de pesquisa, o referencial teórico, o método, uma visão geral do sistema construído, os resultados — separados em acessibilidade e validação com agentes de IA — e, por fim, a discussão e conclusão."

## Slide 3 — Contexto e Motivação

**Fala:** "O ensino de programação depende fortemente de metáforas visuais: diagramas de fluxo, blocos coloridos, indentação espacial. Para uma pessoa com deficiência visual usando leitor de tela, isso significa memorizar a estrutura lógica do código enquanto ouve linha por linha — uma sobrecarga cognitiva real, documentada na literatura. Soluções como a linguagem Quorum e o Code Jumper existem, mas estão fragmentadas pela web, sem um ponto central de acesso."

## Slide 4 — Problema de Pesquisa e Objetivos

**Fala:** "Isso nos leva à pergunta central: como centralizar, classificar e recomendar de forma acessível metodologias, ferramentas e pesquisas sobre ensino de programação para PcDV? O objetivo geral foi construir e avaliar um portal que funcione como repositório interativo. Os objetivos específicos foram quatro: organizar os recursos em uma taxonomia coerente, garantir conformidade com WCAG 2.1 nível AA, implementar um sistema de recomendação por perfil — o Assistente Guiado — e avaliar usabilidade, aceitação e acessibilidade com métodos e escalas padronizados."

## Slide 5 — Referencial Teórico

**Fala:** "A literatura converge em duas estratégias distintas: adaptar ferramentas já consolidadas, como o VS Code com leitores de tela, ou criar ambientes e linguagens desde a origem pensando em acessibilidade, como a própria Quorum e o Code Jumper. Essas referências, junto com as diretrizes WCAG e os instrumentos SUS e TAM, formaram a base teórica do projeto."

## Slide 6 — Método

**Fala:** "A pesquisa é de natureza aplicada, com métodos mistos. Ela se estruturou em três fases: o desenvolvimento do repositório em si, a construção do Assistente Guiado, e a avaliação do sistema — que combinou auditorias automatizadas, verificação manual e, como etapa preliminar, uma simulação com agentes de IA antes dos testes empíricos futuros com usuários reais."

## Slide 7 — O Portal IncluiDev

**Fala:** "Esta é a tela inicial do portal. Construído como uma Single Page Application em React e Vite, ele consolidou 34 recursos — entre ferramentas, artigos e guias — organizados em uma taxonomia de duas dimensões: nível de ensino e público-alvo. A acessibilidade foi parte da concepção desde o início, com atributos WAI-ARIA nativos, não adicionados depois."

## Slide 8 — O Assistente Guiado

**Fala:** "Em vez de uma listagem estática de filtros, o usuário se autoidentifica entre quatro perfis — Estudante, Professor, Pesquisador ou Desenvolvedor — responde a perguntas direcionadas ao seu objetivo, e o sistema compara essas respostas com as tags dos conteúdos cadastrados, devolvendo recomendações sem sobrecarregar quem depende de tecnologia assistiva."

## Slide 9 — Resultados: Acessibilidade

**Fala:** "Nas auditorias automatizadas, o Lighthouse apontou 96 de 100 no desktop e 95 no mobile; o WAVE não encontrou erros estruturais. Mas é importante frisar: ferramentas automatizadas capturam, em média, só cerca de 40% dos erros reais de acessibilidade. Por isso a auditoria manual — navegação por teclado, leitura com NVDA, verificação de `aria-live` — foi essencial, e confirmou que não há armadilhas de foco e que as mudanças de tela são anunciadas corretamente."

## Slide 10 — Resultados: Validação com Agentes de IA

**Fala:** "Como etapa preliminar à validação empírica, simulamos as quatro personas com agentes de IA, que responderam de forma qualitativa às perguntas do SUS e do TAM — não como uma nota de 1 a 5, mas com justificativas dissertativas, todas documentadas publicamente no GitHub do projeto. Um padrão temático interessante emergiu: Estudante, Professor e Pesquisador destacaram, de formas diferentes, a redução do esforço de busca; já o Desenvolvedor valorizou mais a completude técnica das informações. Isso é tratado explicitamente como um indicador heurístico, não como medida psicométrica — a literatura recente, como Seshadri et al. (2026), mostra que agentes de IA são *proxies* não confiáveis para usuários reais, e adotamos essa ressalva integralmente."

## Slide 11 — Discussão

**Fala:** "Em conjunto, os resultados indicam que a arquitetura lógica do IncluiDev é coesa e que a navegação por perfil reduz o esforço de busca — mas essa validação preliminar não substitui a experiência humana real. Ela serviu como um filtro de qualidade antes da etapa empírica."

## Slide 12 — Conclusão

**Fala:** "O IncluiDev demonstra que é possível centralizar, com rigor de acessibilidade, recursos hoje dispersos pela web. As principais limitações desta fase são justamente a ausência de testes com usuários reais — pelo prazo da pesquisa — e o fato de ferramentas automatizadas cobrirem só uma fração dos problemas reais de interface. Por isso, o trabalho futuro mais importante é testar com pessoas reais, especialmente PcDV, incluindo tanto estudantes quanto professores, e comparar os resultados simulados de SUS/TAM com avaliações orgânicas."

## Slide 13 — Encerramento

**Fala:** "Obrigado pela atenção. O código-fonte, os artefatos de validação e o sistema em produção estão linkados aqui. Fico à disposição para as perguntas."

---

## Possíveis perguntas da banca

**"Por que não testaram com pessoas reais? A IA não invalida os resultados?"**
> "Não usamos a IA como substituto, mas como uma etapa preparatória declarada — inclusive citamos o estudo de Seshadri et al. (2026), que demonstra exatamente essa limitação dos agentes de IA. A simulação serviu para confirmar que a árvore de decisão não tem inconsistências graves antes de investir tempo em testes com participantes reais, que é o próximo passo natural do projeto."

**"O que diferencia o IncluiDev de simplesmente buscar no Google?"**
> "A curadoria e a taxonomia. No Google, a pessoa precisa navegar por resultados não estruturados, muitas vezes inacessíveis. No IncluiDev, o conteúdo já passou por triagem de relevância e acessibilidade, e o Assistente Guiado entrega uma recomendação direta em poucos cliques via teclado."

**"As ferramentas de acessibilidade automatizadas garantem que o site é 100% acessível?"**
> "Não — e isso está explícito no trabalho. Elas capturam em média 40% dos problemas reais. Por isso complementamos com auditoria manual usando leitor de tela e navegação exclusiva por teclado."
