const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/eventos', (req, res) => {
    const evento = req.body;

    axios.post('http://localhost:4000/eventos', evento)
        .catch((err) => {
            console.log('Falha na porta 4000');
        });

    axios.post('http://localhost:4100/eventos', evento)
        .catch((err) => {
            console.log('Falha na porta 4100');
        });

    res.status(200).send({ msg: "ok" });
});

app.listen(10000, () => {
    console.log('Barramento de eventos. Porta 10000.');
});