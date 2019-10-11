var express = require('express');
var router = express.Router();
const body_parser = require('body-parser');

const users = require('../controllers/admin/users');
const users = require('../controllers/admin/category');



router.get('/users', body_parser.json(), users);
router.get('/category', body_parser.json(), category);


router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
