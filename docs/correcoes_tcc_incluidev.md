# Correções para o TCC IncluiDev — prontas para colar no `.tex`

Este documento traz, em sequência, as três correções combinadas: (1) reescrita da Seção 4.4 e reforço da 3.3 para reduzir o risco metodológico dos escores simulados; (2) as 4 reescritas de estilo que já tínhamos validado e que sumiram desta versão final; (3) o ajuste do Abstract/Resumo. No fim, a entrada de referência nova.

---

## 1. Seção 3.3 (Método) — adicionar a citação que falta

**Onde:** no parágrafo que introduz a simulação por Agentes de IA, antes de mencionar SUS/TAM.

**Adicionar este trecho** (a citação `[Seshadri et al. 2026]` é nova — ver item 4 abaixo):

> O protocolo de validação do repositório foi estruturado em fases. Como etapa preliminar para homologação da arquitetura lógica do sistema, empregou-se a simulação por Agentes de IA (LLMs) como avaliadores heurísticos, técnica fundamentada na literatura recente sobre simulação de usuários em avaliações de interação humano-computador [Seshadri et al. 2026]. O mesmo estudo alerta que agentes de IA constituem *proxies* não confiáveis para usuários humanos reais, apresentando descalibração de julgamento e ausência de fadiga sensorial genuína; por esse motivo, os resultados desta etapa são tratados aqui como indicadores heurísticos preliminares, e não como medidas psicométricas validadas.
>
> Os agentes foram instruídos a interpretar os quatro perfis de usuário mapeados (Estudante, Professor, Pesquisador e Desenvolvedor), interagindo com a plataforma e respondendo, em formato dissertativo, aos itens da *System Usability Scale* (SUS) [Brooke 1996] e do *Technology Acceptance Model* (TAM) [Davis 1989]. Esta simulação funciona como uma validação heurística preparatória, garantindo a coesão lógica e a acessibilidade técnica da aplicação antes da condução de testes empíricos com grupos representativos de participantes reais, prevista como próxima etapa do projeto.

---

## 2. Seção 4.4 — substituir integralmente

**Por quê:** a versão atual reporta `87.5`, `92.5`, `85.0`, `90.0` e a média `88,75` como se fossem escores medidos. Não são — são números que um LLM gerou dentro de um roleplay. Reportá-los com precisão decimal ao lado de dados reais (Lighthouse 96/100) sugere uma validade que não existe.

**Substituir o parágrafo de resultados por:**

> A interação simulada das quatro personas com o Assistente Guiado resultou em respostas consistentemente favoráveis aos itens do SUS e do TAM, sem que nenhuma das personas reportasse obstáculos estruturais de navegação ou de compreensão do fluxo. As justificativas dissertativas geradas pelos agentes apontaram, de forma qualitativa, baixa carga percebida de leitura sequencial e alta utilidade percebida na recomendação direcionada por perfil — por exemplo, a persona de Estudante destacou a redução do número de links a percorrer, e a persona de Pesquisador comparou favoravelmente a busca guiada a consultas booleanas tradicionais.
>
> É importante destacar que esses resultados não substituem uma medição psicométrica real: por se tratar de uma simulação textual, os valores eventualmente atribuídos pelos agentes às escalas SUS e TAM não possuem o mesmo lastro de validade que escores coletados com usuários humanos. Eles são reportados aqui apenas como sinalização heurística de que a arquitetura lógica do sistema não apresenta inconsistências graves nos quatro fluxos avaliados, servindo de base para a etapa de validação empírica planejada como trabalho futuro (Seção 6).

> **Nota para você decidir:** se a orientadora preferir manter algum dado quantitativo (em vez de só qualitativo), uma alternativa intermediária é manter os 4 escores individuais por persona, mas remover a média geral e adicionar, junto a cada número, algo como *"(valor atribuído pelo agente, sem validade psicométrica)"*. O que eu não recomendo é manter a média de 88,75 sem nenhuma ressalva — esse é o ponto mais provável de ser questionado na banca.

---

## 3. As 4 reescritas de estilo (já validadas antes, sincronizar agora)

### Seção 2.2 — primeira frase

❌ Atual: *"O avanço do estado da arte impulsionou soluções focadas tanto na adaptação dos ambientes existentes quanto no desenvolvimento de novas abordagens de codificação."*

✅ Trocar por: *"Duas estratégias distintas emergem na literatura: a adaptação de ferramentas já consolidadas e o desenvolvimento de novos ambientes e linguagens projetados desde a origem para acessibilidade."*

### Seção 3.2 — duas trocas no mesmo parágrafo

❌ Atual: *"foi proposto o 'Assistente Guiado': um sistema de recomendação baseado em fluxos conversacionais adaptativos."*

✅ Trocar por: *"foi proposto o 'Assistente Guiado': um sistema de recomendação guiado por perfil de usuário."*

❌ Atual: *"com base em quatro perfis operacionais derivados das lacunas mapeadas na literatura"*

✅ Trocar por: *"com base em quatro perfis identificados na literatura"*

(Opcional, mesma seção) ❌ *"Um motor de busca cruza essas respostas em tempo real com as tags semânticas associadas aos recursos catalogados"* → ✅ *"O sistema compara as respostas do usuário com as tags dos conteúdos cadastrados"*

### Seção 4.1 — última frase

❌ Atual: *"garantindo o embasamento teórico e legal demandado por docentes e desenvolvedores de tecnologia em uma única plataforma centralizada."*

✅ Trocar por: *"para que professores e desenvolvedores encontrem referências técnicas e legais em um único lugar."*

### Seção 4.2 — primeira frase

❌ Atual: *"as árvores de decisão e o sistema de cruzamento de tags convergem para resultados não vazios na maioria dos cenários testados."*

✅ Trocar por: *"as árvores de decisão e o sistema de cruzamento de tags retornam ao menos uma recomendação em todos os cenários cobertos pelo acervo atual."*

---

## 4. Abstract e Resumo — atualizar para refletir o que já foi feito

**Abstract (substituir a última frase):**

❌ Atual: *"System validation will be conducted using the System Usability Scale (SUS) [Brooke 1996] and the Technology Acceptance Model (TAM) [Davis 1989], along with qualitative accessibility evaluations."*

✅ Trocar por: *"Accessibility compliance was validated through automated audits (Google Lighthouse, WAVE) and manual testing with screen readers and keyboard navigation. As a preliminary heuristic step, the recommendation logic was also assessed through LLM-simulated user personas applying the System Usability Scale (SUS) [Brooke 1996] and the Technology Acceptance Model (TAM) [Davis 1989]; empirical validation with real participants is planned as future work."*

**Resumo (substituir a última frase):**

❌ Atual: *"A validação do sistema será conduzida utilizando as escalas System Usability Scale (SUS) [Brooke 1996] e o Technology Acceptance Model (TAM) [Davis 1989], juntamente com avaliações qualitativas de acessibilidade."*

✅ Trocar por: *"A conformidade de acessibilidade foi validada por meio de auditorias automatizadas (Google Lighthouse, WAVE) e testes manuais com leitores de tela e navegação por teclado. Como etapa preliminar e heurística, a lógica de recomendação também foi avaliada por meio de personas simuladas por agentes de IA, aplicando as escalas SUS [Brooke 1996] e TAM [Davis 1989]; a validação empírica com participantes reais está prevista como trabalho futuro."*

---

## 5. Nova entrada de referência (adicionar em ordem alfabética, entre Resnick e Seo)

```
Seshadri, P., Cahyawijaya, S., Odumakinde, A., Singh, S., and Goldfarb-Tarrant, S.
(2026). Lost in simulation: LLM-simulated users are unreliable proxies for human
users in agentic evaluations. In Proceedings of the 64th Annual Meeting of the
Association for Computational Linguistics (ACL 2026). Disponível em:
https://arxiv.org/abs/2601.17087.
```

⚠️ **Atenção:** suas notas de metodologia citam este estudo como "(Seshadri et al., 2025)". O ano correto de publicação é **2026** (artigo no arXiv desde janeiro de 2026, aceito na ACL 2026). Ajuste todas as ocorrências de "2025" para "2026" ao citar este trabalho.

---

## 6. Lembrete — duas referências ainda fora da lista (baixa prioridade)

Ainda não incluídas, mas mapeadas no `Materiais_Mapeados.md` como diretamente relevantes ao tema central do TCC:

- Hadwen-Bennett, A., Sentance, S., and Morrison, C. (2018). Making programming accessible to learners with visual impairments: A literature review.
- Morrison, C., et al. (2019). Physical programming for blind and low vision children at scale.

Vale incluir se houver espaço para reforçar o Referencial Teórico (Seção 2.1).
