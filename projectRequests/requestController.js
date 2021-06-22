var express = require('express');
var router = express.Router();
const ErrorResponse = require("../utils/errorResponse");
const {
    getID
} = require('../auth/UserFunctions');
const {
    getAllRequests,
    getUserRequests
} = require('./requestQueries');
const {
    queryData
} = require('../DatabaseConnection/dbConnection');
exports.showAllRequests = async (req, res, next) => {
    try {
        const isServiceProvider = req.body.isServiceProvider;
        const metamaskAddress = req.body.metamaskAddress;
        if (isServiceProvider) {
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