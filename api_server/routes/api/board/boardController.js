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
 * 모든 BOARDLIST 조회
 * @returns json
 */
exports.getBOARDList = (req, res) => {
  
    let pool = require('./../../../DBConnect/mariaDBPool').pool;
    console.log("getBOARDList API Request"); 

    pool.query(querys.getBOARDList, (err, rows) => {  
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
 * 게시글 등록
 * @param POST
 */
exports.boardReg = (req, res) => {
    let pool = require('./../../../DBConnect/mariaDBPool').pool;
    console.log("boardReg API Request"); 
    console.log(req.body); 
    // 쿼리 prepared statement
    let value = [];
    value.push(req.body.BOARD_TITLE);
    value.push(req.body.BOARD_WRITER);
    value.push(req.body.BOARD_CONTENT);

    pool.query(querys.insertBOARDList, value, (err, rows) => {
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
 * 게시글 읽기
 * @param GET
 */
exports.getBoardDetail = (req, res) => {
    let pool = require('./../../../DBConnect/mariaDBPool').pool;
    console.log("boardDetail API Request"); 
    // 쿼리 prepared statement
    let value = [];
    value.push(req.query.BOARD_NO);
    pool.query(querys.getBoardDetail, value, (err, rows) => {
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