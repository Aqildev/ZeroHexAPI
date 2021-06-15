var sql = require("mssql");
const config=require('../configuration/config');

//This Function will make a connection with our database
//----------------------------------------------------------------------
var checkDatabaseConnection = async (address) => {
    return new Promise(async (resolve, reject) => {
        sql.connect(config.config, async function (err) {
              if (err) {
                resolve(false);
              } else {
                resolve(true)          
              } 
        });
    })
}

//This function will query data from database according to query request
//----------------------------------------------------------------------
var queryData = async (query) => {
   return new Promise(async (resolve, reject) => {
    console.log("isConnection",await checkDatabaseConnection())
    if(await checkDatabaseConnection()){
        sql.query(query,(err,response)=>{
            if(err){
                console.log("Error",err)
                reject(err.message);
            }else{
                resolve({success:true,result:response})
            }
        })  
    }else{
        reject("Database Connection Isn't Established!")
    }
   })
}
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
module.exports = {
   queryData
}

