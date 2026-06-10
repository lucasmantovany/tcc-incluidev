export const fluxoAssistente = {
  Estudante: {
    nome: "Estudante",
    etapas: [
      {
        id: "objetivo",
        pergunta: "O que você gostaria de explorar hoje?",
        opcoes: [
          { val: "fundamentos", label: "Aprender os fundamentos da programação", desc: "Conceitos básicos, lógica e pensamento computacional." },
          { val: "pratica", label: "Programar na prática", desc: "Linguagens, IDEs acessíveis, exemplos de código." },
          { val: "blocos", label: "Explorar programação em blocos", desc: "Ambientes adaptados com blocos e estratégias intuitivas." },
          { val: "robotica", label: "Aprender com robótica e projetos", desc: "Computação física e eletrônica." },
          { val: "acessibilidade", label: "Recursos de acessibilidade e apoio", desc: "Leitores de tela, atalhos e guias de configuração." }
        ]
      }
    ]
  },
  Professor: {
    nome: "Professor(a)",
    etapas: [
      {
        id: "necessidade",
        pergunta: "Como podemos ajudar você hoje?",
        opcoes: [
          { val: "estrategias", label: "Estratégias para ensinar programação", desc: "Metodologias, propostas didáticas e intervenções." },
          { val: "ferramentas", label: "Ferramentas e recursos para a prática", desc: "Ambientes e tecnologias assistivas para a sala de aula." },
          { val: "experiencias", label: "Conhecer experiências de outros professores", desc: "Relatos de experiência e estudos de caso." },
          { val: "normas", label: "Consultar leis, normas e diretrizes", desc: "Documentos orientadores e princípios de acessibilidade." },
          { val: "adaptacao", label: "Criar ou adaptar materiais didáticos", desc: "Recomendações de acessibilidade para objetos de aprendizagem." }
        ]
      }
    ]
  },
  Desenvolvedor: {
    nome: "Desenvolvedor(a)",
    etapas: [
      {
        id: "objetivo",
        pergunta: "Como podemos apoiar o desenvolvimento da sua solução?",
        opcoes: [
          { val: "diretrizes", label: "Diretrizes para desenvolver tecnologias", desc: "WCAG, W3C, recomendações de design inclusivo." },
          { val: "legislacao", label: "Normas e legislação", desc: "Leis e documentos que orientam o desenvolvimento." },
          { val: "evidencias", label: "Evidências e estudos científicos", desc: "Pesquisas, artigos e estudos sobre tecnologias assistivas." }
        ]
      }
    ]
  },
  Pesquisador: {
    nome: "Pesquisador(a)",
    etapas: [
      {
        id: "objetivo",
        pergunta: "Como podemos apoiar a sua pesquisa?",
        opcoes: [
          { val: "estado_arte", label: "Conhecer o estado da arte", desc: "Revisões sistemáticas e mapeamentos de literatura." },
          { val: "avaliar", label: "Avaliar ou validar tecnologias", desc: "Métodos, instrumentos e estudos de acessibilidade." },
          { val: "investigar_dev", label: "Investigar o desenvolvimento de tecnologias", desc: "Processos de design e adaptação de ferramentas." },
          { val: "investigar_edu", label: "Investigar práticas educacionais", desc: "Metodologias, intervenções e experiências em sala." },
          { val: "planejar", label: "Planejar estudos com participantes", desc: "Aspectos metodológicos e éticos em pesquisa inclusiva." }
        ]
      }
    ]
  }
};
