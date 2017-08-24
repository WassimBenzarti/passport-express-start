var Form = require('../models/Form');

exports.create = function(data,owner,cb){
    delete data._id;

    var newForm = new Form(data);
    newForm.owner = owner;
    newForm.save(cb);
}