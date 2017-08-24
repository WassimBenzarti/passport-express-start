// Native Modules
var path = require('path');

// Config
var config = require('./config').appConfig;

// Express
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

// Passport
var passport = require('passport');
var Account = require('./models/Account');

// Mongoose
var mongoose = require('mongoose')

// Routes
var routes = require('./routes/routes');

// Express config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(require('express-session')({
    secret:config.sessionSecret,
    resave:false,
    saveUninitialized:false
}))

// Passport config
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
    res.sendFile(path.resolve(__dirname, '/public/frontend/dist/index.html'))
})

// Database connection
mongoose.connect(config.mongoURI,function(){
    // Start server
    var port = process.env.PORT || config.port;
    app.listen(port,function(){
        console.log("Node app running on",config.port);
    }).on('error',function(){
        console.log('Trying another port',config.testingPort);
        app.listen()
    })

})

exports.app = app
