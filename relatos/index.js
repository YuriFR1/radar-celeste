const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const relatosPorAvistamentoId = {};

app.put('/avistamentos/:id/relatos', (req, res) => {
    const idObs = uuidv4();
    const { texto } = req.body;

    const relatosDoAvistamento =
        relatosPorAvistamentoId[req.params.id] || [];

    relatosDoAvistamento.push({ id: idObs, texto, confirmacoes: 0 });

    relatosPorAvistamentoId[req.params.id] =
        relatosDoAvistamento;

    res.status(201).send(relatosDoAvistamento);
});

app.get('/avistamentos/:id/relatos', (req, res) => {
     res.send(relatosPorAvistamentoId[req.params.id] || []);

});
app.listen(4100, () => {
    console.log('Relatos. Porta 4100');
});