# Assistente Guiado por Perfis - Especificação Funcional

## Visão Geral

O Assistente Guiado do IncluiDev tem como objetivo auxiliar usuários na localização de recursos relacionados ao ensino de programação para Pessoas com Deficiência Visual (PcDV), por meio de uma navegação conversacional baseada em perfis.

Diferentemente dos filtros tradicionais do repositório, o assistente conduz o usuário por um fluxo de perguntas específicas para seu contexto, apresentando recomendações mais relevantes e reduzindo o esforço de busca.

---

# Objetivos

* Facilitar o acesso ao conteúdo do repositório.
* Personalizar recomendações conforme o perfil do usuário.
* Melhorar a experiência de navegação para usuários iniciantes.
* Demonstrar a aplicação prática da taxonomia do projeto.
* Apoiar professores, estudantes, pesquisadores e desenvolvedores na busca por materiais adequados.

---

# Estrutura Geral do Fluxo

## Pergunta Inicial

### Qual é o seu perfil?

Escolha o perfil que melhor representa seu objetivo atual.

### Opções

* Estudante
* Professor
* Desenvolvedor de Tecnologia Assistiva
* Pesquisador

---

# Perfil: Estudante

## Descrição

Destinado a estudantes com deficiência visual que desejam aprender programação, explorar tecnologias acessíveis ou encontrar recursos para desenvolvimento de competências em computação.

O foco deste perfil é apresentar ferramentas, metodologias e recursos educacionais voltados para a aprendizagem.

---

## Fluxo de Perguntas

### Pergunta 1

**Em qual nível de ensino você está atualmente?**

Opções:

* Ensino Básico
* Ensino Técnico
* Ensino Superior

---

### Pergunta 2

**O que você deseja aprender ou explorar?**

Opções:

* Programação em blocos
* Programação textual
* Robótica educacional
* Eletrônica e computação física
* Lógica de programação
* Ferramentas acessíveis

---

### Pergunta 3

**Que tipo de conteúdo deseja visualizar?**

Opções:

* Ferramentas
* Tutoriais
* Artigos
* Todos os conteúdos

---

## Recomendações Esperadas

### Ferramentas

* Quorum Language
* Accessible Blockly
* Code Jumper
* Swift Playgrounds
* JBrick

### Guias

* Configuração acessível do VS Code
* Guia de acessibilidade MDN

---

# Perfil: Professor

## Descrição

Destinado a professores, educadores e profissionais que atuam no ensino de programação para estudantes com deficiência visual.

O objetivo é fornecer metodologias, práticas pedagógicas, relatos de experiência, diretrizes e recursos para adaptação de atividades educacionais.

---

## Fluxo de Perguntas

### Pergunta 1

**Em qual nível de ensino você atua?**

Opções:

* Ensino Básico
* Ensino Técnico
* Ensino Superior

---

### Pergunta 2

**Qual é sua principal necessidade?**

Opções:

* Metodologias de ensino
* Ferramentas acessíveis
* Relatos de experiência
* Leis e normas
* Criação de objetos de aprendizagem

---

### Pergunta 3

**Que tipo de conteúdo deseja visualizar?**

Opções:

* Artigos científicos
* Ferramentas
* Guias práticos
* Relatos de experiência
* Todos os conteúdos

---

## Recomendações Esperadas

### Metodologias

* CSforALL
* Physical Programming for Blind and Low Vision Children at Scale

### Ferramentas

* Code Jumper
* Accessible Blockly
* Quorum Language

### Legislação

* Lei Brasileira de Inclusão (LBI)

### Estudos

* Revisões sistemáticas
* Estudos empíricos
* Relatos de experiência

---

# Perfil: Desenvolvedor de Tecnologia Assistiva

## Descrição

Destinado a profissionais envolvidos no desenvolvimento de softwares, ambientes educacionais, tecnologias assistivas ou ferramentas voltadas à acessibilidade no ensino de programação.

Seu foco é fornecer diretrizes, normas, legislações e evidências científicas para apoiar o desenvolvimento de soluções acessíveis.

---

## Fluxo de Perguntas

### Pergunta 1

**O que você procura atualmente?**

Opções:

* Diretrizes de acessibilidade
* Normas e legislação
* Estudos sobre acessibilidade
* Boas práticas de desenvolvimento

---

### Pergunta 2

**Qual é o foco da solução que está desenvolvendo?**

Opções:

* Programação em blocos
* Ambiente de programação (IDE)
* Objeto de aprendizagem
* Plataforma educacional
* Outro

---

### Pergunta 3

**Que tipo de material deseja consultar?**

Opções:

* Diretrizes
* Artigos científicos
* Teses e dissertações
* Legislação
* Todos os conteúdos

---

## Recomendações Esperadas

### Diretrizes

* WCAG 2.1
* WAI-ARIA Authoring Practices
* Guia MDN Accessibility

### Legislação

* Lei Brasileira de Inclusão (LBI)

### Estudos

* Revisões sistemáticas
* Pesquisas sobre IDEs acessíveis
* Estudos sobre tecnologias assistivas

---

# Perfil: Pesquisador

## Descrição

Destinado a pesquisadores, acadêmicos e estudantes de pós-graduação interessados em investigar o ensino de programação para pessoas com deficiência visual.

O objetivo é facilitar o acesso a estudos, revisões sistemáticas, métodos de pesquisa, intervenções educacionais e evidências científicas da área.

---

## Fluxo de Perguntas

### Pergunta 1

**Qual é o tema principal da sua pesquisa?**

Opções:

* Ensino de programação
* Tecnologias assistivas
* Acessibilidade digital
* Inclusão educacional
* Outro

---

### Pergunta 2

**Sua pesquisa envolve:**

Opções:

* Desenvolvimento de ferramenta
* Validação de ferramenta
* Intervenção educacional
* Revisão de literatura
* Estudo exploratório

---

### Pergunta 3

**Que tipo de material deseja consultar?**

Opções:

* Artigos científicos
* Revisões sistemáticas
* Teses e dissertações
* Estudos empíricos
* Todos os conteúdos

---

## Recomendações Esperadas

### Produção Científica

* Revisões sistemáticas
* Revisões de literatura
* Estudos empíricos
* Teses e dissertações

### Metodologias de Pesquisa

* Estudos de validação
* Avaliação de tecnologias assistivas
* Pesquisas com usuários PcDV

---

# Estrutura Recomendada para a Home

## Opção 1 — Explorar Todo o Repositório

Permite acesso direto aos filtros tradicionais do portal.

### Recursos

* Busca livre
* Filtros por público
* Filtros por nível de ensino
* Filtros por categoria

---

## Opção 2 — Busca Guiada

Fluxo conversacional baseado em perfil.

### Exemplo

Qual é o seu perfil?

→ Estudante

Em qual nível de ensino você está?

→ Ensino Técnico

O que deseja aprender?

→ Programação em blocos

Resultado:

✓ Accessible Blockly

✓ Code Jumper

✓ Artigos relacionados

✓ Guias de aprendizagem

---

# Benefícios da Abordagem

* Navegação simplificada para usuários iniciantes.
* Recomendações mais relevantes.
* Menor sobrecarga cognitiva.
* Melhor aderência ao público-alvo do projeto.
* Demonstração prática da taxonomia do TCC.
* Facilita futuras avaliações de usabilidade e acessibilidade.

---

# Evoluções Futuras

* Recomendações por inteligência artificial.
* Histórico de buscas.
* Perfis personalizados.
* Aprendizado baseado nas escolhas dos usuários.
* Integração com relatos e experiências da comunidade.
* Sistema de favoritos e coleções.
