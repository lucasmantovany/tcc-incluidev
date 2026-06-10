import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, RefreshCw, Book, ExternalLink, HelpCircle, MessageSquare } from 'lucide-react';
import { conteudos } from '../data/conteudos';
import { fluxoAssistente } from '../data/fluxoAssistente';

function Assistente() {
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState(1);
  const [perfil, setPerfil] = useState('');
  const [respostas, setRespostas] = useState({});
  const [anuncioAcessibilidade, setAnuncioAcessibilidade] = useState('');
  
  const tituloRef = useRef(null);

  const perfilConfig = perfil ? fluxoAssistente[perfil] : null;
  const totalEtapas = perfilConfig ? perfilConfig.etapas.length + 1 : 4; 
  // +1 is the profile selection itself. So if 3 questions, total is 4. Etapa 5 is results.

  const isResultados = etapa > totalEtapas;

  // Anunciar mudanças de etapa para leitores de tela e mover o foco
  useEffect(() => {
    let msg = '';
    if (etapa === 1) {
      msg = 'Etapa 1: Identificação do seu perfil. Selecione Estudante, Professor, Pesquisador ou Desenvolvedor.';
    } else if (!isResultados && perfilConfig) {
      const configEtapaAtual = perfilConfig.etapas[etapa - 2];
      msg = `Etapa ${etapa}: ${configEtapaAtual.pergunta}`;
    } else if (isResultados) {
      msg = 'Resultados carregados. Veja as recomendações personalizadas no final da página.';
    }
    setAnuncioAcessibilidade(msg);
    
    // Mover foco para o título da etapa para que leitores de tela leiam imediatamente
    if (tituloRef.current) {
      tituloRef.current.focus();
    }
  }, [etapa, perfil, isResultados, perfilConfig]);

  const selecionarPerfil = (novoPerfil) => {
    setPerfil(novoPerfil);
    setRespostas({});
  };

  const selecionarResposta = (idPergunta, valor) => {
    setRespostas(prev => {
      const atuais = prev[idPergunta] || [];
      if (atuais.includes(valor)) {
        return { ...prev, [idPergunta]: atuais.filter(v => v !== valor) };
      } else {
        return { ...prev, [idPergunta]: [...atuais, valor] };
      }
    });
  };

  const avancar = () => {
    if (etapa === 1 && !perfil) {
      setAnuncioAcessibilidade('Por favor, selecione um perfil antes de avançar.');
      return;
    }
    if (etapa > 1 && !isResultados) {
      const configEtapaAtual = perfilConfig.etapas[etapa - 2];
      const selecionadas = respostas[configEtapaAtual.id] || [];
      if (selecionadas.length === 0) {
        setAnuncioAcessibilidade('Por favor, selecione ao menos uma opção antes de avançar.');
        return;
      }
    }
    setEtapa(prev => prev + 1);
  };

  const voltar = () => {
    setEtapa(prev => Math.max(1, prev - 1));
  };

  const reiniciar = () => {
    setPerfil('');
    setRespostas({});
    setEtapa(1);
  };

  const obterDescricaoFiltro = (idPergunta) => {
    if (!perfilConfig) return '';
    const config = perfilConfig.etapas.find(e => e.id === idPergunta);
    if (!config) return '';
    const selecoes = respostas[idPergunta] || [];
    return selecoes.map(val => {
      const opcao = config.opcoes.find(o => o.val === val);
      return opcao ? opcao.label : val;
    }).join(', ');
  };

  // Filtragem inteligente baseada no perfil e respostas dinâmicas (Múltipla Escolha)
  const obterRecomendacoes = () => {
    if (!perfil) return [];

    return conteudos.filter(item => {
      let matchPublico = false;
      if (perfil === 'Estudante') matchPublico = item.publico.includes('Estudantes') || item.publico.includes('Alunos');
      else if (perfil === 'Professor') matchPublico = item.publico.includes('Professores');
      else if (perfil === 'Pesquisador') matchPublico = item.publico.includes('Pesquisadores') || item.publico.includes('Público Específico');
      else if (perfil === 'Desenvolvedor') matchPublico = item.publico.includes('Desenvolvedores') || item.publico.includes('Público Específico');

      if (perfil === 'Estudante') {
        const rObj = respostas['objetivo'] || [];
        
        let mObj = rObj.length === 0; // se nada for selecionado, match true, mas exigimos ao menos um no avancar
        if (rObj.length > 0) {
          mObj = rObj.some(ans => {
            if (ans === 'fundamentos') return item.tags?.includes('logica') || item.descricao.toLowerCase().includes('lógica') || item.tags?.includes('logica-pensamento');
            if (ans === 'pratica') return item.tags?.includes('texto') || item.tags?.includes('ferramentas') || item.tipo.includes('Linguagem');
            if (ans === 'blocos') return item.tags?.includes('blocos') || item.descricao.toLowerCase().includes('blocos');
            if (ans === 'robotica') return item.tags?.includes('robotica') || item.tags?.includes('eletronica') || item.tipo.includes('Hardware') || item.descricao.toLowerCase().includes('física');
            if (ans === 'acessibilidade') return item.tags?.includes('boas_praticas') || item.tipo.includes('Guia') || item.descricao.toLowerCase().includes('leitor de tela');
            return false;
          });
        }
        
        return matchPublico && mObj;
      }

      if (perfil === 'Professor') {
        const rNec = respostas['necessidade'] || [];
        
        let mNec = rNec.length === 0;
        if (rNec.length > 0) {
          mNec = rNec.some(ans => {
            if (ans === 'estrategias') return item.tipo.includes('Metodologia') || item.tags?.includes('metodologia-ensino') || item.tags?.includes('intervencao');
            if (ans === 'ferramentas') return item.tipo.includes('Ferramenta') || item.tipo.includes('IDE');
            if (ans === 'experiencias') return item.tags?.includes('relatos') || item.tipo.includes('Relato') || item.tags?.includes('empiricos');
            if (ans === 'normas') return item.tipo.includes('Norma') || item.tags?.includes('leis-diretrizes');
            if (ans === 'adaptacao') return item.tags?.includes('curriculo-inclusivo') || item.tipo.includes('Hardware') || item.tags?.includes('objeto');
            return false;
          });
        }

        return matchPublico && mNec;
      }

      if (perfil === 'Desenvolvedor') {
        const rObj = respostas['objetivo'] || [];
        
        let mObj = rObj.length === 0;
        if (rObj.length > 0) {
          mObj = rObj.some(ans => {
            if (ans === 'diretrizes') return item.tipo.includes('Norma') || item.tags?.includes('diretrizes');
            if (ans === 'legislacao') return item.tags?.includes('legislacao') || item.tags?.includes('leis');
            if (ans === 'evidencias') return item.tipo.includes('Artigo') || item.tipo.includes('Revisão') || item.tags?.includes('estudos');
            return false;
          });
        }

        // Para desenvolvedores procurando diretrizes genéricas, afrouxar match publico
        if (rObj.includes('diretrizes') || rObj.includes('legislacao')) matchPublico = matchPublico || item.tipo.includes('Norma');

        return matchPublico && mObj;
      }

      if (perfil === 'Pesquisador') {
        const rObj = respostas['objetivo'] || [];

        // Pesquisador busca qualquer tipo se for revisão sistemática
        if (item.tipo.includes('Revisão') || item.tipo.includes('Artigo')) matchPublico = true;

        let mObj = rObj.length === 0;
        if (rObj.length > 0) {
          mObj = rObj.some(ans => {
            if (ans === 'estado_arte') return item.tipo.includes('Revisão') || item.tags?.includes('revisoes');
            if (ans === 'avaliar') return item.tags?.includes('validacao') || item.tags?.includes('avaliacao-validacao') || item.tipo.includes('Tese');
            if (ans === 'investigar_dev') return item.tipo.includes('Tese') || item.tags?.includes('ferramentas-ide');
            if (ans === 'investigar_edu') return item.tags?.includes('intervencao') || item.tags?.includes('metodologias') || item.tags?.includes('relatos');
            if (ans === 'planejar') return item.tags?.includes('boas_praticas') || item.tipo.includes('Guia');
            return false;
          });
        }

        return matchPublico && mObj;
      }

      return false;
    });
  };

  const recomendacoes = obterRecomendacoes();

  return (
    <div className="page-content container">
      {/* Área viva de acessibilidade */}
      <div className="sr-only" aria-live="assertive" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden' }}>
        {anuncioAcessibilidade}
      </div>

      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <h1 tabIndex="-1" ref={tituloRef} style={{ outline: 'none', margin: 0 }}>
          {!isResultados ? `Busca Guiada — Etapa ${etapa} de ${totalEtapas}` : 'Recomendações para Você'}
        </h1>
        <button 
          onClick={() => navigate('/repositorio')} 
          className="btn btn-secondary" 
          aria-label="Alternar para visualização clássica com filtros em tabela"
        >
          Visualização Clássica
        </button>
      </div>

      {!isResultados && (
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem' }} aria-hidden="true">
          {Array.from({ length: totalEtapas }).map((_, i) => (
            <div key={i} style={{ flex: 1, height: '6px', borderRadius: '3px', backgroundColor: etapa >= i + 1 ? 'var(--accent-color)' : 'var(--tertiary-bg)' }}></div>
          ))}
        </div>
      )}

      {/* Formulário Wizard */}
      <section className="glass-panel" style={{ padding: '2.5rem', marginBottom: '2rem' }} aria-label="Questionário Dinâmico">
        
        {/* ETAPA 1: PERFIL */}
        {etapa === 1 && (
          <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
            <legend style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              Qual é o seu perfil ou papel principal na área de ensino?
            </legend>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { val: 'Estudante', label: 'Estudante', desc: 'Desejo encontrar linguagens, IDEs, ferramentas táteis e tutoriais práticos.' },
                { val: 'Professor', label: 'Professor / Educador', desc: 'Procuro metodologias, planos de aula, currículos e ferramentas pedagógicas.' },
                { val: 'Desenvolvedor', label: 'Desenvolvedor', desc: 'Busco diretrizes, normas, APIs e exemplos de design inclusivo.' },
                { val: 'Pesquisador', label: 'Pesquisador', desc: 'Busco revisões sistemáticas, mapeamentos de literatura e estudos empíricos.' }
              ].map(item => (
                <label 
                  key={item.val}
                  style={{
                    display: 'block',
                    padding: '1.25rem',
                    borderRadius: '0.75rem',
                    border: perfil === item.val ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                    backgroundColor: perfil === item.val ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.02)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  className="wizard-option"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <input 
                      type="radio" 
                      name="perfil" 
                      value={item.val}
                      checked={perfil === item.val}
                      onChange={() => selecionarPerfil(item.val)}
                      style={{ width: '1.2rem', height: '1.2rem' }}
                      aria-describedby={`desc-perfil-${item.val}`}
                    />
                    <div>
                      <strong style={{ display: 'block', color: 'var(--text-primary)' }}>{item.label}</strong>
                      <span id={`desc-perfil-${item.val}`} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item.desc}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {/* ETAPAS DINÂMICAS 2+ */}
        {etapa > 1 && !isResultados && perfilConfig && (
          <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
            <legend style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              {perfilConfig.etapas[etapa - 2].pergunta}
            </legend>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {perfilConfig.etapas[etapa - 2].opcoes.map(item => {
                const arr = respostas[perfilConfig.etapas[etapa - 2].id] || [];
                const isSelected = arr.includes(item.val);
                return (
                  <label 
                    key={item.val}
                    style={{
                      display: 'block',
                      padding: '1.25rem',
                      borderRadius: '0.75rem',
                      border: isSelected ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                      backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.02)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    className="wizard-option"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <input 
                        type="checkbox" 
                        name={`etapa${etapa}Option`} 
                        value={item.val}
                        checked={isSelected}
                        onChange={() => selecionarResposta(perfilConfig.etapas[etapa - 2].id, item.val)}
                        style={{ width: '1.2rem', height: '1.2rem' }}
                        aria-describedby={`desc-e${etapa}-${item.val}`}
                      />
                      <div>
                        <strong style={{ display: 'block', color: 'var(--text-primary)' }}>{item.label}</strong>
                        <span id={`desc-e${etapa}-${item.val}`} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item.desc}</span>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}

        {/* RESULTADOS */}
        {isResultados && (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Encontramos {recomendacoes.length} recomendações para você!
            </h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
              Com base no seu perfil de <strong>{perfilConfig?.nome}</strong> e nas suas respostas exclusivas: <br />
              <strong>{obterDescricaoFiltro(perfilConfig?.etapas[0]?.id)}</strong>
            </p>
            <div className="flex gap-4" style={{ justifyContent: 'center' }}>
              <button onClick={reiniciar} className="btn btn-secondary" style={{ gap: '0.5rem' }}>
                <RefreshCw size={18} /> Responder Novamente
              </button>
            </div>
          </div>
        )}

        {/* Navegação do Wizard */}
        {!isResultados && (
          <div className="flex justify-between" style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <button 
              onClick={voltar} 
              disabled={etapa === 1} 
              className="btn btn-secondary" 
              style={{ gap: '0.5rem', opacity: etapa === 1 ? 0.4 : 1 }}
              aria-label="Voltar para a pergunta anterior"
            >
              <ArrowLeft size={18} /> Voltar
            </button>
            <button 
              onClick={avancar} 
              className="btn btn-primary" 
              style={{ gap: '0.5rem' }}
              aria-label={etapa === totalEtapas ? "Ver recomendações" : "Avançar para a próxima pergunta"}
            >
              {etapa === totalEtapas ? 'Ver Recomendações' : 'Avançar'} <ArrowRight size={18} />
            </button>
          </div>
        )}
      </section>

      {/* Resultados Recomendados */}
      {isResultados && (
        <section id="recomendacoes-lista" aria-label="Recomendações de conteúdo">
          <div className="cards-grid">
            {recomendacoes.length > 0 ? (
              recomendacoes.map((item) => (
                <article key={item.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Book size={16} aria-hidden="true" />
                      {item.tipo}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{new Date(item.data).getFullYear()}</span>
                  </div>
                  
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{item.titulo}</h3>
                  <p style={{ flexGrow: 1, fontSize: '0.95rem' }}>{item.descricao}</p>
                  
                  <div className="tags-container" style={{ marginBottom: '1.5rem' }}>
                    {item.nivel.map(n => (
                      <span key={n} className="tag nivel">Nível: {n}</span>
                    ))}
                    {item.publico.map(p => (
                      <span key={p} className="tag publico">Público: {p}</span>
                    ))}
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: 'auto' }}>
                    <Link 
                      to={`/conteudo/${item.id}`} 
                      className="btn btn-secondary" 
                      style={{ display: 'flex', justifyContent: 'center' }}
                      aria-label={`Ver resumo detalhado de ${item.titulo}`}
                    >
                      Ver Detalhes
                    </Link>
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-primary" 
                      style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem' }}
                      aria-label={`Acessar conteúdo original de ${item.titulo} (abre em nova aba)`}
                    >
                      Original <ExternalLink size={16} aria-hidden="true" />
                    </a>
                  </div>

                  <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
                    Ref: {item.referencia}
                  </div>
                </article>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px dashed var(--border-color)' }}>
                <HelpCircle size={48} color="#94a3b8" style={{ marginBottom: '1rem' }} />
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Nenhum recurso específico encontrado</h3>
                <p style={{ maxWidth: '500px', margin: '0 auto', marginBottom: '1.5rem' }}>
                  A combinação das respostas para este perfil restringiu demais a busca. Recomendamos clicar em "Responder Novamente" e marcar opções como "Qualquer Nível" ou "Todos os conteúdos" para ver a lista completa!
                </p>
              </div>
            )}
          </div>
          
          <div className="glass-panel" style={{ marginTop: '3rem', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: '1px dashed var(--accent-color)' }}>
            <MessageSquare size={36} color="var(--accent-color)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Não encontrou exatamente o que buscava?
            </h3>
            <p style={{ maxWidth: '700px', fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Nosso repositório é colaborativo e está em constante expansão. Se você conhece alguma ferramenta, artigo científico, guia ou metodologia de ensino de programação que seja acessível a PcDV e não esteja listado aqui, compartilhe conosco!
            </p>
            <Link to="/experiencias" className="btn btn-primary" style={{ gap: '0.5rem' }}>
              Compartilhar Sugestão ou Experiência
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

export default Assistente;