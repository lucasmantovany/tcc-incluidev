import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ExternalLink, Book } from 'lucide-react';
import { conteudos } from '../data/conteudos';

function Repositorio() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Lendo os valores iniciais da URL (se o usuário veio das caixas da Home)
  const initialNivel = searchParams.get('nivel') || 'Todos';
  const initialPublico = searchParams.get('publico') || 'Todos';
  const initialTipo = searchParams.get('tipo') || 'Todos';

  const [filtroNivel, setFiltroNivel] = useState(initialNivel);
  const [filtroPublico, setFiltroPublico] = useState(initialPublico);
  const [filtroTipo, setFiltroTipo] = useState(initialTipo);

  // Atualizar a URL quando os filtros mudam para permitir compartilhamento de links
  useEffect(() => {
    const params = new URLSearchParams();
    if (filtroNivel !== 'Todos') params.set('nivel', filtroNivel);
    if (filtroPublico !== 'Todos') params.set('publico', filtroPublico);
    if (filtroTipo !== 'Todos') params.set('tipo', filtroTipo);
    setSearchParams(params);
  }, [filtroNivel, filtroPublico, filtroTipo, setSearchParams]);

  // Sincronizar estado caso o usuário use botões de voltar/avançar no navegador
  useEffect(() => {
    setFiltroNivel(searchParams.get('nivel') || 'Todos');
    setFiltroPublico(searchParams.get('publico') || 'Todos');
    setFiltroTipo(searchParams.get('tipo') || 'Todos');
  }, [searchParams]);

  // Listas de opções para os filtros
  const niveis = ['Todos', 'Básico', 'Técnico', 'Superior'];
  const publicos = ['Todos', 'Professores', 'Alunos', 'Público Geral', 'Público Específico'];
  const tiposMaterial = ['Todos', 'Ferramentas Práticas / IDEs', 'Artigos / Acadêmicos', 'Guias / Normas'];

  // Lógica de filtragem
  const conteudosFiltrados = conteudos.filter(item => {
    const matchNivel = filtroNivel === 'Todos' || item.nivel.includes(filtroNivel);
    const matchPublico = filtroPublico === 'Todos' || item.publico.includes(filtroPublico);
    
    let matchTipo = true;
    if (filtroTipo === 'Ferramentas Práticas / IDEs') {
      const termosFerramenta = ['Linguagem', 'Ferramenta', 'IDE', 'Hardware', 'Aplicativo', 'Ambiente Lúdico', 'Plugin'];
      matchTipo = termosFerramenta.some(termo => item.tipo.toLowerCase().includes(termo.toLowerCase()));
    } else if (filtroTipo === 'Artigos / Acadêmicos') {
      const termosAcademico = ['Artigo', 'Revisão', 'Mapeamento', 'Tese'];
      matchTipo = termosAcademico.some(termo => item.tipo.toLowerCase().includes(termo.toLowerCase()));
    } else if (filtroTipo === 'Guias / Normas') {
      const termosGuias = ['Guia', 'Norma'];
      matchTipo = termosGuias.some(termo => item.tipo.toLowerCase().includes(termo.toLowerCase()));
    }

    return matchNivel && matchPublico && matchTipo;
  });

  return (
    <div className="page-content container">
      <h1 style={{ marginBottom: '1rem' }} tabIndex="0">Repositório de Conteúdos</h1>
      <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }} tabIndex="0">
        Explore e filtre nosso banco de dados unificado com metodologias, estudos e ferramentas.
      </p>

      {/* Filtros */}
      <section className="filters-container" aria-label="Filtros de busca">
        <div>
          <label htmlFor="filtro-nivel" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Nível de Ensino:
          </label>
          <select 
            id="filtro-nivel" 
            className="filter-select" 
            value={filtroNivel} 
            onChange={(e) => setFiltroNivel(e.target.value)}
          >
            {niveis.map(nivel => (
              <option key={nivel} value={nivel}>{nivel}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filtro-publico" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Público-Alvo:
          </label>
          <select 
            id="filtro-publico" 
            className="filter-select" 
            value={filtroPublico} 
            onChange={(e) => setFiltroPublico(e.target.value)}
          >
            {publicos.map(publico => (
              <option key={publico} value={publico}>{publico}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filtro-tipo" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Tipo de Material:
          </label>
          <select 
            id="filtro-tipo" 
            className="filter-select" 
            value={filtroTipo} 
            onChange={(e) => setFiltroTipo(e.target.value)}
          >
            {tiposMaterial.map(tipoMat => (
              <option key={tipoMat} value={tipoMat}>{tipoMat}</option>
            ))}
          </select>
        </div>
      </section>

      {/* Resultados da Busca */}
      <div className="cards-grid" role="region" aria-live="polite" aria-label="Resultados da busca">
        {conteudosFiltrados.length > 0 ? (
          conteudosFiltrados.map((item) => (
            <article key={item.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Book size={16} aria-hidden="true" />
                  {item.tipo}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{new Date(item.data).getFullYear()}</span>
              </div>
              
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{item.titulo}</h3>
              <p style={{ flexGrow: 1 }}>{item.descricao}</p>
              
              <div className="tags-container" style={{ marginBottom: '1.5rem' }} aria-label="Categorias">
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
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '1rem' }}>
            <p style={{ fontSize: '1.2rem', color: '#cbd5e1' }}>Nenhum conteúdo encontrado para os filtros selecionados.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Repositorio;
