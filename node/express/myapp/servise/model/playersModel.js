const mongoose = require('mongoose');

const PlayersSchema = new mongoose.Schema({
    playerName: {type: String, default: ''},
    age: {type: Number, default: 0},
    status: {type: Number, default: 0},
    address: {type: String, default: ''}
})
mongoose.model('PlayersSchema', PlayersSchema);