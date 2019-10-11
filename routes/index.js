var express = require('express');
var router = express.Router();
const body_parser = require('body-parser');


const userInfo = require('../controllers/customInfo/userInfo');
const createUser = require('../controllers/customInfo/createUser');

const article = require('../controllers/article/article');
const article_detail = require('../controllers/article/article_detail');
const comments = require('../controllers/article/comments');




// /user/signin 接口   
router.post('/cusotm/userInfo', body_parser.json(), userInfo);
router.post('/cusotm/createUser', body_parser.json(), createUser);

router.get('/index/article', body_parser.json(), article);
router.get('/index/article_detail', body_parser.json(), article_detail);
router.get('/index/comments', body_parser.json(), comments);





/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;
