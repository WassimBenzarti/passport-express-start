// Express
var router = require('express').Router();

// Passport
var passport = require('passport');

// Model
var Account = require('../models/Account');

router.post('/register',function(req, res, next){
    req.body._id = undefined;
    var password = req.body.password;
    // req.body.password = undefined; // TODO: Uncomment this
    var newAccount = new Account(req.body);

    Account.register(newAccount,password,function(err,account){
        if(err) return next(err);
        if(!account){
            return res.json({success:-1,msg:err.message});
        }
        req.body.password = password;
        passport.authenticate('local')(req,res,function(err,user){
            res.handleResponse(err,req.user.cleanProps(),'user',null,null,'Added the user successfully');
        })
    })
})

router.post('/login',function(req, res, next){
    req.logout();
    passport.authenticate('local',function(err, user, info){
        if(user){
            req.logIn(user,function(){
                res.handleResponse(err,(req.user)?req.user.cleanProps():req.user, null, null,'Not autherized', 'Successfully logged in');
            })
        }else{
            res.handleResponse(err,null, null, null,'Not autherized', 'Successfully logged in');
        }
    })(req,res,next)
})

router.post('/logout',function(req,res){
    req.logout();
    res.handleResponse(null,'Successfully logged out')
})

router.post('/',function(req, res){console.log(req.user);
    res.handleResponse(null, req.user.cleanProps())
})

module.exports = router;