var sql = require("mssql");
const config=require('../configuration/config');
var checkDatabaseConnection = async (address) => {
    return new Promise(async (resolve, reject) => {
        sql.connect(config.config, async function (err) {
              if (err) {
                reject(false);
              } else {
                resolve(true)          
              } 
        });
    })
}
var queryData = async (query) => {
   return new Promise(async (resolve, reject) => {
    console.log("isConnection",await checkDatabaseConnection())
    if(await checkDatabaseConnection()){
        sql.query(query,(err,response)=>{
            if(err){
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


module.exports = {
    queryData: queryData,
}

