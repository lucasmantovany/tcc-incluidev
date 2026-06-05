# ✓ Checklist de Acessibilidade - IncluiDev (WCAG 2.1 AA)

**Critério:** WCAG 2.1 Level AA  
**Leitores de Tela Alvo:** NVDA, JAWS, VoiceOver, TalkBack  
**Navegação:** Teclado (Tab, Shift+Tab, Enter, Escape, Setas)  
**Atualização:** Junho de 2026

---

## 🎯 Nível 1: Estrutura Semântica (Crítico)

### HTML5 Semântico
- [ ] Uma única tag `<h1>` por página
- [ ] Hierarquia de headings correta (`<h1>` → `<h2>` → `<h3>`, nunca pulando níveis)
- [ ] Uso de `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>` apropriadamente
- [ ] Sem divitis: evitar `<div>` quando um `<button>` ou `<a>` é mais apropriado
- [ ] Links com texto descritivo (nunca "clique aqui")
- [ ] Imagens com `alt` descritivo (ou `alt=""` se puramente decorativa)
- [ ] Formulários com `<label>` associado (via `for` + `id`)
- [ ] Listas com `<ul>`, `<ol>` e `<li>` (nunca `<div>` simulando listas)

### Exemplo Correto
```jsx
<section aria-labelledby="filtros-titulo">
  <h2 id="filtros-titulo">Filtros de Conteúdo</h2>
  
  <div className="filtro-grupo">
    <label htmlFor="nivel-select">Nível de Ensino:</label>
    <select id="nivel-select" name="nivel" aria-label="Selecione o nível de ensino">
      <option value="">Todos</option>
      <option value="basico">Básico</option>
      <option value="tecnico">Técnico</option>
      <option value="superior">Superior</option>
    </select>
  </div>
  
  <button type="button" onClick={aplicarFiltros} aria-label="Aplicar filtros">
    Aplicar
  </button>
</section>
```

---

## 🎯 Nível 2: Interatividade & ARIA (Crítico)

### ARIA Labels & Roles
- [ ] `aria-label` em botões com apenas ícones: `<button aria-label="Menu Principal">`
- [ ] `aria-labelledby` em sections/fieldsets: `<section aria-labelledby="secao-titulo">`
- [ ] `aria-describedby` para descrições/ajuda: `<input aria-describedby="help-text">`
- [ ] `aria-live="polite"` em listas dinâmicas (relatos, resultados de filtro)
- [ ] `aria-expanded="true/false"` em menu expansível
- [ ] `aria-hidden="true"` em elementos puramente decorativos (ícones puramente visuais)
- [ ] `role="region"` em áreas principais sem landmark semântico
- [ ] `role="alert"` em mensagens de erro/sucesso críticas

### Navegação por Teclado
- [ ] Tab order lógico (verificar com `Tab` manual)
- [ ] Sem "armadilhas" de foco (foco não fica preso)
- [ ] Botões e links recebem foco visual clara (`:focus` com `outline` ou `box-shadow`)
- [ ] Modais com foco aprisionado (Focus trap - sair com `Escape`)
- [ ] Menus dropdown navegáveis com setas ↑↓ (não apenas Tab)
- [ ] Enter ou Space ativam botões/links

### Skip Links (Opcional mas Recomendado)
- [ ] Link "Pular para conteúdo principal" no topo: `<a href="#main">Ir para conteúdo</a>`
- [ ] Elemento com `id="main"` recebe foco

### Exemplo Correto
```jsx
// Botão com ícone - precisa de aria-label
<button 
  aria-label="Expandir menu de categorias"
  onClick={() => setExpanded(!expanded)}
  aria-expanded={expanded}
>
  <MenuIcon size={24} /> {/* Ícone sem texto */}
</button>

// Lista dinâmica de resultados
<ul aria-live="polite" aria-label="Resultados da busca">
  {resultados.map(r => (
    <li key={r.id}>{r.titulo}</li>
  ))}
</ul>
```

---

## 🎯 Nível 3: Cores, Contraste & Temas (Crítico)

### Contraste de Cores
- [ ] Texto vs Fundo: mínimo 4.5:1 (normal) ou 3:1 (grande, 18pt+)
- [ ] Componentes UI vs Fundo: mínimo 3:1
- [ ] Usar ferramentas: WAVE, Lighthouse, Color Contrast Analyzer

### Tema Claro & Escuro
- [ ] Variáveis CSS dinâmicas: `var(--bg-primary)`, `var(--text-primary)`, etc.
- [ ] Nenhuma cor hardcoded em componentes (ex: `#3b82f6`)
- [ ] Preferência de tema salva em localStorage
- [ ] Respeita `prefers-color-scheme: dark` do SO (opcional)
- [ ] Transições suaves entre temas (sem "flash" de cores)

### Exemplo Correto
```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
  --border-color: #d3d3d3;
  --accent-color: #0066cc;
  --success-color: #10b981;
  --error-color: #dc2626;
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --text-primary: #ffffff;
  --text-secondary: #b0b0b0;
  --border-color: #404040;
  --accent-color: #66b3ff;
  --success-color: #34d399;
  --error-color: #f87171;
}

.card {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  padding: 1rem;
}
```

---

## 🎯 Nível 4: Formulários (Crítico para Assistente & Experiências)

### Labels & Inputs
- [ ] Todo `<input>` tem `<label>` associado (via `for` + `id`)
- [ ] `type` correto: `text`, `email`, `password`, `number`, `date`, etc.
- [ ] Inputs obrigatórios com `required` + indicação visual
- [ ] Erros de validação com `aria-invalid="true"` + mensagem com `aria-describedby`
- [ ] Placeholders não substituem labels
- [ ] Inputs com auto-complete: `autocomplete="name"`, `autocomplete="email"`, etc.

### Exemplo Correto (Formulário Assistente)
```jsx
<form onSubmit={handleSubmit}>
  {/* Etapa 1 */}
  <fieldset>
    <legend>Qual é seu nível de ensino?</legend>
    
    <div className="radio-group">
      <input 
        type="radio" 
        id="nivel-basico" 
        name="nivel" 
        value="basico"
        onChange={(e) => setNivel(e.target.value)}
      />
      <label htmlFor="nivel-basico">Ensino Básico</label>
    </div>
    
    <div className="radio-group">
      <input 
        type="radio" 
        id="nivel-tecnico" 
        name="nivel" 
        value="tecnico"
        onChange={(e) => setNivel(e.target.value)}
      />
      <label htmlFor="nivel-tecnico">Ensino Técnico</label>
    </div>
  </fieldset>
  
  <button type="submit">Próxima Etapa</button>
</form>
```

---

## 🎯 Nível 5: Responsividade & Mobile (Importante)

### Viewport & Zoom
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1">`
- [ ] Não desabilitar zoom: NÃO usar `user-scalable=no`
- [ ] Texto escalável até 200% (móvel/zoom)

### Touch & Pointer
- [ ] Áreas tocáveis mínimo 44×44px (WCAG 2.5.5)
- [ ] Espaçamento adequado entre botões/links
- [ ] Sem dependência de hover (sempre oferecer alternativa no tap/click)

---

## 🎯 Nível 6: Performance & Carregamento (Importante)

### Imagens
- [ ] Imagens otimizadas (lazy loading, formato webp)
- [ ] Ícones SVG inline com `aria-hidden="true"` se decorativos
- [ ] Evitar CAPTCHA (inacessível); usar alternativa (reCAPTCHA v3, hCaptcha com a11y)

### Carregamento Dinâmico
- [ ] Listas filtradas com `aria-live="polite"` anunciam mudanças
- [ ] Loading spinners com `role="status"` + `aria-live="polite"`: "Carregando..."
- [ ] Debounce de filtros para evitar requisições excessivas

---

## 🎯 Nível 7: Componentes Específicos do IncluiDev

### Home Page
- [ ] Cards com `role="article"` ou `<article>`
- [ ] Atalhos rápidos (filtros por Nível/Público) com aria-label descritivo
- [ ] Links para páginas distintas com foco visível

### Repositório (com Filtros)
- [ ] Filtros (`<select>`) com labels semânticos
- [ ] Botão "Aplicar Filtros" ou atualização automática com anúncio
- [ ] Lista de resultados com `aria-live="polite"` e contagem: "5 resultados encontrados"
- [ ] Cada card é `<article>` com `<h2>` (título do recurso)
- [ ] Links diretos ("Ver Detalhes", "Acessar Fonte") com aria-label claro

### ConteudoDetalhe (/conteudo/:id)
- [ ] Breadcrumb navegável: "Home > Repositório > [Título Conteúdo]"
- [ ] Título da página em `<h1>`
- [ ] Seções bem organizadas (`<section>` com `<h2>`)
- [ ] Links externos com indicação: `<a href="..." target="_blank"> ... (abre em nova aba)</a>`

### Assistente (Wizard 3 Etapas)
- [ ] Etapas numeradas: "Etapa 1 de 3"
- [ ] Foco automático em `<legend>` ou primeiro campo de cada etapa
- [ ] Botões "Próxima" e "Voltar" com aria-label
- [ ] Anúncios com `aria-live="polite"`: "Etapa 2 de 3 carregada"
- [ ] Botão "Saltar para resultado" opcional com tabindex="-1" até pronto

### Experiências (Relatos)
- [ ] Formulário de envio semântico (name, email, descrição, nota/rating)
- [ ] Validação visível (ícones ✓/✗ ou cor de borda)
- [ ] Mensagem de sucesso com `role="alert"`: "Relato enviado com sucesso!"
- [ ] Lista de relatos aprovados com `aria-live="assertive"` para novos itens

### Moderação (Admin)
- [ ] Tabela com `<table>`, `<thead>`, `<tbody>`, `<th scope="col">`
- [ ] Botões de ação (Aprovar, Rejeitar, Editar) com aria-label: "Aprovar relato #5"
- [ ] Modo edição inline acessível (inputs com labels, salvar com Enter ou botão)
- [ ] Indicador visual de status (cor + texto, não apenas cor)

---

## 🧪 Testes de Acessibilidade

### Antes de Deploy
- [ ] Teste com **NVDA** (Windows, gratuito) no mínimo
  - Navegar página com setas + Tab
  - Verificar anúncios de aria-live
  - Testar formulários e buttons
  
- [ ] **Lighthouse** (Chrome DevTools): Score ≥ 90 em Accessibility
  
- [ ] **WAVE** (webAIM): Sem erros críticos, máximo 5 warnings aceitáveis
  
- [ ] **AxeDevTools** (Chrome ext): Executar automaticamente, zero erros

### Manual
- [ ] Desabilitar mouse e navegar apenas com teclado
- [ ] Aumentar texto para 200% (Ctrl++ no navegador)
- [ ] Ativar modo contraste alto (SO Windows/Mac)
- [ ] Testar em tema escuro

### Com Usuários Reais (Fase 5)
- [ ] Teste com PcDV usando JAWS ou NVDA
- [ ] Teste com usuário de baixa visão (magnificador)
- [ ] Teste com usuário daltônico (simulador de cores)

---

## 📋 Checklist Pre-Commit

Antes de fazer commit/push:

```bash
# 1. Build testa
npm run build

# 2. Validação manual rápida
# a) Navegar com Tab em 3 páginas diferentes
# b) Verificar 2 formulários com Enter
# c) Expandir 1 menu com teclado
# d) Ativar/desativar tema escuro

# 3. DevTools
# Lighthouse Accessibility ≥ 90
# WAVE Browser Extension: 0 erros

# 4. Se adicionou novo componente interativo:
# - Tem <label> ou aria-label?
# - Funciona com Tab + Enter/Space?
# - Está em aria-live se dinâmico?
# - Contraste OK? (Color Contrast Analyzer)

# 5. Atualizar task.md com progresso
```

---

## 🔗 Ferramentas Recomendadas

| Ferramenta | Tipo | Link | Uso |
|---|---|---|---|
| **NVDA** | Leitor tela | https://www.nvaccess.org/ | Teste principal |
| **Lighthouse** | Automatizada | DevTools Chrome | Score ≥90 |
| **WAVE** | Automatizada | https://wave.webaim.org/ | Validação visual |
| **AxeDevTools** | Automatizada | Chrome Extension | Detalhado |
| **Color Contrast Analyzer** | Contrastes | https://www.tpgi.com/color-contrast-checker/ | RGB/Hex |
| **WebAIM Contrast** | Online | https://webaim.org/resources/contrastchecker/ | Rápido |
| **Deque University** | Treinamento | https://dequeuniversity.com/ | Aprender WCAG |

---

## 🚩 Erros Comuns Evitar

| ❌ ERRADO | ✅ CORRETO | Impacto |
|---|---|---|
| `<div onClick={}>` | `<button onClick={}>` | Teclado não funciona |
| `<img alt="imagem">` | `<img alt="descrição clara">` | Leitor tela anuncia "imagem" |
| `#3b82f6` hardcoded | `var(--accent-color)` | Tema escuro quebra |
| Sem label em input | `<label for="id">...</label>` | Leitor tela não sabe o que é |
| `aria-hidden="true"` em conteúdo | Usar só em decorativo | Conteúdo fica invisível |
| Foco `:focus { outline: none }` | Manter outline ou trocar por box-shadow | Navegação por teclado impossível |
| `user-scalable=no` | Remover (permitir zoom) | Não consegue ampliar |

---

## 📝 Notas Importantes

1. **Acessibilidade não é "extra"** - é parte do escopo do IncluiDev
2. **Testes manuais são essenciais** - ferramentas automatizadas pegam ~70% dos problemas
3. **PcDV é o público-alvo crítico** - priorize NVDA/JAWS/VoiceOver
4. **Iteração contínua** - obter feedback real em Fase 5

---

**Mantido por:** Desenvolvimento IncluiDev  
**Última atualização:** Junho de 2026  
**Certificação alvo:** WCAG 2.1 Level AA (100% exigido)
