import qrcode
from PIL import Image as img
from qrcode.image.styles.moduledrawers.pil import SquareModuleDrawer, GappedSquareModuleDrawer, CircleModuleDrawer, RoundedModuleDrawer
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.colormasks import SolidFillColorMask, RadialGradiantColorMask
import sys
import json
from random import randint
from datetime import datetime
import os

class QrCode:
    def __init__(self):
        self.qr = None
        self.content = None
        self.isDadosCriados = False
        self.imagemQrCode = None
        self.constanteCorrecao = None
        self.isConteudoCriado = False
    
    def QrCodeCriarDados(self, conteudo, tamanho, borda, correcao="pequeno"):
        if not self.isConteudoCriado:
            self.content = conteudo
            if(correcao == "muito_pequeno"):
                self.constanteCorrecao = qrcode.ERROR_CORRECT_L
            elif(correcao == "pequeno"):
                self.constanteCorrecao = qrcode.ERROR_CORRECT_M
            elif(correcao == "grande"):
                self.constanteCorrecao = qrcode.ERROR_CORRECT_Q
            elif(correcao == "muito_grande"):
                self.constanteCorrecao = qrcode.ERROR_CORRECT_H
            else:
                self.constanteCorrecao = qrcode.ERROR_CORRECT_M
            self.qr = qrcode.QRCode(
                version=None,
                error_correction=self.constanteCorrecao,
                box_size=tamanho,  # tamanho de qualidade da imagem, 1 = 29x29
                border=borda,  # tamanho do espaço em branco em volta do qr code
            )
            self.qr.add_data(self.content)
            self.qr.make(fit=True)
            self.isConteudoCriado = True
        return self.isDadosCriados

    def QrCodeCustomizarImagem(self, corPrincipal, corFundo, CorGradiente="white", imagem=None, moduloDesenho=None, mascaraCor=None):
        # Substituindo os módulos não disponíveis por opções válidas
        if moduloDesenho == 1:
            moduloDesenho = SquareModuleDrawer()  # Módulo válido
        elif moduloDesenho == 2:
            moduloDesenho = GappedSquareModuleDrawer()
        elif moduloDesenho == 3:
            moduloDesenho = CircleModuleDrawer()
        elif moduloDesenho == 4:
            moduloDesenho = RoundedModuleDrawer()  # Módulo válido
        else:
            raise ValueError("O valor informado para moduloDesenho é inválido!")

        # Aplicando as máscaras de cor apenas se mascaraCor for fornecido
        if mascaraCor:
            if mascaraCor == 1:
                mascaraCor = SolidFillColorMask(front_color=corPrincipal, back_color=corFundo)
            elif mascaraCor == 2:
                mascaraCor = RadialGradiantColorMask(edge_color=CorGradiente, center_color=corPrincipal, back_color=corFundo)
            else:
                raise ValueError("O valor informado para mascaraCor é inválido!")

            # Gerando a imagem personalizada
            self.imagemQrCode = self.qr.make_image(
                image_factory=StyledPilImage,
                module_drawer=moduloDesenho,
                color_mask=mascaraCor
            )
        else:
            self.imagemQrCode = self.qr.make_image(
                image_factory=StyledPilImage,
                module_drawer=moduloDesenho,
                fill_color=corPrincipal,
                back_color=corFundo
            )

    def ShowQrCode(self):
        if self.imagemQrCode:
            self.imagemQrCode.show()
        else:
            print("O QR Code ainda não foi criado. Use 'CriarQrCodeConteudo' primeiro.")
    
    def salvarQrCode(self, nome):
        if self.imagemQrCode:
            self.imagemQrCode.save(nome)


# Simulando a entrada dos dados como um exemplo
entrada = {
    "conteudo": "inicio",
    "tamanho": 10,
    "borda": 4,
    "correcao": "pequeno",
    "corPrincipal": [0, 0, 0],
    "corFundo": [255, 255, 255],
    "corGradiente": [255, 0, 0],
    "moduloDesenho": 1,
    "mascaraCor": 2  
}

# Criando o objeto QR Code e passando os parâmetros da entrada
qr = QrCode()
qr.QrCodeCriarDados(
    entrada["conteudo"],
    entrada["tamanho"],
    entrada["borda"],
    entrada["correcao"]
)

# Gerando a imagem do QR Code com os parâmetros customizados
qr.QrCodeCustomizarImagem(
    corPrincipal=tuple(entrada['corPrincipal']),
    corFundo=tuple(entrada['corFundo']),
    CorGradiente=tuple(entrada['corGradiente']),
    moduloDesenho=entrada["moduloDesenho"],
    mascaraCor=entrada['mascaraCor']
)

# Gerando um nome aleatório para salvar o arquivo
lengthPalavra = randint(3, 5)
StringArquivo = "zaq12sxcde34rfvbgt56yhnmj_u78iklo90p"
dataArquivo = datetime.now().strftime("%Y%m%d%H%M%S%f")
nomeArquivo = ""

for x in range(lengthPalavra):
    nomeArquivo += StringArquivo[randint(0, len(StringArquivo)-1)]

nomeArquivo += dataArquivo

# Caminho completo para salvar o arquivo na pasta 'imagens'
caminho_arquivo = os.path.join('imagens', nomeArquivo + ".PNG")

# Salvando o arquivo gerado
qr.salvarQrCode(caminho_arquivo)

# Imprimindo o nome do arquivo gerado
print(json.dumps(nomeArquivo))
