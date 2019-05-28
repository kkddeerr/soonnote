const router = require('express').Router();
const userController = require('./userController');

router.get('/getAllLocation', userController.getAllLocation);
router.get('/getLocSchools', userController.getLocSchools);
router.get('/dupleCheck', userController.dupleCheck);

module.exports = router;