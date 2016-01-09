var express = require('express');
var qr = require('./qr.js');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/hello',function(req,res){
    res.json({ 'user':'test-user',
	       'age':60,
	       'data':'balahbalah'
	     })
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
    console.log(data);
    if (data!=null) {
	qr.genQRCode(data,function(base64){
	    res.send(base64);
	});
    } else {
	res.send("");
    }
});

app.listen(3000,function(){
    console.log("Started");
});
