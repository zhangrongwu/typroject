var express = require('express');
var router = express.Router();
const body_parser = require('body-parser');


const signin = require('../controllers/sign/sign');
const userInfo = require('../controllers/userInfo/userInfo');



// /user/signin 接口   
router.post('/user/signin', body_parser.json(), signin);
router.post('/cusotm/userInfo', body_parser.json(), userInfo);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;
