const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});


mongoose.connection.on("error", function (error) {

    console.log("数据库连接失败：" + error);

});

mongoose.connection.on("open", function () {

       console.log("------数据库连接成功！------");

});