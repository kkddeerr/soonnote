var express = require('express'); 
var opener = require('opener');
var app = express();
var xFrameOptions = require('x-frame-options')
var session = require('express-session');

var bodyParser  = require("body-parser");

var config =  require('./../serverConfig'),
    port = config.webServerPort;


var changeDir = __dirname.replace(/\web_server/g,'');
//__dirname은 node에서 제공, 뒤는 정규식

app.use(express.static(changeDir + 'public'));
app.use(xFrameOptions());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//opener("http://localhost:8091");
app.use(session({
    secret: 'soonnote',
    resave: false,
    saveUninitialized: true
}));

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

app.post('/setsession', function (req, res) {
    sess = req.session;
    sess.jwtoken = req.body.jwtoken;

    res.json({
        "Error" : false,
        "Message" : "Success",
        "data" : ""
    });
});

app.get('/getsession', function (req, res) {
    sess = req.session;

    if(typeof(sess.jwtoken) !== "undefined") {
        res.json({
            "Error" : false,
            "Message" : "Success",
            "data" : sess.jwtoken
        });
    } else {
        res.json({
            "Error" : true,
            "Message" : "Fail",
            "data" : "세션이 존재하지 않습니다."
        });
    }
});

try{
    app.listen(port);
}catch(error){
    console.log(err);
}
 
console.log("App Server Start Listen on port : " + port);

