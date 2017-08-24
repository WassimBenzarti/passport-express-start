var config = require('../config').appConfig;
module.exports = function(req,res,next){

    res.handleResponse = function(err, resource, key, errMsg, emptyMsg, confirmationMsg){
        if(!key){key = 'object'}
        if(!errMsg){errMsg = `Internal error with the ${key}`}
        if(!emptyMsg){emptyMsg = `There is not ${key} found`}

        if(err){
            err.myDetails = err.message;
            err.message = errMsg;

            next(err);
        }else{
            if(typeof resource == 'undefined' || resource === false || resource === null){
                res.json({success:-1, msg:emptyMsg});
            }else{
                res.json({success:1, msg:confirmationMsg, data:(resource)?resource:undefined})
            }
        }
    }

    next();

}