var express = require('express');
var router = express.Router();
const body_parser = require('body-parser');


const userInfo = require('../controllers/customInfo/userInfo');
const createUser = require('../controllers/customInfo/createUser');



// /user/signin 接口   
router.post('/cusotm/userInfo', body_parser.json(), userInfo);
router.post('/cusotm/createUser', body_parser.json(), createUser);



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;
