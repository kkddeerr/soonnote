const router = require('express').Router();
const userController = require('./userController');

router.get('/getAllLocation', userController.getAllLocation);
router.get('/getLocSchools', userController.getLocSchools);

module.exports = router;