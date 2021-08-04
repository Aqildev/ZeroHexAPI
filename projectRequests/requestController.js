var express = require('express');
var router = express.Router();
const ErrorResponse = require("../utils/errorResponse");
const {
    getID
} = require('../auth/UserFunctions');
const {
    getAllRequests,
    getUserRequests,
    createRequest,
    createRequestAttachments,
    getSubmittionRequests,
    getSubmittedClientRequests,
    markOpen,
    markClose,
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
    getRevisionsBudget,
    getSubmissionBudget
} = require('./requestQueries');
const{
    getUserProfile
}=require('../auth/UserQueries');
const {
    queryData
} = require('../DatabaseConnection/dbConnection');

exports.showAllRequests = async (req, res, next) => {
    try {
        const {
            isServiceProvider,
            metamaskAddress
        } = req.params;
        console.log(isServiceProvider);
        if (!isServiceProvider || isServiceProvider == undefined || isServiceProvider == '') {
            next(new ErrorResponse("Please Provide isServiceProvider", 404))
        }
        else if (!metamaskAddress || metamaskAddress == undefined || metamaskAddress == '') {
            next(new ErrorResponse("Please Provide metamaskAddress", 404))
        }else{
            if (isServiceProvider) {
                const query = await getAllRequests();
                console.log("query",query);
                const allRequests = await queryData(query);
                res.status(200).send({
                    success: true,
                    result: allRequests.result
                })
            } else {
                const query = await getUserRequests(await getID(metamaskAddress));
                console.log("else query",query)
                const userRequests = await queryData(query);
                res.status(200).send({
                    success: true,
                    result: userRequests.result
                })
            }
        }
    } catch (error) {
        console.log(error)
        next(new ErrorResponse(error, 404))
    }
};
exports.createRequest = async (req, res, next) => {
    try {
        const {
            title,
            description,
            total_budget,
            submission_deadline,
            metamaskAddress
        } = req.body;
        if (!title || title == undefined || title == '') {
            next(new ErrorResponse("Please Provide Project title", 404))
        } else if (!description || description == undefined || description == '') {
            next(new ErrorResponse("Please Provide Project description", 404))
        } else if (!total_budget || total_budget == undefined || total_budget == '') {
            next(new ErrorResponse("Please Provide Project total_budget", 404))
        } else if (!submission_deadline || submission_deadline == undefined || submission_deadline == '') {
            next(new ErrorResponse("Please Provide Project submission_deadline", 404))
        } else if (!metamaskAddress || metamaskAddress == undefined || metamaskAddress == '') {
            next(new ErrorResponse("Please Provide Valid metamaskAddress", 404))
        } else {
            if(await getID(metamaskAddress)>0){
                const query = await createRequest(await getID(metamaskAddress), title, description, total_budget, submission_deadline);
              let data= await queryData(query);
              if(req.files){
               for(i=0;i<req.files.length;i++){
                console.log(data.result);
                 const query=await createRequestAttachments(data.result.insertId,req.files[i].path,req.files[i].size,req.files[i].mimetype,req.files[i].filename);
                 console.log(query)
                 await queryData(query);
               }
              }
              res.status(200).send({
                success: true,
                result:"data"
            })
            }
            else{
                next(new ErrorResponse("Please signup first by this account", 404))
            }
        }
    } catch (error) {
        console.log(error)
        next(new ErrorResponse(error, 404))
    }
};
exports.markRequestOpen = async (req, res, next) => {
    try {
        const {
            requestId
        } = req.body;
        if (!requestId || requestId == undefined || requestId == '') {
            next(new ErrorResponse("Please Provide Valid ProjectId", 404))
        }
        const query = await markOpen(requestId);
        await queryData(query);
        res.status(200).send({
            success: true,
            result: "Request completed"
        })
    } catch (error) {
        console.log(error)
        next(new ErrorResponse(error, 404))
    }
};
exports.markRequestClose = async (req, res, next) => {
    try {
        const {
            requestId
        } = req.body;
        if (!requestId || requestId == undefined || requestId == '') {
            next(new ErrorResponse("Please Provide Valid ProjectId", 404))
        }
        const query = await markClose(requestId);
        await queryData(query);
        res.status(200).send({
            success: true,
            result: "Request completed"
        })
    } catch (error) {
        console.log(error)
        next(new ErrorResponse(error, 404))
    }
};
exports.showOfferings = async (req, res, next) => {
    try {
        let allData = [];
        const {
            metamask
        } = req.params;
        if (!metamask || metamask == undefined || metamask == '') {
            next(new ErrorResponse("Please Provide metamaskAddress", 404))
        }
        const id = await getID(metamask);
        const query = await getSubmittionRequests(id);
        const data = await queryData(query);
        console.log(data.result);
        const secondQuery = await getSubmittedClientRequests(data.result);
        const fullData = await queryData(secondQuery);
        for(i=0;i<fullData.result.length;i++){
            let submissionIdQuery=await getAllSubmissionID(fullData.result[i].id);
            let submissions=await queryData(submissionIdQuery);
            allData.push({requests:fullData.result[i],submission_ids:submissions.result})
        }
        res.status(200).send({
            success: true,
            result: allData
        })
    } catch (error) {
        console.log(error)
        next(new ErrorResponse(error, 404))
    }
};
exports.submissionInsert = async (req, res, next) => {
    try {
        const {
            client_request_id,
            zhx_budget,
            handshake_transaction_hash,
            final_transaction_hash,
            metamaskAddress
        } = req.body;
        console.log("files",req.files);
        if (!client_request_id || client_request_id == undefined || client_request_id == '') {
            next(new ErrorResponse("Please Provide Project client_request_id", 404))
        }else if (!zhx_budget || zhx_budget == undefined || zhx_budget == '') {
            next(new ErrorResponse("Please Provide Project zhx_budget", 404))
        }else if (!metamaskAddress || metamaskAddress == undefined || metamaskAddress == '') {
            next(new ErrorResponse("Please Provide Valid metamaskAddress", 404))
        } else {
            if(await getID(metamaskAddress)>0){
                const query = await createSubmission(await getID(metamaskAddress), client_request_id, zhx_budget, handshake_transaction_hash,final_transaction_hash);
               let data= await queryData(query);
                console.log(data);
              if(req.files){
               for(i=0;i<req.files.length;i++){
                let attachment_type=req.files[i].originalname;
                attachment_type=attachment_type.split("@")[0];
                 const query=await createSubmissionAttachment(data.result.insertId,req.files[i].path,req.files[i].size,req.files[i].mimetype,req.files[i].filename,attachment_type);
                 console.log(query)
                 await queryData(query);
               }
              }
              res.status(200).send({
                success: true,
                result:"Submission data inserted"
            })
            }
            else{
                next(new ErrorResponse("Please signup first by this account", 404))
            }
        }
    } catch (error) {
        console.log(error)
        next(new ErrorResponse(error, 404))
    }
};
exports.requestDetailPage = async (req, res, next) => {
    try {
        let IsServiceProviderData={};
        let clientData={};
        let projectData={};
        let profileData={};
        let submissions=[];
        let submissionAttachments={}
        const{
            client_request_id,
            isServiceProvider
        }=req.params;
        console.log(isServiceProvider);
        if (!client_request_id || client_request_id == undefined || client_request_id == '') {
            next(new ErrorResponse("Please Provide Project client_request_id", 404))
        }
        else if (!isServiceProvider || isServiceProvider == undefined || isServiceProvider == '') {
            next(new ErrorResponse("Please Provide Valid isServiceProvider", 404))
        } else{
                let query=await getAllClientRequest(client_request_id);
                let clientRequests=await queryData(query);
                if(clientRequests.result.length>0){   
                    projectData.title= clientRequests.result[0].title;
                    projectData.description= clientRequests.result[0].description;
                    projectData.budget= clientRequests.result[0].total_budget_zhx;
                    projectData.createdDate= clientRequests.result[0].timestamp;
                    projectData.status= clientRequests.result[0].status;
                    projectData.submissionDeadline= clientRequests.result[0].submission_deadline;
                    IsServiceProviderData.projectData=projectData;                    
                    let secondQuery=await getRequestAttachments(client_request_id);
                    let requestAttachments=await queryData(secondQuery);
                    if(requestAttachments.result.length){
                        IsServiceProviderData.projectData.projectAttachments=requestAttachments.result;
                    }
                if(isServiceProvider==true){
                    let profileQuery=await getUserProfile(clientRequests.result[0].user_id);
                    let profiledata=await queryData(profileQuery);
                    profileData.firstName=profiledata.result[0].first_name;
                    profileData.LastName=profiledata.result[0].last_name;
                    profileData.ImageUrl=profiledata.result[0].user_image;
                    profileData.joiningDate=profiledata.result[0].created_timestamp;
                    let allProjectsQuery=await getAllProjects(clientRequests.result[0].user_id);
                    let allProjectsData=await queryData(allProjectsQuery);
                    profileData.allProjects=allProjectsData.result.length;
                    IsServiceProviderData.profileData=profileData;
                    res.status(200).send({
                        success: true,
                        result:IsServiceProviderData
                       })
                }else{
                    let submissionAttachmentQuery;
                    clientData.projectData=projectData;
                    if(requestAttachments.result.length){
                        clientData.projectData.projectAttachments=requestAttachments.result;
                    }      
                    let submissionQuery=await getSubmissions(client_request_id);
                    let allSubmissions=await queryData(submissionQuery);
                    for(i=0;i<allSubmissions.result.length;i++){
                    let submissionStatusQuery=await getSubmissionStatus(client_request_id);
                    let status=await queryData(submissionStatusQuery);
                    if(status.result[i].status==1){
                         submissionAttachmentQuery=await getPreviewAttachments(allSubmissions.result[i].id);
                    }else{
                         submissionAttachmentQuery=await getSubmissionAttachments(allSubmissions.result[i].id);
                    }
                     let subAttachments=await queryData(submissionAttachmentQuery);
                     let getUserQuery=await getUserProfile(allSubmissions.result[i].user_id);
                     let userDetail=await queryData(getUserQuery);
                     profileData.firstName=userDetail.result[0].first_name;
                     profileData.LastName=userDetail.result[0].last_name;
                     profileData.ImageUrl=userDetail.result[0].user_image;
                     profileData.ImageUrl=userDetail.result[0].user_image;
                     profileData.designation=userDetail.result[0].desigantion;
                     submissions.push({submission:allSubmissions.result[i],submissionAttachments:subAttachments.result,userProfile:profileData})
                    }
                    clientData.submissions=submissions;      
                    res.status(200).send({
                        success: true,
                        result:clientData
                       })
                }
            }
            else{
                next(new ErrorResponse("No record found against this request id", 404))
            }
        }
    } catch (error) {
        console.log(error)
        next(new ErrorResponse(error, 404))
    }
};
exports.submission_details = async (req, res, next) => {
    try {
        console.log("called");
        let submissions=[];
        let submissionAttachments={};
        let profileData={};
        let projectData={};
        let collaboration=[];
        const{
            submission_id,
            isServiceProvider
        }=req.params;
        if (!submission_id || submission_id == undefined || submission_id == '') {
            next(new ErrorResponse("Please Provide Project submission_id", 404))
        }else if (!isServiceProvider || isServiceProvider == undefined || isServiceProvider == '') {
            next(new ErrorResponse("Please Provide Valid isServiceProvider", 404))
        }
        else{
            let submissionDetailQuery=await getSingleSubmissionDetail(submission_id);
            let submissionData=await queryData(submissionDetailQuery);
        if(submissionData.result.length>0){
         if(isServiceProvider!==true){
          let submissionStatusQuery=await getSubmissionStatusAgainstId(submission_id);
          let getUserQuery=await getUserProfile(submissionData.result[0].user_id);
          let userDetail=await queryData(getUserQuery);
          let messageQuery=await getMessage(submission_id);
          let revisionQuery=await getRevisions(submission_id);
          profileData.firstName=userDetail.result[0].first_name;
          profileData.LastName=userDetail.result[0].last_name;
          profileData.ImageUrl=userDetail.result[0].user_image;
          profileData.joiningDate=userDetail.result[0].created_timestamp;
          let status=await queryData(submissionStatusQuery);
          if(status.result[0].status==1){
               submissionAttachmentQuery=await getPreviewAttachments(submission_id);
               let submissionAttachments=await queryData(submissionAttachmentQuery);
               submissions.push({submission:submissionData.result[0],submissionAttachments:submissionAttachments.result,service_provider:profileData,handShakeProcess:true})
             res.status(200).send({
                 success: true,
                 result:submissions
                })
          }else{
               submissionAttachmentQuery=await getSubmissionAttachments(submission_id);
               let submissionAttachments=await queryData(submissionAttachmentQuery);
               let getAllClientRequest=await getAllClientRequest(submissionData.result[i].client_request_id);
               let clientRequests=await queryData(getAllClientRequest);
               if(clientRequests.result.length>0){   
                    projectData.title= clientRequests.result[0].title;
                    projectData.description= clientRequests.result[0].description;
                    projectData.budget= clientRequests.result[0].total_budget_zhx;
                    projectData.createdDate= clientRequests.result[0].timestamp;
                    projectData.status= clientRequests.result[0].status;
                    projectData.submissionDeadline= clientRequests.result[0].submission_deadline;
               }
               let allRevisions=await queryData(revisionQuery);
               let allMessages=await queryData(messageQuery);
               collaboration.push({chat_messages:allMessages,revisions:allRevisions})
               submissions.push({requestDetail:projectData,service_provider:profileData,submissionAttachments:submissionAttachments.result,collaboration:collaboration})
               res.status(200).send({
                success: true,
                result:submissions
               })

          }
        }
           else{
            let messages=[];
            let messageQuery=await getMessage(submission_id);
            let allMessages=await queryData(messageQuery);
            let revisionQuery=await getRevisions(submission_id);
            let revision=await queryData(revisionQuery);

            messages.push({messages:allMessages,revisions:revision,})
            submissionAttachmentQuery=await getSubmissionAttachments(submission_id);
            let submissionAttachments=await queryData(submissionAttachmentQuery);
            submissions.push({submission:submissionData.result[0],deliveredFiles:submissionAttachments,Messages:messages})
            res.status(200).send({
                success: true,
                result:submissions
               })
           }}
           else{
            res.status(200).send({
                success: true,
                handShakeProcess:false
               })
           }
        }
    } catch (error) {
        console.log(error)
        next(new ErrorResponse(error, 404))
    }
};
exports.send_message = async (req, res, next) => {
    try {
        const {
            text,
            sender,
            submission_id,
        } = req.body;
        console.log(sender!="service_provider");
        if (!text || text == undefined || text == '') {
            next(new ErrorResponse("Please Provide text", 404))
        }else if (!sender || sender == undefined || sender == '') {
            next(new ErrorResponse("Please Provide valid sender", 404))
        }else if (!submission_id || submission_id == undefined || submission_id == '') {
            next(new ErrorResponse("Please Provide Valid submission_id", 404))
        } else {
           let messageQuery=await insert_message(submission_id,text,sender);
           let data=await queryData(messageQuery);
           if(req.files){
           for(i=0;i<req.files.length;i++){
             const query=await createSubmissionAttachment(data.result.insertId,req.files[i].path,req.files[i].size,req.files[i].mimetype,req.files[i].filename);
             await queryData(query);
           }}
           res.status(200).send({
            success: true,
            result:"message Inserted!"
           })
        }
    } catch (error) {
        console.log(error)
        next(new ErrorResponse(error, 404))
    }
};
exports.revision = async (req, res, next) => {
    try {
        const {
            submission_id,
            price,
            description
        } = req.body;
        console.log("files",req.files);
        if (!price || price == undefined || price == '') {
            next(new ErrorResponse("Please Provide price", 404))
        }else if (!description || description == undefined || description == '') {
            next(new ErrorResponse("Please Provide sender", 404))
        }else if (!submission_id || submission_id == undefined || submission_id == '') {
            next(new ErrorResponse("Please Provide Valid submission_id", 404))
        } else {
           let messageQuery=await insertRevision(submission_id,price,description);
           await queryData(messageQuery);
           res.status(200).send({
            success: true,
            result:"revision Inserted!"
           })
        }
    } catch (error) {
        console.log(error)
        next(new ErrorResponse(error, 404))
    }
};
exports.deliver = async (req, res, next) => {
    try {
        const {
            submission_id,
        } = req.body;
        console.log(req.files);
        if (!submission_id || submission_id == undefined || submission_id == '') {
            next(new ErrorResponse("Please Provide price", 404))
        }else if(!req.files || req.files == undefined || req.files == ''){
            next(new ErrorResponse("Please Provide files to deliever", 404))
        }else {
            if(req.files){
                for(i=0;i<req.files.length;i++){
                 let attachment_type=req.files[i].originalname;
                  attachment_type=null;
                  const query=await createSubmissionAttachment(submission_id,req.files[i].path,req.files[i].size,req.files[i].mimetype,req.files[i].filename,attachment_type);
                  await queryData(query);
                }}
           res.status(200).send({
            success: true,
            result:"project delivered"
           })
        }
    } catch (error) {
        console.log(error)
        next(new ErrorResponse(error, 404))
    }
};
exports.submissionUpdate = async (req, res, next) => {
    try {
        const {
            submission_id,
            status,
            transaction_hash,
            isServiceProvider
        } = req.body;
        if (!submission_id || submission_id == undefined || submission_id == '') {
            next(new ErrorResponse("Please Provide submission_id", 404))
        }else if(!status|| status == undefined || status == ''){
            next(new ErrorResponse("Please Provide status", 404))
        }else if(isServiceProvider==false) {
            let submissionUpdateQuery=await submissionUpdate(submission_id,status,transaction_hash);
            await queryData(submissionUpdateQuery);
           res.status(200).send({
            success: true,
            result:"Submission updated"
           })
        }else{
            next(new ErrorResponse("service provider can't update submission", 404))
        }
    } catch (error) {
        console.log(error)
        next(new ErrorResponse(error, 404))
    }
};
exports.revisionUpdate = async (req, res, next) => {
    try {
        const {
            submission_id,
            status,
            transaction_hash,
            isServiceProvider
        } = req.body;
        if (!submission_id || submission_id == undefined || submission_id == '') {
            next(new ErrorResponse("Please Provide submission_id", 404))
        }else if(!status|| status == undefined || status == ''){
            next(new ErrorResponse("Please Provide status", 404))
        }else if(status=="accpted"&&!transaction_hash || transaction_hash == undefined || transaction_hash == '') {
            next(new ErrorResponse("accepted status should have transaction hash", 404))
        }else{
           if(isServiceProvider==true){
            if(status=="cancelled"){
                let query=await updateRevision(submission_id,status,transaction_hash);
                await queryData(query);
                res.status(200).send({
                    success: true,
                    result:"revision updated"
                   })
            }else{
                next(new ErrorResponse("Status should be cancelled", 404))
            }
           }else{
               console.log(status);
               console.log(status==='accpeted');
               if(status=="accepted"||status=="rejected"){
                let query=await updateRevision(submission_id,status,transaction_hash);
                await queryData(query);
                res.status(200).send({
                    success: true,
                    result:"revision updated"
                   })
               }else{
                next(new ErrorResponse("Status should be accpeted or rejected", 404))
            }
           }
        }
    } catch (error) {
        console.log(error)
        next(new ErrorResponse(error, 404))
    }
};
exports.getInvoice = async (req, res, next) => {
    try {
     const{
      submission_id
     }=req.params;
     if (!submission_id || submission_id == undefined || submission_id == '') {
        next(new ErrorResponse("Please Provide submission_id", 404))
    }else{
      let totalRevisionBudget;
      let totalSubmissionBudget;
      let budget=[];
      let submissionBudgetQuery=await getSubmissionBudget(submission_id);
      let submissionBudget=queryData(submissionBudgetQuery);
      totalSubmissionBudget=submissionBudget.result[0].zhx_budget;
      let revisionBudgetQuery=await getRevisionsBudget(submission_id);
      let revisionBudget=queryData(revisionBudgetQuery);
      for(i=0;i<revisionBudget.result.length;i++){
      totalRevisionBudget+=revisionBudget.result[i].price;
      }
      budget.push({initialOffer:totalSubmissionBudget,revision:totalRevisionBudget,totalPrice:totalSubmissionBudget+totalRevisionBudget})
      res.status(200).send({
        success: true,
        result:budget
       })
    }
    } catch (error) {
        console.log(error)
        next(new ErrorResponse(error, 404))
    }
};