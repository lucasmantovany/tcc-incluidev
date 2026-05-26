import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Check, X, Edit3, Trash2, ArrowLeft, LogOut, CheckSquare } from 'lucide-react';

function Moderacao() {
  const navigate = useNavigate();
  const [autenticado, setAutenticado] = useState(false);
  const [senha, setSenha] = useState('');
  const [erroLogin, setErroLogin] = useState('');
  
  const [feedbacks, setFeedbacks] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [editTitulo, setEditTitulo] = useState('');
  const [editMensagem, setEditMensagem] = useState('');
  const [mensagemStatus, setMensagemStatus] = useState('');

  // Carrega relatos do localStorage
  const carregarFeedbacks = () => {
    const dadosLocais = localStorage.getItem('tcc_feedbacks');
    if (dadosLocais) {
      setFeedbacks(JSON.parse(dadosLocais));
    }
  };

  useEffect(() => {
    carregarFeedbacks();
  }, []);

  const lidarComLogin = (e) => {
    e.preventDefault();
    if (senha === 'admin' || senha === 'tcc-ufms') {
      setAutenticado(true);
      setErroLogin('');
    } else {
      setErroLogin('Senha incorreta. (Para testes do TCC, utilize a senha "admin" ou "tcc-ufms").');
    }
  };

  // Funções de Moderação
  const aprovarDireto = (id) => {
    const atualizados = feedbacks.map(item => {
      if (item.id === id) {
        return { ...item, status: 'approved' };
      }
      return item;
    });
    salvarEAtualizar(atualizados, 'Relato aprovado e publicado com sucesso!');
  };

  const rejeitarRelato = (id) => {
    const atualizados = feedbacks.filter(item => item.id !== id);
    salvarEAtualizar(atualizados, 'Relato rejeitado e excluído com sucesso.');
  };

  const iniciarEdicaoParcial = (item) => {
    setEditandoId(item.id);
    setEditTitulo(item.titulo);
    setEditMensagem(item.mensagem);
    setMensagemStatus('');
  };

  const salvarEdicaoParcial = (id) => {
    if (!editTitulo.trim() || !editMensagem.trim()) {
      setMensagemStatus('Erro: O título e a mensagem não podem estar vazios.');
      return;
    }

    const atualizados = feedbacks.map(item => {
      if (item.id === id) {
        return {
          ...item,
          titulo: editTitulo,
          mensagem: editMensagem,
          status: 'approved', // Salva e já aprova/publica
          parcialmenteAprovado: true // Flag informativa opcional
        };
      }
      return item;
    });

    setEditandoId(null);
    salvarEAtualizar(atualizados, 'Relato editado e publicado com sucesso!');
  };

  const desaprovarRelato = (id) => {
    const atualizados = feedbacks.map(item => {
      if (item.id === id) {
        return { ...item, status: 'pending' };
      }
      return item;
    });
    salvarEAtualizar(atualizados, 'Relato despublicado e retornado para a fila de pendentes.');
  };

  const salvarEAtualizar = (novaLista, aviso) => {
    localStorage.setItem('tcc_feedbacks', JSON.stringify(novaLista));
    setFeedbacks(novaLista);
    setMensagemStatus(aviso);
    // Limpar mensagem de status após 4 segundos
    setTimeout(() => setMensagemStatus(''), 4000);
  };

  const pendentes = feedbacks.filter(item => item.status === 'pending');
  const aprovados = feedbacks.filter(item => item.status === 'approved');

  // Tela de Login Simulada
  if (!autenticado) {
    return (
      <div className="page-content container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <section className="glass-panel" style={{ maxWidth: '450px', width: '100%', padding: '2.5rem', textAlign: 'center' }} aria-label="Acesso Administrativo">
          <ShieldCheck size={50} color="var(--accent-color)" style={{ margin: '0 auto 1.5rem', display: 'block' }} />
          <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#fff' }}>Área de Moderação</h1>
          <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Acesso reservado ao moderador do portal para análise e publicação de relatos.
          </p>

          <form onSubmit={lidarComLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {erroLogin && (
              <div style={{ color: '#ef4444', fontSize: '0.9rem', padding: '0.5rem', borderRadius: '0.25rem', backgroundColor: 'rgba(239, 68, 68, 0.1)' }} role="alert">
                {erroLogin}
              </div>
            )}
            
            <div style={{ textAlign: 'left' }}>
              <label htmlFor="senha-admin" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Senha de Acesso:
              </label>
              <input 
                type="password" 
                id="senha-admin" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite a senha (admin ou tcc-ufms)"
                required
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--secondary-bg)', color: '#fff' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Entrar como Moderador
            </button>
          </form>
          
          <button 
            onClick={() => navigate('/experiencias')} 
            className="btn btn-secondary" 
            style={{ width: '100%', marginTop: '1rem', gap: '0.5rem', display: 'flex', justifyContent: 'center' }}
          >
            <ArrowLeft size={16} /> Voltar para Experiências
          </button>
        </section>
      </div>
    );
  }

  // Dashboard de Moderação (Autenticado)
  return (
    <div className="page-content container">
      
      {/* Cabeçalho */}
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShieldCheck color="#10b981" size={32} /> Painel de Moderação
          </h1>
          <p style={{ margin: 0, marginTop: '0.5rem', fontSize: '1.1rem' }}>
            Aprove, rejeite ou edite relatos de experiências enviados pela comunidade.
          </p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/experiencias')} className="btn btn-secondary" style={{ gap: '0.5rem' }}>
            <ArrowLeft size={18} /> Ver no Portal
          </button>
          <button onClick={() => setAutenticado(false)} className="btn btn-secondary" style={{ gap: '0.5rem', border: '1px solid #ef4444', color: '#ef4444' }}>
            <LogOut size={18} /> Sair
          </button>
        </div>
      </div>

      {/* Alerta de Status */}
      {mensagemStatus && (
        <div 
          className="glass-panel" 
          style={{ 
            padding: '1rem 1.5rem', 
            marginBottom: '1.5rem', 
            backgroundColor: mensagemStatus.startsWith('Erro') ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
            border: mensagemStatus.startsWith('Erro') ? '1px solid #ef4444' : '1px solid #10b981',
            borderRadius: '0.5rem'
          }}
          role="alert"
        >
          <p style={{ margin: 0, color: '#fff', fontWeight: '500' }}>{mensagemStatus}</p>
        </div>
      )}

      {/* Grid de Relatos */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }} className="grid-responsive">
        
        {/* Coluna 1: Relatos Pendentes */}
        <section aria-label="Relatos Aguardando Moderação">
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Fila de Espera ({pendentes.length})
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {pendentes.length > 0 ? (
              pendentes.map(item => (
                <div key={item.id} className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid #fbbf24' }}>
                  
                  {editandoId === item.id ? (
                    /* FORMULÁRIO DE EDIÇÃO (APROVADO PARCIALMENTE) */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', margin: 0 }}>Edição de Relato (Aprovação Parcial)</h3>
                      <div>
                        <label htmlFor={`edit-title-${item.id}`} style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Título:</label>
                        <input 
                          type="text" 
                          id={`edit-title-${item.id}`}
                          value={editTitulo} 
                          onChange={(e) => setEditTitulo(e.target.value)}
                          style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--primary-bg)', color: '#fff' }}
                        />
                      </div>
                      <div>
                        <label htmlFor={`edit-msg-${item.id}`} style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Descrição:</label>
                        <textarea 
                          id={`edit-msg-${item.id}`}
                          rows="4" 
                          value={editMensagem} 
                          onChange={(e) => setEditMensagem(e.target.value)}
                          style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--primary-bg)', color: '#fff', resize: 'vertical' }}
                        ></textarea>
                      </div>
                      <div className="flex gap-4">
                        <button onClick={() => salvarEdicaoParcial(item.id)} className="btn btn-primary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.9rem', gap: '0.25rem' }}>
                          <Check size={16} /> Salvar e Publicar
                        </button>
                        <button onClick={() => setEditandoId(null)} className="btn btn-secondary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.9rem' }}>
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* EXIBIÇÃO DE RELATO PENDENTE */
                    <>
                      <div className="flex justify-between items-start" style={{ marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: '600' }}>PENDENTE DE APROVAÇÃO</span>
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{new Date(item.data).toLocaleDateString()}</span>
                      </div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff' }}>{item.titulo}</h3>
                      <p style={{ fontSize: '0.95rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>"{item.mensagem}"</p>
                      
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
                        Enviado por: <strong>{item.nome}</strong> ({item.perfil}) | Nível: {item.nivel}
                      </div>

                      {/* Botões de Ação */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                        <button 
                          onClick={() => aprovarDireto(item.id)} 
                          className="btn btn-primary" 
                          style={{ padding: '0.5rem', fontSize: '0.85rem', gap: '0.25rem', backgroundColor: '#10b981' }}
                          aria-label="Aprovar e publicar relato sem alterações"
                        >
                          <Check size={14} /> Aprovar
                        </button>
                        <button 
                          onClick={() => iniciarEdicaoParcial(item)} 
                          className="btn btn-secondary" 
                          style={{ padding: '0.5rem', fontSize: '0.85rem', gap: '0.25rem' }}
                          aria-label="Aprovar parcialmente permitindo edição de conteúdo"
                        >
                          <Edit3 size={14} /> Editar
                        </button>
                        <button 
                          onClick={() => rejeitarRelato(item.id)} 
                          className="btn btn-secondary" 
                          style={{ padding: '0.5rem', fontSize: '0.85rem', gap: '0.25rem', border: '1px solid #ef4444', color: '#ef4444' }}
                          aria-label="Rejeitar e excluir relato"
                        >
                          <X size={14} /> Rejeitar
                        </button>
                      </div>
                    </>
                  )}

                </div>
              ))
            ) : (
              <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                <CheckSquare size={32} color="#64748b" style={{ margin: '0 auto 1rem', display: 'block' }} />
                <p>Nenhum relato na fila de pendentes.</p>
              </div>
            )}
          </div>
        </section>

        {/* Coluna 2: Relatos Aprovados */}
        <section aria-label="Relatos Publicados no Site">
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Publicados no Site ({aprovados.length})
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {aprovados.map(item => (
              <div key={item.id} className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid #10b981' }}>
                <div className="flex justify-between items-start" style={{ marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: '600' }}>
                    ATIVO {item.parcialmenteAprovado && '• EDITADO'}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{new Date(item.data).toLocaleDateString()}</span>
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: '#fff' }}>{item.titulo}</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '1rem', fontStyle: 'italic' }}>"{item.mensagem}"</p>
                
                <div className="flex justify-between items-center" style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  <span>Por: {item.nome} ({item.perfil})</span>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => desaprovarRelato(item.id)} 
                      className="btn btn-secondary" 
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', gap: '0.25rem' }}
                      aria-label="Despublicar relato e mandar de volta para fila"
                    >
                      Despublicar
                    </button>
                    <button 
                      onClick={() => rejeitarRelato(item.id)} 
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      aria-label="Excluir relato permanentemente"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

export default Moderacao;
