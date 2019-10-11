var express = require('express');
var router = express.Router();
const body_parser = require('body-parser');

const users = require('../controllers/admin/users');
const category = require('../controllers/admin/category');

const category_add = require('../controllers/admin/category_add');
const category_update = require('../controllers/admin/category_update');
const category_info = require('../controllers/admin/category_info');

const category_del = require('../controllers/admin/category_del');




router.get('/users', body_parser.json(), users);
router.get('/category', body_parser.json(), category);

router.post('/category_add', body_parser.json(), category_add);
router.post('/category_update', body_parser.json(), category_update);
router.get('/category_info', body_parser.json(), category_info);

router.post('/category_del', body_parser.json(), category_del);



router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
