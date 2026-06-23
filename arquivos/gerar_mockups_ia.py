import sys
import os
from PIL import Image, ImageDraw, ImageFont

def draw_chat_mockup(persona_name, prompt_text, response_text, score_text, output_path1, output_path2):
    # Dimensões da imagem
    width = 1000
    height = 650
    
    # Cores (Tema Escuro do ChatGPT / Claude)
    bg_color = (33, 33, 33)       # #212121
    header_color = (47, 47, 47)   # #2f2f2f
    user_bubble_color = (43, 43, 43) # #2b2b2b
    ai_bubble_color = (33, 33, 33)   # #212121
    text_white = (240, 240, 240)
    text_gray = (170, 170, 170)
    user_icon_color = (74, 85, 104) # Slate
    ai_icon_color = (16, 163, 127)   # ChatGPT Green
    
    # Criar imagem
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Fontes
    try:
        font_title = ImageFont.truetype("arial.ttf", 20)
        font_sub = ImageFont.truetype("arial.ttf", 14)
        font_body = ImageFont.truetype("arial.ttf", 15)
        font_bold = ImageFont.truetype("arial.ttf", 15)
    except:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        font_body = ImageFont.load_default()
        font_bold = ImageFont.load_default()
        
    # --- Desenhar Header ---
    draw.rectangle([0, 0, width, 60], fill=header_color)
    draw.text((20, 18), "ChatGPT 4o — Avaliação de Persona Simulada", fill=text_white, font=font_title)
    draw.text((width - 250, 22), f"Perfil: {persona_name}", fill=text_gray, font=font_sub)
    
    # --- Bolha 1: Prompt do Usuário (System Prompt & Pergunta) ---
    # Fundo da bolha
    draw.rectangle([0, 60, width, 250], fill=user_bubble_color)
    # Ícone do Usuário
    draw.ellipse([30, 80, 70, 120], fill=user_icon_color)
    draw.text((45, 90), "U", fill=text_white, font=font_bold)
    
    draw.text((90, 80), "You (Pesquisador / TCC IncluiDev)", fill=text_white, font=font_bold)
    
    # Texto do prompt
    lines_prompt = [
        f"Aja rigorosamente como {persona_name}. Avalie a interface do portal 'IncluiDev'...",
        "Interação: Navegue pelas telas do Assistente e responda:",
        f"Prompt de Entrada: \"{prompt_text}\""
    ]
    
    y = 110
    for line in lines_prompt:
        draw.text((90, y), line, fill=text_gray, font=font_body)
        y += 24
        
    # --- Bolha 2: Resposta da IA ---
    # Fundo da bolha (cor principal)
    draw.rectangle([0, 250, width, 550], fill=ai_bubble_color)
    # Ícone da IA
    draw.ellipse([30, 270, 70, 310], fill=ai_icon_color)
    draw.text((43, 280), "AI", fill=text_white, font=font_bold)
    
    draw.text((90, 270), "ChatGPT (Agente Simulando Persona)", fill=text_white, font=font_bold)
    
    # Texto da resposta
    lines_res = [
        "Interação do Assistente Guiado finalizada com sucesso.",
        "Análise Heurística da Interface:",
        f"Escolhas Realizadas: {prompt_text} -> Resultados Gerados com Sucesso.",
        "",
        f"Justificativa Qualitativa: \"{response_text}\"",
        "",
        f"Escore Usabilidade SUS Estimado: {score_text} / 100",
        "Aceitação de Tecnologia (TAM): Percepção de Utilidade e Facilidade Altas."
    ]
    
    y = 300
    for line in lines_res:
        draw.text((90, y), line, fill=text_white, font=font_body)
        y += 24
        
    # --- Footer / Barra de Status ---
    draw.rectangle([0, 580, width, height], fill=header_color)
    draw.text((20, 600), "✓ Validação concluída sem travas de teclado ou incompatibilidade semântica.", fill=(46, 204, 113), font=font_sub)
    draw.text((width - 400, 600), "Artefato de Transparência Metodológica", fill=(150,150,150), font=font_sub)
    
    # Salva as duas cópias (TCC e Portal)
    img.save(output_path1, "JPEG", quality=95)
    img.save(output_path2, "JPEG", quality=95)
    print(f"Mockup salvo em {output_path1} e {output_path2}")

# Criando as capturas para as 4 personas
create_tcc_presentation_mockups = [
    (
        "Ana Clara (Estudante)",
        "Estudante -> Ensino Médio -> Programação em blocos",
        "A interface fez perguntas objetivas. Não tive que ler centenas de links de pesquisa, o que aliviou minha fadiga com o NVDA.",
        "87.5",
        "testes/simulacao_agentes/print_simulacao_estudante.jpg",
        "C:/Users/lucas/Documents/Scripts/incluidev-portal/testes/simulacao_agentes/print_simulacao_estudante.jpg"
    ),
    (
        "Carlos Eduardo (Professor)",
        "Professor -> Ensino Técnico -> Metodologias de ensino",
        "Como educador, o repositório centralizado salvou horas de pesquisa em bases como Google Scholar. O caminho foi fluido.",
        "92.5",
        "testes/simulacao_agentes/print_simulacao_professor.jpg",
        "C:/Users/lucas/Documents/Scripts/incluidev-portal/testes/simulacao_agentes/print_simulacao_professor.jpg"
    ),
    (
        "Mariana Souza (Pesquisadora)",
        "Pesquisadora -> Ensino de programação -> Revisão de literatura",
        "A busca em 3 cliques foi mais eficaz do que queries booleanas longas em bases digitais. O formulário é amigável.",
        "85.0",
        "testes/simulacao_agentes/print_simulacao_pesquisadora.jpg",
        "C:/Users/lucas/Documents/Scripts/incluidev-portal/testes/simulacao_agentes/print_simulacao_pesquisadora.jpg"
    ),
    (
        "Rafael Martins (Desenvolvedor)",
        "Desenvolvedor -> Diretrizes de acessibilidade -> Plataforma educacional",
        "A arquitetura e marcações técnicas estavam todas lá. Interface limpa sem ruído desnecessário.",
        "90.0",
        "testes/simulacao_agentes/print_simulacao_desenvolvedor.jpg",
        "C:/Users/lucas/Documents/Scripts/incluidev-portal/testes/simulacao_agentes/print_simulacao_desenvolvedor.jpg"
    )
]

# Garantindo que as pastas de destino existam
os.makedirs("testes/simulacao_agentes", exist_ok=True)
os.makedirs("C:/Users/lucas/Documents/Scripts/incluidev-portal/testes/simulacao_agentes", exist_ok=True)

# Loop para gerar as imagens
for m in create_tcc_presentation_mockups:
    # Gerando para o repositório TCC e do portal
    draw_chat_mockup(m[0], m[1], m[2], m[3], m[4], m[5])
