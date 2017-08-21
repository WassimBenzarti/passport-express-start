// Express
var router = require('express').Router();

// Passport
var passport = require('passport');

var Account = require('../models/Account');

router.get('/',function(req, res){
    res.json({success:1,data:req.user});
})

router.post('/register',function(req, res, next){
    var password = req.body.password;
    req.body.password = undefined;
    var newAccount = new Account(req.body);

    Account.register(newAccount,password,function(err,account){
        if(err) next(err.message);
        if(!account){
            return res.json({success:0,err:err.message});
        }
        req.body.password = password;
        passport.authenticate('local')(req,res,function(err,user){
            res.json({success:1,msg:"Added the user successfully",err:err,data:user})
        })
    })
})

router.post('/login',passport.authenticate('local'),function(req,res){
    res.json({success:1,msg:'Successfully logged in'});
})

router.get('/logout',function(req,res){
    req.logout();
    res.json({success:1,msg:'Successfully logged out'})
})

module.exports = router;