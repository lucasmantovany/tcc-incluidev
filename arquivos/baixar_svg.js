const fs = require('fs');
const https = require('https');
const zlib = require('zlib');

function encodeMermaid(code) {
    const data = Buffer.from(code, 'utf8');
    const compressed = zlib.deflateSync(data);
    const base64 = compressed.toString('base64');
    
    // Make URL safe
    return base64.replace(/\+/g, '-').replace(/\//g, '_');
}

const fluxogramaCode = `graph TD
    A([Início: Acessa Portal IncluiDev]) --> B{Escolha de Ação}
    B -->|Explorar Tudo| C[Visualiza Repositório Completo]
    B -->|Busca Guiada| D[Inicia Assistente Guia]
    
    D --> E{Qual é o seu Perfil?}
    
    E -->|Estudante| F1[Pergunta: Nível e Objetivo]
    E -->|Professor| F2[Pergunta: Necessidade em Sala]
    E -->|Desenvolvedor| F3[Pergunta: Tipo de Solução e Diretrizes]
    E -->|Pesquisador| F4[Pergunta: Tipologia de Pesquisa]
    
    F1 --> G[Processamento: Motor de Inferência]
    F2 --> G
    F3 --> G
    F4 --> G
    
    G --> H{Match de Tags?}
    H -->|Sim| I[Exibe Cards de Recomendações Personalizadas]
    H -->|Não| J[Exibe Mensagem de 'Nenhum Resultado' e Sugere Tentar Novamente]
    
    I --> K[Usuário Clica em 'Ver Detalhes']
    K --> L[Lê o Resumo Otimizado no Portal]
    L --> M([Acessa o Conteúdo Original Externo])`;

const base64Code = encodeMermaid(fluxogramaCode);
const jsonBody = JSON.stringify({
  code: fluxogramaCode,
  mermaid: {"theme": "default"}
});

const req = https.request('https://mermaid.ink/svg/pako:' + base64Code, {
  method: 'GET'
}, (res) => {
  let data = [];
  res.on('data', chunk => data.push(chunk));
  res.on('end', () => {
    fs.writeFileSync('docs/TCC Lucas/fluxograma_navegacao.svg', Buffer.concat(data));
    console.log('SVG salvo.');
  });
});

req.end();
