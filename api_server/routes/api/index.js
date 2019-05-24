const router = require('express').Router();
const calendar = require('./calendar/calendarIndex');
const user = require('./user/userIndex');

console.log("API route init");

// 캘린더 / 
router.use('/calendar', calendar);

// 유저
router.use('/user', user);

module.exports = router;