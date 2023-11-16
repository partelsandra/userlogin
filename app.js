// app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const pool = require('./db');

const app = express();
const port = 3000;

// Use bodyParser for JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.use('/', require('./routes/index')(pool, bcrypt));
app.use('/users', require('./routes/users')(pool, bcrypt));
app.use('/notes', require('./routes/notes')(pool)); // Add this line for the notes routes

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
