const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, LevelFormat, TableOfContents,
  PageBreak
} = require('docx');
const fs = require('fs');

const BLUE = "1F4E79";
const BLUE_LIGHT = "2E75B6";
const BLUE_MID = "BDD7EE";
const BLUE_PALE = "DEEAF1";
const WHITE = "FFFFFF";
const GRAY = "F2F2F2";
const DARK = "1A1A1A";

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    children: [new TextRun({ text, bold: true, size: 32, color: BLUE, font: "Arial" })]
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 160 },
    children: [new TextRun({ text, bold: true, size: 28, color: BLUE_LIGHT, font: "Arial" })]
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, bold: true, size: 24, color: "444444", font: "Arial" })]
  });
}

function p(text, options = {}) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 80, after: 80, line: 360 },
    children: [new TextRun({ text, size: 24, font: "Arial", ...options })]
  });
}

function pMixed(runs) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 80, after: 80, line: 360 },
    children: runs.map(r => new TextRun({ size: 24, font: "Arial", ...r }))
  });
}

function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, size: 24, font: "Arial" })]
  });
}

function bulletBold(label, text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 60, after: 60 },
    children: [
      new TextRun({ text: label, bold: true, size: 24, font: "Arial" }),
      new TextRun({ text, size: 24, font: "Arial" })
    ]
  });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function spacer() {
  return new Paragraph({ spacing: { before: 120, after: 120 }, children: [new TextRun("")] });
}

function headerLine(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 0 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE_LIGHT, space: 1 } },
    children: [new TextRun({ text, bold: true, size: 20, color: "777777", font: "Arial" })]
  });
}

// ============================================================
// TABLE HELPERS
// ============================================================
function cell(text, opts = {}) {
  const { fill = WHITE, bold = false, align = AlignmentType.LEFT, width = 2200 } = opts;
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill, type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 150, right: 150 },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      alignment: align,
      children: [new TextRun({ text, bold, size: 22, font: "Arial" })]
    })]
  });
}

function headerCell(text, width = 2200) {
  return cell(text, { fill: BLUE, bold: true, align: AlignmentType.CENTER, width });
}

function row(cells) {
  return new TableRow({ children: cells });
}

// ============================================================
// CLASSIFICATION TABLE - Nível x Categoria
// ============================================================
const classificationTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2200, 1780, 1780, 1780, 1820],
  rows: [
    row([
      headerCell("Nível / Categoria", 2200),
      headerCell("Professor", 1780),
      headerCell("Aluno", 1780),
      headerCell("Público Geral", 1780),
      headerCell("Público Específico", 1820),
    ]),
    row([
      cell("Ensino Básico\n(Fund. e Médio)", { fill: BLUE_MID, bold: true, width: 2200 }),
      cell("Planos de aula adaptados, guias metodológicos, formação continuada", { width: 1780 }),
      cell("Atividades táteis, jogos de lógica acessíveis, tutoriais em áudio", { width: 1780 }),
      cell("Informativos sobre inclusão digital, legislação básica", { width: 1780 }),
      cell("Materiais para atendimento educacional especializado (AEE)", { fill: BLUE_PALE, width: 1820 }),
    ]),
    row([
      cell("Ensino Técnico\n(Cursos Profissionalizantes)", { fill: BLUE_MID, bold: true, width: 2200 }),
      cell("Frameworks pedagógicos, avaliação de ferramentas assistivas, guias de IDE acessível", { width: 1780 }),
      cell("Tutoriais de ferramentas (NVDA, JAWS), exemplos de código comentado em áudio, exercícios práticos", { width: 1780 }),
      cell("Guias de carreira em TI para PcD, informações sobre mercado de trabalho", { width: 1780 }),
      cell("Materiais para instituições como SENAI, SENAC com adaptações específicas", { fill: BLUE_PALE, width: 1820 }),
    ]),
    row([
      cell("Ensino Superior\n(Graduação/Pós)", { fill: BLUE_MID, bold: true, width: 2200 }),
      cell("Artigos científicos, revisões sistemáticas, protocolos de pesquisa, diretrizes de acessibilidade em IDEs", { width: 1780 }),
      cell("Repositórios de código acessível, projetos de IC, guias para uso de TAs em disciplinas de programação", { width: 1780 }),
      cell("Publicações acadêmicas abertas, resultados de pesquisas aplicadas", { width: 1780 }),
      cell("Pesquisadores, desenvolvedores de TA, policymakers, ONGs de inclusão", { fill: BLUE_PALE, width: 1820 }),
    ]),
  ]
});

// ============================================================
// SOURCES TABLE
// ============================================================
const sourcesTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [4000, 2500, 1560, 1300],
  rows: [
    row([
      headerCell("Artigo / Título", 4000),
      headerCell("Autores / Instituição", 2500),
      headerCell("Ano", 1560),
      headerCell("Tipo", 1300),
    ]),
    row([
      cell("Making Programming Accessible to Learners with Visual Impairments: A Literature Review", { width: 4000 }),
      cell("Hadwen-Bennett, Sentance, Morrison / King's College London & Microsoft Research", { width: 2500 }),
      cell("2018", { align: AlignmentType.CENTER, width: 1560 }),
      cell("Revisão de Literatura", { width: 1300 }),
    ]),
    row([
      cell("Assistive Technologies for Teaching Programming to Visually Impaired Learners: A Systematic Review", { fill: GRAY, width: 4000 }),
      cell("Mendes et al. / Universidade Federal de Goiás (UFG), Brasil", { fill: GRAY, width: 2500 }),
      cell("2025", { align: AlignmentType.CENTER, fill: GRAY, width: 1560 }),
      cell("Revisão Sistemática", { fill: GRAY, width: 1300 }),
    ]),
    row([
      cell("Teaching Programming for Blinds: A Review", { width: 4000 }),
      cell("Al-Ratta & Al-Khalifa / King Saud University, Arábia Saudita", { width: 2500 }),
      cell("2013", { align: AlignmentType.CENTER, width: 1560 }),
      cell("Revisão Sistemática", { width: 1300 }),
    ]),
    row([
      cell("A Systematic Review on Developing Computer Programming Skills for Visually Impaired Students", { fill: GRAY, width: 4000 }),
      cell("Aljarallah & Dutta / AlMaarefa University, Arábia Saudita", { fill: GRAY, width: 2500 }),
      cell("2024", { align: AlignmentType.CENTER, fill: GRAY, width: 1560 }),
      cell("Revisão Sistemática", { fill: GRAY, width: 1300 }),
    ]),
    row([
      cell("Teaching Programming Logic for People with Blindness or Visual Impairments: a Systematic Mapping Study", { width: 4000 }),
      cell("Santos, Shibata, Pinto / Universidade Federal do Pará (UFPA), Brasil", { width: 2500 }),
      cell("2025", { align: AlignmentType.CENTER, width: 1560 }),
      cell("Mapeamento Sistemático", { width: 1300 }),
    ]),
    row([
      cell("Diretrizes de Acessibilidade em Ambientes de Desenvolvimento Integrado para Estudantes Cegos", { fill: GRAY, width: 4000 }),
      cell("Zen & Tavares / IFFar & UFPEL, Brasil", { fill: GRAY, width: 2500 }),
      cell("2025", { align: AlignmentType.CENTER, fill: GRAY, width: 1560 }),
      cell("Tese de Doutorado", { fill: GRAY, width: 1300 }),
    ]),
  ]
});

// ============================================================
// DOCUMENT
// ============================================================
const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }, {
          level: 1, format: LevelFormat.BULLET, text: "\u25E6", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1080, hanging: 360 } } }
        }]
      },
      {
        reference: "numbers",
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      }
    ]
  },
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: BLUE },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 }
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: BLUE_LIGHT },
        paragraph: { spacing: { before: 300, after: 160 }, outlineLevel: 1 }
      },
      {
        id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: "444444" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 }
      },
    ]
  },
  sections: [
    // ========================================================
    // CAPA
    // ========================================================
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1800 }
        }
      },
      children: [
        spacer(), spacer(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 480, after: 120 },
          children: [new TextRun({ text: "REPOSITÓRIO DE RECURSOS PARA O ENSINO DE PROGRAMAÇÃO", bold: true, size: 36, color: BLUE, font: "Arial" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 80, after: 120 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: BLUE_LIGHT, space: 2 } },
          children: [new TextRun({ text: "A ESTUDANTES COM DEFICIÊNCIA VISUAL", bold: true, size: 32, color: BLUE_LIGHT, font: "Arial" })]
        }),
        spacer(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 120 },
          children: [new TextRun({ text: "Proposta de Trabalho de Conclusão de Curso (TCC)", size: 26, italics: true, color: "555555", font: "Arial" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 80, after: 400 },
          children: [new TextRun({ text: "Embasamento Teórico, Taxonomia e Estrutura do Repositório", size: 24, color: "666666", font: "Arial" })]
        }),
        spacer(), spacer(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 80 },
          children: [new TextRun({ text: "Campo Grande, MS — 2025", size: 22, color: "888888", font: "Arial" })]
        }),
        pageBreak(),
      ]
    },
    // ========================================================
    // CONTEÚDO PRINCIPAL
    // ========================================================
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1800 }
        }
      },
      headers: {
        default: new Header({
          children: [headerLine("Repositório de Recursos — Ensino de Programação para Estudantes com Deficiência Visual")]
        })
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({ text: "Página ", size: 18, color: "888888", font: "Arial" }),
              new PageNumber()
            ]
          })]
        })
      },
      children: [
        // ---- SUMÁRIO ----
        h1("SUMÁRIO"),
        new TableOfContents("Sumário", { hyperlink: true, headingStyleRange: "1-3" }),
        pageBreak(),

        // ====================================================
        // PARTE 1 — INTRODUÇÃO E JUSTIFICATIVA
        // ====================================================
        h1("1. INTRODUÇÃO E JUSTIFICATIVA"),
        p("A inclusão de pessoas com deficiência visual (PDV) no campo da Tecnologia da Informação e, mais especificamente, no ensino de programação de computadores, representa um dos maiores desafios contemporâneos da educação inclusiva. Segundo a Organização Mundial da Saúde (OMS), existem aproximadamente 285 milhões de pessoas com deficiência visual no mundo — das quais 39 milhões são cegas e 246 milhões possuem baixa visão —, e cerca de 90% delas vivem em países em desenvolvimento."),
        spacer(),
        p("No Brasil, de acordo com o Censo Demográfico do IBGE (2010), mais de 35 milhões de pessoas declararam possuir alguma dificuldade visual, e aproximadamente 528 mil são cegas. Com o avanço das políticas de inclusão, especialmente após a promulgação da Lei Brasileira de Inclusão (LBI — Lei nº 13.146/2015) e as diretrizes do Plano Nacional de Educação (PNE), tem crescido a presença de estudantes com deficiência visual em cursos da área de Computação e Tecnologia da Informação."),
        spacer(),
        p("Entretanto, a literatura científica internacional é unânime em apontar que o ensino de programação ainda apresenta barreiras significativas para esse público. Os ambientes de desenvolvimento integrado (IDEs) fazem uso extensivo de elementos gráficos e metáforas visuais que são inacessíveis aos leitores de tela (NVDA, JAWS). Linguagens de programação em blocos (BBLs), como Scratch, amplamente utilizadas no ensino básico, apresentam desafios adicionais em comparação às linguagens textuais (TBLs). A indentação, o destaque por cores (syntax highlighting) e a navegação por estruturas de código são elementos que dependem criticamente da visão."),
        spacer(),
        p("Diante desse cenário, o presente projeto propõe a criação de um repositório digital centralizado, categorizado e de acesso livre, dedicado exclusivamente a recursos, ferramentas, metodologias e conteúdos voltados ao ensino de programação para estudantes com deficiência visual. A motivação central é reduzir a fragmentação do conhecimento existente — disperso em artigos científicos, ferramentas isoladas e experiências não documentadas — e oferecer um ponto de convergência para professores, estudantes, pesquisadores e gestores educacionais."),

        // ====================================================
        // PARTE 2 — PROBLEMA DE PESQUISA
        // ====================================================
        h1("2. PROBLEMA DE PESQUISA"),
        p("A ausência de um repositório centralizado e organizado de recursos pedagógicos e tecnológicos para o ensino de programação a estudantes com deficiência visual resulta em:"),
        spacer(),
        bullet("Dificuldade de acesso a ferramentas assistivas validadas por pesquisa científica;"),
        bullet("Retrabalho por parte de professores que, individualmente, desenvolvem materiais adaptativos sem conhecimento das soluções já existentes;"),
        bullet("Desigualdade no acesso ao conhecimento entre instituições com maiores ou menores recursos;"),
        bullet("Baixa disseminação de resultados de pesquisas aplicadas ao contexto educacional brasileiro;"),
        bullet("Falta de referências consolidadas para embasar políticas públicas e decisões pedagógicas institucionais."),
        spacer(),
        p("Desse modo, a questão de pesquisa que orienta este trabalho é:"),
        spacer(),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 160, after: 160 },
          border: {
            left: { style: BorderStyle.SINGLE, size: 20, color: BLUE_LIGHT, space: 10 }
          },
          indent: { left: 720 },
          children: [new TextRun({ text: "\"Como um repositório digital centralizado, categorizado por nível de ensino e categoria de público-alvo, pode contribuir para facilitar, unificar e democratizar o acesso a recursos para o ensino de programação a estudantes com deficiência visual no Brasil?\"", italics: true, size: 24, font: "Arial", color: "333333" })]
        }),

        // ====================================================
        // PARTE 3 — OBJETIVOS
        // ====================================================
        h1("3. OBJETIVOS"),
        h2("3.1. Objetivo Geral"),
        p("Desenvolver um repositório digital centralizado, aberto e categorizado de recursos pedagógicos, ferramentas assistivas, metodologias e conteúdos científicos voltados ao ensino de programação para estudantes com deficiência visual, organizado por nível de ensino e categoria de público-alvo."),
        spacer(),
        h2("3.2. Objetivos Específicos"),
        bullet("Realizar um levantamento sistemático da literatura científica nacional e internacional sobre o tema;"),
        bullet("Identificar, catalogar e categorizar os principais recursos, ferramentas e metodologias existentes;"),
        bullet("Propor e implementar uma taxonomia de classificação baseada em nível de ensino (Básico, Técnico, Superior) e categoria de público-alvo (Professor, Aluno, Público Geral, Público Específico);"),
        bullet("Desenvolver a plataforma digital do repositório com foco em acessibilidade (compatibilidade com leitores de tela, navegação por teclado, contraste adequado);"),
        bullet("Validar o repositório com usuários representativos das categorias-alvo por meio de avaliação heurística e testes de usabilidade;"),
        bullet("Contribuir para a consolidação de uma base de conhecimento que possa orientar políticas públicas de inclusão digital."),

        // ====================================================
        // PARTE 4 — FUNDAMENTAÇÃO TEÓRICA
        // ====================================================
        h1("4. FUNDAMENTAÇÃO TEÓRICA"),
        h2("4.1. Deficiência Visual e Aprendizagem de Programação"),
        p("A deficiência visual abrange desde a baixa visão até a cegueira total, classificadas conforme a Classificação Internacional de Doenças (CID-11) em: baixa visão funcional, cegueira funcional e cegueira total. Para fins educacionais, essas categorias definem estratégias pedagógicas distintas: estudantes com baixa visão podem se beneficiar de recursos de ampliação e alto contraste, enquanto estudantes cegos dependem principalmente de feedback auditivo e háptico."),
        spacer(),
        p("A aprendizagem de programação, por sua natureza altamente abstrata e dependente de estruturas visuais (indentação, blocos, diagramas de fluxo, sintaxe colorida), impõe desafios adicionais aos estudantes com deficiência visual. Hadwen-Bennett, Sentance e Morrison (2018) identificaram que os leitores de tela frequentemente falham em transmitir adequadamente a estrutura hierárquica do código — um elemento central para a compreensão de conceitos como funções, laços e condicionais."),
        spacer(),
        p("Aljarallah e Dutta (2024), em revisão sistemática abrangendo publicações de 2000 a 2023, destacaram que a ausência de recursos acessíveis e adequados à construção de entendimento conceitual representa o principal obstáculo à formação de programadores com deficiência visual. Os autores identificaram 21 estudos que classificaram as intervenções em duas grandes categorias: tecnologias assistivas (TAs) e design de cursos adaptativos."),

        h2("4.2. Tecnologias Assistivas no Ensino de Programação"),
        p("Mendes et al. (2025), da Universidade Federal de Goiás, conduziram revisão sistemática que mapeou tecnologias assistivas específicas para o ensino de programação a PDVs. Os 22 estudos selecionados revelaram quatro categorias principais de intervenção:"),
        spacer(),
        bulletBold("Feedback Auditivo e Háptico: ", "Síntese de voz para leitura de código, Braille displays, retorno sonoro para representação de estruturas de dados e navegação em IDEs. Ferramentas como JAWS, NVDA e Emacspeak são as mais documentadas."),
        bulletBold("Linguagens Textuais Acessíveis (TBLs): ", "Adaptações de Python, Java e linguagens específicas como Quorum (projetada para ser acessível a leitores de tela), que evita caracteres como chaves {} e prioriza palavras-chave em inglês próximo da linguagem natural."),
        bulletBold("Linguagens de Blocos Acessíveis (BBLs): ", "Adaptações de Scratch e similares para interfaces não visuais, como o Talking Scratch e interfaces táteis. Este é o campo com menor maturidade na literatura."),
        bulletBold("Artefatos Físicos e Kits Tangíveis: ", "Objetos físicos para representação de fluxogramas, estruturas de dados e conceitos de programação de forma háptica, como kits LEGO adaptados e flowcharts em relevo."),
        spacer(),
        p("Al-Ratta e Al-Khalifa (2013) revisaram a literatura de 1975 a 2013 e identificaram que a maior parte das pesquisas se concentra em linguagens textuais e em estudantes do ensino superior, com lacuna expressiva no ensino básico — um achado reafirmado pela revisão de Hadwen-Bennett et al. (2018)."),

        h2("4.3. Diretrizes de Acessibilidade em IDEs"),
        p("Zen e Tavares (2025), em tese de doutorado desenvolvida no âmbito do Programa de Pós-Graduação em Computação da UFPEL, investigaram os Ambientes de Desenvolvimento Integrado (IDEs) como principal barreira e potencial facilitador do aprendizado de programação por estudantes cegos. O estudo, conduzido em 7 estágios metodológicos (Exploratório, Descritivo, Correlacional, Seleção, Especificação, Validação e Refinamento), resultou em um conjunto de diretrizes de acessibilidade para o design de IDEs."),
        spacer(),
        p("As autoras concluíram que a maioria das IDEs disponíveis (VSCode, Eclipse, IntelliJ) apresenta limitações severas de acessibilidade para usuários de leitores de tela, especialmente no que diz respeito a: autocompletar de código, depuração (debugging), navegação por estrutura de projeto e visualização de erros. A pesquisa evidencia que um repositório que consolide essas diretrizes pode ter impacto direto na prática docente e no desenvolvimento de novas ferramentas."),

        h2("4.4. Ensino de Lógica de Programação para PDVs"),
        p("Santos, Shibata e Pinto (2025), da Universidade Federal do Pará, conduziram mapeamento sistemático focado especificamente no ensino de lógica de programação — etapa anterior ao aprendizado de linguagens específicas — para pessoas com deficiência visual e cegueira. Os 13 estudos selecionados identificaram métodos como fluxogramas táteis, kits de programação tangível e uso de recursos sensoriais diversificados."),
        spacer(),
        p("Os autores identificaram uma lacuna relevante: a maior parte dos materiais e ferramentas disponíveis assume que o estudante já possui familiaridade com conceitos de lógica e algoritmos. Há pouco material voltado para a iniciação — em especial para o contexto do ensino técnico e básico brasileiro —, o que reforça a necessidade de um repositório que englobe também materiais introdutórios e fundamentais."),

        h2("4.5. Repositórios Digitais e Gestão do Conhecimento em Educação"),
        p("A literatura sobre repositórios educacionais digitais — como os Repositórios de Objetos de Aprendizagem (ROAs) — destaca que a eficácia desses sistemas depende de três pilares: qualidade e relevância dos recursos catalogados; taxonomia e metadados que permitam busca e filtro eficiente; e acessibilidade da própria plataforma a diferentes perfis de usuários."),
        spacer(),
        p("No contexto da educação inclusiva, a acessibilidade da plataforma repositória é, ela própria, uma dimensão crítica: um repositório voltado a professores e estudantes com deficiência visual que não seja acessível a leitores de tela seria contraditório em seus objetivos. Portanto, a conformidade com as diretrizes WCAG 2.1 (Web Content Accessibility Guidelines), nível AA ou superior, é requisito não negociável do projeto."),
        spacer(),
        p("Adicionalmente, a teoria da Gestão do Conhecimento Organizacional (Nonaka e Takeuchi, 1995) contribui com o entendimento de que o valor de um repositório não está apenas no armazenamento, mas na conversão de conhecimento tácito (experiências de professores que já adaptaram seus métodos) em conhecimento explícito (guias, tutoriais, materiais documentados e compartilháveis)."),

        // ====================================================
        // PARTE 5 — TAXONOMIA DO REPOSITÓRIO
        // ====================================================
        h1("5. TAXONOMIA DO REPOSITÓRIO"),
        p("A taxonomia proposta organiza os recursos em duas dimensões principais: Nível de Ensino e Categoria de Público-Alvo. Essa estrutura bidimensional permite que qualquer usuário localize rapidamente os recursos mais relevantes para seu contexto específico, seja um professor do ensino básico buscando planos de aula adaptados, seja um pesquisador do ensino superior procurando revisões sistemáticas."),
        spacer(),
        h2("5.1. Dimensão 1 — Nível de Ensino"),
        spacer(),
        bulletBold("Ensino Básico (Fundamental e Médio): ", "Abrange recursos para estudantes de 6 a 17 anos, alinhados à BNCC e às diretrizes de educação especial. Foco em pensamento computacional, lógica introdutória, linguagens em blocos acessíveis e artefatos físicos."),
        bulletBold("Ensino Técnico (Cursos Profissionalizantes): ", "Recursos para cursos técnicos em Informática, Desenvolvimento de Sistemas, Redes e áreas correlatas. Foco em linguagens textuais, IDEs acessíveis, programação orientada a objetos e desenvolvimento web."),
        bulletBold("Ensino Superior (Graduação e Pós-Graduação): ", "Recursos para cursos de Ciência da Computação, Engenharia de Software, Sistemas de Informação e áreas afins. Inclui artigos científicos, revisões sistemáticas, ferramentas de pesquisa e diretrizes de acessibilidade."),
        spacer(),
        h2("5.2. Dimensão 2 — Categoria de Público-Alvo"),
        spacer(),
        bulletBold("Professor: ", "Materiais de apoio pedagógico, guias metodológicos, planos de aula adaptados, formação continuada, avaliação de ferramentas assistivas e diretrizes de design instrucional inclusivo."),
        bulletBold("Aluno: ", "Tutoriais, exercícios práticos, exemplos de código acessível, guias de uso de tecnologias assistivas específicas para programação (NVDA+VSCode, JAWS+Eclipse, etc.)."),
        bulletBold("Público Geral: ", "Informativos sobre inclusão digital, legislação relevante (LBI, PNE, Decreto 5.296/2004), artigos de divulgação científica, relatos de experiência."),
        bulletBold("Público Específico: ", "Recursos destinados a grupos com necessidades particulares: pesquisadores (metodologias, protocolos de pesquisa), gestores (políticas institucionais), desenvolvedores de TA (padrões de acessibilidade, APIs de leitores de tela) e ONGs."),
        spacer(),
        h2("5.3. Matriz de Classificação Cruzada"),
        p("A tabela abaixo apresenta a interseção entre Nível de Ensino e Categoria de Público-Alvo, com exemplos de tipos de recursos em cada célula:"),
        spacer(),
        classificationTable,
        spacer(),

        // ====================================================
        // PARTE 6 — TIPOS DE RECURSOS
        // ====================================================
        h1("6. TIPOS DE RECURSOS NO REPOSITÓRIO"),
        p("O repositório catalogará recursos em cinco grandes categorias tipológicas:"),
        spacer(),
        h3("6.1. Publicações Científicas"),
        bullet("Artigos em periódicos revisados por pares"),
        bullet("Anais de conferências (IHC, SBIE, RBIE, CBIE, WIE, CSEE&T, ITiCSE)"),
        bullet("Teses e dissertações"),
        bullet("Relatórios técnicos e preprints"),
        spacer(),
        h3("6.2. Ferramentas e Tecnologias Assistivas"),
        bullet("Leitores de tela compatíveis com IDEs (configurações e tutoriais)"),
        bullet("Plugins de acessibilidade para VSCode, Eclipse, IntelliJ"),
        bullet("Linguagens de programação projetadas para acessibilidade (Quorum, Sodbeans)"),
        bullet("Kits físicos e tangíveis para ensino de lógica"),
        spacer(),
        h3("6.3. Materiais Pedagógicos"),
        bullet("Planos de aula adaptados"),
        bullet("Exercícios e projetos com instruções em áudio ou Braille"),
        bullet("Vídeos com audiodescrição e legendas"),
        bullet("Fluxogramas em relevo e materiais táteis"),
        spacer(),
        h3("6.4. Diretrizes e Normas"),
        bullet("WCAG 2.1 / 2.2 — diretrizes de acessibilidade web"),
        bullet("NBR 9050 — acessibilidade a edificações (contexto físico de laboratórios)"),
        bullet("Diretrizes de acessibilidade em IDEs (Zen & Tavares, 2025)"),
        bullet("Políticas institucionais de inclusão em IES brasileiras"),
        spacer(),
        h3("6.5. Experiências e Relatos"),
        bullet("Estudos de caso documentados"),
        bullet("Depoimentos de estudantes e professores"),
        bullet("Resultados de avaliações de usabilidade de ferramentas"),
        bullet("Projetos de extensão e iniciação científica"),

        // ====================================================
        // PARTE 7 — METODOLOGIA DO TCC
        // ====================================================
        h1("7. METODOLOGIA"),
        p("A pesquisa será conduzida em quatro fases complementares:"),
        spacer(),
        h2("Fase 1 — Revisão Sistemática da Literatura (RSL)"),
        p("Condução de revisão sistemática seguindo o protocolo PRISMA (Preferred Reporting Items for Systematic Reviews and Meta-Analyses), contemplando bases de dados como ACM Digital Library, IEEE Xplore, Scopus, Google Scholar, ERIC e Portal de Periódicos CAPES. As strings de busca combinarão descritores como: \"visual impairment\", \"programming education\", \"assistive technology\", \"blind\", \"screen reader\", \"deficiência visual\", \"ensino de programação\"."),
        spacer(),
        h2("Fase 2 — Levantamento e Catalogação"),
        p("Catalogação de ferramentas, metodologias e recursos identificados na RSL e em fontes complementares (repositórios institucionais, GitHub, plataformas de educação aberta). Cada item será descrito com metadados padronizados: título, tipo, autor/instituição, ano, nível de ensino, público-alvo, idioma, licença e resumo."),
        spacer(),
        h2("Fase 3 — Desenvolvimento do Repositório"),
        p("Implementação da plataforma digital utilizando tecnologias web acessíveis (HTML5 semântico, ARIA landmarks, navegação por teclado), em conformidade com WCAG 2.1 nível AA. A arquitetura da informação seguirá a taxonomia proposta no Capítulo 5. Serão implementados filtros por nível de ensino, público-alvo, tipo de recurso e idioma."),
        spacer(),
        h2("Fase 4 — Avaliação e Validação"),
        p("Avaliação da plataforma por meio de: (a) avaliação heurística com especialistas em acessibilidade, utilizando as 10 heurísticas de Nielsen; (b) testes de usabilidade com usuários representativos das categorias-alvo, incluindo pelo menos um grupo de usuários com deficiência visual; (c) análise automatizada com ferramentas como WAVE e Axe Core."),

        // ====================================================
        // PARTE 8 — BASES LEGAIS
        // ====================================================
        h1("8. BASES LEGAIS E NORMATIVAS"),
        bullet("Lei Brasileira de Inclusão (LBI) — Lei nº 13.146/2015: estabelece os direitos das pessoas com deficiência, incluindo o direito à educação inclusiva e ao acesso à tecnologia."),
        bullet("Decreto nº 5.296/2004: regulamenta o atendimento prioritário e normas de acessibilidade."),
        bullet("Plano Nacional de Educação (PNE) — Lei nº 13.005/2014: metas relativas à educação inclusiva e formação de professores."),
        bullet("Portaria MEC nº 3.284/2003: requisitos de acessibilidade para cursos superiores."),
        bullet("WCAG 2.1 (W3C): diretrizes internacionais de acessibilidade para conteúdo web."),
        bullet("e-MAG (Modelo de Acessibilidade em Governo Eletrônico): padrão brasileiro de acessibilidade digital para serviços públicos."),

        // ====================================================
        // PARTE 9 — FONTES BIBLIOGRÁFICAS
        // ====================================================
        h1("9. FONTES BIBLIOGRÁFICAS — ARTIGOS BASE"),
        p("Os seis artigos científicos a seguir constituem o núcleo bibliográfico primário deste projeto, fornecendo embasamento direto para a taxonomia proposta e para a justificativa da criação do repositório:"),
        spacer(),
        sourcesTable,
        spacer(),
        p("Adicionalmente, a fundamentação do projeto apoia-se nas seguintes referências complementares:"),
        spacer(),
        bullet("BRASIL. Lei nº 13.146, de 6 de julho de 2015. Lei Brasileira de Inclusão da Pessoa com Deficiência. Brasília, DF: Presidência da República, 2015."),
        bullet("NONAKA, I.; TAKEUCHI, H. The Knowledge-Creating Company. Oxford University Press, 1995."),
        bullet("NIELSEN, J. 10 Usability Heuristics for User Interface Design. Nielsen Norman Group, 1994."),
        bullet("W3C. Web Content Accessibility Guidelines (WCAG) 2.1. World Wide Web Consortium, 2018."),
        bullet("IBGE. Censo Demográfico 2010: Características Gerais da População, Religião e Pessoas com Deficiência. Rio de Janeiro: IBGE, 2012."),
        bullet("OMS. World Report on Vision. Geneva: World Health Organization, 2019."),
        bullet("PRISMA. Preferred Reporting Items for Systematic Reviews and Meta-Analyses. Moher et al., 2009."),
        spacer(),

        // ====================================================
        // PARTE 10 — CRONOGRAMA
        // ====================================================
        h1("10. CRONOGRAMA PREVISTO"),
        spacer(),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [3600, 1296, 1296, 1296, 1296, 1296 + 280],
          rows: [
            row([
              headerCell("Atividade", 3600),
              headerCell("Mês 1-2", 1296),
              headerCell("Mês 3-4", 1296),
              headerCell("Mês 5-6", 1296),
              headerCell("Mês 7-8", 1296),
              headerCell("Mês 9-10", 1576),
            ]),
            row([
              cell("Revisão Sistemática da Literatura", { width: 3600 }),
              cell("X", { align: AlignmentType.CENTER, fill: BLUE_PALE, width: 1296 }),
              cell("X", { align: AlignmentType.CENTER, fill: BLUE_PALE, width: 1296 }),
              cell("", { width: 1296 }),
              cell("", { width: 1296 }),
              cell("", { width: 1576 }),
            ]),
            row([
              cell("Catalogação e Taxonomia", { fill: GRAY, width: 3600 }),
              cell("", { fill: GRAY, width: 1296 }),
              cell("X", { align: AlignmentType.CENTER, fill: BLUE_PALE, width: 1296 }),
              cell("X", { align: AlignmentType.CENTER, fill: BLUE_PALE, width: 1296 }),
              cell("", { fill: GRAY, width: 1296 }),
              cell("", { fill: GRAY, width: 1576 }),
            ]),
            row([
              cell("Desenvolvimento da Plataforma", { width: 3600 }),
              cell("", { width: 1296 }),
              cell("", { width: 1296 }),
              cell("X", { align: AlignmentType.CENTER, fill: BLUE_PALE, width: 1296 }),
              cell("X", { align: AlignmentType.CENTER, fill: BLUE_PALE, width: 1296 }),
              cell("", { width: 1576 }),
            ]),
            row([
              cell("Avaliação e Validação", { fill: GRAY, width: 3600 }),
              cell("", { fill: GRAY, width: 1296 }),
              cell("", { fill: GRAY, width: 1296 }),
              cell("", { fill: GRAY, width: 1296 }),
              cell("X", { align: AlignmentType.CENTER, fill: BLUE_PALE, width: 1296 }),
              cell("X", { align: AlignmentType.CENTER, fill: BLUE_PALE, width: 1576 }),
            ]),
            row([
              cell("Escrita do TCC e Defesa", { width: 3600 }),
              cell("", { width: 1296 }),
              cell("", { width: 1296 }),
              cell("", { width: 1296 }),
              cell("", { width: 1296 }),
              cell("X", { align: AlignmentType.CENTER, fill: BLUE_PALE, width: 1576 }),
            ]),
          ]
        }),
        spacer(),

        // ====================================================
        // CONSIDERAÇÕES FINAIS
        // ====================================================
        h1("11. CONSIDERAÇÕES FINAIS"),
        p("O repositório proposto por este TCC representa uma contribuição concreta à educação inclusiva no campo da Ciência da Computação no Brasil. Ao centralizar, organizar e disponibilizar recursos validados por evidências científicas, classificados por nível de ensino e público-alvo, o projeto endereça simultaneamente três lacunas críticas: a fragmentação do conhecimento existente, a dificuldade de acesso enfrentada por professores e estudantes, e a ausência de uma plataforma nacional de referência para este tema específico."),
        spacer(),
        p("A base teórica formada pelos seis artigos científicos primários — produzidos por pesquisadores do Brasil, Arábia Saudita, Reino Unido e Estados Unidos, entre 2013 e 2025 — demonstra que o campo é ativo, relevante e carente de sistematização. O presente projeto ambiciona preencher esse vazio de forma metodologicamente rigorosa, tecnicamente acessível e socialmente relevante."),
        spacer(),
        p("Espera-se que o repositório, após sua implementação e validação, possa ser adotado por instituições de ensino públicas e privadas, utilizando em políticas de formação docente e tornando-se referência para pesquisadores e desenvolvedores de tecnologias assistivas no contexto educacional brasileiro."),
      ]
    }
  ]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/home/claude/repositorio_tcc_deficiencia_visual.docx', buffer);
  console.log('Documento criado com sucesso!');
}).catch(err => {
  console.error('Erro:', err);
  process.exit(1);
});
