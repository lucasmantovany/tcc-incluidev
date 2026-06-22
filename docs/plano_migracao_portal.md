# Plano de Migração do Portal IncluiDev — Novo Repositório Git

Este documento apresenta a análise técnica e o guia passo a passo para isolar a aplicação web do portal **IncluiDev** de suas dependências acadêmicas de TCC (artigos, apresentações, LaTeX, scripts locais de apoio), criando um repositório Git limpo, otimizado e independente, ideal para hospedagem e portfólio.

---

## 1. Arquivos Necessários (O que DEVE ser migrado)

Apenas o conteúdo localizado dentro do diretório `portal/` constitui o software da aplicação. Ele deve ser migrado integralmente na raiz do novo repositório:

### 📂 Diretórios Estruturais
- `src/` — Código-fonte da aplicação React.
  - `src/main.jsx` e `src/App.jsx` — Entrypoints e roteador.
  - `src/pages/` — As telas do sistema (`Home`, `Assistente`, `Avaliacao`, `Experiencias`, `Repositorio`, `Moderacao`, `ConteudoDetalhe`).
  - `src/data/` — Base de dados local em JSON (`conteudos.js`, `detalhes.js`, `fluxoAssistente.js`) que serve o Assistente Guiado.
  - `src/config/` — Arquivo de conexão com a API do Firebase (`firebase.js`).
  - `src/assets/` — Imagens locais e ícones.
- `public/` — Atributos e ícones públicos estáticos (ex: favicon).

### 📄 Arquivos de Configuração
- `package.json` e `package-lock.json` — Gerenciamento de dependências e scripts npm.
- `vite.config.js` — Compilação e empacotamento do Vite.
- `eslint.config.js` — Validador estático de boas práticas de JavaScript/React.
- `vercel.json` — Configuração de redirecionamento de rotas (crucial para o React Router funcionar no deploy da Vercel).
- `index.html` — Arquivo raiz HTML.
- `.gitignore` — Ignora os arquivos pesados de build e de pacotes (`node_modules/`, `dist/`, `.env`).
- `README.md` — Descrição do repositório.

---

## 2. Arquivos para EXCLUIR (O que NÃO deve ser migrado)

Para manter o novo repositório estritamente profissional e voltado ao software, **não inclua** os seguintes arquivos acadêmicos:

- ❌ `docs/` — Rascunhos de TCC, artigo LaTeX (`main.tex`), figuras e slides em PPTX.
- ❌ `artigos/` — Biblioteca de artigos científicos em PDF coletados na Revisão Sistemática de Literatura (RSL).
- ❌ `arquivos/` — Scripts auxiliares de Node e Python criados para automações locais durante a escrita.
- ❌ `.gitignore` (da raiz) — O gitignore global do monorepo atual do TCC.

---

## 3. Guia de Execução da Migração

Selecione um dos dois métodos abaixo para realizar a separação do código:

### Método A: Migração Limpa (Seguro, Recomendado para Portfólios)
Este método cria um repositório do zero no GitHub sem herdar o histórico de commits do desenvolvimento do TCC acadêmico, o que deixa o repositório focado exclusivamente na evolução técnica do portal.

1. Crie uma pasta vazia fora do diretório do TCC (ex: na sua Área de Trabalho) chamada `incluidev-portal`.
2. **Copie todo o conteúdo de dentro da pasta `portal/`** do TCC e cole nessa nova pasta. (⚠️ *Dica: Não copie a pasta `node_modules` nem a pasta `dist` se elas existirem na pasta de origem, pois o gitignore cuidará disso, poupando tempo de cópia*).
3. Abra o terminal (PowerShell, CMD ou terminal do VS Code) apontando para essa nova pasta e execute a sequência:
   ```bash
   # 1. Inicializa o novo repositório Git local
   git init

   # 2. Adiciona todos os arquivos do portal para staging
   git add .

   # 3. Cria o primeiro commit oficial do repositório
   git commit -m "feat: inicializa repositório limpo do portal IncluiDev"

   # 4. Crie um repositório vazio no seu GitHub pessoal, copie a URL dele e associe:
   git remote add origin https://github.com/seu-usuario/novo-repositorio-portal.git

   # 5. Define a branch principal como main e envia os arquivos
   git branch -M main
   git push -u origin main
   ```

---

### Método B: Migração Mantendo o Histórico de Commits (Via Git Subtree)
Se você deseja manter todos os commits individuais realizados no diretório `portal/` ao longo do desenvolvimento do TCC, utilize o comando `git subtree` diretamente a partir da pasta raiz do seu projeto TCC atual.

1. Crie um repositório vazio no seu GitHub pessoal (não adicione README, licença ou .gitignore nele).
2. Abra o terminal na raiz do diretório do TCC atual (`c:/Users/lucas/Documents/Scripts/tcc-incluidev`) e execute o comando:
   ```bash
   git subtree push --prefix=portal https://github.com/seu-usuario/novo-repositorio-portal.git main
   ```
   *Este comando varre seu histórico atual, separa apenas os commits que alteraram arquivos dentro da pasta `portal/`, extrai essa pasta para se tornar a nova raiz de arquivos e envia os dados diretamente para o novo repositório GitHub.*

---

## 4. Próximos Passos Pós-Migração
- **Instalação das Dependências:** No novo repositório, rode `npm install` para baixar a pasta `node_modules` limpa.
- **Configuração do Firebase:** Certifique-se de configurar as variáveis de ambiente `.env` para as chaves do Firebase se for expor o código publicamente.
- **Deploy:** Conecte o novo repositório diretamente na Vercel para fazer builds automáticos a cada novo commit.
