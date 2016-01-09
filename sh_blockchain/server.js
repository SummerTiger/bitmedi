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

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});




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


    app.get('/blockchain', function(req, res) {

        res.render('blockchain', { cargo : data

        });

    });




}

co(withYield);



