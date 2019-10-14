var express = require('express');
var router = express.Router();
const body_parser = require('body-parser');


const userInfo = require('../controllers/customInfo/userInfo');
const createUser = require('../controllers/customInfo/createUser');

const article = require('../controllers/article/article');
const article_detail = require('../controllers/article/article_detail');
const comments = require('../controllers/article/comments');
const comments_add = require('../controllers/article/comments_add');

const article_add = require('../controllers/article/article_add');
const article_category = require('../controllers/article/article_category');




// /user/signin 接口   
router.post('/cusotm/userInfo', body_parser.json(), userInfo);
router.post('/cusotm/createUser', body_parser.json(), createUser);

router.get('/index/article', body_parser.json(), article);
router.get('/index/article_detail', body_parser.json(), article_detail);
router.post('/index/article_add', body_parser.json(), article_add);



router.get('/index/comments', body_parser.json(), comments);
router.post('/index/comments_add', body_parser.json(), comments_add);


router.get('/index/article_category', body_parser.json(), article_category);




/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;
