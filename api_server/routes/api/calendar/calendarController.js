const eventListener = require('./../../../events/eventIndex');
const querys = require('./../../../apiServerQuerys');
const commonModule = require('./../../../modules/commonModule');


/**
 * Calendar Api
 * @param req
 * @param res
 */
exports.insertCalendarData = function(req,res){
    
    //CA_ID,CA_EVDATE,CA_STEXT,CA_ERDATE,CA_AEDATE,CA_USEYN
    //아이디,이벤트날짜,이벤트문구,생성날짜,수정날짜,사용유무

    var pool = require('./../../../DBConnect/mariaDBPool').pool;
    //console.log("insertCalendarData API Request");
    //post: console.log(req.body);
    //get : console.log(req.query);
    var value = [];

        //value.push(req.body.CA_ID);
        value.push("kderr2791");
        value.push(req.body.CA_EVDATE);
        value.push(req.body.CA_STEXT);
        value.push(commonModule.time.getFullTime());
        value.push(commonModule.time.getFullTime());
        value.push('Y');
        
        pool.query(querys.insertCalendarInfo, value, function(err,rows){
            if(err) {
                commonModule.errResultJSON(err,res);
            } else {
                res.json({"Error" : false, "Message" : "Success" , "data" : []});
            }
        });
        // var value = [];
        //         value.push(baseDate);
        //         value.push(baseTime);
        //         value.push(userId);
        //         pool.query(querys.getTodayWeather, value, function(err,rows){
        //             if(err) {
        //                 commonModule.errResultJSON(err, res);
        //             } else {
        //                 if(rows.length > 0){
        //                     res.json({"Error" : false, "Message" : "Success", "data" : rows[0]});
        //                 }else{
        //                     res.json({"Error" : false, "Message" : "no Data check weather setting", "data" : []});
        //                 }
        //             }

        //         });

        //     }
        // } else {
        //     commonModule.clientSetErrorJSON("Setting Need Parameters", res);
        // }


};

exports.getCalendarData = function(req,res){

    var pool = require('./../../../DBConnect/mariaDBPool').pool;
    console.log("getCalendarData API Request");

    var value = [];

        //console.log(req.query);
        var param = req.query.CA_EVDATE + '%';
        
        value.push(param);
        
        pool.query(querys.getCalendarData, value, function(err,rows){
            if(err) {
                commonModule.errResultJSON(err,res);
            } else {
                //console.log(rows);
                res.json({"Error" : false, "Message" : "Success" , "data" : rows});
            }
        });

};

exports.deleteCalendarData = (req,res) => {
    var pool = require('./../../../DBConnect/mariaDBPool').pool;
    console.log("deleteCalendarData API Request");

    var value = [];

    var param = req.query.CA_NUM;

    value.push(param);

    pool.query(querys.deleteCalendarData, value, function(err,rows){
        if(err) {
            commonModule.errResultJSON(err,res);
        } else {
            //console.log(rows);
            res.json({"Error" : false, "Message" : "Success" , "data" : ""});
        }
    });



};