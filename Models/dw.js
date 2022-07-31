const mongoose = require('mongoose');

let user = new mongoose.Schema({
    guildID: String,
    userID: String,
    coin:{type: Number, default:0},
    totalInvite:{type: Number, default:0},
    totalMessage:{type: Number, default:0},
    totalVoice:{type: Number, default:0},
    BoostSize:{type: Number, default:0},


});

module.exports = mongoose.model('Coin', user);