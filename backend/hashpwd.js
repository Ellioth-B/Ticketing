// Permet de "hasher" tout les mdp de tout les user dans la BDD
// Run : node hashpwd.js 

const { Pool } = require('pg');
const bcryptjs = require('bcryptjs');
// Connexion PostgreSQL
const pool = new Pool({
  user: 'postgres',       // ton user pgAdmin
  host: 'localhost',
  database: 'Angular18',  // nom de la base
  password: 'admin',      // ton mot de passe
  port: 5432
});

async function hashAllPasswords() {
  const users = await pool.query('SELECT id, pwd FROM users');

  for (const user of users.rows) {
    const hash = await bcryptjs.hash(user.pwd, 10);

    await pool.query(
      'UPDATE users SET pwd = $1 WHERE id = $2',
      [hash, user.id]
    );

    console.log(`User ${user.id} hashé`);
  }

  console.log('Tous les mots de passe ont été hashés');
  pool.end();
}

hashAllPasswords();