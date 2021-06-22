var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const verifyToken = require('../TokenVerification/verifyToken');
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());
const {
    showAllRequests
} = require('./requestController');
router.route('/show_all_requests').get(showAllRequests);
module.exports = router;