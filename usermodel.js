const mongoose = require('mongoose')
const crypto = require('crypto')

const users = new mongoose.Schema({
    firstName :{
        type : String,
        required : true
    },
    lastName :{
        type : String,
        required : true
    },
    address :{
        type : String,
        required : true
    },
    city :{
        type : String,
        required : true
    },
    state :{
        type : String,
        required : true,
    },
    zipCode :{
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true,
    },
    loginName :{
        type : String,
        required : true,
    },
    password :{
        type : String,
        required : true,
    },
    confirmPassword :{
        type : String,
        required : true,
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})

users.methods.getResetPassword =function(){
    //create a random 20chars token
    const resetToken = crypto.randomBytes(20).toString("hex");
    //make that token a reset password token
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    //give that token a expire date
    this.resetPasswordExpire = Date.now()+ 15 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model('users',users)




