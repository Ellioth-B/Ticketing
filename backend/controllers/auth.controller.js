const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

//Import le pool contenant les data pour ce connecter a la BDD
const pool = require('../db');

router.post('/login', async (req, res) => {
    const { username, pwd } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (!user || !bcrypt.compareSync(pwd, user.pwd)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, 'SECRET_KEY');

    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
});

module.exports = router;
