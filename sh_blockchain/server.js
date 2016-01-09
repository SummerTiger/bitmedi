/**
 * Created by kimi on 2015/11/19.
 */
var app = require('express')();
var server = require('http').Server(app);


var express = require('express');

app.set('view engine', 'ejs');
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

var request = require('request');
var path = require('path');



var server = app.listen(3002, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

var remote = "http://139.196.190.15:3000/"
var async = require("async");
/*
 app.get('/', function (req, res) {
 res.sendfile(__dirname + '/index.html');
 });

 */


function getcomments() {
    return function(notify) {



        request('http://139.196.190.15:3000/user/hello', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(typeof(body)); // Show the HTML for the Google homepage.
                console.log(body); // Show the HTML for the Google homepage.
                var body2 = JSON.parse(body);
                console.log(body2);
                //console.log(JSON.stringify(body2));

                var obj = {
                    'name' : body2

                };

                notify(null, obj);
            }
        });






    };
}


function co(gen) {
    var g = gen();
    function next(err, data) {
        var res;
        if(err) {
            return g.throw(err);
        } else {
            res = g.next(data);
        }
        if(!res.done) {
            res.value(next)
        }
    }
    next();
}


function * withYield() {

    var data = yield getcomments();
    console.log(data);

    var bodyParser = require('body-parser');

    app.use(bodyParser());

    app.get('/blockchain', function(req, res) {

        res.render('blockchain', { cargo : data

        });

    });

    app.get('/', function(req, res){
        // The form's action is '/' and its method is 'POST',
        // so the `app.post('/', ...` route will receive the
        // result of our form
        var html = '<form action="/" method="post">' +
            'Enter your name:' +
            '<input type="text" name="inputID" placeholder="..." />' +
            '<br>' +
            'Enter your password:' +
            '<input type="text" name="inputKey" placeholder="..." />' +
            '<br>' +
            '<button type="submit">Submit</button>' +
            '</form>';

        res.send(html);
    });

    app.post('/', function(req, res){
        var ID = req.body.inputID;
        var Key = req.body.inputKey;
	request(remote+"login2/"+ID, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
		var bodyJson = JSON.parse(body);
		var entries = bodyJson.entries;
		async.map(entries,
			  function(entry,callback) {
			      request(remote+"query/"+entry,function(err,qRes,qBody){
				  var qbodyJson;
				  try { 
				      qbodyJson = JSON.parse(qBody)
				      try {
					  var plainText = JSON.parse(decrypt(qbodyJson.encryptedData,Key))
					  callback(null,plainText);
				      } catch(e) {
					  callback("Bad data decrypted",null);
				      }
				  } catch(e) {
				      callback("Entry not found",null);
				  }
			      });
			  },
			 function(err,results){
			     if (err!=null) {
				 // alert("Key Error!");
				 console.log(err);
				 console.log(results);
				 res.redirect("/");
			     } else {
				 console.log(results);
				 res.render('blockchain',{cargo:[ {'name':'AIDS','age':'88'},
								  {'name':'Syphil','age':'38'},
								  {'name':'Hysteric','age':'18'},
								  {'name':'FAT','age':'8'},
								  {'name':'PIG','age':'58'}
								]});
			     }
			 });
	    } else {
		// alert("Server is temporarily down. You can still get your data back. ");
	    }
	})
	

    });





}

co(withYield);


