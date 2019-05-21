const eventListener = require('./../../../events/eventIndex');
const querys = require('./../../../apiServerQuerys');
const commonModule = require('./../../../modules/commonModule');


/**
 * Calendar Api
 * @param req
 * @param res
 */
exports.insertCalendarData = function(req,res){
    console.log("insertCalendarData API Request");

        var pool = require('./../../../DBConnect/mariaDBPool').pool;
        var value = [];
        var baseDate = req.query["baseDate"] ? req.query["baseDate"] : null;
        var baseTime = req.query["baseTime"] ? req.query["baseTime"] : null;
        if(baseDate !== null && baseTime !== null) {
            var errString = '';
            if(typeof baseDate !== 'string'){
                errString +='baseDate';
            }
            if(typeof baseTime !== 'string'){
                errString += ' baseTime';
            }

            if(errString !== ''){
                commonModule.clientSetErrorJSON(errString + " Parameter is only Enable String Type", res);
            }else{
                logger.debug("getTodayWeather : params : baseDate => ["+ baseDate + "], baseTime=> ["+baseTime+"]");
                value.push(baseDate);
                value.push(baseTime);
                value.push(userId);
                pool.query(querys.getTodayWeather, value, function(err,rows){
                    if(err) {
                        commonModule.errResultJSON(err, res);
                    } else {
                        if(rows.length > 0){
                            res.json({"Error" : false, "Message" : "Success", "data" : rows[0]});
                        }else{
                            res.json({"Error" : false, "Message" : "no Data check weather setting", "data" : []});
                        }
                    }

                });

            }
        } else {
            commonModule.clientSetErrorJSON("Setting Need Parameters", res);
        }


};