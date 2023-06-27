const mongoose = require('mongoose');

const massageSchema = mongoose.Schema({
    creater: String,
    friend: String,
    msg: String,
    time: String,
    day: String,
    ID: String
},{
    versionKey: false
})

const massageModel = mongoose.model('massages',massageSchema)

module.exports = {massageModel}