/**
 * Created by xxx on 17-7-27.
 */
'use strict';
var express = require('express');
var app = express();

var redis = require("redis");
var client = redis.createClient();
client.on('connect',function () {
    console.log('connected');

})
client.set("count",0,function(err,response){
    console.log(err,response);
});
app.get('/', function (req, res) {
    client.incrby("count",1);
    client.get("count",function (err,response) {
        res.send(response);
    })
})
var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port);
})