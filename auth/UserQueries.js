var getUserData = async (metamask) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query=`SELECT * FROM users WHERE metamask LIKE'${metamask}'`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var signupInsertData = async (username,email,password,metamaskAddress,zerohexToken,phoneNo) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query= `INSERT INTO users(username,email,[password],metamask,zin_in_wallet,created_timestamp,phone) VALUES('${username||null}','${email||null}','${password||null}','${metamaskAddress||null}',${zerohexToken||null},'${new Date().toISOString()}','${phoneNo||null}')`
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    getUserData,
    signupInsertData
 }