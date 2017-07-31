/**
 * Created by xxx on 17-7-28.
 */
'use strict';

var express = require('express');
var redis = require('redis');
var bodyParser = require('body-parser');
const client = redis.createClient();
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/student.html',(req,res) =>{
    res.sendFile( __dirname + "/" + "student.html" );
});
app.post('/student',(req,res) =>{
    res.set('Content-Type','text/javascript;charset=UTF-8');
    var response={
        "stuNum":req.body.stuNum,
        "stuName":req.body.stuName,
        "stuClass":req.body.stuClass,
        "math":req.body.math,
        "Chinese":req.body.Chinese,
        "English":req.body.English,
        "program":req.body.program
    };
    var strs=req.body.stuNum+" "+req.body.stuName+" "+req.body.stuClass+" "+req.body.math+" "+req.body.Chinese+" "
        +req.body.English+" "+req.body.program;
    //检测是否符合规范
    if(/^\d{4}\s[\u4E00-\u9FFF]{2,10}\s[\u4E00-\u9FFF]{2,20}\d{4}[\u4E00-\u9FFF]\s((\d\d?|100)\s){3}(\d\d?|100)$/.test(strs)){
        client.set(req.body.stuNum,response);
        console.log(response);
        res.end(JSON.stringify(response));
    }
    else{
        res.send("格式不正确！请重新输入");
    }
});
var server=app.listen(8081,function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});