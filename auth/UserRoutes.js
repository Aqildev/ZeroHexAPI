var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const verifyToken=require('../TokenVerification/verifyToken');
const {upload}=require('./profileImage')
const {getUserDetail,signup,update}=require('./UserControllers');
console.log(getUserDetail)
router.route('/getUserDetail/:metamask').get(verifyToken,getUserDetail);

router.route('/update').post(verifyToken,upload.single("image"),update);

router.route('/signup').post(signup);

module.exports = router;