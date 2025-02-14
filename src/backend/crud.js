const express = require("express");
const { spawn } = require("child_process");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/gerar-qrcode", (req, res) => {
    const inputData = req.body;  

    const pythonProcess = spawn("python", ["app.py"]);

    let outputData = "";

    // Envia os dados para o script Python
    pythonProcess.stdin.write(JSON.stringify(inputData));
    pythonProcess.stdin.end();

    pythonProcess.stdout.on("data", (data) => {
        outputData += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error(`Erro no Python: ${data}`);
    });

    pythonProcess.on("close", (code) => {
        if (code === 0) {
            try {
                // Aqui, o Python irá imprimir o nome do arquivo gerado. Vamos retornar o nome do arquivo.
                const resultado = JSON.parse(outputData);
                res.json({ caminho: resultado.caminho }); 
                console.log(resultado);
            } catch (error) {
                res.status(500).json({ erro: "Erro ao processar a resposta do Python" });
            }
        } else {
            res.status(500).json({ erro: "Erro ao executar o script Python" });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
const path = require('path');

// Servir a pasta 'imagens' estaticamente
  app.use('/imagens', express.static(path.join(__dirname, 'imagens')));

