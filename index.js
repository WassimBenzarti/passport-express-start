var path = require('path');

// Config
var config = require('./config').appConfig;

// Express
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

// Passport
var passport = require('passport');
var passportLocalStrategy = require('passport-local').Strategy;
var Account = require('./models/Account');
//var passport = require('passport-local-mongoose');

// Mongoose
var mongoose = require('mongoose')

// Routes
var routes = require('./routes/routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(require('express-session')({
    secret:config.sessionSecret,
    resave:false,
    saveUninitialized:false
}))

// Configure passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// Static files
app.use(express.static(path.join(__dirname,'public/frontend/dist')));

// Use Routes
app.use('/api', routes);

app.get('*',function(req,res){
    res.json({success:1,msg:'Nothing here'})
})

mongoose.connect(config.mongoURI,function(){
    app.listen(config.port,function(){
        console.log("Node app running on",config.port);
    })
})

