const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const http = require('http');
const qs = require('querystring');

//http.qryInquiryBillList
//http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.radio.getChannelSong&format=json
router.get('/', function (req, res) {
    // const data = qs.stringify({});
    const options = {
        hostname: 'tingapi.ting.baidu.com',
        // port: 8081,
        path: '/v1/restserver/ting?method=baidu.ting.radio.getChannelSong&format=json',
        // method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'Content-Length': Buffer.byteLength(data)
        }
    };
    new Promise(function (resolve, reject) {
        let result = '';
        const reqs = http.request(options, (res) => {
            // console.log(`状态码: ${res.statusCode}`);
            // console.log(`响应头: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log(chunk);
                result += chunk;
                resolve(result);
            });
            res.on('end', () => {
                console.log('响应数据。');
            });
        });
        
        reqs.on('error', (e) => {
            console.error(`请求遇到问题: ${e.message}`);
        });
        
        // 写入数据到请求主体
        // reqs.write(data);
        reqs.end();
    }).then(result => {
        console.log('返回数据了')
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(result);
    })
})

module.exports = router;