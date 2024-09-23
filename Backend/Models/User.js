const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name:{
            type : String,
            required : true,
            trim : true
        },
        username:{
            type : String,
            required : true,
            trim : true
        },
        email : {
            type : String,
            required : true,
            trim : true
        },
        password : {
            type : String,
            required : true,
            trim : true
        },
        token : {
            type : String,
        },
        date : {
            type : Date,
            default : Date.now
        }
    }
)

module.exports = mongoose.model('User', userSchema);