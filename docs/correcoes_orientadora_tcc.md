# Ajustes Pendentes no TCC (Revisão da Orientadora)

Este documento contém os blocos de texto corrigidos baseados na transcrição da reunião de orientação. Copie e cole os blocos abaixo nas respectivas seções do arquivo `docs/TCC Lucas/main.tex` em sua IDE em casa.

## 1. Captura de Telas (Screenshots) e Link do GitHub
A orientadora sugeriu incluir de 1 a 3 capturas de tela (prints) do sistema na seção de "Resultados" (próximo à Caracterização do Repositório) para facilitar a visualização da banca, além de explicitar o link do repositório.

**Ação:** Tire duas capturas de tela do seu sistema rodando localmente ou no Vercel. Salve-as na pasta `docs/TCC Lucas` com os nomes `print_home.png` e `print_repositorio.png`.

**Substituir no `main.tex`:** Localize o final da seção `4.1 Caracterização do Repositório` e substitua o último parágrafo por este bloco:

```latex
O portal oferece interfaces que reúnem resumos detalhados com acesso direcionado às fontes científicas originais, para que professores e desenvolvedores encontrem referências técnicas e legais em um único lugar. O código-fonte completo do sistema, bem como os artefatos de validação descritos nas seções seguintes, estão disponíveis no repositório público do projeto: \url{https://github.com/lucasmantovany/tcc-incluidev}.

Para ilustrar a interface da aplicação, a Figura~\ref{fig:print_home} apresenta a tela inicial do portal, destacando o acesso rápido por perfis e níveis de ensino. A Figura~\ref{fig:print_repositorio} demonstra a tela do repositório com o Assistente Guiado e a listagem de recursos.

\begin{figure}[htpb]
  \centering
  \includegraphics[width=1\textwidth]{print_home.png}
  \caption{Tela Inicial do Portal IncluiDev}
  \label{fig:print_home}
\end{figure}

\begin{figure}[htpb]
  \centering
  \includegraphics[width=1\textwidth]{print_repositorio.png}
  \caption{Tela do Repositório e Filtros do Assistente}
  \label{fig:print_repositorio}
\end{figure}
```

---

## 2. Limitações das Ferramentas de Acessibilidade
A orientadora lembrou da importância de frisar que ferramentas automatizadas (Lighthouse/WAVE) não capturam todos os erros (apenas ~40%).

**Substituir no `main.tex`:** Localize a seção `4.3 Avaliação de Acessibilidade` e substitua todo o conteúdo da seção por:

```latex
Para avaliar o cumprimento das diretrizes de acessibilidade WCAG 2.1 (Nível AA), foram realizadas auditorias mistas. A avaliação automatizada com o Google Lighthouse apontou alta conformidade, com escores de 96/100 na versão desktop e 95/100 na versão móvel. A ferramenta WAVE confirmou a ausência de erros estruturais, indicando apenas alertas pontuais de contraste de cores em elementos secundários (devidamente ajustados nas iterações seguintes).

Cabe ressaltar uma limitação importante deste processo: ferramentas automatizadas são capazes de detectar, em média, apenas cerca de 40\% dos erros de acessibilidade em uma interface web. Por esta razão, a auditoria manual, conduzida individualmente pelo pesquisador utilizando leitores de tela e navegação estrita por teclado, desempenhou papel fundamental. Durante essa verificação, constatou-se o funcionamento adequado da navegação por teclado, sem a ocorrência de armadilhas de foco (\textit{keyboard traps}). Além disso, a aplicação utiliza regiões dinâmicas (\texttt{aria-live="assertive"}) de forma correta, garantindo que as atualizações de conteúdo do Assistente Guiado sejam verbalizadas imediatamente por leitores de tela como o NVDA e o JAWS.
```

---

## 3. Validação com Agentes de IA (Clarificação do SUS Qualitativo)
A IA não gerou uma nota (1 a 5) igual um humano faria, mas sim gerou respostas qualitativas baseadas no SUS/TAM. O prompt também deve ficar documentado no GitHub.

**Substituir no `main.tex`:** Na seção `4.4 Validação Simulatória por Agentes de IA`, substitua a partir do segundo parágrafo (iniciando em "A interação simulada das quatro personas...") até o final da seção por:

```latex
A interação simulada das quatro personas utilizou os questionários SUS e TAM como base estrutural. Contudo, é importante esclarecer a forma como esses instrumentos foram empregados com a IA: em vez de gerar um preenchimento tradicional quantitativo de 1 a 5 para cada item isolado (como fariam usuários humanos), os agentes foram instruídos a fornecer uma análise qualitativa dissertativa fundamentada nas perguntas dessas escalas. Todo o registro desse processo (os \textit{prompts} gerados e as saídas da IA) está disponível para transparência no repositório GitHub do projeto.

Essas respostas qualitativas apontaram baixa carga percebida de leitura sequencial e alta utilidade. Por exemplo, simulando a persona Estudante, a IA relatou: \textit{``A interface fez perguntas objetivas. Não tive que ler centenas de links de pesquisa, o que aliviou minha fadiga com o NVDA''}. Da mesma forma, a persona de Professor (educador do ensino básico) registrou: \textit{``O repositório centralizado salvou horas de pesquisa. O caminho foi fluido''}. 

Embora esses resultados não substituam uma medição psicométrica real com humanos --- visto que as IAs tendem a avaliações mais otimistas e não vivenciam a fadiga orgânica --- eles servem como uma excelente validação lógica heurística de que o fluxo não apresenta inconsistências graves para os perfis testados, suportando a aplicação com usuários reais no futuro.
```

---

## 4. Considerações Finais, Limitações e Trabalhos Futuros
A principal limitação foi a ausência de humanos devido ao tempo de pesquisa. É essencial que os testes futuros incluam pessoas reais com deficiência visual e professores.

**Substituir no `main.tex`:** Na seção `6 Conclusão`, substitua os dois últimos parágrafos por:

```latex
Como discutido na Seção 5, as principais limitações deste estudo decorrem da ausência de testes empíricos com usuários humanos reais --- devido ao tempo hábil da pesquisa para submissão --- e do fato de que ferramentas automatizadas de acessibilidade capturam apenas uma fração dos problemas reais de interação da interface. Por isso, como trabalhos futuros, torna-se essencial a execução de testes com pessoas reais, em especial com pessoas com deficiência visual (visto que tanto discentes quanto docentes desse público poderão utilizar frequentemente o sistema), bem como a comparação dos resultados simulados de SUS/TAM com a avaliação orgânica. 

Espera-se que o portal \textit{IncluiDev} gere um impacto positivo imediato ao facilitar de maneira orgânica e acessível o encontro de ferramentas de programação inclusiva, salvando horas de pesquisa de educadores e alunos. Com isso, o projeto almeja contribuir ativamente para a pesquisa tecnológica educacional e para o fomento de um ensino de computação significativamente mais inclusivo e estruturado.
```

---

**Nota Final:** Após colar estes trechos no seu `main.tex` de casa, não se esqueça de gerar o arquivo limpo para texto puro (`main_texto_puro.txt`), caso sua faculdade exija, e incluir as imagens `print_home.png` e `print_repositorio.png` no seu diretório para que a compilação do LaTeX funcione perfeitamente.
