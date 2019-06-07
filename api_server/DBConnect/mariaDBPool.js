const serverEvent = require('./../events/eventIndex');
/**
 * mariaDB Connection
 * @param event
 * @param next
 */
function mariaDBConnect(next) {
    var mysql = require("mysql"),
        config = require('./../../serverConfig'),
        poolInfo = config.apiServerDB;

    var pool = mysql.createPool(poolInfo);

    pool.getConnection(function(err,connection){
        if(err) {
            console.log("Connection Error");
            console.log(err);
            serverEvent.emit("serverStop", err, pool);
        } else {
            console.log("DB Pool OK");

            if(pool._freeConnections.indexOf(connection) < 0){
                connection.release();
            }

            // export
            exports.pool = pool;
            exports.connection = connection;

            next(connection,pool);
        }
    });
    
}

exports.mariaDBConnect = mariaDBConnect;

