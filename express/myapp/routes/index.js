var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

//使用一个函数处理路由
router.get('/example/a', function (req, res, next) {
  res.send('Hello from B!');
});

//使用多个函数处理路由
router.get('/example/b', function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});

//使用函数组处理路由
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

router.get('/example/c', [cb0, cb1, cb2]);

//函数和函数组混合使用处理路由
var cb0 = function (req, res, next) {
  console.log('哎呀，马上完了！');
  next();
}

var cb1 = function (req, res, next) {
  res.send('哈哈哈，我是输出，不是hello world！');
}

router.get('/example/d', function (req, res, next) {
  console.log('start!!!');
  next();
}, function (req, res, next) {
    console.log('CB0');
    next();
}, [cb0, cb1],);



module.exports = router;
