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
    console.log("insertCalendarData API Request");
    //post: console.log(req.body);
    //get : console.log(req.query);
    var value = [];

        value.push(req.body.CA_ID);
        value.push(req.body.CA_EVDATE);
        value.push(req.body.CA_STEXT);
        value.push(req.body.CA_ERDATE);
        value.push(req.body.CA_AEDATE);
        value.push('Y');
        
        pool.query(querys.insertContactInfo, value, function(err,rows){
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