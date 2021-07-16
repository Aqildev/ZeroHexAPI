var mysql= require('mysql');
var {password,host,user,database}=require('../configuration/config')
//This Function will make a connection with our database
//----------------------------------------------------------------------
var config={
    host,
    user,
    password,
    database,
    ssl: {
        rejectUnauthorized: true,
    }
  }
var connection = mysql.createConnection(config);
connection.connect();

//This function will query data from database according to query request
//----------------------------------------------------------------------
var queryData = async (query) => {
    return new Promise(async (resolve, reject) => {
        connection.query(query, (err, response) => {
                // console.log(response)
                if (err) {
                    console.log("Error", err)
                    reject(err.message);
                } else {
                    resolve({
                        success: true,
                        result: response
                    })
                }
            })
    })
}
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
module.exports = {
    queryData
}