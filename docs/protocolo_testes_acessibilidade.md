# Protocolo de Testes de Acessibilidade - IncluiDev

Este documento descreve a metodologia e as ferramentas recomendadas para realizar a avaliação de acessibilidade do portal IncluiDev. Os testes visam garantir o cumprimento das diretrizes de acessibilidade para a web (WCAG 2.1 - Nível AA).

## 1. Avaliação Automatizada (Testes Heurísticos)

Ferramentas automatizadas são capazes de detectar rapidamente de 30% a 50% dos problemas comuns de acessibilidade, como ausência de atributos estruturais e problemas de contraste.

### Ferramenta: Google Lighthouse
- **Como utilizar:** No Google Chrome, abra o portal, pressione `F12` para abrir o DevTools, acesse a aba "Lighthouse" e rode o relatório marcando a opção "Accessibility".
- **O que testar:** 
  - Estrutura do HTML (tags e atributos lang corretos).
  - Presença de tags `alt` nas imagens e ARIA labels nos botões.
  - O objetivo é atingir um score igual ou superior a 90/100.

### Ferramenta: WAVE (Web Accessibility Evaluation Tool)
- **Como utilizar:** Instale a extensão do WAVE no navegador Chrome ou Firefox, e clique no ícone da extensão ao navegar pelo IncluiDev.
- **O que testar:**
  - Verificação visual de Contrastes (Erros de contraste).
  - Ordem e hierarquia de Headings (`H1`, `H2`, `H3`).
  - Avisos (Warnings) de links redundantes.

## 2. Avaliação Manual e Interativa

Ferramentas automatizadas não captam a real experiência de uso. Portanto, a avaliação manual é estritamente necessária.

### Teste de Navegação por Teclado
Para pessoas com deficiências visuais ou motoras que não utilizam o mouse:
- **Procedimento:** Acesse a aplicação sem tocar no mouse. Utilize a tecla `Tab` para avançar, `Shift + Tab` para voltar e `Enter`/`Espaço` para interagir com links e botões.
- **Critérios de Validação:**
  1. O *Focus Ring* (borda de foco visível) aparece claramente em cada elemento selecionado?
  2. Há *Keyboard Traps*? (O foco fica preso em algum componente ou modal sem conseguir sair?)
  3. O fluxo do Assistente Guia consegue ser completamente preenchido e submetido usando apenas o teclado?
  4. O link oculto "Pular para o conteúdo principal" (Skip to main content) aparece na tela assim que o primeiro `Tab` é pressionado ao carregar a página?

### Teste com Leitores de Tela (NVDA / JAWS)
O software de teste recomendado para o ambiente Windows é o **NVDA** (NonVisual Desktop Access), por ser gratuito e o mais utilizado no Brasil.
- **Procedimento:** Ligue o NVDA e navegue pelas páginas.
- **Critérios de Validação:**
  1. O formulário de Avaliação e as perguntas do Assistente Guia anunciam corretamente os `<legend>` e `<label>` correspondentes? (Ex: "Qual é o seu perfil de acesso? Estudante. Botão de opção marcado").
  2. As mudanças dinâmicas na página (como carregar resultados do assistente ou exibir erros de preenchimento do formulário) são lidas em voz alta instantaneamente através do uso correto do atributo `aria-live="polite"` e `aria-live="assertive"`?
  3. A estrutura da página é coerente ao se navegar pela lista de Títulos (pressionando a tecla `H` no NVDA)?

## 3. Elaboração do Relatório

Após a execução dos testes, o pesquisador deve documentar:
- Ferramenta utilizada.
- Problema detectado.
- Severidade (Baixa, Média, Alta, Crítica).
- Recomendação de correção técnica. 
