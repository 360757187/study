const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const http = require('http');
const qs = require('querystring');

const playerModel = mongoose.model('PlayersSchema');

router.get('/', function (req, res) {
    res.send('欢迎来到express！')
})


//新增球员信息
router.post('/addPlayer',async function (req, res) {
    // const playerList = JSON.parse(req.body.playerList); 
    const playerList = req.body.playerListy; 
    const data = await new Promise(function (resolve, reject) {
        playerModel.insertMany(playerList, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(data);
})


//获取球员信息
router.post('/getPlayers',async function (req, res) {
    const data = await new Promise(function (resolve, reject) {
        playerModel.find({}, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(data);
})

//http.request
router.post('/request', function (req, res) {
    console.log(req.body)
    const data = qs.stringify({});
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/players/getPlayers',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'Content-Length': Buffer.byteLength(data)
        }
    };
    new Promise(function (resolve, reject) {
        let result = '';
        const reqs = http.request(options,async (res) => {
            console.log(`状态码: ${res.statusCode}`);
            console.log(`响应头: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data',async (chunk) => {
                resolve(result += chunk);
            });
            res.on('end', () => {
                console.log('响应数据。');
            });
        });
        
        reqs.on('error', (e) => {
            console.error(`请求遇到问题: ${e.message}`);
        });
        
        // 写入数据到请求主体
        reqs.write(data);
        reqs.end();
    }).then(result => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(result);
    })
})

//http.qryInquiryBillList
router.post('/qryInquiryBillList', function (req, res) {
    console.log(typeof req.body)
    console.log(req.body._call)
    console.log(req.body.params)
    const data = qs.stringify({});
    const options = {
        hostname: 'api.douban.com',
        // port: 8081,
        path: '/v2/movie/top250?start=1&count=2',
        // method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'Content-Length': Buffer.byteLength(data)
        }
    };
    new Promise(function (resolve, reject) {
        let result;
        const reqs = http.request(options,async (res) => {
            console.log(`状态码: ${res.statusCode}`);
            console.log(`响应头: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data',async (chunk) => {
                resolve(result = chunk);
            });
            res.on('end', () => {
                console.log('响应数据。');
            });
        });
        
        reqs.on('error', (e) => {
            console.error(`请求遇到问题: ${e.message}`);
        });
        
        // 写入数据到请求主体
        reqs.write(data);
        reqs.end();
    }).then(result => {
        console.log('返回数据了')
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(JSON.stringify(result));
    })
})



module.exports = router;