const router = require('express').Router();
const boardController = require('./boardController');

console.log('boardIndex');
router.get('/getBoardList', boardController.getBOARDList);
router.post('/boardReg', boardController.boardReg);
router.get('/getBoardDetail', boardController.getBoardDetail);
module.exports = router; 