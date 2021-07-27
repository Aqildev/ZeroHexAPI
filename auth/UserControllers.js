var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokenss
const {
  getID
} = require('./UserFunctions')
const {
  queryData
} = require('../DatabaseConnection/dbConnection');
const ErrorResponse = require("../utils/errorResponse");
const {
  secret
} = require('../configuration/config');
const {
  getUserData,
  signupInsertData,
  updateProfile,
  getUserProfile,
  insertUserProfile,
  updateUser
} = require('./UserQueries');
const {
  json
} = require('body-parser');
//--------------------------------------------------------------------------
//Get Users detail by their Metamask!
exports.getUserDetail = async (req, res, next) => {
  const {
    metamask
  } = req.params;
  try {
    if (!metamask || metamask == 0 || metamask == null) {
      next(new ErrorResponse(`Invalid metamask address`, 422))
    };
    const response = await queryData(await getUserData(metamask));
    if (response) {
      res.status(200).send({
        success: response.success,
        result:response
      });
    } else{
      next(new ErrorResponse(`no record found against this metamask`, 400))
    }
  
  } catch (error) {
    console.log(error)
    next(new ErrorResponse(error, 404))
  }
};
// 
//--------------------------------------------------------------------------
//Signup a new account on zeroHex
exports.signup = async (req, res, next) => {
  const {
    metamaskAddress,
    zerohexToken,
  } = req.body;
  if (!metamaskAddress || metamaskAddress === "" || metamaskAddress === undefined||metamaskAddress.length<42 ) {
    next(new ErrorResponse(`Invalid metamask address`, 422))
  }else{
    try {
      const response = await queryData(await getUserData(metamaskAddress));
      console.log("response",response.result.length);
      var token = jwt.sign({
        id: metamaskAddress
      }, secret, {
        expiresIn: 86400 // expires in 24 hours
      });
  
      if (response.result.length>0) {
        console.log("user_id",await getID(metamaskAddress))
        const updateUserQuery=await updateUser(metamaskAddress,zerohexToken);
        await queryData(updateUserQuery);
        const insertquery = await insertUserProfile(await getID(metamaskAddress));
        await queryData(insertquery);
        res.send({
          success: true,
          token: token
        });
      } else {
        const query = await signupInsertData(metamaskAddress, zerohexToken);
        const response = await queryData(query);
        console.log("user_id",await getID(metamaskAddress))
        const insertquery = await insertUserProfile(await getID(metamaskAddress));
        await queryData(insertquery);
        res.send({
          success: true,
          token: token
        });
      }
    } catch (error) {
      next(new ErrorResponse(error, 404))
    }
  }

};
//Update User data
exports.update = async (req, res, next) => {
  const {
    metamaskAddress,
    first_name,
    last_name,
    designation,
    email
  } = req.body;
  let user_image;
  if (req.file) {

    user_image = req.file.path;
  }

  if (!metamaskAddress || metamaskAddress == 0 || metamaskAddress == null) {
    next(new ErrorResponse(`Invalid metamask address`, 422))
  };
  try {
    console.log("updated called!",await getID(metamaskAddress))
    const updateQuery = await updateProfile(await getID(metamaskAddress), first_name, last_name, user_image, email, designation);
    console.log("update query",updateQuery)
    await queryData(updateQuery);
    res.send({
      success: true,
      result: "profile updated!"
    });

  } catch (error) {
    console.log("error", error);
    next(new ErrorResponse(error, 404))
  }
};