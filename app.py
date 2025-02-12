import qrcode
from PIL import Image as img
from qrcode.image.styles.moduledrawers.pil import HeartModuleDrawer, TriangleModuleDrawer,StarModuleDrawer
from qrcode.image.styles.moduledrawers.pil import *
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.colormasks import *
import sys
import json
from random import randint
from datetime import datetime
class QrCode:
    def __init__(self):
        self.qr = None
        self.content = None
        self.isDadosCriados= False
        self.imagemQrCode = None
        self.constanteCorrecao = None
        self.isConteudoCriado = False
    
    def QrCodeCriarDados(self,conteudo,tamanho,borda,correcao="pequeno"):
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
                box_size=tamanho, # tamanho de qualidade da imagem, 1 = 29x29
                border=borda,  # tamanho do espaço em branco em volta do qr code
            )
            self.qr.add_data(self.content)
            self.qr.make(fit=True)
            self.isConteudoCriado = True
        return self.isDadosCriados
    def QrCodeCustomizarImagem(self,corPrincipal,corFundo,CorGradiente = "white",imagem = None,moduloDesenho = None,mascaraCor = None):
           
            if(moduloDesenho == 1):
                    moduloDesenho = SquareGradiantColorMask()
            elif (moduloDesenho == 2):
                    moduloDesenho =GappedSquareModuleDrawer()
            elif(moduloDesenho == 3):
                    moduloDesenho = CircleModuleDrawer()
            elif(moduloDesenho==4):
                    moduloDesenho = RoundedModuleDrawer()
            elif(moduloDesenho == 5):
                    moduloDesenho = VerticalBarsDrawer()
            elif(moduloDesenho == 6):
                    moduloDesenho =HorizontalBarsDrawer()
            elif(moduloDesenho == 7):
                    moduloDesenho =HeartModuleDrawer()
            elif(moduloDesenho == 8):
                    moduloDesenho = TriangleModuleDrawer()
            elif(moduloDesenho == 9):
                    moduloDesenho = HeartModuleDrawer()
            else:
                if(moduloDesenho is not None):
                    raise ValueError("O valor informado é inválido!")
           
            if(mascaraCor == 1):
                mascaraCor =SolidFillColorMask(front_color=corPrincipal,back_color=corFundo)
            elif(mascaraCor == 2):
                  mascaraCor = RadialGradiantColorMask(edge_color=CorGradiente,center_color=corPrincipal,back_color=corFundo)
            elif(mascaraCor == 3):
                  mascaraCor = SquareGradiantColorMask(back_color=corFundo,edge_color=CorGradiente,center_color=corPrincipal)
            elif(mascaraCor == 4):
                  mascaraCor = HorizontalGradiantColorMask(right_color=CorGradiente,left_color=corPrincipal,back_color=corFundo)
            elif(mascaraCor ==5):
                  mascaraCor = VerticalGradiantColorMask(back_color=corFundo,top_color=corPrincipal,bottom_color=CorGradiente)
            else:
                  if(mascaraCor is not None):
                    json.dumps("O valor informado é inválido!")
                    raise ValueError("O valor informado é inválido!")
                  
            if(mascaraCor is None and moduloDesenho is not None):    
                self.imagemQrCode = self.qr.make_image(
                fill_color=corPrincipal, 
                back_color=corFundo,
                image_factory=StyledPilImage,
                module_drawer=moduloDesenho) 
            elif(mascaraCor is None and moduloDesenho is None):
                   self.imagemQrCode = self.qr.make_image(
                fill_color=corPrincipal, 
                back_color=corFundo) 
            else:
                self.imagemQrCode = self.qr.make_image(
                image_factory=StyledPilImage,
                module_drawer=moduloDesenho ,
                color_mask=mascaraCor)
    def ShowQrCode(self):
        if self.imagemQrCode:
            self.imagemQrCode.show()
        else:
            print("O QR Code ainda não foi criado. Use 'CriarQrCodeConteudo' primeiro.")
    def salvarQrCode(self,nome):
         if self.imagemQrCode:
              self.imagemQrCode.save(nome)      

entrada = json.loads(sys.argv[1])

qr = QrCode()
qr.QrCodeCriarDados(
    entrada["conteudo"],
    entrada["tamanho"],
    entrada["borda"],
    entrada["correcao"]
)

#qr = QrCode()
#qr.QrCodeCriarDados("amo Jesus",20,9)
#passe os argumentos vindos do JS com o children para variaveis aqui e dps só complete o qr!
#esse é um tratamento extra para evitar possiveis erros vindos da pagina WEB

if("mascaraCor" in entrada):
        qr.QrCodeCustomizarImagem(corPrincipal=tuple(entrada['corPrincipal']),corFundo=tuple(entrada['corFundo']),CorGradiente=tuple(entrada['corGradiente']),moduloDesenho= entrada["moduloDesenho"],mascaraCor=entrada['mascaraCor'])
else:
        qr.QrCodeCustomizarImagem(corPrincipal=tuple(entrada['corPrincipal']),corFundo=tuple(entrada['corFundo']),CorGradiente=tuple(entrada['corGradiente']),moduloDesenho= entrada["moduloDesenho"])



#if(entrada['corGradiente'] is list):
#    qr.QrCodeCustomizarImagem(corPrincipal=tuple(entrada['corPrincipal']),corFundo=tuple(entrada['corFundo']),moduloDesenho= entrada["moduloDesenho"],mascaraCor=entrada['mascaraCor'])
#else:
#    qr.QrCodeCustomizarImagem(corPrincipal=tuple(entrada['corPrincipal']),corFundo=tuple(entrada['corFundo']),CorGradiente=tuple(entrada['corGradiente']),moduloDesenho= entrada["moduloDesenho"],mascaraCor=entrada['mascaraCor'])


lengthPalavra = randint(3,5)
StringArquivo = "zaq12sxcde34rfvbgt56yhnmj_u78iklo90p"
dataArquivo = datetime.now().strftime("%Y%m%d%H%M%S%f")
nomeArquivo = ""

for x in range(lengthPalavra):
     nomeArquivo+=StringArquivo[randint(0,len(StringArquivo)-1)]

nomeArquivo+=dataArquivo
qr.salvarQrCode(nomeArquivo+".PNG")
print(json.dumps(nomeArquivo))

