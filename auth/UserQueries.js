var getUserData = async (metamask) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `SELECT * FROM user WHERE metamask ='${metamask}'`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var getUserId = async (metamask) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `SELECT id FROM user WHERE metamask LIKE'${metamask}%'`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var getUserProfile = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `SELECT * FROM profile WHERE user_id = ${id}`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}

var insertUserProfile = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `INSERT INTO profile(user_id,created_timestamp,modified_timestamp) VALUES(${id},'${new Date().toISOString()}','${new Date().toISOString()}')`
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var signupInsertData = async (metamaskAddress, zerohexToken) => {
    return new Promise(async (resolve, reject) => {
        try {

            const query = `INSERT INTO user(metamask,zhx_balance,created_timestamp,updated_timestamp,is_deleted) VALUES('${metamaskAddress}',${zerohexToken||null},'${new Date().toISOString()}','${new Date().toISOString()}','${false}')`
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var updateProfile = async (id, first_name, last_name, user_image, email, designation) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `UPDATE profile SET first_name='${first_name||''}',last_name='${last_name||''}',user_image='${user_image||null}',created_timestamp='${new Date().toISOString()}',modified_timestamp='${new Date().toISOString()}',email='${email||null}',designation='${designation||''}' WHERE user_id =${id}`
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var updateUser = async ( metamaskAddress,zerohexToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `UPDATE user SET zhx_balance=${zerohexToken||null} WHERE metamask ='${metamaskAddress}'`
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
    insertUserProfile,
    updateUser
}