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
 * 모든 지역 정보 반환
 * @returns json
 */
//exports.getAllLocation = (req, res) => {
    exports.getCCMList = (req, res) => {
  
// LOC_NUM, LOC_NAME
    // 지역번호, 지역이름

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