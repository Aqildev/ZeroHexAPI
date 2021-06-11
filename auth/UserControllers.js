var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const UserFunctions=require('./UserFunctions');
const { query, response } = require('express');

//---------------------------
//Get Users detail by their Metamask!
router.get('/getUserDetail', async function (req, res) {
 const metamask=req.query.metamask;
  try {
    if(!metamask||metamask==0||metamask==null){
        throw "Invalid Address Provided"
    }
    const query=`SELECT * FROM users WHERE metamask=${metamask}`
    const response=await UserFunctions.queryData(query);
    if(response.success){
        res.status(200).send(response);
    }else{
        throw response;
    }
        
} catch (error) {
      console.log(error)
      res.status(404).send({success:false,error:error})
}
});
//----------------------------------------------
//----------------------------------------------
module.exports = router;
