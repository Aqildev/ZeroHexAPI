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
var getUserId = async (metamask) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `SELECT id FROM users WHERE metamask LIKE'${metamask}'`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var getUserProfile = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `SELECT * FROM user_profiles WHERE user_id = ${id}`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}

var insertUserProfile = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `INSERT INTO user_profiles(user_id,created_timestamp) VALUES(${id},'${new Date().toISOString()}')`
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var signupInsertData = async (username, email, password, metamaskAddress, zerohexToken, phoneNo) => {
    return new Promise(async (resolve, reject) => {
        try {

            const query = `INSERT INTO users(username,email,[password],metamask,zin_in_wallet,created_timestamp,phone) VALUES('${username||null}','${email||null}','${password||null}','${metamaskAddress||null}',${zerohexToken||null},'${new Date().toISOString()}','${phoneNo||null}')`
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var updateProfile = async (id, first_name, last_name, user_image, zerohexToken, designation) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `UPDATE user_profiles SET first_name='${first_name||''}',last_name='${last_name||''}',user_image='${user_image||null}',created_timestamp='${new Date().toISOString()}',modified_timestamp='${new Date().toISOString()}',zin_balance=${zerohexToken||null},designation='${designation||''}' WHERE user_id =${id}`
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    getUserData,
    signupInsertData,
    updateProfile,
    getUserId,
    getUserProfile,
    insertUserProfile
}