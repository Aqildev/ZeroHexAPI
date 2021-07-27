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
            const query = `INSERT INTO client_request(user_id,title,description,total_budget_zhx,submission_deadline,timestamp,status) VALUES(${id},'${title}','${description}',${total_budget},'${submission_deadline}','${new Date()}','open')`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var createSubmission = async (id, client_request_id, status, zhx_budget, handshake_transaction_hash,final_transaction_hash) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `INSERT INTO submission(user_id,client_request_id,status,zhx_budget,handshake_transaction_hash,final_transaction_hash,timestamp) VALUES(${id},'${client_request_id}','${status}',${zhx_budget},'${handshake_transaction_hash}||null','${final_transaction_hash}||null','${new Date()}')`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var createSubmissionAttachment = async (id, url, size, file_type, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `INSERT INTO submission_attachment(submission_id,url,size,file_type,name,attachment_type) VALUES(${id},'${url}',${size},'${file_type}','${name}','null')`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var createRequestAttachments = async (id, url, size, file_type, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `INSERT INTO request_attachment(request_id,url,size,file_type,name) VALUES(${id},'${url}',${size},'${file_type}','${name}')`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var getAllRequests = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `SELECT * FROM client_request WHERE status ='open'`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var getAllClientRequest = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `SELECT * FROM client_request WHERE id =${id}`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var getAllRequestAttachments = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `SELECT * FROM submission WHERE client_request_id =${id}`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var getAllSubmissions = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `SELECT * FROM request_attachment WHERE request_id =${id}`;
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
var markOpen = async (request_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `UPDATE client_request SET status='open' WHERE id =${request_id}`
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var markClose = async (request_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `UPDATE client_request SET status='close' WHERE id =${request_id}`
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var getSubmittionRequests = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("id", id);
            const query = `SELECT request_id FROM submission WHERE user_id =${id}`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var getSubmittedClientRequests = async (id) => {
    let data = []
    id.forEach(singleId => {
        data.push(singleId.request_id)
    });
    console.log(data);
    return new Promise(async (resolve, reject) => {
        try {
            const query = `SELECT * FROM client_request WHERE id IN (${data})`;
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
    createRequest,
    markClose,
    markOpen,
    getSubmittionRequests,
    getSubmittedClientRequests,
    createRequestAttachments,
    createSubmission,
    createSubmissionAttachment,
    getAllClientRequest,
    getAllRequestAttachments,
    getAllSubmissions
}