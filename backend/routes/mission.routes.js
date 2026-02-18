const express = require('express');
const router = express.Router();

const missionController = require('../controllers/mission.controller')

// POST /mission/postMission
router.post('/postMission', missionController);

// GET /mission/getMission
router.get('/getMission', missionController);

module.exports = router;