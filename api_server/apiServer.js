var express = require("express"),           // 4
    bodyParser  = require("body-parser"),   // api 통신 규격
    cors = require('cors'),
   // Youtube = require("youtube-node"),
    serverEvent = require("./events/eventIndex");   
var config = require("./../serverConfig");
var app  = express();

var server = null;

/**
 * Express 세팅
 * @param next {function}
 */
var configureExpress = function (next) {
    console.log("Router Setting");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    
    // DB Connection
    var mariaDBConnect = require("./DBConnect/mariaDBPool").mariaDBConnect;
    mariaDBConnect(function (connection,pool) {
        var apiRouter = require("./routes/api/index");
        app.use('/api', apiRouter);
        console.log("Router Setting End");
        if(next !== undefined && typeof(next) === "function"){
            next();
        }
    });
};

/**
 * server 시작 및 DB 세팅
 */
var serverStart = function (expressConfig,next) {
    server =  app.listen(config.apiServerPort,function(err){
        console.log("RESTFul API Server Start Listen on Port : " + config.apiServerPort);

        if(expressConfig !== undefined && typeof(expressConfig) === "function"){
            expressConfig(next);
        }else{
            if(next !== undefined && typeof(next) === "function"){
                next();
            }
        }
    });
};
  
/**
 * 서버 정지
 */
var serverStop = function (err, pool, next) {
    if(err){
        console.log("ISSUE WITH MYSQL \n" + err);
    }

    console.log("Pool Close");
    pool.end(function (err) {
        if(err){
            console.log("Connection Pool End process error");
            console.log(err);
        }
    });

    if(server !== null){
        server.close();
    }

    if(next !== undefined && typeof(next) === "function"){
        next();
    }

};

var serverReStart = function (err, pool) {
    console.log("server ReStart");
    async.waterfall([
        function (callback) {
        console.log("server Stop");
            serverStop(err,pool, callback);
        },function (callback) {
            console.log("server Start");
            serverStart(configureExpress, callback)
        }
    ],function (err) {
        if(err){
            console.log(err);
        }
    })

};


// 예외처리를 위함
serverEvent.on("serverStop",serverStop);
serverEvent.on("serverReStart",serverReStart);



serverStart(configureExpress);