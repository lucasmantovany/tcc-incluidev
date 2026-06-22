const fs = require('fs');
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

const casosUsoCode = `usecaseDiagram
    actor "Usuário Público" as UP
    actor "Estudante (PcDV)" as Est
    actor "Professor/Educador" as Prof
    actor "Pesquisador" as Pesq
    actor "Desenvolvedor" as Dev
    actor "Moderador (Admin)" as Admin

    %% Herança: Todos os perfis herdam de Usuário Público
    Est --|> UP
    Prof --|> UP
    Pesq --|> UP
    Dev --|> UP

    package "Portal IncluiDev" {
        usecase "Acessar Busca Guiada" as UC1
        usecase "Navegar no Repositório Completo" as UC2
        usecase "Ler Detalhes de um Conteúdo" as UC3
        usecase "Acessar Link Original do Recurso" as UC4
        usecase "Submeter Relato de Experiência" as UC5
        usecase "Responder Formulário de Avaliação" as UC6
        usecase "Realizar Login" as UC7
        usecase "Moderar Relatos (Aprovar/Rejeitar/Editar)" as UC8
    }

    UP --> UC1
    UP --> UC2
    UP --> UC3
    UP --> UC4
    UP --> UC5
    UP --> UC6

    Admin --> UC7
    Admin --> UC8`;

const fluxoUrl = "https://mermaid.ink/img/pako:" + encodeMermaid(fluxogramaCode);
const casosUrl = "https://mermaid.ink/img/pako:" + encodeMermaid(casosUsoCode);

console.log("Fluxo:", fluxoUrl);
console.log("Casos:", casosUrl);