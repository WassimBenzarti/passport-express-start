var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: String,
    data:mongoose.Types.Mixed,
    createdAt:Date,
    updatedAt:Date,
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema, 'Users');