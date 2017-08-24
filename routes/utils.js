/**
 * Checking the authentification of the user
 *
 */
exports.isAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        next({message:'Not autherized user'});
    }
}