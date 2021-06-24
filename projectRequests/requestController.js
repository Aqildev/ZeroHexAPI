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
    markComplete,
    getSubmittionRequests,
    getSubmittedClientRequests
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
        if (!isServiceProvider || isServiceProvider == undefined || isServiceProvider == '') {
            next(new ErrorResponse("Please Provide isServiceProvider", 404))
        }
        if (!metamaskAddress || metamaskAddress == undefined || metamaskAddress == '') {
            next(new ErrorResponse("Please Provide metamaskAddress", 404))
        }
        if (isServiceProvider == true) {
            const query = await getAllRequests();
            const allRequests = await queryData(query);
            res.status(200).send({
                success: true,
                result: allRequests.result.recordsets
            })
        } else {
            const query = await getUserRequests(await getID(metamaskAddress));
            const userRequests = await queryData(query);
            res.status(200).send({
                success: true,
                result: userRequests.result.recordsets
            })
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
            const query = await createRequest(await getID(metamaskAddress), title, description, total_budget, submission_deadline)
            await queryData(query);
            res.status(200).send({
                success: true,
                result: "New request published"
            })
        }
    } catch (error) {
        console.log(error)
        next(new ErrorResponse(error, 404))
    }
};
exports.markRequestComplete = async (req, res, next) => {
    try {
        const {
            requestId
        } = req.body;
        if (!requestId || requestId == undefined || requestId == '') {
            next(new ErrorResponse("Please Provide Valid ProjectId", 404))
        }
        const query = await markComplete(requestId);
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