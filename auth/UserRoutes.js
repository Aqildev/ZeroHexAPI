var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const {getUserDetail,signup}=require('./UserControllers');
console.log(getUserDetail)
router.route('/getUserDetail').get(getUserDetail);
router.route('/update').post(signup);
router.route('/signup').post(signup);
module.exports = router;
