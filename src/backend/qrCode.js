const qrcode = require("qrcode");
const { SquareModuleDrawer, GappedSquareModuleDrawer, CircleModuleDrawer, RoundedModuleDrawer } = require("qrcode/image/styles/moduledrawers/pil");
const { StyledPilImage } = require("qrcode/image/styledpil");
const { SolidFillColorMask, RadialGradiantColorMask } = require("qrcode/image/styles/colormasks");

class QrCode {
  constructor() {
    this.qr = null;
    this.content = null;
    this.isConteudoCriado = false;
    this.imagemQrCode = null;
    this.constanteCorrecao = null;
  }

  QrCodeCriarDados(conteudo, tamanho, borda, correcao = "pequeno") {
    if (!this.isConteudoCriado) {
      this.content = conteudo;
      if (correcao === "muito_pequeno") {
        this.constanteCorrecao = qrcode.ERROR_CORRECT_L;
      } else if (correcao === "pequeno") {
        this.constanteCorrecao = qrcode.ERROR_CORRECT_M;
      } else if (correcao === "grande") {
        this.constanteCorrecao = qrcode.ERROR_CORRECT_Q;
      } else if (correcao === "muito_grande") {
        this.constanteCorrecao = qrcode.ERROR_CORRECT_H;
      } else {
        this.constanteCorrecao = qrcode.ERROR_CORRECT_M;
      }

      this.qr = qrcode.create(this.content, {
        errorCorrectionLevel: this.constanteCorrecao,
        version: null,
        boxSize: tamanho,
        margin: borda
      });

      this.isConteudoCriado = true;
    }
  }

  QrCodeCustomizarImagem(corPrincipal, corFundo, CorGradiente = "white", moduloDesenho, mascaraCor) {
    if (moduloDesenho === 1) {
      moduloDesenho = new SquareModuleDrawer();
    } else if (moduloDesenho === 2) {
      moduloDesenho = new GappedSquareModuleDrawer();
    } else if (moduloDesenho === 3) {
      moduloDesenho = new CircleModuleDrawer();
    } else if (moduloDesenho === 4) {
      moduloDesenho = new RoundedModuleDrawer();
    }

    if (mascaraCor) {
      if (mascaraCor === 1) {
        mascaraCor = new SolidFillColorMask(corPrincipal, corFundo);
      } else if (mascaraCor === 2) {
        mascaraCor = new RadialGradiantColorMask(corGradiente, corPrincipal, corFundo);
      }

      this.imagemQrCode = this.qr.makeImage({
        imageFactory: StyledPilImage,
        moduleDrawer: moduloDesenho,
        colorMask: mascaraCor
      });
    } else {
      this.imagemQrCode = this.qr.makeImage({
        imageFactory: StyledPilImage,
        moduleDrawer: moduloDesenho,
        fillColor: corPrincipal,
        backColor: corFundo
      });
    }
  }

  salvarQrCode(nome) {
    if (this.imagemQrCode) {
      this.imagemQrCode.save(nome);
    }
  }
}

module.exports = QrCode;
