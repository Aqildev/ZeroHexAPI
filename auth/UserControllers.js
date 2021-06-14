var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokenss

const {queryData}=require('./UserFunctions');
//---------------------------
//Get Users detail by their Metamask!
exports.getUserDetail=async(req, res,next)=> {
 const metamask=req.query.metamask;
  try {
    if(!metamask||metamask==0||metamask==null){
        throw "Invalid Address Provided";
    };
    const queryInfo=`SELECT * FROM users WHERE metamask LIKE'%${metamask}%'`;
    const response=await queryData(queryInfo);
    if(response?.result?.recordsets[0].length>0){
        res.status(200).send({success:response?.success,result:response?.result?.recordsets});
    }else if(response?.result?.recordsets[0].length==0){
        throw "No user found against this metamask address"
    }
    else{
        throw response;
    }
    res.send("called")

} catch (error) {
      console.log(error)
      res.status(404).send({success:false,error:error})
}};
// 
//----------------------------------------------
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
        const queryInfo=`SELECT * FROM users WHERE metamask LIKE'%${metamaskAddress}%'`;
        const response=await queryData(queryInfo);
        var token = jwt.sign({ id:metamaskAddress },metamaskAddress, {
          expiresIn: 86400 // expires in 24 hours
        });
          if(response?.result?.recordsets[0].length>0){
              res.send({ success: true, token: token });
        }else{
           const query= `INSERT INTO users(username,[password],metamask,zin_in_wallet,created_timestamp,phone) VALUES('${username}','${password}','${metamaskAddress}',${zerohexToken},'${new Date().toISOString()}','${phoneNo}')`
           const response=await queryData(query);
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
