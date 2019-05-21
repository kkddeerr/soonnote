
var isLocal = false;


var config = {
    apiServerDB : {
        host : '222.117.225.28', 
        user     : 'root',  
        password : '1', // 
        database : 'soonnote',
        debug    :  false,
        connectionLimit:100,  
        queueLimit : 10000,
        port : 8081,
        waitForConnections:false
    },

    webServerPort : 8091,
    apiServerPort : 8071
};

if(isLocal){
    config.apiServerDB.host = '127.0.0.1';

}

module.exports = config;
