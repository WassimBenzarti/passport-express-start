var config = require('../config').appConfig;

module.exports = function(err, req, res, next){

    var msg = (config.dev)?err.message:'Some error occured';

    if (res.headersSent) {
        return next(err)
    }

    if(config.dev){
        res.status(500).json({success:0, msg: msg, details: err.myDetails})
        throw err;
    }else{
        res.status(500).json({success:0, msg: msg})
    }

}