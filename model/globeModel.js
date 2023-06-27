const mongoose = require('mongoose');

const globeSchema = mongoose.Schema({
    createrName: String,
    post: String,
    time: String,
    like: Number,
    like_person: {},
    Comments: []
},{
    versionKey: false
})

const globeModel = mongoose.model('globe',globeSchema)

module.exports = {globeModel}