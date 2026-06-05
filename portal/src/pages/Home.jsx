import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Users, LayoutList, ArrowRight, BookOpen, GraduationCap, Monitor } from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  // Função para navegar com filtros
  const irParaRepositorio = (parametro, valor) => {
    navigate(`/repositorio?${parametro}=${encodeURIComponent(valor)}`);
  };

  return (
    <div className="page-content container">
      
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '4rem 0', maxWidth: '800px', margin: '0 auto' }}>
        <h1 tabIndex="0">Democratizando o Ensino de Programação</h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }} tabIndex="0">
          Um portal centralizado que reúne metodologias, ferramentas e estudos para o ensino de programação voltado a Pessoas com Deficiência Visual (PcDV).
        </p>
        <div className="flex gap-4" style={{ justifyContent: 'center' }}>
          <Link to="/repositorio" className="btn btn-primary" aria-label="Acessar o repositório completo">
            Explorar Tudo
            <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} aria-hidden="true"/>
          </Link>
        </div>
      </section>

      {/* Acesso Rápido por Categorias (Caixas Dinâmicas) */}
      <section id="categorias" style={{ marginTop: '2rem', marginBottom: '4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Acesso Rápido por Categorias</h2>
        
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#94a3b8' }}>Por Nível de Ensino:</h3>
        <div className="cards-grid" style={{ marginBottom: '2rem' }}>
          <button className="glass-panel" onClick={() => irParaRepositorio('nivel', 'Básico')} style={{ textAlign: 'left', cursor: 'pointer', width: '100%' }}>
            <GraduationCap size={32} color="#60a5fa" style={{ marginBottom: '1rem' }} aria-hidden="true" />
            <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Ensino Básico</h4>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#cbd5e1' }}>Crianças e adolescentes iniciando na lógica.</p>
          </button>
          <button className="glass-panel" onClick={() => irParaRepositorio('nivel', 'Técnico')} style={{ textAlign: 'left', cursor: 'pointer', width: '100%' }}>
            <Monitor size={32} color="#34d399" style={{ marginBottom: '1rem' }} aria-hidden="true" />
            <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Ensino Técnico</h4>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#cbd5e1' }}>Jovens desenvolvendo habilidades práticas.</p>
          </button>
          <button className="glass-panel" onClick={() => irParaRepositorio('nivel', 'Superior')} style={{ textAlign: 'left', cursor: 'pointer', width: '100%' }}>
            <BookOpen size={32} color="#a78bfa" style={{ marginBottom: '1rem' }} aria-hidden="true" />
            <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Ensino Superior</h4>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#cbd5e1' }}>Pesquisas, IDEs e programação avançada.</p>
          </button>
        </div>

        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#94a3b8' }}>Por Público-Alvo:</h3>
        <div className="cards-grid">
          <button className="glass-panel" onClick={() => irParaRepositorio('publico', 'Professores')} style={{ textAlign: 'left', cursor: 'pointer', width: '100%' }}>
            <Users size={32} color="#f472b6" style={{ marginBottom: '1rem' }} aria-hidden="true" />
            <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Professores e Educadores</h4>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#cbd5e1' }}>Metodologias e guias práticos de ensino.</p>
          </button>
          <button className="glass-panel" onClick={() => irParaRepositorio('publico', 'Estudantes')} style={{ textAlign: 'left', cursor: 'pointer', width: '100%' }}>
            <LayoutList size={32} color="#fbbf24" style={{ marginBottom: '1rem' }} aria-hidden="true" />
            <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Estudantes</h4>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#cbd5e1' }}>Ferramentas, linguagens e IDEs acessíveis.</p>
          </button>
          <button className="glass-panel" onClick={() => irParaRepositorio('publico', 'Pesquisadores')} style={{ textAlign: 'left', cursor: 'pointer', width: '100%' }}>
            <Search size={32} color="#38bdf8" style={{ marginBottom: '1rem' }} aria-hidden="true" />
            <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Pesquisadores</h4>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#cbd5e1' }}>Revisões sistemáticas e artigos empíricos.</p>
          </button>
          <button className="glass-panel" onClick={() => irParaRepositorio('publico', 'Desenvolvedores')} style={{ textAlign: 'left', cursor: 'pointer', width: '100%' }}>
            <Monitor size={32} color="#3b82f6" style={{ marginBottom: '1rem' }} aria-hidden="true" />
            <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Desenvolvedores</h4>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#cbd5e1' }}>Normas, diretrizes e códigos de acessibilidade.</p>
          </button>
        </div>
      </section>
      
    </div>
  );
}

export default Home;
