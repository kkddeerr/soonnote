const router = require('express').Router();
const ccmController = require('./ccmController'); 

//router.get('/getAllLocation', userController.getAllLocation);
console.log('ccmIndex');
router.get('/getCCMList', ccmController.getCCMList);
router.post('/ccmReg', ccmController.ccmReg);
router.get('/getNewCcmKey',ccmController.getNewCcmKey);
router.get('/getCCMDetail',ccmController.getCCMDetail);
router.get('/getYoutubeLink',ccmController.getYoutubeLink);
module.exports = router;   