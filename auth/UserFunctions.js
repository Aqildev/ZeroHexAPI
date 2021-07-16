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
            resolve(response?.result[0]?.id);
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