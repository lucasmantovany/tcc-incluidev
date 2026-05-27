# Plano de Ação - Nova Versão do IncluiDev (Portal Acessível PcDV)

Após a reunião com a orientadora, as seguintes melhorias e novos recursos foram propostos para estruturar a nova versão do portal:
1. **Acessibilidade Heurística (Leitores de Tela):** Garantir marcações HTML e ARIA adequadas para testes práticos com leitores de tela populares (JAWS, NVDA, TalkBack).
2. **Extração de Ferramentas Acadêmicas:** Inclusão de 10 novas ferramentas mapeadas na literatura de 1975 a 2013 no banco de dados do portal.
3. **Assistente Guia Dinâmico (Wizard):** Criação de uma navegação orientada por questionário passo a passo para guiar o usuário aos recursos adequados, de forma alternativa aos filtros clássicos.
4. **Central de Experiências e Painel de Moderação:** Implementação de um fluxo completo de envio de feedbacks e relatos práticos de usuários, com um painel de moderação para aprovar ou rejeitar as submissões utilizando persistência em `localStorage`.
5. **Tema Claro/Escuro:** Adição de suporte nativo a temas visuais com switch acessível no menu principal.
6. **Páginas Individuais de Conteúdo:** Abordagem onde cada recurso mapeado no repositório tem uma URL própria (`/conteudo/:id`) contendo um resumo descritivo otimizado e um redirecionamento seguro para a fonte oficial.

---

## Fases Implementadas

### Fase 1: Base de Dados e Componentes Core
- Adição de 10 novas ferramentas e frameworks extraídos das revisões sistemáticas em `conteudos.js`.
- Configuração das novas rotas (`Assistente`, `Experiencias`, `Moderacao`) em `App.jsx`.
- Implementação inicial de `index.css` focada em formulários acessíveis e layout grid responsivo.

### Fase 2: Interfaces Dinâmicas e Funcionalidades
- **Assistente.jsx:** Wizard interativo de 3 etapas com foco ativo e anúncios dinâmicos (`aria-live`).
- **Experiencias.jsx:** Página de exibição de relatos e formulário semântico com aviso amigável de status.
- **Moderacao.jsx:** Painel simulado (`admin` / `tcc-ufms`) com recursos de aprovação plena, edição inline, rejeição e listagem.

### Fase 3: Temas e Páginas Detalhadas (Mais Recente)
- **Modo Claro/Escuro:**
  - Lógica salva no `localStorage` gerida pelo contexto/App e ativando atributos em `document.documentElement`.
  - Atualização do `index.css` mapeando propriedades dinâmicas em `[data-theme="light"]`.
- **Página de Detalhes (`ConteudoDetalhe.jsx`):**
  - Criação de uma rota genérica que usa `useParams` para recuperar a ID.
  - Tela rica com título, tags semânticas e referência visível para respeito aos direitos autorais.
  - Cards no `Repositorio` e no `Assistente` agora exibem botão "Ver Detalhes" abrindo a rota.
- **Refatoração de Experiências:**
  - Remoção de estilos inline engessados com paletas fixas (cores sólidas de hexadecimais incompatíveis com Light Mode) substituídas por variáveis de CSS dinâmico. 

### Fase 4: Extração de Conteúdos, Resumos e Filtros (Atual)
- **Atualização de Filtros no Repositório:** Inclusão de um novo filtro por "Tipo de Material" (Ferramentas, Artigos, Guias) com base na lógica construída no *Assistente Guia*.
- **Extração Analítica de PDFs Locais:** Leitura e análise profunda via IA dos documentos no diretório `/artigos` gerando resumos em português focados na metodologia de ensino.
- **Enriquecimento de Ferramentas sem PDF:** Criação de resumos extensos diretamente da fonte de conhecimento das ferramentas de mercado catalogadas em `conteudos.js`.
- **Implementação Visual:** Atualização de `ConteudoDetalhe.jsx` para exibir o conteúdo longo enriquecido (campo `detalhes`).

---

## Verification Plan & Conclusão
- Todos os builds foram testados usando `npm run build` retornando sucesso (vite client environment setup properly).
- Testes manuais indicam transições responsivas perfeitas no switch de temas e o link persistente do painel moderação com edição em cache funcionando adequadamente.
