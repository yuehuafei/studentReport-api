/**
 * Created by xxx on 17-7-27.
 */
'use strict';
var express = require('express');
var redis = require('redis');
var bodyParser = require('body-parser');
const client = redis.createClient();
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*
 client.hmset(hash, obj, [callback])：赋值操作，第一个参数是hash名称；第二个参数是object对象，其中key1:value1。。,keyn:valuen形式；第三个参数是可选回调函数

 　　client.hmset(hash, key1, val1, ... keyn, valn, [callback])：与上面做用一致，第2个参数到可选回调函数之前的参数都是key1, val1, ... keyn, valn形式；

 　　client.hgetall(hash, [callback])：获取值操作，返回一个对象
 */
app.post('/add-anything', (req, res) => {
    const userName = req.body.userName;
    const age = req.body.age;
    client.hmset("formData", {
        "userName": userName,
        "age": age
    })
    client.hgetall("formData", (err, resObj) => {
        console.dir(resObj);
        res.send(resObj);
    });

});
app.get('/add-anything',(req,res) =>{
    client.hgetall("formData", (err, resObj) => {
        console.dir(resObj);
        res.send(resObj);
    });
});
var server=app.listen(8082,function(){
    var host=server.address().address;
    var port=server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
})
