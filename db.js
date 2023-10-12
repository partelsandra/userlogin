const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'userlogin' // Andke siinsele andmebaasile õige nimi
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;
