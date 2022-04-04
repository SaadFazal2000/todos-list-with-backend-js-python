const mongoose = require('mongoose')

const todolist = new mongoose.Schema({
    item:{
        type:String,
        required:true
    },
    user:{
        type: Number,
        default:1
    }
})

module.exports = mongoose.model('TodosList', todolist)