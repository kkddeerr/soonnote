const router = require('express').Router();
const userController = require('./boardController');

console.log('boardIndex');
router.get('/getBoardList', userController.getBOARDList);
router.post('/boardReg', userController.boardReg);
module.exports = router; 