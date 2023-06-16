const mongoose = require('mongoose')


const Movieschema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        minlength:[2,"must be at least 2 charaters"]
    },
    genre:{
        type:String,
        required:[true,"gernre is required"]
    }
},{timestamps:true})
module.exports = mongoose.model("movie",Movieschema)
