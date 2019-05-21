const router = require('express').Router();
const calendar = require('./calendar/calendarIndex');

console.log("API route init");

// 캘린더 / 
router.use('/calendar', calendar);

module.exports = router;