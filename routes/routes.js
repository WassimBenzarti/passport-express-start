var router = require('express').Router();
var AccountRouter = require('./Account');

router.use('/account',AccountRouter);

module.exports = router;