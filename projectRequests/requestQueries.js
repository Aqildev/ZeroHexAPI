var getUserRequests = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `SELECT * FROM client_request WHERE user_id =${id}`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var getAllRequests = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `SELECT * FROM client_request`;
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
module.exports = {
    getUserRequests,
    getAllRequests,
    getUserId
}