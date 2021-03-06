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
    requestDetailPage,
    submission_details,
    send_message,
    deliver,
    revision,
    submissionUpdate,
    revisionUpdate
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
//this api will be used to insert submission on any clinet request
router.route('/submission_insert').post(verifyToken,upload.array("images",10),submissionInsert);
//this api will be use to show request detail against request_id
router.route('/show_request_details/:client_request_id/:isServiceProvider').get(verifyToken, requestDetailPage);
//this api will be used to get submission detail against specific submission id
router.route('/get_submission_detail/:submission_id/:isServiceProvider').get(verifyToken, submission_details);
//this api will be used to send message
router.route('/send_message').post(verifyToken,upload.array("images",10),send_message);
//this api will be used to insert any revision
router.route('/revision').post(verifyToken,upload.array("images",10),revision);
//deliver again!
router.route('/deliver').post(verifyToken,upload.array("images",10),deliver);
//Submission update query left(dynamic data)
router.route('/submission_update').patch(verifyToken, submissionUpdate);
//revision patch!
router.route('/revision_update').patch(verifyToken, revisionUpdate);
//invoice generation



module.exports = router;