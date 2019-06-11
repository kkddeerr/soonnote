const eventListener = require('./../../../events/eventIndex');
const querys = require('./../../../apiServerQuerys');
const commonModule = require('./../../../modules/commonModule');

/**
 * Join API
 * 사용자 (가입) 관련 API
 * @param req
 * @param res
 */

/**
 * 모든 CCMLIST 조회
 * @returns json
 */
//exports.getAllLocation = (req, res) => {
exports.getCCMList = (req, res) => {
  
    let pool = require('./../../../DBConnect/mariaDBPool').pool;
    console.log("getCCMList API Request"); 

    pool.query(querys.getCCMList, (err, rows) => {  
        if(err) {
            commonModule.errResultJSON(err, res);
        } else {
            res.json({
                "Error" : false,
                "Message" : "Success",
                "data" : rows
            });
        }
    });
}

/** 
 * ccm게시판 등록
 * @param POST
 */
exports.ccmReg = (req, res) => {
    let pool = require('./../../../DBConnect/mariaDBPool').pool;
    console.log("ccmReg API Request"); 
    console.log(req.body); 
    // 쿼리 prepared statement
    let value = [];
    value.push(req.body.CM_ID);
    value.push(req.body.CM_TITLE);
    value.push(req.body.CM_LYRICS);
    value.push(req.body.CM_CONTENT);
    value.push(req.body.CM_SINGER);
    value.push(req.body.CM_IMAGE);
    value.push(req.body.CM_SONG);
    value.push(req.body.CM_THEME);
    value.push(req.body.CM_USER);

    pool.query(querys.insertCCMList, value, (err, rows) => {
        if(err) {
            commonModule.errResultJSON(err, res);
        } else {
            res.json({
                "Error" : false,
                "Message" : "Success",
                "data" : rows
            });
        }
    });
}

//getNewCcmKey

/**
 * CCMLIST 입력전 기존 마지막 키값 조회.
 * @returns json
 */
exports.getNewCcmKey = (req, res) => {

    let pool = require('./../../../DBConnect/mariaDBPool').pool;
    console.log("getNewCcmKey API Request"); 

    pool.query(querys.getNewCcmKey, (err, rows) => {  
        if(err) {
            commonModule.errResultJSON(err, res);
        } else {
            res.json({
                "Error" : false,
                "Message" : "Success",
                "data" : rows
            });
        }
    });
}

//getCCMDetail
/**
 * CCM 상세조회.
 * @returns json
 */
exports.getCCMDetail = (req, res) => {
  
    let pool = require('./../../../DBConnect/mariaDBPool').pool;
    console.log("getCCMDetail API Request"); 
    //쿼리 조건 절 셋팅
    let value = [];
    value.push(req.query.cmId); 
    pool.query(querys.getCCMDetail, value, (err, rows) => {  
        if(err) {
            commonModule.errResultJSON(err, res);
        } else {
            res.json({
                "Error" : false,
                "Message" : "Success",
                "data" : rows
            });
        }
    });
}