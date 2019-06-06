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
exports.getAllLocation = (req, res) => {
    // LOC_NUM, LOC_NAME
    // 지역번호, 지역이름

    let pool = require('./../../../DBConnect/mariaDBPool').pool;
    console.log("getAllLocation API Request");

    pool.query(querys.getAllLocations, (err, rows) => {
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
 * 지역 번호에 따른 학교 반환
 * @param loc_num
 * @return json
 */
exports.getLocSchools = (req, res) => {
    // SC_NUM, SC_NAME
    // 학교번호, 학교이름

    let pool = require('./../../../DBConnect/mariaDBPool').pool;
    console.log("getLocSchools API Request");

    // 쿼리 prepared statement
    let value = [];
    value.push(req.query.loc_num);

    pool.query(querys.getLocSchools, value, (err, rows) => {
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
 * 아이디 중복체크
 * @param checkID
 * @return json
 */
exports.dupleCheck = (req, res) => {
    let pool = require('./../../../DBConnect/mariaDBPool').pool;
    console.log("dupleCheck API Request");

    // 쿼리 prepared statement
    let value = [];
    value.push(req.query.checkID);

    pool.query(querys.dupleCheck, value, (err, rows) => {
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
 * 회원가입
 * @param POST
 */
exports.joinUser = (req, res) => {
    let pool = require('./../../../DBConnect/mariaDBPool').pool;
    console.log("joinUser API Request");

    // 쿼리 prepared statement
    let value = [];
    value.push(req.body.user_id);
    value.push("password("+req.body.user_pw+")");
    value.push(req.body.user_name);
    value.push(req.body.user_hak);
    value.push(req.body.sn_code);
    value.push(3);

    pool.query(querys.joinUser, value, (err, rows) => {
        if(err) {
            commonModule.errResultJSON(err, res);
        } else {
            res.redirect('http://222.117.225.28:8091/#/');
        }
    });
}