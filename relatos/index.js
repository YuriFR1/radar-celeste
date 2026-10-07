const express = require('express');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const app = express();
app.use(express.json());

const relatosPorAvistamentoId = {};

app.put('/avistamentos/:id/relatos', async (req, res) => {
    const idObs = uuidv4();
    const { texto } = req.body;

    const relatosDoAvistamento =
        relatosPorAvistamentoId[req.params.id] || [];

    relatosDoAvistamento.push({ id: idObs, texto, confirmacoes: 0 });

    relatosPorAvistamentoId[req.params.id] =
        relatosDoAvistamento;

        await axios.post('http://localhost:10000/eventos', {
    tipo: "RelatoCriado",
    dados: {
        id: idObs,
        texto,
        confirmacoes: 0,
        avistamentoId: req.params.id
    }
});

    res.status(201).send(relatosDoAvistamento);
});

app.get('/avistamentos/:id/relatos', (req, res) => {
     res.send(relatosPorAvistamentoId[req.params.id] || []);

});
app.post("/eventos", (req, res) => {
    console.log("Evento recebido: " + req.body.tipo);
    res.status(200).send({ msg: "ok" });
});
app.listen(4100, () => {
    console.log('Relatos. Porta 4100');
});