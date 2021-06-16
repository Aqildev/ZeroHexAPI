var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokenss

const {queryData}=require('./UserFunctions');
const {getUserData,signupInsertData}=require('./UserQueries');
//--------------------------------------------------------------------------
//Get Users detail by their Metamask!
exports.getUserDetail=async(req, res,next)=> {
console.log("Called")
 const metamask=req.query.metamask;
  try {
    if(!metamask||metamask==0||metamask==null){
        throw "Invalid Address Provided";
    };
    const response=await queryData(await getUserData(metamask));
    if(response?.result?.recordsets[0].length>0){
        res.status(200).send({success:response?.success,result:response?.result?.recordsets});
    }else if(response?.result?.recordsets[0].length==0){
        throw "No user found against this metamask address"
    }
    else{
        throw response;
    }
} catch (error) {
      console.log(error)
      res.status(404).send({success:false,error:error})
}};
// 
//--------------------------------------------------------------------------
//Signup a new account on zeroHex
exports.signup=async(req, res,next)=> {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const metamaskAddress=req.body.metamaskAddress;
    const zerohexToken=req.body.zerohexToken;
    const phoneNo=req.body.phoneNo;
    if (!metamaskAddress || metamaskAddress === "" || metamaskAddress === undefined) {
      return res.send({ success: false, message: "Invalid metamask Adddress" })
    }
    try {
        const response=await queryData(await getUserData(metamaskAddress));
        var token = jwt.sign({ id:metamaskAddress },metamaskAddress, {
          expiresIn: 86400 // expires in 24 hours
        });
          if(response?.result?.recordsets[0].length>0){
              res.send({ success: true, token: token });
        }else{
           const response=await queryData(await signupInsertData(username,email,password,metamaskAddress,zerohexToken,phoneNo));
           if(response.success){
            res.send({success:true,token:token});
           }else{
             throw(response)
           }  
        }
    } catch (error) {
      res.send({ success: false, message: error });
    }
  };

//Update User data
exports.update=async(req, res,next)=> {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const metamaskAddress=req.body.metamaskAddress;
  const zerohexToken=req.body.zerohexToken;
  const phoneNo=req.body.phoneNo;
  if (!metamaskAddress || metamaskAddress === "" || metamaskAddress === undefined) {
    return res.send({ success: false, message: "Invalid metamask Adddress" })
  }
  try {
      const response=await queryData(await getUserData(metamaskAddress));
      var token = jwt.sign({ id:metamaskAddress },metamaskAddress, {
        expiresIn: 86400 // expires in 24 hours
      });
        if(response?.result?.recordsets[0].length>0){
            res.send({ success: true, token: token });
      }else{
         const response=await queryData(await signupInsertData(username,email,password,metamaskAddress,zerohexToken,phoneNo));
         if(response.success){
          res.send({success:true,token:token});
         }else{
           throw(response)
         }  
      }
  } catch (error) {
    res.send({ success: false, message: error });
  }
};
