var express = require('express');
var router = express.Router();
const ErrorResponse = require("../utils/errorResponse");
const {
    getID
} = require('../auth/UserFunctions');
const {
    getAllRequests,
    getUserRequests,
    createRequest,
    createRequestAttachments,
    getSubmittionRequests,
    getSubmittedClientRequests,
    markOpen,
    markClose,
    createSubmission,
    createSubmissionAttachment,
    getAllClientRequest,
    getAllRequestAttachments,
    getAllSubmissions
} = require('./requestQueries');
const {
    queryData
} = require('../DatabaseConnection/dbConnection');

exports.showAllRequests = async (req, res, next) => {
    try {
        const {
            isServiceProvider,
            metamaskAddress
        } = req.params;
        console.log(isServiceProvider);
        if (!isServiceProvider || isServiceProvider == undefined || isServiceProvider == '') {
            next(new ErrorResponse("Please Provide isServiceProvider", 404))
        }
        else if (!metamaskAddress || metamaskAddress == undefined || metamaskAddress == '') {
            next(new ErrorResponse("Please Provide metamaskAddress", 404))
        }else{
            if (isServiceProvider) {
                const query = await getAllRequests();
                console.log("query",query);
                const allRequests = await queryData(query);
                res.status(200).send({
                    success: true,
                    result: allRequests.result
                })
            } else {
                const query = await getUserRequests(await getID(metamaskAddress));
                console.log("else query",query)
                const userRequests = await queryData(query);
                res.status(200).send({
                    success: true,
                    result: userRequests.result
                })
            }
        }
    } catch (error) {
        console.log(error)
        next(new ErrorResponse(error, 404))
    }
};
exports.createRequest = async (req, res, next) => {
    try {
        const {
            title,
            description,
            total_budget,
            submission_deadline,
            metamaskAddress
        } = req.body;
        if (!title || title == undefined || title == '') {
            next(new ErrorResponse("Please Provide Project title", 404))
        } else if (!description || description == undefined || description == '') {
            next(new ErrorResponse("Please Provide Project description", 404))
        } else if (!total_budget || total_budget == undefined || total_budget == '') {
            next(new ErrorResponse("Please Provide Project total_budget", 404))
        } else if (!submission_deadline || submission_deadline == undefined || submission_deadline == '') {
            next(new ErrorResponse("Please Provide Project submission_deadline", 404))
        } else if (!metamaskAddress || metamaskAddress == undefined || metamaskAddress == '') {
            next(new ErrorResponse("Please Provide Valid metamaskAddress", 404))
        } else {
            if(await getID(metamaskAddress)>0){
                const query = await createRequest(await getID(metamaskAddress), title, description, total_budget, submission_deadline);
              let data= await queryData(query);
              if(req.files){
               for(i=0;i<req.files.length;i++){
                console.log(data.result);
                 const query=await createRequestAttachments(data.result.insertId,req.files[i].path,req.files[i].size,req.files[i].mimetype,req.files[i].filename);
                 console.log(query)
                 await queryData(query);
               }
              }
              res.status(200).send({
                success: true,
                result:"data"
            })
            }
            else{
                next(new ErrorResponse("Please signup first by this account", 404))
            }
        }
    } catch (error) {
        console.log(error)
        next(new ErrorResponse(error, 404))
    }
};
exports.markRequestOpen = async (req, res, next) => {
    try {
        const {
            requestId
        } = req.body;
        if (!requestId || requestId == undefined || requestId == '') {
            next(new ErrorResponse("Please Provide Valid ProjectId", 404))
        }
        const query = await markOpen(requestId);
        await queryData(query);
        res.status(200).send({
            success: true,
            result: "Request completed"
        })
    } catch (error) {
        console.log(error)
        next(new ErrorResponse(error, 404))
    }
};
exports.markRequestClose = async (req, res, next) => {
    try {
        const {
            requestId
        } = req.body;
        if (!requestId || requestId == undefined || requestId == '') {
            next(new ErrorResponse("Please Provide Valid ProjectId", 404))
        }
        const query = await markClose(requestId);
        await queryData(query);
        res.status(200).send({
            success: true,
            result: "Request completed"
        })
    } catch (error) {
        console.log(error)
        next(new ErrorResponse(error, 404))
    }
};
exports.showOfferings = async (req, res, next) => {
    try {
        let allData = [];
        const {
            metamask
        } = req.params;
        if (!metamask || metamask == undefined || metamask == '') {
            next(new ErrorResponse("Please Provide metamaskAddress", 404))
        }
        const id = await getID(metamask);
        const query = await getSubmittionRequests(id);
        const data = await queryData(query);
        const secondQuery = await getSubmittedClientRequests(data.result.recordsets[0]);
        const fullData = await queryData(secondQuery)
        res.status(200).send({
            success: true,
            result: fullData.result.recordsets
        })
    } catch (error) {
        console.log(error)
        next(new ErrorResponse(error, 404))
    }
};
exports.submissionInsert = async (req, res, next) => {
    try {
        const {
            client_request_id,
            status,
            zhx_budget,
            handshake_transaction_hash,
            final_transaction_hash,
            metamaskAddress
        } = req.body;
        if (!client_request_id || client_request_id == undefined || client_request_id == '') {
            next(new ErrorResponse("Please Provide Project client_request_id", 404))
        } else if (!status || status == undefined || status == '') {
            next(new ErrorResponse("Please Provide Project status", 404))
        } else if (!zhx_budget || zhx_budget == undefined || zhx_budget == '') {
            next(new ErrorResponse("Please Provide Project zhx_budget", 404))
        }else if (!metamaskAddress || metamaskAddress == undefined || metamaskAddress == '') {
            next(new ErrorResponse("Please Provide Valid metamaskAddress", 404))
        } else {
            if(await getID(metamaskAddress)>0){
                const query = await createSubmission(await getID(metamaskAddress), client_request_id, status, zhx_budget, handshake_transaction_hash,final_transaction_hash);
               let data= await queryData(query);
                console.log(data);
              if(req.files){
               for(i=0;i<req.files.length;i++){
                console.log(data.result);
                 const query=await createSubmissionAttachment(data.result.insertId,req.files[i].path,req.files[i].size,req.files[i].mimetype,req.files[i].filename);
                 console.log(query)
                 await queryData(query);
               }
              }
              res.status(200).send({
                success: true,
                result:"Submission data inserted"
            })
            }
            else{
                next(new ErrorResponse("Please signup first by this account", 404))
            }
        }
    } catch (error) {
        console.log(error)
        next(new ErrorResponse(error, 404))
    }
};
exports.requestDetailPage = async (req, res, next) => {
    try {
        let data=[]
        const{
            client_request_id
        }=req.params;
        if (!client_request_id || client_request_id == undefined || client_request_id == '') {
            next(new ErrorResponse("Please Provide Project client_request_id", 404))
        }else{
            let query=await getAllClientRequest(client_request_id);
            data.push(await queryData(query));
            let secondQuery=await getAllRequestAttachments(client_request_id);
            data.push(await queryData(secondQuery));
            let thirdQuery=await getAllSubmissions(client_request_id);
            data.push(await queryData(thirdQuery));
            res.status(200).send({
             success: true,
             result:data
            })
        }
    

    } catch (error) {
        console.log(error)
        next(new ErrorResponse(error, 404))
    }
};