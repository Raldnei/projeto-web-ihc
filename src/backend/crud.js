const express = require("express");
const { spawn } = require("child_process");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/qrcode", (req, res) => {
    const inputData = JSON.stringify(req.body);

    const pythonProcess = spawn("python", ["app.py", inputData]);

    let outputData = "";

    pythonProcess.stdout.on("data", (data) => {
        outputData += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error(`Erro no Python: ${data}`);
    });

    pythonProcess.on("close", (code) => {
        if (code === 0) {
            try {
                const resultado = JSON.parse(outputData);
                res.json({ caminho: outputData});
                console.log(outputData)
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


