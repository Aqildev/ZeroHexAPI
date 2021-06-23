var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const verifyToken = require('../TokenVerification/verifyToken');
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());
const {
    showAllRequests,
    createRequest
} = require('./requestController');
router.route('/show_all_requests/:metamaskAddress/:isServiceProvider').get(verifyToken, showAllRequests);
router.route('/create_request_Async').post(verifyToken, createRequest);
module.exports = router;