const router = require('express').Router();
const calendar = require('./calendar/calendarIndex');
const user = require('./user/userIndex');
const ccm = require('./ccm/ccmIndex');
const board = require('./board/boardIndex');
<<<<<<< HEAD
=======
const conference = require('./conference/conferenceIndex');
>>>>>>> fcea43de76d2683be554a73aa56ebc75a89c1ea6

console.log("API route init");
// 캘린더 / 
router.use('/calendar', calendar);
// 유저
router.use('/user', user);
//CCM
router.use('/ccm',ccm);
// 게시판
router.use('/board',board);
<<<<<<< HEAD
=======
//router.use('/board',board);
// 수련회
router.use('/conference',conference);
>>>>>>> fcea43de76d2683be554a73aa56ebc75a89c1ea6

module.exports = router;  