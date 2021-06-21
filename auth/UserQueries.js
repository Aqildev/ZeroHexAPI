const uuid = require("uuid");
var getUserData = async (metamask) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `SELECT * FROM users WHERE metamask LIKE'${metamask}'`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var signupInsertData = async (username, email, password, metamaskAddress, zerohexToken, phoneNo) => {
    return new Promise(async (resolve, reject) => {
        try {
            const id = 1999;
            const query = `INSERT INTO users(username,email,[password],metamask,zin_in_wallet,created_timestamp,phone) VALUES('${username||null}','${email||null}','${password||null}','${metamaskAddress||null}',${zerohexToken||null},'${new Date().toISOString()}','${phoneNo||null}')`
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var updateUser = async (firstName, lastName, designation, zerohexToken, imagePath) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `INSERT INTO user_profiles(first_name,last_name,user_image,zin_balance,created_timestamp,designation) VALUES('${firstName||null}','${lastName||null}','${imagePath||null}',${zerohexToken||null},'${new Date().toISOString()}','${designation||null}')`
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    getUserData,
    signupInsertData,
    updateUser
}