// Express
var router = require('express').Router();

// Mongoose
var mongoose = require('mongoose');

// Model
var Form = require('../models/Form');

// DAO
var FormDao = require('../dao/Form');

router.get('/', function (req, res) {
    Form.find({owner: mongoose.Types.ObjectId(req.user._id)}, function (err, form) {
        res.handleResponse(err, form, 'form');
    })
})

/**
 * Create or duplicate
 */
router.post('/create', function (req, res) {
    FormDao.create(req.body,req.user._id,function (err, form) {
        res.handleResponse(err, form, 'form');
    });
})
/**
 * Validate the ownership of the form
 */
router.use(function (req, res, next) {
    var formId = req.body.formId;
    if (!formId) {
        res.handleResponse(null,null,null,null,'formId is not valid');
    }

    Form.findOne({_id: mongoose.Types.ObjectId(formId), owner: mongoose.Types.ObjectId(req.user._id)})
        .exec(function (err, form) {
            if (form) {
                if (form.owner.toString() === req.user._id.toString()) {
                    req.data = {
                        form:form
                    };
                    return next();
                }else{
                    return res.handleResponse(err,form.toPublic(),'form')
                }
            }
            res.handleResponse(err, null, 'form', null, 'Form is not valid');
        })
})

router.post('/', function (req, res, next) {
    res.handleResponse(null, req.data.form);
})

router.post('/modify',function(req,res,next){
    var myForm = req.data.form;
    myForm

})

module.exports = router;


