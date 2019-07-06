const router = require('express').Router();
const calendarController = require('./calendarController');

router.post('/insertCalendarData',  calendarController.insertCalendarData);
router.get('/getCalendarData', calendarController.getCalendarData);
router.get('/deleteCalendarData', calendarController.deleteCalendarData);

module.exports = router;