export const fluxoAssistente = {
  Estudante: {
    nome: "Estudante",
    etapas: [
      {
        id: "nivel",
        pergunta: "Em qual nível de ensino você está estudando?",
        opcoes: [
          { val: "Básico", label: "Ensino Básico (Fundamental e Médio)", desc: "Lógica inicial, pensamento computacional e ferramentas lúdicas." },
          { val: "Técnico", label: "Ensino Técnico", desc: "Cursos técnicos profissionalizantes e linguagens de mercado." },
          { val: "Superior", label: "Ensino Superior / Avançado", desc: "Ambientes de desenvolvimento acadêmicos e engenharia de software avançada." },
          { val: "Qualquer", label: "Qualquer Nível", desc: "Mostrar recursos independente do grau de instrução." }
        ]
      },
      {
        id: "objetivo",
        pergunta: "O que você busca aprender principalmente?",
        opcoes: [
          { val: "ferramentas", label: "Ferramentas e IDEs acessíveis", desc: "Editores de código, extensões e IDEs otimizadas para leitores de tela." },
          { val: "robotica", label: "Robótica ou programação física", desc: "Interação com hardware, robôs físicos ou sensores táteis e sonoros." },
          { val: "logica", label: "Lógica e pensamento computacional", desc: "Aprender conceitos básicos de forma visual, auditiva ou tátil." },
          { val: "web", label: "Programar aplicações web ou mobile", desc: "Aprender a programar sites, aplicativos e estruturas com foco em acessibilidade." },
          { val: "tudo", label: "Explorar todos os recursos de aprendizagem", desc: "Ver todos os materiais recomendados para mim." }
        ]
      }
    ]
  },
  Professor: {
    nome: "Professor / Educador",
    etapas: [
      {
        id: "nivel",
        pergunta: "Para qual nível de ensino você leciona ou planeja?",
        opcoes: [
          { val: "Básico", label: "Ensino Básico (Fundamental e Médio)", desc: "Abordagem com conceitos lúdicos, físicos e blocos acessíveis." },
          { val: "Técnico", label: "Ensino Técnico", desc: "Capacitação profissional e introdução a linguagens comerciais." },
          { val: "Superior", label: "Ensino Superior / Avançado", desc: "Desenvolvimento de software avançado e apoio à pesquisa acadêmica." },
          { val: "Qualquer", label: "Qualquer Nível", desc: "Recursos pedagógicos genéricos e aplicáveis a qualquer nível." }
        ]
      },
      {
        id: "objetivo",
        pergunta: "O que você busca principalmente para as suas aulas?",
        opcoes: [
          { val: "ferramentas", label: "Ferramentas práticas para a sala de aula", desc: "Linguagens, IDEs e compiladores adaptados para uso pedagógico." },
          { val: "metodologias", label: "Metodologias e planos de aula inclusivos", desc: "Estratégias de ensino estruturadas e atividades adaptadas na prática." },
          { val: "diretrizes", label: "Diretrizes de acessibilidade e leis", desc: "Normas de acessibilidade em ensino e leis federais brasileiras." },
          { val: "curriculo", label: "Construção de currículos e materiais inclusivos", desc: "Artigos e frameworks para estruturação de grade curricular de computação." },
          { val: "tudo", label: "Ver todos os recursos de ensino", desc: "Mostrar tudo para o meu nível selecionado." }
        ]
      }
    ]
  },
  Pesquisador: {
    nome: "Pesquisador (Foco em Produção Acadêmica)",
    etapas: [
      {
        id: "revisao_tipo",
        pergunta: "Qual é a tipologia de pesquisa acadêmica que você deseja explorar?",
        opcoes: [
          { val: "primaria", label: "Pesquisa Primária (Estudos Empíricos e de Campo)", desc: "Estudos de caso práticos de uso e intervenção pedagógica com alunos reais PcDV." },
          { val: "secundaria", label: "Pesquisa Secundária (Mapeamentos de Literatura)", desc: "Mapeamento estruturado de abordagens pedagógicas e ferramentas na literatura." },
          { val: "terciaria", label: "Pesquisa Terciária (Revisões Sistemáticas)", desc: "Estudos abrangentes de síntese da literatura científica ao longo dos anos." },
          { val: "qualquer", label: "Sem restrição de tipologia", desc: "Buscar estudos científicos e revisões de qualquer natureza." }
        ]
      },
      {
        id: "objetivo",
        pergunta: "Qual é o objetivo principal da sua pesquisa no momento?",
        opcoes: [
          { val: "estado_arte", label: "Explorar o estado da arte e tendências", desc: "Encontrar mapeamentos e revisões sistemáticas de literatura." },
          { val: "validacao", label: "Estudos de validação e avaliação empírica", desc: "Estudos focados em comprovar cientificamente a acessibilidade de ferramentas." },
          { val: "intervencoes", label: "Propor ou avaliar intervenções pedagógicas", desc: "Artigos científicos focados em intervenções em salas de aula inclusivas." },
          { val: "tudo", label: "Explorar todas as referências científicas", desc: "Ver todas as teses, revisões e artigos acadêmicos." }
        ]
      }
    ]
  },
  Desenvolvedor: {
    nome: "Desenvolvedor (Criação de Produtos Acessíveis)",
    etapas: [
      {
        id: "produto",
        pergunta: "Que tipo de produto de software você está desenvolvendo ou planejando?",
        opcoes: [
          { val: "jogos", label: "Jogos ou ambientes lúdicos de ensino", desc: "Jogos acessíveis, robótica educativa ou ambientes interativos com áudio." },
          { val: "ferramentas", label: "IDEs, plugins ou compiladores", desc: "Ambientes de desenvolvimento e plugins de auxílio de navegação e sintaxe." },
          { val: "web_mobile", label: "Aplicações web ou mobile acessíveis", desc: "Sistemas e aplicativos tradicionais que precisam seguir normas de a11y." },
          { val: "qualquer", label: "Outros sistemas ou ferramentas", desc: "Recursos gerais de desenvolvimento inclusivo." }
        ]
      },
      {
        id: "diretrizes",
        pergunta: "Você busca também diretrizes, normas ou regulamentações?",
        opcoes: [
          { val: "sim", label: "Sim, quero diretrizes técnicas e normas legislativas", desc: "Mostrar WCAG, LBI brasileira e diretrizes de design junto com os materiais." },
          { val: "nao", label: "Não, prefiro focar apenas em exemplos práticos e frameworks", desc: "Filtrar apenas por ferramentas, IDEs e códigos práticos." }
        ]
      }
    ]
  }
};
