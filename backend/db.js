//Fichier contenant les data pour ce connecter la BDD
const { Pool } = require('pg');

// Connexion PostgreSQL
const pool = new Pool({
  user: 'postgres',       // ton user pgAdmin
  host: 'localhost',
  database: 'Angular18',  // nom de la base
  password: 'admin',      // ton mot de passe
  port: 5432
});

module.exports = pool;