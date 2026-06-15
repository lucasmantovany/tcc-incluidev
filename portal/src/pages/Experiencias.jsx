import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Send, ShieldAlert, Award, User, GraduationCap, CheckCircle } from 'lucide-react';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

// Experiências de exemplo de fallback
const EXPERIENCIAS_MOCK = [
  {
    id: 'mock-1',
    nome: 'Prof. Ricardo Mendes (UFG)',
    perfil: 'Professor',
    nivel: 'Superior',
    titulo: 'Uso da Linguagem Quorum no Ensino Superior',
    mensagem: 'Implementamos a linguagem Quorum no laboratório com estudantes cegos e a experiência foi fantástica. A eliminação de chaves e ponto-e-vírgula e o retorno por voz ajudou na assimilação de lógica muito mais rápido do que com linguagens como Java.',
    data: '2026-05-10T14:30:00.000Z',
    status: 'approved'
  }
];

function Experiencias() {
  const [experiencias, setExperiencias] = useState([]);
  const [nome, setNome] = useState('');
  const [perfil, setPerfil] = useState('Aluno');
  const [nivel, setNivel] = useState('Básico');
  const [titulo, setTitulo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  
  const formRef = useRef(null);
  const alertRef = useRef(null);

  // Carregar relatos aprovados do Firestore
  const carregarFeedbacks = async () => {
    setLoading(true);
    try {
      const feedbacksRef = collection(db, 'feedbacks');
      // Buscar apenas os aprovados
      const q = query(feedbacksRef, where("status", "==", "approved"));
      const querySnapshot = await getDocs(q);
      
      const lista = [];
      querySnapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });

      // Ordenar localmente por data (mais recentes primeiro)
      lista.sort((a, b) => new Date(b.data) - new Date(a.data));
      
      setExperiencias(lista.length > 0 ? lista : EXPERIENCIAS_MOCK);
    } catch (err) {
      console.error("Erro ao carregar do Firebase, usando mock:", err);
      // Fallback para não quebrar a tela caso não tenha configurado permissões corretamente
      setExperiencias(EXPERIENCIAS_MOCK);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarFeedbacks();
  }, [sucesso]); 

  const enviarFeedback = async (e) => {
    e.preventDefault();
    setErro('');
    
    if (!nome.trim() || !titulo.trim() || !mensagem.trim()) {
      setErro('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setEnviando(true);

    const novoRelato = {
      nome,
      perfil,
      nivel,
      titulo,
      mensagem,
      data: new Date().toISOString(),
      status: 'pending' // Aguarda moderação
    };

    try {
      const feedbacksRef = collection(db, 'feedbacks');
      await addDoc(feedbacksRef, novoRelato);
      
      // Limpar formulário e disparar sucesso
      setNome('');
      setTitulo('');
      setMensagem('');
      setSucesso(true);

      // Focar na mensagem de sucesso
      setTimeout(() => {
        if (alertRef.current) alertRef.current.focus();
      }, 100);

    } catch (err) {
      console.error("Erro ao salvar relato:", err);
      setErro('Ocorreu um erro ao conectar com o servidor. Tente novamente mais tarde.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="page-content container">
      
      {/* Título Principal */}
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 tabIndex="-1" style={{ margin: 0 }}>Experiências e Relatos</h1>
          <p style={{ margin: 0, marginTop: '0.5rem', fontSize: '1.1rem' }}>
            Compartilhe e conheça relatos reais sobre o ensino e uso prático de programação acessível.
          </p>
        </div>
        <Link to="/moderacao" className="btn btn-secondary" style={{ gap: '0.5rem', display: 'flex', alignItems: 'center' }}>
          <ShieldAlert size={18} /> Painel Administrativo
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }} className="grid-responsive">
        
        {/* Lado Esquerdo: Lista de Experiências Aprovadas */}
        <section aria-label="Relatos Compartilhados pela Comunidade">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)' }}>
            <Award size={24} color="var(--accent-color)" /> Depoimentos da Comunidade
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {loading ? (
              <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                <p>Carregando relatos da comunidade...</p>
              </div>
            ) : experiencias.length > 0 ? (
              experiencias.map(exp => (
                <article key={exp.id} className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-color)' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{exp.titulo}</h3>
                  <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    "{exp.mensagem}"
                  </p>
                  <div className="flex justify-between items-center" style={{ fontSize: '0.85rem', color: '#94a3b8', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <User size={14} /> {exp.nome} ({exp.perfil})
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <GraduationCap size={14} /> Foco: {exp.nivel}
                    </span>
                  </div>
                </article>
              ))
            ) : (
              <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                <p>Nenhuma experiência compartilhada no momento. Seja o primeiro a relatar!</p>
              </div>
            )}
          </div>
        </section>

        {/* Lado Direito: Formulário de Envio */}
        <section aria-label="Compartilhar novo relato">
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)' }}>
              <MessageSquare size={24} color="#10b981" /> Compartilhe seu Relato
            </h2>
            <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Escreva como foi sua experiência, desafios superados ou metodologias que funcionaram. Seu relato será enviado para a moderação antes de ser publicado.
            </p>

            {sucesso ? (
              <div 
                ref={alertRef}
                tabIndex="-1"
                className="alert alert-success" 
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10b981',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  textAlign: 'center',
                  marginBottom: '1.5rem',
                  outline: 'none'
                }}
                role="alert"
              >
                <CheckCircle size={40} color="#10b981" style={{ margin: '0 auto 1rem', display: 'block' }} />
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Relato enviado com sucesso!</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                  Agradecemos a sua contribuição. Ela foi encaminhada ao painel administrativo e será exibida no portal assim que for aprovada pelo moderador.
                </p>
                <button 
                  onClick={() => setSucesso(false)} 
                  className="btn btn-primary"
                  style={{ fontSize: '0.9rem' }}
                >
                  Enviar Outro Relato
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={enviarFeedback} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                {erro && (
                  <div style={{ color: '#ef4444', padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444' }} role="alert">
                    {erro}
                  </div>
                )}

                <div>
                  <label htmlFor="nome" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Seu Nome ou Apelido <span style={{ color: '#ef4444' }} aria-hidden="true">*</span>:
                  </label>
                  <input 
                    type="text" 
                    id="nome" 
                    className="form-input" 
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    placeholder="Ex: Prof. João Silva"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label htmlFor="perfil" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                      Seu Perfil:
                    </label>
                    <select 
                      id="perfil" 
                      className="filter-select" 
                      value={perfil}
                      onChange={(e) => setPerfil(e.target.value)}
                      style={{ width: '100%' }}
                    >
                      <option value="Aluno">Aluno PcDV</option>
                      <option value="Professor">Professor / Educador</option>
                      <option value="Pesquisador">Pesquisador</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="nivel" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                      Foco do Ensino:
                    </label>
                    <select 
                      id="nivel" 
                      className="filter-select" 
                      value={nivel}
                      onChange={(e) => setNivel(e.target.value)}
                      style={{ width: '100%' }}
                    >
                      <option value="Básico">Ensino Básico</option>
                      <option value="Técnico">Ensino Técnico</option>
                      <option value="Superior">Ensino Superior</option>
                      <option value="Geral">Qualquer / Geral</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="titulo" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Título do seu Relato <span style={{ color: '#ef4444' }} aria-hidden="true">*</span>:
                  </label>
                  <input 
                    type="text" 
                    id="titulo" 
                    className="form-input" 
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                    placeholder="Ex: Desafios na aula de loops"
                  />
                </div>

                <div>
                  <label htmlFor="mensagem" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                    Sua Experiência <span style={{ color: '#ef4444' }} aria-hidden="true">*</span>:
                  </label>
                  <textarea 
                    id="mensagem" 
                    className="form-input" 
                    rows="5"
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    required
                    placeholder="Conte detalhes sobre o que funcionou, ferramentas usadas e dificuldades."
                    style={{ resize: 'vertical' }}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ width: '100%', gap: '0.5rem', display: 'flex', justifyContent: 'center' }}
                  disabled={enviando}
                >
                  {enviando ? 'Enviando...' : 'Enviar Relato'} {!enviando && <Send size={18} />}
                </button>
              </form>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

export default Experiencias;
