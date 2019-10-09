var express = require('express');
var router = express.Router();
const body_parser = require('body-parser');
const login = require('../controllers/login/login');

const sign = require('../controllers/sign/sign');

router.post('/login', body_parser.json(), login);
router.post('/sign', body_parser.json(), sign);


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
