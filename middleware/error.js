const errorHandler=(err,req,res,next)=>{
    console.log("called",err.name);
    res.status(err.statusCode||500).send({success:false,error:err.message||"server error"})
    }
module.exports=errorHandler;