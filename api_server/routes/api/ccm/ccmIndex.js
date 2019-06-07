const router = require('express').Router();
const ccmController = require('./ccmController'); 

//router.get('/getAllLocation', userController.getAllLocation);
console.log('ccmIndex');
router.get('/getCCMList', ccmController.getCCMList);
router.get('/ccmReg', ccmController.ccmReg);

module.exports = router; 