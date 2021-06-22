const {
    queryData
} = require('../DatabaseConnection/dbConnection');
const {
    getUserId
} = require('./UserQueries');
var getID = async (metamaskAddress) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = await getUserId(metamaskAddress);
            const response = await queryData(query);
            const id = response.result?.recordsets[0][0]?.id;
            resolve(id);
        } catch (error) {
            reject(error.message);
        }
    })
}
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
module.exports = {
    getID
}