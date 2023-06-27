const mongoose = require('mongoose');

const friendSchema = mongoose.Schema({
    creater: Number,
    friend: Number,
    createrName: String,
    friendName: String,
    massages: []
},{
    versionKey: false
})

const friendModel = mongoose.model('friend',friendSchema)

module.exports = { friendModel }