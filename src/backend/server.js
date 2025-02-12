const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const QrCode = require("./qrCode");  // Importando a classe QrCode

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());  // Para processar JSON no corpo da requisição

// Rota para gerar QR Code
app.post("/generate-qrcode", (req, res) => {
  const { conteudo, tamanho, borda, correcao, corPrincipal, corFundo, corGradiente, moduloDesenho, mascaraCor } = req.body;

  const qr = new QrCode();

  qr.QrCodeCriarDados(conteudo, tamanho, borda, correcao); // Cria o QR Code com os dados
  qr.QrCodeCustomizarImagem(
    corPrincipal,
    corFundo,
    corGradiente,
    moduloDesenho,
    mascaraCor
  ); // Customiza a imagem gerada

  // Salvar a imagem gerada
  const nomeArquivo = `qrcode_${Date.now()}.png`;
  qr.salvarQrCode(`imagens/${nomeArquivo}`);  // Caminho onde a imagem será salva

  // Enviar a resposta com o nome do arquivo
  res.json({ qrCodeUrl: `http://localhost:3000/imagens/${nomeArquivo}` });
});

// Serve as imagens estáticas
app.use("/imagens", express.static("imagens"));

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
