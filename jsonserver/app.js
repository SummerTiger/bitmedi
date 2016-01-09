var zerorpc = require('zerorpc');
var client = new zerorpc.Client();
client.connect("tcp://127.0.0.1:4242");


var express = require('express');
var qr = require('./qr.js');
var utils = require('./utils.js');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/login/:id',function(req,res) {
    res.jsonp({
	'id':req.params.id,
	'entries':['ff3f4036a1164d1ddbad5b3edf9022addb3e1961a54a922708a6c1ffc49e5489',
			 'bcb4fe6563d225fbc7b0e90571fc670f1ee197f18ba18e52a39c2ca80672812f',
			 '525249d77dfd2e55298f1042f5e6bc69c42beb8c268f32786656dcaa90789c41'
			 ]});
});

app.get('/login2/:id',function(req,res){
    var id = req.params.id;
    client.invoke("login",id,function(err,result,more) {
	res.jsonp({
	    'id':id,
	    'entries':result
	});
    });
})

app.get('/showaddr',function(req,res){
    client.invoke("showAddress",function(err,result,more){
	res.jsonp(result);	    
    });
})

app.get('/query/:hash',function(req,res) {
    res.send({'encryptedData':'an2Zva28wv/3xmBNokaus6pFwBRZ/BlCGrFkkx/Ck7YedtAWHWAkBQ=='});
});

app.post('/append',function(req,res) {
    console.log(req.body);
    res.send(req.body);
});

app.get('/hello',function(req,res){
    res.json({ 'user':'test-user',
	       'age':60,
	       'data':'balahbalah'
	     });
});

app.get('/user/:id',function(req,res){
    res.json({ 'id':req.params.id,
	       'data':'testdata'
	     });
});


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get('/detail/:id',function(req,res){
    res.json({ 'data': [getRandomInt(0,5),getRandomInt(0,5),getRandomInt(0,5),getRandomInt(0,5),getRandomInt(0,5)] });
});

app.get('/getQR', function(req,res) {
    data = req.query.data;
    if (data!=null) {
	qr.genQRCode(data,function(base64){
	    var imageData = utils.decodeBase64Image(base64);
console.log(imageData);
	    res.writeHead(200, {'Content-Type': 'image/png' });
	    res.end(imageData.data, 'binary');
	});
    } else {
	res.send("");
    }
});

app.listen(3000,function(){
    console.log("Started");
});
