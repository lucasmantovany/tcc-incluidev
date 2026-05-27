import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, RefreshCw, Book, ExternalLink, HelpCircle } from 'lucide-react';
import { conteudos } from '../data/conteudos';

function Assistente() {
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState(1);
  const [perfil, setPerfil] = useState('');
  const [nivel, setNivel] = useState('');
  const [tipo, setTipo] = useState('');
  const [anuncioAcessibilidade, setAnuncioAcessibilidade] = useState('');
  
  const tituloRef = useRef(null);

  // Anunciar mudanças de etapa para leitores de tela e mover o foco
  useEffect(() => {
    let msg = '';
    if (etapa === 1) {
      msg = 'Etapa 1 de 3: Identificação do seu perfil. Selecione o seu perfil nas opções abaixo.';
    } else if (etapa === 2) {
      msg = 'Etapa 2 de 3: Seleção do nível de ensino. Selecione o nível de ensino de seu interesse.';
    } else if (etapa === 3) {
      msg = 'Etapa 3 de 3: Seleção do tipo de conteúdo. Selecione o que você está procurando principalmente.';
    } else if (etapa === 4) {
      msg = 'Resultados carregados. Veja as recomendações personalizadas no final da página.';
    }
    setAnuncioAcessibilidade(msg);
    
    // Mover foco para o título da etapa para que leitores de tela leiam imediatamente
    if (tituloRef.current) {
      tituloRef.current.focus();
    }
  }, [etapa]);

  const avancar = () => {
    if (etapa === 1 && !perfil) {
      setAnuncioAcessibilidade('Por favor, selecione um perfil antes de avançar.');
      return;
    }
    if (etapa === 2 && !nivel) {
      setAnuncioAcessibilidade('Por favor, selecione um nível de ensino antes de avançar.');
      return;
    }
    if (etapa === 3 && !tipo) {
      setAnuncioAcessibilidade('Por favor, selecione o tipo de conteúdo antes de avançar.');
      return;
    }
    setEtapa(prev => prev + 1);
  };

  const voltar = () => {
    setEtapa(prev => Math.max(1, prev - 1));
  };

  const reiniciar = () => {
    setPerfil('');
    setNivel('');
    setTipo('');
    setEtapa(1);
  };

  // Filtragem inteligente com base nas respostas
  const obterRecomendacoes = () => {
    return conteudos.filter(item => {
      // 1. Filtro Perfil
      let matchPerfil = true;
      if (perfil === 'Aluno') {
        matchPerfil = item.publico.includes('Alunos');
      } else if (perfil === 'Professor') {
        matchPerfil = item.publico.includes('Professores');
      } else if (perfil === 'Pesquisador') {
        matchPerfil = item.publico.includes('Público Específico');
      } else if (perfil === 'Geral') {
        matchPerfil = item.publico.includes('Público Geral') || item.publico.includes('Alunos') || item.publico.includes('Professores');
      }

      // 2. Filtro Nível
      const matchNivel = nivel === 'Qualquer' || item.nivel.includes(nivel);

      // 3. Filtro Tipo
      let matchTipo = true;
      if (tipo === 'Ferramentas') {
        const termosFerramenta = ['Linguagem', 'Ferramenta', 'IDE', 'Hardware', 'Aplicativo', 'Ambiente Lúdico', 'Plugin'];
        matchTipo = termosFerramenta.some(termo => item.tipo.toLowerCase().includes(termo.toLowerCase()));
      } else if (tipo === 'Artigos') {
        const termosAcademico = ['Artigo', 'Revisão', 'Mapeamento', 'Tese'];
        matchTipo = termosAcademico.some(termo => item.tipo.toLowerCase().includes(termo.toLowerCase()));
      } else if (tipo === 'Guias') {
        const termosGuias = ['Guia', 'Norma'];
        matchTipo = termosGuias.some(termo => item.tipo.toLowerCase().includes(termo.toLowerCase()));
      }

      return matchPerfil && matchNivel && matchTipo;
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
            <legend style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: '#fff' }}>
              Qual é o seu perfil ou papel principal na área de ensino?
            </legend>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { val: 'Aluno', label: 'Estudante PcDV', desc: 'Desejo encontrar IDEs, ferramentas, atalhos e tutoriais práticos.' },
                { val: 'Professor', label: 'Professor / Educador', desc: 'Procuro metodologias, planos de aula e abordagens inclusivas.' },
                { val: 'Pesquisador', label: 'Pesquisador / Desenvolvedor de TA', desc: 'Busco estudos empíricos, teses e diretrizes de desenvolvimento.' },
                { val: 'Geral', label: 'Público Geral / Interessado', desc: 'Quero conhecer legislação, conceitos iniciais e acessibilidade digital.' }
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
                      onChange={() => setPerfil(item.val)}
                      style={{ width: '1.2rem', height: '1.2rem' }}
                      aria-describedby={`desc-perfil-${item.val}`}
                    />
                    <div>
                      <strong style={{ display: 'block', color: '#fff' }}>{item.label}</strong>
                      <span id={`desc-perfil-${item.val}`} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item.desc}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {/* ETAPA 2: NÍVEL DE ENSINO */}
        {etapa === 2 && (
          <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
            <legend style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: '#fff' }}>
              Qual é o nível de ensino que você deseja focar?
            </legend>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { val: 'Básico', label: 'Ensino Básico (Fundamental e Médio)', desc: 'Lógica inicial, pensamento computacional e ferramentas lúdicas.' },
                { val: 'Técnico', label: 'Ensino Técnico', desc: 'Cursos técnicos profissionalizantes e linguagens de mercado.' },
                { val: 'Superior', label: 'Ensino Superior / Avançado', desc: 'Acadêmico, IDEs avançadas e engenharia de software inclusiva.' },
                { val: 'Qualquer', label: 'Qualquer Nível / Todos os níveis', desc: 'Recomendar recursos gerais independente do grau de instrução.' }
              ].map(item => (
                <label 
                  key={item.val}
                  style={{
                    display: 'block',
                    padding: '1.25rem',
                    borderRadius: '0.75rem',
                    border: nivel === item.val ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                    backgroundColor: nivel === item.val ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.02)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  className="wizard-option"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <input 
                      type="radio" 
                      name="nivel" 
                      value={item.val}
                      checked={nivel === item.val}
                      onChange={() => setNivel(item.val)}
                      style={{ width: '1.2rem', height: '1.2rem' }}
                      aria-describedby={`desc-nivel-${item.val}`}
                    />
                    <div>
                      <strong style={{ display: 'block', color: '#fff' }}>{item.label}</strong>
                      <span id={`desc-nivel-${item.val}`} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item.desc}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {/* ETAPA 3: TIPO DE CONTEÚDO */}
        {etapa === 3 && (
          <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
            <legend style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: '#fff' }}>
              Que tipo de material você busca principalmente?
            </legend>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { val: 'Ferramentas', label: 'Ferramentas Práticas e IDEs', desc: 'Programas de áudio, hardware de blocos e ambientes de programação acessíveis.' },
                { val: 'Artigos', label: 'Artigos, Teses e Mapeamentos Acadêmicos', desc: 'Revisões científicas e avaliações experimentais da literatura.' },
                { val: 'Guias', label: 'Guias de Metodologia e Normas Técnicas', desc: 'Diretrizes WCAG, roteiros pedagógicos e regulamentos de acessibilidade.' },
                { val: 'Tudo', label: 'Tudo', desc: 'Trazer todos os tipos de recursos catalogados.' }
              ].map(item => (
                <label 
                  key={item.val}
                  style={{
                    display: 'block',
                    padding: '1.25rem',
                    borderRadius: '0.75rem',
                    border: tipo === item.val ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                    backgroundColor: tipo === item.val ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.02)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  className="wizard-option"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <input 
                      type="radio" 
                      name="tipo" 
                      value={item.val}
                      checked={tipo === item.val}
                      onChange={() => setTipo(item.val)}
                      style={{ width: '1.2rem', height: '1.2rem' }}
                      aria-describedby={`desc-tipo-${item.val}`}
                    />
                    <div>
                      <strong style={{ display: 'block', color: '#fff' }}>{item.label}</strong>
                      <span id={`desc-tipo-${item.val}`} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item.desc}</span>
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
              Com base no seu perfil de <strong>{perfil === 'Geral' ? 'Público Geral' : perfil}</strong>, foco no nível <strong>{nivel === 'Qualquer' ? 'Geral' : nivel}</strong> e interesse em <strong>{tipo}</strong>.
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
                  
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff' }}>{item.titulo}</h3>
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
                <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Nenhum recurso específico encontrado</h3>
                <p style={{ maxWidth: '500px', margin: '0 auto' }}>
                  Não encontramos um recurso com essa combinação exata na nossa curadoria. Tente reiniciar e alterar alguma resposta ou explore no repositório clássico.
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default Assistente;
