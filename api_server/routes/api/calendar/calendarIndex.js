const router = require('express').Router();
const calendarController = require('./calendarController');

router.post('/insertCalendarData',  calendarController.insertCalendarData);

module.exports = router;