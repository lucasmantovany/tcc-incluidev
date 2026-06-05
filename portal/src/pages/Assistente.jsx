import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, RefreshCw, Book, ExternalLink, HelpCircle, MessageSquare } from 'lucide-react';
import { conteudos } from '../data/conteudos';
import { fluxoAssistente } from '../data/fluxoAssistente';

function Assistente() {
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState(1);
  const [perfil, setPerfil] = useState('');
  const [etapa2Ans, setEtapa2Ans] = useState('');
  const [etapa3Ans, setEtapa3Ans] = useState('');
  const [anuncioAcessibilidade, setAnuncioAcessibilidade] = useState('');
  
  const tituloRef = useRef(null);

  const configEtapa2 = perfil && fluxoAssistente[perfil] ? fluxoAssistente[perfil].etapas[0] : null;
  const configEtapa3 = perfil && fluxoAssistente[perfil] ? fluxoAssistente[perfil].etapas[1] : null;

  // Anunciar mudanças de etapa para leitores de tela e mover o foco
  useEffect(() => {
    let msg = '';
    if (etapa === 1) {
      msg = 'Etapa 1 de 3: Identificação do seu perfil. Selecione Estudante, Professor, Pesquisador ou Desenvolvedor.';
    } else if (etapa === 2 && configEtapa2) {
      msg = `Etapa 2 de 3: ${configEtapa2.pergunta}`;
    } else if (etapa === 3 && configEtapa3) {
      msg = `Etapa 3 de 3: ${configEtapa3.pergunta}`;
    } else if (etapa === 4) {
      msg = 'Resultados carregados. Veja as recomendações personalizadas no final da página.';
    }
    setAnuncioAcessibilidade(msg);
    
    // Mover foco para o título da etapa para que leitores de tela leiam imediatamente
    if (tituloRef.current) {
      tituloRef.current.focus();
    }
  }, [etapa, perfil, configEtapa2, configEtapa3]);

  const selecionarPerfil = (novoPerfil) => {
    setPerfil(novoPerfil);
    setEtapa2Ans('');
    setEtapa3Ans('');
  };

  const avancar = () => {
    if (etapa === 1 && !perfil) {
      setAnuncioAcessibilidade('Por favor, selecione um perfil antes de avançar.');
      return;
    }
    if (etapa === 2 && !etapa2Ans) {
      setAnuncioAcessibilidade('Por favor, selecione uma opção antes de avançar.');
      return;
    }
    if (etapa === 3 && !etapa3Ans) {
      setAnuncioAcessibilidade('Por favor, selecione uma opção antes de avançar.');
      return;
    }
    setEtapa(prev => prev + 1);
  };

  const voltar = () => {
    setEtapa(prev => Math.max(1, prev - 1));
  };

  const reiniciar = () => {
    setPerfil('');
    setEtapa2Ans('');
    setEtapa3Ans('');
    setEtapa(1);
  };

  const obterDescricaoFiltro = (etapaNum) => {
    if (!perfil || !fluxoAssistente[perfil]) return '';
    const config = fluxoAssistente[perfil].etapas[etapaNum - 2];
    const resp = etapaNum === 2 ? etapa2Ans : etapa3Ans;
    const opcao = config?.opcoes.find(o => o.val === resp);
    return opcao ? opcao.label : '';
  };

  // Filtragem inteligente baseada no perfil e respostas dinâmicas
  const obterRecomendacoes = () => {
    if (!perfil) return [];

    return conteudos.filter(item => {
      // 1. Filtro base de público-alvo (mapeado semântico)
      let matchPublico = false;
      if (perfil === 'Estudante') {
        matchPublico = item.publico.includes('Estudantes');
      } else if (perfil === 'Professor') {
        matchPublico = item.publico.includes('Professores');
      } else if (perfil === 'Pesquisador') {
        matchPublico = item.publico.includes('Pesquisadores');
      } else if (perfil === 'Desenvolvedor') {
        matchPublico = item.publico.includes('Desenvolvedores');
      }

      // 2. Filtros específicos por trilha do perfil
      if (perfil === 'Estudante') {
        // etapa2Ans: Nível (Básico, Técnico, Superior, Qualquer)
        const matchNivel = etapa2Ans === 'Qualquer' || item.nivel.includes(etapa2Ans);
        
        // etapa3Ans: objetivo (ferramentas, robotica, logica, web, tudo)
        let matchObjetivo = true;
        if (etapa3Ans === 'ferramentas') {
          matchObjetivo = item.tags.includes('ferramentas-ide');
        } else if (etapa3Ans === 'robotica') {
          matchObjetivo = item.tags.includes('robotica-fisica');
        } else if (etapa3Ans === 'logica') {
          matchObjetivo = item.tags.includes('logica-pensamento');
        } else if (etapa3Ans === 'web') {
          matchObjetivo = item.tags.includes('web-mobile');
        }
        
        return matchPublico && matchNivel && matchObjetivo;
      }

      if (perfil === 'Professor') {
        // etapa2Ans: Nível que leciona (Básico, Técnico, Superior, Qualquer)
        const matchNivel = etapa2Ans === 'Qualquer' || item.nivel.includes(etapa2Ans);
        
        // etapa3Ans: objetivo (ferramentas, metodologias, diretrizes, curriculo, tudo)
        let matchObjetivo = true;
        if (etapa3Ans === 'ferramentas') {
          matchObjetivo = item.tags.includes('ferramentas-ide');
        } else if (etapa3Ans === 'metodologias') {
          matchObjetivo = item.tags.includes('metodologia-ensino');
        } else if (etapa3Ans === 'diretrizes') {
          matchObjetivo = item.tags.includes('leis-diretrizes');
        } else if (etapa3Ans === 'curriculo') {
          matchObjetivo = item.tags.includes('curriculo-inclusivo');
        }
        
        return matchPublico && matchNivel && matchObjetivo;
      }

      if (perfil === 'Pesquisador') {
        // etapa2Ans: revisao_tipo (primaria, secundaria, terciaria, qualquer)
        let matchTipoRevisao = true;
        if (etapa2Ans === 'primaria') {
          matchTipoRevisao = item.tags.includes('revisao-primaria');
        } else if (etapa2Ans === 'secundaria') {
          matchTipoRevisao = item.tags.includes('revisao-secundaria');
        } else if (etapa2Ans === 'terciaria') {
          matchTipoRevisao = item.tags.includes('revisao-terciaria');
        }

        // etapa3Ans: objetivo (estado_arte, validacao, intervencoes, tudo)
        let matchObjetivo = true;
        if (etapa3Ans === 'estado_arte') {
          matchObjetivo = item.tags.includes('curriculo-inclusivo') || 
                          item.tags.includes('revisao-terciaria') || 
                          item.tags.includes('revisao-secundaria') ||
                          (etapa2Ans === 'primaria' && item.tags.includes('revisao-primaria'));
        } else if (etapa3Ans === 'validacao') {
          matchObjetivo = item.tags.includes('avaliacao-validacao') || 
                          item.tags.includes('revisao-secundaria') || 
                          item.tags.includes('revisao-terciaria');
        } else if (etapa3Ans === 'intervencoes') {
          matchObjetivo = item.tags.includes('intervencao-pedagogica') || 
                          item.tags.includes('metodologia-ensino') || 
                          item.tags.includes('revisao-secundaria') ||
                          item.tags.includes('revisao-terciaria');
        }

        return matchPublico && matchTipoRevisao && matchObjetivo;
      }

      if (perfil === 'Desenvolvedor') {
        // etapa2Ans: produto (jogos, ferramentas, web_mobile, qualquer)
        let matchProduto = true;
        if (etapa2Ans === 'jogos') {
          matchProduto = item.tags.includes('jogos');
        } else if (etapa2Ans === 'ferramentas') {
          matchProduto = item.tags.includes('ferramentas-ide');
        } else if (etapa2Ans === 'web_mobile') {
          matchProduto = item.tags.includes('web-mobile');
        }

        // etapa3Ans: diretrizes (sim, nao)
        let matchDiretrizes = true;
        if (etapa3Ans === 'sim') {
          matchDiretrizes = item.tags.includes('leis-diretrizes') || (matchProduto && !item.tipo.includes('Norma'));
        } else {
          matchDiretrizes = !item.tags.includes('leis-diretrizes') || item.tags.includes('ferramentas-ide') || item.tags.includes('jogos');
        }

        return (matchPublico || item.tags.includes('leis-diretrizes')) && matchProduto && matchDiretrizes;
      }

      return false;
    });
  };

  const recomendacoes = obterRecomendacoes();

  return (
    <div className="page-content container">
      {/* Área viva de acessibilidade invisível para anúncios do leitor de tela */}
      <div className="sr-only" aria-live="assertive" style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        border: '0'
      }}>
        {anuncioAcessibilidade}
      </div>

      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <h1 tabIndex="-1" ref={tituloRef} style={{ outline: 'none', margin: 0 }}>
          {etapa <= 3 ? `Assistente Guia — Etapa ${etapa} de 3` : 'Recomendações para Você'}
        </h1>
        <button 
          onClick={() => navigate('/repositorio')} 
          className="btn btn-secondary" 
          aria-label="Alternar para visualização clássica com filtros em tabela"
        >
          Visualização Clássica
        </button>
      </div>

      {etapa <= 3 && (
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem' }} aria-hidden="true">
          <div style={{ flex: 1, height: '6px', borderRadius: '3px', backgroundColor: etapa >= 1 ? 'var(--accent-color)' : 'var(--tertiary-bg)' }}></div>
          <div style={{ flex: 1, height: '6px', borderRadius: '3px', backgroundColor: etapa >= 2 ? 'var(--accent-color)' : 'var(--tertiary-bg)' }}></div>
          <div style={{ flex: 1, height: '6px', borderRadius: '3px', backgroundColor: etapa >= 3 ? 'var(--accent-color)' : 'var(--tertiary-bg)' }}></div>
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
                { val: 'Estudante', label: 'Estudante', desc: 'Desejo encontrar linguagens, IDEs, ferramentas táteis e tutoriais práticos para aprender a programar.' },
                { val: 'Professor', label: 'Professor / Educador', desc: 'Procuro metodologias, planos de aula, currículos e ferramentas para ensinar programação a PcDV.' },
                { val: 'Pesquisador', label: 'Pesquisador', desc: 'Busco revisões sistemáticas, mapeamentos de literatura e estudos empíricos para embasar minha pesquisa acadêmica.' },
                { val: 'Desenvolvedor', label: 'Desenvolvedor', desc: 'Busco diretrizes, normas técnicas, APIs e exemplos de design para criar jogos, IDEs e softwares acessíveis.' }
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

        {/* ETAPA 2: DINÂMICA */}
        {etapa === 2 && configEtapa2 && (
          <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
            <legend style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              {configEtapa2.pergunta}
            </legend>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {configEtapa2.opcoes.map(item => (
                <label 
                  key={item.val}
                  style={{
                    display: 'block',
                    padding: '1.25rem',
                    borderRadius: '0.75rem',
                    border: etapa2Ans === item.val ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                    backgroundColor: etapa2Ans === item.val ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.02)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  className="wizard-option"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <input 
                      type="radio" 
                      name="etapa2Option" 
                      value={item.val}
                      checked={etapa2Ans === item.val}
                      onChange={() => setEtapa2Ans(item.val)}
                      style={{ width: '1.2rem', height: '1.2rem' }}
                      aria-describedby={`desc-e2-${item.val}`}
                    />
                    <div>
                      <strong style={{ display: 'block', color: 'var(--text-primary)' }}>{item.label}</strong>
                      <span id={`desc-e2-${item.val}`} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item.desc}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {/* ETAPA 3: DINÂMICA */}
        {etapa === 3 && configEtapa3 && (
          <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
            <legend style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              {configEtapa3.pergunta}
            </legend>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {configEtapa3.opcoes.map(item => (
                <label 
                  key={item.val}
                  style={{
                    display: 'block',
                    padding: '1.25rem',
                    borderRadius: '0.75rem',
                    border: etapa3Ans === item.val ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                    backgroundColor: etapa3Ans === item.val ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.02)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  className="wizard-option"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <input 
                      type="radio" 
                      name="etapa3Option" 
                      value={item.val}
                      checked={etapa3Ans === item.val}
                      onChange={() => setEtapa3Ans(item.val)}
                      style={{ width: '1.2rem', height: '1.2rem' }}
                      aria-describedby={`desc-e3-${item.val}`}
                    />
                    <div>
                      <strong style={{ display: 'block', color: 'var(--text-primary)' }}>{item.label}</strong>
                      <span id={`desc-e3-${item.val}`} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item.desc}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {/* ETAPA 4: RESULTADO */}
        {etapa === 4 && (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Encontramos {recomendacoes.length} recomendações para você!
            </h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
              Com base no seu perfil de <strong>{fluxoAssistente[perfil]?.nome}</strong>, com as seleções: <br />
              <strong>{obterDescricaoFiltro(2)}</strong> e <strong>{obterDescricaoFiltro(3)}</strong>.
            </p>
            <div className="flex gap-4" style={{ justifyContent: 'center' }}>
              <button onClick={reiniciar} className="btn btn-secondary" style={{ gap: '0.5rem' }}>
                <RefreshCw size={18} /> Responder Novamente
              </button>
            </div>
          </div>
        )}

        {/* Navegação do Wizard */}
        {etapa <= 3 && (
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
              aria-label={etapa === 3 ? "Ver recomendações" : "Avançar para a próxima pergunta"}
            >
              {etapa === 3 ? 'Ver Recomendações' : 'Avançar'} <ArrowRight size={18} />
            </button>
          </div>
        )}
      </section>

      {/* Resultados Recomendados */}
      {etapa === 4 && (
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
                  Não encontramos um recurso com essa combinação exata na nossa curadoria.
                </p>
              </div>
            )}
          </div>
          
          {/* Caixa de Sugestão e Colaboração */}
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
