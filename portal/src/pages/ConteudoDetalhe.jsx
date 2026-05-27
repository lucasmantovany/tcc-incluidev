import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ExternalLink, ArrowLeft, Calendar, User, Tag, BookOpen } from 'lucide-react';
import { conteudos } from '../data/conteudos';
import { detalhesConteudo } from '../data/detalhes';

// Função auxiliar simples para renderizar marcação markdown básica sem biblioteca externa
const renderMarkup = (text) => {
  if (!text) return { __html: '' };
  
  let html = text
    // Cabeçalhos (### Título)
    .replace(/^### (.*$)/gim, '<h3 style="font-size: 1.3rem; margin-top: 1.5rem; margin-bottom: 0.75rem; color: var(--text-primary);">$1</h3>')
    // Negrito (**texto**)
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    // Listas (- item)
    .replace(/^- (.*$)/gim, '<li style="margin-left: 1.5rem; margin-bottom: 0.5rem;">$1</li>')
    // Quebras de linha
    .replace(/\n\n/gim, '<br/><br/>');
    
  return { __html: html };
};

function ConteudoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const conteudoId = parseInt(id, 10);
  const item = conteudos.find(c => c.id === conteudoId);

  if (!item) {
    return (
      <div className="page-content container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2>Conteúdo não encontrado</h2>
        <p>O recurso que você está procurando não existe ou foi removido.</p>
        <button className="btn btn-primary" onClick={() => navigate('/repositorio')} style={{ marginTop: '1rem' }}>
          Voltar para o Repositório
        </button>
      </div>
    );
  }

  // Converter data para formato brasileiro legível
  const dataFormatada = new Date(item.data).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="page-content container">
      
      {/* Botão Voltar */}
      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-secondary"
          style={{ gap: '0.5rem', display: 'flex', alignItems: 'center' }}
        >
          <ArrowLeft size={18} /> Voltar
        </button>
      </div>

      <article className="glass-panel" style={{ padding: '3rem', maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header do Conteúdo */}
        <header style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
          <div className="tags-container" style={{ marginBottom: '1rem' }}>
            <span className="tag" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <BookOpen size={14} /> {item.tipo}
            </span>
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            {item.titulo}
          </h1>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={16} /> Autoria/Referência: <strong>{item.referencia}</strong>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={16} /> Publicado em: {dataFormatada}
            </span>
          </div>
        </header>

        {/* Resumo Curto */}
        <section aria-label="Descrição Breve" style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '1.1rem', fontStyle: 'italic', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
            {item.descricao}
          </p>
        </section>

        {/* Detalhes Extraídos (Longo) */}
        <section aria-label="Análise Detalhada do Recurso" style={{ marginBottom: '2.5rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
          {detalhesConteudo[item.id] ? (
            <div dangerouslySetInnerHTML={renderMarkup(detalhesConteudo[item.id])} />
          ) : (
            <p>Nenhuma análise aprofundada disponível ainda para este recurso.</p>
          )}
        </section>

        {/* Metadados de Classificação */}
        <section aria-label="Classificação e Público" style={{ marginBottom: '2.5rem', backgroundColor: 'var(--tertiary-bg)', padding: '1.5rem', borderRadius: '0.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Tag size={18} /> Classificação do Portal
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Nível de Ensino Indicado:</strong>
              <div className="tags-container" style={{ marginTop: 0 }}>
                {item.nivel.map(n => (
                  <span key={n} className="tag nivel">{n}</span>
                ))}
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Público-Alvo:</strong>
              <div className="tags-container" style={{ marginTop: 0 }}>
                {item.publico.map(p => (
                  <span key={p} className="tag publico">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Link Original Destacado */}
        <footer style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
          <p style={{ marginBottom: '1rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
            Este material é referenciado e de direitos autorais de seus respectivos autores. Para acessar o conteúdo original na íntegra, utilize o botão abaixo:
          </p>
          <a 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
            style={{ padding: '1rem 2rem', fontSize: '1.1rem', gap: '0.5rem', display: 'inline-flex' }}
            aria-label={`Acessar conteúdo original: ${item.titulo} (abre em nova aba)`}
          >
            Acessar Conteúdo Original <ExternalLink size={20} />
          </a>
        </footer>

      </article>
    </div>
  );
}

export default ConteudoDetalhe;
