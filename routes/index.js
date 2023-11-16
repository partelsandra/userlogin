const express = require('express');
const router = express.Router();

module.exports = (pool, bcrypt) => {
    router.get('/', (req, res) => {
        res.sendFile(__dirname + '/../public/index.html');
    });

    router.post('/login', (req, res) => {
        // Handle the login logic here using req.body
        // For example, you can access form data like this:
        // const username = req.body.username;
        // const password = req.body.password;

        // Add your login logic using the provided pool and bcrypt
        // Example (replace this with your actual login logic):
        // if (username === 'example' && password === 'password') {
        //     res.send('Login successful');
        // } else {
        //     res.send('Login failed');
        // }

        // Send a response based on the login result
        res.send('Login POST request received');
    });

    return router;
};
