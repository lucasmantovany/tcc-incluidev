export const fluxoAssistente = {
  Estudante: {
    nome: "Estudante",
    etapas: [
      {
        id: "nivel",
        pergunta: "Em qual nível de ensino você está atualmente?",
        opcoes: [
          { val: "Básico", label: "Ensino Básico", desc: "Fundamental ou Médio." },
          { val: "Técnico", label: "Ensino Técnico", desc: "Cursos profissionalizantes." },
          { val: "Superior", label: "Ensino Superior", desc: "Graduação ou pós-graduação." }
        ]
      },
      {
        id: "objetivo",
        pergunta: "O que você deseja aprender ou explorar?",
        opcoes: [
          { val: "blocos", label: "Programação em blocos", desc: "Introdução visual/lúdica adaptada." },
          { val: "texto", label: "Programação textual", desc: "Linguagens comerciais ou ferramentas de código." },
          { val: "robotica", label: "Robótica educacional", desc: "Interação com hardware educacional." },
          { val: "eletronica", label: "Eletrônica e computação física", desc: "Projetos tangíveis e sensoriais." },
          { val: "logica", label: "Lógica de programação", desc: "Conceitos fundamentais e pensamento computacional." },
          { val: "ferramentas", label: "Ferramentas acessíveis", desc: "IDEs, guias e plugins." }
        ]
      },
      {
        id: "tipo_conteudo",
        pergunta: "Que tipo de conteúdo deseja visualizar?",
        opcoes: [
          { val: "ferramentas", label: "Ferramentas", desc: "Aplicações e ambientes de código." },
          { val: "tutoriais", label: "Tutoriais", desc: "Guias práticos e normas." },
          { val: "artigos", label: "Artigos", desc: "Estudos acadêmicos e revisões." },
          { val: "tudo", label: "Todos os conteúdos", desc: "Exibir tudo que se encaixa." }
        ]
      }
    ]
  },
  Professor: {
    nome: "Professor / Educador",
    etapas: [
      {
        id: "nivel",
        pergunta: "Em qual nível de ensino você atua?",
        opcoes: [
          { val: "Básico", label: "Ensino Básico", desc: "Fundamental ou Médio." },
          { val: "Técnico", label: "Ensino Técnico", desc: "Cursos profissionalizantes." },
          { val: "Superior", label: "Ensino Superior", desc: "Graduação ou pós-graduação." }
        ]
      },
      {
        id: "necessidade",
        pergunta: "Qual é sua principal necessidade?",
        opcoes: [
          { val: "metodologias", label: "Metodologias de ensino", desc: "Práticas pedagógicas e frameworks." },
          { val: "ferramentas", label: "Ferramentas acessíveis", desc: "IDEs e plataformas para alunos." },
          { val: "relatos", label: "Relatos de experiência", desc: "Experiências práticas aplicadas." },
          { val: "leis", label: "Leis e normas", desc: "Diretrizes e regulamentações." },
          { val: "objetos", label: "Criação de objetos de aprendizagem", desc: "Material educacional customizado." }
        ]
      },
      {
        id: "tipo_conteudo",
        pergunta: "Que tipo de conteúdo deseja visualizar?",
        opcoes: [
          { val: "artigos", label: "Artigos científicos", desc: "Mapeamentos e revisões sistemáticas." },
          { val: "ferramentas", label: "Ferramentas", desc: "Sistemas e plugins de ensino." },
          { val: "guias", label: "Guias práticos", desc: "Tutoriais e manuais." },
          { val: "relatos", label: "Relatos de experiência", desc: "Comunidade e casos de estudo." },
          { val: "tudo", label: "Todos os conteúdos", desc: "Ver todas as opções." }
        ]
      }
    ]
  },
  Desenvolvedor: {
    nome: "Desenvolvedor de Tecnologia Assistiva",
    etapas: [
      {
        id: "objetivo",
        pergunta: "O que você procura atualmente?",
        opcoes: [
          { val: "diretrizes", label: "Diretrizes de acessibilidade", desc: "Padrões W3C, WCAG, etc." },
          { val: "normas", label: "Normas e legislação", desc: "LBI e regulamentações vigentes." },
          { val: "estudos", label: "Estudos sobre acessibilidade", desc: "Revisões sistemáticas e papers." },
          { val: "boas_praticas", label: "Boas práticas de desenvolvimento", desc: "Guias MDN, APG, padrões UI." }
        ]
      },
      {
        id: "foco",
        pergunta: "Qual é o foco da solução que está desenvolvendo?",
        opcoes: [
          { val: "blocos", label: "Programação em blocos", desc: "Ex: Adaptação de Scratch, Blockly." },
          { val: "ide", label: "Ambiente de programação (IDE)", desc: "Plugins para VSCode, Eclipse, etc." },
          { val: "objeto", label: "Objeto de aprendizagem", desc: "Jogos lúdicos, apps focados." },
          { val: "plataforma", label: "Plataforma educacional", desc: "Plataformas web/mobile." },
          { val: "outro", label: "Outro", desc: "Soluções não listadas acima." }
        ]
      },
      {
        id: "tipo_conteudo",
        pergunta: "Que tipo de material deseja consultar?",
        opcoes: [
          { val: "diretrizes", label: "Diretrizes", desc: "WCAG, APG." },
          { val: "artigos", label: "Artigos científicos", desc: "Estudos de usabilidade." },
          { val: "teses", label: "Teses e dissertações", desc: "Pesquisas de pós-graduação." },
          { val: "legislacao", label: "Legislação", desc: "Leis locais ou internacionais." },
          { val: "tudo", label: "Todos os conteúdos", desc: "Sem restrição." }
        ]
      }
    ]
  },
  Pesquisador: {
    nome: "Pesquisador",
    etapas: [
      {
        id: "tema",
        pergunta: "Qual é o tema principal da sua pesquisa?",
        opcoes: [
          { val: "ensino", label: "Ensino de programação", desc: "Lógica, pensamento computacional." },
          { val: "tecnologias", label: "Tecnologias assistivas", desc: "Soluções de leitura de tela, braille, áudio." },
          { val: "acessibilidade", label: "Acessibilidade digital", desc: "Desenvolvimento inclusivo em interfaces." },
          { val: "inclusao", label: "Inclusão educacional", desc: "Adaptação de escolas e planos de aula." },
          { val: "outro", label: "Outro", desc: "Áreas afins." }
        ]
      },
      {
        id: "metodo",
        pergunta: "Sua pesquisa envolve:",
        opcoes: [
          { val: "desenvolvimento", label: "Desenvolvimento de ferramenta", desc: "Criando uma nova solução." },
          { val: "validacao", label: "Validação de ferramenta", desc: "Avaliando soluções existentes." },
          { val: "intervencao", label: "Intervenção educacional", desc: "Testando métodos com alunos." },
          { val: "revisao", label: "Revisão de literatura", desc: "Mapeamento sistemático." },
          { val: "exploratorio", label: "Estudo exploratório", desc: "Investigações iniciais." }
        ]
      },
      {
        id: "tipo_conteudo",
        pergunta: "Que tipo de material deseja consultar?",
        opcoes: [
          { val: "artigos", label: "Artigos científicos", desc: "Estudos empíricos e teóricos." },
          { val: "revisoes", label: "Revisões sistemáticas", desc: "Mapeamentos já publicados." },
          { val: "teses", label: "Teses e dissertações", desc: "Pesquisas de mestrado/doutorado." },
          { val: "empiricos", label: "Estudos empíricos", desc: "Dados primários, uso de caso." },
          { val: "tudo", label: "Todos os conteúdos", desc: "Buscar sem filtros de tipo." }
        ]
      }
    ]
  }
};
