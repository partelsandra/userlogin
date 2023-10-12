const express = require('express');
const router = express.Router();

module.exports = (pool, bcrypt) => {
    router.get('/', (req, res) => {
        res.sendFile(__dirname + '/../public/index.html');
    });

    router.get('/login', (req, res) => {
        res.sendFile(__dirname + '/../public/login.html');
    });

    return router;
};
