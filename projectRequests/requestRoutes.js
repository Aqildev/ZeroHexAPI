var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());const verifyToken = require('../TokenVerification/verifyToken');
const {upload}=require('./request_attachment_file')
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());
const {
    showAllRequests,
    createRequest,
    markRequestClose,
    markRequestOpen,
    showOfferings,
    showRequests,
    submissionInsert,
    requestDetailPage
} = require('./requestController');
//this api will be called on service provider feed tab(if isServiceProvider true )
//this api will be called on client all projects tab(if isServiceProvider is false)
router.route('/show_all_requests/:metamaskAddress/:isServiceProvider').get(verifyToken, showAllRequests);
//this api will be called to create client request
router.route('/create_request').post(verifyToken,upload.array("images",10),createRequest);
//this api will be called to change status of request to open
router.route('/mark_request_open').patch(verifyToken, markRequestOpen);
//this api will be called to change status of request to close
router.route('/mark_request_close').patch(verifyToken, markRequestClose);
//this api will be called on service provider offering tab
router.route('/show_offerings/:metamask').get(verifyToken, showOfferings);
router.route('/submission_insert').post(verifyToken,upload.array("images",10),submissionInsert);
router.route('/show_request_Details/:client_request_id/:isServiceProvider').get(verifyToken, requestDetailPage);


module.exports = router;