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
var createSubmission = async (id, client_request_id, zhx_budget, handshake_transaction_hash,final_transaction_hash) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `INSERT INTO submission(user_id,client_request_id,status,zhx_budget,handshake_transaction_hash,final_transaction_hash,timestamp) VALUES(${id},'${client_request_id}','${1}',${zhx_budget},'${handshake_transaction_hash}||null','${final_transaction_hash}||null','${new Date().toISOString()}')`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var createSubmissionAttachment = async (id, url, size, file_type, name,attachment_type) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `INSERT INTO submission_attachment(submission_id,url,size,file_type,name,attachment_type) VALUES(${id},'${url}',${size},'${file_type}','${name}','${attachment_type}')`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var createMessageAttachment = async (id, url, size, file_type, name,attachment_type) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `INSERT INTO messages_attachment(message_id,url,size,file_type,name) VALUES(${id},'${url}',${size},'${file_type}','${name}')`;
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
var getSubmissionStatus = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `SELECT status FROM submission WHERE client_request_id =${id}`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var getSubmissionStatusAgainstId = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `SELECT status FROM submission WHERE id =${id}`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var getAllProjects = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `SELECT * FROM client_request WHERE user_id =${id}`;
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
var getSubmissions = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `SELECT * FROM submission WHERE client_request_id =${id}`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var getRequestAttachments = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `SELECT * FROM request_attachment WHERE request_id =${id}`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var getSubmissionAttachments = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `SELECT * FROM submission_attachment WHERE submission_id =${id}`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var getSingleSubmissionDetail = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `SELECT * FROM submission WHERE id =${id}`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var getPreviewAttachments = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `SELECT * FROM submission_attachment WHERE submission_id =${id} and attachment_type='preview'`;
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
var submissionUpdate = async (submission_id,status,transaction_hash) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(status==2){
                const query = `UPDATE submission SET status=${2},handshake_transaction_hash='${transaction_hash}||${null}' WHERE id =${submission_id}`
            }else if(status==3){
                const query = `UPDATE submission SET status=${3},final_transaction_hash='${transaction_hash}||${null}' WHERE id =${submission_id}`
            }else if(status==5){
                const query = `UPDATE submission SET status=${5},dispute_transaction_hash='${transaction_hash}||${null}' WHERE id =${submission_id}`
            }
            else{
                const query = `UPDATE submission SET status=${status} WHERE id =${submission_id}`
            }
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var updateRevision = async (submission_id,status,transaction_hash) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(status=='acceppted'){
                const query = `UPDATE revisions SET status='accepted',revision_transaction_hash='${transaction_hash}||${null}' WHERE submission_id =${submission_id}`
            }else if(status=="rejected"){
                const query = `UPDATE revisions SET status='rejected' WHERE submission_id =${submission_id}`
            }else if(status=="cancelled"){
                const query = `UPDATE revisions SET status='cancelled' WHERE submission_id =${submission_id}`
            }
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
            const query = `SELECT client_request_id FROM submission WHERE user_id =${id}`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var getAllSubmissionID = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("id", id);
            const query = `SELECT id FROM submission WHERE client_request_id =${id}`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var getMessage = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("id", id);
            const query = `SELECT * FROM messages WHERE submission_id =${id}`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var getMessageAttachments = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("id", id);
            const query = `SELECT * FROM messages_attachments WHERE message_id =${id}`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var getSubmittedClientRequests = async (id) => {
    let data = []
    id.forEach(singleId => {
        data.push(singleId.client_request_id)
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
var insert_message = async (submission_id, text, sender) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `INSERT INTO messages(submission_id,sender,message) VALUES(${submission_id},'${sender}','${text}')`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var insertRevision = async (submission_id, price, description) => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `INSERT INTO revisions(submission_id,price,description,status,revision_transaction_hash,timestamp) VALUES(${submission_id},'${price}','${description},'pending',${null}','${new Date()}')`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}

var getSubmissionBudget = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("id", id);
            const query = `SELECT zhx_budget FROM submission WHERE id =${id}`;
            resolve(query);
        } catch (error) {
            reject(error);
        }
    })
}
var getRevisionsBudget = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("id", id);
            const query = `SELECT price FROM revisions WHERE submission_id =${id} and status='accepted`;
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
    getSubmissions,
    getRequestAttachments,
    getAllProjects,
    getSubmissionAttachments,
    getSubmissionStatus,
    getPreviewAttachments,
    getSingleSubmissionDetail,
    getSubmissionStatusAgainstId,
    getMessage,
    insert_message,
    insertRevision,
    getAllSubmissionID,
    getMessageAttachments,
    submissionUpdate,
    updateRevision,
    getSubmissionBudget,
    getRevisionsBudget
}