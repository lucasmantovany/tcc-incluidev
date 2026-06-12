import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

function Avaliacao() {
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState(1);
  const totalEtapas = 5;

  const [enviado, setEnviado] = useState(false);
  const [scoreSUS, setScoreSUS] = useState(null);
  const [erro, setErro] = useState('');
  const [anuncioAcessibilidade, setAnuncioAcessibilidade] = useState('');
  const [enviando, setEnviando] = useState(false); // Estado de loading
  
  const topoRef = useRef(null);

  // Coloque o seu link do Formspree aqui
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mojzpvww";
  
  // Seção 1: Caracterização do Participante
  const [perfil, setPerfil] = useState('');
  const [acessibilidadeDigital, setAcessibilidadeDigital] = useState('');
  const [faixaEtaria, setFaixaEtaria] = useState('');
  const [familiaridadeTecnologia, setFamiliaridadeTecnologia] = useState('');

  // Seção 2: Estados do SUS (1 a 10)
  const [sus, setSus] = useState({
    q1: '', q2: '', q3: '', q4: '', q5: '',
    q6: '', q7: '', q8: '', q9: '', q10: ''
  });

  // Seção 3: Estados do TAM (1 a 6)
  const [tam, setTam] = useState({
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: ''
  });

  // Seção 4: Avaliação do Assistente GUIA
  const [assistenteGuia, setAssistenteGuia] = useState({
    q1: '', q2: '', q3: ''
  });

  // Perguntas Abertas
  const [gostouPortal, setGostouPortal] = useState('');
  const [mudariaPortal, setMudariaPortal] = useState('');
  const [barreirasNavegacao, setBarreirasNavegacao] = useState('');

  // Finalização
  const [encontrouRecursos, setEncontrouRecursos] = useState('');
  const [leitorTelaUsado, setLeitorTelaUsado] = useState('');
  const [leitorTelaOutro, setLeitorTelaOutro] = useState('');
  const [formaNavegacao, setFormaNavegacao] = useState('');
  const [formaNavegacaoOutra, setFormaNavegacaoOutra] = useState('');

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
    { id: 'q4', tipo: 'PEOU', texto: "4. Eu achei fácil navegar pelas páginas e usar o sistema de busca." },
    { id: 'q5', tipo: 'PEOU', texto: "5. Minha interação com o portal é clara, legível e compreensível." },
    { id: 'q6', tipo: 'PEOU', texto: "6. É fácil fazer com que o portal exiba as informações que eu preciso." }
  ];

  const perguntasAssistente = [
    { id: 'q1', texto: "1. As recomendações apresentadas pela Busca Guiada foram relevantes para minhas necessidades." },
    { id: 'q2', texto: "2. As sugestões oferecidas pelo sistema corresponderam ao perfil selecionado." },
    { id: 'q3', texto: "3. Eu utilizaria novamente a Busca Guiada para buscar recursos semelhantes." }
  ];

  const lidarComSUS = (questao, valor) => setSus(prev => ({ ...prev, [questao]: parseInt(valor) }));
  const lidarComTAM = (questao, valor) => setTam(prev => ({ ...prev, [questao]: parseInt(valor) }));
  const lidarComAssistente = (questao, valor) => setAssistenteGuia(prev => ({ ...prev, [questao]: parseInt(valor) }));

  const calcularSUS = () => {
    let soma = 0;
    soma += (sus.q1 - 1) + (5 - sus.q2);
    soma += (sus.q3 - 1) + (5 - sus.q4);
    soma += (sus.q5 - 1) + (5 - sus.q6);
    soma += (sus.q7 - 1) + (5 - sus.q8);
    soma += (sus.q9 - 1) + (5 - sus.q10);
    return soma * 2.5;
  };

  const obterTextoFeedbackSUS = (score) => {
    if (score >= 85) return 'Excelente (Usabilidade de nível internacional)';
    if (score >= 70) return 'Boa (O portal atende bem às necessidades de usabilidade)';
    if (score >= 50) return 'Regular (Funcional, mas possui pontos de confusão)';
    return 'Insuficiente (Necessita de correções urgentes de usabilidade)';
  };

  // Anunciar mudanças de etapa para leitores de tela
  useEffect(() => {
    let msg = `Etapa ${etapa} de ${totalEtapas}: `;
    if (etapa === 1) msg += 'Caracterização do Participante';
    if (etapa === 2) msg += 'Usabilidade (SUS)';
    if (etapa === 3) msg += 'Aceitação da Tecnologia (TAM)';
    if (etapa === 4) msg += 'Avaliação da Busca Guiada e Perguntas Abertas';
    if (etapa === 5) msg += 'Finalização';

    setAnuncioAcessibilidade(msg);
    setErro('');
    if (topoRef.current) {
      topoRef.current.focus();
    }
  }, [etapa]);

  const avancarEtapa = () => {
    // Validação por etapa
    if (etapa === 1) {
      if (!perfil || !acessibilidadeDigital || !faixaEtaria || !familiaridadeTecnologia) {
        setErro('Por favor, responda todas as perguntas desta seção antes de avançar.');
        return;
      }
    } else if (etapa === 2) {
      if (Object.values(sus).some(v => v === '')) {
        setErro('Por favor, classifique todas as afirmações da escala SUS antes de avançar.');
        return;
      }
    } else if (etapa === 3) {
      if (Object.values(tam).some(v => v === '')) {
        setErro('Por favor, classifique todas as afirmações da escala TAM antes de avançar.');
        return;
      }
    } else if (etapa === 4) {
      if (Object.values(assistenteGuia).some(v => v === '')) {
        setErro('Por favor, classifique todas as afirmações sobre a Busca Guiada antes de avançar.');
        return;
      }
    }
    
    setErro('');
    setEtapa(prev => prev + 1);
  };

  const voltarEtapa = () => {
    setErro('');
    setEtapa(prev => Math.max(1, prev - 1));
  };

  const submeter = async (e) => {
    e.preventDefault();
    setErro('');

    if (etapa === 5) {
      if (!encontrouRecursos || !leitorTelaUsado || !formaNavegacao) {
        setErro('Por favor, responda todas as perguntas de finalização antes de enviar.');
        if (topoRef.current) topoRef.current.focus();
        return;
      }

      const susFinal = calcularSUS();
      setScoreSUS(susFinal);
      setEnviando(true);
      setAnuncioAcessibilidade('Enviando avaliação, aguarde...');

      const avaliacaoData = {
        secao1: { perfil, acessibilidadeDigital, faixaEtaria, familiaridadeTecnologia },
        secao2_SUS: sus,
        secao3_TAM: tam,
        secao4_Assistente: assistenteGuia,
        perguntasAbertas: { gostouPortal, mudariaPortal, barreirasNavegacao },
        finalizacao: { 
          encontrouRecursos, 
          leitorTelaUsado: leitorTelaUsado === 'Outro' ? leitorTelaOutro : leitorTelaUsado,
          formaNavegacao: formaNavegacao === 'Outra' ? formaNavegacaoOutra : formaNavegacao
        },
        susScore: susFinal,
        dataEnvio: new Date().toISOString()
      };

      // Formatação amigável para leitura no E-mail
      const emailPayload = {
        _subject: `Nova Avaliação IncluiDev - Score SUS: ${susFinal}`,
        Perfil: avaliacaoData.secao1.perfil,
        FaixaEtaria: avaliacaoData.secao1.faixaEtaria,
        Acessibilidade: avaliacaoData.secao1.acessibilidadeDigital,
        Familiaridade: avaliacaoData.secao1.familiaridadeTecnologia,
        Score_SUS_Final: susFinal,
        Encontrou_Recursos: avaliacaoData.finalizacao.encontrouRecursos,
        Leitor_De_Tela: avaliacaoData.finalizacao.leitorTelaUsado,
        Navegacao: avaliacaoData.finalizacao.formaNavegacao,
        O_que_gostou: avaliacaoData.perguntasAbertas.gostouPortal || "Não respondeu",
        O_que_mudaria: avaliacaoData.perguntasAbertas.mudariaPortal || "Não respondeu",
        Barreiras_Acessibilidade: avaliacaoData.perguntasAbertas.barreirasNavegacao || "Não respondeu",
        Dados_Completos_JSON: JSON.stringify(avaliacaoData)
      };

      try {
        if (FORMSPREE_ENDPOINT.includes("SEU_ID_AQUI")) {
          // Se ainda não configurou o endpoint, salva só local para não quebrar a aplicação
          console.warn("Endpoint do Formspree não configurado. Salvando apenas localmente.");
        } else {
          const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(emailPayload)
          });

          if (!response.ok) {
            throw new Error('Falha ao comunicar com o servidor de email.');
          }
        }

        // Salvar localmente como backup
        const avaliacoesSalvas = JSON.parse(localStorage.getItem('tcc_avaliacoes') || '[]');
        avaliacoesSalvas.push(avaliacaoData);
        localStorage.setItem('tcc_avaliacoes', JSON.stringify(avaliacoesSalvas));

        setEnviado(true);
        setAnuncioAcessibilidade('Avaliação enviada com sucesso!');
        if (topoRef.current) topoRef.current.focus();

      } catch (error) {
        setErro('Ocorreu um erro ao enviar sua avaliação (Verifique sua conexão com a internet). Seus dados não foram perdidos. Tente submeter novamente.');
        setAnuncioAcessibilidade('Erro ao enviar avaliação.');
        if (topoRef.current) topoRef.current.focus();
      } finally {
        setEnviando(false);
      }
    }
  };

  const renderRadioGroup = (name, value, onChange, options) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
      {options.map(opt => (
        <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', margin: 0 }}>
          <input 
            type="radio" 
            name={name} 
            value={opt}
            checked={value === opt}
            onChange={(e) => onChange(e.target.value)}
          />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className="page-content container">
      <div className="sr-only" aria-live="assertive" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden' }}>
        {anuncioAcessibilidade}
      </div>

      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <h1 ref={topoRef} tabIndex="-1" style={{ outline: 'none', margin: 0 }}>
          {!enviado ? `Formulário de Avaliação — Etapa ${etapa} de ${totalEtapas}` : 'Avaliação Concluída'}
        </h1>
      </div>

      {!enviado && (
        <>
          <p style={{ marginBottom: '2.5rem', fontSize: '1.1rem' }}>
            Ajude-nos a validar o portal respondendo a este questionário focado em usabilidade, aceitação e na eficácia da Busca Guiada.
          </p>

          <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem' }} aria-hidden="true">
            {Array.from({ length: totalEtapas }).map((_, i) => (
              <div key={i} style={{ flex: 1, height: '6px', borderRadius: '3px', backgroundColor: etapa >= i + 1 ? 'var(--accent-color)' : 'var(--tertiary-bg)' }}></div>
            ))}
          </div>

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

          <form onSubmit={submeter} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* ETAPA 1: Caracterização */}
            {etapa === 1 && (
              <section className="glass-panel" aria-labelledby="perfil-titulo">
                <h2 id="perfil-titulo" style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
                  Seção 1 – Caracterização do Participante
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>1. Qual é o seu perfil de acesso?</strong>
                    {renderRadioGroup('perfil', perfil, setPerfil, [
                      'Estudante', 
                      'Professor / Educador', 
                      'Pesquisador', 
                      'Desenvolvedor de Tecnologia Assistiva'
                    ])}
                  </div>

                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>2. Você utiliza algum recurso de acessibilidade digital?</strong>
                    {renderRadioGroup('acessibilidadeDigital', acessibilidadeDigital, setAcessibilidadeDigital, [
                      'Não utilizo',
                      'Leitor de tela',
                      'Ampliação de tela',
                      'Navegação predominantemente por teclado',
                      'Comandos de voz'
                    ])}
                  </div>

                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>3. Qual é a sua faixa etária?</strong>
                    {renderRadioGroup('faixaEtaria', faixaEtaria, setFaixaEtaria, [
                      'Menos de 18 anos',
                      '18 a 24 anos',
                      '25 a 34 anos',
                      '35 a 44 anos',
                      '45 a 54 anos',
                      '55 a 64 anos',
                      '65 anos ou mais'
                    ])}
                  </div>

                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>4. Como você avalia sua familiaridade com tecnologias digitais relacionadas à programação?</strong>
                    {renderRadioGroup('familiaridadeTecnologia', familiaridadeTecnologia, setFamiliaridadeTecnologia, [
                      'Muito baixa',
                      'Baixa',
                      'Moderada',
                      'Alta',
                      'Muito alta'
                    ])}
                  </div>
                </div>
              </section>
            )}

            {/* ETAPA 2: SUS */}
            {etapa === 2 && (
              <section className="glass-panel" aria-labelledby="sus-titulo">
                <h2 id="sus-titulo" style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', margin: 0 }}>
                  Seção 2 – Usabilidade (System Usability Scale - SUS)
                </h2>
                <p style={{ margin: '0.5rem 0 2rem 0', fontSize: '0.95rem' }}>
                  Classifique as afirmações de 1 (Discordo totalmente) a 5 (Concordo totalmente).
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
            )}

            {/* ETAPA 3: TAM */}
            {etapa === 3 && (
              <section className="glass-panel" aria-labelledby="tam-titulo">
                <h2 id="tam-titulo" style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', margin: 0 }}>
                  Seção 3 – Aceitação da Tecnologia (TAM)
                </h2>
                <p style={{ margin: '0.5rem 0 2rem 0', fontSize: '0.95rem' }}>
                  Classifique as afirmações de 1 (Discordo totalmente) a 5 (Concordo totalmente).
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {perguntasTAM.map((p) => (
                    <div key={p.id} style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <span style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                        {p.texto}
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
            )}

            {/* ETAPA 4: Busca Guiada e Perguntas Abertas */}
            {etapa === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <section className="glass-panel" aria-labelledby="assist-titulo">
                  <h2 id="assist-titulo" style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', margin: 0 }}>
                    Seção 4.1 - Avaliação da Busca Guiada
                  </h2>
                  <p style={{ margin: '0.5rem 0 2rem 0', fontSize: '0.95rem' }}>
                    Classifique as recomendações obtidas de 1 (Discordo totalmente) a 5 (Concordo totalmente):
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {perguntasAssistente.map((p) => (
                      <div key={p.id} style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <span style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                          {p.texto}
                        </span>
                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                          {[1, 2, 3, 4, 5].map((val) => (
                            <label key={val} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', margin: 0 }}>
                              <input 
                                type="radio" 
                                name={`assist_${p.id}`} 
                                value={val}
                                checked={assistenteGuia[p.id] === val}
                                onChange={(e) => lidarComAssistente(p.id, e.target.value)}
                              />
                              <span>{val} {val === 1 && '(Discordo)'} {val === 5 && '(Concordo)'}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="glass-panel" aria-labelledby="abertas-titulo">
                  <h2 id="abertas-titulo" style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
                    Seção 4.2 - Perguntas Abertas (Opcional)
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <label htmlFor="q-gostou" style={{ color: 'var(--text-primary)' }}>1. O que você mais gostou no portal?</label>
                      <textarea 
                        id="q-gostou" rows="3" style={{ marginTop: '0.5rem' }} 
                        className="form-input"
                        value={gostouPortal} onChange={(e) => setGostouPortal(e.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor="q-mudaria" style={{ color: 'var(--text-primary)' }}>2. O que você mudaria ou acrescentaria para melhorar sua experiência?</label>
                      <textarea 
                        id="q-mudaria" rows="3" style={{ marginTop: '0.5rem' }} 
                        className="form-input"
                        value={mudariaPortal} onChange={(e) => setMudariaPortal(e.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor="q-barreiras" style={{ color: 'var(--text-primary)' }}>3. Caso tenha utilizado recursos de acessibilidade (como leitor de tela ou teclado), descreva se encontrou barreiras.</label>
                      <textarea 
                        id="q-barreiras" rows="3" style={{ marginTop: '0.5rem' }} 
                        className="form-input"
                        value={barreirasNavegacao} onChange={(e) => setBarreirasNavegacao(e.target.value)}
                      />
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* ETAPA 5: Finalização */}
            {etapa === 5 && (
              <section className="glass-panel" aria-labelledby="finalizacao-titulo">
                <h2 id="finalizacao-titulo" style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
                  Seção 5 - Finalização
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Você conseguiu encontrar os recursos que procurava utilizando o portal?</strong>
                    {renderRadioGroup('encontrouRecursos', encontrouRecursos, setEncontrouRecursos, [
                      'Sim, completamente', 
                      'Sim, parcialmente', 
                      'Não', 
                      'Não se aplica'
                    ])}
                  </div>

                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Você utilizou algum leitor de tela durante a avaliação do portal?</strong>
                    {renderRadioGroup('leitorTelaUsado', leitorTelaUsado, setLeitorTelaUsado, [
                      'Não utilizei leitor de tela',
                      'NVDA',
                      'JAWS',
                      'Narrador (Windows)',
                      'VoiceOver (macOS/iPhone/iPad)',
                      'TalkBack (Android)',
                      'Orca (Linux)',
                      'Dosvox',
                      'Outro'
                    ])}
                    {leitorTelaUsado === 'Outro' && (
                      <input 
                        type="text" 
                        placeholder="Qual outro?" 
                        className="form-input" 
                        style={{ marginTop: '1rem' }} 
                        value={leitorTelaOutro} 
                        onChange={e => setLeitorTelaOutro(e.target.value)} 
                      />
                    )}
                  </div>

                  <div>
                    <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Qual foi a principal forma de navegação utilizada?</strong>
                    {renderRadioGroup('formaNavegacao', formaNavegacao, setFormaNavegacao, [
                      'Mouse',
                      'Teclado',
                      'Teclado com leitor de tela',
                      'Tela sensível ao toque',
                      'Comandos de voz',
                      'Outra'
                    ])}
                    {formaNavegacao === 'Outra' && (
                      <input 
                        type="text" 
                        placeholder="Qual outra forma?" 
                        className="form-input" 
                        style={{ marginTop: '1rem' }} 
                        value={formaNavegacaoOutra} 
                        onChange={e => setFormaNavegacaoOutra(e.target.value)} 
                      />
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Controles de Navegação */}
            <div className="flex justify-between" style={{ marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              <button 
                type="button"
                onClick={voltarEtapa} 
                disabled={etapa === 1} 
                className="btn btn-secondary" 
                style={{ gap: '0.5rem', opacity: etapa === 1 ? 0.4 : 1 }}
                aria-label="Voltar para a etapa anterior"
              >
                <ArrowLeft size={18} /> Voltar
              </button>

              {etapa < totalEtapas ? (
                <button 
                  type="button"
                  onClick={avancarEtapa} 
                  className="btn btn-primary" 
                  style={{ gap: '0.5rem' }}
                  aria-label="Avançar para a próxima etapa"
                >
                  Avançar <ArrowRight size={18} />
                </button>
              ) : (
                <button 
                  type="submit" 
                  disabled={enviando}
                  className="btn btn-primary" 
                  style={{ gap: '0.5rem', opacity: enviando ? 0.7 : 1, cursor: enviando ? 'not-allowed' : 'pointer' }}
                >
                  {enviando ? 'Enviando...' : 'Finalizar Avaliação'} {!enviando && <ClipboardCheck size={20} />}
                </button>
              )}
            </div>
          </form>
        </>
      )}

      {enviado && (
        <section className="glass-panel" style={{ textAlign: 'center', padding: '3.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CheckCircle size={64} color="#34d399" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Muito obrigado pela contribuição!</h2>
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
            <span style={{ display: 'block', marginTop: '1rem', fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              Grau de Usabilidade: {obterTextoFeedbackSUS(scoreSUS)}
            </span>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: '1.4' }}>
              Notas acima de 68.0 são consideradas acima da média na escala de usabilidade clássica da indústria.
            </p>
          </div>

          <div className="flex gap-4">
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
