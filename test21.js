/**
 * Created by xxx on 17-7-28.
 */
'use strict';
var express = require('express');
var redis = require('redis');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/index.html',(req,res) =>{
    res.sendFile( __dirname + "/" + "index.html" );
});
app.post('/add-anything',(req,res) =>{
    var response={
        "userName":req.body.userName,
        "age":req.body.age
    }
    console.log(response);
    res.end(JSON.stringify(response));
});
var server=app.listen(8081,function(){
    var host=server.address().address;
    var port=server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
})