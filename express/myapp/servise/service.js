const mongoose = require('mongoose');
const db = mongoose.connection;

require('./model/playersModel')

mongoose.connect("mongodb://localhost/players",{ useNewUrlParser: true });


db.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});

db.once("open", function () {
    console.log("------数据库连接成功！------");
});