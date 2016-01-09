/**
 * Created by kimi on 15/7/5.
 */

//console.log(client_name );


var d3 = require('d3');


var _ = require('lodash');



console.log(data.name);

//var svg3 = d3.select("#p3");
var svg2 = d3.select("#p2");

function getlistdata() {
    return function(notify) {


        $.getJSON("http://139.196.190.15:3000/login/1?callback=?",
            function(data) {
                entries = data.entries;
                console.log(entries);
                notify(null, entries);

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

    var list = yield getlistdata();
    console.log("list");
    console.log(list);

    var svg1 = d3.select("#p1");

    var svg11 = svg1
        .append("g")
        .attr("transform", "translate(0,0)");

    svg11.append("rect")
        .attr("x", 250)
        .attr("y", 0)
        .attr("width", 900)
        .attr("height", 20)
        .style("fill", "gray");

    /*
    svg11.append("image")
        .attr("xlink:href", "blockjs/2.jpg")
        .attr("x", "10")
        .attr("y", "20")
        .attr("width", "200")
        .attr("height", "200");
    */


    svg11.append("text")
        .attr("x", 80)
        .attr("y", 250)
        .text( "初夏虎")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "blue");

    svg11.append("text")
        .attr("x", 250)
        .attr("y", 50)
        .text( "當前既有病歷")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "black");

    svg11.selectAll("text2")
        .data(entries)
        .enter()
        .append("text")
        .attr("x", function(d) { return 250; })
        .attr("y", function(d,i) {
            console.log(i);
            console.log(d);
            return 100+i*30; })
        .text( function (d) { return d; })
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "red");





}

co(withYield);

$('#myModal').modal('show');













