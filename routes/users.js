var express = require('express');
var router = express.Router();
const body_parser = require('body-parser');
const login = require('../controllers/login/login');
const logout = require('../controllers/login/logout');
const github = require('../controllers/login/github');



const register = require('../controllers/sign/sign');



router.post('/login', body_parser.json(), login);
router.get('/logout', body_parser.json(), logout);
router.post('/register', body_parser.json(), register);
router.post('/github', body_parser.json(), github);



/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
