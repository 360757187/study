const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const playerModel = mongoose.model('PlayersSchema');

router.get('/', function (req, res) {
    res.send('欢迎来到express！')
})


//新增球员信息
router.post('/addPlayer',async function (req, res) {
    const playerList = JSON.parse(req.body.playerList); 
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



module.exports = router;