const eventListener = require('./../../../events/eventIndex');
const querys = require('./../../../apiServerQuerys');
const commonModule = require('./../../../modules/commonModule');

/**
 * Conference API
 * 수련회 관련 API
 * @param req
 * @param res
 */

 /**
  * 수련회 신청
  * @param POST
  * @return json
  */
 exports.confRegistry = (req, res) => {
    let pool = require('./../../../DBConnect/mariaDBPool').pool;
    console.log("confRegistry API Request");

    // 쿼리 prepared statement
    let value = [];
    value.push(req.body.conf_no);
    value.push(req.body.app_id);
    value.push(req.body.app_name);
    value.push(req.body.app_phone);
    value.push(req.body.sc_num);

    pool.query(querys.confRegistry, value, (err, rows) => {
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