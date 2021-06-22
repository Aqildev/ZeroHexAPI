var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const verifyToken = require('./veriyToken');
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());
const {
    upload
} = require('./profileImage')
const {
    getUserDetail,
    signup,
    update,
    updateProfile
} = require('./UserControllers');
console.log(getUserDetail)
router.route('/getUserDetail').get(verifyToken, getUserDetail);
router.route('/update').patch(upload.single("image"), verifyToken,update);

router.route('/signup').post(signup);
module.exports = router;