// routes/users.js
const express = require('express');
const router = express.Router();

module.exports = (pool, bcrypt) => {
    router.post('/register', async (req, res) => {
        try {
            const { username, email, password } = req.body;

            console.log('Registreerimine: Kasutajanimi -', username, 'E-post -', email, 'Salasõna -', password);

            // 1. Kontrolli, kas kasutajanimi ja e-posti aadress on juba olemas andmebaasis
            const [existingUser] = await pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);

            if (existingUser.length > 0) {
                return res.status(400).send('Kasutajanimi või e-posti aadress on juba kasutusel.');
            }

            // 2. Krüpteeri salasõna
            const hashedPassword = await bcrypt.hash(password, 10);

            // 3. Lisa uus kasutaja andmebaasi tabelisse
            await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

            // 4. Andke kasutajale teade ja suunake nad edasi sisselogimise lehele
            res.redirect('/login');
        } catch (error) {
            console.error('Registreerimise viga:', error);
            res.status(500).send('Midagi läks valesti.');
        }
    });

    router.post('/login', async (req, res) => {
        try {
            const { username, password } = req.body;

            console.log('Sisselogimine: Kasutajanimi -', username);

            // 1. Otsi kasutajat andmebaasist
            const [user] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

            if (user.length === 0) {
                return res.status(400).send('Kasutajat ei leitud.');
            }

            // 2. Võrdle sisestatud salasõna andmebaasis olevaga
            const passwordMatch = await bcrypt.compare(password, user[0].password);

            if (!passwordMatch) {
                return res.status(400).send('Vale salasõna.');
            }

            // 3. Looge sessioon, kui autentimine on õnnestunud
            req.session.user = user[0];
            // Redirect to the main notebook page after successful login
            res.redirect('/notes');
        } catch (error) {
            console.error('Sisselogimise viga:', error);
            res.status(500).send('Midagi läks valesti.');
        }
    });

    router.get('/logout', (req, res) => {
        // Logi kasutaja välja, kustutades nende sessioonivõtme
        req.session.destroy(() => {
            res.redirect('/login'); // Suunake kasutajad sisselogimise lehele pärast väljalogimist
        });
    });

    return router;
};
