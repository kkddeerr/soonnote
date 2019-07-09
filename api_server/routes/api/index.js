const router = require('express').Router();
const calendar = require('./calendar/calendarIndex');
const user = require('./user/userIndex');
const ccm = require('./ccm/ccmIndex');
const board = require('./board/boardIndex');
const conference = require('./conference/conferenceIndex');

console.log("API route init");
// 캘린더 / 
router.use('/calendar', calendar);
// 유저
router.use('/user', user);
//CCM
router.use('/ccm',ccm);
// 게시판
router.use('/board',board);
//router.use('/board',board);
// 수련회
router.use('/conference',conference);

module.exports = router;  