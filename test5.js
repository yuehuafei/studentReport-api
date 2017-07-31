/**
 * Created by xxx on 17-7-28.
 */
'use strict';

var express = require('express');
var redis = require('redis');
var bodyParser = require('body-parser');
const client = redis.createClient();
var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/" +"public/StudentReport.html");
    // let stu=[{
    //     stuNum:'1001', stuName:'岳华飞', stuClass:'计科1501班', math:90, Chinese:90, English:90, program:90, avg:90, total:360},
    //     {stuNum:'1002', stuName:'岳飞', stuClass:'计科1501班', math:90, Chinese:90, English:90, program:90, avg:90, total:360},
    //     {stuNum:'1003', stuName:'华飞', stuClass:'计科1501班', math:90, Chinese:90, English:90, program:90, avg:90, total:360}
    // ];
    // client.set('Students',JSON.stringify(stu), function(err, reply) {
    // });
    console.log("初始化成功！");
});

app.post('/addStudent',(req,res)=>{
    let find=0;
    var stu={
        "stuNum":req.body.stuNum,
        "stuName":req.body.stuName,
        "stuClass":req.body.stuClass,
        "math":req.body.math,
        "Chinese":req.body.Chinese,
        "English":req.body.English,
        "program":req.body.program,
        "avg":((parseFloat(req.body.math)+parseFloat(req.body.Chinese)+parseFloat(req.body.English)+parseFloat(req.body.program))/4).toFixed(2),
        "total":parseFloat(req.body.math)+parseFloat(req.body.Chinese)+parseFloat(req.body.English)+parseFloat(req.body.program)
    };
    client.get("Students", function(err, object) {
        let students=JSON.parse(object);
    for(var i=0;i<students.length;i++){
        if(students[i].stuNum==req.body.stuNum){
            find=1;
           console.log("该学生已存在！");
        }
    }
    if(find==0){
        // var strs=stuNum+" "+stuName+" "+stuClass+" "+math+" "+Chinese+" "+English+" "+program;
        // if(/^\d{4}\s[\u4E00-\u9FFF]{2,10}\s[\u4E00-\u9FFF]{2,20}\d{4}[\u4E00-\u9FFF]\s((\d\d?|100)\s){3}(\d\d?|100)$/.test(strs)) {
        //     var stu=new Student(stuNum,stuName,stuClass,math,Chinese,English,program);
            students.push(stu);
            client.set("Students",JSON.stringify(students),function (err,reply) {
                //console.log(reply);
            });
            console.log("学生添加成功");
        res.status(200).end();
        }
        // else{
        //     alert("输入格式不正确，请重新输入！");
        // }
    // }
    // })

    });
});

app.get('/allStudent',function (req,res) {
    client.get("Students", function(err, object) {
        let students=JSON.parse(object);
        res.send(students);
    });

})
app.post('/delStudent',function (req,res) {
    client.get("Students", function (err, object) {
        let students = JSON.parse(object);
        for (var i = 0; i < students.length; i++) {
            if (req.body.txt == students[i].stuNum) {
                students.splice(i, 1);
                client.set("Students", JSON.stringify(students))
                console.log("删除成功");
                res.send("删除成功！");
            }
        }

    });
});

/*
app.post('/students',(req,res)=> {
    res.set('Content-Type', 'text/javascript;charset=UTF-8');
    var str = req.body.stuInfo;
    var arr = [];
    if (/^(\d{4}\s)*\d{4}$/.test(str)) {
        var strnum = str.split(' ');
        // console.log("查询zhong！");
        for (var item of strnum) {
            if (client.get(item)) {
                client.get(item, function (err, response) {
                    res.send(response);
                });
            }
            else {
                res.send("该学生不存在！");
            }
        }
    }
    else {
        res.send("格式不正确,请按正确的格式输入要打印的学生的学号（格式： 学号 学号 …）");
        res.status(400);
    }

});
app.get('/student',(req,res) =>{
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
        var json=JSON.stringify(response);
        client.set("students",json);
        console.log(response);
        res.end(json);
    }
else{
    res.send("格式不正确！请重新输入");
}
});*/
var server=app.listen(8081,function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
