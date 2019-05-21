const router = require('express').Router();
const calendarController = require('./calendarController');

router.post('/insertCalendarData',  calendarController.insertCalendarData);
router.get('/getCalendarData', calendarController.getCalendarData);

module.exports = router;