exports.errResultJSON = function (err, res) {
    logger.error(err);
    var errMsg = "";
    if(err.hasOwnProperty("code")){
        errMsg = err.code;
    }else{
        errMsg = err;
    }
    res.status(500).json({"Error" : true, "message": errMsg});
};

exports.clientSetErrorJSON = function (msg, res) {
    res.status(400).json({"Error" : true, "message" : msg});
};

/**
 * 객체를 복사하여 리턴
 * @param obj
 * @returns {*}
 */
exports.objClone = function (obj) {
    var self = this;
    if (obj === null || typeof(obj) !== 'object')
        return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            copy[attr] = self.objClone(obj[attr]);
        }
    }
    return copy;
};