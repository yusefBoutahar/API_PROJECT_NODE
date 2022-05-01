const router = require('express').Router();
const controller = require('./login.controller');

router.post('/', controller.login);


module.exports = router;