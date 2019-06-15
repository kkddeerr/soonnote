var express = require('express'); 
var opener = require('opener');
var app = express();
var xFrameOptions = require('x-frame-options')

var bodyParser  = require("body-parser");

var config =  require('./../serverConfig'),
    port = config.webServerPort;


var changeDir = __dirname.replace(/\web_server/g,'');
//__dirname은 node에서 제공, 뒤는 정규식

app.use(express.static(changeDir + 'public'));
app.use(xFrameOptions());
//opener("http://localhost:8091");

app.get('/', function (req, res) {
    
    res.get('sameorigin') ; 
    try{
        
        res.render('index.html'); 
        //express.static으로 경로없이 
        //index.html로 접근 가능    
    
    }catch(err){
        console.log(err);
    }
});

try{
    app.listen(port);
}catch(error){
    console.log(err);
}
 
console.log("App Server Start Listen on port : " + port);

