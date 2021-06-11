var express = require('express');
var sql = require("mssql");
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const config=require('../configuration/config');
const { query, response } = require('express');

//SQL connection Credentials
//---------------------------

//---------------------------
//Get Users detail by their Metamask!
router.get('/getUser', async function (req, res) {
 const metamask=req.query.metamask;
  // connect to your database
  try {
    if(!metamask){
        throw "Invalid Address"
    }
    if(!config){
     throw "Invalid DB credentials"   
    }
  sql.connect(config.config, async function (err) {
      try {
        if (err) {
            throw err;
        } else {
            try {
            var query="SELECT * FROM users where metamask="+metamask;
            console.log( query);
            sql.query(query,(err,response)=>{
                if(err){
                 throw(err)
                }else{
                    res.send({success:true,result:response})
                }
            })           
        } catch (error) {
                res.status(403).send({success:false,error:err.message})
        }
        } 
      } catch (error) {
          console.log("error",error)
          res.status(403).send({success:false,error:error.message})
      }
  });
        
} catch (error) {
      console.log(error)
      res.status(403).send({success:false,error:error})
}
});


module.exports = router;
