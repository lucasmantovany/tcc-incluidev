import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X } from 'lucide-react';
import Home from './pages/Home';
import Repositorio from './pages/Repositorio';
import Assistente from './pages/Assistente';
import Experiencias from './pages/Experiencias';
import Moderacao from './pages/Moderacao';

const NAV_LINKS = [
  { to: '/', label: 'Início', exact: true },
  { to: '/repositorio', label: 'Repositório' },
  { to: '/assistente', label: 'Assistente Guia' },
  { to: '/experiencias', label: 'Experiências' },
];

function Navigation() {
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
          <span style={{ fontSize: '1.4rem', fontWeight: '700', color: '#fff' }}>IncluiDev</span>
        </Link>

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

        {/* Botão hamburger para mobile */}
        <button
          className="menu-toggle btn btn-secondary"
          onClick={() => setMenuAberto(prev => !prev)}
          aria-expanded={menuAberto}
          aria-controls="mobile-menu"
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu de navegação'}
        >
          {menuAberto ? <X size={22} /> : <Menu size={22} />}
        </button>
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
          <Link to="/assistente" style={{ color: '#64748b', textDecoration: 'underline' }}>Assistente Guia</Link>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <Router>
      <a href="#main-content" className="skip-link">Pular para o conteúdo principal</a>
      <Navigation />
      <main id="main-content" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repositorio" element={<Repositorio />} />
          <Route path="/assistente" element={<Assistente />} />
          <Route path="/experiencias" element={<Experiencias />} />
          <Route path="/moderacao" element={<Moderacao />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
