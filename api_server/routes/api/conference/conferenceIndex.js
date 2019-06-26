const router = require('express').Router();
const conferenceController = require('./conferenceController');

router.post('/confRegistry', conferenceController.confRegistry);

module.exports = router;