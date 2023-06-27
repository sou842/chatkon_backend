const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    number: Number
},{
    versionKey: false
})

const userModel = mongoose.model('user',userSchema)

module.exports = { userModel }