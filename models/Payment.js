var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

var PaymentSchema = new Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    data:mongoose.Types.Mixed
})


module.exports = mongoose.model('Payment', PaymentSchema, 'Payments');