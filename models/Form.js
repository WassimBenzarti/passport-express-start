var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

var FormSchema = new Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    title:String,
    description:String,
    logo:String,
    coverPhoto:String,
    inputs:Array,
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Account'
    }
})


module.exports = mongoose.model('Form', FormSchema, 'Forms');