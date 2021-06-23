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
var createRequest = async (id, title, description, total_budget, submission_deadline) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `INSERT INTO client_request(user_id,title,description,total_budget,submission_deadline,timestamp,status,isAccepted,isCompleted,newAction) VALUES(${id},'${title}','${description}',${total_budget},'${submission_deadline}','${new Date().toISOString()}',${0},${0},${0},${0})`;
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
    getUserId,
    createRequest
}