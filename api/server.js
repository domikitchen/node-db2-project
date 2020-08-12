const express = require('express');
const helmet = require('helmet');

const carsRouter = require('../routers/cars-router.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h2>Navagate to /api/cars</h2>`);
});

server.use('/api/cars', carsRouter);

module.exports = server;
