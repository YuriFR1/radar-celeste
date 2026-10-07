const express = require ('express');
const app = express();
const axios = require('axios');
app.use(express.json());
const avistamentos = {};
let contador = 0;
app.get ('/avistamentos', (req, res) => {
    res.send(avistamentos);
});
app.put('/avistamentos', async (req, res) => {
    const { local, descricao } = req.body;
    if (local === undefined) {
    return res.status(400).send({
        erro: "local e descricao são obrigatórios"
    });
}

if (descricao === undefined) {
    return res.status(400).send({
        erro: "local e descricao são obrigatórios"
    });
}

if (local === "") {
    return res.status(400).send({
        erro: "local e descricao são obrigatórios"
    });
}

if (descricao === "") {
    return res.status(400).send({
        erro: "local e descricao são obrigatórios"
    });
}
contador++;

avistamentos[contador] = {
    id: contador,
    local,
    descricao
};

await axios.post('http://localhost:10000/eventos', {
    tipo: "AvistamentoCriado",
    dados: {
        id: contador,
        local,
        descricao
    }
});

res.status(201).send(avistamentos[contador]);
});
app.post("/eventos", (req, res) => {
    console.log("Evento recebido: " + req.body.tipo);
    res.status(200).send({ msg: "ok" });
});
app.listen(4000, () => {
console.log('Avistamentos. Porta 4000');
});