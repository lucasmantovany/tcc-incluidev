import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';

function Avaliacao() {
  const navigate = useNavigate();
  const [enviado, setEnviado] = useState(false);
  const [scoreSUS, setScoreSUS] = useState(null);
  
  // Informações Gerais
  const [perfil, setPerfil] = useState('');
  const [usaLeitor, setUsaLeitor] = useState('');
  const [sugestoes, setSugestoes] = useState('');
  const [comentariosAcessibilidade, setComentariosAcessibilidade] = useState('');

  // Estados do SUS (1 a 10) - Inicializados vazios
  const [sus, setSus] = useState({
    q1: '', q2: '', q3: '', q4: '', q5: '',
    q6: '', q7: '', q8: '', q9: '', q10: ''
  });

  // Estados do TAM (1 a 6) - Inicializados vazios
  const [tam, setTam] = useState({
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: ''
  });

  const [erro, setErro] = useState('');
  const topoRef = useRef(null);

  const perguntasSUS = [
    { id: 'q1', texto: "1. Eu acho que gostaria de usar este portal frequentemente." },
    { id: 'q2', texto: "2. Eu achei o portal desnecessariamente complexo." },
    { id: 'q3', texto: "3. Eu achei o portal fácil de usar." },
    { id: 'q4', texto: "4. Eu acho que precisaria de suporte de uma pessoa técnica para conseguir usar este portal." },
    { id: 'q5', texto: "5. Eu achei que as várias funções deste portal estavam bem integradas." },
    { id: 'q6', texto: "6. Eu achei que havia muita inconsistência neste portal." },
    { id: 'q7', texto: "7. Eu imagino que a maioria das pessoas aprenderia a usar este portal muito rapidamente." },
    { id: 'q8', texto: "8. Eu achei o portal muito pesado ou complicado de usar." },
    { id: 'q9', texto: "9. Eu me senti muito confiante usando o portal." },
    { id: 'q10', texto: "10. Eu precisei aprender muitas coisas novas antes de conseguir usar o portal." }
  ];

  const perguntasTAM = [
    { id: 'q1', tipo: 'PU', texto: "1. O portal facilita encontrar ferramentas e metodologias acessíveis de programação." },
    { id: 'q2', tipo: 'PU', texto: "2. O portal me ajuda a ser mais eficiente em minhas atividades de estudo/ensino/desenvolvimento." },
    { id: 'q3', tipo: 'PU', texto: "3. Eu considero o portal uma ferramenta útil para a inclusão na computação." },
    { id: 'q4', tipo: 'PEOU', texto: "4. Eu achei fácil navegar pelas páginas e usar o Assistente Guia." },
    { id: 'q5', tipo: 'PEOU', texto: "5. Minha interação com o portal é clara, legível e compreensível." },
    { id: 'q6', tipo: 'PEOU', texto: "6. É fácil fazer com que o portal exiba as informações que eu preciso." }
  ];

  const lidarComSUS = (questao, valor) => {
    setSus(prev => ({ ...prev, [questao]: parseInt(valor) }));
  };

  const lidarComTAM = (questao, valor) => {
    setTam(prev => ({ ...prev, [questao]: parseInt(valor) }));
  };

  const calcularSUS = () => {
    // Cálculo do score SUS (escala 0-100)
    // Ímpares: valor - 1
    // Pares: 5 - valor
    let soma = 0;
    
    soma += (sus.q1 - 1) + (5 - sus.q2);
    soma += (sus.q3 - 1) + (5 - sus.q4);
    soma += (sus.q5 - 1) + (5 - sus.q6);
    soma += (sus.q7 - 1) + (5 - sus.q8);
    soma += (sus.q9 - 1) + (5 - sus.q10);

    return soma * 2.5;
  };

  const obterTextoFeedbackSUS = (score) => {
    if (score >= 85) return 'Excelente (Usabilidade de nível internacional, acima do índice Aceitável A+)';
    if (score >= 70) return 'Boa (O portal é intuitivo e atende bem às necessidades de usabilidade)';
    if (score >= 50) return 'Regular (Funcional, mas possui pontos claros de atrito ou confusão)';
    return 'Insuficiente (Necessita de ajustes estruturais e correções urgentes de UX)';
  };

  const submeter = (e) => {
    e.preventDefault();
    setErro('');

    // Validar se tudo foi preenchido
    if (!perfil || !usaLeitor) {
      setErro('Por favor, preencha os dados do seu perfil.');
      if (topoRef.current) topoRef.current.focus();
      return;
    }

    const susIncompletas = Object.values(sus).some(v => v === '');
    const tamIncompletas = Object.values(tam).some(v => v === '');

    if (susIncompletas || tamIncompletas) {
      setErro('Por favor, responda a todas as perguntas das escalas SUS e TAM.');
      if (topoRef.current) topoRef.current.focus();
      return;
    }

    // Calcular
    const susFinal = calcularSUS();
    setScoreSUS(susFinal);
    setEnviado(true);

    // Salvar localmente para simular banco de dados
    const avaliacoesSalvas = JSON.parse(localStorage.getItem('tcc_avaliacoes') || '[]');
    avaliacoesSalvas.push({
      perfil,
      usaLeitor,
      sus,
      tam,
      susFinal,
      sugestoes,
      comentariosAcessibilidade,
      data: new Date().toISOString()
    });
    localStorage.setItem('tcc_avaliacoes', JSON.stringify(avaliacoesSalvas));

    if (topoRef.current) topoRef.current.focus();
  };

  return (
    <div className="page-content container">
      <h1 ref={topoRef} tabIndex="-1" style={{ outline: 'none', marginBottom: '1rem' }}>
        Avaliação de Usabilidade e Aceitação
      </h1>
      <p style={{ marginBottom: '2.5rem', fontSize: '1.1rem' }}>
        Ajude-nos a validar cientificamente o portal IncluiDev usando as escalas acadêmicas **SUS (System Usability Scale)** e **TAM (Technology Acceptance Model)**.
      </p>

      {erro && (
        <div style={{
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          border: '2px solid #ef4444',
          borderRadius: '0.5rem',
          padding: '1rem',
          marginBottom: '2rem',
          color: '#fca5a5',
          fontWeight: '600'
        }} role="alert">
          {erro}
        </div>
      )}

      {!enviado ? (
        <form onSubmit={submeter} className="flex flex-col gap-8">
          
          {/* Seção 1: Perfil do Respondente */}
          <section className="glass-panel" aria-labelledby="perfil-titulo">
            <h2 id="perfil-titulo" style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
              1. Identificação de Perfil
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <label htmlFor="perfil-select">Qual é o seu perfil predominante?</label>
                <select 
                  id="perfil-select" 
                  className="filter-select" 
                  style={{ width: '100%', marginTop: '0.5rem' }}
                  value={perfil}
                  onChange={(e) => setPerfil(e.target.value)}
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Estudante">Estudante</option>
                  <option value="Professor">Professor / Educador</option>
                  <option value="Pesquisador">Pesquisador</option>
                  <option value="Desenvolvedor">Desenvolvedor</option>
                  <option value="Outro">Outro público interessado</option>
                </select>
              </div>

              <div>
                <label htmlFor="leitor-select">Você faz uso de leitores de tela para navegar?</label>
                <select 
                  id="leitor-select" 
                  className="filter-select" 
                  style={{ width: '100%', marginTop: '0.5rem' }}
                  value={usaLeitor}
                  onChange={(e) => setUsaLeitor(e.target.value)}
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Sim">Sim, constantemente</option>
                  <option value="As vezes">Às vezes / Parcialmente</option>
                  <option value="Nao">Não utilizo</option>
                </select>
              </div>
            </div>
          </section>

          {/* Seção 2: SUS */}
          <section className="glass-panel" aria-labelledby="sus-titulo">
            <h2 id="sus-titulo" style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', margin: 0 }}>
              2. Escala SUS (System Usability Scale)
            </h2>
            <p style={{ margin: '0.5rem 0 2rem 0', fontSize: '0.95rem' }}>
              Classifique as afirmações abaixo de 1 (Discordo Totalmente) a 5 (Concordo Totalmente).
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {perguntasSUS.map((p) => (
                <div key={p.id} style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <span style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '500', color: 'var(--text-primary)' }}>{p.texto}</span>
                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    {[1, 2, 3, 4, 5].map((val) => (
                      <label key={val} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', margin: 0 }}>
                        <input 
                          type="radio" 
                          name={`sus_${p.id}`} 
                          value={val}
                          checked={sus[p.id] === val}
                          onChange={(e) => lidarComSUS(p.id, e.target.value)}
                        />
                        <span>{val} {val === 1 && '(Discordo)'} {val === 5 && '(Concordo)'}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Seção 3: TAM */}
          <section className="glass-panel" aria-labelledby="tam-titulo">
            <h2 id="tam-titulo" style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', margin: 0 }}>
              3. Escala TAM (Modelo de Aceitação de Tecnologia)
            </h2>
            <p style={{ margin: '0.5rem 0 2rem 0', fontSize: '0.95rem' }}>
              Classifique as afirmações abaixo de 1 (Discordo Totalmente) a 5 (Concordo Totalmente).
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {perguntasTAM.map((p) => (
                <div key={p.id} style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <span style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                    {p.texto} <strong style={{ fontSize: '0.8rem', color: 'var(--accent-color)' }}>({p.tipo === 'PU' ? 'Utilidade Percebida' : 'Facilidade Percebida'})</strong>
                  </span>
                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    {[1, 2, 3, 4, 5].map((val) => (
                      <label key={val} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', margin: 0 }}>
                        <input 
                          type="radio" 
                          name={`tam_${p.id}`} 
                          value={val}
                          checked={tam[p.id] === val}
                          onChange={(e) => lidarComTAM(p.id, e.target.value)}
                        />
                        <span>{val} {val === 1 && '(Discordo)'} {val === 5 && '(Concordo)'}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Seção 4: Comentários Abertos */}
          <section className="glass-panel" aria-labelledby="comentarios-titulo">
            <h2 id="comentarios-titulo" style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
              4. Comentários Qualitativos (Opcional)
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label htmlFor="sugestoes-text">O que você mudaria ou acrescentaria para melhorar a usabilidade geral do portal?</label>
                <textarea 
                  id="sugestoes-text" 
                  rows="3" 
                  style={{ marginTop: '0.5rem' }} 
                  placeholder="Sugestões de design, layout, filtros ou novas funcionalidades..."
                  value={sugestoes}
                  onChange={(e) => setSugestoes(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="acessibilidade-text">Observações específicas sobre a acessibilidade para leitores de tela ou teclado:</label>
                <textarea 
                  id="acessibilidade-text" 
                  rows="3" 
                  style={{ marginTop: '0.5rem' }} 
                  placeholder="Descreva se encontrou barreiras ao navegar por teclado ou ouvindo o leitor de tela..."
                  value={comentariosAcessibilidade}
                  onChange={(e) => setComentariosAcessibilidade(e.target.value)}
                />
              </div>
            </div>
          </section>

          <div style={{ textAlign: 'center', margin: '1.5rem 0 3rem 0' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '1rem 3rem', gap: '0.5rem', fontSize: '1.1rem' }}>
              Finalizar e Enviar Avaliação <ClipboardCheck size={22} />
            </button>
          </div>

        </form>
      ) : (
        <section className="glass-panel" style={{ textAlign: 'center', padding: '3.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CheckCircle size={64} color="#34d399" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '0.5rem' }}>Muito obrigado pela contribuição!</h2>
          <p style={{ maxWidth: '600px', marginBottom: '2rem' }}>
            Sua resposta foi registrada com sucesso e ajudará a compor os dados estatísticos de validação do TCC.
          </p>

          <div style={{ 
            backgroundColor: 'rgba(59, 130, 246, 0.1)', 
            border: '1px solid var(--accent-color)', 
            borderRadius: '1rem', 
            padding: '2rem', 
            maxWidth: '500px', 
            width: '100%', 
            marginBottom: '2.5rem' 
          }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Pontuação SUS Calculada
            </h3>
            <span style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--accent-color)', display: 'block', lineHeight: 1 }}>
              {scoreSUS} <span style={{ fontSize: '1.2rem', fontWeight: '500', color: 'var(--text-secondary)' }}>/ 100</span>
            </span>
            <span style={{ display: 'block', marginTop: '1rem', fontSize: '0.95rem', fontWeight: '600', color: '#fff' }}>
              Grau de Usabilidade: {obterTextoFeedbackSUS(scoreSUS)}
            </span>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: '1.4' }}>
              Notas acima de 68.0 são consideradas acima da média na escala de utilidade e usabilidade clássica da indústria.
            </p>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setEnviado(false)} className="btn btn-secondary" style={{ gap: '0.5rem' }}>
              Avaliar Novamente
            </button>
            <button onClick={() => navigate('/')} className="btn btn-primary" style={{ gap: '0.5rem' }}>
              Voltar ao Início <ArrowRight size={18} />
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default Avaliacao;
