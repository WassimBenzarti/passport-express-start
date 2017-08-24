var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('validator');

const passportLocalMongoose = require('passport-local-mongoose');

var hiddenProps = ['hash', 'salt','password'];

var AccountSchema = new Schema({
    username:String,
    tel:{
        type:Number,
        validate:{
            validator:function(tel){
                return tel.toString().length >= 8;
            },
            message:'{VALUE} is not a valid phone number'
        },
        required: [true, 'Phone number is required']
    },
    password:String,
    email: {
        type: String,
        validate: {
            validator: validator.isEmail,
            isAsync: false,
            message: 'Email is not valid'
        },
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists']
    }
})

AccountSchema.plugin(passportLocalMongoose);

AccountSchema.methods.cleanProps = function(){
    var self = this;
    hiddenProps.forEach(function(prop){
        self[prop] = undefined;
    })
    return this;
}

module.exports = mongoose.model('Account',AccountSchema,'Accounts');