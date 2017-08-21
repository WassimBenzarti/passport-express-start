var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var AccountSchema = new Schema({
    username:String,
    tel:{
        type:Number,
        validate:{
            validator:function(tel){
                return tel.toString().length >=8;
            },
            message:'{VALUE} is not a valid phone number'
        },
        required: [true, 'Phone number is required']
    },
    password:String,
    email:{
        type:String,
        required:true,
        unique:true
    },

})

AccountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account',AccountSchema,'Accounts');