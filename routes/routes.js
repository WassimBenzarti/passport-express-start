var router = require('express').Router();
var commonFunctions = require('./common');
var utils = require('./utils');
var ErrorRouter = require('./Error');
var AccountRouter = require('./Account');
var FormRouter = require('./Form');

router.use(commonFunctions)

router.use('/account',AccountRouter);
router.use(utils.isAuthenticated);
router.use('/form',FormRouter);

router.use(ErrorRouter);
module.exports = router;