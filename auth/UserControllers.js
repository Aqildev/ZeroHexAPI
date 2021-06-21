var express = require('express');
var router = express.Router();
const multer = require('multer');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokenss
const {
  queryData
} = require('./UserFunctions');
const ErrorResponse = require("../utils/errorResponse");
const {
  secret
} = require('../configuration/config');
const {
  getUserData,
  signupInsertData,
  updateUser
} = require('./UserQueries');
//--------------------------------------------------------------------------
//Get Users detail by their Metamask!
exports.getUserDetail = async (req, res, next) => {
  const metamask = req.query.metamask;
  try {
    if (!metamask || metamask == 0 || metamask == null) {
      next(new ErrorResponse(`Invalid metamask address`, 422))
    };
    const response = await queryData(await getUserData(metamask));
    if (response.result.recordsets[0].length > 0) {
      res.status(200).send({
        success: response.success,
        result: response.result.recordsets
      });
    } else if (response.result.recordsets[0].length == 0) {
      next(new ErrorResponse(`no record found against this metamask`, 400))
    }
  } catch (error) {
    console.log(error)
    next(new ErrorResponse(error.message, 404))
  }
};
// 
//--------------------------------------------------------------------------
//Signup a new account on zeroHex
exports.signup = async (req, res, next) => {
  console.log(req.body)
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const metamaskAddress = req.body.metamaskAddress;
  const zerohexToken = req.body.zerohexToken;
  const phoneNo = req.body.phoneNo;
  if (!metamaskAddress || metamaskAddress === "" || metamaskAddress === undefined) {
    next(new ErrorResponse(`Invalid metamask address`, 422))
  }
  try {
    const response = await queryData(await getUserData(metamaskAddress));
    var token = jwt.sign({
      id: metamaskAddress
    }, secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    if (response.result.recordsets[0].length > 0) {
      res.send({
        success: true,
        token: token
      });
    } else {
      const query = await signupInsertData(username, email, password, metamaskAddress, zerohexToken, phoneNo);
      const response = await queryData(query);
      res.send({
        success: true,
        token: token
      });
    }
  } catch (error) {
    next(new ErrorResponse(error.message, 404))
  }
};
//Update User data
exports.update = async (req, res, next) => {
  console.log("called!")
  const metamaskAddress = req.body.metamaskAddress;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const designation = req.body.designation;
  const zerohexToken = req.body.zerohexToken;
  const imagePath = req.file.path;
  try {
    console.log(firstName, lastName, designation, zerohexToken, imagePath);
    const query = await updateUser(metamaskAddress, firstName, lastName, designation, zerohexToken, imagePath);
    const response = await queryData(query);
    res.send({
      success: true,
      token: response
    });

  } catch (error) {
    next(new ErrorResponse(error.message, 404))
  }
};