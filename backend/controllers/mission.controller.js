const express = require('express');
const router = express.Router();

//Import le pool contenant les data pour ce connecter a la BDD
const pool = require('../db');

router.post('/postMission', async (req, res) => {
  const { type, projet, durationDay, description } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO mission (type, projet, durationday, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [type, projet, durationDay, description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erreur SQL:', err);
    res.status(500).send('Erreur lors de l’insertion');
  }
});

router.get('/getMission', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mission ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la récupération');
  }
});

router.delete('/deleteMission/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.query('DELETE FROM mission WHERE id = ($1) ', [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la supression');
  }
});

module.exports = router;