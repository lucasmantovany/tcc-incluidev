import sys
from PIL import Image, ImageDraw, ImageFont

def create_mock_diagram(text_title, output_path):
    width = 1200
    height = 800
    bg_color = (255, 255, 255)
    
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Desenhar borda
    draw.rectangle([10, 10, width-10, height-10], outline=(0,0,0), width=3)
    
    # Texto
    # Vamos usar as funções basicas se a fonte nao existir
    try:
        font = ImageFont.truetype("arial.ttf", 36)
        small_font = ImageFont.truetype("arial.ttf", 24)
    except:
        font = ImageFont.load_default()
        small_font = ImageFont.load_default()
        
    draw.text((50, 50), text_title, fill=(0,0,0), font=font)
    
    draw.text((50, 150), "Este eh um diagrama placeholder.", fill=(100,100,100), font=small_font)
    draw.text((50, 200), "Gere o fluxograma definitivo exportando o Mermaid no site:", fill=(100,100,100), font=small_font)
    draw.text((50, 250), "https://mermaid.live", fill=(0,0,255), font=small_font)
    
    # Caixas 
    draw.rectangle([100, 350, 400, 450], outline=(0,0,0), width=2, fill=(230,240,250))
    draw.text((150, 385), "Inicio do Fluxo", fill=(0,0,0), font=small_font)
    
    draw.line([(400, 400), (500, 400)], fill=(0,0,0), width=3)
    draw.polygon([(490, 390), (490, 410), (510, 400)], fill=(0,0,0))
    
    draw.rectangle([510, 350, 810, 450], outline=(0,0,0), width=2, fill=(230,240,250))
    draw.text((560, 385), "Processamento Lógico", fill=(0,0,0), font=small_font)
    
    draw.line([(810, 400), (910, 400)], fill=(0,0,0), width=3)
    draw.polygon([(900, 390), (900, 410), (920, 400)], fill=(0,0,0))

    draw.rectangle([920, 350, 1150, 450], outline=(0,0,0), width=2, fill=(230,240,250))
    draw.text((950, 385), "Resultados", fill=(0,0,0), font=small_font)
    
    img.save(output_path, "JPEG", quality=95)
    print(f"Salvo: {output_path}")

create_mock_diagram("Fluxograma de Navegacao (Substitua por versao final)", "docs/TCC Lucas/fluxograma_navegacao.jpg")
create_mock_diagram("Diagrama de Casos de Uso (Substitua por versao final)", "docs/TCC Lucas/diagrama_casos_de_uso.jpg")
