import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, Sun, Moon } from 'lucide-react';
import Home from './pages/Home';
import Repositorio from './pages/Repositorio';
import Assistente from './pages/Assistente';
import Experiencias from './pages/Experiencias';
import Moderacao from './pages/Moderacao';
import ConteudoDetalhe from './pages/ConteudoDetalhe';
import Avaliacao from './pages/Avaliacao';

const NAV_LINKS = [
  { to: '/', label: 'Início', exact: true },
  { to: '/repositorio', label: 'Repositório' },
  { to: '/busca-guiada', label: 'Busca Guiada' },
  { to: '/experiencias', label: 'Experiências' },
  { to: '/avaliacao', label: 'Avaliação' },
];

function Navigation({ tema, alternarTema }) {
  const location = useLocation();
  const [menuAberto, setMenuAberto] = useState(false);

  const isAtivo = (to, exact) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <nav className="navbar" aria-label="Navegação principal">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4" aria-label="IncluiDev — Voltar para a página inicial">
          <BookOpen color="#3b82f6" size={28} aria-hidden="true" />
          <span style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)' }}>IncluiDev</span>
        </Link>

        <div className="flex items-center">
          {/* Links Desktop */}
          <ul className="nav-links" role="list">
            {NAV_LINKS.map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={isAtivo(link.to, link.exact) ? 'active' : ''}
                  aria-current={isAtivo(link.to, link.exact) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Theme Toggle Botão */}
          <button
            onClick={alternarTema}
            className="btn btn-secondary"
            style={{ padding: '0.5rem', borderRadius: '50%', marginLeft: '1rem', border: 'none' }}
            aria-label={`Alternar para modo ${tema === 'dark' ? 'claro' : 'escuro'}`}
            title={`Alternar para modo ${tema === 'dark' ? 'claro' : 'escuro'}`}
          >
            {tema === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Botão hamburger para mobile */}
          <button
            className="menu-toggle btn btn-secondary"
            onClick={() => setMenuAberto(prev => !prev)}
            aria-expanded={menuAberto}
            aria-controls="mobile-menu"
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu de navegação'}
            style={{ marginLeft: '1rem' }}
          >
            {menuAberto ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {menuAberto && (
        <div id="mobile-menu" className="mobile-menu" role="dialog" aria-label="Menu de navegação mobile">
          <ul role="list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {NAV_LINKS.map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`mobile-nav-link ${isAtivo(link.to, link.exact) ? 'active' : ''}`}
                  aria-current={isAtivo(link.to, link.exact) ? 'page' : undefined}
                  onClick={() => setMenuAberto(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          <strong>IncluiDev</strong> — Repositório Centralizado de Ensino de Programação para Pessoas com Deficiências Visuais (PcDV)
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>
          Universidade Federal de Mato Grosso do Sul (UFMS) — Trabalho de Conclusão de Curso
        </p>
        <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
          <Link to="/experiencias" style={{ color: '#64748b', textDecoration: 'underline' }}>Compartilhe sua Experiência</Link>
          {' · '}
          <Link to="/busca-guiada" style={{ color: '#64748b', textDecoration: 'underline' }}>Busca Guiada</Link>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [tema, setTema] = useState(() => {
    const salvo = localStorage.getItem('tcc_theme');
    return salvo ? salvo : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema);
    localStorage.setItem('tcc_theme', tema);
  }, [tema]);

  const alternarTema = () => {
    setTema(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <Router>
      <a href="#main-content" className="skip-link">Pular para o conteúdo principal</a>
      <Navigation tema={tema} alternarTema={alternarTema} />
      <main id="main-content" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repositorio" element={<Repositorio />} />
          <Route path="/busca-guiada" element={<Assistente />} />
          <Route path="/experiencias" element={<Experiencias />} />
          <Route path="/avaliacao" element={<Avaliacao />} />
          <Route path="/moderacao" element={<Moderacao />} />
          <Route path="/conteudo/:id" element={<ConteudoDetalhe />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
