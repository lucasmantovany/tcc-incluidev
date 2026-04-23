import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BookOpen, Home as HomeIcon, Info } from 'lucide-react';
import Home from './pages/Home';
import Repositorio from './pages/Repositorio';

function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="navbar" aria-label="Navegação principal">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4" aria-label="Voltar para a página inicial">
          <BookOpen color="#3b82f6" size={32} aria-hidden="true" />
          <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff' }}>IncluiDev</span>
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''} aria-current={location.pathname === '/' ? 'page' : undefined}>
              Início
            </Link>
          </li>
          <li>
            <Link to="/repositorio" className={location.pathname === '/repositorio' ? 'active' : ''} aria-current={location.pathname === '/repositorio' ? 'page' : undefined}>
              Repositório
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>Projeto de TCC - Repositório Centralizado de Ensino de Programação para Pessoas com Deficiências Visuais (PcDV)</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Universidade Federal de Mato Grosso do Sul (UFMS)</p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repositorio" element={<Repositorio />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
