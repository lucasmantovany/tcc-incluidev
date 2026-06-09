export const detalhesConteudo = {
  1: `### Visão Geral
A Linguagem Quorum (Quorum Language) foi desenvolvida inicialmente como um projeto de pesquisa acadêmica visando criar a primeira linguagem de programação baseada em evidências ("evidence-based programming language").

### Principais Características
- **Sintaxe Amigável para Leitores de Tela:** Quorum não depende de símbolos complexos (como chaves "{}" ou ponto-e-vírgula ";"). A estruturação de blocos é feita por palavras-chave claras (como "end"), o que facilita muito a leitura por sintetizadores de voz.
- **Baseada em Evidências:** Cada decisão de design da sintaxe foi testada através de ensaios clínicos controlados duplo-cegos com usuários humanos para garantir que a curva de aprendizado fosse a menor possível.
- **Aplicações Diversas:** Embora desenhada para ser acessível, Quorum é uma linguagem completa, suportando programação orientada a objetos, desenvolvimento de jogos 2D e 3D, e aplicações lego de robótica.

### Por que é importante para PcDVs?
A principal barreira em linguagens tradicionais (como Java ou C++) para pessoas cegas é o uso excessivo de caracteres especiais que os leitores de tela soletram de forma confusa. Quorum resolve isso adotando um inglês quase natural e direto.`,

  2: `### Visão Geral
O Accessible Blockly é um esforço do Google para tornar seu famoso framework de programação em blocos (o Blockly) acessível para usuários de tecnologias assistivas.

### O Problema da Programação em Blocos
Tradicionalmente, a programação em blocos (como o Scratch) é totalmente dependente do mouse e da visão (drag-and-drop de peças coloridas). Isso historicamente excluiu alunos cegos desse importante rito de passagem no ensino fundamental.

### Como o Accessible Blockly Resolve
- **Navegação por Teclado:** Implementa atalhos de teclado completos para mover cursores lógicos entre os blocos, pontos de conexão e menus.
- **Feedback Auditivo (ARIA):** Utiliza extensivamente tags ARIA para descrever para o leitor de tela (NVDA/JAWS) qual o tipo de bloco selecionado, onde ele está e onde pode ser encaixado.
- **Interação Alternativa:** Em vez do arrastar-e-soltar puro, o usuário "marca" um ponto e "envia" o bloco para lá.

### Conclusão
Esta ferramenta é um marco importante pois permite que alunos com deficiência visual participem das mesmas atividades introdutórias de programação em blocos que seus colegas de classe videntes.`,

  3: `### Visão Geral
O Code Jumper, inicialmente desenvolvido pela Microsoft e agora mantido pela American Printing House for the Blind (APH), é uma tecnologia inovadora de ensino baseada em hardware tangível.

### Metodologia Tangível
- A programação não acontece em uma tela de computador. Em vez disso, os alunos conectam fisicamente grandes blocos plásticos ("pods") usando cabos.
- Cada pod representa um conceito de programação (um comando, um loop, um if-else).
- Ao conectar os pods em sequência e girar seus seletores, os alunos criam um "programa" que gera músicas, histórias ou poemas em um hub central.

### Inclusão "Born-Accessible"
O Code Jumper foi projetado desde o "dia zero" para crianças cegas e com baixa visão. Os pods têm texturas diferentes, cores contrastantes (para baixa visão) e não dependem de nenhuma leitura de tela para o seu funcionamento base.

### Benefícios Pedagógicos
Transforma a natureza abstrata do código em algo físico que os alunos podem tocar, contar e reorganizar com as mãos, promovendo forte compreensão espacial e lógica algorítmica para o ensino básico.`,

  4: `### Visão Geral
Swift Playgrounds é um aplicativo educacional da Apple desenvolvido para iPad e Mac, cujo objetivo é ensinar a linguagem Swift de forma interativa.

### Acessibilidade Nativa (VoiceOver)
A Apple tem um histórico rigoroso de acessibilidade, e o Playgrounds herda isso. O aplicativo funciona em perfeita harmonia com o VoiceOver (o leitor de tela nativo do ecossistema Apple).

### Principais Pontos
- **Audiodescrição do Mapa:** Nos quebra-cabeças 3D, o VoiceOver lê o tabuleiro como uma matriz matemática (ex: "Byteche está em 2 vírgula 3, voltado para o norte. A joia está em 2 vírgula 5"). Isso permite que o aluno cego monte a solução mentalmente.
- **Teclado de Código Simplificado:** O app oferece atalhos na tela que o VoiceOver reconhece, evitando que o aluno precise digitar cada letra do comando.
- **Feedback Constante:** Ao rodar o código, passos bem sucedidos ou erros são narrados de forma semântica.

### Conclusão
É uma das raras ferramentas comerciais mainstream que proporcionam uma experiência educacional gamificada "out-of-the-box" para estudantes com deficiência visual.`,

  5: `### Visão Geral
O JBrick é um Ambiente de Desenvolvimento Integrado (IDE) construído com foco estrito em alunos com deficiência visual que desejam programar kits de robótica LEGO Mindstorms usando Java.

### Desafios da Robótica Inclusiva
Programar robôs LEGO normalmente requer o uso do software padrão (NXT-G ou EV3), que é puramente visual (blocos). O JBrick surge como uma alternativa textual acessível que permite a injeção de código diretamente no "tijolo" do robô.

### Funcionalidades de Acessibilidade
- **Compatibilidade:** Otimizado para JAWS, NVDA e Window-Eyes.
- **Layout Limpo:** Remove a poluição visual de múltiplas abas de propriedades comuns no Eclipse ou NetBeans, focando a árvore de arquivos e o editor de texto.
- **Retorno Imediato de Compilação:** Fornece alertas sonoros e foco automático nas linhas exatas onde erros de sintaxe ou compilação acontecem.

### Impacto
O JBrick é essencial para laboratórios de robótica no ensino técnico e superior que buscam incluir alunos cegos em competições e projetos práticos.`,

  6: `### Visão Geral
O Visual Studio Code (VS Code) da Microsoft é, atualmente, um dos editores de código-fonte mais utilizados no mundo. Seu compromisso com a acessibilidade o tornou também a escolha número um para muitos programadores com deficiência visual.

### Práticas e Recursos
A documentação oficial destaca vários recursos vitais para PcDVs:
- **Modo de Acessibilidade (Accessibility Mode):** Quando ativado (muitas vezes detecta automaticamente o leitor de tela), otimiza as saídas do editor e reduz atualizações de tela puramente visuais.
- **Navegação Inteligente:** Suporte completo para saltar entre funções, classes e erros via atalhos de teclado.
- **Contraste e Temas:** Temas de alto contraste desenhados especificamente para desenvolvedores com baixa visão, sensibilidade à luz ou daltonismo.

### Importância
Em vez de utilizar uma IDE isolada (como acontecia no passado), a acessibilidade do VS Code garante que o aluno cego utilize a exata mesma ferramenta de ponta que o mercado de trabalho exige.`,

  7: `### Visão Geral
As Diretrizes de Acessibilidade para Conteúdo Web (WCAG), mantidas pelo W3C (World Wide Web Consortium), formam o padrão-ouro internacional para a construção de interfaces digitais inclusivas.

### Relevância para Ferramentas Educacionais
Muitas das plataformas modernas de ensino de programação baseiam-se na web (como compiladores online, plataformas de submissão como LeetCode/HackerRank, ou ambientes como Replit). Se essas plataformas não seguirem o WCAG, os alunos PcDV ficam bloqueados logo na interface, antes mesmo de tentarem programar.

### Princípios Chave (POUR)
- **Perceptível:** Fornecer alternativas em texto (ARIA) para elementos não textuais.
- **Operável:** Garantir que 100% da interface do compilador ou fórum seja acessível por teclado, sem armadilhas de foco (keyboard traps).
- **Compreensível:** Previsibilidade na navegação (sem pop-ups surpresa atrapalhando o leitor de tela).
- **Robusto:** Compatibilidade maximizada com as atuais e futuras tecnologias assistivas.`,

  8: `### Visão Geral do Artigo (Tradução Livre)
*Programação Física para Crianças Cegas e com Baixa Visão em Escala.* (Morrison, C., et al. 2019).

### Contexto e Metodologia
O artigo apresenta um estudo empírico abrangente sobre os impactos e a eficácia de ambientes de programação física e tangível. Como ferramentas baseadas em tela costumam falhar ao engajar crianças cegas nas primeiras etapas de aprendizagem (onde diagramas de fluxo visuais são comuns), a pesquisa analisou o ensino em larga escala utilizando o *Code Jumper* (na época conhecido como Project Torino).

### Principais Conclusões
- **Compreensão Espacial e Algorítmica:** O manuseio de objetos físicos representativos do código ajudou os alunos cegos a formarem mapas mentais duradouros sobre a estrutura de loops e desvios condicionais.
- **Trabalho Colaborativo:** O formato físico demonstrou promover uma colaboração mais intensa e inclusiva entre alunos cegos e seus pares videntes (já que ambos operavam a mesma interface física, equilibrando o terreno de aprendizagem).
- **Engajamento:** As respostas auditivas dos "pods" geraram um índice de engajamento emocional significativamente maior do que o ensino por linha de comando tradicional.`,

  9: `### Visão Geral do Artigo (Tradução Livre)
*Tornando a Programação Acessível a Estudantes com Deficiência Visual: Uma Revisão de Literatura.* (Hadwen-Bennett et al. 2018).

### Objetivo do Estudo
O artigo realiza uma extensa revisão sistemática mapeando as tecnologias e métodos propostos nas últimas décadas (especialmente focados em idades primárias). Ele destaca que a ascensão da computação gráfica impôs retrocessos na acessibilidade em comparação às antigas interfaces de linha de comando.

### Soluções e Desafios Mapeados
1. **Feedback Háptico e Áudio:** O estudo explora como interfaces que vibram ou emitem sons dimensionais (áudio 3D) podem suprir a falta da "visão geral do código".
2. **Sintaxe vs. Lógica:** Muitos alunos passam a maior parte do tempo lidando com erros de sintaxe decorrentes da confusão de leitores de tela em ler pontuações de código em vez de aprender lógica em si.
3. **Lacuna Pedagógica:** O estudo conclui que há uma escassez de currículos padronizados; muitas ferramentas boas não têm suporte de material didático adequado para o professor regular aplicar em sala de aula.`,

  10: `### Visão Geral do Artigo (Tradução Livre)
*Uma Revisão Sistemática no Desenvolvimento de Habilidades de Programação de Computadores para Estudantes com Deficiência Visual.* (Aljarallah & Dutta, 2024).

### Escopo da Pesquisa
Esta pesquisa analisou artigos de 2000 a 2023, buscando mapear evidências sobre o ensino de Ciência da Computação para alunos com deficiência visual severa. Foram selecionados 21 artigos que se concentram em Tecnologias Assistivas (ATs) e habilidades computacionais.

### Principais Pontos e Conclusões
- A transição histórica de IDEs e tecnologias focou fortemente em contornar as Interfaces Gráficas de Usuário (GUIs), criando plugins e leitores de tela adaptados.
- **Modelos Mentais:** O estudo ressalta que o maior desafio não é o teclado em si, mas a construção do "modelo mental" da estrutura do programa (que videntes fazem olhando a indentação visual).
- **Necessidade Futura:** A pesquisa conclui conclamando a necessidade de IDEs customizáveis que adaptem dinamicamente as representações de código conforme as necessidades do usuário, e não apenas gambiarras pós-desenvolvimento.`,

  11: `### Visão Geral do Artigo
*Tecnologias Assistivas para o Ensino de Programação a Estudantes com Deficiência Visual: Uma Revisão Sistemática.* (Mendes et al. 2025).

### Escopo e Metodologia
Esta revisão da literatura mapeou recentemente (em bases como ACM e IEEE) as ferramentas de Tecnologia Assistiva que estão em uso ativo no auxílio ao ensino de programação.

### Ferramentas Mapeadas
A revisão cataloga soluções baseadas em áudio (Sodbeans, Emacspeak, JavaSpeak) e soluções com abordagens textuais/estruturais diferenciadas (StructJumper, Quorum).

### Conclusões Relevantes
- Tecnologias de representação em árvore estrutural auditiva mostram alto potencial de sucesso.
- Há um forte viés na comunidade científica focando muito na linguagem Java para ferramentas assistivas antigas e recentemente uma migração para Python (devido à sua ausência de chaves e sintaxe mais limpa, facilitando leitores de tela).
- Sugere-se uma maior padronização no design de IDEs inclusivos, como integrar essas soluções direto na arquitetura de ambientes corporativos populares (como o VS Code).`,

  12: `### Visão Geral do Artigo (Tradução Livre)
*Ensino de Programação para Cegos: Uma Revisão.* (Al-Ratta & Al-Khalifa, 2013).

### O Contexto Histórico
Sendo um dos estudos base mais importantes, ele mapeou as primeiras tentativas desde 1975 até 2013 de ensinar programação para cegos. É fascinante notar que no começo da era da computação (cartões perfurados, linha de comando), as disparidades de acessibilidade eram menores.

### Categorias de Soluções Discutidas
1. **Linguagens e Ferramentas Baseadas em Áudio:** O uso de sinais sonoros (earcons) associados a estruturas de código (ex: um tom sobe para indicar um nível de indentação mais profundo).
2. **Ambientes Táteis:** Impressões de braille e displays atualizáveis caros como forma primária de depuração.
3. **Ambientes de Micromundos (Jogos):** Como Lady Beetle, onde o aluno digita comandos para navegar em grids invisíveis através do retorno sonoro coordenado.

### Relevância
Este artigo é a base histórica que prova que, se houver um feedback multissensorial estruturado, estudantes cegos aprendem programação textual com os mesmos índices de sucesso cognitivo que alunos videntes.`,

  13: `### Visão Geral do Artigo
*Ensino de Lógica de Programação para Pessoas com Cegueira ou Deficiências Visuais: Um Estudo de Mapeamento Sistemático.* (Santos et al., 2025).

### Foco Específico: Lógica e Algoritmos
Diferente de outros estudos que olham para o desenvolvimento de software (engenharia/IDEs), este foca especificamente nas metodologias e abordagens educacionais iniciais para ensinar "lógica" antes mesmo da linguagem.

### Descobertas
- **O Peso da Indentação:** Para a lógica, entender que o bloco A está "dentro" do bloco B é essencial. Estudantes videntes vêm isso na tela instantaneamente. O estudo demonstra que ferramentas que fornecem um "resumo de contexto" tátil ou de áudio tridimensional aceleram o raciocínio algorítmico do aluno cego.
- **Uso do Python:** A pesquisa identificou que as linguagens de preferência para o ensino acessível moderno são Python (pelo uso obrigatório de indentação e semântica de palavras) e linguagens blocadas adaptadas.

### Conclusão
O ensino deve focar mais nas práticas pedagógicas de mediação e no Atendimento Educacional Especializado (AEE) de mãos dadas com a tecnologia, em vez de depender apenas de um software mágico.`,

  14: `### Visão Geral da Tese
*Diretrizes de Acessibilidade em Ambientes de Desenvolvimento Integrado (IDEs) para Estudantes Cegos.* (Zen & Tavares, 2025).

### Escopo do Trabalho
Este documento extenso consiste numa Tese de Doutorado focada no gargalo da acessibilidade: os editores de código complexos. Os autores perceberam que os estudantes conseguiam usar ferramentas básicas para aprender, mas esbarravam em barreiras colossais em IDEs como Eclipse, IntelliJ ou Android Studio.

### As Diretrizes Propostas
O estudo validou com usuários reais um conjunto robusto de diretrizes para o design de IDEs inclusivos:
1. **Atalhos Estáveis e Consistentes:** Evitar remapeamentos dinâmicos que confundem os usuários sem visão.
2. **Separação Contextual em Áudio:** O IDE deve ter "canais" de áudio. Por exemplo, mensagens do compilador lidas por uma voz diferente ou em um tom diferente da navegação do código.
3. **Feedback Sonoro de Estrutura:** Utilização de tons (pitches) para indicar em qual escopo e indentação o cursor atual está operando.

### Importância
Fornece um manual detalhado para engenheiros de software e desenvolvedores Open Source que desejam tornar suas ferramentas de codificação acessíveis para profissionais PcDVs.`,

  15: `### Visão Geral do Sistema
**APL (Audio Programming Language)** foi proposta em 2006 como uma das primeiras linguagens projetadas puramente para o aprendizado cego, eliminando a dependência de telas visuais.

### Características do APL
- Foi construída para resolver a sobrecarga cognitiva que alunos novatos cegos enfrentam ao tentar memorizar regras de sintaxe (como ponto-e-vírgula) além da própria lógica.
- **Menus Circulares Auditivos:** Em vez de digitar os comandos do zero, o aluno utiliza um menu sonoro onde as estruturas ("if", "while", "print") são anunciadas. O usuário seleciona, e o comando é injetado perfeitamente no programa sem risco de erros de digitação.
- **Variáveis de Som:** Além de variáveis de texto/inteiro clássicas, APL possui manipulação nativa de objetos sonoros como unidades base da programação.

### Abordagem
Não tenta substituir Java ou C++ profissionalmente, mas serve como um trampolim motivacional e educacional, focado em ajudar a internalizar o pensamento de resolução de problemas algítmicos.`,

  16: `### Visão Geral
**JavaSpeak** (criada no ano 2000) representa uma das iniciativas pioneiras na adaptação universitária para programação orientada a objetos usando Java.

### Como a Ferramenta Funciona
É fundamentalmente uma ferramenta de leitura de código construída acima dos editores, processando o código fonte não como texto puro, mas interpretando sua Árvore de Sintaxe Abstrata (AST).

### Navegação por Granularidade
O maior mérito do JavaSpeak é permitir que o aluno escolha o nível de detalhe do que está "ouvindo":
- **Nível Visão Geral:** O leitor de tela anuncia "Classe Main contém 3 métodos".
- **Nível Método:** Anuncia apenas a assinatura (nome, retorno e parâmetros).
- **Nível de Linha:** Lê letra por letra a sintaxe de implementação.

Isso elimina o problema excruciante de o leitor de tela ter que ler todas as chaves, espaços em branco e parênteses de uma classe Java inteira apenas para o estudante entender do que se trata.`,

  17: `### Visão Geral
**Emacspeak**, lançado em 1996 pelo brilhante engenheiro cego T.V. Raman, não é apenas um leitor de tela genérico, mas um subsistema de voz completo integrado diretamente ao lendário editor Unix Emacs.

### Inovação e Impacto
Ao contrário dos leitores de tela tradicionais que "olham para o que está escrito na tela e leem" (dependendo da representação visual na placa de vídeo), o Emacspeak intercepta a informação no nível lógico dentro do Emacs.

### Áudio Rico e Contextual (Audio Formatting)
O sistema introduziu o conceito revolucionário de "áudio formatação":
- Utiliza diferentes qualidades de voz (afinação, velocidade, timbre) para transmitir formatação textual estrutural (ex: uma voz lê comentários, outra lê strings, outra lê palavras reservadas).
- Gera pequenos ícones sonoros auditivos (earcons) que substituem longas descrições.

### Legado
Até hoje, é considerado o auge da eficiência e do acesso rápido por desenvolvedores cegos de nível sênior em ambientes Linux/Unix.`,

  18: `### Visão Geral
O **Sodbeans** foi um projeto acadêmico focado em criar um IDE verdadeiramente acessível e com retorno auditivo estendido, originalmente construído sobre o ecossistema NetBeans.

### A Linguagem HOP e a IDE
Sodbeans surgiu primeiramente atrelado à linguagem HOP, sendo mais tarde adaptado para suportar Ruby, Java e C++.

### Principais Inovações
1. **Sintetizador de Voz Nativo:** Enquanto a maioria das IDEs terceiriza o áudio para o NVDA ou JAWS da máquina, Sodbeans implementou sua arquitetura nativa de suporte a voz. Isso permitiu o controle perfeito das falas, paradas e inflexões.
2. **Pistas Auditivas Espaciais:** Durante a execução ou compilação e depuração (debug) do programa, em vez de ler longas logs de erro, o Sodbeans usava sons localizados, tons e efeitos para avisar o programador sobre erros de runtime ou alertas de sintaxe em tempo real, como um verdadeiro feedback sensório auditivo.`,

  19: `### Visão Geral
**StructJumper** é um plugin desenvolvido em 2015 para o IDE Eclipse que visa mitigar a "cegueira do código" (a incapacidade do leitor de tela de comunicar instantaneamente onde você está dentro do ninho estrutural do programa).

### A Estrutura em Árvore
O código Java muitas vezes contém estruturas profundas (um "if" dentro de um "for" dentro de um método dentro de uma classe). Para programadores cegos navegando por linha com as setas do teclado, é muito fácil perder o contexto e não saber em que bloco estão editando.

### A Solução
StructJumper pega o código atual e gera dinamicamente uma representação em "árvore" em uma aba separada, semelhante às árvores de pastas do Windows Explorer.
O desenvolvedor pressiona um atalho, o foco vai para a árvore onde ele usa setas cima/baixo para navegar por nós (ex: Método Login -> Loop For). Pressionando Enter no nó, o foco do cursor volta para a linha exata no código texto, proporcionando saltos hiper-rápidos sem perder o contexto geográfico do programa.`,

  20: `### Visão Geral
**GUIDL (Graphical User Interface Description Language)** aborda uma barreira monumental para programadores cegos: o design de telas. Criar janelas, botões e formulários em aplicações de interface gráfica historicamente depende de arrastar-e-soltar componentes com o mouse em construtores visuais (como o Windows Forms ou Scene Builder).

### A Proposta
A GUIDL oferece uma sintaxe limpa e puramente descritiva, semelhante ao XML ou HTML antigo, voltada à acessibilidade. Em vez de usar as coordenadas absolutas x/y da tela, o programador com deficiência visual simplesmente descreve a estrutura relacional usando blocos de construção com pesos (ex: Botão A fica "ao lado de" Label B, e devem dividir a tela em metades).

### Importância
Ela automatiza a compilação do design final gerando o código complexo da GUI (seja Java Swing, HTML ou C#) em back-ground, permitindo que alunos e profissionais PcDVs consigam entregar interfaces esteticamente perfeitas para usuários videntes, tudo escrevendo apenas código textual lógico.`,

  21: `### Visão Geral
O **Wicked Audio Debugger (WAD)**, construído sobre o ecossistema do Visual Studio em 2007, atacou o aspecto mais difícil da programação profissional: a depuração de código (Debug).

### Desafios do Debugging Tradicional
Ao procurar um bug no código, um desenvolvedor vidente coloca "Breakpoints" e assiste às variáveis mudarem de cor ou valor em um painel lateral enquanto avança passo a passo. Isso é caótico com um leitor de tela, que tenta ler tudo ao mesmo tempo.

### Sonificação de Variáveis
O WAD inovou mapeando os estados e fluxos de variáveis numéricas em representações sonoras (sonificação de dados).
- Ao acompanhar um laço de repetição ("for/while"), se o valor da variável sobe, o tom musical sobe.
- Se uma variável ultrapassa um limite esperado, soa um alerta específico ou dissonância.
- Essa abordagem de áudio tridimensional e mapeamento sônico possibilita que os estudantes e profissionais "ouçam o comportamento do programa" e encontrem anomalias na lógica antes mesmo do programa quebrar visualmente.`,

  22: `### Visão Geral
**Lady Beetle** (Joaninha) é um projeto de "Micromundo" (semelhante ao Logo Turtle ou Scratch), adaptado em 2014 para a introdução ao pensamento computacional em crianças da educação básica e infantil com deficiência visual.

### O Ambiente Sensorial
- A interface não exibe texto ou botões gráficos complexos. A criança controla o movimento direcional de um personagem em uma grade através do teclado.
- **Comandos Intuitivos e Sonoros:** Cada ação e resposta do ambiente (ex: bater em uma parede virtual, colher um item, se mover) dispara um efeito sonoro de alta definição. O espaço de matriz/labirinto é mapeado pelo teclado, onde coordenadas de som avisam se o aluno está perto ou longe do objetivo.

### Impacto
Substitui a necessidade de ensinar algoritmos por meio de código puro, promovendo a assimilação lúdica da ideia de "procedimento em série" de forma altamente engajadora para crianças no espectro da deficiência visual total e baixa visão.`,

  23: `### Visão Geral
O projeto **World of Sounds** compartilha as raízes metodológicas dos micromundos auditivos de aprendizado propostos por Jašková em 2014. Diferente de jogos focados na coordenação de movimentos em matrizes espaciais (como o Lady Beetle), este ambiente foca no ritmo e na audição.

### Lógica Aplicada à Música
- O estudante constrói cadeias de comandos que não resultam em movimentos visuais, mas na articulação de diferentes instrumentos, batidas e efeitos musicais no tempo.
- Conceitos de computação robustos (como funções repetitivas ou rotinas) são aplicados com naturalidade. Por exemplo: um loop "while(condição)" é utilizado para manter um ritmo de bateria tocando continuamente enquanto outra rotina programa uma melodia.

### Relevância
Estimula a abstração matemática e o sequenciamento algorítmico infantil através da criatividade e experimentação puramente auditiva, eliminando as barreiras visuais do ensino padrão.`,

  24: `### Visão Geral
**Noodle** é uma proposta documentada no "Work in Progress Report Nonvisual Visual Programming" (Lewis, 2014) para oferecer uma ponte entre a facilidade de linguagens em blocos (visuais) e as necessidades de estudantes cegos.

### Construção de Código Não-Visual
Linguagens como o Blockly requerem a união de formas "quebra-cabeça". O Noodle subverte o design ao utilizar exclusivamente navegação por teclado e síntese de fala imediata.
- O aluno constrói sequências de operações em uma interface linear com confirmação automática auditiva do que se "encaixa" ou não.
- A meta principal era combater os altos índices de desistência em classes iniciantes que ensinavam Python base e causavam estresse de sintaxe precoce nos estudantes cegos que usavam JAWS/NVDA.

### Inovação em Andamento
Ao focar apenas nas chaves do teclado com feedback semântico estrito, o Noodle abriu discussões vitais para projetos de acessibilidade contemporâneos, propondo a redução radical da sintaxe para foco absoluto nos fundamentos algorítmicos.`,

  31: `### Visão Geral
**Curso de Python para Iniciantes com Leitor de Tela** (baseado nos conceitos do FreeCodeCamp) aborda o ensino fundamental da linguagem Python com viés totalmente semântico.

### Por que Python?
Diversos artigos científicos recomendam Python como a primeira linguagem para PcDV, pois elimina o "noise" (barulho) de caracteres especiais que os leitores de tela soletram (como chaves e ponto-e-vírgula). A base em indentação exige apenas a configuração do leitor para avisar o nível de recuo (tabs/espaços).

### Estrutura
- Explicação do uso do terminal interativo para testar lógicas curtas e rápidas.
- Integração de scripts básicos de comandos com saídas auditivas em texto plano.`,

  32: `### Visão Geral
**Acessibilidade na Prática: HTML e CSS Inclusivos** é um guia central da Web.dev focado em práticas cruciais para que desenvolvedores não criem as próprias barreiras para usuários PcDV.

### Foco Principal
Mostra que usar \`<button>\` ao invés de \`<div>\` pode ser a diferença entre um usuário conseguir ou não avançar em um portal. Explica também práticas essenciais de CSS como controle de contraste e navegação livre de mouse.`,

  33: `### Visão Geral
**Sonic Pi** foi originalmente criado por Sam Aaron para ensinar ciências da computação através da criação musical em escolas.

### Abordagem Acessível e Lúdica
Para PcDVs, a criação musical via código substitui o velho paradigma de desenhar polígonos na tela. O aluno digita \`play 60\`, \`sleep 1\`, \`play 65\` e ouve o resultado em tempo real. Isso os motiva a aprender conceitos de loops (\`live_loop\`), concorrência (múltiplos instrumentos) e sincronização. É uma excelente ferramenta prática de entrada.`,

  34: `### Visão Geral
**Relato de Experiência: Inclusão Escolar na Disciplina de Programação** exemplifica como educadores do ensino fundamental adaptaram aulas regulares para inclusão de alunos cegos na robótica.

### Metodologias Expostas
Mostra técnicas como:
- Trabalho em duplas (um aluno ditando a lógica, outro encaixando os blocos, ou vice-versa).
- A instrução do "AEE" para fornecer guias e material em braille ou alto relevo em conjunto com a tecnologia.
- Importância do retorno imediato de erros.`,
};
