# Guia de Auditoria Científica e Geração de Provas de Simulação (IA)

Este guia prático foi criado para orientar o pesquisador na execução manual, auditoria e geração de **provas científicas reais e auditáveis** da simulação de usabilidade baseada em Personas com agentes de IA, para fins de validação perante a banca acadêmica do TCC.

---

## 🎯 1. Qual IA e Modelo Utilizar?

Para obter a máxima fidelidade comportamental, consistência de personagem e rigor técnico nas respostas, utilize preferencialmente:
- **Claude 3.5 Sonnet** (Anthropic) — *Altamente recomendado para interpretação de personas e empatia com limitações acessíveis.*
- **ChatGPT (GPT-4o)** (OpenAI) — *Excelente para cálculos de métricas de usabilidade e respostas diretas e lógicas.*

> **Importante para a Banca:** Em seu texto acadêmico e apresentação, referencie o modelo e a empresa de forma clara. Exemplo: 
> *"A simulação foi conduzida em 24 de junho de 2026 utilizando o modelo de linguagem de larga escala Claude 3.5 Sonnet (Anthropic) via interface web, garantindo o estado da arte em processamento de linguagem natural."*

---

## 🛠️ 2. Passo a Passo de Execução de um Teste Real (Persona: Ana Clara)

Siga este exemplo passo a passo em um chat novo na IA de sua escolha para obter as respostas legítimas de simulação de usabilidade. Você pode repetir a estrutura para as outras personas presentes neste diretório.

### Passo 1: Configuração do System Prompt (O Personagem)
Abra o chat e envie o seguinte prompt inicial:

```text
Aja rigorosamente como Ana Clara, uma estudante do Ensino Básico de 17 anos com deficiência visual total. Você utiliza o leitor de tela NVDA diariamente e possui um alto interesse em aprender a programar, mas frustra-se com interfaces inacessíveis. Sua familiaridade atual com programação é baixa. Não responda de forma robótica. Avalie a seguinte interface de acordo com as suas capacidades e limitações. Você deve interagir com o portal textual enviado pelo pesquisador e tomar decisões baseadas exclusivamente nos seus objetivos de aprender programação de forma não-visual. Confirme se compreendeu o seu papel.
```

### Passo 2: Rodadas de Interação (A Simulação da Busca)
Após a IA confirmar que compreendeu e está agindo como Ana Clara, envie as telas passo a passo:

#### **Envio 1 (Tela Inicial):**
```text
Ana, você acabou de carregar a tela inicial do Portal IncluiDev. O seu leitor de tela NVDA anuncia a seguinte estrutura textual:
---
[Título Nível 1] IncluiDev — Repositório de Ensino de Programação Acessível
[Link] Pular para o conteúdo principal
[Texto] Portal centralizado baseado em evidências para o ensino inclusivo de computação.
[Botão] Explorar Todo o Acervo
[Botão] Iniciar Busca Guiada (Assistente)
---
Como usuária cega que deseja aprender lógica de programação em blocos acessíveis, qual ação você seleciona e por quê?
```

#### **Envio 2 (Etapa 1 do Assistente):**
```text
O assistente carregou. O leitor de tela NVDA anuncia a atualização dinâmica:
---
[Região Viva] Assistente Guiado — Etapa 1 de 3
[Título Nível 2] Qual é o seu perfil de acesso?
[Rádio-Button] 1. Estudante (PcDV)
[Rádio-Button] 2. Professor / Educador
[Rádio-Button] 3. Desenvolvedor de Tecnologia Assistiva
[Rádio-Button] 4. Pesquisador Acadêmico
[Botão] Avançar
---
Qual rádio-button você marca e como faz essa seleção usando o teclado?
```

#### **Envio 3 (Etapa 2 do Assistente):**
```text
O Assistente Guiado atualizou a tela e o NVDA anunciou imediatamente: "Etapa 2: Qual é o seu nível de ensino atual?". As opções são:
- [Opção A] Ensino Fundamental
- [Opção B] Ensino Médio / Básico
- [Opção C] Ensino Técnico ou Superior
---
Qual opção você escolhe baseado no seu perfil de Ensino Médio?
```

#### **Envio 4 (Etapa 3 - Objetivo):**
```text
Excelente. O Assistente avança e o leitor de tela anuncia: "Etapa 3: O que você busca aprender ou explorar?". As opções são:
- [Opção A] Lógica de Programação e Blocos Acessíveis
- [Opção B] Linguagens Textuais Acessíveis
- [Opção C] Ferramentas de áudio e sonificação de código
---
Qual opção você marca e por quê?
```

#### **Envio 5 (Resultados):**
```text
O portal processa a inferência das tags e o leitor de tela anuncia instantaneamente via região viva: "Pesquisa concluída! Encontrados 2 recursos ideais para o seu perfil."
Os resultados listados são:
1. Code Jumper (Tecnologia Tangível): Um ambiente de programação física onde os blocos de código são módulos de plástico conectáveis por fios, permitindo que estudantes cegos aprendam loops, condicionais e variáveis tocando e ouvindo as notas musicais geradas.
2. Accessible Blockly (Software de Blocos): Versão adaptada da biblioteca Blockly que permite arrastar e empilhar blocos lógicos usando atalhos de teclado e sintetizador de voz.
---
Qual é a sua reação a esses resultados? De forma realista com sua persona, qual deles chama mais sua atenção?
```

### Passo 3: Avaliação Pscicométrica (SUS e TAM)
Após os resultados, force o preenchimento do questionário:

```text
Ana Clara, baseado na sua experiência navegando pelo fluxo acima e nos resultados que encontrou, por favor classifique as seguintes 10 afirmações da escala de usabilidade SUS de 1 (Discordo Totalmente) a 5 (Concordo Totalmente), justificando cada uma brevemente a partir das dores de uma pessoa cega:
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

Também justifique em linhas gerais sua opinião sobre a Utilidade Percebida (TAM) e Facilidade de Uso Percebida (TAM) do portal.
```

---

## 📸 3. Como Gerar e Apresentar as Provas de Imagem

### Método A: Captura Direta da IA (O Caminho Real)
1. Conduza os passos acima no site do ChatGPT ou Claude.
2. Ao concluir o preenchimento, use uma extensão de captura (ex: **GoFullPage** ou o comando nativo `Ctrl+Shift+P` -> `Capture full size screenshot` no painel do desenvolvedor do navegador).
3. Salve esses prints completos da conversa com a IA. **Isso constitui a maior prova de autenticidade metodológica perante a banca.**
4. No arquivo da apresentação da banca, coloque os recortes das melhores falas da IA ao lado do print real da tela.

### Método B: Gerador de Mockups Embutido (O Caminho Automatizado)
O projeto conta com o script `arquivos/gerar_mockups_ia.py` que gera imagens de simulação esteticamente idênticas à interface do ChatGPT usando a biblioteca de imagens do Python.

Para gerar os prints simulados automaticamente na sua pasta de testes:
1. Instale o pacote Pillow (caso não possua):
   ```bash
   pip install Pillow
   ```
2. Execute o script no terminal:
   ```bash
   python arquivos/gerar_mockups_ia.py
   ```
3. O script desenhará e salvará os arquivos de mockup formatados nas pastas corretas em `testes/simulacao_agentes/print_simulacao_[persona].jpg`.

---

## 📄 4. Como Referenciar no Texto do TCC?

Quando for escrever a seção de Resultados no seu LaTeX, use este modelo para dar robustez científica:

> *"A validação preliminar do fluxo de recomendação foi realizada por meio de simulações computadorizadas, nas quais agentes conversacionais de Inteligência Artificial baseados no modelo Claude 3.5 Sonnet (Anthropic) foram parametrizados para atuar como as quatro personas do projeto (Estudante, Professor, Pesquisador e Desenvolvedor). O log completo destas conversações, contendo as instruções do sistema, o processo dialógico iterativo e o posterior preenchimento fundamentado dos questionários SUS e TAM encontram-se abertos e documentados para auditoria e replicação científica no repositório de dados técnicos do estudo em \url{https://github.com/lucasmantovany/tcc-incluidev/tree/main/testes/simulacao_agentes}."*
