//Backend en NodeJS
//Logique NodsJS : Server.js -> Routes -> Controllers
// Start : node server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/auth.routes');
const missionRoutes = require('./routes/mission.routes')

//Import le pool contenant les data pour ce connecter a la BDD
const pool = require('./db');

// Routes auth. Toutes les routes auth commencent par /auth
app.use('/auth', authRoutes);

//Routes mission
app.use('/mission', missionRoutes)

// Lance le serveur
app.listen(3000, () => {
  console.log('🚀 API running on http://localhost:3000');
});
