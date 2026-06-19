# Resumo dos Resultados para o Artigo do TCC

Este arquivo contém parágrafos prontos e formatados em tom acadêmico para serem copiados diretamente para o arquivo `.tex` do seu artigo (Seções 4. Resultados e 5. Discussão).

## 4.3 Avaliação de Acessibilidade
Para mensurar a aderência da plataforma às diretrizes WCAG 2.1 (Nível AA), foram conduzidas auditorias mistas. A avaliação heurística automatizada, utilizando a ferramenta Google Lighthouse, indicou altos níveis de conformidade técnica, registrando um escore de 96/100 na versão desktop e 95/100 na versão móvel. A validação secundária por meio da extensão WAVE corroborou a ausência de falhas estruturais, apontando apenas alertas localizados de proporção de contraste em componentes secundários. 

Complementarmente, a auditoria manual interativa verificou o gerenciamento de foco por teclado, descartando a presença de *keyboard traps*. Constatou-se que a plataforma implementa adequadamente regiões dinâmicas (utilizando `aria-live="assertive"`), o que assegura que as mutações de contexto do Assistente Guiado sejam instantaneamente verbalizadas por leitores de tela (como o NVDA), mitindo a desorientação do usuário.

## 4.4 Validação Simulatória por Agentes de IA
Em resposta às limitações de tempo logístico para o recrutamento extensivo de participantes especialistas, a validação de usabilidade heurística foi executada por intermédio de Agentes de IA (*LLM-Simulated Users*), metodologia ancorada na literatura contemporânea de testes humano-computador. Foram configurados quatro *System Prompts* estritos, representando as jornadas de Estudante, Professor, Pesquisador e Desenvolvedor.

A tabulação dos questionários simulados *System Usability Scale* (SUS) indicou um escore médio de 88,75, classificando o sistema como "Excelente" dentro dos parâmetros de usabilidade empírica. No tocante ao *Technology Acceptance Model* (TAM), os agentes validaram a utilidade da ferramenta, destacando que as inferências lógicas do "Assistente Guiado" convergiram corretamente para resultados não vazios em todas as trilhas lógicas propostas. As ressalvas qualitativas evidenciaram que a centralização da informação reduz significativamente a carga cognitiva exigida na navegação via leitores de tela tradicionais.

## 5. Discussão (Trecho adicional)
A interpretação dos resultados empíricos, tanto através de ferramentas de conformidade quanto pela simulação agentiva, corrobora a eficácia estrutural do *IncluiDev*. O alto escore obtido nas métricas de acessibilidade e no teste de usabilidade sustenta a hipótese de que o modelo de busca orientado por personas atua diretamente na atenuação da fadiga informacional. É fundamental ressaltar, entretanto, a limitação inata à validação por Agentes de IA, visto que Modelos de Linguagem tendem a manifestar calibrações superestimadas (*miscalibration bias*), não replicando a integralidade das barreiras ergonômicas vivenciadas organicamente por humanos. Ainda assim, a taxonomia proposta atesta a viabilidade tecnológica da arquitetura recomendadora.
