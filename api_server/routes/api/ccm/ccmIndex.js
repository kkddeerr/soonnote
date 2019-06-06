const router = require('express').Router();
const ccmController = require('./ccmController'); 

//router.get('/getAllLocation', userController.getAllLocation);
console.log('ccmIndex');
router.get('/getCCMList', ccmController.getCCMList);
module.exports = router;